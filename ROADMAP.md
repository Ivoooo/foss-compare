# Roadmap for foss.compare

This document outlines the long-term vision and planned features for `foss.compare`, a comprehensive comparison tool for self-hosted software.

## Phase 1: Foundation (Current Status)
- [x] Initial Next.js + Tailwind + shadcn/ui setup.
- [x] Define data structure for "TV/Movie Streamers".
- [x] Create reusable comparison table with sorting, filtering, and column visibility.
- [x] Initial data for Jellyfin, Plex, Emby.
- [x] Basic landing page and category routing.

## Phase 2: Automation & Data Integrity
- [x] **Automated GitHub Stats:** Create a GitHub Action to fetch stars, forks, and last commit dates daily and update the JSON files.
- [x] **Data Validation:** Implement Zod schemas to validate JSON data during build time.
- [x] **Broken Link Checker:** Automate checking of project URLs.

## Phase 3: Content Expansion
- [x] **Password Managers:** Add Bitwarden (Vaultwarden), Keepass, etc.
- [ ] **Dashboards:** Add Homepage, Dashy, Homarr.
- [ ] **Databases:** Add Postgres, MySQL, MariaDB, SQLite.
- [ ] **VPNs:** Add WireGuard, Tailscale, Headscale, OpenVPN.
- [ ] **CI/CD:** Add Jenkins, GitLab CI, Woodpecker.
- [ ] **Monitoring:** Add Prometheus, Grafana, Zabbix.

## Phase 4: Advanced Features
- [x] **Performance Benchmarks (Initial):**
  - [x] Automate measurement of Docker image size and idle RAM usage (`npm run benchmark`).
  - [x] Standardize environment (Nix shell).
  - [x] Add these metrics to the comparison table. (Done)
- [x] **PWA Implementation:**
  - Add manifest.json and service workers for offline support and "Add to Home Screen".
- [x] **Theme Toggle:** fully support Dark/Light mode switching.
- [ ] **Mobile Optimization:** Refine table view for small screens (maybe card view on mobile).

## Phase 5: Community & Contribution
- [x] **Contribution Guide:** Detailed instructions on how to add a new tool or category.
- [ ] **Form for Submissions:** A simple issue template or web form to suggest changes.
- [ ] **Voting System:** (Long term) Allow users to vote on feature importance or accuracy (requires backend).

## Technical Debt / Maintenance
- [x] Refactor `columns.tsx` / `ComparisonTable` to be more generic.
- [ ] Optimize bundle size.
- [ ] Improve accessibility (A11y) of the data table.
