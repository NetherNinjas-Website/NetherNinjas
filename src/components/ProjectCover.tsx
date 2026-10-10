import Image from "next/image";

import type { Project } from "@/data/projects";
import { WorldArt } from "./WorldArt";

/** Real screenshot when the project has one, otherwise the blocky illustration */
export function ProjectCover({
  project,
  className = "",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <WorldArt
      theme={project.theme}
      label={`${project.title} illustration`}
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
