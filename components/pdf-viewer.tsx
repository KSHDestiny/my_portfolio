"use client"

import { useState, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, AlertCircle } from "lucide-react"

// Set worker path to local public directory
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js"

interface PDFViewerProps {
  pdfUrl: string
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    // Reset state when PDF URL changes
    setNumPages(null)
    setPageNumber(1)
    setScale(1.0)
    setLoading(true)
    setError(false)
  }, [pdfUrl])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
  }

  function onDocumentLoadError(error: Error) {
    console.error("Error loading PDF:", error)
    setError(true)
    setLoading(false)
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset
      return newPageNumber >= 1 && newPageNumber <= (numPages || 1) ? newPageNumber : prevPageNumber
    })
  }

  function changeScale(delta: number) {
    setScale((prevScale) => {
      const newScale = prevScale + delta
      return newScale >= 0.5 && newScale <= 2.5 ? newScale : prevScale
    })
  }

  return (
    <div className="flex flex-col items-center">
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Spinner size="lg" />
          <p className="mt-4 text-muted-foreground">Loading PDF...</p>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <p className="text-destructive font-medium">Failed to load PDF</p>
          <p className="mt-2 text-muted-foreground max-w-md">
            The PDF file could not be loaded. You can still download the certificate using the download button below.
          </p>
        </div>
      )}

      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={<></>}
        className="max-w-full"
      >
        {!error && (
          <Page
            pageNumber={pageNumber}
            scale={scale}
            loading={<></>}
            className="shadow-lg rounded-lg overflow-hidden"
            renderTextLayer={false}
            renderAnnotationLayer={false}
            canvasBackground="transparent"
          />
        )}
      </Document>

      {!loading && !error && numPages && (
        <>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {pageNumber} of {numPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => changePage(1)}
              disabled={pageNumber >= numPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 mt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => changeScale(-0.1)}
              disabled={scale <= 0.5}
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm">{Math.round(scale * 100)}%</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => changeScale(0.1)}
              disabled={scale >= 2.5}
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
