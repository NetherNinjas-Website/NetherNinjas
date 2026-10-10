import Link from "next/link";

import { navLinks, socials } from "@/data/site";
import { ButtonLink } from "./Button";
import { Cube, Sparkle, Star } from "./Decorations";
import { LogoImage } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-[3px] border-ink bg-ninja-500 text-white">
      <div className="bg-dots absolute inset-0 opacity-10" aria-hidden />
      <Star className="absolute top-12 right-[6%] h-12 w-12 animate-float text-sun" />
      <Cube className="absolute bottom-24 left-[4%] hidden h-14 w-14 animate-float-slow md:block" top="#ffffff" left="#c8bbea" right="#a38ddd" />
      <Sparkle className="absolute top-1/2 right-[30%] h-6 w-6 animate-twinkle text-white" />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <LogoImage variant="horizontal" height={88} className="text-white" />
            <p className="mt-6 font-display text-3xl font-bold tracking-wide uppercase drop-shadow-[3px_3px_0_#010109] sm:text-4xl">
              Build. Play. Explore.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact" variant="light" size="lg">
                Let&apos;s create!
              </ButtonLink>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-lg font-bold tracking-widest text-ninja-100 uppercase">
              Explore
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-lg font-semibold hover:text-sun"
                  >
                    {link.label}
                    <span aria-hidden className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-lg font-bold tracking-widest text-ninja-100 uppercase">
              Follow the ninjas
            </h2>
            {socials.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full border-[3px] border-ink bg-surface px-4 py-2 font-display font-bold text-fg shadow-pop-sm transition-transform hover:-translate-y-0.5 hover:-rotate-2"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-ninja-50">Our official channels are coming soon!</p>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t-2 border-white/30 pt-8 text-sm text-ninja-50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Nether Ninjas. All rights reserved.</p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-white hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white hover:underline">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
        <p className="mt-6 text-xs text-ninja-100/80">
          Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
        </p>
      </div>
    </footer>
  );
}
