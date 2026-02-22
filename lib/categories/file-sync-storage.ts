import { HardDrive } from "lucide-react";
import { CategorySection, SoftwareTool } from "@/lib/schemas";
import { CategoryConfig } from "./types";
import { fileSyncStorageData } from "@/data/file-sync-storage";

export const FILE_SYNC_STORAGE_SECTIONS: CategorySection[] = [
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

export const fileSyncStorageCategory: CategoryConfig = {
    id: "file-sync-storage",
    title: "File Sync & Storage",
    description: "Self-hosted cloud storage, peer-to-peer file synchronization, and enterprise content collaboration platforms.",
    icon: HardDrive,
    data: fileSyncStorageData as unknown as SoftwareTool[],
    sections: FILE_SYNC_STORAGE_SECTIONS,
};
