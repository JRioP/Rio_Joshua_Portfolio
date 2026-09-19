import type { Metadata } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/themes/ThemeProvider";
import { THEME_SCRIPT } from "@/components/themes/ThemeScript";
import { CookieConsentProvider } from "@/components/consentBanner/CookieConsentProvider";
import { CookieConsentBanner } from "@/components/consentBanner/CookieConsentBanner";
import { ConditionalAnalytics } from "@/components/ConditionalAnalytics";

const gibed = localFont({
  src: "../public/fonts/gibed.otf",
  variable: "--font-gibed",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joshuario.com"),
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
    url: "https://joshuario.com",
    title: "Joshua Rio — Full-Stack Developer",
    description: "Full-stack developer from Batangas. I build Android apps, production websites, and AI-powered tools.",
    siteName: "Joshua Rio",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Joshua Rio — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua Rio — Full-Stack Developer",
    description: "Full-stack developer from Batangas.",
    images: ["/og-image.jpg"],
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
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Joshua Alnie Padilla Rio",
      "alternateName": "Joshua Rio",
      "url": "https://joshuario.com",
      "email": "riojoshuadev@gmail.com",
      "jobTitle": "Junior Full-Stack Developer",
      "description": "Cum Laude BSIT graduate, Programmer of the Year. Ships production-ready web, mobile, and AI applications.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Talisay City",
        "addressRegion": "Batangas",
        "addressCountry": "PH"
        },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "STI College Tanauan"
        },
      "knowsAbout": ["PHP", "Java", "Python", "React", "Next.js", "Firebase", "WordPress", "Android Development", "AI/LLM"],
      "sameAs": [
        "https://github.com/JRioP",
       "https://linkedin.com/in/japrdev"
        ]
      };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${gibed.variable} ${plusJakartaSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-script"
          dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
        />
      </head>
      <body className="bg-neutral-950 text-neutral-100 antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <CookieConsentProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CookieConsentBanner />
            <ConditionalAnalytics />
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

