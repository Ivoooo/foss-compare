export default {
    id: "password-managers",
    apps: [
  {
    "id": "bitwarden",
    "name": "Bitwarden",
    "description": "A secure and free password manager for all of your devices.",
    "website": "https://bitwarden.com",
    "repository": "https://github.com/bitwarden/server",
    "license": "GPL-3.0",
    "openSource": true,
    "language": [
      "C#",
      "TypeScript"
    ],
    "version": "v2026.2.0",
    "link": "https://bitwarden.com/help/releasenotes/",
    "dockerSupport": "Yes",
    "armSupport": "Yes",
    "platforms": {
      "windows": "Yes",
      "mac": "Yes",
      "linux": "Yes",
      "android": "Yes",
      "ios": "Yes",
      "browserExtensions": "Yes",
      "webVault": "Yes",
      "cli": "Yes"
    },
    "features": {
      "passwordSharing": "Yes",
      "organizations": "Paid",
      "autoFill": "Yes",
      "passkeys": "Yes",
      "secureNotes": "Yes",
      "fileAttachments": "Paid",
      "passwordGenerator": "Yes",
      "localOffline": "Yes",
      "emergencyAccess": "Yes",
      "auditLogs": "Paid",
      "compromisedPasswords": "Yes",
      "twoFactor": "Yes",
      "biometrics": "Yes",
      "hardwareKeys": "Yes",
      "ldap": "Paid",
      "oidc": "Paid",
      "sso": "Paid",
      "kdbxSupport": {
        "status": "No",
        "note": "Import Only",
        "link": "https://bitwarden.com/help/import-data/"
      },
      "customFields": {
        "status": "Yes",
        "link": "https://bitwarden.com/help/custom-fields/"
      },
      "totp": {
        "status": "Paid",
        "link": "https://bitwarden.com/pricing/"
      },
      "vaultSharing": {
        "status": "Yes",
        "link": "https://bitwarden.com/help/sharing/"
      },
      "autoClear": {
        "status": "Yes",
        "link": "https://bitwarden.com/help/vault-timeout/"
      }
    }
  },
  {
    "id": "keepassxc",
    "name": "KeePassXC",
    "description": "Cross-Platform Password Manager defined by the open KeePass format. Standalone local vaults.",
    "website": "https://keepassxc.org",
    "repository": "https://github.com/keepassxreboot/keepassxc",
    "license": "GPL-3.0",
    "openSource": true,
    "language": [
      "C++"
    ],
    "version": "v2.7.11",
    "link": "https://github.com/keepassxreboot/keepassxc/releases",
    "dockerSupport": "No",
    "armSupport": "Yes",
    "platforms": {
      "windows": "Yes",
      "mac": "Yes",
      "linux": "Yes",
      "android": "Partial",
      "ios": "Partial",
      "browserExtensions": "Yes",
      "webVault": "No",
      "cli": "Yes"
    },
    "features": {
      "passwordSharing": "No",
      "organizations": "No",
      "autoFill": "Yes",
      "passkeys": "Yes",
      "secureNotes": "Yes",
      "fileAttachments": "Yes",
      "passwordGenerator": "Yes",
      "localOffline": "Yes",
      "emergencyAccess": "No",
      "auditLogs": "No",
      "compromisedPasswords": "Yes",
      "twoFactor": "Yes",
      "biometrics": "Yes",
      "hardwareKeys": "Yes",
      "ldap": "No",
      "oidc": "No",
      "sso": "No",
      "kdbxSupport": {
        "status": "Yes",
        "note": "Native Format",
        "link": "https://keepassxc.org/"
      },
      "customFields": {
        "status": "Yes",
        "link": "https://keepassxc.org/docs/"
      },
      "totp": {
        "status": "Yes",
        "link": "https://keepassxc.org/docs/"
      },
      "vaultSharing": {
        "status": "Partial",
        "note": "KeeShare File Sync",
        "link": "https://keepassxc.org/docs/KeePassXC_UserGuide.html#_keeshare_sharing_databases"
      },
      "autoClear": {
        "status": "Yes",
        "link": "https://keepassxc.org/docs/"
      }
    }
  },
  {
    "id": "passbolt",
    "name": "Passbolt",
    "description": "Open source password manager for teams and business.",
    "website": "https://www.passbolt.com/",
    "repository": "https://github.com/passbolt/passbolt_api",
    "license": "AGPL-3.0",
    "openSource": true,
    "language": [
      "PHP"
    ],
    "version": "v5.9.0",
    "link": "https://github.com/passbolt/passbolt_api/releases",
    "dockerSupport": "Yes",
    "armSupport": "No",
    "platforms": {
      "windows": "Yes",
      "mac": "Yes",
      "linux": "Yes",
      "android": "Yes",
      "ios": "Yes",
      "browserExtensions": "Yes",
      "webVault": "Yes",
      "cli": "Yes"
    },
    "features": {
      "passwordSharing": "Yes",
      "organizations": "Yes",
      "autoFill": "Yes",
      "passkeys": "Unknown",
      "secureNotes": "Yes",
      "fileAttachments": "Yes",
      "passwordGenerator": "Yes",
      "localOffline": "No",
      "emergencyAccess": "Yes",
      "auditLogs": "Paid",
      "compromisedPasswords": "No",
      "twoFactor": "Yes",
      "biometrics": "Yes",
      "hardwareKeys": "Yes",
      "ldap": "Paid",
      "oidc": "Paid",
      "sso": "Paid",
      "kdbxSupport": {
        "status": "No",
        "note": "Import/Export only",
        "link": "https://www.passbolt.com/docs/user/basic-features/browser/import/keepass-kdbx/"
      },
      "customFields": {
        "status": "Yes",
        "link": "https://www.passbolt.com/blog/passbolt-5-3-introduces-custom-fields-and-performance-improvements"
      },
      "totp": {
        "status": "Yes",
        "link": "https://www.passbolt.com/blog/passbolt-adds-collaborative-management-of-third-party-totps"
      },
      "vaultSharing": {
        "status": "Yes",
        "link": "https://www.passbolt.com/docs/user/basic-features/browser/share-resource/"
      },
      "autoClear": {
        "status": "Yes",
        "link": "https://www.passbolt.com/docs/"
      }
    }
  },
  {
    "id": "vaultwarden",
    "name": "Vaultwarden",
    "description": "Unofficial Bitwarden compatible server written in Rust.",
    "website": "https://github.com/dani-garcia/vaultwarden",
    "repository": "https://github.com/dani-garcia/vaultwarden",
    "license": "GPL-3.0",
    "openSource": true,
    "language": [
      "Rust"
    ],
    "version": "v1.35.3",
    "link": "https://github.com/dani-garcia/vaultwarden/releases",
    "dockerSupport": "Yes",
    "armSupport": "Yes",
    "platforms": {
      "windows": "Yes",
      "mac": "Yes",
      "linux": "Yes",
      "android": "Yes",
      "ios": "Yes",
      "browserExtensions": "Yes",
      "webVault": "Yes",
      "cli": "Yes"
    },
    "features": {
      "passwordSharing": "Yes",
      "organizations": "Yes",
      "autoFill": "Yes",
      "passkeys": "Yes",
      "secureNotes": "Yes",
      "fileAttachments": "Yes",
      "passwordGenerator": "Yes",
      "localOffline": "Yes",
      "emergencyAccess": "Yes",
      "auditLogs": "Yes",
      "compromisedPasswords": "Yes",
      "twoFactor": "Yes",
      "biometrics": "Yes",
      "hardwareKeys": "Yes",
      "ldap": "No",
      "oidc": "No",
      "sso": "No",
      "kdbxSupport": {
        "status": "No",
        "note": "Import Only"
      },
      "customFields": "Yes",
      "totp": "Yes",
      "vaultSharing": "Yes",
      "autoClear": "Yes"
    }
  }
]
};