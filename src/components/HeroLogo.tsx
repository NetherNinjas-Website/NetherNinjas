"use client";

import dynamic from "next/dynamic";

import { LogoImage } from "./Logo";

function LogoFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <LogoImage variant="mark" height={220} className="animate-float text-white" />
    </div>
  );
}

// three.js only runs in the browser; the flat logo shows while it loads
const LogoScene = dynamic(() => import("./LogoScene"), { ssr: false, loading: LogoFallback });

export function HeroLogo() {
  return (
    <div className="absolute inset-0 bg-ninja-500">
      <div className="bg-dots absolute inset-0 opacity-25" aria-hidden />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ninja-300/50 blur-3xl"
      />
      <div role="img" aria-label="Interactive 3D Nether Ninjas logo" className="absolute inset-0">
        <LogoScene />
      </div>
      <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border-[2.5px] border-ink bg-surface px-4 py-1.5 font-display text-sm font-bold whitespace-nowrap text-fg shadow-pop-sm">
        Drag to rotate · Click to spin!
      </p>
    </div>
  );
}
