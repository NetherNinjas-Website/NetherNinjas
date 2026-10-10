import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms of Use" };

// TODO: replace with the official terms of use
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <p>Our terms of use are being written and will be published here soon.</p>
      <p>
        Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
      </p>
    </LegalPage>
  );
}
