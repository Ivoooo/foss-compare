# Contributing to foss.compare

Thank you for your interest in contributing to **foss.compare**! We welcome contributions from the community to make this the best resource for self-hosted software comparisons.

This guide will help you get started with adding new tools, creating new categories, and verifying your changes.

## Table of Contents
- [Adding a New Tool](#adding-a-new-tool)
- [Creating a New Category](#creating-a-new-category)
- [Running Validation](#running-validation)
- [Running Benchmarks](#running-benchmarks)
- [Code Style & Structure](#code-style--structure)

## Adding a New Tool

To add a new software tool (e.g., a new Password Manager) to an existing category, we recommend using the CLI helper:

```bash
npm run create-tool
```

This interactive script will:
1.  Ask you to select a category.
2.  Prompt for basic details (Name, Website, Repository, etc.).
3.  Generate a new JSON file in the correct directory with default values.
4.  Update the category's `index.ts` file to include the new tool.

After generating the file, open it (e.g., `data/password-managers/new-tool.json`) and fill in the specific feature support status (e.g., `platforms`, `features`).

**Manual Method**:
If you prefer manual creation:
1.  Create a new JSON file in the category directory (e.g., `data/vpns/my-vpn.json`).
2.  Copy an existing tool's JSON as a template.
3.  Update the `id`, `name`, and other fields.
4.  Add the import to `data/vpns/index.ts`.
5.  Run `npm run validate`.

## Updating GitHub Stats & Versions

To update GitHub stars, forks, last commit date, and fetch the latest release version for all tools:

```bash
npm run update-stats
```

This script requires a `GITHUB_TOKEN` environment variable to avoid rate limits. It updates the `githubStats` object and `meta.lastCheck` in each tool's JSON file.

## Creating a New Category

To add a completely new category (e.g., "VPNs"):

1.  **Create Data Directory**: Create a new directory in `data/` (e.g., `data/vpns/`).
2.  **Create Config**:
    -   Create a new directory `lib/categories/vpns/`.
    -   Create `lib/categories/vpns/config.ts` to define the Zod schema, types, and sections for the new category.
    -   Export the config object.
3.  **Create Index**:
    -   Create `lib/categories/vpns/index.ts` to import the config and data, and export the final category object.
4.  **Register Category**:
    -   Edit `lib/categories.ts`.
    -   Import your new category index file.
    -   Add it to the `categories` array.
    -   Add the new tool type to the `SoftwareTool` union type.
5.  **Add Navigation**: The new category will automatically appear in the UI.

## Running Validation

Before submitting a Pull Request, always run the validation script to ensure your data adheres to the schema:

```bash
npm run validate
```

If validation fails, the script will output the specific error location.

## Running Benchmarks

If you added a Docker image for a tool, you can run the benchmark script to measure image size and idle RAM usage.

**Prerequisites**:
-   Docker must be installed and running.

**Run**:
```bash
npm run benchmark
```

This script will:
1.  Pull the Docker images specified in `automation.docker.image`.
2.  Start a container.
3.  Measure memory usage after 30 seconds of stabilization.
4.  Update the `performance` object in the JSON file.

**Note**: Please avoid committing benchmark results for tools you haven't changed, unless you are doing a general update.

## Code Style & Structure

-   **Types**: We use Zod for runtime validation and TypeScript for static analysis. The category's `config.ts` is the single source of truth.
-   **Components**: UI components are located in `components/comparison/`.
-   **Styling**: We use Tailwind CSS.
