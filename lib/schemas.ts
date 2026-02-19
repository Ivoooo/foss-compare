import { z } from "zod";

export const FeatureStatusTypeSchema = z.enum(["Yes", "No", "Paid", "Partial", "Coming Soon"]);

export const FeatureStatusObjectSchema = z.object({
  status: FeatureStatusTypeSchema,
  note: z.string().optional(),
});

export const FeatureStatusSchema = z.union([FeatureStatusTypeSchema, FeatureStatusObjectSchema]);

export const GitHubStatsSchema = z.object({
  stars: z.number(),
  forks: z.number(),
  lastCommit: z.string(),
  openIssues: z.number(),
});

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
  notes: z.string().optional(),
  meta: z.object({
    addedAtVersion: z.string().optional(),
    lastCheck: z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
      version: z.string(),
      changelogLink: z.string().url().optional(),
    }),
  }).optional(),
});

// Streamer Schemas
export const StreamerPlatformSupportSchema = z.object({
  web: FeatureStatusSchema,
  pwa: FeatureStatusSchema,
  android: FeatureStatusSchema,
  ios: FeatureStatusSchema,
  androidTv: FeatureStatusSchema,
  appleTv: FeatureStatusSchema,
  windows: FeatureStatusSchema,
  mac: FeatureStatusSchema,
  linux: FeatureStatusSchema,
  samsungTv: FeatureStatusSchema.optional(),
  lgTv: FeatureStatusSchema.optional(),
  roku: FeatureStatusSchema.optional(),
});

export const CodecSupportSchema = z.object({
  h264: FeatureStatusSchema,
  h265: FeatureStatusSchema,
  av1: FeatureStatusSchema,
  vp9: FeatureStatusSchema,
});

export const StreamerFeaturesSchema = z.object({
  liveTv: FeatureStatusSchema,
  dvr: FeatureStatusSchema,
  hardwareTranscoding: FeatureStatusSchema,
  offlineDownloads: FeatureStatusSchema,
  introSkipping: FeatureStatusSchema,
  lyrics: FeatureStatusSchema,
  podcasts: FeatureStatusSchema,
  audiobooks: FeatureStatusSchema,
  photos: FeatureStatusSchema,
  plugins: FeatureStatusSchema,
  ldap: FeatureStatusSchema,
  oidc: FeatureStatusSchema,
  twoFactor: FeatureStatusSchema,
  sso: FeatureStatusSchema,
  sonarr: FeatureStatusSchema,
  radarr: FeatureStatusSchema,
  jellyseerr_overseerr: FeatureStatusSchema,
  trakt: FeatureStatusSchema,
});

export const StreamerToolSchema = BaseSoftwareToolSchema.extend({
  platforms: StreamerPlatformSupportSchema,
  codecs: CodecSupportSchema,
  features: StreamerFeaturesSchema,
});

// Password Manager Schemas
export const PasswordManagerPlatformSupportSchema = z.object({
  windows: FeatureStatusSchema,
  mac: FeatureStatusSchema,
  linux: FeatureStatusSchema,
  android: FeatureStatusSchema,
  ios: FeatureStatusSchema,
  browserExtensions: FeatureStatusSchema,
  webVault: FeatureStatusSchema,
});

export const PasswordManagerFeaturesSchema = z.object({
  twoFactor: FeatureStatusSchema,
  biometrics: FeatureStatusSchema,
  passwordSharing: FeatureStatusSchema,
  organizations: FeatureStatusSchema,
  importExport: FeatureStatusSchema,
  auditLogs: FeatureStatusSchema,
  ldap: FeatureStatusSchema,
  oidc: FeatureStatusSchema,
  sso: FeatureStatusSchema,
});

export const PasswordManagerToolSchema = BaseSoftwareToolSchema.extend({
  platforms: PasswordManagerPlatformSupportSchema,
  features: PasswordManagerFeaturesSchema,
});

export const SoftwareToolSchema = z.union([StreamerToolSchema, PasswordManagerToolSchema]);
