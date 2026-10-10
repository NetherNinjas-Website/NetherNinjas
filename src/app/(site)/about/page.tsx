import type { Metadata } from "next";

import { ButtonLink } from "@/components/Button";
import { Cube, Sparkle, Star } from "@/components/Decorations";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { AreasSection, CtaBanner, PhilosophySection, ProcessSection } from "@/components/Sections";
import { SectionHeading } from "@/components/SectionHeading";
import { WorldArt } from "@/components/WorldArt";

export const metadata: Metadata = {
  title: "About Us",
  description: "Nether Ninjas is a bunch of creators building fun, accessible and memorable worlds in Minecraft.",
};

const values = [
  { title: "Creative", text: "We build imaginative worlds.", color: "bg-ninja-500 text-white" },
  { title: "Playful", text: "Our projects are designed to be fun.", color: "bg-sun text-ink" },
  { title: "Curious", text: "We encourage players to explore and discover.", color: "bg-sky text-ink" },
  { title: "Friendly", text: "Our experiences should feel welcoming.", color: "bg-mint text-ink" },
  { title: "Professional", text: "Behind the playful worlds is a serious creative team.", color: "bg-ink text-white" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Meet Nether Ninjas"
        text="A bunch of creators building worlds in Minecraft."
      />

      {/* Who we are */}
      <section className="px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <SectionHeading align="left" eyebrow="Who we are" title="A studio that loves building worlds" />
            <div className="mt-8 space-y-4 text-lg text-fg/80">
              <p>
                Nether Ninjas is a Minecraft content studio creating experiences for players of all ages, with a
                particular focus on younger audiences.
              </p>
              <p>
                We create projects across three main areas: <strong>Minecraft Realms</strong>,{" "}
                <strong>Minecraft Marketplace</strong> and <strong>Minecraft Education</strong>.
              </p>
              <p>
                Our mission is to build imaginative Minecraft worlds that inspire, connect, and delight every player
                — worlds that encourage them to explore, play, learn and create.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150} className="relative">
            <div className="relative aspect-[5/4] rotate-2 overflow-hidden rounded-[2.5rem] border-[3px] border-ink shadow-pop-lg">
              <WorldArt theme="village" className="absolute inset-0 h-full w-full" />
            </div>
            <Star className="absolute -top-6 -left-4 h-14 w-14 animate-float text-sun" />
            <Cube className="absolute -right-4 -bottom-6 h-16 w-16 animate-float-slow" />
          </Reveal>
        </div>
      </section>

      <AreasSection />
      <PhilosophySection />

      {/* Values */}
      <section className="relative overflow-hidden bg-tint px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading eyebrow="Our values" title="What makes a ninja" />
          </Reveal>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <li
                  className={`flex h-full flex-col rounded-[2rem] border-[3px] border-ink p-6 shadow-pop transition-transform duration-300 hover:-translate-y-2 ${i % 2 ? "hover:rotate-2" : "hover:-rotate-2"} ${v.color}`}
                >
                  <Sparkle className="h-8 w-8 text-white" />
                  <h3 className="mt-4 text-2xl font-bold uppercase">{v.title}</h3>
                  <p className="mt-2 opacity-85">{v.text}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Game design approach + young players */}
      <section className="px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-[2.5rem] border-[3px] border-ink bg-surface p-8 shadow-pop sm:p-10">
              <h2 className="text-3xl font-bold uppercase sm:text-4xl">Our approach to game design</h2>
              <div className="mt-6 space-y-4 text-lg text-fg/80">
                <p>
                  Every project starts from the player. We design spaces around movement and exploration, keep
                  mechanics easy to understand and make sure there&apos;s always something waiting around the corner.
                </p>
                <p>
                  Level design, environment art, game design and development work together from day one, so the art,
                  the gameplay and the story all feel like one world.
                </p>
              </div>
            </article>
          </Reveal>
          <Reveal delay={120}>
            <article className="h-full rounded-[2.5rem] border-[3px] border-ink bg-ninja-500 p-8 text-white shadow-pop sm:p-10">
              <h2 className="text-3xl font-bold uppercase sm:text-4xl">Made for younger players</h2>
              <div className="mt-6 space-y-4 text-lg text-ninja-50">
                <p>
                  The players we build for are mostly kids and young gamers. That&apos;s why our worlds are colorful,
                  welcoming and simple to pick up — with clear goals and plenty of room to experiment.
                </p>
                <p>
                  Parents, educators and partners can count on experiences that are safe, thoughtful and crafted with
                  care.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
        <div className="mt-14 text-center">
          <ButtonLink href="/team" size="lg">
            Meet the team
          </ButtonLink>
        </div>
      </section>

      <ProcessSection />
      <CtaBanner />
    </>
  );
}
