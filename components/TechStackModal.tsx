"use client";

import { useState } from "react";

// Your full tech stack (all 30 items)
const ALL_TECH_STACK = [
  { label: "JavaScript", category: "Frontend" },
  { label: "TypeScript", category: "Frontend" },
  { label: "React", category: "Frontend" },
  { label: "Next.js", category: "Frontend" },
  { label: "HTML5 / CSS3", category: "Frontend" },
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
];

// Group by category
const grouped = ALL_TECH_STACK.reduce((acc, item) => {
  if (!acc[item.category]) acc[item.category] = [];
  acc[item.category].push(item);
  return acc;
}, {} as Record<string, typeof ALL_TECH_STACK>);

export function TechStackModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger button — replace your existing "View All ›" with this */}
      <button
        onClick={() => setOpen(true)}
        className="font-mono text-xs text-neutral-400 hover:text-accent-500 transition-colors uppercase tracking-widest cursor-pointer"
      >
        View All ›
      </button>

      {/* Backdrop + Modal */}
      {open && (
        <div
          className="fixed inset-0 z-99 flex items-center justify-center p-4"
          onClick={() => setOpen(false)} // click outside to close
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative z-10 w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-xl border border-white/10 bg-[#0f1117] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()} // prevent close on modal click
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-4xl font-semibold text-white">
                Full Tech Stack <span className="text-accent-500">.</span>
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-white transition-colors text-xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Grouped tags */}
            <div className="space-y-5">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item.label}
                        className="px-3 py-1 text-sm rounded-full border border-white/10 bg-white/5 text-white/80"
                      >
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}