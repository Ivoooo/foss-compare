import { Shield } from "lucide-react";
import { CategorySection, SoftwareTool } from "@/lib/schemas";
import { CategoryConfig } from "./types";
import { password_managersData as passwordManagersData } from "@/data/password-managers";

export const PASSWORD_MANAGER_SECTIONS: CategorySection[] = [
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

export const passwordManagersCategory: CategoryConfig = {
    id: "password-managers",
    title: "Password Managers",
    description: "Bitwarden, Vaultwarden, Keepass, and others. Security features, sync, and clients.",
    icon: Shield,
    data: passwordManagersData as unknown as SoftwareTool[],
    sections: PASSWORD_MANAGER_SECTIONS,
};
