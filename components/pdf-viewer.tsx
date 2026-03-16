"use client"

import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"

interface PDFViewerProps {
  pdfUrl: string
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  return (
    <div className="space-y-4">
      <div className="h-[60vh] w-full overflow-hidden rounded-lg border border-primary/20 bg-background/40">
        <iframe
          key={pdfUrl}
          src={pdfUrl}
          title="Certificate Preview"
          className="h-full w-full"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" asChild>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in New Tab
          </a>
        </Button>
        <Button asChild>
          <a href={pdfUrl} download>
            <Download className="mr-2 h-4 w-4" />
            Download Certificate
          </a>
        </Button>
      </div>
    </div>
  )
}
