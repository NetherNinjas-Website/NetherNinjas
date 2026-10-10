/**
 * Blocky Minecraft-style illustrations drawn in SVG. They stand in for real
 * screenshots until those are available (see `image` in src/data/projects.ts).
 */

export type WorldTheme =
  | "tropical"
  | "dungeon"
  | "village"
  | "adventure"
  | "market"
  | "classroom"
  | "hero";

type Sprite = { rows: string[]; colors: Record<string, string> };
type Placed = { sprite: Sprite; col: number; px?: number; lift?: number; className?: string };

interface Scene {
  sky: string[];
  sun?: { x: number; y: number; color: string; glow: string };
  stars?: boolean;
  clouds?: [number, number][];
  /** One digit per column (32 columns): stacked block height. 0 = empty. */
  heights: string;
  top: string;
  mid: string;
  deep: string;
  liquid?: { level: number; color: string; shine: string };
  floating?: { col: number; row: number; width: number }[];
  props: Placed[];
}

const W = 320;
const H = 200;
const B = 10;

// ---------- Sprites ----------

const palm: Sprite = {
  rows: [
    "..GG..GG..",
    ".GGGGGGGG.",
    "GGG.TT.GGG",
    "G...TT...G",
    "....TT....",
    ".....TT...",
    ".....TT...",
    "....TT....",
    "....TT....",
  ],
  colors: { G: "#2fbf5b", T: "#a0723c" },
};

const oak: Sprite = {
  rows: [".LLLL.", "LLLLLL", "LLLDLL", "LDLLLL", ".LLLL.", "..TT..", "..TT..", "..TT.."],
  colors: { L: "#3fae4a", D: "#2e8a3a", T: "#7a5230" },
};

const romanianHouse: Sprite = {
  rows: [
    "......RR......",
    ".....RRRR.....",
    "....RRDRRR....",
    "...RRRRRRDR...",
    "..RRDRRRRRRR..",
    ".RRRRRRRDRRRR.",
    "RRRRRRRRRRRRRR",
    ".BWWBWWWWBWWB.",
    ".BWGGWWWGGWWB.",
    ".BWGGWWWGGWWB.",
    ".BWWWWDDWWWWB.",
    ".BBBBBDDBBBBB.",
  ],
  colors: { R: "#8b3a2b", D: "#6e2a1f", W: "#fbf6ec", B: "#6b4226", G: "#6ad1ff" },
};

const fence: Sprite = {
  rows: ["S.S.S.S", "SSSSSSS", "S.S.S.S", "S.S.S.S"],
  colors: { S: "#9c6b3f" },
};

const flower: Sprite = {
  rows: [".Y.", "YRY", ".Y.", ".G."],
  colors: { Y: "#ffd23f", R: "#ff7a8a", G: "#2fbf5b" },
};

const torch: Sprite = {
  rows: [".Y.", "YOY", ".O.", ".S.", ".S.", ".S."],
  colors: { Y: "#ffe066", O: "#ff9f1c", S: "#7a5230" },
};

const zombie: Sprite = {
  rows: [".GGGG.", ".KGGK.", ".GGGG.", "GCCCCG", "GCCCCG", ".BBBB.", ".B..B.", ".B..B."],
  colors: { G: "#5fae4e", K: "#1d1538", C: "#2bb3c0", B: "#3a3fa0" },
};

const portal: Sprite = {
  rows: ["OOOOOO", "OPLPPO", "OPPLPO", "OLPPPO", "OPPLPO", "OPLPPO", "OOOOOO"],
  colors: { O: "#1d1538", P: "#9751e1", L: "#c8bbea" },
};

const ninja: Sprite = {
  rows: [".KKKK.", ".KWWKP", ".KKKK.", "KKKKKK", "K.KK.K", ".KKKK.", ".K..K."],
  colors: { K: "#16171f", W: "#f2f2f0", P: "#9751e1" },
};

