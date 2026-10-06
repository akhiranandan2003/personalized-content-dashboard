# PulseBoard — Personalized Content Dashboard

**Live Demo:** https://pulseboard-dashboard-dmk6ph3jw-thota-akhira-nandans-projects.vercel.app/

**GitHub:** https://github.com/akhiranandan2003/personalized-content-dashboard

A responsive personalized content dashboard built for the SDE Intern frontend assignment.

## Stack
- Next.js + React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Framer Motion Reorder
- NewsAPI integration
- TMDB integration
- Mock social feed
- Vitest + React Testing Library setup
- Playwright E2E

## Features
- Personalized category preferences persisted in localStorage
- Unified news, movie and social feed
- Favorites
- Trending section
- Debounced search
- Load-more pagination
- Drag/reorder content cards
- Dark mode persisted in localStorage
- Responsive dashboard layout
- Loading, error and empty states
- Server-side API routes keep provider keys out of the browser

## Setup
1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Add `NEWS_API_KEY` and `TMDB_API_KEY` if live provider data is required.
5. Run `npm run dev`.
6. Open `http://localhost:3000`.

The dashboard has demo content when provider keys are not configured, so the UI can still be reviewed locally.

## Testing
- `npm test` — unit tests
- `npm run test:e2e` — Playwright end-to-end tests

## Project flow
1. User selects preferred categories.
2. Preferences are stored in Redux and localStorage.
3. Next.js API routes request provider data securely.
4. News, movie and social content are normalized into one card format.
5. Users can search, favorite, reorder and load more content.
6. Dark mode and preferences survive refreshes.

## Security
API keys are read only from server-side environment variables and are not committed to GitHub.
