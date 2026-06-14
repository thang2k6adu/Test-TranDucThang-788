# Focus Hub — Next.js Boilerplate

Next.js 16 App Router starter based on `pp191225_web` stack.

## Stack

- **Next.js 16** + React 19 + App Router
- **Redux Toolkit** + Redux Persist (SSR-safe storage)
- **Tailwind CSS v3** + shadcn/ui
- **Axios** + Firebase Auth + Socket.io (skeleton)
- **react-hook-form** + Zod + i18next

## Quick Start

```bash
cd pp191225_web_next
cp .env.example .env.local
# Edit .env.local with your Firebase & API credentials

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/           # Auth pages (no sidebar)
│   ├── (app)/              # Protected pages (sidebar layout)
│   ├── providers.tsx       # Redux, i18n, toast
│   └── layout.tsx
├── views/                  # Page views
├── components/
├── hooks/
├── store/
├── services/
├── utils/
├── types/
├── constants/
├── config/
├── lib/
└── socket/                 # Socket.io skeleton (empty modules)
```

## Routes

| Path                           | Description             |
| ------------------------------ | ----------------------- |
| `/login`                       | Login                   |
| `/signup`                      | Register                |
| `/`                            | Dashboard (placeholder) |
| `/tasks`, `/focus`, `/profile` | Stub pages              |

## Environment Variables

Prefix: `NEXT_PUBLIC_*` (see `.env.example`)

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

## Adding Features

Follow `CODING_GUIDE.md` in `pp191225_web`, with routes in `src/app/**/page.tsx` instead of React Router.

**Phase 5 (later):** Socket.io, LiveKit, matchmaking, full task CRUD.

## Notes

- Client-first SPA — auth uses `localStorage` tokens.
- Protected routes via `ProtectedLayout` in `(app)/layout.tsx`.
