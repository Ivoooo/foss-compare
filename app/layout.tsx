import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
// import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://foss.compare"),
  title: {
    default: "foss.compare - Self-Hosted Software Comparisons",
    template: "%s | foss.compare",
  },
  description: "Detailed comparisons of open source and self-hosted software solutions. Find the best alternatives to proprietary services.",
  keywords: ["open source", "self-hosted", "software comparison", "alternatives", "foss", "privacy", "local hosting"],
  authors: [{ name: "Ivoooo", url: "https://github.com/Ivoooo" }],
  creator: "Ivoooo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://foss.compare",
    siteName: "foss.compare",
    title: "foss.compare - Self-Hosted Software Comparisons",
    description: "Detailed comparisons of open source and self-hosted software solutions.",
    images: [
      {
        url: "/og-image.png", // Will be created or needs to be provided
        width: 1200,
        height: 630,
        alt: "foss.compare - Self-Hosted Software Comparisons",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "foss.compare - Self-Hosted Software Comparisons",
    description: "Detailed comparisons of open source and self-hosted software solutions.",
    images: ["/og-image.png"],
    creator: "@Ivoooo", // Assuming based on maintainer name, can be updated
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "foss.compare",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SiteHeader />
            <main className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden">{children}</main>
            {/* <SiteFooter /> */}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
