import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

export type SanityImage = SanityImageSource & { alt?: string };

export interface PostCard {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  mainImage?: SanityImage;
  author?: { name: string; role?: string; image?: SanityImage };
  categories?: { title: string; slug: string }[];
}

export interface Post extends PostCard {
  body?: PortableTextBlock[];
}
