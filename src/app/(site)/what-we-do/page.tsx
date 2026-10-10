import type { Metadata } from "next";

import { BookIcon, BrushIcon, CodeIcon, GamepadIcon, MapIcon, StarIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBanner, ProcessSection } from "@/components/Sections";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Level design, environment art, game design, development, educational design and creative direction for Minecraft.",
};

const services = [
  {
    title: "Level Design",
    text: "Designing spaces around player movement, exploration and gameplay.",
    icon: <MapIcon className="h-10 w-10" />,
    color: "bg-ninja-500",
  },
  {
    title: "Environment Art",
    text: "Creating colorful, detailed and memorable Minecraft environments.",
    icon: <BrushIcon className="h-10 w-10" />,
    color: "bg-sun",
  },
  {
    title: "Game Design",
    text: "Creating mechanics and gameplay experiences that are easy to understand and fun to play.",
    icon: <GamepadIcon className="h-10 w-10" />,
    color: "bg-mint",
  },
  {
    title: "Development",
    text: "Turning ideas into functional Minecraft experiences.",
    icon: <CodeIcon className="h-10 w-10" />,
    color: "bg-sky",
  },
  {
    title: "Educational Design",
    text: "Creating Minecraft experiences that combine gameplay and learning.",
    icon: <BookIcon className="h-10 w-10" />,
    color: "bg-coral",
  },
  {
    title: "Creative Direction",
    text: "Making sure the art, gameplay and experience work together.",
    icon: <StarIcon className="h-10 w-10" />,
    color: "bg-ninja-300",
  },
];

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="What can we build together?"
        text="From the first sketch to the final polish, we cover every step of making a Minecraft world."
      />
      <section className="bg-dots px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading eyebrow="Our services" title="Our creative toolbox" />
          </Reveal>
          <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 100}>
                <li className="group flex h-full flex-col rounded-[2rem] border-[3px] border-ink bg-surface p-8 shadow-pop transition-all duration-300 hover:-translate-y-2 hover:shadow-pop-lg">
                  <span
                    className={`grid h-20 w-20 place-items-center rounded-3xl border-[3px] border-ink transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 ${s.color}`}
                  >
                    {s.icon}
                  </span>
                  <h3 className="mt-6 text-3xl font-bold uppercase">{s.title}</h3>
                  <p className="mt-3 text-lg text-fg/75">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <ProcessSection />
      <CtaBanner />
    </>
  );
}
