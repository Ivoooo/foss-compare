const fs = require('fs');
const path = require('path');

const ts = new Date().toISOString().split('T')[0];

function createVerification(status, version, link) {
    return {
        status: status,
        verification: {
            verifiedAtVersion: version,
            verificationLink: link
        }
    };
}

const apps = [
    {
        id: "bitwarden",
        name: "Bitwarden",
        description: "A secure and free password manager for all of your devices.",
        website: "https://bitwarden.com",
        repository: "https://github.com/bitwarden/server",
        license: "GPL-3.0",
        openSource: true,
        language: ["C#", "TypeScript"],
        version: "v2025.1.3",
        link: "https://bitwarden.com/help/releasenotes/",
        platforms: { windows: "Yes", mac: "Yes", linux: "Yes", android: "Yes", ios: "Yes", browserExtensions: "Yes", webVault: "Yes", cli: "Yes" },
        dockerSupport: "Yes", armSupport: "Yes",
        features: {
            passwordSharing: "Yes",
            organizations: "Paid",
            autoFill: "Yes",
            passkeys: "Yes",
            secureNotes: "Yes",
            fileAttachments: "Paid",
            passwordGenerator: "Yes",
            localOffline: "Yes",
            emergencyAccess: "Yes",
            auditLogs: "Paid",
            compromisedPasswords: "Yes",
            twoFactor: "Yes",
            biometrics: "Yes",
            hardwareKeys: "Yes",
            ldap: "Paid",
            oidc: "Paid",
            sso: "Paid"
        }
    },
    {
        id: "vaultwarden",
        name: "Vaultwarden",
        description: "Unofficial Bitwarden compatible server written in Rust.",
        website: "https://github.com/dani-garcia/vaultwarden",
        repository: "https://github.com/dani-garcia/vaultwarden",
        license: "GPL-3.0",
        openSource: true,
        language: ["Rust"],
        version: "v1.35.3",
        link: "https://github.com/dani-garcia/vaultwarden/releases",
        platforms: { windows: "Yes", mac: "Yes", linux: "Yes", android: "Yes", ios: "Yes", browserExtensions: "Yes", webVault: "Yes", cli: "Yes" },
        dockerSupport: "Yes", armSupport: "Yes",
        features: {
            passwordSharing: "Yes",
            organizations: "Yes",
            autoFill: "Yes",
            passkeys: "Yes",
            secureNotes: "Yes",
            fileAttachments: "Yes",
            passwordGenerator: "Yes",
            localOffline: "Yes",
            emergencyAccess: "Yes",
            auditLogs: "Yes",
            compromisedPasswords: "Yes",
            twoFactor: "Yes",
            biometrics: "Yes",
            hardwareKeys: "Yes",
            ldap: "No",
            oidc: "No",
            sso: "No"
        }
    },
    {
        id: "keepassxc",
        name: "KeePassXC",
        description: "Cross-Platform Password Manager defined by the open KeePass format. Standalone local vaults.",
        website: "https://keepassxc.org",
        repository: "https://github.com/keepassxreboot/keepassxc",
        license: "GPL-3.0",
        openSource: true,
        language: ["C++"],
        version: "v2.7.11",
        link: "https://github.com/keepassxreboot/keepassxc/releases",
        platforms: { windows: "Yes", mac: "Yes", linux: "Yes", android: "Partial", ios: "Partial", browserExtensions: "Yes", webVault: "No", cli: "Yes" },
        dockerSupport: "No", armSupport: "Yes",
        features: {
            passwordSharing: "No",
            organizations: "No",
            autoFill: "Yes",
            passkeys: "Yes",
            secureNotes: "Yes",
            fileAttachments: "Yes",
            passwordGenerator: "Yes",
            localOffline: "Yes",
            emergencyAccess: "No",
            auditLogs: "No",
            compromisedPasswords: "Yes",
            twoFactor: "Yes",
            biometrics: "Yes",
            hardwareKeys: "Yes",
            ldap: "No",
            oidc: "No",
            sso: "No"
        }
    },
    {
        id: "passbolt",
        name: "Passbolt",
        description: "Open source password manager for teams and business.",
        website: "https://www.passbolt.com/",
        repository: "https://github.com/passbolt/passbolt_api",
        license: "AGPL-3.0",
        openSource: true,
        language: ["PHP"],
        version: "v5.9.0",
        link: "https://github.com/passbolt/passbolt_api/releases",
        platforms: { windows: "Yes", mac: "Yes", linux: "Yes", android: "Yes", ios: "Yes", browserExtensions: "Yes", webVault: "Yes", cli: "Yes" },
        dockerSupport: "Yes", armSupport: "No",
        features: {
            passwordSharing: "Yes",
            organizations: "Yes",
            autoFill: "Yes",
            passkeys: "Unknown",
            secureNotes: "Yes",
            fileAttachments: "Yes",
            passwordGenerator: "Yes",
            localOffline: "No",
            emergencyAccess: "Yes",
            auditLogs: "Paid",
            compromisedPasswords: "No",
            twoFactor: "Yes",
            biometrics: "Yes",
            hardwareKeys: "Yes",
            ldap: "Paid",
            oidc: "Paid",
            sso: "Paid"
        }
    },
    {
        id: "psono",
        name: "Psono",
        description: "Enterprise password manager for teams. Open-source and self-hosted.",
        website: "https://psono.com",
        repository: "https://gitlab.com/psono/psono-server",
        license: "Apache-2.0",
        openSource: true,
        language: ["Python"],
        version: "latest",
        link: "https://gitlab.com/psono/psono-server/-/releases",
        platforms: { windows: "Yes", mac: "Yes", linux: "Yes", android: "Yes", ios: "Yes", browserExtensions: "Yes", webVault: "Yes", cli: "Yes" },
        dockerSupport: "Yes", armSupport: "Yes",
        features: {
            passwordSharing: "Yes",
            organizations: "Yes",
            autoFill: "Yes",
            passkeys: "Unknown",
            secureNotes: "Yes",
            fileAttachments: "Yes",
            passwordGenerator: "Yes",
            localOffline: "Yes",
            emergencyAccess: "Yes",
            auditLogs: "Yes",
            compromisedPasswords: "Yes",
            twoFactor: "Yes",
            biometrics: "Yes",
            hardwareKeys: "Yes",
            ldap: "Paid",
            oidc: "Paid",
            sso: "Paid"
        }
    },
    {
        id: "buttercup",
        name: "Buttercup",
        description: "Free and open-source, local-first password manager with cloud sync.",
        website: "https://buttercup.pw",
        repository: "https://github.com/buttercup/buttercup-desktop",
        license: "GPL-3.0",
        openSource: true,
        language: ["TypeScript", "JavaScript"],
        version: "v2.28.1",
        link: "https://github.com/buttercup/buttercup-desktop/releases",
        platforms: { windows: "Yes", mac: "Yes", linux: "Yes", android: "Yes", ios: "Yes", browserExtensions: "Yes", webVault: "No", cli: "No" },
        dockerSupport: "Yes", armSupport: "Yes",
        features: {
            passwordSharing: "Yes",
            organizations: "No",
            autoFill: "Yes",
            passkeys: "Unknown",
            secureNotes: "Yes",
            fileAttachments: "Unknown",
            passwordGenerator: "Yes",
            localOffline: "Yes",
            emergencyAccess: "No",
            auditLogs: "No",
            compromisedPasswords: "No",
            twoFactor: "No",
            biometrics: "Yes",
            hardwareKeys: "No",
            ldap: "No",
            oidc: "No",
            sso: "No"
        }
    },
    {
        id: "padloc",
        name: "Padloc",
        description: "Modern, open-source password manager for individuals and teams.",
        website: "https://padloc.app/",
        repository: "https://github.com/padloc/padloc",
        license: "AGPL-3.0",
        openSource: true,
        language: ["TypeScript"],
        version: "v4.3.0",
        link: "https://github.com/padloc/padloc/releases",
        platforms: { windows: "Yes", mac: "Yes", linux: "Yes", android: "Yes", ios: "Yes", browserExtensions: "Yes", webVault: "Yes", cli: "Yes" },
        dockerSupport: "Yes", armSupport: "Yes",
        features: {
            passwordSharing: "Yes",
            organizations: "Yes",
            autoFill: "Yes",
            passkeys: "Unknown",
            secureNotes: "Yes",
            fileAttachments: "Yes",
            passwordGenerator: "Yes",
            localOffline: "No",
            emergencyAccess: "Yes",
            auditLogs: "Yes",
            compromisedPasswords: "No",
            twoFactor: "Yes",
            biometrics: "Yes",
            hardwareKeys: "Yes",
            ldap: "No",
            oidc: "No",
            sso: "No"
        }
    },
    {
        id: "keeweb",
        name: "KeeWeb",
        description: "Free cross-platform password manager compatible with KeePass.",
        website: "https://keeweb.info",
        repository: "https://github.com/keeweb/keeweb",
        license: "MIT",
        openSource: true,
        language: ["JavaScript"],
        version: "v1.18.7",
        link: "https://github.com/keeweb/keeweb/releases",
        platforms: { windows: "Yes", mac: "Yes", linux: "Yes", android: "No", ios: "No", browserExtensions: "Yes", webVault: "Yes", cli: "No" },
        dockerSupport: "Yes", armSupport: "Partial",
        features: {
            passwordSharing: "Yes",
            organizations: "No",
            autoFill: "Yes",
            passkeys: "Unknown",
            secureNotes: "Yes",
            fileAttachments: "Yes",
            passwordGenerator: "Yes",
            localOffline: "Yes",
            emergencyAccess: "No",
            auditLogs: "No",
            compromisedPasswords: "Yes",
            twoFactor: "Yes",
            biometrics: "No",
            hardwareKeys: "Yes",
            ldap: "No",
            oidc: "No",
            sso: "No"
        }
    },
    {
        id: "passky",
        name: "Passky",
        description: "Simple, modern, lightweight, open-source, and secure password manager.",
        website: "https://passky.org",
        repository: "https://github.com/passky-dev/passky-server",
        license: "AGPL-3.0",
        openSource: true,
        language: ["PHP", "JavaScript"],
        version: "latest",
        link: "https://github.com/passky-dev/passky-server/releases",
        platforms: { windows: "Yes", mac: "Yes", linux: "Yes", android: "Yes", ios: "Yes", browserExtensions: "Yes", webVault: "Yes", cli: "No" },
        dockerSupport: "Yes", armSupport: "Yes",
        features: {
            passwordSharing: "No",
            organizations: "No",
            autoFill: "Yes",
            passkeys: "Unknown",
            secureNotes: "Yes",
            fileAttachments: "No",
            passwordGenerator: "Yes",
            localOffline: "No",
            emergencyAccess: "No",
            auditLogs: "No",
            compromisedPasswords: "No",
            twoFactor: "Yes",
            biometrics: "Unknown",
            hardwareKeys: "Yes",
            ldap: "No",
            oidc: "No",
            sso: "No"
        }
    }
];

const outDir = path.join(__dirname, '../data/password-managers');

for (const app of apps) {
    const data = {
        id: app.id,
        name: app.name,
        description: app.description,
        website: app.website,
        repository: app.repository,
        license: app.license,
        openSource: app.openSource,
        githubStats: { stars: 0, forks: 0, lastCommit: "2024-01-01T00:00:00Z", openIssues: 0 },
        language: app.language,
        dockerSupport: createVerification(app.dockerSupport, app.version, app.link),
        armSupport: createVerification(app.armSupport, app.version, app.link),
        platforms: {},
        features: {},
        meta: {
            lastCheck: {
                date: ts,
                version: app.version,
                changelogLink: app.link
            }
        }
    };

    for (const [key, val] of Object.entries(app.platforms)) {
        data.platforms[key] = createVerification(val, app.version, app.link);
    }
    for (const [key, val] of Object.entries(app.features)) {
        data.features[key] = createVerification(val, app.version, app.link);
    }

    // Try to preserve existing githubStats if modifying existing file
    const filePath = path.join(outDir, `${app.id}.json`);
    if (fs.existsSync(filePath)) {
        const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (existing.githubStats) {
            data.githubStats = existing.githubStats;
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    console.log(`Wrote ${app.id}.json`);
}
