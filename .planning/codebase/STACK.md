# Technology Stack

**Analysis Date:** 2026-01-21

## Languages

**Primary:**
- TypeScript 5.5.3 - Application source code, React components, utilities
- JavaScript - Configuration files, build scripts

**Secondary:**
- HTML - Entry point templates (`index.html`)
- CSS - Tailwind utility-first styling

## Runtime

**Environment:**
- Node.js - Development and build time execution

**Package Manager:**
- npm 10+ (using package-lock.json)
- Lockfile: Present (`package-lock.json`)

## Frameworks

**Core:**
- React 18.3.1 - UI library and component framework
- React Router DOM 6.26.2 - Client-side routing and navigation
- React Hook Form 7.53.0 - Form state management and validation
- Zod 3.23.8 - TypeScript-first schema validation

**UI Components:**
- Radix UI (multiple components) - Unstyled, accessible component primitives
  - @radix-ui/react-accordion 1.2.0
  - @radix-ui/react-alert-dialog 1.1.1
  - @radix-ui/react-dialog 1.1.2
  - @radix-ui/react-dropdown-menu 2.1.1
  - @radix-ui/react-navigation-menu 1.2.0
  - @radix-ui/react-popover 1.1.1
  - @radix-ui/react-select 2.1.1
  - @radix-ui/react-tabs 1.1.0
  - @radix-ui/react-toast 1.2.1
  - @radix-ui/react-tooltip 1.1.4
  - And 20+ additional Radix UI components

- shadcn/ui - Pre-built component library built on Radix UI (custom implementations in `src/components/ui/`)

**Styling:**
- Tailwind CSS 3.4.11 - Utility-first CSS framework
- tailwindcss-animate 1.0.7 - Tailwind animation plugin
- @tailwindcss/typography 0.5.15 - Typography plugin
- class-variance-authority 0.7.1 - Type-safe CSS variant management
- tailwind-merge 2.5.2 - Merge Tailwind class names intelligently
- clsx 2.1.1 - Conditional className utilities

**Data & State:**
- TanStack React Query 5.56.2 - Server state management, data fetching, caching
- Recharts 2.12.7 - Charting and visualization library

**Forms & Input:**
- @hookform/resolvers 3.9.0 - Integration layer between React Hook Form and validation libraries
- input-otp 1.2.4 - OTP input component
- react-day-picker 8.10.1 - Date picker component

**Content & Markdown:**
- react-markdown 10.1.0 - Render markdown as React components
- remark-gfm 4.0.1 - GitHub Flavored Markdown support

**UI Utilities:**
- Lucide React 0.462.0 - Icon library
- embla-carousel-react 8.3.0 - Carousel/slider component
- react-resizable-panels 2.1.3 - Resizable panel layout
- vaul 0.9.3 - Drawer/sheet component
- next-themes 0.3.0 - Theme management (light/dark mode)
- Sonner 1.5.0 - Toast notification library

**Testing:**
- Not detected in production dependencies

**Build/Dev:**
- Vite 7.2.4 - Build tool and dev server
- @vitejs/plugin-react-swc 4.2.2 - Vite plugin for React with SWC compiler
- SWC - Fast JavaScript compiler used by Vite

**Linting & Type Checking:**
- ESLint 9.9.0 - JavaScript linter
- @eslint/js 9.9.0 - ESLint recommended config
- typescript-eslint 8.0.1 - TypeScript linting
- eslint-plugin-react-hooks 5.1.0-rc.0 - React Hooks linting
- eslint-plugin-react-refresh 0.4.9 - React Refresh rules

**CSS Processing:**
- Tailwind CSS (styling)
- PostCSS 8.4.47 - CSS transformation tool
- Autoprefixer 10.4.20 - Add vendor prefixes to CSS

**Serverless Functions:**
- @netlify/functions 5.1.2 - Netlify Functions runtime

## Key Dependencies

**Critical:**
- React 18.3.1 - Core UI library, required for all component rendering
- TypeScript 5.5.3 - Type safety and development experience
- React Router DOM 6.26.2 - Application routing and navigation
- Radix UI ecosystem - Provides accessible, unstyled component primitives
- Tailwind CSS 3.4.11 - Styling engine for the entire application
- React Hook Form 7.53.0 - Contact form submission
- Resend 6.6.0 - Email service for contact form
- @netlify/functions 5.1.2 - Serverless function runtime for contact email handler

**Infrastructure:**
- Vite 7.2.4 - Dev server and production bundler
- ESLint + TypeScript ESLint - Code quality
- TanStack React Query 5.56.2 - Data fetching (prepared but minimal usage)

## Configuration

**Environment:**
- `.env` file for local development
- `RESEND_API_KEY` - Required for email sending via Resend
- Netlify-specific env vars loaded at function runtime

**Build:**
- `vite.config.ts` - Vite configuration with React SWC plugin and path alias (`@/` → `./src/`)
- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.app.json` - App-specific TypeScript settings (ES2020, React JSX, strict: false)
- `tsconfig.node.json` - Build tool TypeScript settings
- `tailwind.config.ts` - Tailwind theme customization with dark mode, custom colors (neon #3DF584), animations
- `postcss.config.js` - PostCSS configuration for Tailwind
- `eslint.config.js` - ESLint rules for React and TypeScript
- `components.json` - Component library configuration
- `netlify.toml` - Netlify build and deployment configuration

**Dev Server:**
- Vite dev server on port 8080
- Hot Module Replacement (HMR) enabled

## Platform Requirements

**Development:**
- Node.js (version from `.nvmrc` if present, otherwise latest LTS)
- npm or compatible package manager
- Modern browser (Chrome, Firefox, Safari, Edge)

**Production:**
- Deployment target: Netlify
- Build output: `dist/` directory
- Node.js available for serverless functions (Netlify Functions)

## Monorepo/Multi-Package Structure

**Not applicable** - Single package structure

## Known Version Constraints

- React 18.3.1+ (established modern React API)
- TypeScript 5.5.3+ (ES2020 target)
- Node.js compatible with ES2020 and ESM modules
- Vite 7.2.4+ (latest stable)

---

*Stack analysis: 2026-01-21*
