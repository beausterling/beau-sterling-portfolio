import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import GumreelSpec from "@/components/design/GumreelSpec";
import AgentSystem from "@/components/design/AgentSystem";
import ScreenFrame from "@/components/design/ScreenFrame";

const Footer = lazy(() => import("@/components/Footer"));

const gumreelScreens = [
  {
    src: "/assets/design/gumreel-home.webp",
    url: "gumreel.ai",
    alt: "Gumreel home page: a Fraunces italic headline, rotated stickers, and a filmstrip running under the logo",
    note: "The home page puts the whole system on one screen: an italic headline, three stickers knocked slightly off-axis, and a filmstrip carrying the brand colors under the logo.",
  },
  {
    src: "/assets/design/gumreel-datamorph.webp",
    url: "gumreel.ai/labs/datamorph",
    alt: "Datamorph, Gumreel's WebGL effects editor, with aspect ratio chips set in mono",
    note: "Datamorph is a real-time WebGL effects editor. A different kind of tool, same rules: pill chips, mono for settings, one display headline.",
  },
  {
    src: "/assets/design/gumreel-sign-in.webp",
    url: "gumreel.ai/sign-in",
    alt: "Gumreel sign-in page framed by perforated filmstrip edges",
    note: "Even sign-in gets the filmstrip. Perforated edges frame a standard auth form so it still feels like part of the reel.",
  },
  {
    src: "/assets/design/gumreel-under-construction.webp",
    url: "gumreel.ai/product-ad",
    alt: "Product Ad under construction: hazard tape, a film reel hanging like a wrecking ball, and buttons to other tools",
    note: "When Product Ad went down for a rebuild, the outage got designed too: hazard tape, a film reel on a crane, a progress bar, and two other tools to use in the meantime.",
  },
];

const range = [
  {
    name: "ideascower",
    src: "/assets/design/ideascower.webp",
    url: "ideascower.com",
    href: "https://ideascower.com/",
    alt: "ideascower: a dark newspaper layout presenting a doomed startup idea and its fatal flaw",
    note: "A daily newspaper for doomed startup ideas. Serif mastheads, an issue number, a countdown to the next disaster, and the pitch set against its fatal flaw in green and red.",
  },
  {
    name: "CustomWispr",
    src: "/assets/design/customwispr.webp",
    url: "customwispr.com",
    href: "https://customwispr.com/",
    alt: "CustomWispr: a macro photo of a microphone grille behind the headline Talk. It types.",
    note: "A free dictation app, so the page leads with the thing you talk into: a close-up of a microphone grille behind a two-beat headline.",
  },
  {
    name: "Moon Rhythms",
    src: "/assets/design/moon-rhythms.webp",
    url: "moonrhythms.io",
    href: "https://moonrhythms.io/",
    alt: "Moon Rhythms: the moon in its current phase on a starfield, with a date timeline beneath it",
    note: "The moon as it looks right now, over a date timeline. The interface stays dark and quiet so the moon does the talking.",
  },
  {
    name: "InBound Ready",
    src: "/assets/design/inboundready.webp",
    url: "inboundready.com",
    href: "https://inboundready.com/",
    alt: "InBound Ready: an emergency-red headline and a rotary phone badge",
    note: "An AI receptionist for small businesses. Emergency red and a rotary phone badge make the stakes plain: a missed call is a lost customer.",
  },
];

const DesignPage = () => {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <main>
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-neon transition-colors mb-8"
            >
              <ArrowLeft size={18} />
              Back to home
            </Link>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">Design</h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-[62ch]">
              I design in the browser and ship what I design. Every interface on
              this page was designed and built by me, start to finish. For
              Gumreel, my AI video platform, I wrote the design system down first,
              as a file my coding agents read before they touch the interface.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <GumreelSpec />
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto px-4 md:px-8">
            <AgentSystem />
          </div>
        </section>

        <section className="pb-24" aria-labelledby="shipped-title">
          <div className="container mx-auto px-4 md:px-8">
            <h2 id="shipped-title" className="text-3xl md:text-4xl font-bold mb-4">
              The system in the shipped product
            </h2>
            <p className="text-gray-300 leading-relaxed max-w-[60ch] mb-12">
              Live screens from gumreel.ai. The same tokens and rules hold across a
              marketing page, a WebGL editor, sign-in, and an outage.
            </p>
            <ul className="grid gap-x-10 gap-y-14 md:grid-cols-2">
              {gumreelScreens.map((screen) => (
                <li key={screen.src}>
                  <ScreenFrame src={screen.src} alt={screen.alt} url={screen.url} href={`https://${screen.url}`} />
                  <p className="mt-4 text-gray-300 leading-relaxed max-w-[56ch]">{screen.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pb-24" aria-labelledby="range-title">
          <div className="container mx-auto px-4 md:px-8">
            <h2 id="range-title" className="text-3xl md:text-4xl font-bold mb-4">
              Each product gets its own look
            </h2>
            <p className="text-gray-300 leading-relaxed max-w-[60ch] mb-12">
              I start from what the product is about, not from a template. The
              visual idea should be obvious in the first second.
            </p>
            <ul className="grid gap-x-10 gap-y-16 md:grid-cols-12">
              {range.map((item, index) => (
                <li
                  key={item.name}
                  className={
                    index % 2 === 0
                      ? "md:col-span-7"
                      : "md:col-span-5 md:mt-24"
                  }
                >
                  <ScreenFrame src={item.src} alt={item.alt} url={item.url} href={item.href} />
                  <h3 className="mt-5 text-xl font-bold text-neon">{item.name}</h3>
                  <p className="mt-2 text-gray-300 leading-relaxed max-w-[56ch]">{item.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pb-32">
          <div className="container mx-auto px-4 md:px-8">
            <div className="border-t border-gray-800 pt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p className="text-xl text-gray-200 max-w-[40ch]">
                The engineering behind these lives on the products page.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="px-6 py-3 rounded-full bg-neon text-dark font-semibold hover:bg-neon-glow transition-colors"
                >
                  See my products
                </Link>
                <a
                  href="/#films"
                  className="px-6 py-3 rounded-full border border-gray-700 text-gray-200 hover:border-neon hover:text-neon transition-colors"
                >
                  Watch my films
                </a>
                <a
                  href="/#contact"
                  className="px-6 py-3 rounded-full border border-gray-700 text-gray-200 hover:border-neon hover:text-neon transition-colors"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default DesignPage;
