// app/about/page.tsx
import Image from "next/image";
import type { Metadata } from "next";
import { GROUPED_TECH_STACK } from "@/lib/tech-stack";
import { GROUPED_CERTIFICATE } from "@/lib/certications";
import FadeIn from "@/components/ui/animations/fadeIn";
import CertificateCarousel from "@/components/ui/CertificateCarousel";

export const metadata: Metadata = {
  title: "About",
  description: "BSIT graduate and full-stack developer from Batangas, Philippines.",
};

export default function AboutPage() {

  const groupedTech = GROUPED_TECH_STACK;
  const groupedCert = GROUPED_CERTIFICATE;

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="font-display text-6xl font-bold tracking-tight mb-12">About<span className="text-accent-500">.</span></h1>
      
      {/* Photo + bio section */}
      <FadeIn as="section" className="w-full mt-20 relative" direction="up" delay={0.15}>
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="shrink-0">
             <div className="relative w-56 h-64 rounded-2xl overflow-hidden border border-neutral-800">
              <Image
                src="/images/BSIT_RIO.jpg"
                alt="Joshua Rio"
                fill
                priority
                sizes="100"
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

      {/* Tech Stack Section */}
      <FadeIn as ="section" className="w-full mt-20 relative" direction="left" delay={0.15}>
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold tracking-tight">Tech Stack <span className="text-accent-400">.</span></h2>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
              I worked across these stack, but I specialize in Android development and backend APIs. 
              Here are some of the technologies I use:
            </p>
          <div className="flex flex-row space-y-5">
            {Object.entries(groupedTech).map(([category, items]) => (
              <div key={category}>
                <p className="text-xs font-semibold text-center text-muted-foreground uppercase tracking-wider mb-2">
                  {category}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-3 mt-6 mr-3">
                  {items.map((tech) => (
                      <div key={tech.name} className="flex items-center gap-2 p-4 border border-neutral-800 rounded-lg">
                        <Image src={tech.icon} alt={tech.name} width={30} height={30} className="object-contain" />
                        <span className="text-sm text-neutral-300">{tech.name}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

    <FadeIn as ="section" className="w-full mt-20 relative" direction="right" delay={0.15}>
      <h1 className="text-3xl font-bold tracking-tight">
        Certifications<span className="text-accent-400">.</span>
      </h1>
      <div className="grid grid-cols-2 mt-10 space-y-5">
        {/* Render a carousel for each certificate category */}
        {Object.entries(groupedCert).map(([category, items]) => (
        <div key={category} className="mb-8">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {category}
            </p> 
            <CertificateCarousel certificates={items} />
          </div>
        ))}
      </div>
    </FadeIn>

    <FadeIn as="section" className="w-full mt-20" direction="up" delay={0.15}>
      <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">
       Education timeline<span className="text-accent-400">.</span>
      </h1>

      {/* Timeline list */}
      <ul className="relative flex flex-col gap-0">

      {/* Vertical connecting line */}
      <div className="absolute left-1.75 top-2 bottom-2 w-px bg-neutral-800" />

      {/* 1 — BSIT */}
      <li className="relative flex gap-5 items-start pb-10">
        <div className="w-4 h-4 rounded-full bg-accent-500 border-2 border-accent-500 shrink-0 mt-1 z-10" />
        <div>
          <time className="font-mono text-xs text-accent-500 tracking-widest">2022 – 2026</time>
          <h3 className="text-lg font-semibold text-neutral-100 mt-1 mb-1">
            BSIT — STI College Tanauan
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Major: Information Technology. Expected graduation 2026.
            Relevant coursework: Android Development, OOP, Data Structures.
            Capstone: RoadRescue — real-time Android roadside assistance app.
          </p>
        </div>
      </li>

      {/* 2 — SPIS */}
      <li className="relative flex gap-5 items-start pb-10">
        <div className="w-4 h-4 rounded-full bg-neutral-950 border-2 border-neutral-700 shrink-0 mt-1 z-10" />
        <div>
          <time className="font-mono text-xs text-neutral-500 tracking-widest">2014 – 2016</time>
          <h3 className="text-lg font-semibold text-neutral-100 mt-1 mb-1">
            Associate in Information Technology — Second Philippine International School
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Graduated 2016. <br></br>
            Lead developer of the school robotics club&apos;s competition bot.
          </p>
        </div>
      </li>

      <li className="relative flex gap-5 items-start pb-10">
        <div className="w-4 h-4 rounded-full bg-neutral-950 border-2 border-neutral-700 shrink-0 mt-1 z-10" />
        <div>
          <time className="font-mono text-xs text-neutral-500 tracking-widest">2009 – 2014</time>
          <h3 className="text-lg font-semibold text-neutral-100 mt-1 mb-1">
            HighSchool — Second Philippine International School
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Graduated 2014. <br></br>
            Lead developer of the school robotics club&apos;s competition bot.
          </p>
        </div>
      </li>
    </ul>
  </div>
</FadeIn>
</div>
  );
}
