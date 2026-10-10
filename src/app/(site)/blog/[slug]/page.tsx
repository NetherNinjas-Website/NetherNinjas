import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Sparkle, Star } from "@/components/Decorations";
import { formatDate } from "@/components/PostCard";
import { WorldArt } from "@/components/WorldArt";
import { urlFor } from "@/sanity/lib/image";
import { fetchPublished } from "@/sanity/lib/live";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/queries";
import type { Post, SanityImage } from "@/sanity/types";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage & { caption?: string } }) => (
      <figure className="my-10">
        <div className="overflow-hidden rounded-[2rem] border-[3px] border-ink shadow-pop">
          <Image
            src={urlFor(value).width(1400).url()}
            alt={value.alt ?? ""}
            width={1400}
            height={800}
            sizes="(min-width: 768px) 768px, 100vw"
            className="h-auto w-full"
          />
        </div>
        {value.caption && <figcaption className="mt-3 text-center text-sm text-fg/60">{value.caption}</figcaption>}
      </figure>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = href.startsWith("http");
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  },
};

export async function generateStaticParams() {
  const slugs = await fetchPublished<{ slug: string }[]>(POST_SLUGS_QUERY, {}, []);
  // Cache Components needs at least one param to build the route shell
  return slugs.length > 0 ? slugs : [{ slug: "hello-world" }];
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await fetchPublished<Post | null>(POST_QUERY, { slug }, null);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.mainImage
      ? { images: [{ url: urlFor(post.mainImage).width(1200).height(630).fit("crop").url() }] }
      : undefined,
  };
}

async function Article({ params }: Pick<PageProps<"/blog/[slug]">, "params">) {
  const { slug } = await params;
  const post = await fetchPublished<Post | null>(POST_QUERY, { slug }, null);
  if (!post) notFound();

  return (
    <article>
      <header className="relative overflow-hidden border-b-[3px] border-ink bg-ninja-500 px-4 pt-14 pb-16 text-white sm:px-6 sm:pt-20">
        <div className="bg-dots absolute inset-0 opacity-15" aria-hidden />
        <Star className="absolute top-10 right-[8%] h-12 w-12 animate-float text-sun" />
        <Sparkle className="absolute bottom-10 left-[6%] h-8 w-8 animate-twinkle text-white" />
        <div className="relative mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-surface px-4 py-1.5 font-display font-bold text-fg shadow-pop-sm transition-transform hover:-translate-x-1"
          >
            ← All posts
          </Link>
          {post.categories && post.categories.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {post.categories.map((c) => (
                <li
                  key={c.slug}
                  className="rounded-full border-[2.5px] border-ink bg-sun px-3 py-1 font-display text-xs font-bold tracking-widest text-ink uppercase"
                >
                  {c.title}
                </li>
              ))}
            </ul>
          )}
          <h1 className="mt-5 text-4xl leading-[1.05] font-bold drop-shadow-[3px_3px_0_#010109] sm:text-6xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-ninja-50">
            {post.author && (
              <span className="flex items-center gap-3">
                {post.author.image && (
                  <Image
                    src={urlFor(post.author.image).width(96).height(96).fit("crop").url()}
                    alt=""
                    width={48}
                    height={48}
                    className="rounded-full border-[3px] border-ink"
                  />
                )}
                <span>
                  <strong className="text-white">{post.author.name}</strong>
                  {post.author.role && <span> · {post.author.role}</span>}
                </span>
              </span>
            )}
            {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
          </div>
        </div>
      </header>

      <div className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="relative -mt-28 mb-12 aspect-[16/9] overflow-hidden rounded-[2rem] border-[3px] border-ink bg-tint-strong shadow-pop-lg sm:-mt-32">
            {post.mainImage ? (
              <Image
                src={urlFor(post.mainImage).width(1600).height(900).fit("crop").url()}
                alt={post.mainImage.alt ?? ""}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            ) : (
              <WorldArt theme="adventure" className="absolute inset-0 h-full w-full" />
            )}
          </div>
          {post.body && (
            <div className="prose-ninja">
              <PortableText value={post.body} components={components} />
            </div>
          )}
          <div className="mt-16 border-t-[3px] border-dashed border-ink/20 pt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-ninja-500 px-6 py-3 font-display text-lg font-bold text-white uppercase shadow-pop-sm transition-transform hover:-translate-y-0.5"
            >
              ← Back to the blog
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function ArticleSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-80 border-b-[3px] border-ink bg-ninja-500" />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-16">
        <div className="h-6 rounded-full bg-tint-strong" />
        <div className="h-6 w-5/6 rounded-full bg-tint-strong" />
        <div className="h-6 w-4/6 rounded-full bg-tint-strong" />
      </div>
    </div>
  );
}

export default function PostPage(props: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <Article params={props.params} />
    </Suspense>
  );
}
