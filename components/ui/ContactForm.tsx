// components/ui/ContactForm.tsx
"use client";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
      setForm({ name: "", email: "", message: "" });
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
      <div>
        <label className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      <div>
        <label className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      <div>
        <label className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Tell me what you're working on..."
          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>

      {error && (
        <p className="text-red-400 font-mono text-xs">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3.5 bg-accent hover:bg-accent-hover text-black font-bold rounded-lg transition-colors disabled:opacity-50 font-display tracking-tight"
      >
        {status === "loading" ? "Sending..." : "Send message →"}
      </button>

      <p className="text-neutral-600 text-xs text-center font-mono">
        Or email me directly at{" "}
        <a href="mailto:riojoshuadev@gmail.com" className="text-accent hover:underline">
          riojoshuadev@gmail.com
        </a>
      </p>
    </form>
  );
}
