import { z } from "zod";
import { Headphones } from "lucide-react";
import {
    BaseSoftwareToolSchema,
    FeatureStatusSchema,
    CategorySection
} from "@/lib/base-schemas";
import { CategoryConfig } from "@/lib/types";

// Schemas
export const MusicStreamingPlatformSupportSchema = z.object({
  windows: FeatureStatusSchema,
  mac: FeatureStatusSchema,
  linux: FeatureStatusSchema,
  android: FeatureStatusSchema,
  ios: FeatureStatusSchema,
  webUi: FeatureStatusSchema,
  cli: FeatureStatusSchema,
});

export const MusicStreamingFeaturesSchema = z.object({
  subsonicApi: FeatureStatusSchema,
  tagBased: FeatureStatusSchema,
  folderBased: FeatureStatusSchema,
  losslessFlac: FeatureStatusSchema,
  m4bSupport: FeatureStatusSchema,
  smartPlaylists: FeatureStatusSchema,
  scrobbling: FeatureStatusSchema,
  podcasts: FeatureStatusSchema,
  ebooks: FeatureStatusSchema,
  lyrics: FeatureStatusSchema,
  progressSync: FeatureStatusSchema,
  gapless: FeatureStatusSchema,
  transcoding: FeatureStatusSchema,
  jukebox: FeatureStatusSchema,
  chromecast: FeatureStatusSchema,
  dlnaBridge: FeatureStatusSchema,
  multiUser: FeatureStatusSchema,
  roles: FeatureStatusSchema,
  publicSharing: FeatureStatusSchema,
  federation: FeatureStatusSchema,
  twoFactor: FeatureStatusSchema,
  ldap: FeatureStatusSchema,
  oidc: FeatureStatusSchema,
});

export const MusicStreamingToolSchema = BaseSoftwareToolSchema.extend({
  dockerSupport: FeatureStatusSchema,
  armSupport: FeatureStatusSchema,
  platforms: MusicStreamingPlatformSupportSchema,
  features: MusicStreamingFeaturesSchema,
});

// Types
export type MusicStreamingPlatformSupport = z.infer<typeof MusicStreamingPlatformSupportSchema>;
export type MusicStreamingFeatures = z.infer<typeof MusicStreamingFeaturesSchema>;
export type MusicStreamingTool = z.infer<typeof MusicStreamingToolSchema>;

// Sections
export const sections: CategorySection[] = [
    {
        id: "features",
        label: "General Features",
        items: [
            { key: "features.subsonicApi", label: "Subsonic API" },
            { key: "features.tagBased", label: "Tag Based" },
            { key: "features.folderBased", label: "Folder Based" },
            { key: "features.smartPlaylists", label: "Smart Playlists" },
            { key: "features.scrobbling", label: "Scrobbling" },
            { key: "features.podcasts", label: "Podcasts" },
            { key: "features.ebooks", label: "E-Books" },
            { key: "features.jukebox", label: "Jukebox Mode" },
        ]
    },
    {
        id: "playback",
        label: "Playback & Audio",
        items: [
            { key: "features.losslessFlac", label: "Lossless FLAC" },
            { key: "features.m4bSupport", label: "M4B Support" },
            { key: "features.lyrics", label: "Lyrics" },
            { key: "features.progressSync", label: "Progress Sync" },
            { key: "features.gapless", label: "Gapless Playback" },
            { key: "features.transcoding", label: "Transcoding" },
        ]
    },
    {
        id: "sharing",
        label: "Sharing & Multi-user",
        items: [
            { key: "features.multiUser", label: "Multi-User" },
            { key: "features.roles", label: "User Roles" },
            { key: "features.publicSharing", label: "Public Sharing" },
            { key: "features.federation", label: "Federation" },
            { key: "features.chromecast", label: "Chromecast" },
            { key: "features.dlnaBridge", label: "DLNA / UPnP" },
        ]
    },
    {
        id: "platforms",
        label: "Platform Support",
        items: [
            { key: "platforms.webUi", label: "Web UI" },
            { key: "platforms.android", label: "Android" },
            { key: "platforms.ios", label: "iOS" },
            { key: "platforms.windows", label: "Windows" },
            { key: "platforms.mac", label: "macOS" },
            { key: "platforms.linux", label: "Linux" },
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
        ]
    }
];

export const musicStreamingConfig: Omit<CategoryConfig<MusicStreamingTool>, 'data'> = {
    id: "music-streaming",
    title: "Music & Audio Streaming",
    description: "Spotify and Audible alternatives. Subsonic servers, audiobook managers, and federated media streamers.",
    icon: Headphones,
    sections: sections,
    schema: MusicStreamingToolSchema,
};
