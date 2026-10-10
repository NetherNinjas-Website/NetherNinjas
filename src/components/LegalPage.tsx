import { PageHero } from "./PageHero";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} />
      <section className="px-4 py-20 sm:px-6">
        <div className="prose-ninja mx-auto max-w-3xl">{children}</div>
      </section>
    </>
  );
}
