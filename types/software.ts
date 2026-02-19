export type FeatureStatus = "Yes" | "No" | "Paid" | "Partial" | "Coming Soon";

export interface GitHubStats {
  stars: number;
  forks: number;
  lastCommit: string; // ISO Date or "2 days ago"
  openIssues: number;
}

export interface PlatformSupport {
  web: FeatureStatus;
  pwa: FeatureStatus;
  android: FeatureStatus;
  ios: FeatureStatus;
  androidTv: FeatureStatus;
  appleTv: FeatureStatus;
  windows: FeatureStatus;
  mac: FeatureStatus;
  linux: FeatureStatus;
  samsungTv?: FeatureStatus;
  lgTv?: FeatureStatus;
  roku?: FeatureStatus;
}

export interface CodecSupport {
  h264: FeatureStatus;
  h265: FeatureStatus;
  av1: FeatureStatus;
  vp9: FeatureStatus;
}

export interface StreamerFeatures {
  liveTv: FeatureStatus;
  dvr: FeatureStatus;
  hardwareTranscoding: FeatureStatus;
  offlineDownloads: FeatureStatus;
  introSkipping: FeatureStatus;
  lyrics: FeatureStatus;
  podcasts: FeatureStatus;
  audiobooks: FeatureStatus;
  photos: FeatureStatus;
  plugins: FeatureStatus;

  // Auth
  ldap: FeatureStatus;
  oidc: FeatureStatus;
  twoFactor: FeatureStatus;
  sso: FeatureStatus;

  // Integrations
  sonarr: FeatureStatus;
  radarr: FeatureStatus;
  jellyseerr_overseerr: FeatureStatus; // Jellyseerr for Jellyfin, Overseerr for Plex
  trakt: FeatureStatus;
}

export interface SoftwareTool {
  id: string;
  name: string;
  description: string;
  website: string;
  repository?: string; // GitHub/GitLab URL
  license: "GPL-3.0" | "GPL-2.0" | "MIT" | "Proprietary" | "Other" | string;
  openSource: boolean;
  githubStats?: GitHubStats; // Optional for non-GitHub projects

  // Common technical details
  language: string[]; // e.g. ["C#", "React"]
  dockerSupport: FeatureStatus;
  armSupport: FeatureStatus;

  // Category specific data
  platforms: PlatformSupport;
  codecs: CodecSupport;
  features: StreamerFeatures;

  // Notes
  notes?: string;
}