const stall: Sprite = {
  rows: [
    "PWPWPWPWPWPW",
    "PWPWPWPWPWPW",
    ".S........S.",
    ".S..E..Y..S.",
    "BBBBBBBBBBBB",
    "B.BBBBBBBB.B",
  ],
  colors: { P: "#9751e1", W: "#ffffff", S: "#7a5230", B: "#a0723c", E: "#2fdc7a", Y: "#ffd23f" },
};

const chest: Sprite = {
  rows: ["BBBBBB", "BDDDDB", "BBYYBB", "BBBBBB", "BDDDDB"],
  colors: { B: "#b07a3c", D: "#8a5a28", Y: "#ffd23f" },
};

const emerald: Sprite = {
  rows: [".E.", "ELE", ".E."],
  colors: { E: "#2fdc7a", L: "#bff7d8" },
};

const chalkboard: Sprite = {
  rows: [
    "BBBBBBBBBBBB",
    "BKKKKKKKKKKB",
    "BKWWKWKKWWKB",
    "BKKKKKWKKKKB",
    "BKWWWKKWWKKB",
    "BKKKKKKKKKKB",
    "BBBBBBBBBBBB",
    ".....SS.....",
    ".....SS.....",
  ],
  colors: { B: "#8a5a28", K: "#2d5a3d", W: "#f2f2f0", S: "#7a5230" },
};

const books: Sprite = {
  rows: ["PPPPPP.", ".YYYYYY", "CCCCCC.", ".RRRRRR"],
  colors: { P: "#9751e1", Y: "#ffd23f", C: "#6ad1ff", R: "#ff7a8a" },
};

const umbrella: Sprite = {
  rows: ["..PWPWP..", ".PWPWPWP.", "PWPWPWPWP", "....S....", "....S....", "....S....", "....S...."],
  colors: { P: "#ff7a8a", W: "#ffffff", S: "#7a5230" },
};

// ---------- Scenes ----------

