import Image from "next/image";
import { getProjects } from "@/lib/projects";
import { RotatingText } from "@/components/RotatingText";
import {TechStackModal} from "@/components/TechStackModal";
import ContactForm from "@/components/ui/ContactForm";
import ExperienceSection from "@/components/ui/ExperienceSection";


const TECH_STACK = [
  // Frontend
  { label: "Next.js", category: "Frontend" },
  { label: "React", category: "Frontend" },
  { label: "TypeScript", category: "Frontend" },

  // Backend
  { label: "PHP", category: "Backend" },
  { label: "Python", category: "Backend" },
  { label: "Java", category: "Backend" },

  // Database
  { label: "Firebase", category: "Database" },
  { label: "MySQL", category: "Database" },

  // CMS & Web
  { label: "WordPress", category: "CMS & Web" },
  { label: "MDX", category: "CMS & Web" },

  // DevOps & Tools
  { label: "Git / GitHub", category: "DevOps & Tools" },
  { label: "Vercel", category: "DevOps & Tools" },
  { label: "Figma", category: "DevOps & Tools" },

  // Mobile
  { label: "Android (Java)", category: "Mobile" },
  { label: "Android Studio", category: "Mobile" },

  // Enterprise & AI
  { label: "LangChain", category: "Enterprise & AI" },
  { label: "SAP S/4HANA", category: "Enterprise & AI" },
];

export default function Home() {
  const PROJECTS = getProjects();
  return (
    <>
    <main className="relative px-6 max-w-6xl mx-auto">
      <section className="min-h-screen flex items-center relative">
        {/* Animated background blobs */}
        <div className="hero-blobs">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
      <div className="flex items-center gap-12 w-full relative z-10">
        {/* LEFT COLUMN — text content */}
        <div className="flex-1 max-w-xl">
        <h1 className="font-display text-6xl font-bold leading-tight tracking-tight">
          Hi, I'm Joshua <br />
        </h1>
        <h1 className="font-display text-4xl text-accent-500 font-bold leading-tight tracking-tight mb-6">
          <RotatingText/>
        </h1>
        

        <p className="text-neutral-400 text-lg leading-relaxed mb-4">
          Full-stack developer from the Philippines. I've shipped a real-time
          Android app, a live corporate website, and a local AI chatbot.
        </p>

        <ul className="flex flex-col gap-3 mb-10">
        {[
          "Builds things that actually get deployed.",
          "Solves real problems, not just tutorial projects.",
          "Ships fast, secures properly, and documents clearly.",
            ].map((item) => (
          <li key={item} className="flex items-start gap-3">
          <span className="mt-1 w-4 h-4 rounded-full border border-accent-500 flex items-center justify-center shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
            </span>
          <span className="text-neutral-300 text-sm leading-relaxed">{item}</span>
          </li>
          ))}
          </ul>

        <div className="flex gap-4">
          <a
            href="/projects"
            className="px-6 py-3 bg-accent-500 text-black font-bold rounded-lg hover:bg-accent-400 hover:text-amber-50 transition-colors"
          >
            See my work
          </a>
          <a
            href="/contact"
            className="px-6 py-3 border border-neutral-700 text-neutral-300 font-bold rounded-lg hover:border-neutral-500 hover:text-white transition-colors"
          >
            Contact me
          </a>
        </div>
      </div>
      
      {/* RIGHT COLUMN — tech stack card */}
      <div className="hidden lg:flex flex-1 justify-end">
        <div className="w-80 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">

          <div className="flex items-center justify-between">
          <h3 className="font-semibold">Tech Stack<span className="text-accent-500">.</span></h3>
          <TechStackModal />
            </div>

          <div className="flex flex-col pt-1.5 gap-4">
            {["Frontend", "Backend", "Database", "CMS & Web", "DevOps & Tools", "Mobile", "Enterprise & AI"].map((category) => (
              <div key={category}>
                <p className="font-bold text-sm text-neutral-100 mb-2">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {TECH_STACK.filter((t) => t.category === category).map((tech) => (
                    <span
                      key={tech.label}
                      className="font-mono text-xs px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700"
                    >
                      {tech.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-800 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-neutral-600">Status</span>
              <span className="flex items-center gap-2 font-mono text-xs text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to work
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-neutral-600">Location</span>
              <span className="font-mono text-xs text-neutral-300">Laguna, PH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-neutral-600">Available</span>
              <span className="font-mono text-xs text-neutral-300">Remote / Metro Manila</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-neutral-600">GitHub</span>
              <a
                href="https://github.com/JRioP"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-accent-500 hover:underline"
              >
                JRioP
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-neutral-600 animate-bounce">
        <span className="font-mono text-xs tracking-widest uppercase">scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neutral-600">
          <path d="M8 3v10M8 13l-4-4M8 13l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="w-full mt-20 relative">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-6xl font-bold tracking-tight mb-12">
            Featured Projects<span className="text-accent-500">.</span>
            </h2>
          </div>
          <a
            href="/projects"
            className="font-mono text-xs text-neutral-400 hover:text-accent-500 transition-colors uppercase tracking-widest"
          >
            See all →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROJECTS.filter((p) => p.featured).map((project) => (
            <a
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-600 transition-all duration-200 hover:-translate-y-1"
            >
              <p className="font-mono text-xs text-accent-500 uppercase tracking-widest mb-4">
                {project.category}
              </p>
              {project.coverImage && (
                 <div className="relative w-full h-72 rounded-xl overflow-hidden mb-5 bg-neutral-800">
                  <Image
                    src={project.coverImage}
                   alt={project.title}
                   fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <h3 className="font-display text-xl font-bold tracking-tight mb-2 group-hover:text-accent-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-5">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <ExperienceSection />

      {/* About Me */}
      <section className="w-full mt-32">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-6xl font-bold tracking-tight mb-12">
            About Me<span className="text-accent-500">.</span>
            </h2>
          </div>
          <a
            href="/about"
            className="font-mono text-xs text-neutral-400 hover:text-accent-500 transition-colors uppercase tracking-widest"
          >
            Full story →
          </a>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Image */}
          <div className="shrink-0">
            <Image
              src="/images/about.jpg"
              alt="Joshua"
              width={280}
              height={280}
              className="rounded-2xl border border-neutral-800 object-cover"
              priority={false}
            />
          </div>
          
          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-neutral-400 text-3xl leading-relaxed mb-5">
             I'm a BSIT graduate from STI College Tanauan, based in Laguna. 
             I like building things that solve real problems — a real-time roadside assistance app, a production corporate website, and a local AI document chatbot.
              I'm currently looking for a professional role, open to Metro Manila or remote.
            </p>
          </div>
        </div>
      </section>

    <section className="min-h-screen flex items-center relative">
        <div className="min-h-screen pt-30 pb-20 px-6 max-w-2xl mx-auto">
              <h1 className="font-display text-6xl font-bold mb-4">Get in touch<span className="text-accent-500">.</span></h1>
              <p className="text-neutral-400 mb-12">
                Open to full-time roles and interesting projects. Based in Laguna — available remotely.
              </p>
              <ContactForm />
            </div>
    </section>

    </main>
    </>
  );
}