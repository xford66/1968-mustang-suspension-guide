# 1965–1970 Mustang Parts Guide

Comparison site for first-gen Mustang upgrades. Suspension is first.

## Run locally

```bash
npm install
cp .env.example .env.local   # then paste a Neon connection string
npm run dev
```

Open http://localhost:3000

## What’s in this first pass

- Year picker for 1965–1970
- Category pills (only Suspension is live)
- Three install tiers: bolt-on, Mustang II / IFS, full chassis
- Kit cards plus a detail page for each kit

Default year is 1968.

## Data

Kits, parts, categories and model years are loaded from the Neon Postgres
database (`neon-mustang-database`) in `lib/data.ts`. The connection string is
read from `DATABASE_URL_DATABASE_URL` (set by the Vercel + Neon integration for
Preview and Production), falling back to `DATABASE_URL`. The build fails with a
clear error if neither is set. Pages are static and revalidate hourly.

Client components get the catalog through `components/CatalogProvider.tsx`;
pure helpers and types live in `lib/catalog.ts`.

Photos come from the `photo` column on `kits` and `parts`, and card order from
their `sort` column. Year photos and notes come from the `years` table.

## Checks

```bash
npm run typecheck
npm run lint
npm run build   # needs DATABASE_URL_DATABASE_URL
```
