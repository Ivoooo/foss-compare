# Agent Instructions for foss.compare

## Environment Management (CRITICAL)

This project uses **Nix** for its development environment. 
**NEVER** run `npm`, `npx`, or `node` commands directly on the host system. They will likely fail or use the wrong versions.

### ALWAYS use `nix develop`
You must wrap all development commands using `nix develop -c <command>`.

**Examples:**
- `nix develop -c npm install`
- `nix develop -c npm run dev`
- `nix develop -c npm run build`
- `nix develop -c npx playwright install`

### Playwright & Browser Subagents
- **Mandatory Setup**: If you intend to use a Browser Subagent to crawl the web or capture screenshots, you **must** ensure the browsers are downloaded first by running:
  `nix develop -c npx playwright install`
- **Nix Integration**: `flake.nix` supplies the `playwright-driver` and correctly configures `PLAYWRIGHT_BROWSERS_PATH=$PWD/.cache/ms-playwright`. This ensures browser binaries are downloaded locally inside the project to `.cache` rather than polluting the host system.
- If a browser tool fails with `exit status 127: failed to install playwright`, it means this command needs to be executed.

## Project Structure
- `app/`: Next.js App Router pages.
- `components/`: React components (UI and Feature-specific).
- `data/`: JSON files containing the raw comparison data.
- `lib/`: Utilities, schemas, and category configurations.
- `scripts/`: Maintenance scripts (benchmarking, GitHub stats, validation).

## Data Integrity & Schemas
- **Strict Validation**: All software data in `data/*.json` is validated against Zod schemas defined in each category's config file (e.g., `lib/categories/[category]/config.ts`).
- **Validation Script**: After modifying any data files, ALWAYS run validation:
  `nix develop -c npm run validate`
- **GitHub Stats**: Do not update GitHub stars/forks manually. Use the update script:
  `nix develop -c npm run benchmark`

## Layout & Styling
- **Fixed-Height Design**: The root layout is fixed to the viewport height (`h-[calc(100vh-64px)]`).
- **Scrolling**: Content must manage its own scrolling (usually `overflow-y-auto` on a wrapper).
- **No Global Footer**: The UI is designed to be a "tool" rather than a "site". Do not restore the footer without explicit instruction.

## Commit Conventions
- Use **Conventional Commits** (e.g., `feat:`, `fix:`, `refactor:`, `chore:`).
- Keep descriptions concise and lowercase.
