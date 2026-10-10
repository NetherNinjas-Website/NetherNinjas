"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navLinks } from "@/data/site";
import { Arrow, HoverSparkle, buttonClass } from "./Button";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  // The menu is tied to the path it was opened on, so navigating closes it
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b-[3px] transition-colors duration-300 ${
        scrolled || open ? "border-ink bg-canvas/95 backdrop-blur" : "border-transparent bg-canvas"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Logo />

        <ul className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-block rounded-full border-[2.5px] px-4 py-2 font-display font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:-rotate-2 ${
                    active
                      ? "border-ink bg-tint-strong text-fg"
                      : "border-transparent text-fg/80 hover:border-ink hover:bg-tint hover:text-fg"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/contact" className={`${buttonClass("primary")} hidden sm:inline-flex`}>
            Let&apos;s create! <Arrow />
            <HoverSparkle />
          </Link>
          <button
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-12 w-12 place-items-center rounded-full border-[3px] border-ink bg-surface shadow-pop-sm transition-transform active:scale-95 xl:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 h-[3px] w-5 rounded-full bg-fg transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute top-1.5 left-0 h-[3px] w-5 rounded-full bg-fg transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 h-[3px] w-5 rounded-full bg-fg transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-20 bottom-0 overflow-y-auto border-t-[3px] border-ink bg-ninja-500 px-4 pt-6 pb-10 xl:hidden"
      >
        <ul className="mx-auto flex max-w-md flex-col gap-3">
          {navLinks.map((link, i) => (
            <li key={link.href} style={{ animationDelay: `${i * 40}ms` }}>
              <Link
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className="flex items-center justify-between rounded-2xl border-[3px] border-ink bg-surface px-5 py-4 font-display text-xl font-bold uppercase shadow-pop-sm transition-transform active:scale-[0.98] aria-[current=page]:bg-tint-strong"
              >
                {link.label}
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Link href="/contact" className={`${buttonClass("dark", "lg")} w-full`}>
              Let&apos;s create! <Arrow />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
