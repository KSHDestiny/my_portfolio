import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone } from "lucide-react";
import AnimateInView from "./animations/animate-in-view";

export default function About() {
  return (
    <section id="about" className="py-12 md:py-16 section-gradient full-height">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
            About Me
          </h2>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <AnimateInView className="md:col-span-2" delay={0.2}>
            <Card className="bg-background/60 backdrop-blur-sm border-primary/20 h-full">
              <CardContent className="pt-6">
                <h3 className="text-lg md:text-xl font-semibold mb-4">
                  Profile
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-sm md:text-base">
                    Full-Stack Developer with strong experience in React.js,
                    Laravel (PHP), Node.js, and scalable database design.
                    Skilled in building secure RESTful APIs, high-performance
                    backend systems, and interactive frontends.
                  </p>
                  <p className="text-sm md:text-base">
                    Hands-on experience with MySQL, MongoDB, Redis, Docker,
                    AWS, and CI/CD workflows. Proven record of delivering
                    production-grade features across HRMS, CMS, ATS, and
                    AI-driven platforms used by 100K+ users across multiple
                    countries.
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimateInView>

          <AnimateInView delay={0.4}>
            <Card className="bg-background/60 backdrop-blur-sm border-primary/20 h-full">
              <CardContent className="pt-6">
                <h3 className="text-lg md:text-xl font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a
                        href="mailto:kaungsathein.5899@gmail.com"
                        className="hover:underline text-sm md:text-base"
                      >
                        kaungsathein.5899@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a
                        href="tel:+959788907030"
                        className="hover:underline text-sm md:text-base"
                      >
                        +959 788907030
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-sm md:text-base">Yangon, Myanmar</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">Nationality</p>
                    <p className="text-sm md:text-base">Myanmar</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="text-sm md:text-base">Male</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                    <a
                      href="https://linkedin.com/in/kaungsathein"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-sm md:text-base"
                    >
                      linkedin.com/in/kaungsathein
                    </a>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Portfolio</p>
                    <a
                      href="https://ksh-portfolio-nu.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-sm md:text-base"
                    >
                      ksh-portfolio-nu.vercel.app
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimateInView>
        </div>
      </div>
    </section>
  );
}
