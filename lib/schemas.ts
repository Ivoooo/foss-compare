import { z } from "zod";

export const FeatureStatusTypeSchema = z.enum(["Yes", "No", "Paid", "Partial", "Coming Soon", "Unknown"]);

export const FeatureStatusObjectSchema = z.object({
  status: FeatureStatusTypeSchema,
  note: z.string().optional(),
  verification: z.object({
    verifiedAtVersion: z.string().optional(),
    verificationLink: z.string().url().optional(),
    dateVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD").optional(),
  }).optional(),
});

export const StrictFeatureStatusObjectSchema = z.object({
  status: FeatureStatusTypeSchema,
  note: z.string().optional(),
  verification: z.object({
    verifiedAtVersion: z.string(),
    verificationLink: z.string().url(),
    dateVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD").optional(),
  }),
});

export const FeatureStatusSchema = z.union([FeatureStatusTypeSchema, FeatureStatusObjectSchema]);
export const StrictFeatureStatusSchema = StrictFeatureStatusObjectSchema;

export const GitHubStatsSchema = z.object({
  stars: z.number(),
  forks: z.number(),
  lastCommit: z.string(),
  openIssues: z.number(),
});

export const AutomationSchema = z.object({
  docker: z.object({
    image: z.string(),
    env: z.record(z.string(), z.string()).optional(),
  }).optional(),
}).optional();

export const PerformanceSchema = z.object({
  ramUsage: z.string().optional(),
  dockerImageSize: z.string().optional(),
}).optional();

export const BaseSoftwareToolSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  website: z.string().url(),
  repository: z.string().url().optional(),
  license: z.string(),
  openSource: z.boolean(),
  githubStats: GitHubStatsSchema.optional(),
  language: z.array(z.string()),
  dockerSupport: FeatureStatusSchema,
  armSupport: FeatureStatusSchema,
  automation: AutomationSchema,
  performance: PerformanceSchema,
  notes: z.string().optional(),
  meta: z.object({
    lastCheck: z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
      version: z.string(),
      changelogLink: z.string().url().optional(),
    }),
  }).optional(),
});

// Streamer Schemas
export const StreamerPlatformSupportSchema = z.object({
  web: StrictFeatureStatusSchema,
  pwa: StrictFeatureStatusSchema,
  android: StrictFeatureStatusSchema,
  ios: StrictFeatureStatusSchema,
  androidTv: StrictFeatureStatusSchema,
  appleTv: StrictFeatureStatusSchema,
  windows: StrictFeatureStatusSchema,
  mac: StrictFeatureStatusSchema,
  linux: StrictFeatureStatusSchema,
  samsungTv: StrictFeatureStatusSchema.optional(),
  lgTv: StrictFeatureStatusSchema.optional(),
  roku: StrictFeatureStatusSchema.optional(),
});

export const CodecSupportSchema = z.object({
  h264: StrictFeatureStatusSchema,
  h265: StrictFeatureStatusSchema,
  av1: StrictFeatureStatusSchema,
  vp9: StrictFeatureStatusSchema,
  mpeg2: StrictFeatureStatusSchema,
  vc1: StrictFeatureStatusSchema,
  aac: StrictFeatureStatusSchema,
  ac3: StrictFeatureStatusSchema,
  eac3: StrictFeatureStatusSchema,
  truehd: StrictFeatureStatusSchema,
  dts: StrictFeatureStatusSchema,
  dtshdma: StrictFeatureStatusSchema,
  flac: StrictFeatureStatusSchema,
});

export const StreamerFeaturesSchema = z.object({
  multipleUsers: StrictFeatureStatusSchema,
  parentalControls: StrictFeatureStatusSchema,
  liveTv: StrictFeatureStatusSchema,
  dvr: StrictFeatureStatusSchema,
  hardwareTranscoding: StrictFeatureStatusSchema,
  offlineDownloads: StrictFeatureStatusSchema,
  watchTogether: StrictFeatureStatusSchema,
  autoSubtitles: StrictFeatureStatusSchema,
  introSkipping: StrictFeatureStatusSchema,
  skipCredits: StrictFeatureStatusSchema,
  skipAds: StrictFeatureStatusSchema,
  lyrics: StrictFeatureStatusSchema,
  podcasts: StrictFeatureStatusSchema,
  audiobooks: StrictFeatureStatusSchema,
  ebooks: StrictFeatureStatusSchema,
  photos: StrictFeatureStatusSchema,
  plugins: StrictFeatureStatusSchema,
  ldap: StrictFeatureStatusSchema,
  oidc: StrictFeatureStatusSchema,
  twoFactor: StrictFeatureStatusSchema,
  sso: StrictFeatureStatusSchema,
  sonarr: StrictFeatureStatusSchema,
  radarr: StrictFeatureStatusSchema,
  seerr: StrictFeatureStatusSchema,
  trakt: StrictFeatureStatusSchema,
});

export const StreamerToolSchema = BaseSoftwareToolSchema.extend({
  dockerSupport: StrictFeatureStatusSchema,
  armSupport: StrictFeatureStatusSchema,
  platforms: StreamerPlatformSupportSchema,
  codecs: CodecSupportSchema,
  features: StreamerFeaturesSchema,
});

// Password Manager Schemas
export const PasswordManagerPlatformSupportSchema = z.object({
  windows: StrictFeatureStatusSchema,
  mac: StrictFeatureStatusSchema,
  linux: StrictFeatureStatusSchema,
  android: StrictFeatureStatusSchema,
  ios: StrictFeatureStatusSchema,
  browserExtensions: StrictFeatureStatusSchema,
  webVault: StrictFeatureStatusSchema,
  cli: StrictFeatureStatusSchema,
});

