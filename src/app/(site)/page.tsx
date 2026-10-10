import { ButtonLink } from "@/components/Button";
import { CloudShape, Cube, Sparkle, Squiggle, Star } from "@/components/Decorations";
import { HeroLogo } from "@/components/HeroLogo";
import { EmptyBlog, PostCard } from "@/components/PostCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { AreasSection, CtaBanner, PhilosophySection, ProcessSection } from "@/components/Sections";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";
import { WorldArt } from "@/components/WorldArt";
import { projects } from "@/data/projects";
import { fetchPublished } from "@/sanity/lib/live";
import { LATEST_POSTS_QUERY } from "@/sanity/queries";
import type { PostCard as PostCardData } from "@/sanity/types";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas px-4 pt-10 pb-24 sm:px-6 sm:pt-16 lg:pb-32">
      <div className="bg-dots absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <div className="relative z-10 text-center lg:text-left">
          <Eyebrow>Minecraft content studio</Eyebrow>
          <h1 className="mt-6 text-5xl leading-[0.95] font-bold uppercase sm:text-6xl xl:text-7xl">
            We build worlds to{" "}
            <span className="relative inline-block -rotate-2 rounded-2xl border-[3px] border-ink bg-ninja-500 px-3 text-white shadow-pop-sm">
              play
            </span>
            ,{" "}
            <span className="relative inline-block rotate-1 rounded-2xl border-[3px] border-ink bg-sun px-3 text-ink shadow-pop-sm">
              explore
            </span>{" "}
            &amp;{" "}
            <span className="relative inline-block -rotate-1 rounded-2xl border-[3px] border-ink bg-mint px-3 text-ink shadow-pop-sm">
              learn.
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg text-fg/75 sm:text-xl lg:mx-0">
            Nether Ninjas creates fun and memorable Minecraft experiences for{" "}
            <strong className="text-fg">Realms</strong>, <strong className="text-fg">Marketplace</strong> and{" "}
            <strong className="text-fg">Education</strong>.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
            <ButtonLink href="/projects" size="lg">
              Explore our projects
            </ButtonLink>
            <ButtonLink href="/team" variant="light" size="lg">
              Meet the ninjas
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl">
          <div className="relative aspect-[4/3] -rotate-1 overflow-hidden rounded-[2.5rem] border-[3px] border-ink shadow-pop-lg transition-transform duration-500 hover:rotate-0">
            <HeroLogo />
          </div>
          <CloudShape className="absolute -top-8 -left-10 w-32 animate-float-slow sm:w-40" />
          <CloudShape className="absolute -right-6 bottom-16 w-24 animate-float sm:w-28" style={{ animationDelay: "1.5s" }} />
          <Star className="absolute -top-6 right-10 h-14 w-14 animate-float text-sun" />
          <Cube className="absolute -bottom-8 -left-6 h-20 w-20 animate-float" style={{ animationDelay: "0.8s" }} />
          <Cube
            className="absolute -right-8 top-1/3 h-12 w-12 animate-float-slow"
            top="#ffffff"
            left="#c8bbea"
            right="#a38ddd"
          />
          <Sparkle className="absolute top-10 left-1/3 h-8 w-8 animate-twinkle text-white" />
          <Sparkle
            className="absolute right-1/4 bottom-10 h-6 w-6 animate-twinkle text-sun"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const words = ["Build", "Play", "Explore", "Learn", "Create"];
  const row = [...words, ...words, ...words];
  return (
    <div className="overflow-hidden border-y-[3px] border-ink bg-ink py-4 text-white" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 font-display text-2xl font-bold tracking-widest uppercase">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w}
            <Sparkle className="h-5 w-5 text-ninja-400" />
          </span>
        ))}
      </div>
    </div>
  );
}

function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  return (
    <section className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Featured worlds"
            title="What are we building?"
            text="Take a look at some of the worlds and experiences we've been creating."
          />
        </Reveal>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 120}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-14 text-center">
          <ButtonLink href="/projects" variant="dark" size="lg">
            View all projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function AboutTeaser() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="About us"
            title={
              <>
                Who are the{" "}
                <span className="relative inline-block text-ninja-500">
                  ninjas?
                  <Squiggle className="absolute -bottom-5 left-0 w-full text-sun" />
                </span>
              </>
            }
          />
          <div className="mt-8 space-y-4 text-lg text-fg/75">
            <p>
              Nether Ninjas is a Minecraft-focused creative studio made up of people who love building worlds,
              designing gameplay and creating experiences that players remember.
            </p>
            <p>
              From playful adventures to educational experiences, we combine level design, environment art, game
              design and development to create worlds with a purpose.
            </p>
          </div>
          <div className="mt-10">
            <ButtonLink href="/team" size="lg">
              Meet the team
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={150} className="relative">
          <div className="grid grid-cols-2 gap-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-[3px] border-ink shadow-pop rotate-[-3deg]">
              <WorldArt theme="village" className="absolute inset-0 h-full w-full" />
            </div>
            <div className="relative mt-12 aspect-[4/5] overflow-hidden rounded-[2rem] border-[3px] border-ink shadow-pop rotate-[3deg]">
              <WorldArt theme="dungeon" className="absolute inset-0 h-full w-full" />
            </div>
          </div>
          <Star className="absolute -top-4 right-1/3 h-12 w-12 animate-float text-sun" />
          <Cube className="absolute -bottom-6 left-1/4 h-14 w-14 animate-float-slow" />
        </Reveal>
      </div>
    </section>
  );
}

async function LatestPosts() {
  const posts = await fetchPublished<PostCardData[]>(LATEST_POSTS_QUERY, {}, []);
  return (
    <section className="relative bg-tint px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow="From the blog" title="News from the dojo" text="Devlogs, updates and stories from the team." />
        </Reveal>
        <div className="mt-16">
          {posts.length === 0 ? (
            <EmptyBlog />
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post._id} delay={i * 120}>
                  <PostCard post={post} index={i} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
        <div className="mt-14 text-center">
          <ButtonLink href="/blog" variant="dark" size="lg">
            Read the blog
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <FeaturedProjects />
      <AreasSection />
      <AboutTeaser />
      <PhilosophySection />
      <ProcessSection />
      <LatestPosts />
      <CtaBanner />
    </>
  );
}
