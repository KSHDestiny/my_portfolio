import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import {
  getKnowledgeEntryBySlug,
  getKnowledgeTopics,
  slugifyKnowledgeTitle,
} from "@/lib/knowledge";
import { absoluteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const topics = await getKnowledgeTopics();
  const seen = new Set<string>();

  return topics
    .flatMap((topic) => topic.days)
    .map((dayItem) => slugifyKnowledgeTitle(dayItem.title))
    .filter((slug) => {
      if (seen.has(slug)) return false;
      seen.add(slug);
      return true;
    })
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getKnowledgeEntryBySlug(slug);

  if (!entry) {
    return {
      title: "Engineering Note Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url = absoluteUrl(`/engineering-notes/${slug}`);

  return {
    title: `${entry.dayItem.title} | Engineering Notes`,
    description: entry.dayItem.note,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: `${entry.dayItem.title} | Engineering Notes`,
      description: entry.dayItem.note,
      images: [
        {
          url: absoluteUrl("/images/profile.jpeg"),
          width: 1200,
          height: 1200,
          alt: entry.dayItem.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${entry.dayItem.title} | Engineering Notes`,
      description: entry.dayItem.note,
      images: [absoluteUrl("/images/profile.jpeg")],
    },
  };
}

type ContentBlock =
  | { type: "heading2"; text: string }
  | { type: "heading3"; text: string }
  | { type: "divider" }
  | { type: "bullet"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; language: string | null; code: string };

function parseContentBlocks(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const lines = content.split("\n").map((line) => line.replace(/\r$/, ""));

  let inCodeBlock = false;
  let codeLanguage: string | null = null;
  let codeLines: string[] = [];

  const pushCodeBlock = () => {
    blocks.push({
      type: "code",
      language: codeLanguage,
      code: codeLines.join("\n"),
    });
    inCodeBlock = false;
    codeLanguage = null;
    codeLines = [];
  };

  for (const line of lines) {
    const trimmedEnd = line.trimEnd();
    const trimmed = trimmedEnd.trim();

    if (trimmed.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        const language = trimmed.slice(3).trim();
        codeLanguage = language.length > 0 ? language : null;
        continue;
      }

      pushCodeBlock();
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(trimmedEnd);
      continue;
    }

    if (trimmed.length === 0) {
      continue;
    }

    if (trimmed.startsWith("## ")) {
      blocks.push({
        type: "heading2",
        text: trimmed.replace(/^##\s+/, ""),
      });
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({
        type: "heading3",
        text: trimmed.replace(/^###\s+/, ""),
      });
      continue;
    }

    if (trimmed === "---") {
      blocks.push({ type: "divider" });
      continue;
    }

    if (/^[-*+]\s+/.test(trimmed)) {
      blocks.push({
        type: "bullet",
        text: trimmed.replace(/^[-*+]\s+/, ""),
      });
      continue;
    }

    blocks.push({
      type: "paragraph",
      text: trimmed,
    });
  }

  if (inCodeBlock) {
    pushCodeBlock();
  }

  return blocks;
}

export default async function EngineeringNotePage({ params }: PageProps) {
  const { slug } = await params;
  const entry = await getKnowledgeEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const { dayItem, topic } = entry;
  const blocks = parseContentBlocks(dayItem.content);

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(239,246,255,0.92))] py-16 text-foreground dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_50%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(10,15,29,0.92))] dark:text-primary-foreground">
        <div className="container mx-auto px-4">
          <Link
            href="/#knowledge"
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/70 px-4 py-2 text-sm text-muted-foreground transition hover:bg-background/90 hover:text-foreground dark:border-white/15 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Engineering Notes
          </Link>

          <div className="mt-8 max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 dark:text-primary-foreground/65">
              <span>{topic.title}</span>
              <span className="h-1 w-1 rounded-full bg-primary/35 dark:bg-primary-foreground/35" />
              <span>Engineering Note</span>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">
                {dayItem.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground dark:text-primary-foreground/78 md:text-lg">
                {dayItem.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <article className="mx-auto max-w-4xl rounded-3xl border border-primary/15 bg-background/85 p-6 shadow-[0_20px_50px_-40px_rgba(59,130,246,0.75)] md:p-8">
            <div className="space-y-4">
              {blocks.map((block, index) => {
                if (block.type === "heading2") {
                  return (
                    <h2 key={`h2-${index}`} className="pt-2 text-2xl font-semibold">
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "heading3") {
                  return (
                    <h3 key={`h3-${index}`} className="pt-2 text-xl font-semibold">
                      {block.text}
                    </h3>
                  );
                }

                if (block.type === "divider") {
                  return <hr key={`hr-${index}`} className="border-border/70" />;
                }

                if (block.type === "bullet") {
                  return (
                    <div
                      key={`bullet-${index}`}
                      className="flex items-start gap-3 text-sm leading-7 text-foreground/90 md:text-base"
                    >
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                      <span>{block.text}</span>
                    </div>
                  );
                }

                if (block.type === "code") {
                  return (
                    <div key={`code-${index}`} className="rounded-md border bg-muted/50">
                      {block.language && (
                        <div className="border-b px-3 py-1.5 text-xs text-muted-foreground">
                          {block.language}
                        </div>
                      )}
                      <pre className="overflow-x-auto p-3 text-xs md:text-sm leading-6 font-mono">
                        <code>{block.code}</code>
                      </pre>
                    </div>
                  );
                }

                return (
                  <p
                    key={`p-${index}`}
                    className="text-sm leading-7 text-foreground/90 md:text-base"
                  >
                    {block.text}
                  </p>
                );
              })}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
