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

To add a new software tool (e.g., a new Password Manager) to an existing category:

1.  **Locate the Data File**: Find the relevant JSON file in the `data/` directory (e.g., `data/password-managers/vaultwarden.json`).
2.  **Add the Entry**: Add a new object to the array. You can copy an existing entry as a template.
3.  **Fill Required Fields**:
    -   `id`: A unique, URL-friendly identifier (e.g., `vaultwarden`).
    -   `name`: The display name of the tool.
    -   `website`: Official website URL.
    -   `license`: License type (e.g., "MIT", "GPL-3.0", "Proprietary").
    -   `openSource`: `true` or `false`.
    -   `dockerSupport` / `armSupport`: "Yes", "No", "Partial", etc.
    -   `automation`: (Optional) Docker image details for benchmarking.
4.  **Fill Category-Specific Fields**:
    -   `platforms`: Support status for each platform.
    -   `features`: Support status for each feature defined in the category schema.
    -   **Status Values**: Use "Yes", "No", "Paid", "Partial", or "Coming Soon". You can also use an object `{ "status": "Yes", "note": "..." }` for more detail.
5.  **Validate**: Run `npm run validate` to ensure your JSON matches the schema.

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
