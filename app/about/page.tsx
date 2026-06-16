// app/about/page.tsx
import Image from "next/image";
import type { Metadata } from "next";
import { ALL_TECH_STACK, GROUPED_TECH_STACK } from "@/lib/tech-stack";
import FadeIn from "@/components/ui/animations/fadeIn";

export const metadata: Metadata = {
  title: "About",
  description: "BSIT graduate and full-stack developer from Batangas, Philippines.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="font-display text-6xl font-bold tracking-tight mb-12">About<span className="text-accent-500">.</span></h1>
      
      {/* Photo + bio section */}
      <FadeIn as="section" className="w-full mt-20 relative" direction="up">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="shrink-0">
             <div className="relative w-56 h-64 rounded-2xl overflow-hidden border border-neutral-800">
              <Image
                src="/images/about.jpg"
                alt="Joshua Rio"
                fill
                priority
                className="object-cover object-top"
                />
              </div>
            <div className="mt-4 justify-center flex items-center gap-2 font-mono text-xl text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to work
              </div>
            </div>
              <div className="flex-1 min-w-0">
              <div>
              <h1 className="text-neutral-200 text-4xl font-bold mb-4 tracking-tight">
                I build real things that get deployed.
              </h1>
              <p className="text-neutral-400 text-lg leading-relaxed mb-4 max-w-2xl">
                I'm a BSIT graduate from STI College Tanauan, based in Laguna, Philippines. 
                My work includes a real-time Android roadside assistance app, a production corporate website, 
                and a local AI document chatbot.
              </p>
              </div>
              <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                I don't just follow tutorials. I deploy things, secure them, and make them fast.
                I'm currently looking for a professional role — open to Metro Manila or remote.
              </p>

              <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <span className="text-accent-500">📍</span>
                Laguna, Philippines
              </div>

              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <span className="text-accent-500">🎓</span>
                BSIT — STI College Tanauan
              </div>

              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <span className="text-accent-500">💼</span>
                Available for full-time roles
              </div>

              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <span className="text-accent-500">🌐</span>
                Remote / Metro Manila
              </div>
            </div>
          </div>  
        </div>
      </FadeIn>

      <FadeIn as ="section" className="w-full mt-20 relative" direction="left">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold tracking-tight">Tech Stack <span className="text-accent-400">.</span></h2>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
            I work across the stack, but I specialize in Android development and backend APIs. 
            Here are some of the technologies I use:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {ALL_TECH_STACK.map((tech) => (
              <div key={tech.name} className="flex items-center gap-3 p-4 border border-neutral-800 rounded-lg">
                <Image src={tech.icon} alt={tech.name} width={32} height={32} className="object-contain" />
                <span className="text-sm text-neutral-300">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
      {/* TODO: Build out About sections */}
      {/* Sections to include:
            - Photo + bio paragraph
            - Tech stack grid (Android, Web, AI, Tools)
            - Certifications table (LPI, SAP, Oracle, Python)
            - Education timeline (STI Tanauan, BSIT 2025)
      */}
    </div>
  );
}
