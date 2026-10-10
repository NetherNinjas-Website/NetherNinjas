import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SanityLive } from "@/sanity/lib/live";
import { isSanityConfigured } from "@/sanity/env";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-ink px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      {isSanityConfigured && <SanityLive includeDrafts={false} />}
    </div>
  );
}
