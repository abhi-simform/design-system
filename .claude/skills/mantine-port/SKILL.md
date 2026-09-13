---
name: mantine-port
description: Ports a Mantine component into this design system's src/components/ui/ as a 1:1 shadcn-style component — same props, same behavior. Invoke with the component name and its Mantine docs URL, e.g. "/mantine-port grid - https://mantine.dev/core/grid/". Use whenever asked to port, migrate, or recreate a Mantine component here.
---

# Port a Mantine component into this design system

You turn one Mantine component into a native `src/components/ui/` component in
this repo: same props, same runtime behavior, built the way this repo builds
shadcn components — not a wrapper around `@mantine/core`.

## 1. Parse the input

You are invoked with an argument in the form `<component-name> - <mantine-url>`,
e.g. `grid - https://mantine.dev/core/grid/`. Extract:

- **name** — the component's identity (e.g. `Grid`). Derive the kebab-case
  file name from it (e.g. `grid`, `button-group`).
- **url** — the Mantine docs page. This is a starting point, not the source of
  truth (see below).

If either piece is missing or the URL isn't a `mantine.dev` docs page, ask the
user for it before doing anything else.

## 2. Research — read the actual source, not just the docs

Mantine's docs pages and `https://mantine.dev/llms-full.txt` are lossy:
`llms-full.txt` is large enough that `WebFetch` frequently returns a truncated
summary that **skips the target component's section entirely** — don't trust
an empty/missing result as "no props exist," re-fetch or go straight to
source. The docs page itself is fine for a first pass (prop overview, example
snippets) but is often stale or incomplete on default values and edge cases.

**Always cross-check against the real Mantine source** on GitHub
(`mantinedev/mantine`, path
`packages/@mantine/core/src/components/<Name>/`). Fetch, at minimum:

- `<Name>.tsx` — the main component: props interface, default props, what it
  renders, what it hands to a context.
- Any subcomponent directory (e.g. `GridCol/`) — compound-API pieces.
- `<Name>.context.ts` (if present) — what the parent shares with children.
- `<Name>Variables.tsx` / subcomponent `*Variables.tsx` (if present) — this is
  where Mantine computes responsive CSS custom properties; the math here
  (percentages, `calc()` expressions, flex-basis/grow/offset formulas) is
  the ground truth for behavior and must be ported verbatim, not
  reconstructed from a docs description.
- `<Name>.module.css` — the actual CSS rules that consume those variables;
  tells you exactly which properties are static vs. which read a `var(--x)`.

Use `WebFetch` on the raw GitHub URL
(`https://raw.githubusercontent.com/mantinedev/mantine/master/packages/@mantine/core/src/components/<Name>/<file>`)
and explicitly ask for the file "verbatim inside a single code fence, no
summarization" — otherwise the fetch model may paraphrase and drop details.

If the component needs Mantine theme defaults this repo has no equivalent
for, hardcode Mantine's own published defaults rather than inventing values:

- **Breakpoints:** `xs: "36em", sm: "48em", md: "62em", lg: "75em", xl: "88em"`
- **Spacing scale:** `xs: "0.625rem", sm: "0.75rem", md: "1rem", lg: "1.25rem", xl: "1.5rem"`

## 3. Read this codebase's own conventions before writing anything

Don't assume — check, every time (styles drift between components):

- Read 3–4 existing `src/components/ui/*.tsx` files spanning different
  shapes: a simple wrapper (e.g. `aspect-ratio.tsx`), a compound component
  (e.g. `card.tsx`, `item.tsx`), one using `cva` + `class-variance-authority`
  for variants, and one wrapping an actual Base UI primitive
  (e.g. `separator.tsx`).
- Confirm: `cn` is imported from the bare specifier `"cn"` (not
  `@/lib/utils`); no `forwardRef` anywhere (React 19 — ref is just a prop);
  `data-slot="<name>"` on every rendered root; prop types are inline
  `React.ComponentProps<"div"> & {...}` or a `Props` interface, not
  hand-forwarded generics; Base UI is imported as `@base-ui/react/<primitive>`
  (check `package.json` for the exact version/package name — this can
  change); every sub-part export is grouped into one `export { ... }` at the
  bottom of the file.
- Grep `src/components/ui/` for `createContext` to see the existing
  precedent (e.g. `sidebar.tsx`'s `useSidebar()` that throws outside its
  provider) before adding a new context — only add one if CSS-only
  inheritance (a `data-*` attribute the way `card.tsx` does `data-size`)
  genuinely can't carry what a child needs (e.g. a numeric column count used
  inside a `calc()`).
