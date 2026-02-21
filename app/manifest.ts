import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "foss.compare - Self-Hosted Software Comparisons",
    short_name: "foss.compare",
    description: "Detailed comparisons of open source and self-hosted software solutions.",
    start_url: "/",
    id: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone", "minimal-ui"],
    background_color: "#ffffff",
    theme_color: "#000000",
    orientation: "any",
    categories: ["productivity", "utilities", "development"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/og-image.png",
        sizes: "1200x630",
        type: "image/png",
        form_factor: "wide",
        label: "Comparison Table Desktop View",
      },
      {
        src: "/og-image.png",
        sizes: "1200x630",
        type: "image/png",
        label: "Comparison Table Mobile View",
      }
    ],
    shortcuts: [
      {
        name: "Home",
        url: "/",
        icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
    ],
  };
}
