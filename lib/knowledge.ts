import { promises as fs } from "fs"
import path from "path"

export type KnowledgeDay = {
  day: number
  title: string
  note: string
  content: string
  briefContent: string | null
}

export type KnowledgeTopic = {
  title: string
  totalDays: number | null
  completedDays: number
  description: string
  days: KnowledgeDay[]
}

const KNOWLEDGE_ROOT = path.join(process.cwd(), "knowledge")
const KNOWLEDGE_BRIEF_ROOT = path.join(KNOWLEDGE_ROOT, "brief")
const NOTION_ORDER_FILE = path.join(KNOWLEDGE_ROOT, ".notion-sync-order.json")
const NATURAL_COLLATOR = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
})
const KNOWLEDGE_TOPIC_ORDER: Record<string, number> = {
  "Advanced Software Engineering": 1,
  "100 Days of DevOps": 2,
  "100 Days of AWS Cloud": 3,
  "100 Days of Azure": 4,
}
const TOPIC_BRIEF_DESCRIPTIONS: Record<string, string> = {
  "100 Days of DevOps":
    "A practical day-by-day DevOps journey covering Linux administration, automation, networking, security, web stack setup, and production troubleshooting.",
  "100 Days of Azure":
    "A structured Azure learning track focused on cloud services, deployment workflows, identity, networking, storage, and real-world platform operations.",
  "Advanced Software Engineering":
    "Deeper study notes on software architecture, scalability, maintainable design, engineering tradeoffs, and production-ready development practices.",
}

const TOPIC_PROGRESS_MULTIPLIER: Record<string, number> = {
  "100 Days of Cloud (AWS)": 2,
  "100 Days of Cloud (Azure)": 2,
}

type NotionSyncOrder = {
  topicOrder?: string[]
  entryOrder?: Record<string, string[]>
}

function parseTargetDays(topicName: string): number | null {
  const match = topicName.match(/(\d+)\s+Days/i)
  return match ? Number(match[1]) : null
}

function isDayBasedTopic(topicName: string): boolean {
  return parseTargetDays(topicName) !== null
}

