import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy" };

// TODO: replace with the official privacy policy text
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>Our privacy policy is being written and will be published here soon.</p>
      <p>
        If you send us a message through the contact form, we only use your details to reply to you.
      </p>
    </LegalPage>
  );
}
