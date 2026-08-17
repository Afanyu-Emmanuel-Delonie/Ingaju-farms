# Ingaju Farms

Marketing and content site for **Ingaju Farms**, an integrated circular agriculture enterprise based in Rebero Village, Nyagatare District, Eastern Province, Rwanda.

## Product Description

Ingaju Farms runs a closed-loop farm where the outputs of one enterprise become the inputs of the next: livestock manure is composted into organic fertilizer, that fertilizer feeds the crop fields, the crops and their residues are turned into livestock feed, and the herd restarts the cycle. The goal is a farm that produces more while depending less on external, synthetic inputs — a model built for Rwandan smallholders to learn from and adopt.

### The circular system

1. **Livestock Herd** — a pasture-fed dairy herd managed to welfare and nutrition standards, producing milk daily and generating the manure that feeds the next stage.
2. **Organic Fertilizer** — manure composted into organic fertilizer (a line currently scaling toward full production), reducing reliance on synthetic agrochemicals and rebuilding soil health.
3. **Crop Production** — maize, legumes, and macadamia grown on increasingly enriched soil using climate-smart, low-synthetic-input practices, supplying both the market and the herd.
4. **Livestock Feed** — harvested crops and crop residues are prepared into feed on-site, closing the loop and strengthening the system each cycle.

### What the business offers

- **Livestock & Dairy** — milk and breeding livestock raised to strict welfare and nutrition standards.
- **Crop Production** — maize, legumes, and macadamia nuts grown using climate-smart, organic-input farming practices.
- **Organic Fertilizer** — nutrient-rich fertilizer processed from the farm's own livestock manure, scaling up as the composting facility comes online.
- **Farmer Training** — hands-on, on-farm training in livestock and herd management, climate-smart crop production, and integrated circular agriculture systems, for smallholders, cooperatives, students, schools, and agribusiness professionals. Over 500 farmers trained to date.

### Impact so far

- 50+ jobs created
- 500+ farmers trained
- 10 organic products produced
- 12 local partnerships (including RAB, Nyagatare Cooperative, Agrivet, and others)

### The website

This repository is the Next.js site presenting Ingaju Farms to visitors, partners, and prospective trainees. It covers the farm's story and mission, the circular system in detail, product/enterprise pages (dairy, crops, organic fertilizer), a training and blog section with practical farming content, and contact/inquiry flows for partnership, training, and product interest — plus an internal Operations Portal for managing leads, orders, inquiries, and blog posts.

## Tech Stack

- **Next.js 16** (App Router, Turbopack) + React 19 + TypeScript
- **Tailwind CSS** for styling
- **Firebase**
  - **Authentication** — email/password and Google sign-in, gating the Operations Portal
  - **Firestore** — stores portal submissions (`portal_submissions`), public lead capture (`leads`), and portal-authored blog posts (`blog_posts`)
- **Resend** — transactional email, used to notify the team the moment someone submits the contact form or an order/tour/training request
- **Google Drive** — supported as an image source for blog post images (share links are normalized to direct-loadable URLs)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and fill in real values (see [Environment Variables](#environment-variables) below):

   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the result. The app works with Firebase disabled (`NEXT_PUBLIC_FIREBASE_DISABLED=true`) for pure front-end work — the portal, lead capture, and email notifications simply no-op until configured.

## Environment Variables

All variables live in `.env.local` (gitignored); `.env.example` documents them with blank placeholders.

### Firebase

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_DISABLED` | Set to `true` to run without Firebase (auth/Firestore features no-op). |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | From Firebase console → Project settings → General → Your apps. |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Same. |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Same. |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Same. |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Same. |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Same. |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Optional — enables Firebase Analytics. |

### Notifications (Resend)

The team is emailed automatically whenever a visitor submits the contact form, or an order/tour/training request from the site (see [Notifications](#notifications) below).

| Variable | Description |
| --- | --- |
| `RESEND_API_KEY` | API key from [resend.com/api-keys](https://resend.com/api-keys). Server-side only, never exposed to the browser. |
| `NOTIFY_EMAIL` | Primary inbox that receives new-lead notifications. |
| `NOTIFY_EMAIL_CC` | Optional second recipient, CC'd on every notification. |
| `FROM_EMAIL` | Sender address. Must be on a domain verified in Resend (`onboarding@resend.dev` works for testing). |

If these aren't set, form submissions still save to Firestore as normal — the notification email is best-effort and fails silently.

## Operations Portal

`/portal` (behind Firebase Auth sign-in at `/portal/login`) is where the team manages day-to-day activity:

- **Orders / Inquiries / Other** — tabbed dashboard combining staff-created entries with public leads (contact form + order/tour/training requests), routed automatically by source. Each item can be archived, restored, or (once archived) permanently deleted — individually or all at once.
- **Leads** — copy a lead's email or phone with one click, or reply directly on WhatsApp.
- **Blog** (`/portal/blog`) — create, edit, publish/unpublish, and delete blog posts. A **Seed Built-in Posts** action copies the site's original built-in articles into Firestore so they become fully editable. Post images accept a local `/images/...` path, a Google Drive share link (auto-converted to a direct image URL), or any allow-listed remote domain (see `next.config.ts`).

Publishing/unpublishing/editing a post triggers on-demand revalidation (`/api/revalidate-blog`) so the public blog reflects the change immediately instead of waiting on time-based caching.

## Notifications

`src/app/api/notify` is a server-side route that formats a lead's details into an email and sends it via the Resend API. It's called from the contact form and the order/tour/training request modal right after the lead is saved to Firestore. Failures are logged but never block the visitor's submission — Firestore is always the source of truth; email is a best-effort heads-up.

## Firebase Setup

Firestore security rules and indexes are tracked in this repo (`firestore.rules`, `firestore.indexes.json`, `firebase.json`) and deployed via the Firebase CLI:

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

Run this after cloning if you're pointing at a fresh Firebase project, and again any time `firestore.rules` or `firestore.indexes.json` change.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) — Next.js features and API.
- [Firebase Documentation](https://firebase.google.com/docs) — Auth and Firestore.
- [Resend Documentation](https://resend.com/docs) — transactional email API.

## Deploy

The site is deployed on [Vercel](https://vercel.com). Environment variables must be added separately in the Vercel project's **Settings → Environment Variables** — `.env.local` is not read in production.
