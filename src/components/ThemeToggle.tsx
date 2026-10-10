"use client";

import { useEffect, useSyncExternalStore } from "react";

import { THEME_STORAGE_KEY as STORAGE_KEY } from "@/lib/theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const isDark = () => document.documentElement.classList.contains("dark");

function setTheme(dark: boolean, persist: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  if (!persist) return;
  try {
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  } catch {
    // Storage can be unavailable (private mode); the toggle still works for this visit
  }
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  // Follow the system theme until the visitor picks one
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(STORAGE_KEY);
      } catch {}
      if (!saved) setTheme(e.matches, false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setTheme(!dark, true)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className="group relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full border-[3px] border-ink bg-surface shadow-pop-sm transition-transform hover:-translate-y-0.5 hover:-rotate-12 active:scale-95"
    >
      {/* Sun */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={`absolute h-6 w-6 transition-all duration-500 ${dark ? "translate-y-8 rotate-90 opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <circle cx="12" cy="12" r="5" fill="#ffd23f" stroke="#010109" strokeWidth="2" />
        <g stroke="#010109" strokeWidth="2" strokeLinecap="round">
          <path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
        </g>
      </svg>
      {/* Moon */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={`absolute h-6 w-6 transition-all duration-500 ${dark ? "translate-y-0 opacity-100" : "-translate-y-8 -rotate-90 opacity-0"}`}
      >
        <path
          d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"
          fill="#c8bbea"
          stroke="#010109"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
