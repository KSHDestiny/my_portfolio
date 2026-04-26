"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Code,
  Database,
  Server,
  Shield,
  GitBranch,
  Box,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AnimateInView from "./animations/animate-in-view";
import SkillProgress from "./animations/skill-progress";
import SectionHeading from "./section-heading";

export default function Skills() {
  const expertiseSectionRef = useRef<HTMLDivElement>(null);
  const expertiseViewportRef = useRef<HTMLDivElement>(null);
  const expertiseTrackRef = useRef<HTMLDivElement>(null);
  const [expertiseViewportWidth, setExpertiseViewportWidth] = useState(0);
  const [expertiseTravelDistance, setExpertiseTravelDistance] = useState(0);

  useEffect(() => {
    const viewportNode = expertiseViewportRef.current;
    const trackNode = expertiseTrackRef.current;
    if (!viewportNode || !trackNode) return;

    const updateWidth = () => {
      setExpertiseViewportWidth(viewportNode.clientWidth);
      setExpertiseTravelDistance(
        Math.max(0, trackNode.scrollWidth - viewportNode.clientWidth)
      );
    };

    updateWidth();

    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    observer.observe(viewportNode);
    observer.observe(trackNode);
    window.addEventListener("resize", updateWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: expertiseSectionRef,
    offset: ["start start", "end end"],
  });
  const expertiseX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -expertiseTravelDistance]
  );
  const blueShapePath = useTransform(scrollYProgress, [0, 1], [0.08, 1]);
  const smoothBlueShapePath = useSpring(blueShapePath, {
    stiffness: 100,
    damping: 24,
    mass: 0.5,
  });
  const balloonX = useTransform(
    scrollYProgress,
    [0, 1],
    [16, Math.max(16, expertiseViewportWidth - 96)]
  );
  const smoothBalloonX = useSpring(balloonX, {
    stiffness: 110,
    damping: 24,
    mass: 0.45,
  });
  const balloonY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.7, 1],
    [82, 68, 104, 76, 92]
  );
  const smoothBalloonY = useSpring(balloonY, {
    stiffness: 110,
    damping: 26,
    mass: 0.5,
  });

  const programmingSkills = [
    { name: "PHP", level: 92 },
    { name: "Laravel", level: 95 },
    { name: "Node.js", level: 87 },
    { name: "React.js", level: 90 },
    { name: "JavaScript / TypeScript", level: 88 },
    { name: "Python (AI/NLP)", level: 78 },
  ];

  const databaseSkills = [
    { name: "MySQL", level: 92 },
    { name: "MongoDB", level: 86 },
    { name: "Redis / Caching", level: 88 },
  ];

  const skillCategories = [
    {
      id: "01",
      title: "Backend & Frameworks",
      icon: <Code className="h-5 w-5 text-primary" />,
      summary:
        "Building robust application logic, service layers, and production-ready backend architectures.",
      skills: ["PHP", "Laravel", "Node.js", "Python (AI/NLP)"],
    },
    {
      id: "02",
      title: "Frontend & Frameworks",
      icon: <Server className="h-5 w-5 text-primary" />,
      summary:
        "Crafting responsive interfaces with modern frontend patterns focused on clarity and usability.",
      skills: ["JavaScript", "TypeScript", "React.js", "Responsive UI"],
    },
    {
      id: "03",
      title: "Databases",
      icon: <Database className="h-5 w-5 text-primary" />,
      summary:
        "Designing efficient data models and improving performance across transactional and cached systems.",
      skills: ["MySQL", "MongoDB", "Redis", "Query Optimization"],
    },
    {
      id: "04",
      title: "API & Security",
      icon: <Shield className="h-5 w-5 text-primary" />,
      summary:
        "Designing API layers with practical authentication, authorization, and secure integration flows.",
      skills: [
        "RESTful APIs",
        "GraphQL",
        "JWT Auth",
        "Secure API Design",
        "Token Validation",
      ],
    },
    {
      id: "05",
      title: "DevOps & Tools",
      icon: <GitBranch className="h-5 w-5 text-primary" />,
      summary:
        "Supporting delivery pipelines, cloud services, and deployment tooling that keeps products moving.",
      skills: [
        "Docker",
        "Git",
        "CI/CD",
        "AWS S3",
        "AWS Lambda",
        "CloudWatch",
        "Nginx",
      ],
    },
    {
      id: "06",
      title: "Integrations",
      icon: <Box className="h-5 w-5 text-primary" />,
      summary:
        "Connecting products with third-party services, payments, messaging channels, and business systems.",
      skills: [
        "Payment Gateways (KBZPay, WavePay)",
        "SSO (Microsoft, Google, LinkedIn)",
        "OTP (Thailand SMS, Vietnam SMS, Email)",
        "WebSockets (Pusher, Socket.io)",
        "Xero, Monday, Notion, Google Indexing API",
      ],
    },
    {
      id: "07",
      title: "Workflow Engineering",
      icon: <Workflow className="h-5 w-5 text-primary" />,
      summary:
        "Orchestrating async jobs, serverless events, and resilient automation across product workflows.",
      skills: [
        "Queue Jobs & Task Scheduling",
        "SQS + Lambda (Serverless)",
        "Supervisor Background Queues",
        "Atomic Backend-to-Backend Flows",
      ],
    },
    {
      id: "08",
      title: "AI",
      icon: <Sparkles className="h-5 w-5 text-primary" />,
      summary:
        "Exploring AI-powered features that turn language models and retrieval into useful product flows.",
      skills: [
        "NLP",
        "LLM",
        "LangChain",
        "LangGraph",
        "RAG",
        "Vector Retrieval",
      ],
    },
    {
      id: "09",
      title: "Vibe Coding",
      icon: <Code className="h-5 w-5 text-primary" />,
      summary:
        "Shipping fast with AI-assisted coding while keeping practical architecture, clarity, and iteration speed in balance.",
      skills: [
        "AI-Assisted Prototyping",
        "Rapid Feature Iteration",
        "Prompt-Driven Development",
        "Flow & UX Vibe Checks",
      ],
    },
  ];

  return (
    <section id="skills" className="py-12 md:py-16 full-height">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <SectionHeading
            eyebrow="Capabilities"
            title="Skills & Expertise"
            description="Core tools, engineering strengths, and delivery areas I rely on to build products that are secure, scalable, and usable."
          />
        </AnimateInView>

        <AnimateInView className="mb-8 md:mb-12" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <Card className="bg-background/60 backdrop-blur-sm border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Code className="h-5 w-5 text-primary" />
                  Programming Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {programmingSkills.map((skill, index) => (
                  <SkillProgress
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.2 + index * 0.1}
                  />
                ))}
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur-sm border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Database className="h-5 w-5 text-primary" />
                  Database Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {databaseSkills.map((skill, index) => (
                  <SkillProgress
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.2 + index * 0.1}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </AnimateInView>

        <AnimateInView delay={0.4}>
          <div ref={expertiseSectionRef} className="relative h-[220vh] md:h-[260vh]">
            <div
              ref={expertiseViewportRef}
              className="sticky top-16 overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-background via-background to-primary/5 px-4 py-6 md:top-24 md:px-6 md:py-8"
            >
              <motion.div
                className="pointer-events-none absolute left-0 top-0 z-20"
                style={{ x: smoothBalloonX, y: smoothBalloonY }}
                aria-hidden="true"
              >
                <Image
                  src="/blue_balloon.svg"
                  alt="Floating balloon illustration"
                  width={96}
                  height={96}
                  className="h-16 w-auto opacity-80 drop-shadow-[0_8px_18px_rgba(59,75,173,0.2)] md:h-24 md:opacity-100 md:drop-shadow-[0_10px_24px_rgba(59,75,173,0.24)]"
                  unoptimized
                />
              </motion.div>

              <motion.svg
                viewBox="0 0 1610 648"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-x-0 top-8 h-28 w-full opacity-70 md:top-14 md:h-56 md:opacity-100"
                aria-hidden="true"
              >
                <motion.path
                  d="M1609.15 266.811C1581.58 309.768 1552.44 353.312 1524.03 395.7C1519 403.361 1507.3 420.422 1502.47 427.674C1494.76 439.007 1487.04 450.227 1476.61 458.945C1448.6 482.76 1414.88 470.481 1400.25 434.996C1393.16 417.822 1391.11 398.369 1395.39 380.467C1401.98 350.899 1419.83 327.033 1432.44 301.23C1435.55 294.62 1438.95 286.856 1440.57 279.65C1442.82 269.559 1443.43 260.583 1439.01 251.876C1435.85 246.04 1429.71 240.015 1423.44 241.386C1421.73 241.783 1419.74 242.698 1417.3 244.457C1414.87 246.192 1412.14 248.662 1409.01 251.529C1405.25 255.043 1399.65 259.907 1394.41 262.886C1379.63 271.816 1361.6 269.749 1347.47 259.487C1328.68 245.677 1316.98 222.904 1315.77 198.921C1315.01 179.439 1320.44 159.408 1326.94 142.189C1331.62 129.564 1336.47 118.332 1340.64 105.961C1344.19 95.2338 1346.5 83.2467 1346.49 71.9964C1346.52 64.5723 1345.44 57.4813 1343.2 51.4374C1336.16 32.0378 1315.32 23.9289 1297.89 30.8553C1290.6 33.5545 1283.75 38.317 1278.42 44.4805C1277.89 45.0721 1273.89 49.6794 1273.25 50.4187C1198.55 135.987 1135.46 233.944 1089.22 341.565C1076.85 369.635 1062.85 399.081 1040.22 419.132C1022.43 434.884 999.055 444.748 975.438 441.709C958.77 439.412 944.024 430.809 932.182 417.595C899.48 381.594 898.823 323.734 918.744 282.072C924.168 270.454 931.121 259.769 939.055 250.103C952.397 233.82 967.992 219.102 975.833 198.786C985.589 173.191 978.074 150.617 953.049 141.221C932.39 133.792 911.276 142.015 893.036 152.222C875.878 162.043 859.692 173.749 844.107 186.465C818.906 207.181 795.695 230.723 773.106 254.969C750.526 279.398 727.808 304.029 707.398 330.5C681.093 363.834 632.774 439.603 652.267 485.22C660.603 504.583 683.537 518.178 698.575 501.031C707.008 491.403 710.239 475.052 705.004 462.141C704.708 461.517 704.22 460.229 703.944 459.589C702.933 457.612 701.771 455.423 700.501 453.604C697.609 449.327 693.981 445.645 690.009 442.553C665.647 424.088 636.529 430.735 613.849 447.75C589.181 466.11 572.869 493.786 552.516 517.924C532.936 541.651 510.705 562.823 486.317 580.58C451.407 606.014 411.885 624.01 370.873 635.09C273.177 661.502 169.274 642.103 72.3146 611.951C48.6627 604.48 24.1159 596.303 0.764648 587.638L1.46051 584.144C17.7869 587.214 34.0613 590.514 50.3294 593.684C151.253 613.325 256.842 631.361 356.196 603.295C360.056 602.126 363.824 601.073 367.46 599.908C370.376 598.916 375.775 597.1 378.656 596.123C381.532 595.032 386.88 593.025 389.722 591.95C446.579 568.9 499.199 534.963 543.388 489.687C560.727 471.711 578.304 450.633 598.927 435.754C627.947 414.468 664.933 404.751 697.139 427.609C703.137 431.925 708.589 437.309 712.936 443.602C714.739 446.171 716.483 449.256 717.897 452.039C718.926 454.391 720.129 457.024 720.912 459.488C728.508 483.342 719.639 512.426 699.019 523.685C672.625 537.695 641.855 515.289 632.187 486.754C623.156 460.271 628.135 431.735 636.506 406.77C656.485 346.087 695.326 296.775 735.096 251.059C774.837 205.497 817.153 161.357 868.169 130.637C889.541 117.67 913.637 106.874 939.195 108.761C951.686 109.678 963.98 113.981 974.819 121.261C993.621 134.014 1005.15 155.301 1004.02 179.263C1002.36 216.416 978.023 239.801 955.683 263.091C942.164 277.261 931.33 294.752 925.605 314.496C918.872 337.792 918.483 364.457 928.502 387.403C934.977 402.371 945.637 415.782 959.205 423.315C972.922 431.037 988.783 431.691 1003.23 427.361C1025.95 420.783 1044.16 403.053 1057.14 382.282C1071.76 359.129 1081.75 331.967 1093.32 306.572C1095.91 300.884 1098.86 294.339 1101.52 288.696C1142.19 201.429 1190.93 118.713 1248.22 43.6992C1252.56 38.028 1256.69 32.6976 1261.05 27.164C1283.37 -1.80858 1325.28 -9.8594 1353.41 17.9209C1379.27 43.1548 1378.2 85.4981 1368.11 117.425C1361.23 139.773 1350.28 160.932 1346.46 183.865C1346.29 185.118 1345.88 188.016 1345.74 189.406C1345.62 191.142 1345.44 193.192 1345.43 194.864C1345.42 195.884 1345.38 197.871 1345.42 198.829C1345.93 211.429 1352.94 225.552 1362.88 232.84C1373.97 240.905 1381.06 235.203 1390.26 226.958C1396.1 221.599 1404.6 214.562 1412.76 212.055C1435.47 204.073 1459.22 222.579 1466.65 246.389C1473.38 267.91 1467.75 290.728 1458.79 309.553C1446.1 336.983 1425.81 359.756 1418.15 389.464C1414.47 404.588 1417.13 422.228 1425.32 435.565C1435.35 451.608 1451.03 452.963 1465.09 442.106C1477.11 433.169 1487.14 418.007 1496.75 405.783C1532.63 358.721 1569.75 310.734 1606.54 264.585L1609.16 266.872L1609.15 266.811Z"
                  fill="none"
                  stroke="#6F8EFB"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    pathLength: smoothBlueShapePath,
                    opacity: 0.85,
                  }}
                />
              </motion.svg>

              <motion.div
                ref={expertiseTrackRef}
                style={{ x: expertiseX }}
                className="relative z-10 mt-6 flex w-max gap-4 will-change-transform md:mt-24 md:gap-5"
              >
                <div className="w-1 shrink-0" aria-hidden="true" />
                {skillCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="group relative w-[88vw] max-w-[320px] min-h-[280px] overflow-hidden whitespace-normal rounded-2xl border-primary/15 bg-background/75 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/10 md:w-[82vw] md:max-w-[360px] md:min-h-[300px]"
                  >
                    <div className="pointer-events-none absolute right-4 top-3 text-4xl font-bold tracking-tight text-primary/10 transition-colors duration-300 group-hover:text-primary/15 md:text-5xl">
                      {category.id}
                    </div>

                    <CardHeader className="pb-3">
                      <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-primary/70 md:tracking-[0.32em]">
                        <span>{category.id}</span>
                        <span className="h-px flex-1 bg-primary/20" />
                      </div>
                      <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                        {category.icon}
                        {category.title}
                      </CardTitle>
                      <p className="pr-8 text-sm leading-6 text-muted-foreground md:pr-12">
                        {category.summary}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs md:text-sm text-primary"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div className="w-[45vw] shrink-0 md:w-40" aria-hidden="true" />
              </motion.div>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
