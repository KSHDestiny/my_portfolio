"use client"

import React from "react"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { motion, useAnimation, type Variant } from "framer-motion"

type StaggeredChildrenProps = {
  children: ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
  childrenClassName?: string
  variants?: {
    hidden: Variant
    visible: Variant
  }
}

export default function StaggeredChildren({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
  childrenClassName = "",
  variants,
}: StaggeredChildrenProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants = variants || {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true)
          controls.start("visible")
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
  }, [controls, isInView])

  // Clone children and wrap each in a motion.div
  const animatedChildren = React.Children.map(children, (child) => {
    return (
      <motion.div variants={itemVariants} className={childrenClassName}>
        {child}
      </motion.div>
    )
  })

  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={controls} variants={containerVariants}>
      {animatedChildren}
    </motion.div>
  )
}
