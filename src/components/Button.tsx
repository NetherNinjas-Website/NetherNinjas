import Link from "next/link";

type Variant = "primary" | "light" | "dark" | "outline";

const styles: Record<Variant, string> = {
  primary: "bg-ninja-500 text-white hover:bg-ninja-600",
  light: "bg-surface text-fg hover:bg-tint",
  dark: "bg-ink text-white hover:bg-ninja-800 dark:bg-paper dark:text-ink dark:hover:bg-ninja-200",
  outline: "bg-transparent text-fg hover:bg-surface",
};

export const buttonClass = (variant: Variant = "primary", size: "md" | "lg" = "md") =>
  `group/btn relative inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-ink font-display font-bold uppercase tracking-wide shadow-pop-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pop active:translate-y-0.5 active:shadow-none ${
    size === "lg" ? "px-7 py-3.5 text-lg" : "px-5 py-2.5 text-base"
  } ${styles[variant]}`;

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block transition-transform duration-200 group-hover/btn:translate-x-1 ${className}`}
    >
      →
    </span>
  );
}

/** Purple sparkle that pops in when hovering a button */
export function HoverSparkle() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="pointer-events-none absolute -top-3 -right-2 h-6 w-6 scale-0 text-ninja-400 opacity-0 transition-all duration-300 group-hover/btn:scale-100 group-hover/btn:rotate-45 group-hover/btn:opacity-100"
    >
      <path
        d="M12 0c.6 5.6 2.9 9.4 12 12-9.1 2.6-11.4 6.4-12 12-.6-5.6-2.9-9.4-12-12C9.1 9.4 11.4 5.6 12 0z"
        fill="currentColor"
        stroke="#010109"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={`${buttonClass(variant, size)} ${className}`}>
      {children}
      {arrow && <Arrow />}
      <HoverSparkle />
    </Link>
  );
}
