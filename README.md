# Next.js Boilerplate

Next.js 16 App Router starter with auth, Redux, and shadcn/ui.

## Stack

- **Next.js 16** + React 19 + App Router
- **Redux Toolkit** + Redux Persist (SSR-safe)
- **Tailwind CSS v3** + shadcn/ui
- **Axios** + Firebase Auth + Socket.io (skeleton)
- **react-hook-form** + Zod + i18next

## Quick Start

```bash
cd pp191225_web_next
cp .env.example .env.local
npm install
npm run dev
```

## Structure

```
src/
├── app/           # Routes (public auth + protected app)
├── views/         # Page views
├── components/    # Shared UI + shadcn
├── store/         # Redux (auth + theme)
├── services/      # API clients
├── hooks/         # useAuth, useTheme, useSocketConnection
├── socket/        # Socket.io skeleton (empty modules)
└── ...
```

## Routes

| Path                   | Description |
| ---------------------- | ----------- |
| `/login`, `/signup`, … | Auth        |
| `/`                    | Home        |
| `/profile`             | Placeholder |

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run type-check
```
