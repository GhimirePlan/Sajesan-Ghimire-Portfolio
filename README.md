# Sajesan Ghimire · Electrical Engineering Portfolio

A responsive portfolio retaining the original dark violet design and existing sections for solar PV,
power systems, research, and automation. React + TypeScript + Vite, with a separate Express/MongoDB
content API. Public pages render without a database; unavailable content has a clear fallback.

## Local development

Use Node.js 22 or later.

```sh
npm ci
npm ci --prefix server
cp server/.env.example server/.env
npm run server
# In a second terminal:
npm run dev
```

Vite proxies `/api` to port 5000. Set `VITE_API_BASE_URL` at build time only when the API is
deployed on a separate origin. Configure that frontend origin in the API's comma-separated
`CORS_ORIGINS`.

## Content and admin

Set `MONGO_URI` and a strong random `JWT_SECRET` in your deployment's secret settings. Set
`ADMIN_EMAIL` and `ADMIN_PASSWORD` (at least 16 characters) before running
`npm run data:import --prefix server` once. This creates an admin without deleting existing users.
Remove the bootstrap password from the runtime afterwards. No default password is shipped. Existing
accounts created with the old default password should have their password changed before public
deployment.

Visit `/login` to manage articles, moderated comments, and LinkedIn posts. Public API queries
exclude drafts; admin management queries require a valid admin token. Public comments never include
email addresses. Rich HTML is sanitized before display. Login and comment creation are rate limited;
the default limiter is per process, so use platform/WAF rate limiting for coordinated limits across
serverless instances.

The contact form uses FormSubmit for `contact@sajesanghimire.com.np`. Its owner must activate that
mailbox with FormSubmit before delivery works. Success is shown only after the provider confirms
acceptance; delivery failures retain the message and offer a direct email link. Browser tests stub
the provider and do not send email.

## Deployment

`vercel.json` retains the existing combined Vite + Express deployment: `/api/*` goes to the server
and other routes to the SPA. Configure `MONGO_URI`, `JWT_SECRET`, and `CORS_ORIGINS` in Vercel;
install server dependencies as well as frontend dependencies. An unconfigured database returns HTTP
503 without crashing the API. `/api/health` reports database readiness.

The GitHub Actions workflow also publishes the static frontend to GitHub Pages. GitHub Pages cannot
host Express or MongoDB: use the Vercel deployment for the complete app, or set the repository
variable `VITE_API_BASE_URL` to the separately deployed API origin. The Pages build includes a
`404.html` fallback for direct SPA navigation. Without an API, the portfolio and project gallery
work and notes show an unavailable state.

## Validation

```sh
npm run build
npm run ts:check
npm test --prefix server
```

Backend regression tests cover service failure handling, draft visibility, comment privacy, invalid
input, missing authentication, and password hashing behavior. Live database operations and email
delivery require owner configuration and are not verified by those tests.

Portfolio content is in `src/constants/index.ts`; layout and styles are in `src/pages/HomePage.tsx`,
`src/components/sections`, and `src/globals.css`. Images use optimized WebP files, project images
load lazily, system fonts avoid external font requests, and admin/article routes load on demand.

The portfolio contains no WebGL scenes, 3D libraries, model assets, or pointer-tracked tilt effects.
Entrance animations run once with small opacity/transform changes; hover effects use short CSS
transitions. Motion respects the visitor’s reduced-motion setting. Existing project galleries,
service details, articles, testimonials, scheduling, and contact flows remain available.

The projects page uses `src/constants/projectCatalog.ts` for its catalog. Search, project type, and
discipline filters are stored in the URL. Each project has a shareable details URL; the full card
supports pointer and keyboard activation. The details dialog supports Escape, browser Back, focus
restoration, and a persistent close toolbar. Copying a link falls back to a selectable URL when
clipboard access is unavailable.

## Publishing studio

Use `/admin` for articles, projects, image uploads, moderation, and LinkedIn updates. Both content
editors support visual formatting, HTML source, tables, image upload/paste/drop, image descriptions
and sizing, live preview, draft recovery on the current device, and explicit draft/published status.
Images are optimized in the browser and stored durably in the existing MongoDB database; no
additional image hosting account is required. Archives can be restored; permanent deletion is
available only after archiving. Images referenced by saved content cannot be deleted.

The public projects catalog and homepage highlights now use the content API. The original 21
projects can be imported idempotently through the studio, preserving their existing link IDs. New
project creation also initializes the original catalog when needed. Featured projects are selected
in the editor. Article and project links can be copied from their editors, lists, and public pages.

Run `npm test --prefix server` for validation tests. For MongoDB integration tests against a
separate, disposable test database, set `TEST_MONGO_URI` before running the same command; the tests
create and remove only a database named with the `portfolio_test_` prefix.
