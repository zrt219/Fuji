# Fuji Atlas

Fuji Atlas is a Next.js gallery system for a curated Fuji / Japan image archive.

It is built as a cinematic portfolio surface rather than a generic asset grid. The project includes:

- a full gallery route at `/fuji`
- a film-mode entry button on the main Fuji hero
- a presentation reel at `/fuji/film`
- a static curation dashboard at `/fuji/curate`
- an image pipeline that keeps original files separate from deployable public assets
- duplicate-aware asset generation so duplicate source images are not uploaded into the public gallery

Live deployment: [fuji-byzrt.vercel.app](https://fuji-byzrt.vercel.app)
Main Fuji entry: [fuji-byzrt.vercel.app/fuji](https://fuji-byzrt.vercel.app/fuji)

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
- `/film`
  Compatibility alias that redirects to `/fuji/film`.
- `/curate`
  Compatibility alias that redirects to `/fuji/curate`.

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

## Ukiyo-e studies by zrt

Generated for this archive and committed with the README so the project page can show a small editorial set.

<table>
  <tr>
    <td><img src="public/readme/ukiyo-e/ukiyo-e-01.png" alt="zrt ukiyo-e study 1" width="180" /></td>
    <td><img src="public/readme/ukiyo-e/ukiyo-e-02.png" alt="zrt ukiyo-e study 2" width="180" /></td>
    <td><img src="public/readme/ukiyo-e/ukiyo-e-03.png" alt="zrt ukiyo-e study 3" width="180" /></td>
    <td><img src="public/readme/ukiyo-e/ukiyo-e-04.png" alt="zrt ukiyo-e study 4" width="180" /></td>
    <td><img src="public/readme/ukiyo-e/ukiyo-e-05.png" alt="zrt ukiyo-e study 5" width="180" /></td>
  </tr>
</table>

## Notes

- The repo currently includes original source images and generated verification screenshots, so it is heavier than a minimal deploy-only repo.
- User-facing taxonomy is based on Japanese place-worlds and visual systems, not source filename provenance.
- The Fuji Atlas lightbox is designed to keep the preview image dominant, with compact overlay metadata and optional detail expansion.

## On-Chain Systems Portfolio

Core XRPL EVM systems plus related public product and AI repositories from the same portfolio.

<table>
  <thead>
    <tr>
      <th>Project</th>
      <th>Description</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/zrt219/Zuc-Mine-Command-Center">ZUC Mine Command Center</a></td>
      <td>On-chain uranium mining operations dashboard with real-time reserve tracking, miner registry, and direct contract interaction through a frontend-only control surface.</td>
      <td><a href="https://zuc-mine-command-center.vercel.app/">Live</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/-U235-Fuel-Cycle-">U235 Fuel Cycle</a></td>
      <td>Deterministic XRPL EVM fuel-cycle pipeline that tracks uranium batches from ore to enriched fuel rod with full on-chain traceability.</td>
      <td><a href="https://u235-fuel-cycle.vercel.app/">Live</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/ISR-Network">ISR Network</a></td>
      <td>In-situ recovery control system with on-chain asset tracking, lifecycle state transitions, and operator-facing industrial simulation.</td>
      <td><a href="https://isr-network.vercel.app/">Live</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/Dark-Matter-Farm">Dark Matter Farm</a></td>
      <td>XRPL EVM staking protocol with three orbit tiers, lock-period yield mechanics, and event-driven reward emissions.</td>
      <td><a href="https://dark-matter-farm.vercel.app/">Live</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/Cohr-Lab">Cohr Lab</a></td>
      <td>Semiconductor laser fabrication lifecycle modeled as an immutable on-chain state machine from crystal growth to final pigtail.</td>
      <td><a href="https://cohr-lab.vercel.app">Live</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/ForgeX">ForgeX</a></td>
      <td>Foundry-powered XRPL EVM deployment console that combines a natural-language UI, Node CLI orchestration, and realtime shader-based visuals.</td>
      <td><a href="https://forgex-theta.vercel.app">Live</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/DatumX">DatumX</a></td>
      <td>Verification protocol for AI-transformed industrial data with deterministic lineage, validator review, and XRPL EVM finalization.</td>
      <td><a href="https://datumx.vercel.app">Live</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/Ethex-Lottery-Game">Ethex Lottery Game</a></td>
      <td>Foundry plus Next.js betting workflow that modernizes the EthexLoto lifecycle for XRPL EVM reviewer-facing execution.</td>
      <td>Public Repo</td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/3DMoonX">3DMoonX</a></td>
      <td>Cinematic lunar industrial-base experience that combines Blender source assets with a React Three Fiber web runtime.</td>
      <td><a href="https://3dmoonx.vercel.app">Live</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/Unknown002">Unknown002</a></td>
      <td>Browser-based 3D engineering viewer for a nuclear-electric propulsion spacecraft concept with staged prompt-pack support.</td>
      <td>Public Repo</td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/AI-Engineering-Evidence-Engine">AI Engineering Evidence Engine</a></td>
      <td>Interactive evidence dashboard that turns local engineering proof into a reviewer-facing systems narrative.</td>
      <td><a href="https://zhane-grey-evidence-dashboard.vercel.app/">Live</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/Build-Doctor">Build Doctor</a></td>
      <td>Codex-style build diagnosis harness for failed Next.js and Vercel builds with deterministic failure analysis.</td>
      <td><a href="https://vercel-build-doctor-agent.vercel.app">Live</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/ai-gateway-failover-playground">AI Gateway Failover Playground</a></td>
      <td>Public-facing sandbox for request routing, provider fallback, and resilient AI gateway behavior.</td>
      <td><a href="https://ai-gateway-failover-playground.vercel.app">Live</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/enterprise-agent-workflow-studio">Enterprise Agent Workflow Studio</a></td>
      <td>Public-facing studio for approval-gated enterprise agent workflows, risk scoring, and audit-oriented design.</td>
      <td><a href="https://enterprise-agent-workflow-studio.vercel.app">Live</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/resume-evidence-rag-auditor">Resume Evidence RAG Auditor</a></td>
      <td>Public-facing proof surface for claim verification, evidence retrieval, and grounded resume bullet generation.</td>
      <td><a href="https://resume-evidence-rag-auditor.vercel.app">Live</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/AI-resume-tailor-service-">AI Resume Tailor Service</a></td>
      <td>Static Vercel-ready application for evidence-backed resume, cover-letter, and job-packet tailoring.</td>
      <td><a href="https://ai-resume-tailor-service.vercel.app">Live</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/Fuji">Fuji</a></td>
      <td>Cinematic Next.js Fuji gallery atlas for portfolio storytelling and visual system design.</td>
      <td><a href="https://fuji-byzrt.vercel.app">Live</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/ai-agents-for-beginners">AI Agents for Beginners</a></td>
      <td>Lesson repository for getting started building AI agents.</td>
      <td>Public Repo</td>
    </tr>
    <tr>
      <td><a href="https://github.com/zrt219/agentic-rag-memory-digital-twin-edge-system">Agentic RAG Memory Digital Twin Edge System</a></td>
      <td>Public-facing landing page for an agentic RAG, memory, and digital-twin edge-system portfolio project.</td>
      <td><a href="https://agentic-rag-memory-digital-twin-edg.vercel.app">Live</a></td>
    </tr>
  </tbody>
</table>

