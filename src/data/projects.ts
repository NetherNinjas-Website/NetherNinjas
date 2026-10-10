import type { WorldTheme } from "@/components/WorldArt";

export type Category = "realms" | "marketplace" | "education";

export const categories: Record<Category, { label: string; color: string; text: string }> = {
  realms: { label: "Realms", color: "bg-ninja-500", text: "text-white" },
  marketplace: { label: "Marketplace", color: "bg-sun", text: "text-ink" },
  education: { label: "Education", color: "bg-mint", text: "text-ink" },
};

export const roles = [
  "Level Design",
  "Environment Art",
  "Game Design",
  "Development",
  "Creative Direction",
  "Educational Design",
] as const;

export interface Project {
  slug: string;
  title: string;
  category: Category;
  /** TODO: confirm the real status of each project */
  status: "Out now" | "In development" | "Coming soon";
  description: string;
  about: string[];
  roles: (typeof roles)[number][];
  features: { title: string; text: string }[];
  /** Illustration used until real screenshots are added */
  theme: WorldTheme;
  /** Optional real cover, e.g. "/images/projects/island-party/cover.jpg" */
  image?: string;
  /** Optional gallery screenshots in /public/images/projects/... */
  gallery?: string[];
  featured?: boolean;
}

// NOTE: "about", "roles" and "features" are draft copy based on the project
// descriptions in docs/docs.txt — review and replace with the real details.
export const projects: Project[] = [
  {
    slug: "island-party",
    title: "Island Party",
    category: "realms",
    status: "Out now",
    description:
      "A tropical Minecraft resort packed with minigames, exploration and adventures.",
    about: [
      "Island Party invites players to a sunny Minecraft resort where every corner hides something to do.",
      "Friends can hop between minigames, explore the island together and discover secrets along the beach.",
    ],
    roles: ["Level Design", "Environment Art", "Game Design", "Development"],
    features: [
      { title: "Minigames", text: "A collection of quick, replayable games to play with friends." },
      { title: "Tropical island", text: "Beaches, palm trees and colorful resort areas to explore." },
      { title: "Play together", text: "Designed for groups of players on a Realm." },
    ],
    theme: "tropical",
    featured: true,
  },
  {
    slug: "zombreak",
    title: "Zombreak",
    category: "realms",
    status: "Out now",
    description:
      "A Minecraft dungeon crawler filled with dangerous enemies, exploration and exciting challenges.",
    about: [
      "Zombreak drops players into a dungeon full of enemies, traps and treasure.",
      "Each room is a new challenge: explore carefully, work as a team and find your way out.",
    ],
    roles: ["Level Design", "Game Design", "Development"],
    features: [
      { title: "Dungeon crawling", text: "Explore rooms and corridors packed with surprises." },
      { title: "Enemies", text: "Face waves of dangerous mobs along the way." },
      { title: "Challenges", text: "Obstacles that reward teamwork and quick thinking." },
    ],
    theme: "dungeon",
    featured: true,
  },
  {
    slug: "romanian-traditional-houses",
    title: "Romanian Traditional Houses",
    category: "education",
    status: "Out now",
    description:
      "Explore Romanian traditions and architecture while building your own traditional house in Minecraft.",
    about: [
      "An educational world that brings Romanian traditional architecture into Minecraft.",
      "Students explore a village inspired by real traditional houses, then design and build their own.",
    ],
    roles: ["Level Design", "Environment Art", "Educational Design"],
    features: [
      { title: "Explore a village", text: "Walk through houses inspired by Romanian traditions." },
      { title: "Learn by building", text: "Build your own traditional house step by step." },
      { title: "Classroom ready", text: "Made for Minecraft Education lessons." },
    ],
    theme: "village",
    featured: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
