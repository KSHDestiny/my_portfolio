import AnimateInView from "./animations/animate-in-view"
import KnowledgeTopicsClient from "./knowledge-topics-client"
import { getKnowledgeTopics } from "@/lib/knowledge"

export default async function Knowledges() {
  const knowledgeTopics = await getKnowledgeTopics()

  return (
    <section id="knowledges" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
            Knowledges
          </h2>
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
