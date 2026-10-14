"use client";

import { Component, type ReactNode } from "react";

type KnowledgeErrorBoundaryProps = {
  children: ReactNode;
};

type KnowledgeErrorBoundaryState = {
  hasError: boolean;
};

export class KnowledgeErrorBoundary extends Component<
  KnowledgeErrorBoundaryProps,
  KnowledgeErrorBoundaryState
> {
  state: KnowledgeErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Logged so the failure is visible in the browser/server console without
    // taking down the rest of the page.
    console.error("Engineering Notes section failed to render:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mt-8 rounded-2xl border border-primary/15 bg-background/60 p-6 text-center text-sm text-muted-foreground md:text-base">
          Engineering notes couldn&apos;t load right now. The rest of the site
          is unaffected — please check back later.
        </div>
      );
    }

    return this.props.children;
  }
}
