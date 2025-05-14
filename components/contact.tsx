"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import AnimateInView from "./animations/animate-in-view"
import emailjs from "@emailjs/browser"

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: "service_8fh3vi1", // Your provided service ID
  templateId: "template_phhyiq9", // Your provided template ID
  publicKey: "V3CQ7HZZjfmdC8j6E", // Your provided public key
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    time: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset status
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      // Prepare template parameters to ensure all variables are properly set
      const templateParams = {
        name: formData.name,
        time: new Date().toLocaleString(),
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }

      // Send the email using EmailJS
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams, EMAILJS_CONFIG.publicKey)

      // Success
      setSubmitStatus("success")
      // Reset form
      setFormData({
        name: "",
        time: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitStatus("error")
      setErrorMessage(`Failed to send message. Please try again later or contact directly via email.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-12 md:py-16 full-height">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Get In Touch</h2>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          <div className="space-y-4 md:space-y-6">
            <AnimateInView delay={0.2}>
              <Card className="bg-background/60 backdrop-blur-sm border-primary/20">
                <CardHeader className="pb-2 px-4 py-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <Mail className="h-5 w-5 text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                  <a
                    href="mailto:kaungsathein.5899@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base"
                  >
                    kaungsathein.5899@gmail.com
                  </a>
                </CardContent>
              </Card>
            </AnimateInView>

            <AnimateInView delay={0.3}>
              <Card className="bg-background/60 backdrop-blur-sm border-primary/20">
                <CardHeader className="pb-2 px-4 py-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <Phone className="h-5 w-5 text-primary" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                  <a
                    href="tel:+959788907030"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base"
                  >
                    +959 788907030
                  </a>
                </CardContent>
              </Card>
            </AnimateInView>

            <AnimateInView delay={0.4}>
              <Card className="bg-background/60 backdrop-blur-sm border-primary/20">
                <CardHeader className="pb-2 px-4 py-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                  <p className="text-muted-foreground text-sm md:text-base">Yangon, Myanmar</p>
                </CardContent>
              </Card>
            </AnimateInView>
          </div>

          <AnimateInView delay={0.5}>
            <Card className="bg-background/60 backdrop-blur-sm border-primary/20">
              <CardHeader className="px-4 py-4 md:p-6">
                <CardTitle className="text-base md:text-lg">Send a Message</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                {submitStatus === "success" ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20 mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                    <Button variant="outline" onClick={() => setSubmitStatus("idle")}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Input
                          placeholder="Your Name"
                          className="bg-background/50 border-primary/20 text-sm"
                          name="name" // Match EmailJS template variable
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Input
                          type="email"
                          placeholder="Your Email"
                          className="bg-background/50 border-primary/20 text-sm"
                          name="email" // Match EmailJS template variable
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Input
                          placeholder="Subject"
                          className="bg-background/50 border-primary/20 text-sm"
                          name="subject" // Match EmailJS template variable
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Textarea
                          placeholder="Your Message"
                          rows={4}
                          className="bg-background/50 border-primary/20 text-sm"
                          name="message" // Match EmailJS template variable
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </motion.div>
                    </div>

                    {submitStatus === "error" && (
                      <div className="flex items-center gap-2 text-destructive text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="mr-2">Sending...</span>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </CardContent>
            </Card>
          </AnimateInView>
        </div>
      </div>
    </section>
  )
}
