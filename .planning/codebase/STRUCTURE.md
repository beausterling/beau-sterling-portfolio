# Codebase Structure

**Analysis Date:** 2026-01-21

## Directory Layout

```
beau-sterling-portfolio/
├── src/                      # Client-side React application
│   ├── App.tsx              # Root component with routing and providers
│   ├── main.tsx             # React DOM entry point
│   ├── index.css            # Global styles and CSS variables
│   ├── vite-env.d.ts        # Vite type definitions
│   ├── components/          # React components
│   │   ├── playground/      # Interactive playground components
│   │   │   ├── MusicPlayground/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── PlaybackControls.tsx
│   │   │   │   ├── PresetSelector.tsx
│   │   │   │   ├── AudioVisualizer.tsx
│   │   │   │   └── HelpPanel.tsx
│   │   │   └── CursorEffects.tsx
│   │   ├── ui/              # shadcn/ui components (60+ components)
│   │   ├── About.tsx        # About section
│   │   ├── Contact.tsx      # Contact form section
│   │   ├── Films.tsx        # Films showcase section
│   │   ├── Footer.tsx       # Footer section
│   │   ├── Hero.tsx         # Hero banner section
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── ProjectCard.tsx  # Reusable project card component
│   │   └── Projects.tsx     # Projects showcase section
│   ├── hooks/               # Custom React hooks
│   │   ├── useStrudel.ts    # Strudel audio library wrapper
│   │   ├── useMobile.tsx    # Mobile breakpoint detection
│   │   └── use-toast.ts     # Toast notification hook
│   ├── lib/                 # Utilities and constants
│   │   ├── utils.ts         # Helper functions (cn class merger)
│   │   └── music-presets.ts # Predefined Strudel music patterns
│   └── pages/               # Page/route components
│       ├── Index.tsx        # Homepage layout
│       ├── CursorPlayground.tsx  # Playground page with tabs
│       └── NotFound.tsx     # 404 page
├── netlify/                 # Serverless backend
│   └── functions/
│       └── send-contact-email.ts  # Netlify Function for email
├── public/                  # Static assets
│   └── assets/              # Images, GIFs, videos
├── dist/                    # Build output (generated)
├── index.html               # HTML entry point
├── vite.config.ts           # Vite build configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript base configuration
├── tsconfig.app.json        # TypeScript app configuration
├── tsconfig.node.json       # TypeScript Node configuration
├── package.json             # Dependencies and scripts
├── package-lock.json        # Locked dependency versions
├── eslint.config.js         # ESLint configuration
├── postcss.config.js        # PostCSS configuration
├── netlify.toml             # Netlify deployment configuration
├── components.json          # shadcn/ui component configuration
├── .env                     # Environment variables (git ignored)
└── .gitignore               # Git ignore rules
```

## Directory Purposes

**src/:**
- Purpose: All client-side TypeScript/React source code
- Contains: React components, hooks, utilities, styles
- Key files: App.tsx (root), main.tsx (entry), index.css (globals)

**src/components/:**
- Purpose: Reusable React components organized by feature
- Contains: Section components (Hero, Projects, Contact), UI primitives, playground interactive components
- Key files: ProjectCard.tsx (reusable), Hero.tsx, Projects.tsx, Contact.tsx

**src/components/ui/:**
- Purpose: Pre-built shadcn/ui components (Radix UI wrapped with Tailwind)
- Contains: 60+ components (Dialog, Tabs, Button, Input, Form, etc.)
- Generated: Yes (added via `npx shadcn-ui@latest add` commands)
- Committed: Yes (source included in repo)

**src/components/playground/:**
- Purpose: Interactive demo components for experimentation
- Contains: MusicPlayground (Strudel audio editor), CursorEffects (cursor tracking effects)
- Key files: MusicPlayground/index.tsx (main component), related sub-components

**src/hooks/:**
- Purpose: Custom React hooks for reusable stateful logic
- Contains: useStrudel (audio library wrapper), useMobile (responsive hook), use-toast (notifications)
- Key files: useStrudel.ts (complex external library integration)

**src/lib/:**
- Purpose: Shared utilities, constants, and helper functions
- Contains: cn() for class merging, music preset definitions
- Key files: utils.ts (cn function), music-presets.ts (Strudel patterns)

**src/pages/:**
- Purpose: Full-page components that serve as route destinations
- Contains: Index (homepage), CursorPlayground (interactive page), NotFound (404)
- Key files: Index.tsx (main landing page)

**netlify/functions/:**
- Purpose: Serverless backend functions deployed on Netlify
- Contains: send-contact-email.ts for handling form submissions
- Key files: send-contact-email.ts (email sending with validation, rate limiting)

**public/assets/:**
- Purpose: Static images, GIFs, videos, favicon
- Contains: Project screenshots, portfolio images, animated GIFs
- Examples: ideascower-gif.gif, og-image.png, profile images

**dist/:**
- Purpose: Build output directory (generated by Vite)
- Generated: Yes (vite build command)
- Committed: No (listed in .gitignore)
- Contains: Minified HTML, JS, CSS bundles

## Key File Locations

**Entry Points:**
- `index.html`: Initial HTML loaded by browser, contains #root div and script reference
- `src/main.tsx`: React entry point, mounts App to DOM
- `src/App.tsx`: Application root with routing and providers

**Configuration:**
- `vite.config.ts`: Vite build config (alias @=src, React plugin, dev server settings)
- `tsconfig.json`: TypeScript compiler options (baseUrl, paths for @ alias)
- `tailwind.config.ts`: Tailwind theme customization (colors, animations, dark mode)
- `netlify.toml`: Netlify deployment config (build command, publish directory, functions)
- `.env`: Environment variables (RESEND_API_KEY for email service)

