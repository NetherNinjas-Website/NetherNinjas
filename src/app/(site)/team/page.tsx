import type { Metadata } from "next";
import Image from "next/image";

import { Cube, Sparkle, Star } from "@/components/Decorations";
import { LogoImage } from "@/components/Logo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBanner } from "@/components/Sections";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the Nether Ninjas: the people building our Minecraft worlds.",
};

const avatarColors = ["bg-ninja-500", "bg-sun", "bg-mint", "bg-sky", "bg-coral", "bg-ninja-300", "bg-ninja-700"];
const decorations = [
  <Star key="s" className="absolute -top-4 -right-3 h-10 w-10 animate-float text-sun" />,
  <Cube key="c" className="absolute -top-5 -right-4 h-11 w-11 animate-float-slow" />,
  <Sparkle key="k" className="absolute -top-3 -right-2 h-8 w-8 animate-twinkle text-ninja-500" />,
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="Meet the ninjas"
        text="The builders, designers and developers behind every Nether Ninjas world."
      />
      <section className="bg-dots px-4 py-24 sm:px-6 sm:py-32">
        <ul className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.role} delay={(i % 3) * 100}>
              <li className="group relative flex h-full flex-col items-center rounded-[2.5rem] border-[3px] border-ink bg-surface p-8 text-center shadow-pop transition-all duration-300 hover:-translate-y-2 hover:shadow-pop-lg">
                {decorations[i % decorations.length]}
                <div
                  className={`relative grid h-40 w-40 place-items-center overflow-hidden rounded-full border-[3px] border-ink transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105 ${avatarColors[i % avatarColors.length]}`}
                >
                  {m.photo ? (
                    <Image src={m.photo} alt={m.name ?? m.role} fill sizes="160px" className="object-cover" />
                  ) : (
                    <LogoImage variant="mark" height={84} className="text-white" />
                  )}
                </div>
                <h2 className="mt-6 text-3xl font-bold">{m.name ?? "Name coming soon"}</h2>
                <p className="mt-2 inline-block rounded-full border-[2.5px] border-ink bg-tint-strong px-4 py-1 font-display font-bold tracking-wide uppercase">
                  {m.role}
                </p>
                <p className="mt-4 text-fg/70">{m.bio ?? "Bio coming soon."}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
      <CtaBanner />
    </>
  );
}
