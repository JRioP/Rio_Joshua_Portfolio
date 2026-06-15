export const ALL_TECH_STACK = [
  { label: "JavaScript", category: "Frontend" },
  { label: "TypeScript", category: "Frontend" },
  { label: "React", category: "Frontend" },
  { label: "Next.js", category: "Frontend" },
  { label: "HTML", category: "Frontend" },
  { label: "CSS", category: "Frontend" },
  { label: "Tailwind CSS", category: "Frontend" },
  { label: "Elementor", category: "Frontend" },
  { label: "PHP", category: "Backend" },
  { label: "Python", category: "Backend" },
  { label: "Java", category: "Backend" },
  { label: "Node.js", category: "Backend" },
  { label: "Firebase", category: "Backend" },
  { label: "SQL", category: "Database" },
  { label: "MySQL", category: "Database" },
  { label: "Firestore", category: "Database" },
  { label: "WordPress", category: "CMS & Web" },
  { label: "MDX", category: "CMS & Web" },
  { label: "Git / GitHub", category: "DevOps & Tools" },
  { label: "Vercel", category: "DevOps & Tools" },
  { label: "Cloudflare", category: "DevOps & Tools" },
  { label: "Figma", category: "DevOps & Tools" },
  { label: "Wireshark", category: "DevOps & Tools" },
  { label: "Android (Java)", category: "Mobile" },
  { label: "Android Studio", category: "Mobile" },
  { label: "Google Maps SDK", category: "Mobile" },
  { label: "SAP S/4HANA", category: "Enterprise & AI" },
  { label: "LangChain", category: "Enterprise & AI" },
  { label: "Ollama", category: "Enterprise & AI" },
  { label: "ChromaDB", category: "Enterprise & AI" },
] as const;


export type TechItem = (typeof ALL_TECH_STACK)[number];


export const GROUPED_TECH_STACK = ALL_TECH_STACK.reduce((acc, item) => {
  (acc[item.category] ??= []).push(item);
  return acc;
}, {} as Record<string, TechItem[]>);