export const PasswordManagerFeaturesSchema = z.object({
  kdbxSupport: StrictFeatureStatusSchema,
  customFields: StrictFeatureStatusSchema,
  totp: StrictFeatureStatusSchema,
  passwordSharing: StrictFeatureStatusSchema,
  vaultSharing: StrictFeatureStatusSchema,
  organizations: StrictFeatureStatusSchema,
  autoFill: StrictFeatureStatusSchema,
  passkeys: StrictFeatureStatusSchema,
  secureNotes: StrictFeatureStatusSchema,
  fileAttachments: StrictFeatureStatusSchema,
  passwordGenerator: StrictFeatureStatusSchema,
  localOffline: StrictFeatureStatusSchema,
  emergencyAccess: StrictFeatureStatusSchema,
  autoClear: StrictFeatureStatusSchema,
  auditLogs: StrictFeatureStatusSchema,
  compromisedPasswords: StrictFeatureStatusSchema,
  twoFactor: StrictFeatureStatusSchema,
  biometrics: StrictFeatureStatusSchema,
  hardwareKeys: StrictFeatureStatusSchema,
  ldap: StrictFeatureStatusSchema,
  oidc: StrictFeatureStatusSchema,
  sso: StrictFeatureStatusSchema,
});

export const PasswordManagerToolSchema = BaseSoftwareToolSchema.extend({
  dockerSupport: StrictFeatureStatusSchema,
  armSupport: StrictFeatureStatusSchema,
  platforms: PasswordManagerPlatformSupportSchema,
  features: PasswordManagerFeaturesSchema,
});

// Music Streaming Schemas
export const MusicStreamingPlatformSupportSchema = z.object({
  windows: FeatureStatusSchema,
  mac: FeatureStatusSchema,
  linux: FeatureStatusSchema,
  android: FeatureStatusSchema,
  ios: FeatureStatusSchema,
  webUi: FeatureStatusSchema,
  cli: FeatureStatusSchema,
});

export const MusicStreamingFeaturesSchema = z.object({
  subsonicApi: FeatureStatusSchema,
  tagBased: FeatureStatusSchema,
  folderBased: FeatureStatusSchema,
  losslessFlac: FeatureStatusSchema,
  m4bSupport: FeatureStatusSchema,
  smartPlaylists: FeatureStatusSchema,
  scrobbling: FeatureStatusSchema,
  podcasts: FeatureStatusSchema,
  ebooks: FeatureStatusSchema,
  lyrics: FeatureStatusSchema,
  progressSync: FeatureStatusSchema,
  gapless: FeatureStatusSchema,
  transcoding: FeatureStatusSchema,
  jukebox: FeatureStatusSchema,
  chromecast: FeatureStatusSchema,
  dlnaBridge: FeatureStatusSchema,
  multiUser: FeatureStatusSchema,
  roles: FeatureStatusSchema,
  publicSharing: FeatureStatusSchema,
  federation: FeatureStatusSchema,
  twoFactor: FeatureStatusSchema,
  ldap: FeatureStatusSchema,
  oidc: FeatureStatusSchema,
});

export const MusicStreamingToolSchema = BaseSoftwareToolSchema.extend({
  dockerSupport: FeatureStatusSchema,
  armSupport: FeatureStatusSchema,
  platforms: MusicStreamingPlatformSupportSchema,
  features: MusicStreamingFeaturesSchema,
});

export const SoftwareToolSchema = z.union([StreamerToolSchema, PasswordManagerToolSchema, MusicStreamingToolSchema]);

// Inferred Types
export type FeatureStatusType = z.infer<typeof FeatureStatusTypeSchema>;
export type FeatureStatusObject = z.infer<typeof FeatureStatusObjectSchema>;
export type FeatureStatus = z.infer<typeof FeatureStatusSchema>;
export type GitHubStats = z.infer<typeof GitHubStatsSchema>;
export type Automation = z.infer<typeof AutomationSchema>;
export type Performance = z.infer<typeof PerformanceSchema>;
export type BaseSoftwareTool = z.infer<typeof BaseSoftwareToolSchema>;

export type StreamerPlatformSupport = z.infer<typeof StreamerPlatformSupportSchema>;
export type CodecSupport = z.infer<typeof CodecSupportSchema>;
export type StreamerFeatures = z.infer<typeof StreamerFeaturesSchema>;
export type StreamerTool = z.infer<typeof StreamerToolSchema>;

export type PasswordManagerPlatformSupport = z.infer<typeof PasswordManagerPlatformSupportSchema>;
export type PasswordManagerFeatures = z.infer<typeof PasswordManagerFeaturesSchema>;
export type PasswordManagerTool = z.infer<typeof PasswordManagerToolSchema>;

export type MusicStreamingPlatformSupport = z.infer<typeof MusicStreamingPlatformSupportSchema>;
export type MusicStreamingFeatures = z.infer<typeof MusicStreamingFeaturesSchema>;
export type MusicStreamingTool = z.infer<typeof MusicStreamingToolSchema>;

export type SoftwareTool = z.infer<typeof SoftwareToolSchema>;

export type FeatureItem = {
  key: string;
  label: string;
};

export type CategorySection = {
  id: string;
  label: string;
  items: FeatureItem[];
};
