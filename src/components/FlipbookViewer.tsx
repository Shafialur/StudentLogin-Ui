import React, { useCallback, useEffect, useMemo, useRef, useState, forwardRef } from "react"
import HTMLFlipBook from "react-pageflip"
import { Document, Page, pdfjs } from "react-pdf"
import { ChevronLeft, ChevronRight, Loader2, Maximize2, Minimize2 } from "lucide-react"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

type Size = { width: number; height: number }

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

function useResizeObserver<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })

  useEffect(() => {
    if (!ref.current) return

    const el = ref.current
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect
      if (!r) return
      setSize({ width: r.width, height: r.height })
    })

    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return { ref, size }
}

function useFullscreen(targetRef: React.RefObject<HTMLElement>) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener("fullscreenchange", onChange)
    onChange()
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  const toggle = useCallback(async () => {
    try {
      if (!document.fullscreenElement) await targetRef.current?.requestFullscreen()
      else await document.exitFullscreen()
    } catch {
      // ignore
    }
  }, [targetRef])

  return { isFullscreen, toggle }
}

function useKeyboardFlip(bookRef: React.RefObject<any>) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") bookRef.current?.pageFlip()?.flipPrev()
      if (e.key === "ArrowRight") bookRef.current?.pageFlip()?.flipNext()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [bookRef])
}

function resolvePdfUrlWithProxy(rawUrl: string) {
  if (!rawUrl) return rawUrl

  if (rawUrl.includes("bambinos.live")) {
    return rawUrl
      .replace("https://bambinos.live", "/proxy-pdf")
      .replace("https://admin.bambinos.live", "/proxy-pdf")
  }

  return rawUrl
}

function usePdfObjectUrl(pdfUrl: string) {
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(Boolean(pdfUrl))
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!pdfUrl) {
      setFileUrl(null)
      setLoading(false)
      setError(false)
      return
    }

    const controller = new AbortController()
    let objectUrl: string | null = null

    const run = async () => {
      setLoading(true)
      setError(false)

      const url = resolvePdfUrlWithProxy(pdfUrl)

      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error("fetch failed")
        const blob = await res.blob()
        objectUrl = URL.createObjectURL(blob)
        setFileUrl(objectUrl)
        setLoading(false)
      } catch {
        if (controller.signal.aborted) return
        // Fallback to direct URL - react-pdf can handle URLs directly
        // This is better for CORS issues or when blob creation fails
        setFileUrl(pdfUrl)
        setLoading(false)
      }
    }

    run()

    return () => {
      controller.abort()
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [pdfUrl])

  return { fileUrl, loading, error }
}

function fitPage(params: {
  container: Size
  controlsHeight: number
  paddingX: number
  paddingY: number
  usePortrait: boolean
  pageRatio: number
  minPageWidth: number
  maxPageWidth: number
  safetyPx: number
  safetyScale: number
}) {
  const {
    container,
    controlsHeight,
    paddingX,
    paddingY,
    usePortrait,
    pageRatio,
    minPageWidth,
    maxPageWidth,
    safetyPx,
    safetyScale,
  } = params

  const availableWidth = Math.max(0, container.width - paddingX * 2) * safetyScale - safetyPx
  const availableHeight = Math.max(0, container.height - controlsHeight - paddingY * 2) * safetyScale - safetyPx

  const maxWidthForOnePage = usePortrait ? availableWidth : availableWidth / 2

  const widthByHeight = availableHeight / pageRatio
  const pageWidth = clamp(Math.floor(Math.min(maxWidthForOnePage, widthByHeight)), minPageWidth, maxPageWidth)
  const pageHeight = Math.floor(pageWidth * pageRatio)

  return { pageWidth, pageHeight }
}

interface FlipPageProps {
  pageNumber: number
  pageWidth: number
  pageHeight: number
  insetPx: number
  devicePixelRatio: number
}