function cleanMarkdownLine(line: string): string {
  return line
    .replace(/^#+\s*/, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .trim()
}

function extractPreview(content: string): string {
  const lines = content
    .split("\n")
    .map((line) => cleanMarkdownLine(line))
    .filter((line) => line.length > 0)
    .filter((line) => !line.startsWith("```"))
    .filter((line) => !line.startsWith("---"))
    .filter((line) => !line.toLowerCase().startsWith("day "))

  const usefulLine = lines.find(
    (line) =>
      line.length >= 35 &&
      !line.includes("Browser") &&
      !line.toLowerCase().includes("objective")
  )

  return usefulLine ?? lines[0] ?? "Learning note will be added soon."
}

function naturalCompare(left: string, right: string) {
  return NATURAL_COLLATOR.compare(left, right)
}

function getTopicPriority(title: string) {
  const normalized = title.toLowerCase()

  if (normalized.includes("laravel")) return 1
  if (normalized.includes("professional experience") || normalized.includes("pro exp")) return 2
  if (normalized.includes("100 days")) return 3
  if (
    normalized.includes("software engineering") ||
    normalized.includes("advanced software engineering") ||
    normalized === "se"
  ) {
    return 4
  }

  return 5
}

export async function getKnowledgeTopics(): Promise<KnowledgeTopic[]> {
  let topicEntries: { name: string; isDirectory: () => boolean }[] = []

  try {
    topicEntries = await fs.readdir(KNOWLEDGE_ROOT, {
      withFileTypes: true,
      encoding: "utf8",
    })
  } catch {
    return []
  }

  const topicDirs = topicEntries.filter(
    (entry) => entry.isDirectory() && entry.name !== "brief"
  )

  const notionOrder: NotionSyncOrder | null = await fs
    .readFile(NOTION_ORDER_FILE, "utf8")
    .then((raw) => JSON.parse(raw) as NotionSyncOrder)
    .catch(() => null)

  const topics = await Promise.all(
    topicDirs.map(async (topicDir) => {
      const topicPath = path.join(KNOWLEDGE_ROOT, topicDir.name)
      const files = await fs.readdir(topicPath, { withFileTypes: true, encoding: "utf8" })

      const dayFiles = files
        .filter((file) => file.isFile() && file.name.toLowerCase().endsWith(".md"))
        .map((file) => file.name)

      const dayOrder = notionOrder?.entryOrder?.[topicDir.name] ?? []
      const dayOrderIndex = new Map(
        dayOrder.map((fileName, index) => [fileName, index]),
      )

      const daysWithSource = await Promise.all(
        dayFiles.map(async (fileName) => {
          const filePath = path.join(topicPath, fileName)
          const briefPath = path.join(KNOWLEDGE_BRIEF_ROOT, topicDir.name, fileName)
          const content = await fs.readFile(filePath, "utf8")
          const briefContent = await fs.readFile(briefPath, "utf8").catch(() => null)
          const parsed = fileName.match(/^Day\s+(\d+)\s*:\s*(.+)\.md$/i)

          const dayNumber = parsed ? Number(parsed[1]) : Number.MAX_SAFE_INTEGER
          const dayTitle = parsed ? parsed[2].trim() : fileName.replace(/\.md$/i, "")

          return {
            day: dayNumber,
            title: dayTitle,
            note: extractPreview(briefContent ?? content),
            content: content.trim(),
            briefContent: briefContent?.trim() ?? null,
            sourceFile: fileName,
          }
        })
      )

      daysWithSource.sort((a, b) => {
        const leftOrder = dayOrderIndex.get(a.sourceFile)
        const rightOrder = dayOrderIndex.get(b.sourceFile)

        if (leftOrder !== undefined || rightOrder !== undefined) {
          if (leftOrder === undefined) return 1
          if (rightOrder === undefined) return -1
          if (leftOrder !== rightOrder) return leftOrder - rightOrder
        }

        if (a.day !== b.day) return a.day - b.day
        return naturalCompare(a.title, b.title)
      })

      const days = daysWithSource.map((dayItem) => ({
        day: dayItem.day,
        title: dayItem.title,
        note: dayItem.note,
        content: dayItem.content,
        briefContent: dayItem.briefContent,
      }))

      const totalDays = parseTargetDays(topicDir.name)
      const uniqueDayNumbers = new Set(
        days
          .map((dayItem) => dayItem.day)
          .filter(
            (dayNumber) =>
              Number.isFinite(dayNumber) && dayNumber !== Number.MAX_SAFE_INTEGER
          ),
      )
      const progressMultiplier = TOPIC_PROGRESS_MULTIPLIER[topicDir.name] ?? 1
      const completedDays = isDayBasedTopic(topicDir.name)
        ? uniqueDayNumbers.size * progressMultiplier
        : days.length
      const fallbackDescription = totalDays
        ? `${completedDays} of ${totalDays} day notes are currently documented in this track.`
        : isDayBasedTopic(topicDir.name)
          ? `${completedDays} day notes are currently documented in this track.`
          : `${completedDays} topic notes are currently documented in this track.`
      const description = TOPIC_BRIEF_DESCRIPTIONS[topicDir.name] ?? fallbackDescription

      return {
        title: topicDir.name,
        totalDays,
        completedDays,
        description,
        days,
      }
    })
  )

  const topicOrder = notionOrder?.topicOrder ?? []
  const topicOrderIndex = new Map(topicOrder.map((title, index) => [title, index]))

  topics.sort((a, b) => {
    const leftPriority = getTopicPriority(a.title)
    const rightPriority = getTopicPriority(b.title)

    if (leftPriority !== rightPriority) {
      return leftPriority - rightPriority
    }

    const leftTopicOrder = topicOrderIndex.get(a.title)
    const rightTopicOrder = topicOrderIndex.get(b.title)

    if (leftTopicOrder !== undefined || rightTopicOrder !== undefined) {
      if (leftTopicOrder === undefined) return 1
      if (rightTopicOrder === undefined) return -1
      if (leftTopicOrder !== rightTopicOrder) {
        return leftTopicOrder - rightTopicOrder
      }
    }

    const leftOrder = KNOWLEDGE_TOPIC_ORDER[a.title] ?? Number.MAX_SAFE_INTEGER
    const rightOrder = KNOWLEDGE_TOPIC_ORDER[b.title] ?? Number.MAX_SAFE_INTEGER

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder
    }

    return naturalCompare(a.title, b.title)
  })

  return topics
}

