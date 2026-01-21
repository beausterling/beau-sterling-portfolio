# Coding Conventions

**Analysis Date:** 2026-01-21

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `Hero.tsx`, `ProjectCard.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useStrudel.ts`, `use-toast.ts`)
- Utilities and libraries: camelCase (e.g., `music-presets.ts`, `utils.ts`)
- UI components: lowercase with hyphens (e.g., `alert-dialog.tsx`, `input-otp.tsx`)

**Functions:**
- React components: PascalCase (exported as default)
- Event handlers: camelCase starting with `handle` (e.g., `handleImageClick`, `handleSubmit`, `handleChange`)
- Utility/helper functions: camelCase (e.g., `getEmbedUrl`, `getPresetById`, `getPresetsByCategory`)

**Variables:**
- State variables: camelCase (e.g., `currentPattern`, `isPlaying`, `formData`)
- Boolean state: prefix with `is`, `has`, or `should` (e.g., `isLoading`, `hasChanges`, `shouldOpenInNewTab`)
- DOM refs: camelCase with `Ref` suffix (e.g., `currentPatternRef`, `replanRef`)
- Constants: SCREAMING_SNAKE_CASE for global constants (not observed in codebase, but recommended)

**Types:**
- Interfaces: PascalCase with suffix (e.g., `ProjectCardProps`, `UseStrudelReturn`, `MusicPreset`)
- Literal types: preserve case from usage (e.g., `'ambient' | 'beat' | 'experimental' | 'melodic' | 'lofi'`)

## Code Style

**Formatting:**
- No Prettier configuration present; rely on ESLint for basic style enforcement
- Spacing: 2-space indentation (observed in TSX files)
- Line breaks: Imports organized at top of file, then logic, then JSX return
- Import statement format: Use double quotes for package imports, single quotes for relative imports

**Linting:**
- ESLint: v9.9.0 with TypeScript support
- Config: `eslint.config.js` (flat config format)
- Key rules:
  - `@typescript-eslint/no-unused-vars`: OFF (unused vars allowed)
  - `react-refresh/only-export-components`: WARN with allowConstantExport enabled
  - Includes React Hooks plugin for dependency rules
  - No JSDoc/TSDoc enforcement

**Observed Style:**
```typescript
// Single-line JSX for small components
const Hero = () => {
  return <section>...</section>;
};
export default Hero;

// Multi-line form with explicit event types
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

// Inline ternary for conditional rendering
{isLoading && <div>Loading...</div>}
{error && <div>{error}</div>}
```

## Import Organization

**Order:**
1. React and framework imports (`react`, `react-router-dom`)
2. Third-party library imports (`@tanstack/react-query`, `lucide-react`, `zod`)
3. Radix UI and UI library imports (`@radix-ui/`, custom UI components)
4. Internal component imports (relative paths, then `@/` alias)
5. Internal hook imports (`@/hooks/`)
6. Internal utility/lib imports (`@/lib/`)

**Path Aliases:**
- `@/` → `./src` (configured in `vite.config.ts`)
- All internal imports use `@/` alias (e.g., `@/components/ui/button`, `@/lib/utils`, `@/hooks/useStrudel`)

**Example:**
```typescript
import { useState, useEffect } from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
```

## Error Handling

**Patterns:**
- Try-catch for async operations (e.g., fetch calls, external library initialization)
- Error messages displayed to user via toast notifications
- Console.error for logging (prefixed with context, e.g., `[Strudel]`)
- Conditional rendering for error states

**Example:**
```typescript
try {
  const response = await fetch('/.netlify/functions/send-contact-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 429) {
      toast({
        title: "Too many requests",
        description: "Please wait a few minutes before sending another message.",
        variant: "destructive",
      });
      return;
    }
    throw new Error(data.error || 'Failed to send message');
  }
} catch (error) {
  console.error('Error sending email:', error);
  toast({
    title: "Error sending message",
    description: "Please try again or contact me directly.",
    variant: "destructive",
  });
}
```

## Logging

**Framework:** `console` (no dedicated logging library)

**Patterns:**
- Debug logs prefixed with context in brackets (e.g., `console.log('[Strudel] Loading from CDN...')`)
- Error logs use `console.error()` with context prefix
- Log at key lifecycle points: initialization, state changes, errors
- Verbose logging for complex async operations (see `useStrudel.ts`)

**Example:**
```typescript
console.log('[Strudel] Already loaded, initializing...');
console.error('[Strudel] Init error:', err);
console.error('[Strudel] Pattern evaluation error:', evalErr);
```

## Comments

**When to Comment:**
- Complex logic explanation (e.g., AudioContext suspension handling)
- Non-obvious conditional logic (e.g., video URL detection)
- Important implementation notes (e.g., "This sets the cookie to keep the sidebar state")
- Commented-out code: Keep if representing future features (e.g., `// import Blog from "./pages/Blog"`)

**JSDoc/TSDoc:**
- Not enforced; only TypeScript interfaces used for type documentation
- Component props documented through TypeScript interfaces:
  ```typescript
  interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveDemoUrl?: string;
    // ... more props
  }
  ```

## Function Design

**Size:**
- Small, focused functions preferred (e.g., `handleImageClick`, `getEmbedUrl`)
- Hooks can be larger due to state management complexity (e.g., `useStrudel` is 246 lines)
- Inline event handlers for simple operations

**Parameters:**
- Destructure props in function signature for React components
- Use rest parameters sparingly
- Type all function parameters and return types

**Return Values:**
- Consistent return types (use interface/type for hook return values)
- Example from `useStrudel`:
  ```typescript
  interface UseStrudelReturn {
    isPlaying: boolean;
    isLoading: boolean;
    error: string | null;
    volume: number;
    play: () => Promise<void>;
    stop: () => void;
    setVolume: (volume: number) => void;
    evaluatePattern: (pattern: string) => Promise<void>;
    strudelReady: boolean;
  }
  ```

## Module Design

**Exports:**
- React components: default export (e.g., `export default Hero`)
- Utility functions: named exports (e.g., `export const getPresetById`)
- Interfaces/Types: named exports
- Hooks: named exports prefixed with `use` (e.g., `export const useStrudel`)

**Barrel Files:**
- Not used in this codebase
- Imports are direct from source files (e.g., `import Hero from "@/components/Hero"`)

**File Scope:**
- One component per file (observed pattern)
- Related types defined in same file as component/hook
- Interfaces defined above implementation
- No shared type files (each component has its own Props interface)

---

*Convention analysis: 2026-01-21*
