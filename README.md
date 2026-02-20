# foss.compare

A modern, detailed comparison tool for self-hosted software solutions.

## Overview
This project aims to provide comprehensive feature comparisons for various self-hosted software categories, including:
- TV & Movie Streamers (Jellyfin, Plex, Emby)
- Password Managers (Bitwarden, Vaultwarden, etc.)
- Dashboards
- Databases
- And more!

## Features
- **Detailed Comparison Tables:** Sort, filter, and toggle column visibility to find the best tool for your needs.
- **Smart Data:** Tracks GitHub stats, license, features, and platform support.
- **Open Source Focus:** Prioritizes FOSS but includes popular proprietary alternatives for context.
- **Automated Validation:** Data is validated against schemas to ensure accuracy.
- **Performance Benchmarks:** Automated Docker-based benchmarks for RAM and Image Size.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Data Visualization:** TanStack Table (Custom implementation)
- **Data Source:** Static JSON files, validated by Zod

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ivoooo/foss-compare.git
    cd foss-compare
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:3000` to see the application.

## Contributing
We welcome contributions! See `ROADMAP.md` for our long-term vision.

- **[Read the Contributing Guide](CONTRIBUTING.md)** for detailed instructions on adding tools or categories.
- To improve the UI, modify components in `components/comparison/`.
- Run `npm run validate` to check data integrity.

## License
MIT