**Core Logic:**
- `src/components/Hero.tsx`: Landing section with call-to-action buttons
- `src/components/Projects.tsx`: Projects list with hardcoded data array
- `src/components/ProjectCard.tsx`: Individual project display with video/link handling
- `src/components/Contact.tsx`: Contact form with Honeypot spam protection
- `src/hooks/useStrudel.ts`: Complex audio library integration with state management
- `netlify/functions/send-contact-email.ts`: Email sending with validation and rate limiting

**Testing:**
- Not applicable - no test files present in codebase

**Styling & Theme:**
- `src/index.css`: Global styles, CSS variables (--neon, --dark, --dark-secondary), animations
- `tailwind.config.ts`: Tailwind theme config with custom animations (animate-fade-in, animate-glow-slow)

## Naming Conventions

**Files:**
- Components: PascalCase (Hero.tsx, ProjectCard.tsx, MusicPlayground/index.tsx)
- Utilities/constants: camelCase (utils.ts, music-presets.ts, useStrudel.ts)
- Pages: PascalCase matching route (Index.tsx, CursorPlayground.tsx, NotFound.tsx)
- Functions: camelCase (send-contact-email.ts for Netlify)
- Config: kebab-case (vite.config.ts, tsconfig.app.json, eslint.config.js)

**Directories:**
- Feature/section directories: camelCase or lowercase (components, hooks, lib, pages, playground)
- UI library directory: ui/ (shadcn convention)
- Utility directory: lib/ (common convention)
- Build output: dist/ (Vite default)
- Backend: netlify/functions/ (Netlify convention)

**React Components:**
- Function names: PascalCase matching file name (Hero component in Hero.tsx)
- Props interfaces: Append "Props" suffix (ProjectCardProps in ProjectCard.tsx)
- Hooks: useXxx naming pattern (useStrudel, useToast, useMobile)
- Custom types: TypeScript interfaces and types (UseStrudelReturn, MusicPreset)

**Variables & Functions:**
- Constants: UPPER_SNAKE_CASE for globals (RATE_LIMIT_WINDOW_MS, MAX_REQUESTS_PER_WINDOW in send-contact-email.ts)
- Variables: camelCase (currentPattern, isPlaying, selectedTrack)
- Event handlers: handleXxx pattern (handleSubmit, handleImageClick, handleTabChange)
- Getters: getXxx pattern (getTabFromHash, getEmbedUrl, getAudioContext)

## Where to Add New Code

**New Feature (e.g., Blog section):**
- Primary code: `src/components/Blog.tsx` (main section component)
- Sub-components: `src/components/BlogCard.tsx` (if reusable)
- Add route in: `src/App.tsx` (add Route element)
- Add to page: `src/pages/Index.tsx` (import and include in main layout)

**New Component/Module:**
- Implementation: `src/components/[FeatureName].tsx` for UI sections
- Implementation: `src/components/[SubCategory]/[ComponentName].tsx` for grouped components
- Example: Interactive tool → `src/components/tools/[ToolName].tsx`

**Utilities & Helpers:**
- Shared helpers: `src/lib/utils.ts` (or create `src/lib/[category].ts` if > 100 lines)
- Constants: `src/lib/constants.ts` (if new constants file needed)
- Example: Music presets pattern: `src/lib/music-presets.ts`

**Custom Hooks:**
- New hook: `src/hooks/useXxx.ts` or `src/hooks/useXxx.tsx`
- Follow pattern: Export named function, return typed object (interface UseXxxReturn)
- Example: `src/hooks/useAudioPlayer.ts` for audio functionality

**Backend Functions:**
- New Netlify Function: `netlify/functions/function-name.ts`
- Follow pattern: Use Handler type, return object with statusCode and body
- Example: `netlify/functions/send-email.ts` (already exists)

**Styling:**
- Component-level Tailwind: Use className inline in JSX
- Global styles: Add to `src/index.css` (CSS variables, @keyframes)
- Theme tokens: Add to `tailwind.config.ts` (colors, animations, sizing)
- Example: New animation → add to tailwind.config.ts extends, use as className

**Pages/Routes:**
- New page: `src/pages/NewPage.tsx`
- Add route: `src/App.tsx` → add Route element
- Link to page: Update navigation in Navbar or add links in existing pages

**Static Assets:**
- Images/GIFs: Place in `public/assets/[category]/`
- Example: New project image → `public/assets/projects/project-name.png`
- Reference in code: `/assets/projects/project-name.png` (from project root)

## Special Directories

**src/components/ui/:**
- Purpose: Generated shadcn/ui component library
- Generated: Yes (via npx shadcn-ui add [component])
- Committed: Yes (source code committed to repo)
- Maintenance: Do not edit directly; regenerate components when updating versions

**dist/:**
- Purpose: Production build output
- Generated: Yes (via vite build)
- Committed: No (in .gitignore)
- Contents: Minified/optimized HTML, CSS, JavaScript bundles

**node_modules/:**
- Purpose: Installed npm dependencies
- Generated: Yes (via npm install from package-lock.json)
- Committed: No (in .gitignore)
- Size: ~350MB (standard for React project)

**.netlify/:**
- Purpose: Netlify build cache and metadata
- Generated: Yes (by Netlify CI/CD)
- Committed: No (in .gitignore)
- Contents: Build logs, function metadata, cache files

**.planning/codebase/:**
- Purpose: Analysis documents for code mapper and executor
- Generated: No (written by GSD mapper)
- Committed: Yes
- Contents: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, STACK.md, INTEGRATIONS.md, CONCERNS.md

---

*Structure analysis: 2026-01-21*
