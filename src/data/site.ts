export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description:
    "Nether Ninjas creates fun and memorable Minecraft experiences for Realms, Marketplace and Education.",
  email: "", // TODO: add the official contact email
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About Us" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/team", label: "Team" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Official social links. Leave `href` empty until the real URL is available:
 * links without an href are not rendered.
 */
export const socials: { label: string; href: string }[] = [
  { label: "Discord", href: "" },
  { label: "YouTube", href: "" },
  { label: "X / Twitter", href: "" },
  { label: "Instagram", href: "" },
  { label: "TikTok", href: "" },
  { label: "LinkedIn", href: "" },
].filter((s) => s.href);

export const projectTypes = ["Realms", "Marketplace", "Education", "Collaboration", "Other"] as const;
