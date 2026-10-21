// How Gumreel's design system is written down so coding agents can follow it.
// The excerpts are copied verbatim from Gumreel's DESIGN.md and CLAUDE.md.

const designExcerpt = `colors:
  primary: "#FF5C9C"
  secondary: "#E63946"
  neutral: "#FDF8EE"
  border: "#1A1A1F"
  ...
components:
  sticker-pink:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
  ...

## Do's and Don'ts

- **Do** use one dominant primary accent color per
  screen, with the other primaries in small doses.
- **Do** use 2px charcoal borders as the primary tool
  for visual hierarchy.
- **Don't** pack cards shoulder-to-shoulder to fit
  more on screen. Density kills the brand.`;

const claudeExcerpt = `- Follow \`DESIGN.md\` for any UI work: warm cream
  background, 2px charcoal borders, Fraunces italic
  display headlines, Inter body, Geist Mono for
  code/status. Never dark glassmorphism.`;

const CodeFile = ({ name, code }: { name: string; code: string }) => (
  <figure className="rounded-lg border border-gray-800 bg-dark-secondary overflow-hidden">
    <figcaption className="px-4 py-2 border-b border-gray-800 text-xs text-gray-400">{name}</figcaption>
    <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed text-gray-300">
      <code>{code}</code>
    </pre>
  </figure>
);

const AgentSystem = () => (
  <section aria-labelledby="agents-title" className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-start">
    <div className="max-w-[60ch]">
      <h2 id="agents-title" className="text-3xl md:text-4xl font-bold text-white mb-6">
        Written so agents can follow it
      </h2>
      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>
          Agents write most of the code in my projects, so a design system that
          lives only in my head does not survive. Gumreel's lives in a DESIGN.md
          file at the root of the repo: tokens at the top in YAML, then the
          reasoning behind them in plain language.
        </p>
        <p>
          The reasoning is the part that does the work. Tokens tell an agent which
          pink to use. The prose tells it why the borders are bold, why there is
          no pure white, and why only one accent leads, so a screen I never
          specified still comes out looking like Gumreel.
        </p>
        <p>
          The do and don't list turns taste into rules an agent can check its own
          output against, and the project's CLAUDE.md points every agent at the
          file before it touches the interface.
        </p>
      </div>
    </div>

    <div className="space-y-6 min-w-0">
      <CodeFile name="Gumreel/DESIGN.md" code={designExcerpt} />
      <CodeFile name="Gumreel/CLAUDE.md" code={claudeExcerpt} />
    </div>
  </section>
);

export default AgentSystem;