- Check `src/index.css`'s `@theme inline` block and `components.json` /
  `package.json` (Tailwind version, prefix, base library) for tokens you
  might reuse instead of inventing new ones.
- Grep for the component's name (and obvious aliases) across
  `src/components/ui/` and `src/showcase/` to confirm it doesn't already
  exist in some form.

## 4. Design decisions — apply these rules, don't rediscover them

- **Skip Mantine's global styling/theme-system props.** `classNames`,
  `styles`, `unstyled`, `vars`, `attributes`, `mod`, and `BoxProps`
  style-shorthand props (`m`, `p`, `w`, `h`, `bg`, etc.) have no equivalent
  in this repo — plain `className`/`style` already cover the same ground,
  and no existing component here exposes shorthand style props. Explicitly
  list what you skipped (in the showcase `notes` and/or your summary to the
  user), don't silently drop it.
- **Port responsive (`StyleProp`) props faithfully.** When a Mantine prop
  accepts `value | { base, xs, sm, md, lg, xl }`, reproduce it with: a
  `ResponsiveValue<T>` type, a per-instance scoped class name from
  `React.useId()` (sanitized to a valid CSS identifier), and a generated
  `<style>` tag containing a base rule plus `@media (min-width: ...)` (or
  `@container <name> (min-width: ...)` for container-query variants) blocks
  — mirroring the Mantine `*Variables.tsx` file you read in step 2. Compute
  values with the same formulas Mantine uses (percentages, `calc()` with a
  gap factor, etc.), ported verbatim.
- **Any CSS custom property referenced inside a `calc()`/`var()` must
  always be defined, unconditionally** — not only when that specific prop
  happens to be responsive. (Concretely: if a child's `flex-basis` formula
  references `var(--parent-gap)`, the parent must always emit
  `--parent-gap` as a real custom property, even when the parent's own gap
  prop is a plain non-responsive value. Skipping this because "it's not
  responsive, so just set the final value inline" produces an invalid
  `calc()` that silently falls back to `auto`/`none` — verify this in
  DevTools, don't assume it's fine because it typechecks and looks
  plausible in a screenshot.)
- **Never mix inline `style` values with responsive overrides for the same
  property.** An inline `style` attribute always wins over any external
  stylesheet rule regardless of specificity or a matching media/container
  query — so a value that ever needs a breakpoint override must be set via
  the generated stylesheet (scoped class), never via inline `style`. Only
  values with no possible override (non-responsive props, or the reference
  `var(--x)` indirection itself) may go through inline `style`.
