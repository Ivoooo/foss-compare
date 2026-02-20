import { FeatureStatus, SoftwareTool } from "@/lib/schemas";

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
        score += 1;
        break;
      case "Paid":
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

  if (lowerLicense.includes("proprietary") || lowerLicense.includes("closed")) {
    return "bg-red-500/15 text-red-700 dark:text-red-400 hover:bg-red-500/25 border-red-500/20";
  }

  return "bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-500/25 border-green-500/20";
}

export function parseSizeString(sizeStr?: string): number {
  if (!sizeStr) return Infinity; // Return Infinity for missing values so they don't count as "lowest"

  const cleanStr = sizeStr.replace(/\(.*?\)/g, "").trim();

  const match = cleanStr.match(/^([\d.]+)\s*([a-zA-Z]+)$/);
  if (!match) return Infinity;

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  const units = ["B", "KB", "MB", "GB", "TB", "MIB", "GIB", "TIB"];
  const multipliers = [
    1,
    1024,
    1024 * 1024,
    1024 * 1024 * 1024,
    1024 * 1024 * 1024 * 1024,
    1024 * 1024,
    1024 * 1024 * 1024,
    1024 * 1024 * 1024 * 1024
  ];

  const index = units.indexOf(unit);

  if (index === -1) return Infinity;

  return value * multipliers[index];
}

export function formatRelativeDate(dateString: string): string {
  if (!dateString || dateString === "N/A") return "N/A";

  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 0) return "just now";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    if (diffInMinutes <= 1) return "just now";
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    if (diffInHours === 1) return "an hour ago";
    return `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    if (diffInDays === 1) return "yesterday";
    return `${diffInDays} days ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    if (diffInWeeks === 1) return "last week";
    return `${diffInWeeks} weeks ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    if (diffInMonths === 1) return "last month";
    return `${diffInMonths} months ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  if (diffInYears === 1) return "last year";
  return `${diffInYears} years ago`;
}
