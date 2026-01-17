<!-- .github/copilot-instructions.md - tailored guidance for AI coding agents -->

# Project-specific Copilot instructions

Purpose: help AI agents be productive quickly in this repo by describing the architecture, build/run commands, patterns, and concrete examples from the codebase.

## Quick commands

- Dev: `npm run dev` (starts Vite dev server)
- Build (type-check + bundle): `npm run build` — runs `tsc -b` (type-check project references) then `vite build`
- Preview production build: `npm run preview`
- Lint: `npm run lint`

## Big-picture architecture

- Vite + React + TypeScript frontend template. Type-safety is enforced across components.
- Central API layer: `src/api/api.ts` creates an `axiosInstance` using `VITE_API_URL` and exports a typed `api` object (see `src/api/auth-api.ts` for the module pattern).
- Routing: uses `@tanstack/react-router`. The root route and shared context are defined in `src/routes/root-route.tsx` (context contains `{ apiQuery, api }`). Routes are organized under `src/routes` (e.g. `private-admin`, `auth`, `public-blog`).
- State: small local/global stores use `zustand` in `src/store` (e.g. `use-theme-store.ts`).
- Data fetching: `@tanstack/react-query` is used; see `src/hooks/use-api-query.tsx` and `src/hooks/useCurrentUser.tsx` for patterns.

## Key patterns & conventions

- API modules: each module is a function that accepts an `AxiosInstance` and returns methods. Add new APIs to `src/api/api.ts` and export under `api` so the typed `ApiType` remains accurate.
  - Error handling: modules typically throw `ApiNormalResponse` when axios has a response. Follow `auth-api.ts`'s try/catch pattern.
- Routes: attach children with `.addChildren()` and pass context via `createRootRouteWithContext`. New pages should live under `src/routes/<area>` and export a route file (`*-route.tsx`).
- Components: primitives and shared UI live under `src/components/ui` (e.g. `button.tsx`, `input.tsx`), while higher-level pieces live under feature folders. Forms use controller components in `src/components/form` (e.g. `form-controller.tsx`).
- File naming: component files use kebab-case (e.g. `admin-app-sidebar.tsx`) and default export React components—follow existing style.
- Path alias: use `@/*` to import from `src` (configured in `tsconfig.*`). Always prefer the alias for consistency.

## TypeScript & build notes

- Project references: `tsconfig.json` references `tsconfig.app.json` and `tsconfig.node.json`. The `build` script runs `tsc -b` to perform full type checks before bundling.
- `tsconfig.app.json` sets `noEmit: true` because Vite handles bundling; `tsc -b` is used for type checking only — when making type-level changes, run `npm run build` to validate types.

## Env & runtime expectations

- Backend URL: environment variable `VITE_API_URL` is consumed by `src/api/api.ts`. When implementing or testing API calls locally, ensure this is set in `.env` or passed to Vite.
- Cookies / auth: `axiosInstance` is created with `withCredentials: true`, so cross-site cookie behavior matters for auth endpoints.

## When modifying API surface

- Add or change a backend API method in a `<module>-api.ts` file under `src/api/` and then register it in `src/api/api.ts`.
- Update the exported `ApiType` if you add new modules, so route and hook contexts remain correctly typed.

## Hooks, stores and shared utilities

- Use existing hooks for common behaviours: `use-api-query.tsx`, `useCurrentUser.tsx`, `useDataTable.tsx`, `useDebounce.tsx`.
- Shared helpers are in `src/lib` (e.g. `form.ts`, `utils.ts`) — prefer these utilities instead of duplicating logic.

## Styling and assets

- Tailwind CSS is the primary styling system. See `tailwind.config.js` and `src/style/index.css`.
- Animations use `tailwindcss-animate` and utility merging uses `tailwind-merge`.

## Linting & tests

- Linting: `npm run lint` (ESLint). There are no repo-level test scripts; add tests under a clear `tests/` or `__tests__/` layout if you introduce them.

## Examples to reference when making changes

- API pattern: `src/api/auth-api.ts` and `src/api/api.ts`
- Routing/context: `src/routes/root-route.tsx` and `src/routes/private-admin/home/home-route.tsx`
- UI primitives: `src/components/ui/button.tsx`, `src/components/ui/input.tsx`
- Form controllers: `src/components/form/form-controller.tsx` and `form-select-input-controller.tsx`

## Tips for AI edits

- Preserve type exports and `ApiType` changes when adding APIs — otherwise type errors will appear during `tsc -b`.
- When editing route files, ensure you register the route in `src/routes/root-route.tsx` so the route tree remains complete.
- Follow existing naming/folder conventions: feature folders in `src/routes`, UI primitives in `src/components/ui`, hooks in `src/hooks`.

If anything above is unclear or you want more detail on a specific area (routing, API, hooks, or build), tell me which part to expand or revise.
