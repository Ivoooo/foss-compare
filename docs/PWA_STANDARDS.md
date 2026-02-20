# PWA Standards & Mobile Best Practices

This document outlines the standards and configuration for the Progressive Web App (PWA) features of `foss.compare`.

## 1. Core Requirements

To maintain "Installable" status and a high PWA score, the application must meet the following criteria:

### Web App Manifest (`app/manifest.ts`)
- **Identity:** Must have `name`, `short_name`, `start_url`, and `id`.
- **Icons:** Must include at least one icon (192px and 512px recommended). `purpose: 'any maskable'` is set to support adaptive icons on Android.
- **Display:** `display: 'standalone'` ensures the app runs in its own window without browser UI.
- **Screenshots:** "Rich PWA" requires screenshots (desktop and mobile) in the manifest for the installation prompt.
- **Categories:** helps with app store indexing.

### Service Worker
- Managed via `@ducanh2912/next-pwa`.
- Configured in `next.config.ts`.
- Provides offline caching (Cache-first strategy for static assets, Network-first for others).
- **Note:** In `export` mode, the SW is generated to the output directory.

### Metadata & Viewport (`app/layout.tsx`)
- **Viewport:** Must set `width=device-width, initial-scale=1` and handle `theme-color` for both light and dark modes to match the status bar.
- **Apple Specific:** `appleWebApp` configuration handles iOS status bar and title.
- **Format Detection:** Disable automatic telephone number linking (`telephone: false`) to prevent unwanted styling overrides.

## 2. Mobile UX Best Practices

### CSS (`app/globals.css`)
- **Touch Action:** `touch-action: manipulation` on `html` disables double-tap-to-zoom, removing the 300ms click delay on mobile.
- **Tap Highlight:** `-webkit-tap-highlight-color: transparent` removes the gray overlay on tap on iOS/Android.

### Testing
To verify PWA status:
1. Build the app: `npm run build`
2. Serve the `out` directory (or start `npm run start` if not static export).
3. Open Chrome DevTools > **Lighthouse**.
4. Run a "Progressive Web App" audit.
5. Check the **Application** tab in DevTools to see the Manifest and Service Worker status.

## 3. Maintenance

- **Icons:** If updating the logo, ensure `public/icon-192.png` and `public/icon-512.png` are updated.
- **Screenshots:** Update `public/og-image.png` or add specific mobile screenshots referenced in `app/manifest.ts` to keep the install prompt fresh.
