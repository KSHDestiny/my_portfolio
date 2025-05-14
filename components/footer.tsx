import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/40 backdrop-blur-md py-6 md:py-8 border-t border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground text-xs md:text-sm">
              © {currentYear} Kaung Sat Hein. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-4">
            <Link
              href="https://linkedin.com/in/kaungsathein"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="mailto:kaungsathein.5899@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4 md:h-5 md:w-5" />
              <span className="sr-only">Email</span>
            </Link>
            <Link
              href="https://github.com/KSHDestiny"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4 md:h-5 md:w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
