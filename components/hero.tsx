"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import TypingEffect from "./animations/typing-effect";
import { useState } from "react";
import ParticlesBackground from "./particles-background";

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  // Get initials from the name for fallback
  const name = "Kaung Sat Hein";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden full-height">
      <ParticlesBackground />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary/30"
          >
            {imageError ? (
              // Fallback to initials if image fails to load
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-bold text-primary/90">
                  {initials}
                </span>
              </div>
            ) : (
              // Try to load the actual profile image
              <Image
                src="/images/profile.png"
                alt="Kaung Sat Hein"
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                priority
              />
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            Kaung Sat Hein
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl font-medium text-primary mb-6"
          >
            Web Backend Developer
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-2xl text-base md:text-lg text-muted-foreground mb-8"
          >
            <TypingEffect
              text="Building robust, scalable backend solutions with expertise in JavaScript, PHP, Laravel, and database management."
              speed={20}
              delay={800}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4 mb-10"
          >
            <Link
              href="https://linkedin.com/in/kaungsathein"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="border-primary/30 bg-background/20 backdrop-blur-sm hover:bg-primary/20"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </motion.div>
            </Link>
            <Link href="mailto:kaungsathein.5899@gmail.com">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="border-primary/30 bg-background/20 backdrop-blur-sm hover:bg-primary/20"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </motion.div>
            </Link>
            <Link
              href="https://github.com/KSHDestiny"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="border-primary/30 bg-background/20 backdrop-blur-sm hover:bg-primary/20"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </motion.div>
            </Link>
            <Link href="#" download>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="border-primary/30 bg-background/20 backdrop-blur-sm hover:bg-primary/20"
                >
                  <FileText className="h-5 w-5" />
                  <span className="sr-only">Resume</span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="#about">
              <Button variant="default" className="group">
                Learn More
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowDown className="ml-2 h-4 w-4" />
                </motion.div>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
