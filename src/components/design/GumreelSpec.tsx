import { useEffect, useRef, useState } from 'react';
import './gumreel-spec.css';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,400..600,0..100;1,9..144,400..600,0..100&family=Geist+Mono:wght@400&family=Inter:wght@400;500&display=swap';

const STATUS_LINE = 'status: researching what is already winning in your niche';

const palette = [
  { name: 'Bubblegum', hex: '#FF5C9C', role: 'The gum half' },
  { name: 'Cinema red', hex: '#E63946', role: 'The reel half' },
  { name: 'Crayon blue', hex: '#3D5AFE', role: 'Links, thinking' },
  { name: 'Sunshine', hex: '#FFD23F', role: 'Wins, sparingly' },
  { name: 'Cream', hex: '#FDF8EE', role: 'Never pure white' },
  { name: 'Deep cream', hex: '#FBF4E4', role: 'Cards' },
  { name: 'Charcoal', hex: '#1A1A1F', role: 'Text and 2px borders' },
  { name: 'Warm gray', hex: '#A8A29E', role: 'Helper copy' },
];

const stickers = [
  { label: 'Skincare', bg: 'var(--gr-pink)', fg: 'var(--gr-ink)' },
  { label: 'Slow push-in', bg: 'var(--gr-red)', fg: 'var(--gr-cream)' },
  { label: 'Research', bg: 'var(--gr-blue)', fg: 'var(--gr-cream)' },
  { label: 'Winner', bg: 'var(--gr-yellow)', fg: 'var(--gr-ink)' },
];

const frames = [
  { src: '/assets/genhq-spec-ad.webp', caption: 'GenHQ spec ad', href: 'https://vimeo.com/1231162092' },
  { src: '/assets/wetlands-conservancy-spec-ad.webp', caption: 'Wetlands Conservancy', href: 'https://vimeo.com/1217060889' },
  { src: '/assets/meta-spec-ad-sidewalk.webp', caption: 'Meta AR headphones', href: 'https://vimeo.com/1162367981' },
];

// Loads Fraunces, Inter and Geist Mono for this panel only, so the rest of
// the site keeps its own type.
const useGumreelFonts = () => {
  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_HREF}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }, []);
};

// The status streamer types itself out once, when it scrolls into view.
const useTypewriter = (text: string) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState('');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(text);
      return;
    }

    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let i = 0;
        timer = window.setInterval(() => {
          i += 1;
          setShown(text.slice(0, i));
          if (i >= text.length) window.clearInterval(timer);
        }, 38);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [text]);

  return { ref, shown };
};

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="gr-display text-2xl leading-tight mb-2">{children}</h3>
);

const Note = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm leading-relaxed text-[rgba(26,26,31,0.72)] max-w-[52ch]">{children}</p>
);