export function slugifyKnowledgeTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function slugifyKnowledgeTopic(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function normalizeKnowledgeSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function stripLeadingOrdinalPrefix(value: string) {
  return value.replace(/^\d+-/, "")
}

function scoreKnowledgeSlugMatch(inputSlug: string, entryTitleSlug: string) {
  if (!inputSlug || !entryTitleSlug) {
    return { score: 0, distance: Number.MAX_SAFE_INTEGER }
  }

  if (entryTitleSlug === inputSlug) {
    return { score: 100, distance: 0 }
  }

  const entryWithoutOrdinal = stripLeadingOrdinalPrefix(entryTitleSlug)
  if (entryWithoutOrdinal === inputSlug) {
    return { score: 95, distance: 0 }
  }

  if (entryWithoutOrdinal.startsWith(`${inputSlug}-`)) {
    return {
      score: 80,
      distance: Math.max(0, entryWithoutOrdinal.length - inputSlug.length),
    }
  }

  if (inputSlug.startsWith(`${entryWithoutOrdinal}-`)) {
    return {
      score: 70,
      distance: Math.max(0, inputSlug.length - entryWithoutOrdinal.length),
    }
  }

  return { score: 0, distance: Number.MAX_SAFE_INTEGER }
}

export async function getKnowledgeEntryByTopicAndSlug(
  topicTitle: string,
  slug: string,
) {
  const topics = await getKnowledgeTopics()
  const topic = topics.find((entry) => entry.title === topicTitle)

  if (!topic) {
    return null
  }

  const dayItem = topic.days.find(
    (entry) => slugifyKnowledgeTitle(entry.title) === slug,
  )

  if (!dayItem) {
    return null
  }

  return {
    topic,
    dayItem,
  }
}

export async function getKnowledgeEntryByTopicSlugAndSlug(
  topicSlug: string,
  slug: string,
) {
  const topics = await getKnowledgeTopics()
  const topic = topics.find(
    (entry) => slugifyKnowledgeTopic(entry.title) === topicSlug,
  )

  if (!topic) {
    return null
  }

  const dayItem = topic.days.find(
    (entry) => slugifyKnowledgeTitle(entry.title) === slug,
  )

  if (!dayItem) {
    return null
  }

  return {
    topic,
    dayItem,
  }
}

export async function getKnowledgeEntryBySlug(slug: string) {
  const normalizedSlug = normalizeKnowledgeSlug(slug)
  if (!normalizedSlug) {
    return null
  }

  const topics = await getKnowledgeTopics()
  let bestMatch:
    | {
        topic: KnowledgeTopic
        dayItem: KnowledgeDay
        score: number
        distance: number
      }
    | null = null

  for (const topic of topics) {
    for (const dayItem of topic.days) {
      const entrySlug = slugifyKnowledgeTitle(dayItem.title)
      const match = scoreKnowledgeSlugMatch(normalizedSlug, entrySlug)

      if (match.score === 0) {
        continue
      }

      if (
        !bestMatch ||
        match.score > bestMatch.score ||
        (match.score === bestMatch.score && match.distance < bestMatch.distance)
      ) {
        bestMatch = {
          topic,
          dayItem,
          score: match.score,
          distance: match.distance,
        }
      }
    }
  }

  if (bestMatch) {
    return {
      topic: bestMatch.topic,
      dayItem: bestMatch.dayItem,
    }
  }

  return null
}
