import { FeatureStatus, SoftwareTool } from "@/types/software";

export function calculateFeatureScore(features: Record<string, FeatureStatus | undefined>): { score: number; total: number } {
  let score = 0;
  let total = 0;

  for (const key in features) {
    const status = features[key];
    if (status === undefined) continue;

    total++;

    const statusValue = typeof status === "object" ? status.status : status;

    switch (statusValue) {
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

export function getStarsEmote(stars: number, maxStars: number): string {
  if (stars > 1000 || (stars > 0 && stars === maxStars)) return "🔥";
  return "";
}

export function getForksEmote(forks: number, maxForks: number): string {
  if (forks > 200 || (forks > 0 && forks === maxForks)) return "🔥";
  return "";
}

export function getActivityEmote(lastCommit: string): string {
  if (!lastCommit || lastCommit === "N/A") return "";
  const commitDate = new Date(lastCommit);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - commitDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 30) return "🔥";
  return "";
}

export function getLicenseColor(license: string): string {
  const lowerLicense = license.toLowerCase();

  // Proprietary - distinct red
  if (lowerLicense.includes("proprietary") || lowerLicense.includes("closed")) {
    return "bg-red-500/15 text-red-700 dark:text-red-400 hover:bg-red-500/25 border-red-500/20";
  }

  // All Open Source - Green
  // Includes MIT, Apache, BSD, ISC, GPL, LGPL, AGPL, MPL, etc.
  return "bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-500/25 border-green-500/20";
}
