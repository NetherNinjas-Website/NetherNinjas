import Link from "next/link";

const variants = {
  horizontal: { src: "/brand/logo-horizontal.png", ratio: 896 / 363 },
  stacked: { src: "/brand/logo-stacked.png", ratio: 632 / 1020 },
  mark: { src: "/brand/mark.png", ratio: 1055 / 966 },
};

/** Brand logo, recolored with `currentColor` (set it with a text-* class). */
export function LogoImage({
  variant = "horizontal",
  height = 44,
  className = "",
}: {
  variant?: keyof typeof variants;
  height?: number;
  className?: string;
}) {
  const v = variants[variant];
  return (
    <span
      role="img"
      aria-label="Nether Ninjas"
      className={`logo-mask inline-block shrink-0 ${className}`}
      style={{
        height,
        width: height * v.ratio,
        maskImage: `url(${v.src})`,
        WebkitMaskImage: `url(${v.src})`,
      }}
    />
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center transition-transform hover:-rotate-2 ${className}`}
    >
      <LogoImage height={46} className="text-fg" />
    </Link>
  );
}