const GumreelSpec = () => {
  useGumreelFonts();
  const { ref: statusRef, shown } = useTypewriter(STATUS_LINE);

  return (
    <article className="gr-sheet p-6 sm:p-10 lg:p-12" aria-labelledby="gumreel-spec-title">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <span className="gr-sticker" style={{ background: 'var(--gr-pink)' }}>
          Gumreel design system
        </span>
        <a
          href="https://gumreel.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium underline-offset-4 hover:underline focus-visible:underline"
        >
          Open gumreel.ai
        </a>
      </div>

      <h2
        id="gumreel-spec-title"
        className="gr-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] max-w-[14ch]"
      >
        Saturday morning at the editing bay.
      </h2>
      <p className="mt-6 text-lg leading-relaxed max-w-[60ch]">
        A children's playground crossed with a film studio. Gumreel's users are
        Shopify founders and small marketing teams making video ads, so the tool
        should feel like making art with a friend while the ads come out as
        polished commercial work. The rule I hold every screen to: playful in
        voice, professional in execution.
      </p>

      <div className="mt-8 border-2 border-[var(--gr-ink)] rounded-2xl bg-[var(--gr-surface)] px-4 py-3">
        <p ref={statusRef} className="gr-mono text-[13px] min-h-[1.5em]" aria-label={STATUS_LINE}>
          <span aria-hidden="true" className="gr-caret">{shown}</span>
        </p>
      </div>

      <div className="gr-filmstrip my-10" aria-hidden="true" />

      <div className="grid gap-12 lg:grid-cols-2">
        <section aria-label="Palette">
          <SubHeading>Palette</SubHeading>
          <Note>
            Cream and charcoal carry every screen. One crayon color leads, and the
            others show up in small doses.
          </Note>
          <ul className="mt-6 grid grid-cols-4 gap-3 sm:gap-4">
            {palette.map((color) => (
              <li key={color.hex}>
                <div
                  className="aspect-square rounded-xl sm:rounded-2xl border-2 border-[var(--gr-ink)]"
                  style={{ background: color.hex }}
                />
                <p className="mt-2 text-xs sm:text-sm font-medium leading-tight">{color.name}</p>
                <p className="gr-mono text-[11px] sm:text-xs">{color.hex}</p>
                <p className="hidden sm:block text-xs text-[rgba(26,26,31,0.72)]">{color.role}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Type">
          <SubHeading>Type</SubHeading>
          <Note>Three families, each with one job.</Note>
          <div className="mt-6 space-y-6">
            <div>
              <p className="gr-display text-5xl leading-[1.05]">Smear it. Melt it. Break it.</p>
              <p className="mt-2 text-xs text-[rgba(26,26,31,0.72)]">Fraunces italic, soft axis up. The brand voice, one per screen.</p>
            </div>
            <div>
              <p className="text-base leading-relaxed max-w-[48ch]">
                Drag in a video or image. Toggle real-time WebGL effects. Export as
                WebM, ready to drop into your storyboard.
              </p>
              <p className="mt-2 text-xs text-[rgba(26,26,31,0.72)]">Inter. The grown-up that lets Fraunces play.</p>
            </div>
            <div>
              <p className="gr-mono text-[13px]">export: 1080 x 1920, webm, 6 shots</p>
              <p className="mt-2 text-xs text-[rgba(26,26,31,0.72)]">Geist Mono at 80% opacity. Only for status and machine talk.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="gr-filmstrip my-10" aria-hidden="true" />

      <section aria-label="Components">
        <SubHeading>Components</SubHeading>
        <Note>These are live. Hover, click and tab through them.</Note>

        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="gr-btn gr-btn-primary">Generate ads</button>
              <button type="button" className="gr-btn gr-btn-secondary">Regenerate</button>
            </div>
            <p className="mt-3 text-xs text-[rgba(26,26,31,0.72)]">One primary action per screen. Hover turns it cinema red.</p>
          </div>

          <div>
            <div className="flex flex-wrap gap-3">
              {stickers.map((s) => (
                <span key={s.label} className="gr-sticker" style={{ background: s.bg, color: s.fg }}>
                  {s.label}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-[rgba(26,26,31,0.72)]">
              Pink for brand, red for craft, blue for data, yellow for wins. Each
              sits 2 degrees off, like it was slapped on.
            </p>
          </div>

          <div>
            <label htmlFor="gr-demo-url" className="block text-sm font-medium mb-2">
              Product URL
            </label>
            <input
              id="gr-demo-url"
              type="url"
              className="gr-input"
              placeholder="https://yourstore.com/products/..."
            />
            <p className="mt-3 text-xs text-[rgba(26,26,31,0.72)]">Focus swaps the charcoal border for crayon blue.</p>
          </div>

          <div>
            <div className="gr-card p-6" tabIndex={0}>
              <p className="gr-display text-2xl leading-tight">Brief</p>
              <p className="mt-2 text-base leading-relaxed">
                Angle, audience, and the three shots that sell it.
              </p>
            </div>
            <p className="mt-3 text-xs text-[rgba(26,26,31,0.72)]">
              No shadows at rest. Cards lift and tilt when you pick them up.
            </p>
          </div>
        </div>
      </section>

      <div className="gr-filmstrip my-10" aria-hidden="true" />

      <section aria-label="Storyboard frames">
        <SubHeading>Storyboard frames</SubHeading>
        <Note>
          Frames develop from sepia to color when you hover, like a polaroid coming
          up. These are stills from my own spec ads.
        </Note>
        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {frames.map((frame) => (
            <li key={frame.src}>
              <a
                href={frame.href}
                target="_blank"
                rel="noopener noreferrer"
                className="gr-polaroid block"
                aria-label={`Watch the ${frame.caption} on Vimeo`}
              >
                <img
                  src={frame.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-video w-full object-cover"
                />
                <span className="block px-2 py-3 text-[13px] font-medium text-[var(--gr-ink)]">
                  {frame.caption}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="gr-filmstrip my-10" aria-hidden="true" />

      <section aria-label="The accent rule">
        <SubHeading>Playground, not circus</SubHeading>
        <Note>
          The single rule that holds the system together. Four bright colors at
          equal weight stop reading as playful and start reading as noise.
        </Note>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <figure>
            <div className="aspect-[16/10] rounded-2xl border-2 border-[var(--gr-ink)] bg-[var(--gr-cream)] p-5 flex flex-col">
              <div className="h-4 w-3/5 rounded-full bg-[var(--gr-ink)]" />
              <div className="mt-3 h-2.5 w-4/5 rounded-full bg-[var(--gr-muted)] opacity-60" />
              <div className="mt-2 h-2.5 w-2/3 rounded-full bg-[var(--gr-muted)] opacity-60" />
              <div className="mt-auto flex items-center gap-3">
                <span className="h-9 w-28 rounded-full bg-[var(--gr-pink)] border-2 border-[var(--gr-ink)]" />
                <span className="h-9 w-24 rounded-full border-2 border-[var(--gr-ink)]" />
              </div>
            </div>
            <figcaption className="mt-3 text-sm">
              <strong className="font-medium">Do:</strong> cream, charcoal and one leading accent.
            </figcaption>
          </figure>
          <figure>
            <div className="aspect-[16/10] rounded-2xl border-2 border-[var(--gr-ink)] bg-[var(--gr-blue)] p-5 flex flex-col">
              <div className="h-4 w-3/5 rounded-full bg-[var(--gr-yellow)]" />
              <div className="mt-3 h-2.5 w-4/5 rounded-full bg-[var(--gr-pink)]" />
              <div className="mt-2 h-2.5 w-2/3 rounded-full bg-[var(--gr-red)]" />
              <div className="mt-auto flex items-center gap-3">
                <span className="h-9 w-28 rounded-full bg-[var(--gr-red)] border-2 border-[var(--gr-ink)]" />
                <span className="h-9 w-24 rounded-full bg-[var(--gr-yellow)] border-2 border-[var(--gr-ink)]" />
              </div>
            </div>
            <figcaption className="mt-3 text-sm">
              <strong className="font-medium">Don't:</strong> all four primaries at full weight.
            </figcaption>
          </figure>
        </div>
      </section>

      <p className="gr-mono text-xs mt-12">
        Every color, typeface and radius in this panel comes from Gumreel's DESIGN.md.
      </p>
    </article>
  );
};

export default GumreelSpec;
