// app/contact/page.tsx
import type { Metadata } from "next";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Joshua Rio — open to full-time roles and freelance projects.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-2xl mx-auto">
      <h1 className="font-display text-5xl font-bold mb-4">Get in touch.</h1>
      <p className="text-neutral-400 mb-12">
        Open to full-time roles and interesting projects. Based in Batangas — available remotely.
      </p>
      <ContactForm />
    </div>
  );
}
