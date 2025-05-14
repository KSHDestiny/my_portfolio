"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Award, Calendar, Building, CheckCircle2, FileText, X } from "lucide-react"
import AnimateInView from "./animations/animate-in-view"
import StaggeredChildren from "./animations/staggered-children"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

// Dynamically import the PDF viewer components
const PDFViewer = dynamic(() => import("./pdf-viewer"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  ),
})

const PDFViewerFallback = dynamic(() => import("./pdf-viewer-fallback"), {
  ssr: false,
})

interface Certificate {
  id: string
  name: string
  issuer: string
  date: string
  skills: string[]
  duration?: string
  certificateId?: string
  courses?: string[]
  fileUrl?: string
}

export default function Education() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [useFallbackViewer, setUseFallbackViewer] = useState(false)

  // Check if we need to use the fallback viewer due to CORS issues
  useEffect(() => {
    const checkPDFWorker = async () => {
      try {
        // Try to fetch the local worker file
        const response = await fetch("/pdf.worker.min.js", { method: "HEAD" })
        setUseFallbackViewer(!response.ok)
      } catch (error) {
        console.error("Error checking PDF worker:", error)
        setUseFallbackViewer(true)
      }
    }

    checkPDFWorker()
  }, [])

  const education = [
    {
      degree: "Bachelor of Engineering - BE, Electrical and Electronics Engineering",
      institution: "West Yangon Technological University",
      period: "Jan 2014 - Dec 2021",
    },
    {
      degree: "Professional Executive Diploma in Network Technology and Cyber Security",
      institution: "Lincoln University College & ETVA",
      period: "Mar 2023 - Oct 2023",
    },
    {
      degree: "Diploma, Computer Science",
      institution: "NCC Education",
      period: "Apr 2024 - Apr 2025",
    },
  ]

  const certificates = [
    {
      id: "openai-api",
      name: "OpenAI API for Python Developers",
      issuer: "LinkedIn Learning",
      date: "Jan 22, 2025",
      skills: ["OpenAI API", "Python", "Generative AI"],
      duration: "2 hours 18 minutes",
      certificateId: "50e81083198c8ffd56872532339efddfcd0d34ceccf30e6b68793f67a3ba8ddb",
      fileUrl: "/certificates/openai-api.pdf",
    },
    {
      id: "sql-development",
      name: "Explore a Career in SQL Development",
      issuer: "LinkedIn Learning",
      date: "Aug 11, 2024",
      skills: ["Database Development", "SQL"],
      duration: "14 hours 6 minutes",
      certificateId: "e0e10a7533fd88fffabe439ce28183dc3df3eabbf30b57ce42d6ae3f9b82912e",
      fileUrl: "/certificates/sql-development.pdf",
    },
    {
      id: "programmer-foundations",
      name: "Become a Programmer: Foundations",
      issuer: "LinkedIn Learning",
      date: "Jul 20, 2024",
      skills: ["Programming", "Programming Concepts"],
      duration: "24 hours 17 minutes",
      certificateId: "f6873b43dedbb3f5fb71e7211a49193e403d5367fb62837cc68a7ae3b44d35b8",
      fileUrl: "/certificates/programmer-foundations.pdf",
    },
    {
      id: "docker-foundations",
      name: "Docker Foundations Professional Certificate",
      issuer: "LinkedIn Learning",
      date: "May 01, 2024",
      skills: ["Containerization", "Docker Products"],
      duration: "3 hours 30 minutes",
      certificateId: "0320858483ce5a53a70682c94c5deebb582052c3a2b0403216f468f53707aa9a",
      fileUrl: "/certificates/docker-foundations.pdf",
    },
    {
      id: "career-essentials",
      name: "Career Essentials in Software Development by Microsoft and LinkedIn",
      issuer: "LinkedIn Learning",
      date: "May 04, 2024",
      skills: ["Programming", "Software Development"],
      duration: "6 hours 14 minutes",
      certificateId: "46654751cdd156a8bb0e2d232409b34aab6398dd8ec17e9ba25716a530540ca5",
      fileUrl: "/certificates/career-essentials.pdf",
    },
    {
      id: "cloud-computing",
      name: "Introduction to Cloud Computing",
      issuer: "IBM (Coursera)",
      date: "Apr 14, 2024",
      skills: ["Cloud Computing", "IBM Cloud"],
      certificateId: "NFWQS7CEDE3T",
      fileUrl: "/certificates/cloud-computing.pdf",
    },
    {
      id: "laravel-skills",
      name: "Build Your Laravel Skills",
      issuer: "LinkedIn Learning",
      date: "Apr 2024",
      skills: ["Laravel", "PHP"],
      fileUrl: "/certificates/laravel-skills.pdf",
    },
    {
      id: "google-it-support",
      name: "Google IT Support",
      issuer: "Google (Coursera)",
      date: "Sep 2023",
      skills: ["IT Support", "Troubleshooting"],
      fileUrl: "/certificates/google-it-support.pdf",
    },
    {
      id: "meta-frontend",
      name: "Meta Front-End Developer",
      issuer: "Meta (Coursera)",
      date: "Sep 26, 2023",
      skills: ["React", "JavaScript", "HTML/CSS"],
      certificateId: "3ZQPJ7GHC74M",
      courses: [
        "Introduction to Front-End Development",
        "Programming with JavaScript",
        "Version Control",
        "HTML and CSS in depth",
        "React Basics",
        "Advanced React",
        "Principles of UX/UI Design",
        "Front-End Developer Capstone",
        "Coding Interview Preparation",
      ],
      fileUrl: "/certificates/meta-frontend.pdf",
    },
    {
      id: "web-applications",
      name: "Web Applications for Everybody Specialization",
      issuer: "University of Michigan (Coursera)",
      date: "Mar 11, 2023",
      skills: ["PHP", "SQL", "JavaScript"],
      certificateId: "68CDG4WP3YDZ",
      courses: [
        "Building Web Applications in PHP",
        "Introduction to Structured Query Language (SQL)",
        "Building Database Applications in PHP",
        "JavaScript, jQuery, and JSON",
      ],
      fileUrl: "/certificates/web-applications.pdf",
    },
    {
      id: "html-css-js",
      name: "HTML, CSS, and Javascript for Web Developers",
      issuer: "Johns Hopkins University (Coursera)",
      date: "Mar 8, 2023",
      skills: ["HTML", "CSS", "JavaScript"],
      certificateId: "AHBRPF5K2RCA",
      fileUrl: "/certificates/html-css-js.pdf",
    },
  ]

  const handleOpenCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
  }

  const handleCloseCertificate = () => {
    setSelectedCertificate(null)
  }

  return (
    <section id="education" className="py-12 md:py-16 section-gradient full-height">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Education & Certifications</h2>
        </AnimateInView>

        <Tabs defaultValue="education" className="max-w-3xl mx-auto">
          <AnimateInView delay={0.2}>
            <TabsList className="grid w-full grid-cols-2 mb-6 md:mb-8 bg-background/40">
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>
          </AnimateInView>

          <TabsContent value="education" className="space-y-4 md:space-y-6">
            <StaggeredChildren delay={0.3}>
              {education.map((edu, index) => (
                <Card key={index} className="bg-background/60 backdrop-blur-sm border-primary/20">
                  <CardHeader className="pb-2 px-4 py-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-0">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                          <GraduationCap className="h-5 w-5 text-primary" />
                          {edu.degree}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">{edu.institution}</p>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground">{edu.period}</p>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </StaggeredChildren>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4 md:space-y-6">
            <StaggeredChildren
              className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
              delay={0.3}
              staggerDelay={0.05}
            >
              {certificates.map((cert) => (
                <Card
                  key={cert.id}
                  className="bg-background/60 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all cursor-pointer"
                  onClick={() => handleOpenCertificate(cert)}
                >
                  <CardHeader className="pb-2 px-4 py-4 md:p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                          <Award className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                          {cert.name}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {cert.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-xs text-muted-foreground">{cert.date}</p>
                        <FileText className="h-3 w-3 text-primary mt-1" />
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </StaggeredChildren>
          </TabsContent>
        </Tabs>

        {selectedCertificate && (
          <Dialog open={!!selectedCertificate} onOpenChange={handleCloseCertificate}>
            <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-auto">
              <div className="absolute right-4 top-4 z-50">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseCertificate}
                  className="h-9 w-9 rounded-full hover:bg-destructive/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              <DialogHeader className="mb-4 pr-8">
                <DialogTitle className="text-xl">{selectedCertificate.name}</DialogTitle>
              </DialogHeader>

              {selectedCertificate.fileUrl && (
                <div className="mb-6">
                  {useFallbackViewer ? (
                    <PDFViewerFallback pdfUrl={selectedCertificate.fileUrl} />
                  ) : (
                    <PDFViewer pdfUrl={selectedCertificate.fileUrl} />
                  )}
                </div>
              )}

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-background/60 backdrop-blur-sm border-primary/20">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Issuer</p>
                          <p className="font-medium">{selectedCertificate.issuer}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Date Earned</p>
                          <p className="font-medium">{selectedCertificate.date}</p>
                        </div>
                      </div>

                      {selectedCertificate.duration && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-medium">{selectedCertificate.duration}</p>
                          </div>
                        </div>
                      )}

                      {selectedCertificate.certificateId && (
                        <div className="flex items-start gap-2">
                          <Award className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Certificate ID</p>
                            <p className="font-medium break-all text-xs md:text-sm">
                              {selectedCertificate.certificateId}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-background/60 backdrop-blur-sm border-primary/20">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        Skills Covered
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCertificate.skills.map((skill, index) => (
                          <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {selectedCertificate.courses && (
                  <Card className="bg-background/60 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-base">Courses Included</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {selectedCertificate.courses.map((course, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                            <span>{course}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {selectedCertificate.certificateId && selectedCertificate.id.includes("coursera") && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Verify this certificate using the certificate ID
                    </p>
                    <Button variant="outline" asChild>
                      <a
                        href={`https://coursera.org/verify/${selectedCertificate.certificateId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Verify Certificate
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  )
}
