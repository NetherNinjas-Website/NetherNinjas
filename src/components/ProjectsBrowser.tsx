"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { categories, type Category, type Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

type Filter = "all" | Category;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  ...(Object.keys(categories) as Category[]).map((c) => ({ value: c, label: categories[c].label })),
];

function isFilter(value: string | null): value is Filter {
  return value !== null && filters.some((f) => f.value === value);
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-[2rem] border-[3px] border-dashed border-ink bg-surface p-10 text-center">
        <p className="font-display text-2xl font-bold uppercase">New worlds coming soon!</p>
        <p className="mt-2 text-fg/70">We&apos;re building something in this category. Check back soon.</p>
      </div>
    );
  }
  return (
    <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <li key={p.slug}>
          <ProjectCard project={p} showStatus />
        </li>
      ))}
    </ul>
  );
}

export function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const param = useSearchParams().get("category");
  const active: Filter = isFilter(param) ? param : "all";
  const visible = active === "all" ? projects : projects.filter((p) => p.category === active);

  function select(value: Filter) {
    const url = value === "all" ? pathname : `${pathname}?category=${value}`;
    router.replace(url, { scroll: false });
  }

  return (
    <>
      <div role="group" aria-label="Filter projects by category" className="mb-12 flex flex-wrap justify-center gap-3">
        {filters.map((f) => {
          const isActive = f.value === active;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => select(f.value)}
              className={`rounded-full border-[3px] border-ink px-6 py-2.5 font-display text-lg font-bold tracking-wide uppercase transition-all duration-200 hover:-translate-y-0.5 ${
                isActive ? "bg-ninja-500 text-white shadow-pop-sm" : "bg-surface text-fg hover:bg-tint"
              }`}
            >
              {f.label}
              <span className="ml-2 text-sm opacity-70">
                {f.value === "all" ? projects.length : projects.filter((p) => p.category === f.value).length}
              </span>
            </button>
          );
        })}
      </div>
      <ProjectsGrid projects={visible} />
    </>
  );
}
