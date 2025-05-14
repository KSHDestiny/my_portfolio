"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, useAnimation, type Variant } from "framer-motion";

type AnimateInViewProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  initialY?: number;
  initialX?: number;
  initialOpacity?: number;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
};

export default function AnimateInView({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  initialY = 20,
  initialX = 0,
  initialOpacity = 0,
  variants,
}: AnimateInViewProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const defaultVariants = {
    hidden: {
      y: initialY,
      x: initialX,
      opacity: initialOpacity,
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          controls.start("visible");
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants || defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
