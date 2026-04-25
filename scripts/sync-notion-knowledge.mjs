import { promises as fs } from "fs";
import path from "path";

const ROOT_DIR = process.cwd();
const KNOWLEDGE_DIR = path.join(ROOT_DIR, "knowledge");
const BRIEF_DIR = path.join(KNOWLEDGE_DIR, "brief");
const ORDER_FILE = path.join(KNOWLEDGE_DIR, ".notion-sync-order.json");
const NOTION_VERSION = "2022-06-28";
const CONCURRENCY = 6;
const NATURAL_COLLATOR = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

const TITLE_ALIASES = ["Name", "Title", "Day Title"];
const TOPIC_ALIASES = ["Topic", "Track", "Category"];
const DAY_ALIASES = ["Day", "Day Number", "Index"];
const NOTE_ALIASES = ["Note", "Preview", "Summary", "Description"];
const CONTENT_ALIASES = ["Content", "Markdown", "Body", "Details"];
const ORDER_ALIASES = ["Order", "Sort", "Priority", "Rank"];
const VISIBILITY_ALIASES = ["Visible", "Published", "Show"];

function log(message) {
  console.log(`[sync-notion-knowledge] ${message}`);
}

function naturalCompare(left, right) {
  return NATURAL_COLLATOR.compare(left, right);
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function loadEnvFile(filePath) {
  if (!(await fileExists(filePath))) return;

  const content = await fs.readFile(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const equalIndex = line.indexOf("=");
    if (equalIndex < 1) continue;

    const key = line.slice(0, equalIndex).trim();
    let value = line.slice(equalIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

async function loadEnv() {
  await loadEnvFile(path.join(ROOT_DIR, ".env.local"));
  await loadEnvFile(path.join(ROOT_DIR, ".env"));
}

function getProperty(properties, aliases) {
  const entries = Object.entries(properties || {});

  for (const alias of aliases) {
    const exact = entries.find(([key]) => key === alias);
    if (exact) return exact[1];
  }

  const lowerAliases = aliases.map((alias) => alias.toLowerCase());
  const loose = entries.find(([key]) => lowerAliases.includes(key.toLowerCase()));
  return loose?.[1];
}

function toPlainText(property) {
  if (!property) return "";

  if (property.type === "title") {
    return (property.title || []).map((item) => item.plain_text || "").join("").trim();
  }

  if (property.type === "rich_text") {
    return (property.rich_text || []).map((item) => item.plain_text || "").join("").trim();
  }

  if (property.type === "select") {
    return property.select?.name?.trim() || "";
  }

  if (property.type === "status") {
    return property.status?.name?.trim() || "";
  }

  return "";
}

function toNumber(property) {
  if (!property || property.type !== "number") return undefined;
  return property.number ?? undefined;
}

function toCheckbox(property) {
  if (!property || property.type !== "checkbox") return undefined;
  return property.checkbox;
}

function toRelationIds(property) {
  if (!property || property.type !== "relation") return [];
  return (property.relation || []).map((item) => item.id).filter(Boolean);
}

function richTextToPlainText(richText) {
  if (!Array.isArray(richText)) return "";
  return richText
    .map((entry) => (typeof entry?.plain_text === "string" ? entry.plain_text : ""))
    .join("")
    .trim();
}

async function notionRequest(token, url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(`Notion API ${response.status}: ${data.message || "Unknown error"}`);
  }

  return data;
}

async function queryAllPages(token, databaseId) {
  const pages = [];
  let cursor = null;

  while (true) {
    const body = {
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    };

    const data = await notionRequest(
      token,
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    pages.push(...(data.results || []));

    if (!data.has_more || !data.next_cursor) break;
    cursor = data.next_cursor;
  }

  return pages;
}

async function getPageTitle(token, pageId) {
  const page = await notionRequest(token, `https://api.notion.com/v1/pages/${pageId}`);
  const properties = Object.values(page.properties || {});
  const titleProperty = properties.find((item) => item?.type === "title");

  if (!titleProperty || titleProperty.type !== "title") return null;

  const title = (titleProperty.title || []).map((item) => item.plain_text || "").join("").trim();
  return title || null;
}

async function getTopicMap(token, pages) {
  const relationIds = new Set();

  for (const page of pages) {
    const topicProperty = getProperty(page.properties, TOPIC_ALIASES);
    const ids = toRelationIds(topicProperty);
    for (const id of ids) relationIds.add(id);
  }

  const list = Array.from(relationIds);
  const map = new Map();

  for (let i = 0; i < list.length; i += CONCURRENCY) {
    const chunk = list.slice(i, i + CONCURRENCY);
    const rows = await Promise.all(
      chunk.map(async (id) => {
        try {
          return { id, title: await getPageTitle(token, id) };
        } catch {
          return { id, title: null };
        }
      })
    );

    for (const row of rows) {
      if (row.title) map.set(row.id, row.title);
    }
  }

  return map;
}

function sanitizeFileSegment(input) {
  return input
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDayAndTitle(rawTitle, dayFromProperty) {
  const parsed = rawTitle.match(/^Day\s+(\d+)\s*:\s*(.+)$/i);
  const day = dayFromProperty ?? (parsed ? Number(parsed[1]) : Number.MAX_SAFE_INTEGER);
  const title = parsed ? parsed[2].trim() : rawTitle.trim();
  return { day, title };
}

async function fetchBlockChildren(token, blockId) {
  const blocks = [];
  let cursor = null;

  while (true) {
    const query = new URLSearchParams({ page_size: "100" });
    if (cursor) query.set("start_cursor", cursor);

    const data = await notionRequest(
      token,
      `https://api.notion.com/v1/blocks/${blockId}/children?${query.toString()}`
    );

    blocks.push(...(data.results || []));

    if (!data.has_more || !data.next_cursor) break;
    cursor = data.next_cursor;
  }

  return blocks;
}

function getBlockText(block) {
  const body = block?.[block.type];
  const richText = body?.rich_text;
  return richTextToPlainText(richText);
}

async function renderBlocksToMarkdown(token, blocks, depth = 0) {
  const lines = [];

  for (const block of blocks) {
    const indent = "  ".repeat(depth);
    const text = getBlockText(block);

    if (block.type === "heading_1" && text) lines.push(`# ${text}`);
    if (block.type === "heading_2" && text) lines.push(`## ${text}`);
    if (block.type === "heading_3" && text) lines.push(`### ${text}`);
    if (block.type === "paragraph" && text) lines.push(`${indent}${text}`);
    if (block.type === "bulleted_list_item" && text) lines.push(`${indent}- ${text}`);
    if (block.type === "numbered_list_item" && text) lines.push(`${indent}1. ${text}`);
    if (block.type === "to_do" && text) {
      const checked = Boolean(block?.to_do?.checked);
      lines.push(`${indent}- [${checked ? "x" : " "}] ${text}`);
    }
    if (block.type === "quote" && text) lines.push(`${indent}> ${text}`);
    if (block.type === "divider") lines.push("---");

    if (block.type === "code") {
      const language = block?.code?.language || "text";
      lines.push(`\`\`\`${language}`);
      if (text) lines.push(text);
      lines.push("```");
    }

    if (block.has_children) {
      const childBlocks = await fetchBlockChildren(token, block.id);
      const childLines = await renderBlocksToMarkdown(
        token,
        childBlocks,
        block.type === "bulleted_list_item" || block.type === "numbered_list_item" ? depth + 1 : depth
      );
      if (childLines.length > 0) {
        lines.push(...childLines);
      }
    }

    if (lines.length > 0 && lines[lines.length - 1] !== "") {
      lines.push("");
    }
  }

  while (lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
  }

  return lines;
}

async function getPageMarkdown(token, pageId) {
  const blocks = await fetchBlockChildren(token, pageId);
  const lines = await renderBlocksToMarkdown(token, blocks);
  return lines.join("\n").trim();
}

function buildBriefFromMarkdown(markdown, fallbackTitle) {
  const lines = markdown.split(/\r?\n/);
  const headings = [];
  const bullets = [];
  const sentences = [];
  const seen = new Set();
  let inCodeBlock = false;

  const clean = (line) =>
    line
      .replace(/^#{1,6}\s+/, "")
      .replace(/^[-*+]\s+/, "")
      .replace(/^\d+\.\s+/, "")
      .replace(/^>\s+/, "")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .trim();

  const pushUnique = (bucket, value) => {
    const normalized = value.trim();
    if (!normalized) return;
    const key = normalized.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    bucket.push(normalized);
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) continue;
    if (line === "---") continue;
    if (/^\|.*\|$/.test(line)) continue;

    if (line.startsWith("#")) {
      pushUnique(headings, clean(line));
      continue;
    }

    if (/^[-*+]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      pushUnique(bullets, clean(line));
      continue;
    }

    pushUnique(sentences, clean(line));
  }

  const keyIdea =
    sentences.find((line) => line.length >= 50) ||
    sentences[0] ||
    bullets[0] ||
    headings[0] ||
    `${fallbackTitle} notes will be added soon.`;

  const pointCandidates = [...bullets, ...headings, ...sentences];
  const keyIdeaLower = keyIdea.toLowerCase();
  const points = [];
  const pointSeen = new Set();

  for (const candidate of pointCandidates) {
    const normalized = candidate.trim();
    if (!normalized) continue;
    if (normalized.toLowerCase() === keyIdeaLower) continue;

    const key = normalized.toLowerCase();
    if (pointSeen.has(key)) continue;
    pointSeen.add(key);
    points.push(normalized);

    if (points.length >= 5) break;
  }

  if (points.length === 0) {
    points.push(`Key notes for ${fallbackTitle} are available in the details section.`);
  }

  const summarySource = sentences.filter(
    (line) => line.toLowerCase() !== keyIdeaLower
  );
  const summary = summarySource.slice(0, 2).join(" ") || keyIdea;

  return [
    "### Key Idea",
    "",
    keyIdea,
    "",
    "### What Matters",
    "",
    ...points.map((point) => `- ${point}`),
    "",
    "### Quick Summary",
    "",
    summary,
    "",
  ].join("\n");
}

function toFileName(day, title) {
  const safeTitle = sanitizeFileSegment(title);
  if (Number.isFinite(day) && day !== Number.MAX_SAFE_INTEGER) {
    return `Day ${day}: ${safeTitle}.md`;
  }
  return `${safeTitle}.md`;
}

async function upsertFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${content.trim()}\n`, "utf8");
}

async function processPage(page, token, topicMap) {
  const title = toPlainText(getProperty(page.properties, TITLE_ALIASES));
  if (!title) return null;

  const visible = toCheckbox(getProperty(page.properties, VISIBILITY_ALIASES));
  if (visible === false) return null;

  const topicProperty = getProperty(page.properties, TOPIC_ALIASES);
  const topicText = toPlainText(topicProperty);
  const relationTopicId = toRelationIds(topicProperty)[0];
  const topicFromRelation = relationTopicId ? topicMap.get(relationTopicId) : undefined;
  const topic = sanitizeFileSegment(topicText || topicFromRelation || "General Knowledge");

  const { day, title: normalizedTitle } = parseDayAndTitle(
    title,
    toNumber(getProperty(page.properties, DAY_ALIASES))
  );

  const fileName = toFileName(day, normalizedTitle);

  const contentFromProperty = toPlainText(getProperty(page.properties, CONTENT_ALIASES));
  const noteFromProperty = toPlainText(getProperty(page.properties, NOTE_ALIASES));

  const markdownFromPage = contentFromProperty || (await getPageMarkdown(token, page.id));
  const markdown = (markdownFromPage || noteFromProperty || "Learning note will be added soon.").trim();

  const topicFilePath = path.join(KNOWLEDGE_DIR, topic, fileName);
  const briefFilePath = path.join(BRIEF_DIR, topic, fileName);

  await upsertFile(topicFilePath, markdown);
  const detailMarkdown = await fs.readFile(topicFilePath, "utf8");
  const finalBrief = buildBriefFromMarkdown(detailMarkdown, normalizedTitle).trim();
  await upsertFile(briefFilePath, finalBrief);

  return {
    topic,
    fileName,
    order: toNumber(getProperty(page.properties, ORDER_ALIASES)) ?? Number.MAX_SAFE_INTEGER,
    day,
    title: normalizedTitle,
  };
}

async function runWithConcurrency(items, limit, worker) {
  const result = [];
  const queue = [...items];

  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (queue.length > 0) {
      const item = queue.shift();
      if (!item) continue;
      const value = await worker(item);
      result.push(value);
    }
  });

  await Promise.all(runners);
  return result;
}

async function main() {
  await loadEnv();

  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_KNOWLEDGE_DATABASE_ID;

  if (!token) {
    throw new Error("NOTION_TOKEN is required. Add it to .env.local or environment.");
  }

  if (!databaseId) {
    throw new Error("NOTION_KNOWLEDGE_DATABASE_ID is required. Add it to .env.local or environment.");
  }

  log(`Fetching Notion pages from database ${databaseId} ...`);
  const pages = await queryAllPages(token, databaseId);
  log(`Found ${pages.length} Notion rows.`);

  const topicMap = await getTopicMap(token, pages);

  const written = await runWithConcurrency(pages, CONCURRENCY, async (page) => {
    try {
      return await processPage(page, token, topicMap);
    } catch (error) {
      log(`Failed page ${page.id}: ${error.message}`);
      return null;
    }
  });

  const synced = written.filter(Boolean);
  const sortedSynced = [...synced].sort((left, right) => {
    const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) return leftOrder - rightOrder;
    if (left.day !== right.day) return left.day - right.day;
    return naturalCompare(left.title, right.title);
  });

  const topicOrder = [];
  const seenTopics = new Set();
  const entryOrder = {};

  for (const entry of sortedSynced) {
    if (!seenTopics.has(entry.topic)) {
      seenTopics.add(entry.topic);
      topicOrder.push(entry.topic);
    }

    if (!entryOrder[entry.topic]) {
      entryOrder[entry.topic] = [];
    }

    entryOrder[entry.topic].push(entry.fileName);
  }

  await fs.writeFile(
    ORDER_FILE,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: "notion",
        topicOrder,
        entryOrder,
      },
      null,
      2
    )}\n`,
    "utf8"
  );

  const byTopic = new Map();

  for (const entry of synced) {
    const current = byTopic.get(entry.topic) || 0;
    byTopic.set(entry.topic, current + 1);
  }

  log(`Synced ${synced.length} markdown files into knowledge directories.`);
  for (const [topic, count] of [...byTopic.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    log(`- ${topic}: ${count} files`);
  }
}

main().catch((error) => {
  console.error(`[sync-notion-knowledge] ERROR: ${error.message}`);
  process.exit(1);
});
