# Fuji Atlas

Fuji Atlas is a Next.js gallery system for a curated Fuji / Japan image archive.

It is built as a cinematic portfolio surface rather than a generic asset grid. The project includes:

- a full gallery route at `/fuji`
- a presentation reel at `/fuji/film`
- a static curation dashboard at `/fuji/curate`
- an image pipeline that keeps original files separate from deployable public assets
- duplicate-aware asset generation so duplicate source images are not uploaded into the public gallery

Live deployment: [fuji-byzrt.vercel.app](https://fuji-byzrt.vercel.app)

## What is in the repo

- `source-images/`
  Original archive images.
- `public/fuji/`
  Canonical deployable Fuji Atlas frames used by the `/fuji` routes.
- `public/gallery/`
  Optimized gallery variants for the broader gallery pipeline.
- `scripts/generate-fuji-manifest.mjs`
  Scans `public/fuji`, reads metadata overrides, generates `src/data/fuji-images.ts`.
- `scripts/fuji-category-seed.json`
  Manual curation source of truth for category and metadata overrides.
- `src/data/fuji-images.ts`
  Generated typed manifest consumed by the app.
- `src/app/fuji/page.tsx`
  Main Fuji Atlas gallery route.
- `src/app/fuji/film/page.tsx`
  Film mode route.
- `src/app/fuji/curate/page.tsx`
  Static curation workflow.

## Current archive state

- 122 source files in the local archive
- 95 canonical deployable Fuji Atlas frames
- 27 duplicate source copies excluded from public deployable assets
- 0 uncategorized Fuji Atlas frames after curation

Primary category system:

- Fuji Five Lakes
- Golden Reflections
- Blue Night
- Digital Twin Fuji
- AgriTech Fuji
- Pastoral Fuji
- Floral Fuji
- Sea of Clouds
- Torii Paths
- Mountain Temples
- Tokyo Crossing
- Lantern Alleys
- Backstreets
- Heritage Art

## Routes

- `/`
  Original gallery shell.
- `/fuji`
  Main curated Fuji Atlas experience with chapter rail, masonry gallery, and lightbox.
- `/fuji/film`
  Horizontal cinematic presentation mode for walkthroughs and recordings.
- `/fuji/curate`
  Keyboard-assisted static tagging workflow for visual classification.

## Local development

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm run dev
```

Build the app:

```bash
npm run build
```

Lint the codebase:

```bash
npm run lint
```

## Image and manifest workflow

Regenerate the Fuji manifest after updating public Fuji assets or curation metadata:

```bash
npm run fuji:manifest
```

Validate the gallery asset pipeline:

```bash
npm run gallery:validate
```

Rebuild the broader optimized gallery variants:

```bash
npm run gallery:build
```

## Curation workflow

The curation flow is static and file-based.

1. Open `/fuji/curate`
2. Classify images visually
3. Export the JSON seed from the UI
4. Paste it into `scripts/fuji-category-seed.json`
5. Run `npm run fuji:manifest`

Keyboard shortcuts in `/fuji/curate`:

- `1` Five Lakes
- `2` Golden Reflections
- `3` Blue Night
- `4` Digital Twin Fuji
- `5` AgriTech Fuji
- `6` Pastoral Fuji
- `7` Floral Fuji
- `8` Sea of Clouds
- `9` Torii Paths
- `0` Tokyo Crossing

## Deployment

This project is deployed on Vercel.

Current live URL:

- [https://fuji-byzrt.vercel.app](https://fuji-byzrt.vercel.app)

GitHub repository:

- [https://github.com/zrt219/Fuji](https://github.com/zrt219/Fuji)

## Notes

- The repo currently includes original source images and generated verification screenshots, so it is heavier than a minimal deploy-only repo.
- User-facing taxonomy is based on Japanese place-worlds and visual systems, not source filename provenance.
- The Fuji Atlas lightbox is designed to keep the preview image dominant, with compact overlay metadata and optional detail expansion.
