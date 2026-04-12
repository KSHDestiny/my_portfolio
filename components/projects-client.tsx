"use client";

import {
  memo,
  useEffect,
  startTransition,
  useRef,
  useState,
  type MouseEvent,
  type WheelEvent,
} from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Database,
  ExternalLink,
  FileText,
  GitBranch,
  Hammer,
  Info,
  Network,
  ShieldCheck,
  X,
} from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import AnimateInView from "./animations/animate-in-view";
import SectionHeading from "./section-heading";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  slugifyProjectTitle,
  type Project,
  type ProjectTagDetail,
  type ProjectsSource,
} from "@/lib/projects";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

function getCardPose(offset: number, isMobile: boolean) {
  const distance = Math.abs(offset);

  if (isMobile) {
    if (distance > 1) {
      return {
        x: offset > 0 ? "160%" : "-160%",
        rotateY: 0,
        scale: 0.9,
        opacity: 0,
        zIndex: 0,
        filter: "blur(2px) saturate(0.65)",
      };
    }

    if (distance === 1) {
      return {
        x: offset > 0 ? "120%" : "-120%",
        rotateY: 0,
        scale: 0.92,
        opacity: 0.14,
        zIndex: 10,
        filter: "blur(1px) saturate(0.75)",
      };
    }

    return {
      x: "0%",
      rotateY: 0,
      scale: 1,
      opacity: 1,
      zIndex: 50,
      filter: "none",
    };
  }

  if (distance > 3) {
    return {
      x: offset > 0 ? "150%" : "-150%",
      rotateY: offset > 0 ? -62 : 62,
      scale: 0.54,
      opacity: 0,
      zIndex: 0,
      filter: "blur(4px) saturate(0.55)",
    };
  }

  const positions = ["0%", "54%", "92%", "122%"];
  const x =
    offset === 0 ? "0%" : `${offset < 0 ? "-" : ""}${positions[distance]}`;

  return {
    x,
    rotateY: offset * -28,
    scale: 1 - distance * 0.18,
    opacity: Math.max(0.14, 1 - distance * 0.32),
    zIndex: 50 - distance,
    filter: `blur(${distance * 1.1}px) saturate(${Math.max(0.3, 1 - distance * 0.28)}) brightness(${Math.max(
      0.5,
      1 - distance * 0.18,
    )})`,
  };
}

