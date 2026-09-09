"use client";

import { useEffect, useState } from "react";
import { Info, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AUTO_HIDE_MS = 5_000;

export function BuildInfoBadge() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => setOpen(false), AUTO_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="About how this site was built"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-background/80 text-primary shadow-lg backdrop-blur-md transition-transform hover:scale-105"
          >
            <Info className="relative h-5 w-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent side="top" align="end" className="w-72 border-primary/20">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-foreground">
              This portfolio was built and shipped end-to-end by{" "}
              <span className="font-medium text-primary">Claude</span>, an AI
              coding agent — directed entirely from a phone.
            </p>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => setOpen(false)}
              className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
