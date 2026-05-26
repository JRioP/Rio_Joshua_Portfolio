export default function Home() {
  return (
    <main className="min-h-screen pt-32 px-6 max-w-3xl mx-auto">
      <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mb-4">
        portfolio
      </p>
      <h1 className="font-display text-6xl font-bold leading-none tracking-tight mb-6">
        Hi, I am Joshua Rio.
      </h1>
      <p className="text-neutral-400 text-xl leading-relaxed mb-8">
        Full-stack developer from Batangas. I build Android apps,
        production websites, and AI-powered tools.
      </p>
      <a href="/projects" className="inline-block px-6 py-3 bg-orange-500 text-black font-bold rounded-lg">
        See my work
      </a>
    </main>
  );
}