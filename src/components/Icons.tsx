type P = { className?: string };
const base = {
  fill: "none",
  stroke: "#010109",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function GamepadIcon({ className = "h-9 w-9" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className} {...base}>
      <path d="M9 10h14a6 6 0 0 1 6 6v2a5 5 0 0 1-9 3l-1-1h-6l-1 1a5 5 0 0 1-9-3v-2a6 6 0 0 1 6-6z" fill="#fff" />
      <path d="M10 14v5M7.5 16.5h5" />
      <circle cx="21" cy="15" r="1.2" fill="#010109" />
      <circle cx="24" cy="18" r="1.2" fill="#010109" />
    </svg>
  );
}

export function CompassIcon({ className = "h-9 w-9" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className} {...base}>
      <circle cx="16" cy="16" r="12" fill="#fff" />
      <path d="m20.5 11.5-3 6-6 3 3-6z" fill="#9751e1" />
    </svg>
  );
}

export function BookIcon({ className = "h-9 w-9" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className} {...base}>
      <path d="M4 7c4-1.5 8-1.5 12 1 4-2.5 8-2.5 12-1v18c-4-1.5-8-1.5-12 1-4-2.5-8-2.5-12-1z" fill="#fff" />
      <path d="M16 8v18" />
    </svg>
  );
}

export function PickaxeIcon({ className = "h-9 w-9" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className} {...base}>
      <path d="M6 9c6-5 14-5 20 2-5-2-9-2-12 0z" fill="#fff" />
      <path d="m15 11-10 15" strokeWidth="3.5" />
    </svg>
  );
}

export function BrushIcon({ className = "h-9 w-9" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className} {...base}>
      <path d="M26 4 14 18l3 3L28 7z" fill="#fff" />
      <path d="M13 19c-4 0-6 3-6 6 0 1-1 2-3 2 6 2 11 0 12-5z" fill="#9751e1" />
    </svg>
  );
}

export function CodeIcon({ className = "h-9 w-9" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className} {...base}>
      <rect x="3" y="6" width="26" height="20" rx="4" fill="#fff" />
      <path d="m12 12-4 4 4 4M20 12l4 4-4 4M17.5 11l-3 10" />
    </svg>
  );
}

export function MapIcon({ className = "h-9 w-9" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className} {...base}>
      <path d="m4 8 8-3 8 3 8-3v19l-8 3-8-3-8 3z" fill="#fff" />
      <path d="M12 5v19M20 8v19" />
    </svg>
  );
}

export function StarIcon({ className = "h-9 w-9" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className} {...base}>
      <path d="m16 3 3.8 8.3 9 1.1-6.7 6.2 1.8 9L16 23l-7.9 4.6 1.8-9-6.7-6.2 9-1.1z" fill="#fff" />
    </svg>
  );
}

export function MailIcon({ className = "h-9 w-9" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className} {...base}>
      <rect x="3" y="7" width="26" height="18" rx="4" fill="#fff" />
      <path d="m4 9 12 9 12-9" />
    </svg>
  );
}

export function HandshakeIcon({ className = "h-9 w-9" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className} {...base}>
      <path d="M3 12l6-4 7 3 7-3 6 4v6l-9 8-4-3-4 3-9-8z" fill="#fff" />
      <path d="m12 14 4-2 5 4M13 22l3-3" />
    </svg>
  );
}

export function ChatIcon({ className = "h-9 w-9" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className} {...base}>
      <path d="M5 6h22a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H14l-6 5v-5H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" fill="#fff" />
      <path d="M9 12h14M9 16h9" />
    </svg>
  );
}
