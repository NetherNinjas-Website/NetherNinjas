import { defineQuery } from "next-sanity";

const postCard = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  "author": author->{name, role, image},
  "categories": categories[]->{title, "slug": slug.current}
`;

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${postCard} }
`);

export const LATEST_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3] { ${postCard} }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] { ${postCard}, body }
`);
