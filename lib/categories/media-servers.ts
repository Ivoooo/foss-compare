import { MonitorPlay } from "lucide-react";
import { CategorySection, SoftwareTool } from "@/lib/schemas";
import { CategoryConfig } from "./types";
import { media_serversData as streamersData } from "@/data/media-servers";

export const STREAMER_SECTIONS: CategorySection[] = [
    {
        id: "features",
        label: "General Features",
        items: [
            { key: "features.multipleUsers", label: "Multiple Users" },
            { key: "features.parentalControls", label: "Parental Controls" },
            { key: "features.liveTv", label: "Live TV" },
            { key: "features.dvr", label: "DVR" },
            { key: "features.hardwareTranscoding", label: "Hardware Transcoding" },
            { key: "features.offlineDownloads", label: "Offline Downloads" },
            { key: "features.watchTogether", label: "Watch Together" },
            { key: "features.autoSubtitles", label: "Auto Subtitles" },
            { key: "features.introSkipping", label: "Intro Skipping" },
            { key: "features.skipCredits", label: "Credit Skipping" },
            { key: "features.skipAds", label: "Ad Skipping" },
            { key: "features.lyrics", label: "Lyrics" },
            { key: "features.podcasts", label: "Podcasts" },
            { key: "features.audiobooks", label: "Audiobooks" },
            { key: "features.ebooks", label: "Books & Comics" },
            { key: "features.photos", label: "Photos" },
            { key: "features.plugins", label: "Plugins" },
            { key: "dockerSupport", label: "Docker Support" },
            { key: "armSupport", label: "ARM Support" },
        ],
    },
    {
        id: "platforms",
        label: "Platform Support",
        items: [
            { key: "platforms.web", label: "Web" },
            { key: "platforms.pwa", label: "PWA" },
            { key: "platforms.android", label: "Android" },
            { key: "platforms.ios", label: "iOS" },
            { key: "platforms.androidTv", label: "Android TV" },
            { key: "platforms.appleTv", label: "Apple TV" },
            { key: "platforms.windows", label: "Windows" },
            { key: "platforms.mac", label: "macOS" },
            { key: "platforms.linux", label: "Linux" },
            { key: "platforms.samsungTv", label: "Samsung TV" },
            { key: "platforms.lgTv", label: "LG TV" },
            { key: "platforms.roku", label: "Roku" },
        ],
    },
    {
        id: "codecs",
        label: "Codec Support",
        items: [
            { key: "codecs.h264", label: "H.264" },
            { key: "codecs.h265", label: "H.265 (HEVC)" },
            { key: "codecs.av1", label: "AV1" },
            { key: "codecs.vp9", label: "VP9" },
            { key: "codecs.mpeg2", label: "MPEG-2" },
            { key: "codecs.vc1", label: "VC-1" },
            { key: "codecs.aac", label: "AAC" },
            { key: "codecs.ac3", label: "AC3 / Dolby Digital" },
            { key: "codecs.eac3", label: "E-AC3 / DD+" },
            { key: "codecs.truehd", label: "Dolby TrueHD" },
            { key: "codecs.dts", label: "DTS" },
            { key: "codecs.dtshdma", label: "DTS-HD MA" },
            { key: "codecs.flac", label: "FLAC" },
        ],
    },
    {
        id: "integrations",
        label: "Integrations",
        items: [
            { key: "features.sonarr", label: "Sonarr" },
            { key: "features.radarr", label: "Radarr" },
            { key: "features.seerr", label: "Seerr" },
            { key: "features.trakt", label: "Trakt" },
        ],
    },
    {
        id: "auth",
        label: "Authentication",
        items: [
            { key: "features.ldap", label: "LDAP" },
            { key: "features.oidc", label: "OIDC" },
            { key: "features.twoFactor", label: "Two-Factor Auth" },
            { key: "features.sso", label: "SSO" },
        ],
    },
];

export const mediaServersCategory: CategoryConfig = {
    id: "media-servers",
    title: "Media Servers",
    description: "Jellyfin, Plex, Emby, and more. Compare transcoding, platform support, and features.",
    icon: MonitorPlay,
    data: streamersData as unknown as SoftwareTool[],
    sections: STREAMER_SECTIONS,
};
