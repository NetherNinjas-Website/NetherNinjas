/** A step number drawn on an isometric Minecraft block */
export function BlockNumber({ n, color = "#9751e1" }: { n: string; color?: string }) {
  return (
    <svg viewBox="0 0 96 104" className="h-24 w-24" aria-hidden>
      <g stroke="#010109" strokeWidth="3.5" strokeLinejoin="round">
        <path d="M48 4 92 26 48 48 4 26z" fill="#ffffff" />
        <path d="M4 26 48 48v52L4 78z" fill={color} />
        <path d="M92 26 48 48v52l44-22z" fill="#431eba" />
      </g>
      <g transform="matrix(1 0.5 0 1 0 0)">
        <text
          x="26"
          y="64"
          textAnchor="middle"
          fontFamily="var(--font-fredoka)"
          fontWeight="700"
          fontSize="26"
          fill="#ffffff"
          stroke="#010109"
          strokeWidth="1.2"
        >
          {n}
        </text>
      </g>
    </svg>
  );
}
