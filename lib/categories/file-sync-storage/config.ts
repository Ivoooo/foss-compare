import { z } from "zod";
import { HardDrive } from "lucide-react";
import {
    BaseSoftwareToolSchema,
    FeatureStatusSchema,
    CategorySection
} from "@/lib/base-schemas";
import { CategoryConfig } from "../types";

// Schemas
export const FileSyncStoragePlatformSupportSchema = z.object({
  windows: FeatureStatusSchema,
  mac: FeatureStatusSchema,
  linux: FeatureStatusSchema,
  android: FeatureStatusSchema,
  ios: FeatureStatusSchema,
  webInterface: FeatureStatusSchema,
  cli: FeatureStatusSchema,
});

export const FileSyncStorageFeaturesSchema = z.object({
  // Core Sync
  s3Backend: FeatureStatusSchema,
  deltaSync: FeatureStatusSchema,
  decentralized: FeatureStatusSchema,
  versioning: FeatureStatusSchema,
  fileLocking: FeatureStatusSchema,
  webdav: FeatureStatusSchema,

  // Collaboration
  fullTextSearch: FeatureStatusSchema,
  officeIntegration: FeatureStatusSchema,
  publicSharing: FeatureStatusSchema,
  fileComments: FeatureStatusSchema,

  // Security
  e2eEncryption: FeatureStatusSchema,
  ransomwareProtection: FeatureStatusSchema,
  auditLogs: FeatureStatusSchema,
  granularAcls: FeatureStatusSchema,

  // Auth
  twoFactor: FeatureStatusSchema,
  ldap: FeatureStatusSchema,
  oidc: FeatureStatusSchema,
  sso: FeatureStatusSchema,

  // Moved from top-level due to schema conflict
  automation: FeatureStatusSchema,
  performance: z.object({
    status: z.string(),
    note: z.string().optional(),
    verification: z.object({
      verifiedAtVersion: z.string(),
      verificationLink: z.string().url(),
      dateVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD").optional(),
    }),
  }),
});

export const FileSyncStorageToolSchema = BaseSoftwareToolSchema.extend({
  platforms: FileSyncStoragePlatformSupportSchema,
  features: FileSyncStorageFeaturesSchema,
});

// Types
export type FileSyncStoragePlatformSupport = z.infer<typeof FileSyncStoragePlatformSupportSchema>;
export type FileSyncStorageFeatures = z.infer<typeof FileSyncStorageFeaturesSchema>;
export type FileSyncStorageTool = z.infer<typeof FileSyncStorageToolSchema>;

// Sections
export const sections: CategorySection[] = [
    {
        id: "features",
        label: "File Management & Sync",
        items: [
            { key: "features.s3Backend", label: "S3 Storage Backend" },
            { key: "features.deltaSync", label: "Block-Level Delta Sync" },
            { key: "features.decentralized", label: "Decentralized / P2P" },
            { key: "features.versioning", label: "File Versioning" },
            { key: "features.fileLocking", label: "File Locking" },
            { key: "features.webdav", label: "WebDAV Support" },
            { key: "features.fullTextSearch", label: "Full-Text Search" }
        ]
    },
    {
        id: "collaboration",
        label: "Collaboration & Sharing",
        items: [
            { key: "features.officeIntegration", label: "Office / Doc Editing" },
            { key: "features.publicSharing", label: "Public Link Sharing" },
            { key: "features.fileComments", label: "File Comments" }
        ]
    },
    {
        id: "security",
        label: "Security & Compliance",
        items: [
            { key: "features.e2eEncryption", label: "End-to-End Encryption" },
            { key: "features.ransomwareProtection", label: "Ransomware Protection" },
            { key: "features.auditLogs", label: "Audit Logging" },
            { key: "features.granularAcls", label: "Granular ACLs" }
        ]
    },
    {
        id: "platforms",
        label: "Client Platform Support",
        items: [
            { key: "platforms.windows", label: "Windows" },
            { key: "platforms.mac", label: "macOS" },
            { key: "platforms.linux", label: "Linux" },
            { key: "platforms.android", label: "Android" },
            { key: "platforms.ios", label: "iOS" },
            { key: "platforms.webInterface", label: "Web Interface" },
            { key: "platforms.cli", label: "CLI" }
        ]
    },
    {
        id: "deployment",
        label: "Hosting & Deployment",
        items: [
            { key: "dockerSupport", label: "Docker Support" },
            { key: "armSupport", label: "ARM64 Support" },
            { key: "features.automation", label: "Automation / Ansible" },
            { key: "features.performance", label: "Performance Rating" }
        ]
    },
    {
        id: "auth",
        label: "Authentication",
        items: [
            { key: "features.twoFactor", label: "2FA Support" },
            { key: "features.ldap", label: "LDAP Integration" },
            { key: "features.oidc", label: "OIDC / OAuth2" },
            { key: "features.sso", label: "Single Sign-On" }
        ]
    }
];

export const fileSyncStorageConfig: Omit<CategoryConfig<FileSyncStorageTool>, 'data'> = {
    id: "file-sync-storage",
    title: "File Sync & Storage",
    description: "Self-hosted cloud storage, peer-to-peer file synchronization, and enterprise content collaboration platforms.",
    icon: HardDrive,
    sections: sections,
    schema: FileSyncStorageToolSchema,
};
