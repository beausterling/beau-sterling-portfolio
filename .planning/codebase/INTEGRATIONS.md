# External Integrations

**Analysis Date:** 2026-01-21

## APIs & External Services

**Email Service:**
- Resend - Email delivery service for contact form responses
  - SDK/Client: `resend` package v6.6.0
  - Auth: `RESEND_API_KEY` environment variable
  - Implementation: `netlify/functions/send-contact-email.ts`
  - Usage: Sends two emails per contact form submission (notification to owner, confirmation to user)
  - Email address: `info@vibecheckit.com` (configured sender domain)
  - Recipient: `beaujsterling@gmail.com` (owner notification)

## Data Storage

**Databases:**
- Not used - No persistent data storage configured

**File Storage:**
- Local filesystem only
- Static assets served from `public/` directory
- Build output: `dist/` directory (compiled and bundled application)

**Caching:**
- TanStack React Query (client-side, in-memory)
  - Configured in `src/App.tsx`
  - Used for managing server state and caching
  - Currently not actively caching external API calls

**Session/State Storage:**
- Browser localStorage/sessionStorage only
- No backend session management

## Authentication & Identity

**Auth Provider:**
- Not implemented - No user authentication system
- Public portfolio application (no login/auth required)
- Anonymous access only

## Monitoring & Observability

**Error Tracking:**
- Not detected - No external error tracking service

**Logs:**
- Console logging in Netlify Functions (`netlify/functions/send-contact-email.ts`)
  - IP address masking for privacy (logs first 8 chars only)
  - Error messages logged with context
  - Email send success/failure logged
- Browser console for client-side issues

**Metrics:**
- Not implemented

## CI/CD & Deployment

**Hosting:**
- Netlify - Serverless platform for web application and functions
  - Build command: `npm run build`
  - Publish directory: `dist/`
  - Functions directory: `netlify/functions/`
  - Dev target port: 8080

**CI Pipeline:**
- Netlify automatic deployment on git push
- Build uses `vite build` command
- Function bundling via esbuild

**Environment:**
- Node.js runtime on Netlify
- ESBuild bundler for Netlify Functions

## Environment Configuration

**Required env vars:**
- `RESEND_API_KEY` - API key for Resend email service
  - Required: Yes
  - Usage: Email sending in `netlify/functions/send-contact-email.ts`
  - Scope: Netlify Functions only (line 4 of send-contact-email.ts)

**Optional env vars:**
- None identified

**Secrets location:**
- `.env` file for local development (git-ignored)
- Netlify Environment Variables (UI) for production
- Environment variables are NOT committed to git (`.env` in `.gitignore`)

**Dev Environment Setup:**
- `.env` file with `RESEND_API_KEY=re_***` for local testing
- `netlify dev` command runs local dev server with function access

## Webhooks & Callbacks

**Incoming:**
- `/.netlify/functions/send-contact-email` (POST endpoint)
  - Triggered by: Contact form submission in `src/components/Contact.tsx`
  - Accepts: JSON with name, email, message, website (honeypot)
  - Returns: JSON success/error response
  - CORS: Enabled (wildcard origin)
  - Rate limiting: 5 requests per IP per hour
  - Honeypot spam detection enabled

**Outgoing:**
- Resend API calls to send emails
  - Notification email to `beaujsterling@gmail.com`
  - Confirmation email to user-provided email address
  - No other external webhooks

## Contact Form Integration

**Flow:**
1. User fills form in `src/components/Contact.tsx`
2. Form submits to `/.netlify/functions/send-contact-email`
3. Netlify Function validates input, checks rate limit
4. Resend API called to send two emails:
   - Notification to owner with user's message
   - Confirmation to user
5. Success/error response returned to client
6. Toast notification shown to user

**Validation:**
- Email format validation (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Name: 1-100 characters
- Message: 1-5000 characters
- Honeypot field (`website`) for bot detection

**Security Features:**
- Honeypot field (`website` input) silently succeeds bot submissions
- Content sanitization: removes `<>`, `javascript:`, and event handlers
- IP-based rate limiting (5 emails per IP per hour)
- Input validation on type and length
- CORS headers configured
- Email replies directed to user's email address

**Error Handling:**
- 400: Invalid input/JSON parsing errors
- 405: Non-POST requests
- 429: Rate limit exceeded (includes `Retry-After` header)
- 500: Email service failures with specific error messages

## Third-Party Dependencies with Integrations

**Radix UI Ecosystem:**
- Unstyled component library (multiple packages)
- No external API calls
- Client-side only, requires no integration setup

**Recharts:**
- Chart library
- No external API calls
- Client-side rendering only

**React Router:**
- Client-side routing
- No external integrations

**Tailwind CSS:**
- CSS framework
- No external API calls (build-time only)

## Data Flow Summary

**Client → Server:**
- Contact form data → POST `/.netlify/functions/send-contact-email`

**Server → External (Resend):**
- Notification email (owner)
- Confirmation email (user)

**No external data sources** - Application is static/portfolio site with one-way email integration

---

*Integration audit: 2026-01-21*
