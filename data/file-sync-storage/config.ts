import { z } from "zod";
import { HardDrive } from "lucide-react";
import {
    BaseSoftwareToolSchema,
    StrictFeatureStatusSchema,
    CategorySection
} from "@/lib/base-schemas";
import { CategoryConfig } from "@/lib/types";

// Schemas
export const FileSyncStoragePlatformSupportSchema = z.object({
  windows: StrictFeatureStatusSchema,
  mac: StrictFeatureStatusSchema,
  linux: StrictFeatureStatusSchema,
  android: StrictFeatureStatusSchema,
  ios: StrictFeatureStatusSchema,
  webInterface: StrictFeatureStatusSchema,
  cli: StrictFeatureStatusSchema,
});

export const FileSyncStorageFeaturesSchema = z.object({
  s3Backend: StrictFeatureStatusSchema,
  deltaSync: StrictFeatureStatusSchema,
  decentralized: StrictFeatureStatusSchema,
  versioning: StrictFeatureStatusSchema,
  fileLocking: StrictFeatureStatusSchema,
  webdav: StrictFeatureStatusSchema,
  fullTextSearch: StrictFeatureStatusSchema,
  officeIntegration: StrictFeatureStatusSchema,
  publicSharing: StrictFeatureStatusSchema,
  fileComments: StrictFeatureStatusSchema,
  e2eEncryption: StrictFeatureStatusSchema,
  ransomwareProtection: StrictFeatureStatusSchema,
  auditLogs: StrictFeatureStatusSchema,
  granularAcls: StrictFeatureStatusSchema,
  twoFactor: StrictFeatureStatusSchema,
  ldap: StrictFeatureStatusSchema,
  oidc: StrictFeatureStatusSchema,
  sso: StrictFeatureStatusSchema,
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
            { key: "features.deltaSync", label: "Block-Level Delta Sync" },
            { key: "features.versioning", label: "File Versioning" },
            { key: "features.fileLocking", label: "File Locking" },
            { key: "features.webdav", label: "WebDAV Support" },
            { key: "features.fullTextSearch", label: "Full-Text Search" },
            { key: "features.decentralized", label: "Decentralized / P2P" },
        ],
    },
    {
        id: "collaboration",
        label: "Collaboration & Sharing",
        items: [
            { key: "features.officeIntegration", label: "Office Suite Integration" },
            { key: "features.publicSharing", label: "Public Link Sharing" },
            { key: "features.fileComments", label: "File Comments" },
        ],
    },
    {
        id: "security",
        label: "Security & Compliance",
        items: [
            { key: "features.e2eEncryption", label: "End-to-End Encryption" },
            { key: "features.ransomwareProtection", label: "Ransomware Protection" },
            { key: "features.auditLogs", label: "Audit Logging" },
            { key: "features.granularAcls", label: "Granular ACLs" },
        ],
    },
    {
        id: "auth",
        label: "Authentication",
        items: [
            { key: "features.twoFactor", label: "Two-Factor Auth" },
            { key: "features.ldap", label: "LDAP Integration" },
            { key: "features.oidc", label: "OIDC Support" },
            { key: "features.sso", label: "Single Sign-On" },
        ],
    },
    {
        id: "deployment",
        label: "Hosting & Deployment",
        items: [
            { key: "features.s3Backend", label: "S3 Backend Support" },
            { key: "dockerSupport", label: "Docker Support" },
            { key: "armSupport", label: "ARM Support" },
        ],
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
            { key: "platforms.cli", label: "CLI" },
        ],
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