const FlipPage = forwardRef<HTMLDivElement, FlipPageProps>(
  ({ pageNumber, pageWidth, pageHeight, insetPx, devicePixelRatio }, ref) => {
    const innerWidth = Math.max(1, pageWidth - insetPx * 2)

    return (
      <div
        ref={ref}
        className="bg-white shadow-md"
        style={{
          width: pageWidth,
          height: pageHeight,
          padding: insetPx,
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <Page
            pageNumber={pageNumber}
            width={innerWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            devicePixelRatio={devicePixelRatio}
            loading={
              <div className="flex items-center justify-center bg-gray-50" style={{ width: innerWidth, height: pageHeight }}>
                <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
              </div>
            }
          />
        </div>
      </div>
    )
  }
)
FlipPage.displayName = "FlipPage"

interface FlipbookViewerProps {
  pdfUrl: string
  className?: string
  initialPage?: number
  showControls?: boolean
  controlsHeight?: number
  paddingX?: number
  paddingY?: number
  portraitBreakpoint?: number
  minPageWidth?: number
  maxPageWidth?: number
  pageInsetPx?: number
  onPageChange?: (pageIndex: number) => void
}

const FlipbookViewer: React.FC<FlipbookViewerProps> = ({
  pdfUrl,
  className = "",
  initialPage = 0,
  showControls = true,
  controlsHeight = 42,
  paddingX = 12,
  paddingY = 12,
  portraitBreakpoint = 768,
  minPageWidth = 160,
  maxPageWidth = 2200,
  pageInsetPx = 3,
  onPageChange,
}) => {
  const bookRef = useRef<any>(null)
  const { ref: containerRef, size: containerSize } = useResizeObserver<HTMLDivElement>()

  const { fileUrl, loading: pdfLoading, error: pdfFetchError } = usePdfObjectUrl(pdfUrl)

  const [numPages, setNumPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [docError, setDocError] = useState(false)

  const [pageRatio, setPageRatio] = useState(1.41421356237)

  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen(containerRef as React.RefObject<HTMLElement>)

  // Fix 1: Desktop fullscreen prefers spread (two-page view)
  const shouldUsePortrait = useMemo(() => {
    const w = containerSize.width
    if (!w) return true
    // In fullscreen, only use portrait if screen is narrow (< 900px)
    if (isFullscreen) return w < 900
    // Normal mode: use portrait below breakpoint
    return w < portraitBreakpoint
  }, [containerSize.width, isFullscreen, portraitBreakpoint])

  const devicePixelRatio = useMemo(() => {
    if (typeof window === "undefined") return 1
    return Math.min(2, window.devicePixelRatio || 1)
  }, [])

  // Fix 2 & 3: No controls height / padding in fullscreen (controls overlay)
  const { pageWidth, pageHeight } = useMemo(() => {
    const reservedControls = isFullscreen ? 0 : (showControls ? controlsHeight : 0)
    const px = isFullscreen ? 0 : paddingX
    const py = isFullscreen ? 0 : paddingY
    
    return fitPage({
      container: containerSize,
      controlsHeight: reservedControls,
      paddingX: px,
      paddingY: py,
      usePortrait: shouldUsePortrait,
      pageRatio,
      minPageWidth,
      maxPageWidth,
      safetyPx: 4,        // Reduced from 8
      safetyScale: 0.995, // Increased from 0.99
    })
  }, [
    containerSize,
    controlsHeight,
    paddingX,
    paddingY,
    shouldUsePortrait,
    pageRatio,
    minPageWidth,
    maxPageWidth,
    showControls,
    isFullscreen,
  ])

  useKeyboardFlip(bookRef)

  const flipPrev = useCallback(() => bookRef.current?.pageFlip()?.flipPrev(), [])
  const flipNext = useCallback(() => bookRef.current?.pageFlip()?.flipNext(), [])

  const onFlip = useCallback(
    (e: any) => {
      const next = Number(e?.data ?? 0)
      setCurrentPage(next)
      onPageChange?.(next)
    },
    [onPageChange]
  )

  useEffect(() => {
    setCurrentPage(initialPage)
  }, [initialPage])

  const showIframeFallback = pdfFetchError || docError

  // Fix 3: No padding in fullscreen
  const actualPaddingX = isFullscreen ? 0 : paddingX
  const actualPaddingY = isFullscreen ? 0 : paddingY

  return (
    <div
      ref={containerRef}
      className={[
        "w-full h-full min-h-[500px]",
        // Fullscreen: relative for overlay controls; Normal: flex column
        isFullscreen ? "relative bg-gray-900" : "flex flex-col items-center justify-center bg-gray-100",
        className,
      ].join(" ")}
      style={{ padding: `${actualPaddingY}px ${actualPaddingX}px` }}
    >
      {showIframeFallback ? (
        <div className="w-full h-full flex-1">
          <iframe src={pdfUrl} className="w-full h-full border-0" title="PDF" />
        </div>
      ) : (
        <>
          {/* Flipbook Container */}
          <div className={isFullscreen ? "w-full h-full flex items-center justify-center" : "flex-1 flex items-center justify-center w-full"}>
            {(pdfLoading || (fileUrl && !numPages)) && (
              <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
            )}

            {fileUrl && (
              <Document
                file={fileUrl}
                loading={null}
                onLoadSuccess={async (pdf) => {
                  setNumPages(pdf.numPages)
                  setDocError(false)

                  try {
                    const first = await pdf.getPage(1)
                    const vp = first.getViewport({ scale: 1 })
                    if (vp?.width && vp?.height) setPageRatio(vp.height / vp.width)
                  } catch {
                    // ignore
                  }

                  const safeInitial = clamp(initialPage, 0, Math.max(0, pdf.numPages - 1))
                  setCurrentPage(safeInitial)

                  requestAnimationFrame(() => {
                    try {
                      bookRef.current?.pageFlip()?.flip(safeInitial)
                    } catch {
                      // ignore
                    }
                  })
                }}
                onLoadError={() => setDocError(true)}
                className="flex items-center justify-center"
              >
                {numPages > 0 && pageWidth > 0 && pageHeight > 0 && (
                  <HTMLFlipBook
                    key={`flipbook-${shouldUsePortrait ? 'portrait' : 'spread'}-${pageWidth}-${pageHeight}`}
                    ref={bookRef}
                    width={pageWidth}
                    height={pageHeight}
                    size="fixed"
                    autoSize={false}
                    usePortrait={shouldUsePortrait}
                    mobileScrollSupport={true}
                    showCover={false}
                    startPage={clamp(currentPage, 0, numPages - 1)}
                    startZIndex={0}
                    onFlip={onFlip}
                    className="shadow-2xl"
                    style={{}}
                    minWidth={minPageWidth}
                    maxWidth={maxPageWidth}
                    minHeight={Math.floor(minPageWidth * pageRatio)}
                    maxHeight={Math.floor(maxPageWidth * pageRatio)}
                    drawShadow={true}
                    maxShadowOpacity={0.2}
                    showPageCorners={true}
                    disableFlipByClick={false}
                    flippingTime={420}
                    swipeDistance={30}
                    clickEventForward={true}
                    useMouseEvents={true}
                  >
                    {Array.from({ length: numPages }, (_, i) => (
                      <FlipPage
                        key={i}
                        pageNumber={i + 1}
                        pageWidth={pageWidth}
                        pageHeight={pageHeight}
                        insetPx={pageInsetPx}
                        devicePixelRatio={devicePixelRatio}
                      />
                    ))}
                  </HTMLFlipBook>
                )}
              </Document>
            )}
          </div>

          {/* Controls: absolute overlay in fullscreen, normal flow otherwise */}
          {showControls && numPages > 0 && (
            <div
              className={[
                "flex items-center gap-1 sm:gap-2 px-3 py-0 rounded-full select-none",
                isFullscreen 
                  ? "absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50" 
                  : "mt-0 bg-white/90 shadow-sm",
              ].join(" ")}
              style={{ height: controlsHeight }}
            >
              <button
                onClick={flipPrev}
                disabled={currentPage === 0}
                className={[
                  "p-1.5 rounded-full disabled:opacity-30",
                  isFullscreen ? "text-white hover:bg-white/20" : "text-gray-700 hover:bg-gray-100",
                ].join(" ")}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span
                className={[
                  "text-sm font-medium min-w-[70px] text-center tabular-nums",
                  isFullscreen ? "text-white" : "text-gray-600",
                ].join(" ")}
              >
                {currentPage + 1} / {numPages}
              </span>

              <button
                onClick={flipNext}
                disabled={currentPage >= numPages - 1}
                className={[
                  "p-1.5 rounded-full disabled:opacity-30",
                  isFullscreen ? "text-white hover:bg-white/20" : "text-gray-700 hover:bg-gray-100",
                ].join(" ")}
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className={["w-px h-4 mx-1", isFullscreen ? "bg-white/30" : "bg-gray-300"].join(" ")} />

              <button
                onClick={toggleFullscreen}
                className={[
                  "p-1.5 rounded-full",
                  isFullscreen ? "text-white hover:bg-white/20" : "text-gray-600 hover:bg-gray-100",
                ].join(" ")}
                aria-label="Toggle fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default FlipbookViewer
