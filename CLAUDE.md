# Pluto's Repawsitory

**Group 2 — The Knowledge House Data Science Fellowship, Phase 3**
**Group lead:** Dre | **Team:** Cameron, Manuela, Ozor

## What this is
Dog breed classification web app. PyTorch MobileNetV2 CNN trained on 69 breeds, served via FastAPI, with a dark glass-morphism frontend (Cormorant Garamond + Inter, no emojis, red accent).

## Project structure
```
/archive
├── app/                        ← FastAPI backend (run this for localhost:8000)
│   ├── app.py                  ← FastAPI + MobileNetV2 model, /predict endpoint
│   ├── Dockerfile              ← HF Spaces deploy (port 7860)
│   ├── requirements.txt
│   └── static/index.html       ← Main frontend (vanilla JS, served by FastAPI)
├── src/                        ← React/Vite version (for Lovable import)
│   ├── App.jsx
│   ├── breeds.js
│   ├── index.css
│   └── main.jsx
├── package.json                ← React/Vite deps
├── vite.config.js              ← proxies /predict → localhost:8000
├── index.html                  ← Vite entry
├── .env.example                ← set VITE_API_URL for prod
└── notebooks/                  ← team notebooks
```

## Running locally
```bash
# Backend (FastAPI) — localhost:8000
cd app && uvicorn app:app --reload --port 8000

# Frontend React dev server — localhost:5173
npm install && npm run dev
```
The plain HTML version at `app/static/index.html` is served directly by FastAPI at localhost:8000 — no build step needed.

## Model
- Architecture: MobileNetV2 (~3.5M params) + Dropout(0.5) + Linear(1280→69)
- 69 breed classes
- Accuracy: 95.75%
- Training images: ~8,600
- Inference: CPU
- `/predict` POST endpoint: accepts `file` (image), returns `{ predictions: [{breed, confidence}] }` top 3

## Frontend (app/static/index.html)
Single-file vanilla JS. Key features:
- **Scan view** (default): upload zone → cinematic scan overlay (sweep line + pulse rings) → modal with breed reveal
- **Library view**: 69 breed cards, lazy-loaded photos from Dog CEO API, filter by group + search
- **Modal**: slide-up sheet, hero image, breed name (Cormorant Garamond), stat bars animated sequentially, "Also Considered" alt predictions
- Dog CEO API path: `https://dog.ceo/api/breed/{breed.api}/images/random`
- Image cache object `imgCache` keyed by breed name, IntersectionObserver lazy loading

## React version (src/)
Same UI rebuilt in React 18 + Vite. Differences:
- `VITE_API_URL` env var for prod backend URL (HF Spaces)
- Components: `App`, `ScanView`, `LibraryView`, `BreedCard`, `BreedModal`
- Scan animation lives in `ScanView` as `scan-overlay` div shown during API call

## Deployment
- **HF Spaces**: push `app/` contents, Dockerfile exposes port 7860
- **Lovable**: push whole repo to GitHub → lovable.dev → Import from GitHub → set `VITE_API_URL` to HF Spaces URL

## Git rules
- All commits and pushes are done by Dre manually
- No commit messages referencing Claude or AI

## Pending
- Sprint 4 slide deck (15–20 slides)
- Demo video
- Pull Cameron/Manuela/Ozor notebooks into notebooks/
- Manuela to fix shelter reference (evaluation notebook Cell 31)
- Deploy to HF Spaces
