import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHero } from "@/components/PageHero";
import { ProjectsBrowser, ProjectsGrid } from "@/components/ProjectsBrowser";
import { CtaBanner } from "@/components/Sections";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore the Minecraft experiences we've created for Realms, Marketplace and Education.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="Projects" title="Our worlds" text="Explore the Minecraft experiences we've created." />
      <section className="bg-dots px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* The filter reads ?category= from the URL, which is only known at request time */}
          <Suspense fallback={<ProjectsGrid projects={projects} />}>
            <ProjectsBrowser projects={projects} />
          </Suspense>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
