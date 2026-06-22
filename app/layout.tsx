import type { Metadata } from "next";
import { DM_Sans, Syne, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Joshua Rio — Full-Stack Developer",
    template: "%s · Joshua Rio",
  },
  description:
    "Full-stack developer from Batangas. I build Android apps, production websites, and AI-powered tools.",
  keywords: ["Joshua Rio", "full-stack developer", "Android", "Next.js", "Philippines", "Batangas"],
  authors: [{ name: "Joshua Rio", url: "https://github.com/JRioP" }],
  creator: "Joshua Rio",
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://joshuario.vercel.app", // TODO: update to your domain
    title: "Joshua Rio — Full-Stack Developer",
    description: "Full-stack developer from Batangas. I build Android apps, production websites, and AI-powered tools.",
    siteName: "Joshua Rio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua Rio — Full-Stack Developer",
    description: "Full-stack developer from Batangas.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${syne.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <SpeedInsights/>
      <Analytics/>
      <body className="bg-neutral-950 text-neutral-100 antialiased" suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
