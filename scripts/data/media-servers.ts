export default {
    id: "media-servers",
    apps: [
  {
    "id": "emby",
    "name": "Emby",
    "description": "Your personal media on any device.",
    "website": "https://emby.media/",
    "license": "Proprietary",
    "openSource": false,
    "language": [
      "C#"
    ],
    "version": "v4.8.1",
    "link": "https://emby.media/blog.html",
    "dockerSupport": "Yes",
    "armSupport": "Yes",
    "platforms": {
      "web": "Yes",
      "pwa": "Yes",
      "android": "Yes",
      "ios": "Yes",
      "androidTv": "Yes",
      "appleTv": "Yes",
      "windows": "Yes",
      "mac": "Yes",
      "linux": "Yes",
      "samsungTv": "Yes",
      "lgTv": "Yes",
      "roku": "Yes"
    },
    "features": {
      "multipleUsers": "Yes",
      "parentalControls": {
        "status": "Yes",
        "note": "Advanced controls paid"
      },
      "watchTogether": "Partial",
      "autoSubtitles": "Paid",
      "ebooks": "Yes",
      "liveTv": "Paid",
      "dvr": "Paid",
      "hardwareTranscoding": "Paid",
      "offlineDownloads": "Paid",
      "introSkipping": "Paid",
      "lyrics": "Yes",
      "podcasts": "Yes",
      "audiobooks": "Yes",
      "photos": "Yes",
      "plugins": "Yes",
      "ldap": "Paid",
      "oidc": "No",
      "twoFactor": "No",
      "sso": "No",
      "sonarr": "Yes",
      "radarr": "Yes",
      "trakt": "Yes",
      "skipCredits": {
        "status": "Partial",
        "note": "Manual prompt per episode"
      },
      "skipAds": "No",
      "seerr": "Yes"
    },
    "codecs": {
      "h264": "Yes",
      "h265": "Yes",
      "av1": "Yes",
      "vp9": "Yes",
      "mpeg2": "Yes",
      "vc1": "Yes",
      "aac": "Yes",
      "ac3": "Yes",
      "eac3": "Yes",
      "truehd": "Yes",
      "dts": "Yes",
      "dtshdma": "Yes",
      "flac": "Yes"
    },
    "notes": "Closed source fork of the original open source Emby (before it became proprietary). Requires Emby Premiere for many features.",
    "automation": {
      "docker": {
        "image": "emby/embyserver:latest"
      }
    },
    "performance": {
      "ramUsage": "127.5MiB",
      "dockerImageSize": "724.35 MB"
    }
  },
  {
    "id": "jellyfin",
    "name": "Jellyfin",
    "description": "The Free Software Media System. It puts you in control of managing and streaming your media.",
    "website": "https://jellyfin.org/",
    "repository": "https://github.com/jellyfin/jellyfin",
    "license": "GPL-3.0",
    "openSource": true,
    "language": [
      "C#",
      "React"
    ],
    "version": "v10.8.13",
    "link": "https://github.com/jellyfin/jellyfin/releases",
    "dockerSupport": "Yes",
    "armSupport": "Yes",
    "platforms": {
      "web": "Yes",
      "pwa": "Yes",
      "android": "Yes",
      "ios": {
        "status": "Yes",
        "link": "https://apps.apple.com/us/app/jellyfin-mobile/id1480192618",
        "version": "v1.6.0"
      },
      "androidTv": "Yes",
      "appleTv": "Yes",
      "windows": "Yes",
      "mac": "Yes",
      "linux": "Yes",
      "samsungTv": "Partial",
      "lgTv": "Yes",
      "roku": "Yes"
    },
    "features": {
      "multipleUsers": "Yes",
      "parentalControls": "Yes",
      "watchTogether": "Yes",
      "autoSubtitles": {
        "status": "Yes",
        "note": "Plugin"
      },
      "ebooks": "Yes",
      "liveTv": "Yes",
      "dvr": "Yes",
      "hardwareTranscoding": "Yes",
      "offlineDownloads": "Yes",
      "introSkipping": {
        "status": "Yes",
        "note": "Plugin"
      },
      "lyrics": "Yes",
      "podcasts": "Yes",
      "audiobooks": "Yes",
      "photos": "Yes",
      "plugins": "Yes",
      "ldap": "Yes",
      "oidc": "Yes",
      "twoFactor": "No",
      "sso": "Yes",
      "sonarr": "Yes",
      "radarr": "Yes",
      "trakt": "Yes",
      "skipCredits": {
        "status": "Yes",
        "note": "Plugin"
      },
      "skipAds": "No",
      "seerr": "Yes"
    },
    "codecs": {
      "h264": "Yes",
      "h265": "Yes",
      "av1": "Yes",
      "vp9": "Yes",
      "mpeg2": "Yes",
      "vc1": "Yes",
      "aac": "Yes",
      "ac3": "Yes",
      "eac3": "Yes",
      "truehd": "Yes",
      "dts": "Yes",
      "dtshdma": "Yes",
      "flac": "Yes"
    },
    "notes": "Community-driven fork of Emby. Completely free with no paid features.",
    "automation": {
      "docker": {
        "image": "jellyfin/jellyfin:latest"
      }
    },
    "performance": {
      "ramUsage": "247.4MiB",
      "dockerImageSize": "1.44 GB"
    }
  },
  {
    "id": "plex",
    "name": "Plex",
    "description": "Stream smarter. The most comprehensive media server.",
    "website": "https://www.plex.tv/",
    "repository": "https://github.com/plexinc",
    "license": "Proprietary",
    "openSource": false,
    "language": [
      "C++",
      "Python"
    ],
    "version": "v1.40.0",
    "link": "https://www.plex.tv/media-server-downloads/#plex-media-server",
    "dockerSupport": "Yes",
    "armSupport": "Yes",
    "platforms": {
      "web": "Yes",
      "pwa": "No",
      "android": "Yes",
      "ios": "Yes",
      "androidTv": "Yes",
      "appleTv": "Yes",
      "windows": "Yes",
      "mac": "Yes",
      "linux": "Yes",
      "samsungTv": "Yes",
      "lgTv": "Yes",
      "roku": "Yes"
    },
    "features": {
      "multipleUsers": {
        "status": "Partial",
        "note": "Managed users paid"
      },
      "parentalControls": "Paid",
      "watchTogether": "Yes",
      "autoSubtitles": "Yes",
      "ebooks": "No",
      "liveTv": "Paid",
      "dvr": "Paid",
      "hardwareTranscoding": "Paid",
      "offlineDownloads": "Paid",
      "introSkipping": "Paid",
      "lyrics": "Paid",
      "podcasts": "Yes",
      "audiobooks": "Partial",
      "photos": "Yes",
      "plugins": "No",
      "ldap": "No",
      "oidc": "No",
      "twoFactor": "Yes",
      "sso": "No",
      "sonarr": "Yes",
      "radarr": "Yes",
      "trakt": "Paid",
      "skipCredits": "Paid",
      "skipAds": "Paid",
      "seerr": "Yes"
    },
    "codecs": {
      "h264": "Yes",
      "h265": "Yes",
      "av1": "Yes",
      "vp9": "Yes",
      "mpeg2": "Yes",
      "vc1": "Yes",
      "aac": "Yes",
      "ac3": "Yes",
      "eac3": "Yes",
      "truehd": "Yes",
      "dts": "Yes",
      "dtshdma": "Yes",
      "flac": "Yes"
    },
    "notes": "Highly polished, requires Plex Pass for hardware transcoding and offline downloads. Auth is centralized via Plex.tv.",
    "automation": {
      "docker": {
        "image": "plexinc/pms-docker:latest",
        "env": {
          "TZ": "UTC"
        }
      }
    },
    "performance": {
      "ramUsage": "219.8MiB",
      "dockerImageSize": "346.66 MB"
    }
  }
]
};