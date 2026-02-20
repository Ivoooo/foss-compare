import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        url: "/og-image.png",
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
    creator: "@Ivoooo",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
            <SkipLink />
            <SiteHeader />
            <main id="main-content" className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden min-h-0">{children}</main>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
