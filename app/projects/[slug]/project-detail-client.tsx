"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import type { ProjectTagDetail } from "@/lib/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function isImageAsset(url: string) {
  return /\.(gif|png|jpe?g|webp|svg)$/i.test(url);
}

function normalizeTagDetail(detail?: ProjectTagDetail | null) {
  if (!detail) return null;

  if (typeof detail === "string") {
    return {
      summary: detail,
      highlights: [] as string[],
      ctaLabel: undefined as string | undefined,
      ctaUrl: undefined as string | undefined,
    };
  }

  return {
    summary: detail.summary,
    highlights: detail.highlights ?? [],
    ctaLabel: detail.ctaLabel,
    ctaUrl: detail.ctaUrl,
  };
}

type Props = {
  projectTitle: string;
  tags: string[];
  tagDetails?: Record<string, ProjectTagDetail>;
};

export default function ProjectDetailClient({
  projectTitle,
  tags,
  tagDetails,
}: Props) {
  const [previewAsset, setPreviewAsset] = useState<{
    title: string;
    url?: string;
  } | null>(null);

  const detailEntries = tags
    .map((tag) => {
      const detail = normalizeTagDetail(tagDetails?.[tag]);

      if (!detail) return null;

      return { tag, detail };
    })
    .filter(
      (
        entry,
      ): entry is {
        tag: string;
        detail: NonNullable<ReturnType<typeof normalizeTagDetail>>;
      } => Boolean(entry),
    );

  if (detailEntries.length === 0) {
    return (
      <Card className="border-primary/15 bg-background/80">
        <CardHeader>
          <CardTitle>Project Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-7 text-muted-foreground">
            More detailed breakdown sections are not published for this project
            yet, but the portfolio overview already reflects the main outcome
            and delivery scope.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {detailEntries.map(({ tag, detail }) => (
          <Card
            key={`${projectTitle}-${tag}`}
            className="border-primary/15 bg-background/80 shadow-[0_20px_50px_-40px_rgba(59,130,246,0.75)]"
          >
            <CardHeader className="space-y-3">
              <CardTitle className="text-lg">{tag}</CardTitle>
              <p className="text-sm leading-7 text-muted-foreground">
                {detail.summary}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {detail.highlights.length > 0 ? (
                <ul className="space-y-2 text-sm leading-6 text-foreground/85">
                  {detail.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {detail.ctaUrl ? (
                <button
                  type="button"
                  onClick={() =>
                    setPreviewAsset({
                      title: `${projectTitle} · ${tag}`,
                      url: detail.ctaUrl,
                    })
                  }
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80"
                >
                  {detail.ctaLabel ?? "Open Related Asset"}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={Boolean(previewAsset)}
        onOpenChange={(open) => {
          if (!open) {
            setPreviewAsset(null);
          }
        }}
      >
        <DialogContent className="w-[96vw] max-w-5xl p-4 sm:p-5">
          <DialogClose className="absolute right-4 top-4 rounded-full border border-border/70 bg-background/90 p-2 text-muted-foreground transition hover:text-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close preview</span>
          </DialogClose>
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">
              {previewAsset?.title}
            </DialogTitle>
          </DialogHeader>
          {previewAsset?.url ? (
            isImageAsset(previewAsset.url) ? (
              <div className="relative h-[62vh] w-full overflow-hidden rounded-md border border-border/70 bg-background md:h-[68vh]">
                <Image
                  src={previewAsset.url}
                  alt={previewAsset.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <iframe
                src={previewAsset.url}
                title={previewAsset.title}
                className="h-[62vh] w-full rounded-md border border-border/70 bg-background md:h-[68vh]"
              />
            )
          ) : (
            <div className="flex h-[40vh] items-center justify-center rounded-md border border-border/70 bg-background/60 p-8 text-center md:h-[46vh]">
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                A preview is not available for this artifact yet.
              </p>
            </div>
          )}
          {previewAsset?.url ? (
            <Link
              href={previewAsset.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80"
            >
              Open in new tab
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
