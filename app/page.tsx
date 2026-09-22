import Image from "next/image";
import { getProjects, getInProgressProjects } from "@/lib/projects";
import { RotatingText } from "@/components/RotatingText";
import ContactForm from "@/components/ui/ContactForm";
import ExperienceSection from "@/components/ui/ExperienceSection";
import CurrentProjectsSection from "@/components/ui/CurrentProjectsSection";
import ProjectCard from "@/components/projects/ProjectCard";
import FadeIn from "@/components/ui/animations/fadeIn";
import { TechStackCard } from "@/components/techStackCard/TechStackCard";

export default function Home() {
  const projects = getProjects();
  const inProgressProjects = getInProgressProjects();
  return (
    <>
      {/* Hero Section */}
      <main className="min-h-screen relative w-full overflow-hidden">
        <section className="min-h-screen w-full flex items-center relative py-12 md:py-0 px-6 sm:px-10 md:px-[50px] overflow-hidden">
          {/* Animated background blobs */}
          <div className="min-h-screen hero-blobs pointer-events-none">
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />
          </div>
          
        <div className="flex flex-col md:flex-row items-center gap-12 w-full relative z-10 max-w-6xl mx-auto">
        {/* LEFT COLUMN — text content */}
          <div className="flex-1 max-w-xl">
          <h1 className="text-4xl font-display md:text-6xl font-bold leading-tight tracking-tight">
          Hi, I'm Josh <br />
          </h1>
          <h1 className="text-xl font-display md:text-4xl text-accent-500 font-bold leading-tight tracking-tight mb-6">
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
          <span className="w-1.5 h-1.5 rounded-full bg-accent-500" /></span>
          <span className="text-neutral-300 text-sm leading-relaxed">{item}</span>
          </li>
          ))}
          </ul>
        
        {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="/projects"
                className="px-6 py-3.5 bg-accent-500 hover:bg-accent-hover text-white font-sans font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] text-center text-sm shadow-[0_2px_12px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.45)] border border-blue-400/30 flex items-center justify-center gap-2 min-h-[44px] group"
              >
                <span>See my work</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-blue-100"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 3.5L10.5 8L6 12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="/contact"
                className="px-6 py-3.5 border border-neutral-700/80 bg-neutral-800/70 hover:bg-neutral-800 text-neutral-200 hover:text-white hover:border-neutral-600 font-sans font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] text-center text-sm shadow-sm flex items-center justify-center min-h-[44px]"
              >
                Contact me
              </a>
            </div>
          </div>
      
      {/* RIGHT COLUMN — tech stack card */}
      <div className="hidden lg:flex flex-1 justify-end">
        <div className="w-80 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          {/* Tech Stack Card */}
            <div className="flex items-center justify-between">
            <TechStackCard/>
            </div>
          {/* Status, Location, Available, GitHub */}
          <div className="mt-6 pt-6 border-t border-neutral-800 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-neutral-400">Status</span>
              <span className="flex items-center gap-2 font-mono text-xs text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to work
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-neutral-400">Location</span>
              <span className="font-mono text-xs text-neutral-300">Batangas, PH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-neutral-400">Available</span>
              <span className="font-mono text-xs text-neutral-300">Remote / Metro Manila</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-neutral-400">GitHub</span>
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-neutral-400 scroll-indicator">
        <span className="font-mono text-xs tracking-widest uppercase">scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neutral-400" aria-hidden="true">
          <path d="M8 3v10M8 13l-4-4M8 13l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
        </section>

        {/* FEATURED PROJECTS */}
        <FadeIn as="section" className="w-full mt-20 relative overflow-visible px-6 sm:px-10 md:px-15 lg:px-50" direction="up">   
          <Image
            src="/images/bg/doodles.2f5849cf.svg"
            alt="Background doodles"
            fill
            className="object-cover object-center pointer-events-none select-none opacity-30 overflow-visible"
            priority={false}
          />
        
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-display font-bold tracking-tight mb-12 text-4xl md:text-6xl">
                  Featured Projects<span className="text-accent-500">.</span>
                </h2>
              </div>
            <a href="/projects" className="font-mono text-xs text-neutral-400 hover:text-accent-500 transition-colors uppercase tracking-widest">
              See all →
            </a>
          </div>
  
          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter((p) => p.featured).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          </div>  
        </FadeIn>

        {/* Currently Building / In Progress Section */}
        <CurrentProjectsSection projects={inProgressProjects} />

        {/* Experience Section */}
        <FadeIn as="section" className="w-full mt-20 relative overflow-visible px-6 sm:px-10 md:px-15 lg:px-50" direction="left" delay={100}>
        <ExperienceSection/>
        </FadeIn>

        {/* About Me Section */}
        <FadeIn as="section" className="w-full mt-20 relative overflow-visible px-6 sm:px-10 md:px-15 lg:px-50" direction="right" delay={100}>
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight mb-12 md:text-6xl">
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
            <p className="text-neutral-400 text-2xl leading-relaxed mb-5 md:text-4xl">
             I'm a BSIT graduate from STI College Tanauan, based in Talisay City, Batangas. 
             I like building things that solve real problems — a real-time roadside assistance app, a production corporate website, and a local AI document chatbot.
              I'm currently looking for a professional role, open to Metro Manila or remote.
            </p>
          </div>
        </div>
        </FadeIn>
      
        {/* Contact Section */}
        <FadeIn as="section" className="w-full mt-20 relative overflow-visible px-10 md:px-15 lg:px-50" direction="up" delay={100}>
          <div className="min-h-screen pt-32 pb-20 px-6 max-w-2xl mx-auto">
            <h1 className="font-display text-4xl font-bold mb-4 md:text-6xl">Get in touch<span className="text-accent-500">.</span></h1>
            <p className="text-neutral-400 mb-12">
              Open to full-time roles and interesting projects. Based in Talisay City, Batangas — available remotely.
              </p>
            <ContactForm />
            </div>
        </FadeIn>
      
      </main>
    </>
  );
}
