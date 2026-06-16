export type TechItem = {
  name: string;
  icon: string;          // URL relative to the `public/` folder
  category: string;
};

const iconPath = (fileName: string) => `/images/techStackIcons/${fileName}`;

export const ALL_TECH_STACK: TechItem[] = [
  { name: "JavaScript",   icon: iconPath("javascript.svg"),   category: "Frontend" },
  { name: "TypeScript",   icon: iconPath("typescript.svg"),   category: "Frontend" },
  { name: "React",        icon: iconPath("react.svg"),        category: "Frontend" },
  { name: "Next.js",      icon: iconPath("nextjs.svg"),      category: "Frontend" },
  { name: "HTML",         icon: iconPath("html.svg"),         category: "Frontend" },
  { name: "CSS",          icon: iconPath("css.svg"),          category: "Frontend" },
  { name: "Tailwind CSS", icon: iconPath("tailwindcss.svg"), category: "Frontend" },
  { name: "Elementor",    icon: iconPath("elementor.svg"),    category: "Frontend" },

  { name: "PHP",          icon: iconPath("php.svg"),          category: "Backend" },
  { name: "Python",       icon: iconPath("python.svg"),       category: "Backend" },
  { name: "Java",         icon: iconPath("java.svg"),         category: "Backend" },
  { name: "Node.js",      icon: iconPath("nodejs.svg"),       category: "Backend" },
  { name: "Firebase",     icon: iconPath("firebase.svg"),     category: "Backend" },

  { name: "SQL",          icon: iconPath("sql.svg"),          category: "Database" },
  { name: "MySQL",        icon: iconPath("mysql.svg"),        category: "Database" },
  { name: "Firestore",    icon: iconPath("firestore.svg"),    category: "Database" },

  { name: "WordPress",    icon: iconPath("wordpress.svg"),    category: "CMS & Web" },
  { name: "MDX",          icon: iconPath("mdx.svg"),          category: "CMS & Web" },

  { name: "Git / GitHub", icon: iconPath("github.svg"),       category: "DevOps & Tools" },
  { name: "Vercel",       icon: iconPath("vercel.svg"),       category: "DevOps & Tools" },
  { name: "Cloudflare",   icon: iconPath("cloudflare.svg"),   category: "DevOps & Tools" },
  { name: "Figma",        icon: iconPath("figma.svg"),        category: "DevOps & Tools" },
  { name: "Wireshark",    icon: iconPath("wireshark.svg"),    category: "DevOps & Tools" },

  { name: "Android (Java)",   icon: iconPath("android.svg"),       category: "Mobile" },
  { name: "Android Studio",   icon: iconPath("androidstudio.svg"), category: "Mobile" },
  { name: "Google Maps SDK",  icon: iconPath("googlemaps.svg"),    category: "Mobile" },

  { name: "SAP S/4HANA",      icon: iconPath("sap.svg"),           category: "Enterprise & AI" },
  { name: "LangChain",        icon: iconPath("langchain.svg"),     category: "Enterprise & AI" },
  { name: "Ollama",           icon: iconPath("ollama.svg"),        category: "Enterprise & AI" },
  { name: "ChromaDB",         icon: iconPath("chromadb.svg"),      category: "Enterprise & AI" },
] as const;


export const GROUPED_TECH_STACK = ALL_TECH_STACK.reduce((acc, item) => {
  (acc[item.category] ??= []).push(item);
  return acc;
}, {} as Record<string, TechItem[]>);

