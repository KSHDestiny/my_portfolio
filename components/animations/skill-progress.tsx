"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

type SkillProgressProps = {
  name: string
  level: number // 0-100
  className?: string
  delay?: number
}

export default function SkillProgress({ name, level, className = "", delay = 0 }: SkillProgressProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true)
          controls.start({
            width: `${level}%`,
            transition: {
              duration: 1,
              delay,
              ease: "easeOut",
            },
          })
        }
      },
      {
        threshold: 0.1,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [controls, isInView, level, delay])

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-xs md:text-sm font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div ref={ref} className="h-1.5 md:h-2 bg-secondary/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: "0%" }}
          animate={controls}
        ></motion.div>
      </div>
    </div>
  )
}
