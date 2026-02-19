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
