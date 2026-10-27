// app/about/page.tsx
import Image from "next/image";
import type { Metadata } from "next";
import { GROUPED_TECH_STACK } from "@/lib/tech-stack";
import { GROUPED_CERTIFICATE } from "@/lib/certications";
import FadeIn from "@/components/ui/animations/fadeIn";
import CertificateCarousel from "@/components/ui/CertificateCarousel";

export const metadata: Metadata = {
  title: "About",
  description: "BSIT graduate, full-stack developer, and hardware technician from Batangas, Philippines.",
};

export default function AboutPage() {
  const groupedTech = GROUPED_TECH_STACK;
  const groupedCert = GROUPED_CERTIFICATE;

  return (
    <div className="min-h-screen w-full mt-20 relative overflow-visible py-10 px-6 sm:px-10 md:px-15 lg:px-50">
      <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-12">
        About<span className="text-accent-500">.</span>
      </h1>

      {/* Photo + bio section */}
      <FadeIn as="section" className="w-full relative mt-10 md:mt-20 overflow-visible" direction="up" delay={100}>
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Photo */}
          <div className="shrink-0">
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden border border-neutral-800 md:w-72 md:h-56">
              <Image
                src="/images/BSIT_RIO.jpg"
                alt="Joshua Rio"
                fill
                priority
                sizes="224px"
                className="object-cover object-top"
              />
            </div>
            <div className="mt-4 flex items-center gap-2 font-mono text-sm text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Open to work
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1 min-w-0">
            <h2 className="text-neutral-200 text-xl font-bold mb-4 tracking-tight">
              I build real things that get deployed — from bare metal to cloud.
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-4 max-w-2xl">
              I'm a BSIT graduate from STI College Tanauan, based in Batangas, Philippines.
              My work spans full-stack software development and hands-on computer hardware servicing:
              from deploying real-time Android apps and AI chatbots to custom PC assembly, laptop repairs, and thermal repasting.
            </p>
            <p className="text-neutral-300 text-lg leading-relaxed mb-6">
              I don't just follow tutorials. I assemble hardware with precision, write clean code, secure production domains, and make systems fast.
              I'm currently looking for a professional role — open to Metro Manila or remote.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <span className="text-accent-500">📍</span>
                Batangas, Philippines
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <span className="text-accent-500">🎓</span>
                BSIT — STI College Tanauan
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <span className="text-accent-500">💼</span>
                Available for full-time roles &amp; services
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <span className="text-accent-500">🌐</span>
                Remote / Metro Manila
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Hardware & Systems Servicing Section */}
      <FadeIn as="section" className="w-full relative mt-20 overflow-visible" direction="up" delay={100}>
        <h2 className="text-3xl font-bold tracking-tight">
          Hardware &amp; Systems Servicing <span className="text-accent-400">.</span>
        </h2>
        <p className="text-neutral-400 text-lg leading-relaxed mt-4">
          Beyond writing software, I provide hands-on hardware diagnostics, assembly, and restorative maintenance for desktop PCs and laptops. My work includes full-cycle custom rig builds, precision component teardowns for part replacements like keyboards and batteries, and deep thermal servicing to resolve overheating and performance throttling.
        </p>
        <p className="text-neutral-400 text-lg leading-relaxed mt-2 pb-6 max-w-2xl">
          Here are some of the hardware services and solutions I provide:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Card 1: Custom PC Building */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center mb-5 text-accent-400">
                <Image src="/images/techStackIcons/pc-build.svg" alt="Custom PC Building" width={26} height={26} />
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-100 mb-2">
                Custom Desktop PC Assembly
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                Full-cycle PC assembly for gaming, workstation, and productivity rigs. Component selection, clean routing &amp; cable management, BIOS configuration (XMP/EXPO, fan curves), and load stress-testing.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-800/80">
              {["Custom Rig Assembly", "Cable Management", "BIOS / XMP Setup", "Stress Testing"].map((tag) => (
                <span key={tag} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-neutral-800/70 text-neutral-300 border border-neutral-700/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Laptop Part Replacement */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center mb-5 text-accent-400">
                <Image src="/images/techStackIcons/laptop-repair.svg" alt="Laptop Repair" width={26} height={26} />
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-100 mb-2">
                Laptop Diagnostics &amp; Repair
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                Precision teardown and replacement for broken or worn laptop components. Keyboard replacement, swollen battery swaps, display panel fixes, hinge stabilization, and NVMe SSD / RAM upgrades.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-800/80">
              {["Keyboard Replacement", "Battery Swaps", "RAM / SSD Upgrades", "Display Repair"].map((tag) => (
                <span key={tag} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-neutral-800/70 text-neutral-300 border border-neutral-700/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Thermal Maintenance & Repasting */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center mb-5 text-accent-400">
                <Image src="/images/techStackIcons/thermal.svg" alt="Thermal Repasting" width={26} height={26} />
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-100 mb-2">
                Thermal Repasting &amp; Deep Clean
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                Restoring thermal headroom and ending thermal throttling on laptops and desktops. Deep heatsink de-dusting, fresh high-grade thermal paste application (CPU &amp; GPU), and thermal pad renewals.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-800/80">
              {["Thermal Paste Repasting", "Thermal Pad Replacement", "Dust Decontamination", "Throttling Fixes"].map((tag) => (
                <span key={tag} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-neutral-800/70 text-neutral-300 border border-neutral-700/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Tech Stack Section */}
      <FadeIn as="section" className="w-full relative mt-20 overflow-visible" direction="left" delay={100}>
        <h2 className="text-3xl font-bold tracking-tight">
          Tech Stack <span className="text-accent-400">.</span>
        </h2>
        <p className="text-neutral-400 text-lg leading-relaxed mt-4">
          I build end-to-end web applications, AI-integrated systems, and robust hardware setups. My focus is on crafting seamless user experiences with Next.js and TypeScript on the frontend, supported by Python and PHP backends, and backed by comprehensive hardware understanding.
        </p>
        <p className="text-neutral-400 text-lg leading-relaxed mt-2 pb-6 max-w-2xl">
          Here are some of the technologies and tools I work with:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {Object.entries(groupedTech).map(([category, items]) => (
            <div key={category} className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
              <p className="text-xs font-semibold text-accent-500 uppercase tracking-wider mb-3">
                {category}
              </p>
              <div className="flex flex-col gap-2">
                {items.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2.5 p-2.5 border border-neutral-800/70 bg-neutral-900/90 rounded-lg hover:border-neutral-700 transition-colors"
                  >
                    <Image src={tech.icon} alt={tech.name} width={22} height={22} className="object-contain shrink-0" />
                    <span className="text-xs font-mono text-neutral-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Certification Section */}
      <FadeIn as="section" className="w-full relative mt-20 overflow-visible" direction="right" delay={100}>
        <h2 className="text-3xl font-bold tracking-tight">
          Certifications<span className="text-accent-400">.</span>
        </h2>
        <div className="grid grid-cols-1 mt-10 space-y-5 md:grid-cols-2 md:space-y-0 gap-6">
          {/* Render a carousel for each certificate category */}
          {Object.entries(groupedCert).map(([category, items]) => (
            <div key={category} className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {category}
              </p>
              <CertificateCarousel certificates={items} />
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Education Section */}
      <FadeIn as="section" className="w-full relative mt-20 overflow-visible" direction="up" delay={100}>
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Education timeline<span className="text-accent-400">.</span>
          </h2>

          {/* Timeline list */}
          <ul className="relative flex flex-col gap-0 mt-6">
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
                <time className="font-mono text-xs text-neutral-400 tracking-widest">2014 – 2016</time>
                <h3 className="text-lg font-semibold text-neutral-100 mt-1 mb-1">
                  Associate in Information Technology — Second Philippine International School
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Graduated 2016. <br />
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
