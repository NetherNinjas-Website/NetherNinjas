import { defineLive } from "next-sanity/live";

import { isSanityConfigured } from "../env";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  strict: true,
  // Only published content is shown, so no API tokens are needed
  serverToken: false,
  browserToken: false,
});

/**
 * The single 'use cache' boundary for Sanity content. `sanityFetch` tags the
 * cache entry so <SanityLive /> can revalidate it as soon as content is published.
 */
export async function fetchPublished<T>(
  query: string,
  params: Record<string, string> = {},
  fallback: T,
): Promise<T> {
  "use cache";
  if (!isSanityConfigured) return fallback;
  const { data } = await sanityFetch({
    query,
    params,
    perspective: "published",
    stega: false,
  });
  return (data as T | null) ?? fallback;
}

