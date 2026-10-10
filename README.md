# Nether Ninjas — sito web

Sito dello studio Nether Ninjas: Next.js 16 (App Router, Cache Components) + Tailwind CSS 4, con blog gestito da Sanity e Sanity Studio integrato su `/studio`. Pensato per il deploy su Vercel.

## Avvio in locale

```bash
npm install
cp .env.example .env.local   # poi compila le variabili
npm run dev                  # http://localhost:3000
```

Il sito funziona anche senza Sanity configurato: il blog mostra "No posts yet!".

## Struttura

| Percorso | Contenuto |
| --- | --- |
| `src/app/(site)/` | Pagine del sito: home, projects, about, what-we-do, team, blog, contact, privacy, terms |
| `src/app/studio/` | Sanity Studio integrato (`/studio`) |
| `src/data/projects.ts` | **Progetti** (titolo, categoria, stato, testi, ruoli, feature, immagini) |
| `src/data/team.ts` | **Team** (nomi, ruoli, bio, foto) |
| `src/data/site.ts` | Navigazione, **link social**, email di contatto |
| `src/sanity/` | Client, query GROQ e schemi del blog (post, author, category) |
| `src/components/WorldArt.tsx` | Illustrazioni pixel-art usate finché non ci sono screenshot reali |
| `public/brand/` | Loghi bianchi su trasparente (ricolorabili via CSS) |
| `public/models/logo.glb` | Modello 3D del logo (convertito e compresso da `docs/Modello_Logo_NetherNinjas.obj`) |
| `src/components/LogoScene.tsx` | Scena 3D interattiva della hero (three.js / React Three Fiber) |
| `src/lib/theme.ts`, `src/components/ThemeToggle.tsx` | Modalità chiara/scura |

### Aggiungere screenshot reali

Metti le immagini in `public/images/projects/<slug>/` e indicale nel progetto in `src/data/projects.ts`:

```ts
image: "/images/projects/island-party/cover.jpg",
gallery: ["/images/projects/island-party/1.jpg", "/images/projects/island-party/2.jpg"],
```

Le foto del team vanno in `public/images/team/` (campo `photo` in `src/data/team.ts`).

## Modalità scura

Il tema segue le impostazioni del sistema finché il visitatore non usa il pulsante sole/luna nella navbar (la scelta viene ricordata). I colori che cambiano tra chiaro e scuro sono definiti come variabili in `src/app/globals.css` (`--canvas`, `--surface`, `--fg`, `--tint`, `--accent`, `--pop`) e usati con le classi `bg-canvas`, `bg-surface`, `text-fg`, ecc.

## Aggiornare il modello 3D

Se esporti una nuova versione del logo da Blender:

```bash
npx obj2gltf@3 -i docs/Modello_Logo_NetherNinjas.obj -o logo-raw.glb
npx @gltf-transform/cli@4 optimize logo-raw.glb public/models/logo.glb --compress meshopt --texture-compress false --simplify-error 0.0005
```

La mesh del contorno viene riconosciuta dal nome (contiene "Vert") e colorata di nero; il resto è il corpo bianco.

## Configurare Sanity (blog)

1. Crea il progetto: `npx sanity@latest init --env .env.local` (oppure su https://www.sanity.io/manage), dataset `production`.
2. Copia Project ID e dataset in `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. Su sanity.io/manage → **API → CORS origins** aggiungi `http://localhost:3000` e il dominio Vercel (es. `https://netherninjas.vercel.app`), con "Allow credentials" attivo.
4. Apri `/studio`, accedi e crea autori, categorie e articoli.

I contenuti pubblicati si aggiornano sul sito automaticamente (Sanity Live), senza webhook né redeploy.

## Form di contatto

Il form invia email tramite [Resend](https://resend.com). Imposta:

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=info@tuodominio.com
CONTACT_FROM_EMAIL=Nether Ninjas <hello@tuodominio.com>   # dominio verificato su Resend
```

Senza queste variabili il form mostra un messaggio "non ancora configurato".

## Deploy su Vercel

1. Pubblica il repository su GitHub e importalo su https://vercel.com/new (framework rilevato in automatico).
2. In **Settings → Environment Variables** aggiungi le stesse variabili di `.env.local` (+ `NEXT_PUBLIC_SITE_URL` con il dominio finale).
3. Aggiungi il dominio Vercel tra le CORS origins di Sanity (vedi sopra).

## Comandi

- `npm run dev` — sviluppo
- `npm run build` — build di produzione
- `npm run lint` — ESLint
