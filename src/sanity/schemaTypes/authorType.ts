import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", type: "string", description: "e.g. Level Designer" }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
});
