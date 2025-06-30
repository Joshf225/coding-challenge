# 🚀 Mission to Mars — Full-Stack Astronomy App

A comprehensive project integrating a backend NASA-powered Near Earth Objects API, React front-end dashboards, a Mars photo explorer, trivia quiz, testing suite, and CI/CD using GitHub Actions + Vercel.

---

## 🧩 Table of Contents

1. [About](#1-about)  
2. [Features](#2-features)  
3. [Architecture Overview](#3-architecture-overview)  
4. [Getting Started](#4-getting-started)  
5. [Backend API](#5-backend-api)  
6. [Frontend Overview](#6-frontend-overview)  
7. [Testing Strategy](#7-testing-strategy)  
8. [CI/CD Workflow](#8-cicd-workflow)  
9. [License](#9-license)
---

## 1. About

A space-themed full-stack app that helps users explore near-earth objects, browse Mars rovers, and answer astronomy trivia—all with a robust automated deployment pipeline.

---

## 2. Features

- 🌑 **Asteroid Dashboard** – Visualizes NEO counts, velocities, diameters across a 7-day date range.
- 🚀 **Mars Explorer** – Browse rover photos by sol, filter by camera types.
- 🧠 **Trivia Quiz** – Fun space quiz with score tracking and restart functionality.
- 🤖 **AI Integration** - AI hint assistant for users in the Trivia section.
- 📅 **Date Validation + Error Handling** – Alerts user if the date range is invalid.
- ⏳ **Loading States**, 🧠 **Toasts**, and 🗃️ **Performance optimizations** (e.g., localStorage caching).
- ✅ **Testing** – Unit, component, and integration test suite.
- 🔁 **CI/CD** – Pre-deployment tests, auto-merge dev→main, and Vercel deployments.

---

## 3. Architecture Overview

[NASA API] → [Express Backend] → [React Frontend]
^ ↑
[Caching layer?] [GitHub Actions → Vercel CI/CD]


---

## 4. Getting Started

### Prerequisites

- Node.js (v18+), npm
- Vercel CLI (optional)
- `.env` file in `frontend/` root:

```env
VITE_APP_BACKEND_BASE_URL="http://localhost:3000/api"
VITE_GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

Local Development

Backend:
```
cd backend
npm install
npm start
```

Frontend:
```
cd frontend
npm install
npm run dev
```

Runs locally at http://localhost:5173

---

## 5. Backend API
Endpoints

    GET /api/feed?start=YYYY-MM-DD&end=YYYY-MM-DD
    → Fetches 7-day Near Earth Object data.

    GET /api/mars-photos?rover=Curiosity&cameras=navcam&sol=100
    → Retrieves rover photos from Mars.

    GET /api/manifests?rover=Curiosity
    → Returns rover metadata such as max_sol.

Backend uses NASA’s Open APIs.

    🧩 Caching and error fallback coming in future releases.
---

## 6. Frontend Overview
Pages

    Home – Entry screen with mission intro + links.

    Explore Mars – Includes PhotoGrid, SolSlider, Rover, RoverCameras.

    Trivia – Includes TriviaQuestions, score, restart.

    Dashboard – DatePicker + charts powered by Chart.js.

UI Flow

    Selecting 7-day date → chart fetch & render

    Mars Sol slider → fetch photos by rover/camera

    Trivia quiz → pick answer → check score

Components are styled using Tailwind CSS.

---

## 7. Testing Strategy

All test files are located in frontend/tests/:

    ✅ Unit Tests: dateUtils.test.js, triviaUtils.test.js

    ✅ Component Tests: TriviaQuestions, DatePicker, Loader, etc.

    ✅ Integration Tests: Multi-step flows, search + render, etc.

Test Runner: vitest
Example:

```
test("Clicking DatePicker triggers validation", () => {
  // ...
});
```

Run tests locally with:

```
npm run test

```

---


## 8. CI/CD Workflow
Git Flow

    Feature branches → merged to dev

    dev → auto-merged to main if tests pass

GitHub Actions

Workflow: Project Tests

    On Push:

        Navigate to frontend/

        Runs npm ci

        Executes npm run test

    Merge Logic:

        Uses actions/github-script to auto-merge dev → main on successful test

        Requires no manual approval

Vercel Deployment

    Connected to main branch

    Auto-deploys after every successful merge

    🔐 Secrets used: ${{ secrets.GITHUB_TOKEN }} for safe repo access.

---

## 9. License

MIT License © Joshf225

```

Let me know if you'd like to add:

- Badges (build passing, coverage, etc.)
- Demo GIFs or screenshots
- Links to deployed site or API docs

I can embed them directly into this template for you.

```
