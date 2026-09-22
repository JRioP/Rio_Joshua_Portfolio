// components/ui/ContactForm.tsx
"use client";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({company:"", name: "", email: "", message: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({company:"", name: "", email: "", message: "" });
    } catch {
      setError("Failed to send. Please try emailing me directly.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="p-8 border border-neutral-800 rounded-xl bg-neutral-900 text-center">
        <p className="font-display text-2xl font-bold mb-2">Message sent!</p>
        <p className="text-neutral-400 text-sm">I'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Honeypot — real users never see or fill this. Bots that auto-fill every field will. */}
      <div className="absolute left-[-9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={form.company}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="font-mono text-xs text-neutral-300 uppercase tracking-widest block mb-2 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-base sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500/20 transition-all"
        />
      </div>
      <div>
        <label htmlFor="email" className="font-mono text-xs text-neutral-300 uppercase tracking-widest block mb-2 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-base sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500/20 transition-all"
        />
      </div>
      <div>
        <label htmlFor="message" className="font-mono text-xs text-neutral-300 uppercase tracking-widest block mb-2 font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Tell me what you're working on..."
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-base sm:text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500/20 transition-all resize-none"
        />
      </div>

      {error && (
        <p role="alert" aria-live="polite" className="text-red-500 font-mono text-xs">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="w-full py-3.5 bg-accent-500 hover:bg-accent-hover text-neutral-950 font-bold rounded-lg transition-colors disabled:opacity-50 font-display tracking-tight cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/30"
      >
        {status === "loading" ? "Sending..." : "Send message →"}
      </button>

      <p className="text-neutral-400 text-xs text-center font-mono">
        Or email me directly at{" "}
        <a href="mailto:riojoshuadev@gmail.com" className="text-accent-500 hover:underline">
          riojoshuadev@gmail.com
        </a>
      </p>
    </form>
  );
}
