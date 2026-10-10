import { Cube, Sparkle, Star } from "./Decorations";
import { Eyebrow } from "./SectionHeading";

/** Colorful header used at the top of inner pages */
export function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-ink bg-ninja-500 px-4 pt-16 pb-20 text-center text-white sm:pt-24 sm:pb-28">
      <div className="bg-dots absolute inset-0 opacity-15" aria-hidden />
      <Star className="absolute top-10 left-[8%] h-10 w-10 animate-float text-sun" />
      <Cube className="absolute right-[7%] bottom-10 h-14 w-14 animate-float-slow" />
      <Sparkle className="absolute top-16 right-[18%] h-7 w-7 animate-twinkle text-white" />
      <Cube
        className="absolute bottom-8 left-[14%] hidden h-10 w-10 animate-float sm:block"
        top="#ffffff"
        left="#c8bbea"
        right="#a38ddd"
      />
      <div className="relative mx-auto max-w-4xl">
        {eyebrow && <Eyebrow className="mb-6">{eyebrow}</Eyebrow>}
        <h1 className="text-5xl leading-[1] font-bold uppercase drop-shadow-[4px_4px_0_#010109] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {text && <p className="mx-auto mt-6 max-w-2xl text-lg text-ninja-50 sm:text-xl">{text}</p>}
        {children}
      </div>
    </section>
  );
}
