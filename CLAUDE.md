# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A React 19 + TypeScript + Vite + Tailwind v4 component library based on shadcn/ui (`style: base-nova`, built on **Base UI**, not Radix — see components.json). The app itself is a showcase/documentation site (`src/showcase/`) for browsing every component, its variants, and an interactive playground, similar in spirit to Storybook but hand-built.

## Commands

```bash
npm run dev            # start the showcase at localhost:5173
npm run build           # tsc -b && vite build (type-checks as part of build)
npm run typecheck       # tsc --noEmit only
npm run lint            # eslint .
npm run format          # prettier --write .
npm run format:check    # prettier --check .
npm run preview         # preview the production build
```

There is no test runner configured — verify changes via `typecheck`, `lint`, and `npm run dev`.

To add a new shadcn component: `npx shadcn@latest add <name>` (lands in `src/components/ui/`).

## Architecture

### Two halves of the codebase

- **`src/components/ui/`** — the actual design-system components (what shadcn generates/updates). Built on `@base-ui/react` primitives, styled with Tailwind + `class-variance-authority`. Treat these as the library; `src/lib/utils.ts` (`cn`) and `src/hooks/` support them.
- **`src/showcase/`** — a separate app that documents and demos the components above. This is the bulk of the custom code and where most day-to-day changes happen. It never gets touched by `shadcn add`.

### The showcase's registry pattern

Every documented component is described once as a `ComponentEntry` (`src/showcase/registry/types.ts`), grouped by category into files under `src/showcase/registry/entries/*.ts` (actions, forms, data-display, navigation, overlays, layout, communication, utilities), and aggregated in `src/showcase/registry/index.ts`. An entry declares:

- metadata (`id`, `name`, `category`, `description`, `sourcePath`, `keywords`)
- an optional `playground` — built via `definePlayground()` (`src/showcase/registry/define-playground.ts`), which pairs a control map (`src/showcase/lib/controls.ts`: select/boolean/text/number) with a demo component and auto-generates the code snippet shown to the user
- a list of `stories` — each a small demo component plus `sourceModule`/`sourceExport`, which `src/showcase/lib/demo-source.ts` uses to pull the *real* source text (via `import.meta.glob(..., { query: "?raw" })`) for the "Show code" disclosure, so snippets can never drift from the actual demo

Demo components themselves live in `src/showcase/demos/<component>.tsx` — one file per registry entry, exporting each named story/playground component referenced from the entries file. Registry entry files must stay `.ts` data modules with no JSX (a `react-refresh/only-export-components` constraint) — always point `component:` at an imported component, never an inline closure.

Heavy third-party demo deps (recharts, react-day-picker, embla, cmdk, react-resizable-panels, input-otp) are deferred with `lazyDemo()` (`src/showcase/registry/lazy-demo.ts`) so they don't bloat the initial bundle; only wrap a demo in this if it pulls in one of those.

A component whose real behavior needs to own the whole document (fixed positioning, window-level shortcuts, persisted state — e.g. the Sidebar demo) is registered instead as a chrome-less **sandbox** route in `src/showcase/registry/sandboxes.ts` and embedded via iframe from the component page.

### Routing

No router library — `src/showcase/routing/routes.ts` parses `window.location.hash` into a `Route` union (`overview | foundation | component | sandbox | not-found`), and `use-hash-route.ts` subscribes to it via `useSyncExternalStore`. Navigate with the `componentHref`/`foundationHref`/`sandboxHref`/`navigate` helpers, never by hand-editing `location.hash`.

### App shell

`src/showcase/app/showcase-app.tsx` renders the floating shell (header + sidebar + scrollable stage) and dispatches on the parsed route to `OverviewPage`, `ComponentPage`, a foundation page, `SandboxPage`, or `NotFoundPage`. `ComponentPage` composes `PageHeader` + `Playground` + a list of `Story` blocks + a `PropTable`, all under `src/showcase/primitives/`.

### Styling and tokens

Tailwind v4 with CSS-variable tokens defined in `src/index.css` (OKLCH colors, light/dark via a `.dark` class + `@custom-variant dark`). `src/components/theme-provider.tsx` manages theme state (`light | dark | system`, persisted to `localStorage`, synced across tabs via the `storage` event, and toggleable with the `d` key when focus isn't on an editable element). Foundations pages (colors, radius, typography) under `src/showcase/foundations/` read from `src/showcase/fixtures/tokens.ts` to render the token reference.

### Conventions worth preserving

- No semicolons, double quotes, trailing commas — enforced by Prettier (`prettier-plugin-tailwindcss` also sorts Tailwind classes); run `npm run format` rather than hand-formatting.
- Use Base UI's `render={<a href=… />}` prop for polymorphism, not `asChild` (that's a Radix idiom and doesn't apply here).
- Prefer an installed shadcn component over a native HTML element or a hand-rolled component whenever one already covers the need (e.g. `Button` over `<button>`, `Input` over `<input>`, `Select`/`Combobox` over a native `<select>`). Only fall back to a native element or a custom component when no installed shadcn component can achieve it.
- Use Tailwind's native design tokens (spacing scale, color tokens, etc.) rather than arbitrary values (`w-[17px]`, `text-[#123456]`). If a one-off value must be repeated, promote it to a CSS variable/token in `src/index.css` rather than repeating the arbitrary value. Only reach for an arbitrary value when no native token can express it.
- Path alias `@/*` → `src/*` (see `vite.config.ts` / `tsconfig.json`).
