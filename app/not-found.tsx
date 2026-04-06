import Link from "next/link";
import { ArrowLeft, Home, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(239,246,255,0.92))] py-16 text-foreground dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_50%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(10,15,29,0.92))] dark:text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-primary/15 bg-background/80 p-8 shadow-[0_24px_80px_-60px_rgba(59,130,246,0.7)] backdrop-blur-sm md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75">
              Error 404
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              This page could not be found
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              The link may be outdated, the page may have moved, or the URL may
              be incorrect. You can head back to the portfolio homepage or jump
              straight to the main sections from here.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                <Home className="h-4 w-4" />
                Back to Homepage
              </Link>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/70 px-5 py-3 text-sm font-medium text-foreground transition hover:bg-background/90 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
                View Projects
              </Link>
              <Link
                href="mailto:kaungsathein.5899@gmail.com?subject=Broken%20Link%20Report"
                className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/70 px-5 py-3 text-sm font-medium text-foreground transition hover:bg-background/90 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
                Report Broken Link
              </Link>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
              <Link
                href="/#about"
                className="rounded-2xl border border-primary/10 bg-background/65 px-4 py-4 transition hover:border-primary/35 hover:text-foreground"
              >
                Learn about my background
              </Link>
              <Link
                href="/#knowledge"
                className="rounded-2xl border border-primary/10 bg-background/65 px-4 py-4 transition hover:border-primary/35 hover:text-foreground"
              >
                Read engineering notes
              </Link>
              <Link
                href="/#contact"
                className="rounded-2xl border border-primary/10 bg-background/65 px-4 py-4 transition hover:border-primary/35 hover:text-foreground"
              >
                Get in touch directly
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
