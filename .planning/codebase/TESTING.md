# Testing Patterns

**Analysis Date:** 2026-01-21

## Test Framework

**Status:** No testing framework detected

**Framework:**
- Not configured (no jest.config.js, vitest.config.ts, or similar)
- No test files present in codebase
- No test dependencies in package.json

**Note:** Testing infrastructure is not set up. No unit tests, integration tests, or E2E tests are currently in place.

## Test File Organization

**Current State:**
- No test files found (no `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx`)
- No test directories (`__tests__`, `tests/`, `.test/`)

**Recommended Pattern (if testing added):**
- Co-locate test files with source: `Component.tsx` and `Component.test.tsx` in same directory
- Alternatively, use `src/__tests__/` for unit tests
- Use `e2e/` or `tests/e2e/` for end-to-end tests if added

## Error Handling in Code (as reference)

The codebase uses defensive patterns that would be tested if testing were implemented:

**Try-Catch Testing:**
From `Contact.tsx` (line 21-62):
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
  // success handling
} catch (error) {
  console.error('Error sending email:', error);
  toast({
    title: "Error sending message",
    description: "Please try again or contact me directly.",
    variant: "destructive",
  });
}
```

**Async State Management Testing:**
From `useStrudel.ts` (line 31-246) - hook manages:
- `isPlaying` boolean
- `isLoading` boolean
- `error` state (string | null)
- `strudelReady` boolean
- Async initialization and cleanup

**Conditional Rendering Testing:**
From `MusicPlayground/index.tsx` (line 89-96):
```typescript
{isLoading && (
  <div className="flex-1 flex items-center justify-center">
    <div className="text-center space-y-3">
      <div className="animate-spin h-8 w-8 border-4 border-neon border-t-transparent rounded-full mx-auto"></div>
      <p className="text-gray-400">Loading Strudel...</p>
    </div>
  </div>
)}
```

## Complex Testing Candidates

**High Priority (if testing implemented):**

1. **`useStrudel.ts` Hook** - 246 lines
   - External library (Strudel) initialization from CDN
   - Audio API context suspension/resumption
   - Pattern evaluation with error handling
   - State management (isPlaying, isLoading, error, volume)
   - Cleanup on unmount

2. **`Contact.tsx` Component** - Form submission
   - Form data state management
   - Fetch API with error handling
   - Rate limiting handling (429 status)
   - Toast notifications
   - Honeypot field for spam prevention

3. **`ProjectCard.tsx` Component** - 211 lines
   - URL type detection (Loom vs YouTube)
   - Video embed URL transformation
   - Dialog state management
   - External link handling with security attributes (noopener,noreferrer)

4. **`MusicPlayground/index.tsx` Component** - 284 lines
   - localStorage persistence
   - Multiple effect dependencies
   - Responsive mobile/desktop layout
   - Pattern editor state tracking

## Required Setup (if testing added)

**Option 1: Vitest (Recommended for Vite projects)**
```bash
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/user-event
```

**Config file:** `vitest.config.ts`

**Option 2: Jest + React Testing Library**
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom ts-jest @types/jest
```

**Config file:** `jest.config.js`

## Mocking Considerations (reference for future tests)

**External Fetch Calls:**
From `Contact.tsx` - would need to mock fetch:
```typescript
// If testing were implemented
vi.mock('fetch', () => ({
  // Mock implementation
}));
```

**External Libraries:**
- Strudel library loaded from CDN in `useStrudel.ts`
- Would need to mock `window.initStrudel`, `window.hush`, `window.getAudioContext`
- Audio API methods (resume, gain.value)

**localStorage:**
Used in `MusicPlayground/index.tsx` (lines 23-24, 42-44)
```typescript
localStorage.getItem('strudel-pattern');
localStorage.setItem('strudel-pattern', currentPattern);
```

## Coverage Gaps

**Areas Without Test Coverage (none exist):**
- No tests for any component or hook
- All user interactions untested
- API error handling untested
- State management untested
- localStorage persistence untested
- External library initialization untested

**Risk:** High - Any refactoring could introduce regressions undetected

**Recommendation:** Prioritize adding tests for:
1. `useStrudel.ts` - complex async state and external library
2. `Contact.tsx` - network requests and error handling
3. `ProjectCard.tsx` - URL handling and conditional rendering

---

*Testing analysis: 2026-01-21*
