import { Sparkle } from "./Decorations";

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-surface px-4 py-1.5 font-display text-sm font-bold tracking-widest text-fg uppercase shadow-pop-sm ${className}`}
    >
      <Sparkle className="h-4 w-4 text-ninja-500" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <h2
        className={`text-4xl leading-[1.05] font-bold uppercase sm:text-5xl lg:text-6xl ${light ? "text-white" : "text-fg"}`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-5 text-lg sm:text-xl ${light ? "text-ninja-100" : "text-fg/75"}`}>{text}</p>
      )}
    </div>
  );
}
