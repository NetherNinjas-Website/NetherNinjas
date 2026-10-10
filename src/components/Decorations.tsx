/** Small cartoon decorations that float around sections. All decorative. */

type DecoProps = { className?: string; style?: React.CSSProperties };

export function Star({ className = "", style }: DecoProps) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={className} style={style}>
      <path
        d="M20 2l5.2 11.3L37.6 15l-9.2 8.5 2.4 12.3L20 29.6 9.2 35.8l2.4-12.3L2.4 15l12.4-1.7z"
        fill="currentColor"
        stroke="#010109"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ className = "", style }: DecoProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} style={style}>
      <path
        d="M12 1c.6 5.2 2.8 8.5 11 11-8.2 2.5-10.4 5.8-11 11-.6-5.2-2.8-8.5-11-11C9.2 9.5 11.4 6.2 12 1z"
        fill="currentColor"
        stroke="#010109"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Isometric Minecraft-style cube */
export function Cube({
  className = "",
  style,
  top = "#c8bbea",
  left = "#9751e1",
  right = "#7b3fd0",
}: DecoProps & { top?: string; left?: string; right?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 48 52" className={className} style={style}>
      <g stroke="#010109" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M24 3 45 14 24 25 3 14z" fill={top} />
        <path d="M3 14 24 25v24L3 38z" fill={left} />
        <path d="M45 14 24 25v24l21-11z" fill={right} />
      </g>
    </svg>
  );
}

export function CloudShape({ className = "", style }: DecoProps) {
  return (
    <svg aria-hidden viewBox="0 0 100 50" className={className} style={style}>
      <path
        d="M22 46h58a16 16 0 0 0 2-31.9A22 22 0 0 0 40 10a15 15 0 0 0-19 13A12 12 0 0 0 22 46z"
        fill="#fff"
        stroke="#010109"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Squiggle({ className = "", style }: DecoProps) {
  return (
    <svg aria-hidden viewBox="0 0 120 24" className={className} style={style} fill="none">
      <path
        d="M3 12c10-12 18-12 28 0s18 12 28 0 18-12 28 0 18 12 28 0"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowDoodle({ className = "", style }: DecoProps) {
  return (
    <svg aria-hidden viewBox="0 0 80 60" className={className} style={style} fill="none">
      <path
        d="M6 50C20 20 45 10 70 14m0 0-12-8m12 8-9 11"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
