# Agent Instructions for foss.compare

## Environment Management (CRITICAL)

This project uses **Nix** for its development environment. 
**NEVER** run `npm`, `npx`, or `node` commands directly on the host system. They will likely fail or use the wrong versions.

### ALWAYS use `nix develop`
You must wrap all development commands using `nix develop --command <command>`.

**Examples:**
- `nix develop --command npm install`
- `nix develop --command npm run dev`
- `nix develop --command npm run build`
- `nix develop --command npx playwright install`

## Project Structure
- `app/`: Next.js App Router pages.
- `components/`: React components (UI and Feature-specific).
- `data/`: JSON files containing the raw comparison data.
- `lib/`: Utilities, schemas, and category configurations.
- `scripts/`: Maintenance scripts (benchmarking, GitHub stats, validation).

## Data Integrity & Schemas
- **Strict Validation**: All software data in `data/*.json` is validated against Zod schemas in `lib/schemas.ts`.
- **Validation Script**: After modifying any data files, ALWAYS run validation:
  `nix develop --command npm run validate`
- **GitHub Stats**: Do not update GitHub stars/forks manually. Use the update script:
  `nix develop --command npm run benchmark`

## Layout & Styling
- **Fixed-Height Design**: The root layout is fixed to the viewport height (`h-[calc(100vh-64px)]`).
- **Scrolling**: Content must manage its own scrolling (usually `overflow-y-auto` on a wrapper).
- **No Global Footer**: The UI is designed to be a "tool" rather than a "site". Do not restore the footer without explicit instruction.

## Commit Conventions
- Use **Conventional Commits** (e.g., `feat:`, `fix:`, `refactor:`, `chore:`).
- Keep descriptions concise and lowercase.
