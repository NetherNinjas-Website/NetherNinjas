import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CategoryBadge } from "@/components/CategoryBadge";
import { Cube, Sparkle, Star } from "@/components/Decorations";
import {
  BookIcon,
  BrushIcon,
  CodeIcon,
  GamepadIcon,
  MapIcon,
  StarIcon,
} from "@/components/Icons";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectCover } from "@/components/ProjectCover";
import { Reveal } from "@/components/Reveal";
import { CtaBanner } from "@/components/Sections";
import { SectionHeading } from "@/components/SectionHeading";
import { WorldArt, type WorldTheme } from "@/components/WorldArt";
import { getProject, projects, type Project } from "@/data/projects";

const roleIcons: Record<Project["roles"][number], React.ReactNode> = {
  "Level Design": <MapIcon />,
  "Environment Art": <BrushIcon />,
  "Game Design": <GamepadIcon />,
  Development: <CodeIcon />,
  "Creative Direction": <StarIcon />,
  "Educational Design": <BookIcon />,
};

const featureColors = ["bg-ninja-500 text-white", "bg-sun text-ink", "bg-mint text-ink", "bg-sky text-ink", "bg-coral text-ink", "bg-surface"];
const galleryThemes: WorldTheme[] = ["adventure", "market", "classroom"];

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = [
    ...projects.filter((p) => p.slug !== project.slug && p.category === project.category),
    ...projects.filter((p) => p.slug !== project.slug && p.category !== project.category),
  ].slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b-[3px] border-ink bg-ink">
        <div className="relative h-[60vh] min-h-[420px] w-full">
          <ProjectCover project={project} priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
        </div>
        <Star className="absolute top-10 right-[8%] h-12 w-12 animate-float text-sun" />
        <Sparkle className="absolute top-24 left-[10%] h-8 w-8 animate-twinkle text-white" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-12 sm:px-6">
          <div className="mx-auto max-w-7xl text-white">
            <Link
              href="/projects"
              className="mb-6 inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-surface px-4 py-1.5 font-display font-bold text-fg shadow-pop-sm transition-transform hover:-translate-x-1"
            >
              ← All projects
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <CategoryBadge category={project.category} />
              <span className="rounded-full border-[2.5px] border-ink bg-surface px-3 py-1 font-display text-xs font-bold tracking-widest text-fg uppercase">
                {project.status}
              </span>
            </div>
            <h1 className="mt-4 text-5xl leading-[0.95] font-bold uppercase drop-shadow-[4px_4px_0_#010109] sm:text-7xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">{project.description}</p>
          </div>
        </div>
      </section>

      {/* About + roles */}
      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <SectionHeading align="left" eyebrow="The world" title="About the project" />
            <div className="mt-8 space-y-4 text-lg text-fg/80">
              {project.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-[2rem] border-[3px] border-ink bg-tint-strong p-7 shadow-pop">
              <h2 className="text-3xl font-bold uppercase">What we did</h2>
              <ul className="mt-6 flex flex-col gap-3">
                {project.roles.map((role) => (
                  <li
                    key={role}
                    className="flex items-center gap-4 rounded-2xl border-[3px] border-ink bg-surface px-4 py-3 font-display text-lg font-bold transition-transform hover:translate-x-1"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl border-[2.5px] border-ink bg-ninja-200">
                      {roleIcons[role]}
                    </span>
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="relative overflow-hidden border-y-[3px] border-ink bg-ninja-500 px-4 py-20 sm:px-6 sm:py-28">
        <div className="bg-dots absolute inset-0 opacity-15" aria-hidden />
        <Cube className="absolute top-12 right-[6%] h-14 w-14 animate-float" top="#ffffff" left="#c8bbea" right="#a38ddd" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading light eyebrow="Gameplay" title="Features" />
          </Reveal>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <li
                  className={`h-full rounded-[2rem] border-[3px] border-ink p-7 shadow-pop transition-transform duration-300 hover:-translate-y-2 hover:rotate-1 ${featureColors[i % featureColors.length]}`}
                >
                  <span className="font-display text-5xl font-bold opacity-40">0{i + 1}</span>
                  <h3 className="mt-2 text-2xl font-bold uppercase">{f.title}</h3>
                  <p className="mt-2 opacity-85">{f.text}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading eyebrow="Screenshots" title="Gallery" />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {project.gallery && project.gallery.length > 0
              ? project.gallery.map((src, i) => (
                  <Reveal key={src} delay={i * 80} className={i === 0 ? "sm:col-span-2" : ""}>
                    <div className="group relative aspect-video overflow-hidden rounded-[2rem] border-[3px] border-ink shadow-pop">
                      <Image
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Reveal>
                ))
              : [project.theme, ...galleryThemes].map((theme, i) => (
                  <Reveal key={theme + i} delay={i * 80} className={i === 0 ? "sm:col-span-2" : ""}>
                    <div className="group relative aspect-video overflow-hidden rounded-[2rem] border-[3px] border-ink shadow-pop">
                      <WorldArt
                        theme={theme}
                        className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Reveal>
                ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-tint px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading eyebrow="Keep exploring" title="Related projects" />
            </Reveal>
            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 100}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
