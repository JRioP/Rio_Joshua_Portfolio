// app/contact/page.tsx
import type { Metadata } from "next";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Joshua Rio. Open to full-time roles, software projects, and hardware services.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full pt-28 pb-20 px-6 sm:px-8 max-w-2xl mx-auto">
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
        Get in touch<span className="text-accent-500">.</span>
      </h1>
      <p className="text-neutral-400 text-base sm:text-lg mb-12">
        Open to full-time engineering roles, software projects, and PC building / hardware servicing requests. Based in Batangas (available remotely &amp; locally).
      </p>
      <ContactForm />
    </div>
  );
}
