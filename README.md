# Mogens Software Landing Page

Marketing site for Mogens Software (B2B software development), built with Next.js 14 (App Router) and Tailwind CSS.

Live: https://mogenssoftware.com (pending DNS connection — currently served from the Vercel preview URL until the domain is attached in the Vercel dashboard)

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animation
- **next-intl** for English/Turkish localization
- **Resend** for the contact form's outbound email
- **Vercel Analytics** for traffic (cookieless)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) — powers the audit-request form |
| `CONTACT_EMAIL_TO` | Inbox that receives audit request notifications |
| `CONTACT_EMAIL_FROM` | Sender address. Until a domain is verified in Resend, this can only deliver to the Resend account's own email — see [Resend domains](https://resend.com/domains) |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Optional. Free database at [upstash.com](https://upstash.com) — enables persistent rate limiting on `/api/contact`. Without these, it falls back to an in-memory limiter (fine for local dev, not for production). |

Set the same variables in the Vercel project's Environment Variables settings for production.

## Internationalization

- Six locales: English (default, no URL prefix — `/`), Turkish (`/tr`), Spanish (`/es`), Italian (`/it`), Arabic (`/ar`), Chinese (`/zh`).
- The visitor's browser language is auto-detected on first visit; the header's flag dropdown (`components/LanguageSwitcher.tsx`) lets them override it.
- UI strings live in `messages/{locale}.json`. Add a key to all six files with matching structure, then read it with `useTranslations("namespace")` in the component. `node -e` scripts checking key parity across all files were used during development — worth re-running after adding new keys.
- Arabic renders `dir="rtl"` on `<html>` (set in `[locale]/layout.tsx`), so text reads correctly right-to-left. This is text-direction support, not a full mirrored layout — component structure (nav order, grid columns) stays LTR-arranged. A true bidi redesign (logical CSS properties throughout) would be a separate, larger task.
- The Privacy Policy page (`app/[locale]/privacy`) is fully localized too, including the "last updated" date via `Intl.DateTimeFormat`.
- Routing config: `i18n/routing.ts`, `i18n/request.ts`, `i18n/navigation.ts`, `middleware.ts`.

**Architecture note:** `app/[locale]/layout.tsx` is the true root layout (contains `<html>`/`<body>`) — this is required so Next.js re-renders it (and picks up the new locale/messages) on client-side navigation between locales. Don't move the `<html>` tag or the `NextIntlClientProvider` back to a layout outside `[locale]`; that reintroduces a bug where switching languages updates the URL but leaves stale content mounted.

## Project structure

```
app/
  [locale]/
    page.tsx          # home page, assembles all sections
    layout.tsx         # root layout: fonts, metadata, providers, <html lang>
    privacy/page.tsx   # privacy policy (localized)
    not-found.tsx       # branded 404
    [...rest]/page.tsx # catch-all that calls notFound() for unmatched routes
  api/contact/route.ts # form submission handler (Resend + honeypot + rate limit)
  icon.tsx, apple-icon.tsx, opengraph-image.tsx, twitter-image.tsx
  robots.ts, sitemap.ts
components/            # one file per landing-page section, plus shared bits
  (Header, Hero, MetricsStrip, Capabilities, TechStack, Projects, About,
   FooterCTA, Footer, LanguageSwitcher, MotionProvider)
i18n/                  # next-intl routing/request/navigation config
messages/              # en.json / tr.json translation dictionaries
lib/logo.ts            # base64-embedded logo mark used by icon/OG image routes
public/logo-mark.png    # logo mark used in the header
```

## Known limitations

- **Rate limiting** on `/api/contact` uses Upstash Redis when `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` are set (persistent, shared across instances); otherwise it falls back to an in-memory limiter that resets on cold start and isn't shared. Set the Upstash vars in production.
- **Confirmation email** to the form submitter is best-effort: until a custom domain is verified in Resend, it can only actually deliver when the submitter's address matches the Resend account's own email. The internal notification to `CONTACT_EMAIL_TO` always works.
- **Projects** section (`components/Projects.tsx`) showcases real, currently-live products (Slotly, QR Menu, Mogens Software AI, NSS Score) — not fictional case studies.

## Deployment

Pushes to `main` auto-deploy via Vercel's GitHub integration.

```bash
npm run build   # verify locally before pushing
```
