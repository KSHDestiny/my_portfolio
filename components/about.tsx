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
                    Resourceful and analytical backend developer with a strong
                    foundation in web technologies, network systems, and
                    cybersecurity. Skilled in server-side logic, database
                    management, problem-solving, and optimizing processes to
                    deliver secure, high-performance solutions.
                  </p>
                  <p className="text-sm md:text-base">
                    Experienced in the software development lifecycle and
                    collaborating in agile environments, ensuring error-free
                    code while prioritizing user experience.
                  </p>
                  <p className="text-sm md:text-base">
                    Passionate about continuous learning and leveraging emerging
                    technologies to create scalable, maintainable solutions.
                    Committed to enhancing software functionality and
                    performance through innovative solutions, excelling in
                    collaborative team environments and tackling complex
                    challenges to drive business success.
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
                </div>
              </CardContent>
            </Card>
          </AnimateInView>
        </div>
      </div>
    </section>
  );
}