const scenes: Record<WorldTheme, Scene> = {
  tropical: {
    sky: ["#5cc8ff", "#7dd6ff", "#a4e4ff", "#cdf2ff"],
    sun: { x: 250, y: 30, color: "#ffd23f", glow: "#fff0a8" },
    clouds: [[30, 28], [150, 18]],
    heights: "11112233444444333344444332211111",
    top: "#f6d88b",
    mid: "#e8c070",
    deep: "#c99a4f",
    liquid: { level: 2, color: "#22b8e6", shine: "#8fe3ff" },
    props: [
      { sprite: palm, col: 9, px: 5 },
      { sprite: umbrella, col: 14, px: 4 },
      { sprite: palm, col: 21, px: 5 },
      { sprite: chest, col: 17, px: 4 },
    ],
  },
  dungeon: {
    sky: ["#1d1538", "#2a1d52", "#3a2870", "#4b3390"],
    stars: true,
    heights: "66654433333333333333333334456666",
    top: "#6e658b",
    mid: "#594f7b",
    deep: "#45396b",
    liquid: { level: 3, color: "#ff7a1c", shine: "#ffd23f" },
    props: [
      { sprite: torch, col: 4, px: 4, lift: 1 },
      { sprite: zombie, col: 12, px: 5 },
      { sprite: chest, col: 16, px: 5 },
      { sprite: zombie, col: 20, px: 5 },
      { sprite: torch, col: 28, px: 4, lift: 1 },
    ],
  },
  village: {
    sky: ["#7fd0ff", "#9edbff", "#bfe8ff", "#e2f5ff"],
    sun: { x: 40, y: 30, color: "#ffd23f", glow: "#fff0a8" },
    clouds: [[170, 22], [250, 40]],
    heights: "44445555555444444444455555544444",
    top: "#5ec04a",
    mid: "#8b5a2b",
    deep: "#6e6e78",
    props: [
      { sprite: oak, col: 1, px: 5 },
      { sprite: romanianHouse, col: 5, px: 5 },
      { sprite: fence, col: 13, px: 4 },
      { sprite: flower, col: 16, px: 4 },
      { sprite: romanianHouse, col: 19, px: 5 },
      { sprite: flower, col: 27, px: 4 },
      { sprite: oak, col: 28, px: 5 },
    ],
  },
  adventure: {
    sky: ["#7b3fd0", "#9751e1", "#a38ddd", "#c8bbea"],
    sun: { x: 260, y: 36, color: "#ffffff", glow: "#e3d8ff" },
    clouds: [[20, 50], [200, 20]],
    heights: "33344443300000000003344443333333",
    top: "#5ec04a",
    mid: "#8b5a2b",
    deep: "#6e6e78",
    floating: [
      { col: 12, row: 9, width: 5 },
      { col: 20, row: 13, width: 3 },
    ],
    props: [
      { sprite: oak, col: 2, px: 5 },
      { sprite: portal, col: 6, px: 5 },
      { sprite: ninja, col: 22, px: 5 },
      { sprite: oak, col: 27, px: 5 },
    ],
  },
  market: {
    sky: ["#ffb3c7", "#ffc9d6", "#ffe0e7", "#fff3f6"],
    sun: { x: 50, y: 32, color: "#ffd23f", glow: "#fff0a8" },
    clouds: [[200, 26]],
    heights: "33333333333333333333333333333333",
    top: "#9751e1",
    mid: "#7b3fd0",
    deep: "#431eba",
    props: [
      { sprite: stall, col: 2, px: 5 },
      { sprite: chest, col: 10, px: 5 },
      { sprite: emerald, col: 14, px: 5, lift: 2 },
      { sprite: stall, col: 17, px: 5 },
      { sprite: emerald, col: 26, px: 5, lift: 3 },
      { sprite: chest, col: 27, px: 4 },
    ],
  },
  classroom: {
    sky: ["#ffe27a", "#ffeaa0", "#fff2c4", "#fff9e6"],
    sun: { x: 270, y: 30, color: "#ff9f1c", glow: "#ffd23f" },
    clouds: [[30, 30]],
    heights: "44444444444444444444444444444444",
    top: "#5ec04a",
    mid: "#8b5a2b",
    deep: "#6e6e78",
    props: [
      { sprite: oak, col: 1, px: 5 },
      { sprite: chalkboard, col: 7, px: 5 },
      { sprite: books, col: 15, px: 5 },
      { sprite: flower, col: 20, px: 4 },
      { sprite: oak, col: 24, px: 5 },
      { sprite: flower, col: 29, px: 4 },
    ],
  },
  hero: {
    sky: ["#9751e1", "#a76df0", "#c8a8f5", "#ece2fd"],
    sun: { x: 255, y: 32, color: "#ffd23f", glow: "#fff0a8" },
    clouds: [[30, 24], [150, 44], [270, 70]],
    heights: "44455556666555544322222334445555",
    top: "#5ec04a",
    mid: "#8b5a2b",
    deep: "#6e6e78",
    liquid: { level: 3, color: "#22b8e6", shine: "#8fe3ff" },
    floating: [{ col: 16, row: 11, width: 5 }],
    props: [
      { sprite: oak, col: 1, px: 5 },
      { sprite: romanianHouse, col: 5, px: 4 },
      { sprite: portal, col: 11, px: 4 },
      { sprite: ninja, col: 17, px: 4, lift: 8 },
      { sprite: palm, col: 24, px: 5 },
      { sprite: chest, col: 29, px: 4 },
    ],
  },
};

// ---------- Renderers ----------

