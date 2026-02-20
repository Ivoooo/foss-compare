import { Shield } from "lucide-react";
import { CategorySection, SoftwareTool } from "@/lib/schemas";
import { CategoryConfig } from "./types";
import { password_managersData as passwordManagersData } from "@/data/password-managers";

export const PASSWORD_MANAGER_SECTIONS: CategorySection[] = [
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

export const passwordManagersCategory: CategoryConfig = {
    id: "password-managers",
    title: "Password Managers",
    description: "Bitwarden, Vaultwarden, Keepass, and others. Security features, sync, and clients.",
    icon: Shield,
    data: passwordManagersData as unknown as SoftwareTool[],
    sections: PASSWORD_MANAGER_SECTIONS,
};
