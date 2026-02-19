import { MonitorPlay, Shield, LayoutDashboard, Database, LucideIcon } from "lucide-react";
import { CategorySection, SoftwareTool } from "@/types/software";
import streamersData from "@/data/streamers.json";
import passwordManagersData from "@/data/password-managers.json";

export interface CategoryConfig {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  data: SoftwareTool[];
  sections: CategorySection[];
  status: "Active" | "Coming Soon";
}

const STREAMER_SECTIONS: CategorySection[] = [
  {
    id: "platforms",
    label: "Platform Support",
    items: [
      { key: "platforms.web", label: "Web" },
      { key: "platforms.pwa", label: "PWA" },
      { key: "platforms.android", label: "Android" },
      { key: "platforms.ios", label: "iOS" },
      { key: "platforms.androidTv", label: "Android TV" },
      { key: "platforms.appleTv", label: "Apple TV" },
      { key: "platforms.windows", label: "Windows" },
      { key: "platforms.mac", label: "macOS" },
      { key: "platforms.linux", label: "Linux" },
      { key: "platforms.samsungTv", label: "Samsung TV" },
      { key: "platforms.lgTv", label: "LG TV" },
      { key: "platforms.roku", label: "Roku" },
    ],
  },
  {
    id: "codecs",
    label: "Codec Support",
    items: [
      { key: "codecs.h264", label: "H.264" },
      { key: "codecs.h265", label: "H.265 (HEVC)" },
      { key: "codecs.av1", label: "AV1" },
      { key: "codecs.vp9", label: "VP9" },
    ],
  },
  {
    id: "features",
    label: "General Features",
    items: [
      { key: "features.liveTv", label: "Live TV" },
      { key: "features.dvr", label: "DVR" },
      { key: "features.hardwareTranscoding", label: "Hardware Transcoding" },
      { key: "features.offlineDownloads", label: "Offline Downloads" },
      { key: "features.introSkipping", label: "Intro Skipping" },
      { key: "features.lyrics", label: "Lyrics" },
      { key: "features.podcasts", label: "Podcasts" },
      { key: "features.audiobooks", label: "Audiobooks" },
      { key: "features.photos", label: "Photos" },
      { key: "features.plugins", label: "Plugins" },
      { key: "dockerSupport", label: "Docker Support" },
      { key: "armSupport", label: "ARM Support" },
    ],
  },
  {
    id: "auth",
    label: "Authentication",
    items: [
      { key: "features.ldap", label: "LDAP" },
      { key: "features.oidc", label: "OIDC" },
      { key: "features.twoFactor", label: "Two-Factor Auth" },
      { key: "features.sso", label: "SSO" },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    items: [
      { key: "features.sonarr", label: "Sonarr" },
      { key: "features.radarr", label: "Radarr" },
      { key: "features.jellyseerr_overseerr", label: "Jellyseerr / Overseerr" },
      { key: "features.trakt", label: "Trakt" },
    ],
  },
];

const PASSWORD_MANAGER_SECTIONS: CategorySection[] = [
  {
    id: "platforms",
    label: "Platform Support",
    items: [
        { key: "platforms.windows", label: "Windows" },
        { key: "platforms.mac", label: "macOS" },
        { key: "platforms.linux", label: "Linux" },
        { key: "platforms.android", label: "Android" },
        { key: "platforms.ios", label: "iOS" },
        { key: "platforms.browserExtensions", label: "Browser Extensions" },
        { key: "platforms.webVault", label: "Web Vault" },
    ]
  },
  {
    id: "security",
    label: "Security Features",
    items: [
        { key: "features.twoFactor", label: "Two-Factor Auth" },
        { key: "features.biometrics", label: "Biometrics" },
        { key: "features.auditLogs", label: "Audit Logs" },
    ]
  },
  {
    id: "features",
    label: "General Features",
    items: [
        { key: "features.passwordSharing", label: "Password Sharing" },
        { key: "features.organizations", label: "Organizations" },
        { key: "features.importExport", label: "Import/Export" },
        { key: "dockerSupport", label: "Docker Support" },
        { key: "armSupport", label: "ARM Support" },
    ]
  },
  {
    id: "auth",
    label: "Authentication",
    items: [
        { key: "features.ldap", label: "LDAP" },
        { key: "features.oidc", label: "OIDC" },
        { key: "features.sso", label: "SSO" },
    ]
  }
];

export const categories: CategoryConfig[] = [
  {
    id: "streamers",
    title: "TV & Movie Streamers",
    description: "Jellyfin, Plex, Emby, and more. Compare transcoding, platform support, and features.",
    icon: MonitorPlay,
    data: streamersData as unknown as SoftwareTool[],
    sections: STREAMER_SECTIONS,
    status: "Active",
  },
  {
    id: "password-managers",
    title: "Password Managers",
    description: "Bitwarden, Vaultwarden, Keepass, and others. Security features, sync, and clients.",
    icon: Shield,
    data: passwordManagersData as unknown as SoftwareTool[],
    sections: PASSWORD_MANAGER_SECTIONS,
    status: "Active",
  },
  {
    id: "dashboards",
    title: "Dashboards",
    description: "Homepage, Dashy, Homarr. Customizable start pages for your services.",
    icon: LayoutDashboard,
    data: [],
    sections: [],
    status: "Coming Soon",
  },
   {
    id: "databases",
    title: "Databases",
    description: "Postgres, MySQL, MariaDB, SQLite. Performance, replication, and features.",
    icon: Database,
    data: [],
    sections: [],
    status: "Coming Soon",
  },
];

export function getCategory(id: string): CategoryConfig | undefined {
  return categories.find((c) => c.id === id);
}
