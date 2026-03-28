"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  // Keep the server render and first client render aligned.
  const [matches, setMatches] = useState(false)

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
