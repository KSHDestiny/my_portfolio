import AnimateInView from "./animations/animate-in-view"
import KnowledgeTopicsClient from "./knowledge-topics-client"
import { getKnowledgeTopics } from "@/lib/knowledge"
import SectionHeading from "./section-heading"

export default async function Knowledges() {
  const knowledgeTopics = await getKnowledgeTopics()

  return (
    <section id="knowledges" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <SectionHeading
            eyebrow="Learning Log"
            title="Knowledges"
            description="Structured notes from focused study sessions, broken into practical topics, daily takeaways, and deeper explanations."
          />
        </AnimateInView>

        {knowledgeTopics.length === 0 && (
          <p className="text-center text-sm md:text-base text-muted-foreground">
            No knowledge topics found yet. Add markdown files under `knowledge/`
            to populate this section.
          </p>
        )}

        <KnowledgeTopicsClient knowledgeTopics={knowledgeTopics} />
      </div>
    </section>
  )
}
