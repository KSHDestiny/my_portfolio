"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle, Download, ExternalLink } from "lucide-react"

interface PDFViewerFallbackProps {
  pdfUrl: string
}

export default function PDFViewerFallback({ pdfUrl }: PDFViewerFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
      <h3 className="text-lg font-medium mb-2">PDF Viewer Unavailable</h3>
      <p className="text-muted-foreground max-w-md mb-6">
        The PDF viewer couldn't be loaded due to browser security restrictions. You can still view or download the
        certificate using the options below.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" asChild>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in New Tab
          </a>
        </Button>

        <Button variant="default" asChild>
          <a href={pdfUrl} download>
            <Download className="mr-2 h-4 w-4" />
            Download Certificate
          </a>
        </Button>
      </div>
    </div>
  )
}
