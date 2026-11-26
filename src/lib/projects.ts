export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveDemoUrl?: string;
  liveDemoLabel?: string;
  githubUrl?: string;
  websiteUrl?: string;
  websiteLabel?: string;
  hackathonUrl?: string;
  isVideo?: boolean;
  embedVideo?: boolean;
}

export const projects: Project[] = [
  {
    title: "Splainer",
    description:
      "An AI explainer video studio, live with paid plans. Splainer writes, voices and animates a 15 to 60 second explainer for any business, in an animation style designed only for that brand, with no footage, editor or agency. Every customer gets their own design system instead of a shared template, and every video can render in both vertical (for TikTok, Reels, Shorts, X and LinkedIn) and wide (for websites and YouTube), with each scene laid out per format rather than cropped. Text stays inside a safe zone I measured across all five vertical platforms. I built it solo for the $100K Ship or Die hackathon, where the winner is ranked on verified profit.",
    image: "/assets/splainer.webp",
    technologies: [
      "Next.js",
      "React",
      "Claude",
      "HyperFrames",
      "GSAP",
      "ElevenLabs",
      "Modal",
      "Stripe",
      "Vercel",
    ],
    websiteUrl: "https://splainer.video",
  },
  {
    title: "drip - AI Water Usage Meter",
    description:
      "A free, open-source tool that estimates how much water your AI coding agent uses, live in your terminal. drip reads Claude Code and Codex CLI's local logs for real token counts, converts them to energy and then to water with low, mid and high estimates, and cites the published research behind every coefficient. It shows up in the Claude Code status line, as a split-pane meter (a filling bottle in a tall pane), or as a browser breakdown with the math step by step, 30 days of history and a shareable stats card. Everything stays on your machine: no accounts, no telemetry, and no dependencies beyond Python's standard library.",
    image: "/assets/drip.webp",
    technologies: [
      "Python",
      "SQLite",
      "Claude Code",
      "Codex CLI",
      "iTerm2",
      "Ghostty",
      "tmux",
    ],
    githubUrl: "https://github.com/beausterling/drip-ai-water-usage",
  },
  {
    title: "YT Clip - Chrome Extension",
    description:
      "A free, open-source Chrome extension that adds a Download / Clip button under any YouTube video. Save the full audio or video, or cut a frame-accurate clip between two timestamps, and the file lands in your Downloads folder. I built it to pull sound effects from YouTube for my own video edits, and when I shared it on Instagram the post passed 60,000 views. Under the hood, a zero-dependency Node server wraps yt-dlp and FFmpeg, works through four download strategies cheapest first, remembers which one succeeded, and shows live progress, speed, and a countdown instead of a spinner.",
    image: "/assets/yt-clip.webp",
    technologies: [
      "JavaScript",
      "Chrome Extension (MV3)",
      "Node.js",
      "yt-dlp",
      "FFmpeg",
      "launchd",
    ],
    githubUrl: "https://github.com/beausterling/yt-clip",
    websiteUrl: "https://beausterling.gumroad.com/l/ytclip",
    websiteLabel: "Get it on Gumroad",
  },
  {
    title: "Gumreel",
    description:
      "An AI video toolkit and creative generation platform, live with paid plans. Gumfield puts 26 image and video models from OpenAI, Google, ByteDance, Kuaishou, Alibaba, xAI and more behind one interface, with per-model settings, a drag-and-drop reference tray, in-browser video trimming, and a gallery. Product Ad turns any product URL into a research-backed video ad, Clip Stitch repairs the seams between chained AI clips so they play as one continuous shot, and Datamorph is a real-time WebGL effects editor. I designed and built the whole platform solo, including a credit system that reserves credits on submit and refunds them automatically when a generation fails.",
    image: "/assets/gumreel.webp",
    technologies: [
      "Next.js",
      "React",
      "Supabase",
      "Clerk",
      "Stripe",
      "OpenAI",
      "Anthropic",
      "Seedance",
      "Kling",
      "WebGL",
    ],
    liveDemoUrl: "https://youtu.be/qa9cphUV9Cg",
    liveDemoLabel: "Product Ad Demo",
    websiteUrl: "https://gumreel.ai",
    isVideo: true,
  },
  {
    title: "ShopWell - Chrome Extension",
    description:
      "A free Chrome extension that helps people with chronic conditions shop safely online by using on-device AI to analyze product ingredients, allergens, and materials on Amazon and Walmart. Built for the chronic illness community, it provides condition-aware analysis for POTS, ME/CFS, and Celiac Disease while scanning for nine major allergens—all with guaranteed privacy since processing happens locally on your device.",
    image: "/assets/shop-well.webp",
    technologies: [
      "Chrome-AI",
      "JavaScript",
      "Node.js",
      "Google Cloud Functions",
      "Google Sheets API",
      "esbuild",
      "Netlify",
    ],
    liveDemoUrl: "https://youtu.be/7qUNzIpvn9U?si=l88PY6CmemLe3m_V",
    githubUrl: "https://github.com/beausterling/shop-well-extension",
    websiteUrl: "https://shopwell-extension.com/",
    hackathonUrl: "https://devpost.com/software/shop-well",
    isVideo: true,
  },
  {
    title: "Moon Rhythms",
    description:
      "A wellness application that syncs users' self-care routines with lunar cycles. It features real-time moon position and phase tracking, a birth chart calculator powered by the Swiss Ephemeris library for professional-grade astronomical precision, and saved user profiles for personal astrological data. Still in active development, it will take a user's birth data to generate complete astrological and human design profiles, then use that data to power a highly personalized life coach and relationship advisor. I am submitting this as my honors project for the Nucamp Full Stack Coding Bootcamp 2026.",
    image: "/assets/moon-rhythms.webp",
    technologies: [
      "Next.js",
      "React Native",
      "Supabase",
      "Swiss Ephemeris",
      "Claude Code",
    ],
    liveDemoUrl: "https://youtu.be/K0qsH8Vq9w0",
    liveDemoLabel: "Live Demo",
    websiteUrl: "https://moonrhythms.io/",
    githubUrl: "#",
    isVideo: true,
  },
  {
    title: "InBound Ready",
    description:
      "A full AI-powered receptionist service that answers business phone calls 24/7/365. It handles customer inquiries, books appointments by syncing with calendars in real-time, detects and routes urgent calls, and answers FAQs — all with natural conversation, no robotic scripts. Built to solve the silent revenue leak of missed calls for small businesses like medical practices, law firms, and service companies.",
    image: "/assets/inboundready-og.webp",
    technologies: [
      "Vapi",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Supabase",
      "n8n",
    ],
    githubUrl: "https://github.com/beausterling/InBoundReady",
    websiteUrl: "https://inboundready.com/",
  },
  {
    title: "VibeCheck-It",
    description:
      "A messaging analysis platform, that helps users understand their communication patterns and improve digital relationships across different channels. It includes a free demo on the home page and paid reports. The next phase will be a MacOS desktop app that integrates with iMessage and other messaging platforms.",
    image: "/assets/3b170fdd-53d9-4427-ae77-525fda6f775b.webp",
    technologies: [
      "Vite",
      "TypeScript",
      "React",
      "TailwindCSS",
      "OpenAI",
      "Supabase",
    ],
    liveDemoUrl: "https://www.youtube.com/watch?v=EDiJC-QUxVc&t=137",
    websiteUrl: "https://vibecheckit.com/",
    githubUrl: "#",
    isVideo: true,
  },
  {
    title: "CustomWispr",
    description:
      "A free, open-source macOS menu bar app for speech-to-text. Hold the fn key to talk, release to transcribe — your words appear instantly, cleaned up, formatted, and ready. Powered by OpenAI Whisper + GPT with AI-powered filler word removal, customizable find-and-replace rules, and a floating overlay UI. Pure Swift, no Electron, no dependencies.",
    image: "/assets/customwispr.webp",
    technologies: [
      "Swift",
      "macOS",
      "OpenAI Whisper",
      "GPT-4o-mini",
      "AVAudioEngine",
    ],
    liveDemoUrl: "https://www.instagram.com/p/DVVPstbjUfS/",
    liveDemoLabel: "Demo Video",
    githubUrl: "https://github.com/beausterling/CustomWispr",
    websiteUrl: "https://customwispr.com",
  },
  {
    title: "OpenClaw Draws",
    description:
      "A real-time collaborative art platform where AI bots take turns placing pixel art tiles on a shared canvas. Users register bots with unique personalities, match them with other bots, and spectate as they co-create artwork — with completed pieces preserved in a public gallery.",
    image: "/assets/openclawdraws.webp",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Convex",
      "Clerk",
      "Anthropic",
      "OpenAI",
      "Stripe",
      "TailwindCSS",
      "PostHog",
    ],
    websiteUrl: "https://openclawdraws.com/",
  },
  {
    title: "ideascower.com",
    description:
      "A satirical 'anti-incubator' web app that uses AI to humorously critique and deconstruct startup ideas. Featuring a dark cyberpunk aesthetic with custom animations, it generates daily 'doomed' startup concepts and provides entertaining fatal flaw analyses powered by Google Gemini.",
    image: "/assets/ideascower.mp4",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "TailwindCSS",
      "Supabase",
      "Google Gemini",
      "Deno",
    ],
    websiteUrl: "https://ideascower.com/",
    githubUrl: "https://github.com/beausterling/ideascower",
  },
  {
    title: "MyFutrSelf",
    description:
      "An AI Accountability app that allows users to talk to their future self who is designed to keep them accountable to their goals. The app creates personalized conversations with your future self to help maintain motivation and track progress towards your aspirations.",
    image: "/assets/b83d40ad-af6e-4c22-9abf-96712d97b931.webp",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "TailwindCSS",
      "Supabase",
      "OpenAI",
      "ElevenLabs",
      "Clerk",
    ],
    liveDemoUrl: "https://youtu.be/a5tNo3M3Lv0",
    liveDemoLabel: "Teaser",
    githubUrl: "https://github.com/beausterling/myfutrself-newest",
    websiteUrl: "https://myfutrself.com/",
    hackathonUrl: "https://devpost.com/software/myfutrself",
    isVideo: true,
  },
  {
    title: "Sales-Maxing",
    description:
      "An AI-powered sales analytics platform that helps small businesses optimize their sales processes. The main feature is a call interface that records your conversation with the client or prospect, transcribes the audio, sends the conversation to Anthropic for analysis, and gets back a detailed feedback summary within seconds. The MVP for this was created for a 24-hour hackathon competition.",
    image: "/assets/cbf30c20-d99b-4e9f-be19-822329622344.webp",
    technologies: [
      "React",
      "TypeScript",
      "ElevenLabs",
      "Anthropic",
      "Supabase",
      "Lovable",
    ],
    liveDemoUrl:
      "https://www.loom.com/share/14c492efe1df474285bcfc1fdb4abd34",
    websiteUrl: "https://sales-maxing.lovable.app/",
    githubUrl: "#",
    isVideo: true,
    embedVideo: true,
  },
];

export const featuredProjects = projects.slice(0, 5);
