import { ButtonLink } from "@/components/Button";
import { Cube, Star } from "@/components/Decorations";
import { WorldArt } from "@/components/WorldArt";

export default function NotFound() {
  return (
    <section className="relative px-4 py-24 text-center sm:px-6">
      <div className="relative mx-auto max-w-2xl">
        <div className="relative mx-auto aspect-[16/9] max-w-lg overflow-hidden rounded-[2rem] border-[3px] border-ink shadow-pop-lg">
          <WorldArt theme="dungeon" className="absolute inset-0 h-full w-full" />
        </div>
        <Star className="absolute -top-6 left-6 h-12 w-12 animate-float text-sun" />
        <Cube className="absolute top-1/3 right-0 h-14 w-14 animate-float-slow" />
        <h1 className="mt-12 text-5xl font-bold uppercase sm:text-6xl">Lost in the Nether?</h1>
        <p className="mt-4 text-lg text-fg/70">This page doesn&apos;t exist (yet). Let&apos;s get you back home.</p>
        <div className="mt-8">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