- **Default every prop to a static Tailwind class, not inline `style`.**
  When a prop's possible values form a fixed, enumerable set — Mantine's own
  spacing/radius scale (`xs`–`xl` → `gap-2.5`/`gap-3`/`gap-4`/`gap-5`/`gap-6`,
  or `rounded-sm`/`rounded-md`/…), a CSS keyword union
  (`align`/`justify`/`overflow` and similar), or any other closed enum — map
  each value to its Tailwind utility in a `Record<Enum, string>` and apply it
  through `cn("...", tokenClass, className)`, never through `style={{ ... }}`.
  Narrow the exposed prop's TypeScript type to that closed union (not the
  wider `React.CSSProperties["..."]` or `number | string`) and don't add an
  inline-`style` fallback "just in case" for a value outside the enum — a
  consumer who needs something the enum doesn't cover overrides via
  `className` instead (e.g. `className="gap-20"` for an 80px gap,
  `className="rounded-[3px]"` for a one-off radius). This works reliably
  because `cn` (this repo's `tailwind-merge`-equivalent) resolves same-group
  conflicts deterministically in favor of whichever class came later in the
  arguments, regardless of generation order — verified with
  `cn("gap-4", ..., "gap-20")` → `"gap-4"` is dropped, `"gap-20"` survives.
  Plain CSS cascade order (two literal classes both present in the DOM) does
  **not** give you this guarantee on its own.
  Reserve inline `style`/CSS custom properties for genuinely **floating
  dynamic values** that Tailwind cannot express as a static class at
  all — because the scanner only ever sees literal source text, a class
  built at runtime (`` `gap-[${n}px]` ``, ``cn(`p-${size}`)``) will never
  be generated and silently does nothing:
  - An unbounded/continuous input with no natural enum — an arbitrary color,
    an opacity, a blur radius, a z-index, a duration in ms.
  - A value another element's `calc()`/`var()` depends on (Grid's own `gap`,
    which `GridCol`'s flex-basis/offset formulas reference) — see the
    var-must-always-be-defined rule above.
  - A per-breakpoint responsive value needing a generated `<style>` tag (the
    rule above).
  - A value driven by a JS state machine frame-by-frame (e.g. a `Transition`
    component's computed `transform`/`opacity` per animation phase) — there's
    no static class for "whatever the animation is doing right now."
- **Make the port behave like a native layout primitive here, not just a
  literal prop-for-prop clone.** E.g. a layout container should default to
  filling its parent's width (`w-full`) the way this repo's other layout
  components implicitly do, even if upstream Mantine relies on the
  consumer to size it. Use judgment for this kind of ergonomic default;
  don't change actual prop behavior.
- **Preserve compound APIs (e.g. `Grid.Col`) via `Object.assign`:**
  `const ComponentWithSub = Object.assign(Component, { Sub: Sub })`, then
  `export { ComponentWithSub as Component, Sub }`. A bare
  `Component.Sub = Sub` assignment on a function declaration is a TS error
  in this codebase's strictness.
- **Never mention "Mantine" (or any source library name) in actual runtime
  code** — class names, CSS container-query names, `data-*` attribute
  values, variable names, generated `<style>` content, Tailwind
  arbitrary-value strings. Use a generic/project-neutral identifier instead
  (e.g. a CSS container name of `grid`, not `mantine-grid`). Mentioning the
  source library in documentation prose (a showcase description, a note
  explaining provenance, this conversation) is fine by default, but if the
  user pushes back on that too, scrub it from every file, including
  showcase `keywords`/`notes`, and re-grep the whole diff afterward.

## 5. Build

- One file: `src/components/ui/<kebab-name>.tsx`, following every convention
  from step 3. No comments except for a genuinely non-obvious invariant
  (e.g. the "why" behind the `Object.assign` compound-export pattern, or the
  var-must-always-be-defined rule above, if it isn't self-evident at the
  call site).
- Export the props types too (`export type { XProps, ... }`) — useful for
  consumers, matches how Mantine itself exports them.

## 6. Showcase integration — always add it

Every existing `src/components/ui/*` file has a matching showcase entry —
always add one for this port too, no need to ask. Do use
`AskUserQuestion` to confirm whether to port any advanced/secondary prop
that adds real complexity (e.g. a container-query mode, an alternate
rendering strategy) or keep to the common case only.

- `src/showcase/demos/<kebab-name>.tsx` — a `<Name>Playground` component
  wired to `definePlayground()` controls, plus a few `<Name><Variant>` story
  components that demonstrate the distinctive behaviors (responsive object
  syntax, any compound sub-parts, anything non-obvious).
- Add a `ComponentEntry` to the correct category file under
  `src/showcase/registry/entries/*.ts` (check `src/showcase/registry/types.ts`
  for the shape), and append it — alphabetically — to that file's exported
  entries array.

## 7. Verify — don't just typecheck

1. `npm run typecheck`, `npm run lint`, and `npx prettier --check` on the
   files you touched. This repo already carries pre-existing `lint` debt
   (the `react-refresh/only-export-components` rule fires on several
   existing files that export non-component values alongside components) —
   confirm your count against a clean baseline (`git stash -u` the new
   file(s) and re-run) rather than assuming any error is yours, but don't
   introduce a genuinely new category of error either.
2. Start the dev server, open the new component's showcase page, and
   **actually drive the browser**: exercise the playground, check every
   story renders, and specifically stress-test any responsive claim —
   resize the viewport across the relevant breakpoint for media-query
   props, drag a resizable container across the relevant breakpoint for
   container-query props. A static screenshot at one size is not proof.
3. For at least one computed/responsive value, inspect it directly via
   `javascript_tool` (`getComputedStyle`, `getBoundingClientRect`,
   `getAttribute("style")`) rather than eyeballing the screenshot — this is
   how a fallback-to-`auto` bug and a full-width-that-wasn't-actually-full
   bug were both caught during development of this skill. Trust the
   computed values, not visual plausibility.
4. Re-grep the full diff for the source library's name, case-insensitive,
   before calling the port done.
5. Grep the new component file for `style={{` / `style:`. For each hit,
   confirm it's one of the genuine exceptions listed in step 4 (a value
   feeding a `calc()`/`var()` elsewhere, a per-breakpoint responsive value, an
   unbounded continuous input, or a JS-driven animation frame) — if the value
   is actually a fixed enum, it's a bug: convert it to a `Record<Enum, string>`
   Tailwind-class lookup instead. Confirm in the browser via
   `el.getAttribute("style")` that the enumerable props you did map produce
   an empty/absent `style` attribute, not just that the computed CSS looks
   right (a leftover inline value can coincidentally match the intended
   result and hide the bug).
