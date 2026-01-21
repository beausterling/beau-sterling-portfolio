# Architecture

**Analysis Date:** 2026-01-21

## Pattern Overview

**Overall:** Client-heavy SPA (Single Page Application) with minimal backend server logic. This is a portfolio/showcase site with Vite-based frontend and optional serverless functions for email handling.

**Key Characteristics:**
- React 18 with TypeScript for type-safe components
- Client-side routing via React Router (SPA pattern)
- Server-side rendering not used; static HTML entry point
- Serverless Netlify Functions for backend email handling
- No persistent database; stateless operations
- External service integrations (Resend for email, Google Gemini for AI, Strudel for audio)

## Layers

**Presentation Layer (UI Components):**
- Purpose: Render visual interface and handle user interactions
- Location: `src/components/`
- Contains: Page sections (Hero, Projects, Films, About, Contact), UI primitives (buttons, forms, dialogs), playground components
- Depends on: React, Lucide icons, Tailwind CSS, custom hooks, utility functions
- Used by: Pages, App router

**Page/Route Layer:**
- Purpose: Compose sections into full page views, handle route-level logic
- Location: `src/pages/`
- Contains: Index (homepage), CursorPlayground (interactive playground), NotFound (404)
- Depends on: Components, hooks, React Router
- Used by: App.tsx for routing

**Application Layer (Root):**
- Purpose: Setup providers, routing, global state management
- Location: `src/App.tsx`
- Contains: BrowserRouter setup, QueryClientProvider (TanStack React Query), TooltipProvider, Toasters (UI notifications)
- Depends on: All pages, React Router DOM, TanStack React Query
- Used by: main.tsx entry point

**Hooks Layer (Custom Logic):**
- Purpose: Encapsulate stateful logic and external library integrations
- Location: `src/hooks/`
- Contains: useStrudel (Strudel audio library wrapper), useToast (notification system), useMobile (responsive breakpoint detection)
- Depends on: React hooks (useState, useEffect, useCallback, useRef), external libraries (Strudel audio, window APIs)
- Used by: Components throughout the app

**Utilities & Constants Layer:**
- Purpose: Shared helper functions and configuration data
- Location: `src/lib/`
- Contains: utils.ts (cn() - class name merger), music-presets.ts (predefined Strudel patterns)
- Depends on: clsx, tailwind-merge
- Used by: Components and pages

**Styling Layer:**
- Purpose: Design tokens, animations, responsive utilities
- Location: Tailwind CSS config, index.css (global styles)
- Files: `tailwind.config.ts`, `src/index.css`
- Contains: Custom CSS variables (--neon color), animations (animate-fade-in, animate-glow-slow), dark mode configuration
- Used by: All components via class names

**Backend Layer (Serverless):**
- Purpose: Handle server-side operations (email sending)
- Location: `netlify/functions/`
- Contains: send-contact-email.ts (Netlify Function)
- Depends on: Resend (email service), Node.js runtime
- Used by: Contact component via HTTP POST to `/.netlify/functions/send-contact-email`

## Data Flow

**Homepage Render:**

1. User navigates to `/` → Router matches Index page
2. Index page imports and composes sections: Navbar, Hero, Projects, Films, About, Contact, Footer
3. Each section is a self-contained component with internal state
4. Projects section iterates over hardcoded data array, renders ProjectCard for each
5. ProjectCard handles video embedding/external link logic, passes data to sub-components
6. On page load, fade-in animations trigger via CSS (animate-fade-in with staggered delays)

**Contact Form Submission:**

1. User fills contact form in Contact component
2. handleSubmit collects form data (name, email, message)
3. Client POSTs to `/.netlify/functions/send-contact-email` with JSON body
4. Netlify Function validates input, checks rate limit, sanitizes content
5. Function sends two emails via Resend API:
   - Notification email to beaujsterling@gmail.com (with form data)
   - Confirmation email to user (with thank you message)
6. Client receives response, shows toast notification (success or error)
7. Form resets on success

**Music Playground Flow:**

1. User navigates to `/playground#music`
2. CursorPlayground page loads, routes to MusicPlayground component
3. useStrudel hook initializes on mount:
   - Dynamically loads Strudel library from CDN (unpkg @strudel/web@1.0.3)
   - Awaits window.initStrudel() to be available
   - Sets up Web Audio context
4. MusicPlayground loads saved pattern from localStorage (if exists)
5. PresetSelector allows user to select from musicPresets array
6. User can edit pattern in textarea, button click calls evaluatePattern()
7. evaluatePattern uses Function constructor to safely evaluate Strudel pattern code
8. Pattern.play() returns control object to manage playback
9. window.hush() stops playback; window.webaudioOutput controls volume
10. Pattern persists to localStorage on change

