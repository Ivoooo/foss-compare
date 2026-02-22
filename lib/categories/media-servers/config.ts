import { z } from "zod";
import { MonitorPlay } from "lucide-react";
import {
    BaseSoftwareToolSchema,
    StrictFeatureStatusSchema,
    CategorySection
} from "@/lib/base-schemas";
import { CategoryConfig } from "../types";

// Schemas
export const StreamerPlatformSupportSchema = z.object({
  web: StrictFeatureStatusSchema,
  pwa: StrictFeatureStatusSchema,
  android: StrictFeatureStatusSchema,
  ios: StrictFeatureStatusSchema,
  androidTv: StrictFeatureStatusSchema,
  appleTv: StrictFeatureStatusSchema,
  windows: StrictFeatureStatusSchema,
  mac: StrictFeatureStatusSchema,
  linux: StrictFeatureStatusSchema,
  samsungTv: StrictFeatureStatusSchema.optional(),
  lgTv: StrictFeatureStatusSchema.optional(),
  roku: StrictFeatureStatusSchema.optional(),
});

export const CodecSupportSchema = z.object({
  h264: StrictFeatureStatusSchema,
  h265: StrictFeatureStatusSchema,
  av1: StrictFeatureStatusSchema,
  vp9: StrictFeatureStatusSchema,
  mpeg2: StrictFeatureStatusSchema,
  vc1: StrictFeatureStatusSchema,
  aac: StrictFeatureStatusSchema,
  ac3: StrictFeatureStatusSchema,
  eac3: StrictFeatureStatusSchema,
  truehd: StrictFeatureStatusSchema,
  dts: StrictFeatureStatusSchema,
  dtshdma: StrictFeatureStatusSchema,
  flac: StrictFeatureStatusSchema,
});

export const StreamerFeaturesSchema = z.object({
  multipleUsers: StrictFeatureStatusSchema,
  parentalControls: StrictFeatureStatusSchema,
  liveTv: StrictFeatureStatusSchema,
  dvr: StrictFeatureStatusSchema,
  hardwareTranscoding: StrictFeatureStatusSchema,
  offlineDownloads: StrictFeatureStatusSchema,
  watchTogether: StrictFeatureStatusSchema,
  autoSubtitles: StrictFeatureStatusSchema,
  introSkipping: StrictFeatureStatusSchema,
  skipCredits: StrictFeatureStatusSchema,
  skipAds: StrictFeatureStatusSchema,
  lyrics: StrictFeatureStatusSchema,
  podcasts: StrictFeatureStatusSchema,
  audiobooks: StrictFeatureStatusSchema,
  ebooks: StrictFeatureStatusSchema,
  photos: StrictFeatureStatusSchema,
  plugins: StrictFeatureStatusSchema,
  ldap: StrictFeatureStatusSchema,
  oidc: StrictFeatureStatusSchema,
  twoFactor: StrictFeatureStatusSchema,
  sso: StrictFeatureStatusSchema,
  sonarr: StrictFeatureStatusSchema,
  radarr: StrictFeatureStatusSchema,
  seerr: StrictFeatureStatusSchema,
  trakt: StrictFeatureStatusSchema,
});

export const StreamerToolSchema = BaseSoftwareToolSchema.extend({
  dockerSupport: StrictFeatureStatusSchema,
  armSupport: StrictFeatureStatusSchema,
  platforms: StreamerPlatformSupportSchema,
  codecs: CodecSupportSchema,
  features: StreamerFeaturesSchema,
});

// Types
export type StreamerPlatformSupport = z.infer<typeof StreamerPlatformSupportSchema>;
export type CodecSupport = z.infer<typeof CodecSupportSchema>;
export type StreamerFeatures = z.infer<typeof StreamerFeaturesSchema>;
export type StreamerTool = z.infer<typeof StreamerToolSchema>;

// Sections
export const sections: CategorySection[] = [
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

export const mediaServersConfig: Omit<CategoryConfig<StreamerTool>, 'data'> = {
    id: "media-servers",
    title: "Media Servers",
    description: "Jellyfin, Plex, Emby, and more. Compare transcoding, platform support, and features.",
    icon: MonitorPlay,
    sections: sections,
    schema: StreamerToolSchema,
};
