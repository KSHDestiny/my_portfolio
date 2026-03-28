import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Kaung Sat Hein | Backend-Focused Full-Stack Developer",
  description:
    "Portfolio website of Kaung Sat Hein, a Backend-Focused Full-Stack Developer with expertise in React.js, Laravel, Node.js, secure APIs, and scalable systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
        >
          <div className="relative min-h-screen gradient-bg">
            <div className="relative z-10">
              <Navbar />
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
