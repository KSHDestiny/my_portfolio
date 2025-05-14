"use client"

import { useState, useEffect } from "react"

type TypingEffectProps = {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export default function TypingEffect({ text, className = "", speed = 50, delay = 0 }: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startTyping, setStartTyping] = useState(false)

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setStartTyping(true)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [delay])

  useEffect(() => {
    if (!startTyping) return

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, speed, text, startTyping])

  return <span className={className}>{displayText}</span>
}
