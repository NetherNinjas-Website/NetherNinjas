import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  // Placeholder keeps createClient from throwing before the project is configured.
  projectId: projectId || "not-configured",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
