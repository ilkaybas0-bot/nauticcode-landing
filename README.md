# NauticCode Landing Page

Marketing site for NauticCode (B2B software engineering), built with Next.js 14 (App Router) and Tailwind CSS.

Live: https://nauticcode-landing.vercel.app

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

Set the same three variables in the Vercel project's Environment Variables settings for production.

## Internationalization

- English is the default locale, served with no URL prefix (`/`).
- Turkish is served at `/tr`.
- The visitor's browser language is auto-detected on first visit; the header's EN/TR switcher lets them override it.
- UI strings live in `messages/en.json` and `messages/tr.json`. Add a key to both files, then read it with `useTranslations("namespace")` in the component.
- The Privacy Policy page (`app/[locale]/privacy`) is English-only for now — it renders the same content regardless of locale.
- Routing config: `i18n/routing.ts`, `i18n/request.ts`, `i18n/navigation.ts`, `middleware.ts`.

**Architecture note:** `app/[locale]/layout.tsx` is the true root layout (contains `<html>`/`<body>`) — this is required so Next.js re-renders it (and picks up the new locale/messages) on client-side navigation between locales. Don't move the `<html>` tag or the `NextIntlClientProvider` back to a layout outside `[locale]`; that reintroduces a bug where switching languages updates the URL but leaves stale content mounted.

## Project structure

```
app/
  [locale]/
    page.tsx          # home page, assembles all sections
    layout.tsx         # root layout: fonts, metadata, providers, <html lang>
    privacy/page.tsx   # privacy policy (English-only)
    not-found.tsx       # branded 404
    [...rest]/page.tsx # catch-all that calls notFound() for unmatched routes
  api/contact/route.ts # form submission handler (Resend + honeypot + rate limit)
  icon.tsx, apple-icon.tsx, opengraph-image.tsx, twitter-image.tsx
  robots.ts, sitemap.ts
components/            # one file per landing-page section, plus shared bits
  (Header, Hero, MetricsStrip, Capabilities, TechStack, CaseStudy, About,
   FooterCTA, Footer, LanguageSwitcher, MotionProvider)
i18n/                  # next-intl routing/request/navigation config
messages/              # en.json / tr.json translation dictionaries
lib/logo.ts            # base64-embedded logo mark used by icon/OG image routes
public/logo-mark.png    # logo mark used in the header
```

## Known limitations

- **Rate limiting** on `/api/contact` is in-memory per serverless instance — good enough to blunt casual abuse, not a real distributed limiter. Swap for Upstash/Vercel KV if abuse becomes an issue.
- **Confirmation email** to the form submitter is best-effort: until a custom domain is verified in Resend, it can only actually deliver when the submitter's address matches the Resend account's own email. The internal notification to `CONTACT_EMAIL_TO` always works.
- **Case Study** section is an illustrative example, not a real client engagement — labeled as such on the page.

## Deployment

Pushes to `main` auto-deploy via Vercel's GitHub integration.

```bash
npm run build   # verify locally before pushing
```
