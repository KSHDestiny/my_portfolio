export const SITE_URL = "https://kaungsathein.online";
export const SITE_NAME = "Kaung Sat Hein";
export const SITE_TITLE = "Kaung Sat Hein | Backend-Focused Full-Stack Developer";
export const SITE_DESCRIPTION =
  "Portfolio website of Kaung Sat Hein, a backend-focused full-stack developer building scalable backend systems, secure APIs, and workflow-heavy business platforms.";

export const SITE_KEYWORDS = [
  "Kaung Sat Hein",
  "Kaung Sat Hein portfolio",
  "kaungsathein.online",
  "backend-focused full-stack developer",
  "full-stack developer portfolio",
  "backend developer",
  "Node.js developer",
  "Laravel developer",
  "React developer",
  "API developer",
  "RBAC systems",
  "workflow automation",
  "HRMS developer",
  "ATS developer",
  "scalable systems",
];

export const SOCIAL_LINKS = [
  "https://linkedin.com/in/kaungsathein",
  "https://github.com/KSHDestiny",
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
