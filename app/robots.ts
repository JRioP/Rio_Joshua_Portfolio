import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"], // don't let crawlers index your API routes
    },
    sitemap: "https://joshuario.vercel.app/sitemap.xml",
  };
}