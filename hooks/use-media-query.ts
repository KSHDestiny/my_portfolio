"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => setMatches(media.matches)

    listener()
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", listener)
      return () => media.removeEventListener("change", listener)
    }

    // Fallback for older Safari/WebKit.
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [query])

  return matches
}