**State Management:**

- **Client-side state:** React hooks (useState, useRef) within components
- **Query state:** TanStack React Query for managing async operations (currently not heavily used)
- **Persistent state:** localStorage for music playground patterns
- **No global state library:** No Redux, Zustand, or Context API for complex state; props drilling acceptable for this app scale
- **Form state:** Local useState in Contact component (uncontrolled initially, becomes controlled via onChange)

## Key Abstractions

**ProjectCard Component:**
- Purpose: Reusable display and interaction handler for portfolio projects
- Examples: `src/components/ProjectCard.tsx`
- Pattern: Props-based composition, video embed logic with conditional rendering, hover effects via Tailwind groups
- Handles: Image clicks, external link opens, video dialog modals, technology tag display

**useStrudel Custom Hook:**
- Purpose: Wrap Strudel audio library with React state management
- Examples: `src/hooks/useStrudel.ts`
- Pattern: Effect-based initialization, ref-based playback control, error handling with typed interface
- Exposes: isPlaying, isLoading, error, volume, play(), stop(), setVolume(), evaluatePattern(), strudelReady

**UI Component Library (shadcn/ui):**
- Purpose: Pre-built, unstyled Radix UI components (Dialog, Tabs, Button, etc.)
- Examples: `src/components/ui/` (60+ components)
- Pattern: Wrapped Radix UI primitives with Tailwind styling, exported as React components
- Uses: clsx + tailwind-merge for dynamic class merging

**cn() Utility:**
- Purpose: Merge Tailwind classes and handle class conflicts
- Examples: `src/lib/utils.ts`
- Pattern: Combines clsx (for conditional classes) and tailwindcss-merge (to resolve Tailwind specificity)
- Used in: ProjectCard hover/reverse logic, modal styling

## Entry Points

**HTML Entry Point:**
- Location: `index.html`
- Triggers: Served by Vite dev server or static hosting (Netlify)
- Responsibilities: Define viewport meta tags, SEO tags (og:, twitter:), favicon, mount React root div

**React Entry Point:**
- Location: `src/main.tsx`
- Triggers: Called by index.html script tag
- Responsibilities: Create React root, render App component to #root DOM element

**App Router Entry Point:**
- Location: `src/App.tsx`
- Triggers: Loaded by main.tsx
- Responsibilities: Wrap routes in providers (QueryClientProvider, TooltipProvider, Toaster, BrowserRouter), define route paths and components

**Page Entry Points:**
- Location: `src/pages/*.tsx`
- Triggers: Route matches (e.g., "/" → Index)
- Responsibilities: Compose section components, apply page-level styling (min-h-screen, bg-dark)

**Netlify Function Entry Point:**
- Location: `netlify/functions/send-contact-email.ts`
- Triggers: HTTP POST to `/.netlify/functions/send-contact-email`
- Responsibilities: Validate input, rate limit, send emails via Resend, return JSON response

## Error Handling

**Strategy:** Try-catch at critical points, fallbacks for missing data, user-facing toast notifications

**Patterns:**

- **Contact form:** Catches network errors, Resend API errors, displays user-friendly toast messages. Honeypot field silently accepts bot submissions (no error shown).
- **Strudel initialization:** Catches script load failures, init errors; stores error state and displays in UI. Loading state shown while initializing.
- **Pattern evaluation:** Catches JavaScript syntax errors in Strudel code; displays error message in UI (e.g., "Pattern syntax error: ...").
- **Rate limiting:** Netlify Function returns 429 status with Retry-After header. Client catches and shows "too many requests" message.
- **API errors:** Resend API errors logged server-side; generic error message sent to client to avoid leaking sensitive info.

## Cross-Cutting Concerns

**Logging:**
- Browser console.log/console.error for client-side debugging
- Netlify Function server logs for backend operations
- Example: useStrudel logs "[Strudel]" prefixed messages for tracking audio state

**Validation:**
- Client-side: HTML5 form validation (required attributes, type="email")
- Server-side: Strict input validation in send-contact-email.ts (email regex, length checks, honeypot field check)
- Sanitization: Basic XSS prevention via regex removal of `<>`, `javascript:`, `on*=` patterns

**Authentication:**
- No user authentication; portfolio is public
- API Key security: Resend API key stored in environment variable (RESEND_API_KEY), only used server-side
- CORS: Netlify Function allows all origins via Access-Control-Allow-Origin: * (acceptable for public contact form)

---

*Architecture analysis: 2026-01-21*
