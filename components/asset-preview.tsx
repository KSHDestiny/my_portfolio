"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const AUTOPLAY_MS = 3000;

export type PreviewAsset = {
  title: string;
  url?: string;
  slides?: string[];
  message?: string;
};

function isImageAsset(url: string) {
  return /\.(gif|png|jpe?g|webp|svg)$/i.test(url);
}

const FRAME_CLASS =
  "relative h-[62vh] w-full overflow-hidden rounded-md border border-border/70 bg-background md:h-[68vh]";

function SlideCarousel({
  slides,
  title,
}: {
  slides: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const total = slides.length;
  // Set once the viewer takes control, so autoplay never fights their input.
  const tookControlRef = useRef(false);

  // Restart at the first slide whenever a different preview is opened.
  useEffect(() => {
    setIndex(0);
    setIsPlaying(true);
    tookControlRef.current = false;
  }, [slides]);

  const step = useCallback(
    (direction: 1 | -1) => {
      setIndex((current) => (current + direction + total) % total);
    },
    [total],
  );

  // Manual navigation stops autoplay for the rest of the session.
  const stepManually = useCallback(
    (direction: 1 | -1) => {
      tookControlRef.current = true;
      setIsPlaying(false);
      step(direction);
    },
    [step],
  );

  const goToManually = useCallback((slideIndex: number) => {
    tookControlRef.current = true;
    setIsPlaying(false);
    setIndex(slideIndex);
  }, []);

  useEffect(() => {
    if (total < 2) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        stepManually(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepManually(-1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [stepManually, total]);

  // Advance every 3s, stopping on the last slide so the deck has a clear end.
  useEffect(() => {
    if (total < 2 || !isPlaying || isHovered) return;
    if (index >= total - 1) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const timer = window.setTimeout(() => {
      if (!tookControlRef.current) setIndex((current) => current + 1);
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [index, isPlaying, isHovered, total]);

  return (
    <div className="flex flex-col gap-3">
      <div className={FRAME_CLASS}>
        {slides.map((slide, slideIndex) => (
          <Image
            key={slide}
            src={slide}
            alt={`${title} — step ${slideIndex + 1} of ${total}`}
            fill
            // Keep every slide mounted so stepping through is instant and the
            // browser can decode ahead; only the active one is visible.
            className={`object-contain transition-opacity duration-200 ${
              slideIndex === index ? "opacity-100" : "opacity-0"
            }`}
            sizes="96vw"
            priority={slideIndex === 0}
            aria-hidden={slideIndex !== index}
          />
        ))}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => stepManually(-1)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border/70 bg-background/90 p-2.5 text-foreground shadow-md backdrop-blur transition hover:scale-105 hover:bg-background hover:text-primary md:left-3 md:p-3"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
              type="button"
              onClick={() => stepManually(1)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border/70 bg-background/90 p-2.5 text-foreground shadow-md backdrop-blur transition hover:scale-105 hover:bg-background hover:text-primary md:right-3 md:p-3"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  // Pressing play hands control back to the slideshow, and
                  // replays from the start once it has reached the end.
                  tookControlRef.current = false;
                  setIsPlaying((playing) => {
                    if (!playing && index >= total - 1) setIndex(0);
                    return !playing;
                  });
                }}
                className="rounded-full border border-border/70 bg-background/90 p-1.5 text-muted-foreground backdrop-blur transition hover:text-foreground"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? (
                  <Pause className="h-3.5 w-3.5" />
                ) : (
                  <Play className="h-3.5 w-3.5" />
                )}
              </button>
              <span className="rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                {index + 1} / {total}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 h-0.5 bg-border/40">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((index + 1) / total) * 100}%` }}
              />
            </div>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide}
              type="button"
              onClick={() => goToManually(slideIndex)}
              className={`h-1.5 rounded-full transition-all ${
                slideIndex === index
                  ? "w-5 bg-primary"
                  : "w-1.5 bg-primary/25 hover:bg-primary/50"
              }`}
              aria-label={`Go to slide ${slideIndex + 1}`}
              aria-current={slideIndex === index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AssetPreview({
  asset,
  fallbackMessage = "A preview is not available in this portfolio build yet.",
}: {
  asset: PreviewAsset | null;
  fallbackMessage?: string;
}) {
  if (asset?.slides?.length) {
    return <SlideCarousel slides={asset.slides} title={asset.title} />;
  }

  if (asset?.url) {
    return isImageAsset(asset.url) ? (
      <div className={FRAME_CLASS}>
        <Image
          src={asset.url}
          alt={asset.title}
          fill
          className="object-contain"
          sizes="96vw"
          unoptimized
        />
      </div>
    ) : (
      <iframe
        src={asset.url}
        title={asset.title}
        className="h-[62vh] w-full rounded-md border border-border/70 bg-background md:h-[68vh]"
      />
    );
  }

  return (
    <div className="flex h-[40vh] items-center justify-center rounded-md border border-border/70 bg-background/60 p-8 text-center md:h-[46vh]">
      <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
        {asset?.message ?? fallbackMessage}
      </p>
    </div>
  );
}
