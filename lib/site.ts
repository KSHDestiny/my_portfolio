export const SITE_URL = "https://kaungsathein.online";
export const SITE_NAME = "Kaung Sat Hein";
export const SITE_TITLE = "Kaung Sat Hein | Senior Full Stack Engineer";
export const SITE_DESCRIPTION =
  "Portfolio of Kaung Sat Hein, a senior full stack engineer building multi-country HR platforms, payroll and permission systems, integrations, and AI agents that act on live data under guardrails.";

export const SITE_KEYWORDS = [
  "Kaung Sat Hein",
  "Kaung Sat Hein portfolio",
  "kaungsathein.online",
  "senior full stack engineer",
  "senior backend engineer",
  "backend-focused senior full-stack engineer",
  "backend-focused full-stack developer",
  "full-stack developer portfolio",
  "backend developer",
  "Node.js developer",
  "Laravel developer",
  "React developer",
  "API developer",
  "RBAC systems",
  "workflow automation",
  "n8n automation",
  "n8n web app automation",
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
