import Link from "next/link";

import type { Project } from "@/data/projects";
import { CategoryBadge } from "./CategoryBadge";
import { Sparkle } from "./Decorations";
import { ProjectCover } from "./ProjectCover";

export function ProjectCard({ project, showStatus = false }: { project: Project; showStatus?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border-[3px] border-ink bg-surface shadow-pop transition-all duration-300 hover:-translate-y-2 hover:shadow-pop-lg"
    >
      <div className="relative aspect-[16/11] overflow-hidden border-b-[3px] border-ink bg-tint-strong">
        <ProjectCover
          project={project}
          className="transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <CategoryBadge category={project.category} />
          {showStatus && (
            <span className="rounded-full border-[2.5px] border-ink bg-surface px-3 py-1 font-display text-xs font-bold tracking-widest uppercase">
              {project.status}
            </span>
          )}
        </div>
        {/* tiny particles on hover */}
        <Sparkle className="absolute top-6 right-8 h-5 w-5 scale-0 text-white transition-transform delay-75 duration-300 group-hover:scale-100" />
        <Sparkle className="absolute top-14 right-16 h-3 w-3 scale-0 text-sun transition-transform delay-150 duration-300 group-hover:scale-100" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-2xl leading-tight font-bold uppercase sm:text-3xl">{project.title}</h3>
        <p className="flex-1 text-fg/75">{project.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="font-display font-bold tracking-wide text-accent uppercase">
            View project
          </span>
          <span
            aria-hidden
            className="grid h-12 w-12 place-items-center rounded-full border-[3px] border-ink bg-ninja-500 text-xl font-bold text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-12"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
