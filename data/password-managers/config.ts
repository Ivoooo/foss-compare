import { z } from "zod";
import { Shield } from "lucide-react";
import {
    BaseSoftwareToolSchema,
    StrictFeatureStatusSchema,
    CategorySection
} from "@/lib/base-schemas";
import { CategoryConfig } from "@/lib/types";

// Schemas
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

// Types
export type PasswordManagerPlatformSupport = z.infer<typeof PasswordManagerPlatformSupportSchema>;
export type PasswordManagerFeatures = z.infer<typeof PasswordManagerFeaturesSchema>;
export type PasswordManagerTool = z.infer<typeof PasswordManagerToolSchema>;

// Sections
export const sections: CategorySection[] = [
    {
        id: "architecture",
        label: "Architecture & Formats",
        items: [
            { key: "features.localOffline", label: "Local / Offline Vaults" },
            { key: "features.kdbxSupport", label: "KeePass Format Support" },
        ]
    },
    {
        id: "features",
        label: "General Features",
        items: [
            { key: "features.autoFill", label: "System Auto-fill" },
            { key: "features.passkeys", label: "Passkeys Support" },
            { key: "features.totp", label: "Built-in TOTP Authenticator" },
            { key: "features.passwordGenerator", label: "Password Generator" },
            { key: "features.secureNotes", label: "Secure Notes" },
            { key: "features.fileAttachments", label: "File Attachments" },
            { key: "features.customFields", label: "Custom Fields" },
        ]
    },
    {
        id: "sharing",
        label: "Organizations & Sharing",
        items: [
            { key: "features.passwordSharing", label: "Item Sharing" },
            { key: "features.vaultSharing", label: "Vault Sharing" },
            { key: "features.organizations", label: "Organizations / Teams" },
            { key: "features.emergencyAccess", label: "Emergency Access" },
        ]
    },
    {
        id: "security",
        label: "Security & Auditing",
        items: [
            { key: "features.biometrics", label: "Biometric Unlock" },
            { key: "features.hardwareKeys", label: "Hardware Keys (YubiKey)" },
            { key: "features.autoClear", label: "Auto-Clear Clipboard" },
            { key: "features.auditLogs", label: "Audit Logs" },
            { key: "features.compromisedPasswords", label: "Compromised Passwords Check" },
        ]
    },
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
            { key: "platforms.cli", label: "CLI" },
        ]
    },
    {
        id: "deployment",
        label: "Hosting & Deployment",
        items: [
            { key: "dockerSupport", label: "Docker Support" },
            { key: "armSupport", label: "ARM Support" },
        ]
    },
    {
        id: "auth",
        label: "Authentication",
        items: [
            { key: "features.twoFactor", label: "Two-Factor Auth" },
            { key: "features.ldap", label: "LDAP" },
            { key: "features.oidc", label: "OIDC" },
            { key: "features.sso", label: "SSO / SAML" },
        ]
    }
];

export const passwordManagersConfig: Omit<CategoryConfig<PasswordManagerTool>, 'data'> = {
    id: "password-managers",
    title: "Password Managers",
    description: "Bitwarden, Vaultwarden, Keepass, and others. Security features, sync, and clients.",
    icon: Shield,
    sections: sections,
    schema: PasswordManagerToolSchema,
};
