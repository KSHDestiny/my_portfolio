"use client";

import dynamic from "next/dynamic";

type KnowledgeDay = {
  day: number;
  title: string;
  note: string;
  content: string;
  briefContent: string | null;
};

type KnowledgeTopic = {
  title: string;
  totalDays: number | null;
  completedDays: number;
  description: string;
  days: KnowledgeDay[];
};

type KnowledgeTopicsShellProps = {
  knowledgeTopics: KnowledgeTopic[];
};

const KnowledgeTopicsClient = dynamic(
  () => import("./knowledge-topics-client"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-8 animate-pulse space-y-4">
        <div className="h-12 rounded-2xl bg-muted/70" />
        <div className="h-64 rounded-[2rem] bg-muted/70" />
      </div>
    ),
  },
);

export default function KnowledgeTopicsShell(
  props: KnowledgeTopicsShellProps,
) {
  return <KnowledgeTopicsClient {...props} />;
}
