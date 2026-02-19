# Roadmap for foss.compare

This document outlines the long-term vision and planned features for `foss.compare`, a comprehensive comparison tool for self-hosted software.

## Phase 1: Foundation (Current Status)
- [x] Initial Next.js + Tailwind + shadcn/ui setup.
- [x] Define data structure for "TV/Movie Streamers".
- [x] Create reusable comparison table with sorting, filtering, and column visibility.
- [x] Initial data for Jellyfin, Plex, Emby.
- [x] Basic landing page and category routing.

## Phase 2: Automation & Data Integrity
- [ ] **Automated GitHub Stats:** Create a GitHub Action to fetch stars, forks, and last commit dates daily and update the JSON files.
- [ ] **Data Validation:** Implement Zod schemas to validate JSON data during build time.
- [ ] **Broken Link Checker:** Automate checking of project URLs.

## Phase 3: Content Expansion
- [ ] **Password Managers:** Add Bitwarden (Vaultwarden), Keepass, etc.
- [ ] **Dashboards:** Add Homepage, Dashy, Homarr.
- [ ] **Databases:** Add Postgres, MySQL, MariaDB, SQLite.
- [ ] **VPNs:** Add WireGuard, Tailscale, Headscale, OpenVPN.
- [ ] **CI/CD:** Add Jenkins, GitLab CI, Woodpecker.
- [ ] **Monitoring:** Add Prometheus, Grafana, Zabbix.

## Phase 4: Advanced Features
- [ ] **Performance Benchmarks:**
  - Create a standardized Nix shell environment to spin up containers.
  - Automate measurement of Docker image size and idle RAM usage.
  - Add these metrics to the comparison table.
- [ ] **PWA Implementation:**
  - Add manifest.json and service workers for offline support and "Add to Home Screen".
- [ ] **Theme Toggle:** fully support Dark/Light mode switching.
- [ ] **Mobile Optimization:** Refine table view for small screens (maybe card view on mobile).

## Phase 5: Community & Contribution
- [ ] **Contribution Guide:** Detailed instructions on how to add a new tool or category.
- [ ] **Form for Submissions:** A simple issue template or web form to suggest changes.
- [ ] **Voting System:** (Long term) Allow users to vote on feature importance or accuracy (requires backend).

## Technical Debt / Maintenance
- [ ] Refactor `columns.tsx` to be more generic or generated from schema.
- [ ] Optimize bundle size.
- [ ] Improve accessibility (A11y) of the data table.
