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
  description: string
  days: KnowledgeDay[]
}

const KNOWLEDGE_ROOT = path.join(process.cwd(), "knowledge")
const KNOWLEDGE_BRIEF_ROOT = path.join(KNOWLEDGE_ROOT, "brief")
const TOPIC_BRIEF_DESCRIPTIONS: Record<string, string> = {
  "100 Days of DevOps":
    "A practical day-by-day DevOps journey covering Linux administration, automation, networking, security, web stack setup, and production troubleshooting.",
}

function parseTargetDays(topicName: string): number | null {
  const match = topicName.match(/(\d+)\s+Days/i)
  return match ? Number(match[1]) : null
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

export async function getKnowledgeTopics(): Promise<KnowledgeTopic[]> {
  let topicEntries: { name: string; isDirectory: () => boolean }[] = []

  try {
    topicEntries = await fs.readdir(KNOWLEDGE_ROOT, { withFileTypes: true, encoding: "utf8" })
  } catch {
    return []
  }

  const topicDirs = topicEntries.filter((entry) => entry.isDirectory() && entry.name !== "brief")

  const topics = await Promise.all(
    topicDirs.map(async (topicDir) => {
      const topicPath = path.join(KNOWLEDGE_ROOT, topicDir.name)
      const files = await fs.readdir(topicPath, { withFileTypes: true, encoding: "utf8" })

      const dayFiles = files
        .filter((file) => file.isFile() && file.name.toLowerCase().endsWith(".md"))
        .map((file) => file.name)

      const days = await Promise.all(
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
          }
        })
      )

      days.sort((a, b) => {
        if (a.day !== b.day) return a.day - b.day
        return a.title.localeCompare(b.title)
      })

      const totalDays = parseTargetDays(topicDir.name)
      const fallbackDescription = totalDays
        ? `${days.length} of ${totalDays} day notes are currently documented in this track.`
        : `${days.length} day notes are currently documented in this track.`
      const description = TOPIC_BRIEF_DESCRIPTIONS[topicDir.name] ?? fallbackDescription

      return {
        title: topicDir.name,
        totalDays,
        description,
        days,
      }
    })
  )

  topics.sort((a, b) => a.title.localeCompare(b.title))
  return topics
}
