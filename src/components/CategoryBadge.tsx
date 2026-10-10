import { categories, type Category } from "@/data/projects";

export function CategoryBadge({ category, className = "" }: { category: Category; className?: string }) {
  const c = categories[category];
  return (
    <span
      className={`inline-block rounded-full border-[2.5px] border-ink px-3 py-1 font-display text-xs font-bold tracking-widest uppercase ${c.color} ${c.text} ${className}`}
    >
      {c.label}
    </span>
  );
}