function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v + 255 * amount)));
  const r = c((n >> 16) & 255);
  const g = c((n >> 8) & 255);
  const b = c(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function SpriteRects({ sprite, x, y, px }: { sprite: Sprite; x: number; y: number; px: number }) {
  return (
    <g>
      {sprite.rows.flatMap((row, ry) =>
        [...row].map((ch, rx) =>
          sprite.colors[ch] ? (
            <rect
              key={`${rx}-${ry}`}
              x={x + rx * px}
              y={y + ry * px}
              width={px}
              height={px}
              fill={sprite.colors[ch]}
            />
          ) : null,
        ),
      )}
    </g>
  );
}

function Cloud({ x, y }: { x: number; y: number }) {
  return (
    <g fill="#ffffff" opacity={0.9}>
      <rect x={x + 10} y={y} width={30} height={10} />
      <rect x={x} y={y + 10} width={55} height={10} />
      <rect x={x + 20} y={y - 5} width={15} height={5} />
    </g>
  );
}

function Block({ x, y, color, top }: { x: number; y: number; color: string; top?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={B} height={B} fill={color} />
      <rect x={x} y={y} width={B} height={top ? 3 : 1} fill={shade(color, 0.12)} />
      <rect x={x} y={y + B - 1} width={B} height={1} fill={shade(color, -0.12)} />
      {!top && <rect x={x + 3} y={y + 4} width={2} height={2} fill={shade(color, -0.08)} />}
    </g>
  );
}

export function WorldArt({
  theme,
  className = "",
  label,
}: {
  theme: WorldTheme;
  className?: string;
  label?: string;
}) {
  const s = scenes[theme];
  const heights = [...s.heights].map(Number);
  const band = H / s.sky.length;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {s.sky.map((c, i) => (
        <rect key={c + i} x={0} y={i * band} width={W} height={band + 1} fill={c} />
      ))}

      {s.stars &&
        [[20, 20], [60, 45], [110, 15], [170, 35], [220, 12], [280, 40], [300, 18], [140, 60]].map(
          ([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width={3} height={3} fill="#ffffff" opacity={0.85} />,
        )}

      {s.sun && (
        <g>
          <rect x={s.sun.x - 6} y={s.sun.y - 6} width={32} height={32} fill={s.sun.glow} opacity={0.6} />
          <rect x={s.sun.x} y={s.sun.y} width={20} height={20} fill={s.sun.color} />
        </g>
      )}

      {s.clouds?.map(([x, y]) => <Cloud key={`${x}-${y}`} x={x} y={y} />)}

      {s.floating?.map((f) => (
        <g key={`${f.col}-${f.row}`}>
          {Array.from({ length: f.width }, (_, i) => (
            <Block key={i} x={(f.col + i) * B} y={H - f.row * B} color={s.top} top />
          ))}
          {Array.from({ length: f.width - 2 }, (_, i) => (
            <Block key={`m${i}`} x={(f.col + 1 + i) * B} y={H - (f.row - 1) * B} color={s.mid} />
          ))}
          <Block x={(f.col + Math.floor(f.width / 2)) * B} y={H - (f.row - 2) * B} color={s.deep} />
        </g>
      ))}

      {heights.map((h, col) =>
        Array.from({ length: h }, (_, i) => {
          const row = h - i; // 1 = bottom
          const y = H - row * B;
          const color = i === 0 ? s.top : i < 3 ? s.mid : s.deep;
          return <Block key={`${col}-${i}`} x={col * B} y={y} color={color} top={i === 0} />;
        }),
      )}

      {s.liquid &&
        heights.map((h, col) =>
          h < s.liquid!.level ? (
            <g key={`l${col}`}>
              <rect
                x={col * B}
                y={H - s.liquid!.level * B}
                width={B}
                height={(s.liquid!.level - h) * B}
                fill={s.liquid!.color}
                opacity={0.92}
              />
              {col % 3 === 0 && (
                <rect x={col * B + 2} y={H - s.liquid!.level * B + 3} width={5} height={2} fill={s.liquid!.shine} />
              )}
            </g>
          ) : null,
        )}

      {s.props.map((p, i) => {
        const px = p.px ?? 5;
        const spriteH = p.sprite.rows.length * px;
        const ground = H - (heights[p.col] ?? 0) * B - (p.lift ?? 0) * B;
        return <SpriteRects key={i} sprite={p.sprite} x={p.col * B} y={ground - spriteH} px={px} />;
      })}
    </svg>
  );
}
