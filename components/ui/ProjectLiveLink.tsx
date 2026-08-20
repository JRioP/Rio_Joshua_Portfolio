// components/ui/ProjectLiveLink.tsx
import Link from "next/link";

export function ProjectLiveLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const isInternal = href.startsWith("https://joshuario.vercel.app") || href.startsWith("/");

  if (isInternal) {
    // Strip the domain so Link treats it as an internal route
    const path = href.replace("https://joshuario.vercel.app", "");
    return (
      <Link href={path} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}