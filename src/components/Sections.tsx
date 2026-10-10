import { BlockNumber } from "./BlockNumber";
import { BookIcon, CompassIcon, GamepadIcon } from "./Icons";
import { ButtonLink } from "./Button";
import { ArrowDoodle, Cube, Sparkle, Squiggle, Star } from "./Decorations";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { WorldArt, type WorldTheme } from "./WorldArt";

const areas: {
  title: string;
  text: string;
  cta: string;
  href: string;
  theme: WorldTheme;
  bg: string;
  tilt: string;
}[] = [
  {
    title: "Realms",
    text: "Fun, replayable Minecraft experiences designed for players to explore, compete and play together.",
    cta: "Explore Realms",
    href: "/projects?category=realms",
    theme: "adventure",
    bg: "bg-ninja-500 text-white",
    tilt: "lg:-rotate-2",
  },
  {
    title: "Marketplace",
    text: "Creative maps, adventures and content designed to bring new experiences into Minecraft.",
    cta: "Explore Marketplace",
    href: "/projects?category=marketplace",
    theme: "market",
    bg: "bg-surface text-fg",
    tilt: "lg:translate-y-6",
  },
  {
    title: "Education",
    text: "Interactive Minecraft experiences designed to make learning more engaging, creative and memorable.",
    cta: "Discover Education",
    href: "/projects?category=education",
    theme: "classroom",
    bg: "bg-ink text-white",
    tilt: "lg:rotate-2",
  },
];

export function AreasSection() {
  return (
    <section className="relative overflow-hidden bg-tint-strong px-4 py-24 sm:px-6 sm:py-32">
      <div className="bg-dots absolute inset-0 opacity-70" aria-hidden />
      <Cube className="absolute top-16 left-[6%] h-12 w-12 animate-float" />
      <Star className="absolute top-24 right-[8%] h-10 w-10 animate-float-slow text-sun" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Realms · Marketplace · Education"
            title="What we create"
            text="Three worlds, one goal: Minecraft experiences that players remember."
          />
        </Reveal>
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {areas.map((a, i) => (
            <Reveal key={a.title} delay={i * 120}>
              <article
                className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border-[3px] border-ink shadow-pop transition-all duration-300 hover:rotate-0 hover:-translate-y-2 hover:shadow-pop-lg ${a.bg} ${a.tilt}`}
              >
                <div className="relative m-4 aspect-[16/10] overflow-hidden rounded-[1.4rem] border-[3px] border-ink">
                  <WorldArt
                    theme={a.theme}
                    className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col px-7 pt-2 pb-8">
                  <h3 className="text-4xl font-bold uppercase">{a.title}</h3>
                  <p className="mt-3 flex-1 text-lg opacity-85">{a.text}</p>
                  <div className="mt-6">
                    <ButtonLink href={a.href} variant={a.bg.includes("bg-surface") ? "primary" : "light"}>
                      {a.cta}
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const principles = [
  {
    title: "Play",
    tagline: "Games should be fun first.",
    text: "We design experiences that encourage players to interact, explore and play together.",
    icon: <GamepadIcon />,
    color: "bg-sun",
  },
  {
    title: "Explore",
    tagline: "There should always be something around the corner.",
    text: "We use level design and environmental storytelling to make exploration rewarding.",
    icon: <CompassIcon />,
    color: "bg-sky",
  },
  {
    title: "Learn",
    tagline: "Learning can be an adventure.",
    text: "Our Education projects turn Minecraft into an interactive environment where players can learn through doing.",
    icon: <BookIcon />,
    color: "bg-mint",
  },
];

export function PhilosophySection() {
  return (
    <section className="relative overflow-hidden bg-canvas px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="relative">
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border-[3px] border-ink shadow-pop-lg">
            <WorldArt theme="hero" className="absolute inset-0 h-full w-full" />
          </div>
          <Star className="absolute -top-6 -left-4 h-14 w-14 animate-float text-sun" />
          <Cube className="absolute -right-5 -bottom-6 h-20 w-20 animate-float-slow" />
          <Sparkle className="absolute top-10 right-8 h-8 w-8 animate-twinkle text-white" />
        </Reveal>
        <div>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Our philosophy"
              title={
                <>
                  We believe every world should have a{" "}
                  <span className="relative inline-block text-ninja-500">
                    story.
                    <Squiggle className="absolute -bottom-5 left-0 w-full text-sun" />
                  </span>
                </>
              }
            />
          </Reveal>
          <ul className="mt-12 flex flex-col gap-5">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <li className="flex gap-5 rounded-3xl border-[3px] border-ink bg-surface p-5 shadow-pop-sm transition-transform duration-300 hover:-translate-y-1 hover:-rotate-1">
                  <span
                    aria-hidden
                    className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl border-[3px] border-ink ${p.color}`}
                  >
                    {p.icon}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold uppercase">{p.title}</h3>
                    <p className="font-semibold text-accent">{p.tagline}</p>
                    <p className="mt-1 text-fg/75">{p.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n: "01", title: "Idea", text: "Everything starts with a simple idea.", color: "#9751e1" },
  { n: "02", title: "Design", text: "We turn the idea into gameplay, environments and experiences.", color: "#a38ddd" },
  { n: "03", title: "Build", text: "Our team brings the world to life inside Minecraft.", color: "#7b3fd0" },
  { n: "04", title: "Play", text: "We test, improve and polish the experience until it is ready for players.", color: "#9751e1" },
];

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden border-y-[3px] border-ink bg-ninja-500 px-4 py-24 text-white sm:px-6 sm:py-32">
      <div className="bg-dots absolute inset-0 opacity-15" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading light eyebrow="Our process" title="From idea to world" />
        </Reveal>
        <ol className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <li className="relative flex h-full flex-col items-center rounded-[2rem] border-[3px] border-ink bg-surface p-7 text-center text-fg shadow-pop transition-transform duration-300 hover:-translate-y-2">
                <div className="-mt-16 animate-float" style={{ animationDelay: `${i * 0.6}s` }}>
                  <BlockNumber n={s.n} color={s.color} />
                </div>
                <h3 className="mt-4 text-3xl font-bold uppercase">{s.title}</h3>
                <p className="mt-2 text-fg/75">{s.text}</p>
                {i < steps.length - 1 && (
                  <ArrowDoodle className="absolute top-1/2 -right-9 hidden h-10 w-14 text-white lg:block" />
                )}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border-[3px] border-ink bg-ink px-6 py-16 text-center text-white shadow-pop-lg sm:px-12 sm:py-20">
          <WorldArt theme="adventure" className="absolute inset-0 h-full w-full opacity-35" />
          <Star className="absolute top-8 left-8 h-10 w-10 animate-float text-sun" />
          <Sparkle className="absolute right-10 bottom-10 h-8 w-8 animate-twinkle text-ninja-300" />
          <div className="relative">
            <h2 className="text-4xl leading-[1.05] font-bold uppercase drop-shadow-[4px_4px_0_#010109] sm:text-6xl">
              Have a world in mind?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-ninja-50">
              Realms, Marketplace, Education or something totally new: let&apos;s build it together.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact" size="lg">
                Let&apos;s create!
              </ButtonLink>
              <ButtonLink href="/projects" variant="light" size="lg">
                See our worlds
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
