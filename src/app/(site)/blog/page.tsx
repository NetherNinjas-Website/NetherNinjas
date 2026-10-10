import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHero } from "@/components/PageHero";
import { EmptyBlog, PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";
import { fetchPublished } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/queries";
import type { PostCard as PostCardData } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Blog",
  description: "News, devlogs and stories from the Nether Ninjas team.",
};

async function Posts() {
  const posts = await fetchPublished<PostCardData[]>(POSTS_QUERY, {}, []);
  if (posts.length === 0) return <EmptyBlog />;
  return (
    <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <li key={post._id}>
          <Reveal delay={(i % 3) * 100}>
            <PostCard post={post} index={i} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

function PostsSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-96 animate-pulse rounded-[2rem] border-[3px] border-ink/20 bg-tint-strong" />
      ))}
    </div>
  );
}

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="Blog" title="News from the dojo" text="Devlogs, updates and stories from the Nether Ninjas team." />
      <section className="bg-dots px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Suspense fallback={<PostsSkeleton />}>
            <Posts />
          </Suspense>
        </div>
      </section>
    </>
  );
}