function getTagIcon(tag: string) {
  const tagMap: Record<string, typeof FileText> = {
    Requirements: FileText,
    Architecture: Network,
    Workflow: GitBranch,
    ERD: Database,
    Implementation: Hammer,
    Testing: ShieldCheck,
  };

  return tagMap[tag] ?? FileText;
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

function getDefaultTag(project: Project) {
  if (!project.tagDetails) return null;
  if (project.tagDetails.Requirements) return "Requirements";
  return project.tags.find((tag) => Boolean(project.tagDetails?.[tag])) ?? null;
}

function isImageAsset(url: string) {
  return /\.(gif|png|jpe?g|webp|svg)$/i.test(url);
}

const PROJECT_SECTION_COPY: Record<
  string,
  {
    eyebrow: string;
    description: string;
  }
> = {
  Projects: {
    eyebrow: "Production Systems",
    description:
      "Backend-led product work shaped by business rules, integrations, scale, and production delivery.",
  },
  "Feature Highlights": {
    eyebrow: "System Design Views",
    description:
      "Focused breakdowns that show architecture thinking, workflows, and data modeling behind key features.",
  },
};

const ProjectSlide = memo(function ProjectSlide({
  project,
  offset,
  isMobile,
  isActive,
  onSelect,
  onStep,
}: {
  project: Project;
  offset: number;
  isMobile: boolean;
  isActive: boolean;
  onSelect: () => void;
  onStep: (direction: 1 | -1) => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [selectedTag, setSelectedTag] = useState<string | null>(() =>
    getDefaultTag(project),
  );
  const [previewAsset, setPreviewAsset] = useState<{
    title: string;
    url?: string;
    message?: string;
  } | null>(null);
  const hasFeatureModules = Boolean(
    project.tagDetails && Object.keys(project.tagDetails).length > 0,
  );
  const detailHref = `/projects/${slugifyProjectTitle(project.title)}`;

  useEffect(() => {
    setSelectedTag(getDefaultTag(project));
  }, [project]);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(220px at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.18), transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };
  const pose = getCardPose(offset, isMobile);
  const selectedTagDetail = normalizeTagDetail(
    selectedTag && project.tagDetails ? project.tagDetails[selectedTag] : null,
  );
  const SelectedTagIcon = selectedTag ? getTagIcon(selectedTag) : null;

  return (
    <motion.div
      className="absolute left-[6%] top-0 w-[88%] max-w-[430px] cursor-pointer md:left-[37%] md:w-[84vw] md:max-w-[520px]"
      animate={pose}
      initial={false}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d", perspective: 1800 }}
      onClick={onSelect}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 80) onStep(-1);
        if (info.offset.x < -80) onStep(1);
      }}
    >
      <Card
        onMouseMove={handleMouseMove}
        className={`relative flex h-[430px] flex-col overflow-hidden border-primary/20 backdrop-blur-xl transition-all md:h-[380px] ${
          isActive
            ? "bg-background/95 shadow-2xl shadow-primary/15 ring-1 ring-primary/20"
            : "bg-background/30 shadow-lg shadow-black/5"
        }`}
      >
        <motion.div
          className={`pointer-events-none absolute inset-0 z-10 ${
            isActive ? "bg-primary/10" : "bg-background/20"
          }`}
          style={style}
          transition={{ duration: 0.12 }}
        />
        {!isActive && (
          <div className="pointer-events-none absolute inset-0 z-10 bg-background/55" />
        )}
        <CardHeader
          className={`relative z-20 pb-3 ${
            isActive ? "" : "pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <CardTitle
              className={`min-w-0 text-base leading-tight md:text-lg ${
                isActive ? "text-foreground" : "text-foreground/45"
              }`}
            >
              {project.title}
            </CardTitle>
            {project.periodCtaUrl || project.periodCtaMessage ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setPreviewAsset({
                    title: `${project.title} UI Preview`,
                    url: project.periodCtaUrl,
                    message: project.periodCtaMessage,
                  });
                }}
                className={`inline-flex shrink-0 items-center gap-1 self-start text-xs font-medium md:text-sm ${
                  isActive ? "text-primary hover:underline" : "text-primary/50"
                }`}
              >
                {project.period}
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            ) : (
              <div />
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();

                  if (!project.tagDetails?.[tag]) return;

                  setSelectedTag(tag);
                }}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                  project.tagDetails?.[tag] && isActive
                    ? "cursor-pointer hover:bg-primary/20 hover:text-primary"
                    : "cursor-default"
                } ${
                  selectedTag === tag && project.tagDetails?.[tag]
                    ? "bg-primary text-primary-foreground"
                    : ""
                } ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "bg-primary/5 text-primary/45"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent
          className={`relative z-20 flex min-h-0 flex-1 flex-col justify-between overflow-y-auto pr-1 md:px-5 md:pb-5 md:overflow-visible md:pr-5 ${
            isActive ? "" : "pointer-events-none"
          }`}
        >
          {selectedTagDetail && selectedTag ? (
            <div
              className={`mx-auto w-full max-w-[26rem] space-y-2 rounded-xl border p-3 md:p-4 ${
                isActive
                  ? "border-primary/35 bg-primary/5"
                  : "border-primary/15 bg-primary/5"
              }`}
            >
              <div
                className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${
                  isActive ? "text-primary" : "text-primary/65"
                }`}
              >
                {SelectedTagIcon && <SelectedTagIcon className="h-3.5 w-3.5" />}
                {selectedTag}
              </div>
              <CardDescription
                className={`text-sm leading-5 ${
                  isActive
                    ? "text-muted-foreground"
                    : "text-muted-foreground/38"
                }`}
              >
                {selectedTagDetail.summary}
              </CardDescription>
              {selectedTagDetail.highlights.length > 0 && (
                <TooltipProvider delayDuration={150}>
                  <ul
                    className={`space-y-1 text-xs ${
                      isActive ? "text-foreground/85" : "text-foreground/40"
                    }`}
                  >
                    {selectedTagDetail.highlights
                      .slice(0, 3)
                      .map((highlight) => (
                        <li key={highlight}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="block w-full cursor-help whitespace-normal leading-5 transition hover:text-foreground sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap">
                                • {highlight}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm text-xs leading-5">
                              • {highlight}
                            </TooltipContent>
                          </Tooltip>
                        </li>
                      ))}
                  </ul>
                </TooltipProvider>
              )}
              {selectedTagDetail.ctaLabel && selectedTagDetail.ctaUrl && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setPreviewAsset({
                      title: selectedTagDetail.ctaLabel ?? selectedTag,
                      url: selectedTagDetail.ctaUrl ?? "",
                    });
                  }}
                  className={`inline-flex items-center gap-1 text-xs font-medium ${
                    isActive
                      ? "text-primary hover:underline"
                      : "text-primary/55"
                  }`}
                >
                  {selectedTagDetail.ctaLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ) : (
            !hasFeatureModules && (
              <CardDescription
                className={`text-sm leading-6 ${
                  isActive
                    ? "text-muted-foreground"
                    : "text-muted-foreground/38"
                }`}
              >
                {project.description}
              </CardDescription>
            )
          )}
          <div className="flex items-center gap-2">
            <Link
              href={detailHref}
              className={`inline-flex items-center gap-1 text-sm ${
                isActive ? "text-primary hover:underline" : "text-primary/45"
              }`}
            >
              Read case study
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            {project.url && (
              <>
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 text-sm ${
                  isActive ? "text-primary hover:underline" : "text-primary/45"
                }`}
              >
                Open Project
                <ExternalLink className="h-4 w-4" />
              </Link>
              </>
            )}
            {project.infoMessage && isActive && (
                <TooltipProvider delayDuration={120}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={(event) => event.stopPropagation()}
                        className="ml-auto mr-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-primary/20 bg-background/70 text-primary transition hover:border-primary/45 hover:bg-primary/10"
                        aria-label="Project context"
                      >
                        <Info className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs leading-5">
                      {project.infoMessage}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={Boolean(previewAsset)}
        onOpenChange={(open) => {
          if (!open) {
            setPreviewAsset(null);
          }
        }}
      >
        <DialogContent
          className="w-[96vw] max-w-5xl p-4 sm:p-5"
          onClick={(event) => event.stopPropagation()}
        >
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
                  sizes="96vw"
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
                {previewAsset?.message ??
                  "A preview is not available in this portfolio build yet."}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
});

function ProjectCoverflowSection({
  title,
  projects,
  delay,
}: {
  title: string;
  projects: Project[];
  delay: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewAsset, setPreviewAsset] = useState<{
    title: string;
    url?: string;
    message?: string;
  } | null>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const lastWheelAtRef = useRef(0);
  const wheelLockRef = useRef(false);
  const sectionCopy = PROJECT_SECTION_COPY[title];

  function goTo(position: number) {
    const nextIndex = wrapIndex(position, projects.length);

    startTransition(() => {
      setActiveIndex(nextIndex);
    });
  }

  function goNext() {
    goTo(activeIndex + 1);
  }

  function goPrev() {
    goTo(activeIndex - 1);
  }

  function goToDelta(direction: 1 | -1) {
    goTo(activeIndex + direction);
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    const isHorizontalIntent =
      event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.2;

    if (!isHorizontalIntent) return;

    const dominantDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    if (Math.abs(dominantDelta) < 24) return;

    if (wheelLockRef.current) return;

    const now = Date.now();
    if (now - lastWheelAtRef.current < 550) {
      return;
    }

    lastWheelAtRef.current = now;
    wheelLockRef.current = true;
    event.preventDefault();
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 520);

    goToDelta(dominantDelta > 0 ? 1 : -1);
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <AnimateInView delay={delay} className="mb-16">
      <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/15 bg-gradient-to-br from-background/95 via-background/90 to-primary/10 px-5 py-5 shadow-[0_18px_60px_-40px_rgba(59,130,246,0.6)] md:max-w-3xl md:px-6">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(59,130,246,0.08),transparent_32%,transparent_68%,rgba(59,130,246,0.06))]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_70%)]" />
          <div className="relative space-y-3">
            {sectionCopy?.eyebrow && (
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-primary/35" />
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/75">
                  {sectionCopy.eyebrow}
                </div>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-3xl">
                {title}
              </h3>
              <div className="rounded-full border border-primary/20 bg-background/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80 backdrop-blur-sm">
                {projects.length} items
              </div>
            </div>
            {sectionCopy?.description && (
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                {sectionCopy.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={goPrev}
              className="rounded-2xl border border-primary/20 bg-background/70 p-3 text-primary transition hover:border-primary/50 hover:bg-primary/10"
              aria-label={`Previous ${title}`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="rounded-2xl border border-primary/20 bg-background/70 p-3 text-primary transition hover:border-primary/50 hover:bg-primary/10"
              aria-label={`Next ${title}`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(239,246,255,0.96)_45%,rgba(219,234,254,0.92))] px-4 py-8 shadow-[0_30px_90px_-60px_rgba(59,130,246,0.28)] dark:bg-[linear-gradient(135deg,rgba(2,6,23,0.96),rgba(9,16,35,0.96)_45%,rgba(20,39,77,0.92))] dark:shadow-[0_30px_90px_-60px_rgba(59,130,246,0.8)] md:px-8 md:py-10"
        onWheel={handleWheel}
        style={{ overscrollBehaviorX: "contain" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:36px_36px] opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.12),transparent_70%)]" />
        <div
          className="relative h-[480px] md:h-[410px]"
          style={{ perspective: 2200 }}
        >
          {projects.map((project, index) => {
            const offset = index - activeIndex;
            return (
              <ProjectSlide
                key={project.title}
                project={project}
                offset={offset}
                isMobile={isMobile}
                isActive={index === activeIndex}
                onStep={goToDelta}
                onSelect={() => {
                  if (index === activeIndex) return;
                  goTo(index);
                }}
              />
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {projects.map((project, index) => {
            return (
            <button
              key={project.title}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-10 bg-primary"
                  : "w-2.5 bg-primary/25"
              }`}
              aria-label={`Show ${project.title}`}
            />
            );
          })}
        </div>
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
                  sizes="96vw"
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
        </DialogContent>
      </Dialog>
    </AnimateInView>
  );
}

export default function ProjectsClient({
  productionProjects,
  keyFeatures,
  source,
}: {
  productionProjects: Project[];
  keyFeatures: Project[];
  source: ProjectsSource;
}) {
  return (
    <section id="projects" className="py-12 md:py-16 full-height">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <SectionHeading
            eyebrow="Selected Work"
            title="Featured Work"
            description="A selection of production systems, platform features, and architecture-driven work that reflects how I design, build, and scale backend-focused applications."
          />
          {source === "notion" && (
            <p className="mt-4 text-center text-xs font-medium uppercase tracking-[0.28em] text-primary/70">
              Synced from Notion
            </p>
          )}
        </AnimateInView>

        <ProjectCoverflowSection
          title="Projects"
          projects={productionProjects}
          delay={0.1}
        />
        <ProjectCoverflowSection
          title="Feature Highlights"
          projects={keyFeatures}
          delay={0.2}
        />
      </div>
    </section>
  );
}
