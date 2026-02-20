import {
  FeatureStatusType,
  FeatureStatusObject,
  FeatureStatus,
  GitHubStats,
  BaseSoftwareTool,
  StreamerPlatformSupport,
  CodecSupport,
  StreamerFeatures,
  StreamerTool,
  PasswordManagerPlatformSupport,
  PasswordManagerFeatures,
  PasswordManagerTool,
  SoftwareTool
} from "@/lib/schemas";

export type {
  FeatureStatusType,
  FeatureStatusObject,
  FeatureStatus,
  GitHubStats,
  BaseSoftwareTool,
  StreamerPlatformSupport,
  CodecSupport,
  StreamerFeatures,
  StreamerTool,
  PasswordManagerPlatformSupport,
  PasswordManagerFeatures,
  PasswordManagerTool,
  SoftwareTool
};

export type FeatureItem = {
  key: string;
  label: string;
};

export type CategorySection = {
  id: string;
  label: string;
  items: FeatureItem[];
};
