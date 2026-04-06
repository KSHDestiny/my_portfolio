import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import {
  getKnowledgeEntryByTopicAndSlug,
  getKnowledgeTopics,
  slugifyKnowledgeTitle,
} from "@/lib/knowledge";
import { absoluteUrl } from "@/lib/site";

const ENGINEERING_TOPIC_TITLE = "Advanced Software Engineering";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const topics = await getKnowledgeTopics();
  const topic = topics.find((entry) => entry.title === ENGINEERING_TOPIC_TITLE);

  if (!topic) {
    return [];
  }

  return topic.days.map((dayItem) => ({
    slug: slugifyKnowledgeTitle(dayItem.title),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getKnowledgeEntryByTopicAndSlug(ENGINEERING_TOPIC_TITLE, slug);

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

function renderLines(content: string) {
  return content
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line, index, lines) => {
      if (line.length > 0) return true;
      return lines[index - 1]?.length > 0 && lines[index + 1]?.length > 0;
    });
}

export default async function EngineeringNotePage({ params }: PageProps) {
  const { slug } = await params;
  const entry = await getKnowledgeEntryByTopicAndSlug(ENGINEERING_TOPIC_TITLE, slug);

  if (!entry) {
    notFound();
  }

  const { dayItem, topic } = entry;
  const lines = renderLines(dayItem.content);

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
              {lines.map((line, index) => {
                if (line.startsWith("## ")) {
                  return (
                    <h2 key={`${line}-${index}`} className="pt-2 text-2xl font-semibold">
                      {line.replace(/^##\s+/, "")}
                    </h2>
                  );
                }

                if (line.startsWith("### ")) {
                  return (
                    <h3 key={`${line}-${index}`} className="pt-2 text-xl font-semibold">
                      {line.replace(/^###\s+/, "")}
                    </h3>
                  );
                }

                if (line === "---") {
                  return <hr key={`${line}-${index}`} className="border-border/70" />;
                }

                if (line.startsWith("- ")) {
                  return (
                    <div
                      key={`${line}-${index}`}
                      className="flex items-start gap-3 text-sm leading-7 text-foreground/90 md:text-base"
                    >
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                      <span>{line.replace(/^-+\s+/, "")}</span>
                    </div>
                  );
                }

                return (
                  <p
                    key={`${line}-${index}`}
                    className="text-sm leading-7 text-foreground/90 md:text-base"
                  >
                    {line}
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
