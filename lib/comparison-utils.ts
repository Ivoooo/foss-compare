import { FeatureStatus, SoftwareTool } from "@/types/software";

export function calculateFeatureScore(features: Record<string, FeatureStatus | undefined>): { score: number; total: number } {
  let score = 0;
  let total = 0;

  for (const key in features) {
    const status = features[key];
    if (status === undefined) continue;

    total++;

    switch (status) {
      case "Yes":
      case "Paid":
        score += 1;
        break;
      case "Partial":
        score += 0.5;
        break;
      case "No":
      case "Coming Soon":
      default:
        score += 0;
        break;
    }
  }

  return { score, total };
}

export function getGitHubPopularityStatus(software: SoftwareTool): string {
  if (!software.openSource) {
    return "Closed Source";
  }

  if (!software.githubStats) {
    return "Unknown";
  }

  const { stars, lastCommit } = software.githubStats;

  // Calculate Activity
  let activity = "Inactive";
  if (lastCommit && lastCommit !== "N/A") {
    const commitDate = new Date(lastCommit);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - commitDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 30) {
      activity = "Very Active";
    } else if (diffDays <= 90) {
      activity = "Active";
    } else if (diffDays <= 180) {
      activity = "Maintained";
    } else {
      activity = "Inactive";
    }
  }

  // Calculate Popularity
  let popularity = "Niche";
  if (stars > 20000) {
    popularity = "Extremely Popular";
  } else if (stars > 5000) {
    popularity = "Very Popular";
  } else if (stars > 1000) {
    popularity = "Popular";
  } else if (stars > 100) {
    popularity = "Growing";
  }

  return `${activity} & ${popularity}`;
}

export function getStarsEmote(stars: number): string {
  if (stars > 20000) return "🔥";
  if (stars > 5000) return "🚀";
  if (stars > 1000) return "⭐";
  return "";
}

export function getForksEmote(forks: number): string {
  if (forks > 1000) return "🔥";
  if (forks > 200) return "🚀";
  if (forks > 50) return "⭐";
  return "";
}

export function getActivityEmote(lastCommit: string): string {
  if (!lastCommit || lastCommit === "N/A") return "";
  const commitDate = new Date(lastCommit);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - commitDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 30) return "🔥";
  if (diffDays <= 90) return "✅";
  return "";
}

export function getLicenseColor(license: string): string {
  const lowerLicense = license.toLowerCase();

  if (lowerLicense.includes("proprietary") || lowerLicense.includes("closed")) {
    return "bg-destructive text-destructive-foreground hover:bg-destructive/80"; // Red
  }

  if (
    lowerLicense.includes("mit") ||
    lowerLicense.includes("apache") ||
    lowerLicense.includes("bsd") ||
    lowerLicense.includes("isc") ||
    lowerLicense.includes("unlicense") ||
    lowerLicense.includes("0bsd") ||
    lowerLicense.includes("cc0")
  ) {
    return "bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-500/25 border-green-500/20"; // Green
  }

  if (
    lowerLicense.includes("gpl") ||
    lowerLicense.includes("agpl") ||
    lowerLicense.includes("lgpl") ||
    lowerLicense.includes("mozilla") ||
    lowerLicense.includes("mpl") ||
    lowerLicense.includes("eupl")
  ) {
    return "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/25 border-yellow-500/20"; // Yellow/Orange
  }

  return "bg-secondary text-secondary-foreground hover:bg-secondary/80"; // Default/Gray
}
