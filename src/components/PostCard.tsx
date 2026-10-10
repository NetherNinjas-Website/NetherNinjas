import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { PostCard as PostCardData } from "@/sanity/types";
import { WorldArt, type WorldTheme } from "./WorldArt";

const fallbackThemes: WorldTheme[] = ["adventure", "market", "classroom", "tropical", "village"];

export function formatDate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function PostCard({ post, index = 0 }: { post: PostCardData; index?: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-[3px] border-ink bg-surface shadow-pop transition-all duration-300 hover:-translate-y-2 hover:shadow-pop-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b-[3px] border-ink bg-tint-strong">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(900).height(560).fit("crop").url()}
            alt={post.mainImage.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <WorldArt
            theme={fallbackThemes[index % fallbackThemes.length]}
            className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-110"
          />
        )}
        {post.categories?.[0] && (
          <span className="absolute top-4 left-4 rounded-full border-[2.5px] border-ink bg-surface px-3 py-1 font-display text-xs font-bold tracking-widest uppercase">
            {post.categories[0].title}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <time dateTime={post.publishedAt} className="text-sm font-semibold text-accent">
          {formatDate(post.publishedAt)}
        </time>
        <h3 className="text-2xl leading-tight font-bold">{post.title}</h3>
        {post.excerpt && <p className="line-clamp-3 flex-1 text-fg/75">{post.excerpt}</p>}
        <span className="mt-auto inline-flex items-center gap-2 pt-2 font-display font-bold tracking-wide text-accent uppercase">
          Read more
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export function EmptyBlog() {
  return (
    <div className="mx-auto max-w-xl rounded-[2rem] border-[3px] border-dashed border-ink bg-surface p-10 text-center">
      <p className="font-display text-2xl font-bold uppercase">No posts yet!</p>
      <p className="mt-2 text-fg/70">The ninjas are busy building. News and devlogs are coming soon.</p>
    </div>
  );
}
