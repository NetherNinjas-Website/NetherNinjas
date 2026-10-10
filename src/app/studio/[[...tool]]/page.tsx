import { NextStudio } from "next-sanity/studio";

import { isSanityConfigured } from "@/sanity/env";
import config from "../../../../sanity.config";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ fontFamily: "system-ui", maxWidth: 560, margin: "15vh auto", padding: 24, lineHeight: 1.6 }}>
        <h1>Sanity is not configured yet</h1>
        <p>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code> in{" "}
          <code>.env.local</code> (and in your Vercel project settings), then reload this page. See README.md.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
