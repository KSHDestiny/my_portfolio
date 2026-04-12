import AnimateInView from "./animations/animate-in-view";
import { getKnowledgeTopics } from "@/lib/knowledge";
import SectionHeading from "./section-heading";
import KnowledgeTopicsShell from "./knowledge-topics-shell";

export default async function Knowledge() {
  const knowledgeTopics = await getKnowledgeTopics();

  return (
    <section id="knowledge" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <SectionHeading
            eyebrow="Continuous Learning"
            title="Engineering Notes"
            description="Structured notes from hands-on learning across DevOps, cloud, infrastructure, and software engineering topics that support my day-to-day development work."
          />
        </AnimateInView>

        {knowledgeTopics.length === 0 && (
          <p className="text-center text-sm md:text-base text-muted-foreground">
            No knowledge topics found yet. Add markdown files under `knowledge/`
            to populate this section.
          </p>
        )}

        <KnowledgeTopicsShell knowledgeTopics={knowledgeTopics} />
      </div>
    </section>
  );
}
