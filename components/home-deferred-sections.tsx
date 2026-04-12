"use client";

import dynamic from "next/dynamic";

function DeferredSectionFallback() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mx-auto max-w-5xl animate-pulse space-y-4">
        <div className="h-4 w-28 rounded-full bg-primary/15" />
        <div className="h-10 w-64 rounded-full bg-muted" />
        <div className="h-24 rounded-3xl bg-muted/70" />
      </div>
    </div>
  );
}

const Skills = dynamic(() => import("@/components/skills"), {
  ssr: false,
  loading: () => <DeferredSectionFallback />,
});

const Education = dynamic(() => import("@/components/education"), {
  ssr: false,
  loading: () => <DeferredSectionFallback />,
});

const Contact = dynamic(() => import("@/components/contact"), {
  ssr: false,
  loading: () => <DeferredSectionFallback />,
});

export function DeferredSkillsSection() {
  return <Skills />;
}

export function DeferredEducationSection() {
  return <Education />;
}

export function DeferredContactSection() {
  return <Contact />;
}
