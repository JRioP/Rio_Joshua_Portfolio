// components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-neutral-600">
          © {new Date().getFullYear()} Joshua Rio · Built with Next.js + Tailwind
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/JRioP"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-neutral-600 hover:text-accent transition-colors uppercase tracking-widest"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/japrdev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-neutral-600 hover:text-accent transition-colors uppercase tracking-widest"
          >
            LinkedIn
          </a>
          <a
            href="mailto:riojoshuadev@gmail.com"
            className="font-mono text-xs text-neutral-600 hover:text-accent transition-colors uppercase tracking-widest"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
