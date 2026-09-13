import { Typography } from "@/components/ui/typography"

const ARTICLE_SAMPLE = (
  <>
    <h1>The quiet cost of rewrites</h1>
    <p>
      Teams reach for a rewrite when the old code feels slow to change. Most of
      the time the schedule is the real cost, and it rarely shows up until the{" "}
      <mark>second</mark> quarter.
    </p>
    <h2>Weigh the alternative first</h2>
    <p>
      A strangler-fig migration replaces one seam at a time behind a stable
      interface. It reads slower on a status update, but it never blocks a
      release. Read more in the <a href="#">migration playbook</a>.
    </p>
    <ul>
      <li>Ship the seam behind a flag</li>
      <li>Delete the old path once traffic moves</li>
    </ul>
  </>
)

const DOCUMENTATION_SAMPLE = (
  <>
    <h1>Getting started</h1>
    <p>
      Install the package, then wrap any HTML content — markdown output, a CMS
      field, or hand-written JSX — in <code>Typography</code>.
    </p>
    <pre>
      <code>npm install @acme/design-system</code>
    </pre>
    <p>
      Press <kbd>Cmd</kbd> + <kbd>K</kbd> to open the command palette from
      anywhere in the docs.
    </p>
    <blockquote>
      Typography styles whatever native HTML you give it — it never requires its
      own component set.
    </blockquote>
  </>
)

const SAMPLES = {
  article: ARTICLE_SAMPLE,
  documentation: DOCUMENTATION_SAMPLE,
} as const

export function TypographyPlayground({
  sample,
}: {
  sample: keyof typeof SAMPLES
}) {
  return <Typography>{SAMPLES[sample]}</Typography>
}

export function TypographyHeadings() {
  return (
    <Typography>
      <h1>Heading level one</h1>
      <h2>Heading level two</h2>
      <h3>Heading level three</h3>
      <h4>Heading level four</h4>
      <h5>Heading level five</h5>
      <h6>Heading level six</h6>
      <p>
        Every heading picks up the same font family, weight and size scale as
        the standalone <code>Title</code> component, so raw HTML content stays
        visually consistent with the rest of the design system.
      </p>
    </Typography>
  )
}

export function TypographyListsAndQuotes() {
  return (
    <Typography>
      <p>Two ways to plan a migration:</p>
      <ol>
        <li>Cut a seam behind an interface</li>
        <li>
          Move traffic gradually
          <ul>
            <li>Start with read-only paths</li>
            <li>Then writes, once parity is proven</li>
          </ul>
        </li>
        <li>Delete the old implementation</li>
      </ol>
      <blockquote>
        A rewrite is a bet that the new system will be worth the time nobody can
        spend on anything else while it&rsquo;s being built.
      </blockquote>
    </Typography>
  )
}

export function TypographyCode() {
  return (
    <Typography>
      <p>
        Install with <code>npm install @acme/design-system</code>, then import
        the component you need.
      </p>
      <pre>
        <code>{`import { Typography } from "@/components/ui/typography"

export function Article() {
  return <Typography>{/* raw HTML or markdown output */}</Typography>
}`}</code>
      </pre>
      <p>
        Press <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> to open the
        command palette.
      </p>
    </Typography>
  )
}

export function TypographyTable() {
  return (
    <Typography>
      <table>
        <caption>Component ports by category</caption>
        <thead>
          <tr>
            <th>Category</th>
            <th>Ported</th>
            <th>Remaining</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Layout</td>
            <td>6</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Data display</td>
            <td>15</td>
            <td>4</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th>21</th>
            <th>6</th>
          </tr>
        </tfoot>
      </table>
    </Typography>
  )
}

export function TypographyLinksAndMedia() {
  return (
    <Typography>
      <p>
        Read the <a href="#">full changelog</a> for details, or jump straight to
        the <mark>breaking changes</mark> section.
      </p>
      <hr />
      <p>
        <img
          src="https://placehold.co/480x200"
          alt="Placeholder illustration"
        />
      </p>
    </Typography>
  )
}
