"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { BookOpen, CalendarRange, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimateInView from "./animations/animate-in-view";

type KnowledgeDay = {
  day: number;
  title: string;
  note: string;
  content: string;
};

type KnowledgeTopic = {
  title: string;
  totalDays: number | null;
  description: string;
  days: KnowledgeDay[];
};

type KnowledgeTopicsClientProps = {
  knowledgeTopics: KnowledgeTopic[];
};

function renderInlineMarkdown(text: string, keyPrefix: string): ReactNode[] {
  const tokenRegex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let tokenIndex = 0;
  let match = tokenRegex.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("`")) {
      nodes.push(
        <code
          key={`${keyPrefix}-code-${tokenIndex}`}
          className="px-1.5 py-0.5 rounded bg-muted font-mono text-[0.9em]"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("**")) {
      nodes.push(
        <strong
          key={`${keyPrefix}-strong-${tokenIndex}`}
          className="font-semibold"
        >
          {token.slice(2, -2)}
        </strong>,
      );
    }

    lastIndex = match.index + token.length;
    tokenIndex += 1;
    match = tokenRegex.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function isTableLine(line: string) {
  return /^\|(.+)\|$/.test(line.trim());
}

function isTableDividerLine(line: string) {
  return /^\|?[\s:-]+(\|[\s:-]+)+\|?$/.test(line.trim());
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const elements: ReactNode[] = [];
  let paragraphBuffer: string[] = [];
  let bulletBuffer: string[] = [];
  let numberBuffer: string[] = [];
  let codeBuffer: string[] = [];
  let tableBuffer: string[] = [];
  let asideBuffer: string[] = [];
  let codeLang = "";
  let inCodeBlock = false;
  let inAside = false;

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return;
    const text = paragraphBuffer.join(" ");
    const key = `p-${elements.length}`;
    elements.push(
      <p key={key} className="text-sm md:text-base leading-7 text-foreground">
        {renderInlineMarkdown(text, key)}
      </p>,
    );
    paragraphBuffer = [];
  };

  const flushBullets = () => {
    if (bulletBuffer.length === 0) return;
    const key = `ul-${elements.length}`;
    elements.push(
      <ul key={key} className="list-disc pl-5 space-y-1 text-sm md:text-base">
        {bulletBuffer.map((item, index) => (
          <li key={`${key}-li-${index}`}>
            {renderInlineMarkdown(item, `${key}-${index}`)}
          </li>
        ))}
      </ul>,
    );
    bulletBuffer = [];
  };

  const flushNumbers = () => {
    if (numberBuffer.length === 0) return;
    const key = `ol-${elements.length}`;
    elements.push(
      <ol
        key={key}
        className="list-decimal pl-5 space-y-1 text-sm md:text-base"
      >
        {numberBuffer.map((item, index) => (
          <li key={`${key}-li-${index}`}>
            {renderInlineMarkdown(item, `${key}-${index}`)}
          </li>
        ))}
      </ol>,
    );
    numberBuffer = [];
  };

  const flushCode = () => {
    if (codeBuffer.length === 0 && !codeLang) return;
    const key = `code-${elements.length}`;
    elements.push(
      <div key={key} className="rounded-md border bg-muted/50">
        {codeLang && (
          <div className="border-b px-3 py-1.5 text-xs text-muted-foreground">
            {codeLang}
          </div>
        )}
        <pre className="overflow-x-auto p-3 text-xs md:text-sm leading-6 font-mono">
          <code>{codeBuffer.join("\n")}</code>
        </pre>
      </div>,
    );
    codeBuffer = [];
    codeLang = "";
  };

  const flushTable = () => {
    if (tableBuffer.length === 0) return;

    const parsedRows = tableBuffer
      .filter((line) => !isTableDividerLine(line))
      .map((line) => parseTableRow(line));

    if (parsedRows.length === 0) {
      tableBuffer = [];
      return;
    }

    const [headerRow, ...bodyRows] = parsedRows;
    const key = `table-${elements.length}`;

    elements.push(
      <div
        key={key}
        className="overflow-x-auto rounded-lg border border-border/70"
      >
        <table className="w-full text-left text-sm md:text-base">
          <thead className="bg-muted/50">
            <tr>
              {headerRow.map((cell, index) => (
                <th
                  key={`${key}-head-${index}`}
                  className="border-b px-4 py-3 font-semibold"
                >
                  {renderInlineMarkdown(cell, `${key}-head-${index}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, rowIndex) => (
              <tr
                key={`${key}-row-${rowIndex}`}
                className="border-b last:border-b-0"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${key}-cell-${rowIndex}-${cellIndex}`}
                    className="px-4 py-3 align-top text-muted-foreground"
                  >
                    {renderInlineMarkdown(
                      cell,
                      `${key}-cell-${rowIndex}-${cellIndex}`,
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    );

    tableBuffer = [];
  };

  const flushAside = () => {
    if (asideBuffer.length === 0) return;

    const cleanedLines = asideBuffer
      .map((line) => cleanBriefLine(line))
      .filter((line) => line.length > 0);

    if (cleanedLines.length === 0) {
      asideBuffer = [];
      return;
    }

    const key = `aside-${elements.length}`;
    elements.push(
      <div
        key={key}
        className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3.5 md:px-5 md:py-4"
      >
        <div className="space-y-2">
          {cleanedLines.map((line, index) => (
            <p
              key={`${key}-${index}`}
              className={
                index === 0
                  ? "text-sm md:text-base font-semibold text-foreground"
                  : "text-sm md:text-base leading-7 text-muted-foreground"
              }
            >
              {renderInlineMarkdown(line, `${key}-${index}`)}
            </p>
          ))}
        </div>
      </div>,
    );

    asideBuffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.trimStart().startsWith("```")) {
      flushParagraph();
      flushBullets();
      flushNumbers();
      flushTable();
      flushAside();
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = line.trimStart().replace(/^```/, "").trim();
      } else {
        inCodeBlock = false;
        flushCode();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(rawLine);
      continue;
    }

    if (line.trim() === "<aside>") {
      flushParagraph();
      flushBullets();
      flushNumbers();
      flushTable();
      inAside = true;
      continue;
    }

    if (line.trim() === "</aside>") {
      inAside = false;
      flushAside();
      continue;
    }

    if (inAside) {
      asideBuffer.push(line);
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      flushBullets();
      flushNumbers();
      flushTable();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushBullets();
      flushNumbers();
      flushTable();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const headingClass =
        level <= 2
          ? "text-lg md:text-xl font-semibold mt-2"
          : "text-base md:text-lg font-semibold mt-2";
      const key = `h-${elements.length}`;
      elements.push(
        <p key={key} className={headingClass}>
          {renderInlineMarkdown(text, key)}
        </p>,
      );
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      flushNumbers();
      flushTable();
      bulletBuffer.push(line.replace(/^[-*]\s+/, "").trim());
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      flushParagraph();
      flushBullets();
      flushTable();
      numberBuffer.push(line.replace(/^\d+\.\s+/, "").trim());
      continue;
    }

    if (isTableLine(line)) {
      flushParagraph();
      flushBullets();
      flushNumbers();
      tableBuffer.push(line);
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      flushParagraph();
      flushBullets();
      flushNumbers();
      flushTable();
      elements.push(
        <hr key={`hr-${elements.length}`} className="border-primary/20" />,
      );
      continue;
    }

    paragraphBuffer.push(line.trim());
  }

  flushParagraph();
  flushBullets();
  flushNumbers();
  flushTable();
  flushAside();
  if (inCodeBlock) {
    flushCode();
  }

  return <div className="space-y-4">{elements}</div>;
}

function extractBriefKnowledge(content: string, note: string) {
  const normalizedContent = content.replace(/\r\n/g, "\n");
  const lines = normalizedContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !line.startsWith("```"))
    .filter((line) => !/^---+$/.test(line))
    .filter((line) => line !== "<aside>")
    .filter((line) => line !== "</aside>")
    .filter((line) => !isTableLine(line))
    .filter((line) => !isTableDividerLine(line));

  const codeBlocks = Array.from(
    normalizedContent.matchAll(/```([\w-]*)\n([\s\S]*?)```/g),
  ).map((match) => ({
    language: match[1]?.trim() || "text",
    content: match[2].trim(),
  }));

  const preferredCodeBlock =
    codeBlocks.find((block) => block.content.includes("* * * * *")) ??
    codeBlocks.find((block) => block.content.length > 0) ??
    null;

  const cronPatternPoint = preferredCodeBlock?.content.includes("* * * * *")
    ? "In a cron entry, `* * * * *` is the timing pattern, and the text after it is the command to execute."
    : null;

  const bulletPoints = cronPatternPoint
    ? [cronPatternPoint]
    : lines
        .filter((line) => /^[-*]\s+/.test(line))
        .map((line) => cleanBriefLine(line.replace(/^[-*]\s+/, "").trim()))
        .slice(0, 4);

  const paragraphs = lines
    .filter((line) => !line.startsWith("#"))
    .filter((line) => !/^[-*]\s+/.test(line))
    .filter((line) => !/^\d+\.\s+/.test(line))
    .filter((line) => !line.startsWith("`"))
    .filter((line) => !line.includes("|"))
    .slice(0, 3)
    .map((line) => cleanBriefLine(line))
    .filter(
      (line) => line.toLowerCase() !== cleanBriefLine(note).toLowerCase(),
    );

  return {
    summary: note,
    paragraphs,
    bulletPoints,
    codeExample: preferredCodeBlock,
  };
}

function cleanBriefLine(line: string) {
  return line
    .replace(/^#+\s*/, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

export default function KnowledgeTopicsClient({
  knowledgeTopics,
}: KnowledgeTopicsClientProps) {
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);
  const [openTopic, setOpenTopic] = useState<KnowledgeTopic["title"] | null>(
    null,
  );
  const [popupView, setPopupView] = useState("brief");

  const selectedDay = useMemo(() => {
    if (!selectedDayKey) return null;
    for (const topic of knowledgeTopics) {
      for (const [index, dayItem] of topic.days.entries()) {
        const key = `${topic.title}-${dayItem.day}-${dayItem.title}`;
        if (key === selectedDayKey) {
          return {
            topicTitle: topic.title,
            dayItem,
            previousDay: index > 0 ? topic.days[index - 1] : null,
            nextDay: index < topic.days.length - 1 ? topic.days[index + 1] : null,
          };
        }
      }
    }
    return null;
  }, [knowledgeTopics, selectedDayKey]);

  useEffect(() => {
    if (selectedDay) {
      setPopupView("brief");
    }
  }, [selectedDay]);

  const openDay = (topicTitle: string, dayItem: KnowledgeDay) => {
    setSelectedDayKey(`${topicTitle}-${dayItem.day}-${dayItem.title}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6 md:gap-8 mt-6 md:mt-8">
        {knowledgeTopics.map((topic) => (
          <AnimateInView key={topic.title} className="self-start" delay={0.2}>
            <Card className="bg-background/60 backdrop-blur-sm border-primary/20">
              <CardHeader className="space-y-4 px-5 pt-5 md:px-6 md:pt-6">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <BookOpen className="h-5 w-5 text-primary" />
                    {topic.title}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    {topic.totalDays
                      ? `${topic.days.length}/${topic.totalDays} Days`
                      : `${topic.days.length} Days`}
                  </Badge>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-7">
                  {topic.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0 px-5 pb-5 md:px-6 md:pb-6">
                <Accordion
                  type="single"
                  collapsible
                  value={openTopic === topic.title ? topic.title : ""}
                  onValueChange={(value) => {
                    if (value === topic.title) {
                      setOpenTopic((current) =>
                        current === topic.title ? null : topic.title,
                      );
                      return;
                    }
                    setOpenTopic(null);
                  }}
                >
                  <AccordionItem
                    value={topic.title}
                    className="border-primary/20"
                  >
                    <AccordionTrigger className="text-primary py-3.5">
                      Read more
                    </AccordionTrigger>
                    <AccordionContent>
                      <ScrollArea className="h-72 md:h-80 pr-1">
                        <div className="space-y-3.5 pt-1 pb-1 pr-3">
                          {topic.days.map((dayItem) => {
                            const itemKey = `${topic.title}-${dayItem.day}-${dayItem.title}`;
                            return (
                              <button
                                key={itemKey}
                                type="button"
                                className="w-full text-left rounded-lg border border-primary/15 bg-primary/5 px-4 py-3.5 md:px-5 md:py-4 hover:border-primary/40 transition-colors"
                                onClick={() => setSelectedDayKey(itemKey)}
                              >
                                <p className="text-sm md:text-base font-medium flex items-center gap-2 leading-6">
                                  <CalendarRange className="h-4 w-4 text-primary" />
                                  {Number.isFinite(dayItem.day)
                                    ? `Day ${dayItem.day}:`
                                    : "Day:"}{" "}
                                  {dayItem.title}
                                </p>
                                <p className="text-xs md:text-sm text-muted-foreground mt-2 leading-6">
                                  Note: {dayItem.note}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </AnimateInView>
        ))}
      </div>

      <Dialog
        open={!!selectedDay}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedDayKey(null);
            setPopupView("brief");
          }
        }}
      >
        <DialogContent className="flex h-[85vh] w-[95vw] max-w-4xl flex-col gap-0 overflow-hidden p-0">
          <DialogHeader className="shrink-0 border-b border-primary/15 px-5 pt-5 pb-4 md:px-6 md:pt-6 md:pb-4">
            <DialogTitle>
              {selectedDay && Number.isFinite(selectedDay.dayItem.day)
                ? `Day ${selectedDay.dayItem.day}: ${selectedDay.dayItem.title}`
                : selectedDay?.dayItem.title}
            </DialogTitle>
            <DialogDescription className="pt-1">
              {selectedDay?.topicTitle}
            </DialogDescription>
          </DialogHeader>

          <div className="flex min-h-0 flex-1 flex-col px-5 pt-4 md:px-6">
            <Tabs
              value={popupView}
              onValueChange={setPopupView}
              className="flex min-h-0 flex-1 flex-col"
            >
              <TabsList className="grid w-full max-w-sm shrink-0 grid-cols-2">
                <TabsTrigger value="brief">Brief Knowledge</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="brief" className="mt-4 min-h-0 flex-1">
                <ScrollArea className="h-full pb-5 md:pb-6">
                  {selectedDay && (
                    <BriefKnowledgeContent
                      note={selectedDay.dayItem.note}
                      content={selectedDay.dayItem.content}
                    />
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="details" className="mt-4 min-h-0 flex-1">
                <ScrollArea className="h-full pb-5 md:pb-6">
                  <MarkdownContent
                    content={selectedDay?.dayItem.content ?? ""}
                  />
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          {selectedDay && (
            <div className="shrink-0 border-t border-primary/15 px-5 py-4 md:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  className="justify-start sm:min-w-40"
                  onClick={() =>
                    selectedDay.previousDay &&
                    openDay(selectedDay.topicTitle, selectedDay.previousDay)
                  }
                  disabled={!selectedDay.previousDay}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous Day
                </Button>

                <p className="text-center text-xs md:text-sm text-muted-foreground">
                  Move through days in {selectedDay.topicTitle}
                </p>

                <Button
                  type="button"
                  variant="outline"
                  className="justify-end sm:min-w-40"
                  onClick={() =>
                    selectedDay.nextDay &&
                    openDay(selectedDay.topicTitle, selectedDay.nextDay)
                  }
                  disabled={!selectedDay.nextDay}
                >
                  Next Day
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function BriefKnowledgeContent({
  note,
  content,
}: {
  note: string;
  content: string;
}) {
  const brief = extractBriefKnowledge(content, note);

  return (
    <div className="space-y-5 pr-1">
      <div className="rounded-xl border border-primary/15 bg-primary/5 p-4 md:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
          Quick Summary
        </p>
        <p className="mt-2 text-sm md:text-base leading-7 text-foreground">
          {brief.summary}
        </p>
      </div>

      {brief.paragraphs.length > 0 && (
        <div className="space-y-3">
          {brief.paragraphs.map((paragraph, index) => (
            <p
              key={`${paragraph}-${index}`}
              className="text-sm md:text-base leading-7 text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {brief.bulletPoints.length > 0 && (
        <div className="rounded-xl border border-border/60 bg-muted/30 p-4 md:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Key Points
          </p>
          <ul className="mt-3 space-y-2 text-sm md:text-base leading-7">
            {brief.bulletPoints.map((point, index) => (
              <li key={`${point}-${index}`} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {brief.codeExample && (
        <div className="rounded-xl border border-border/60 bg-background/80 p-4 md:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Quick Example
          </p>
          <div className="mt-3 overflow-x-auto rounded-md border bg-muted/40">
            <div className="border-b px-3 py-1.5 text-xs text-muted-foreground">
              {brief.codeExample.language}
            </div>
            <pre className="p-3 text-xs md:text-sm leading-6 font-mono">
              <code>{brief.codeExample.content}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
