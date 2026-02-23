import { getAllCategories, getCategoryTools, writeTool } from "./utils";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface GitHubStats {
  stars: number;
  forks: number;
  lastCommit: string;
  openIssues: number;
}

interface Tool {
  id: string;
  name: string;
  repository?: string;
  githubStats?: GitHubStats;
  meta?: {
    lastCheck?: {
      date: string;
      version: string;
      changelogLink?: string;
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const headers: HeadersInit = {
  "User-Agent": "foss-compare-updater",
  "Accept": "application/vnd.github.v3+json",
};

if (GITHUB_TOKEN) {
  headers["Authorization"] = `token ${GITHUB_TOKEN}`;
}

async function fetchGitHubStats(owner: string, repo: string): Promise<GitHubStats | null> {
  const url = `https://api.github.com/repos/${owner}/${repo}`;

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Repository not found: ${owner}/${repo}`);
        return null;
      }
      if (response.status === 403) {
        console.warn(`Rate limit exceeded or forbidden for: ${owner}/${repo}`);
        return null;
      }
      console.warn(`Error fetching ${owner}/${repo}: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      lastCommit: data.pushed_at, // ISO date string
      openIssues: data.open_issues_count,
    };
  } catch (error) {
    console.error(`Network error fetching ${owner}/${repo}:`, error);
    return null;
  }
}

async function fetchLatestVersion(owner: string, repo: string): Promise<{ tag: string; url: string } | null> {
  // Try releases/latest first
  try {
    const releaseUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
    const releaseRes = await fetch(releaseUrl, { headers });

    if (releaseRes.ok) {
      const data = await releaseRes.json();
      return {
        tag: data.tag_name,
        url: data.html_url
      };
    }
  } catch {
    // ignore and try tags
  }

  // Fallback to tags
  try {
    const tagsUrl = `https://api.github.com/repos/${owner}/${repo}/tags`;
    const tagsRes = await fetch(tagsUrl, { headers });

    if (tagsRes.ok) {
      const data = await tagsRes.json();
      if (Array.isArray(data) && data.length > 0) {
        return {
          tag: data[0].name,
          url: `https://github.com/${owner}/${repo}/releases/tag/${data[0].name}` // Construct tag URL
        };
      }
    }
  } catch (e) {
    console.error(`Error fetching tags for ${owner}/${repo}:`, e);
  }

  return null;
}

async function updateCategory(category: string) {
  const tools = getCategoryTools(category);
  if (tools.length === 0) return;

  console.log(`Processing category ${category}...`);

  for (const toolFile of tools) {
    const tool = toolFile.data as unknown as Tool;
    let updated = false;

    if (tool.repository && tool.repository.includes("github.com")) {
      // Handles https://github.com/owner/repo, owner/repo.git, and trailing slashes
      const match = tool.repository.match(/github\.com\/([^/]+)\/([^/]+?)(?:\.git|\/)?$/);

      if (match) {
        const owner = match[1];
        const repo = match[2];

        console.log(`  Fetching stats for ${tool.name} (${owner}/${repo})...`);

        // 1. Fetch Stats
        const stats = await fetchGitHubStats(owner, repo);
        if (stats) {
          // Check if stats changed significantly or just update always?
          // We update always to keep lastCommit fresh
          tool.githubStats = stats;
          updated = true;
        }

        // 2. Fetch Version
        const versionInfo = await fetchLatestVersion(owner, repo);
        if (versionInfo) {
          if (!tool.meta) {
            tool.meta = {
                lastCheck: {
                    date: "",
                    version: ""
                }
            };
          }
          if (!tool.meta.lastCheck) {
             tool.meta.lastCheck = {
                 date: "",
                 version: ""
             };
          }

          const today = new Date().toISOString().split('T')[0];

          // Only mark updated if version changed or it's a new check
          // But we want to update 'date' anyway if we checked it.
          // Or should we only update if version changes?
          // The user probably wants to know "last checked date".

          tool.meta.lastCheck.version = versionInfo.tag;
          tool.meta.lastCheck.date = today;

          // If changelogLink is missing, add it
          if (!tool.meta.lastCheck.changelogLink) {
             tool.meta.lastCheck.changelogLink = versionInfo.url;
          }

          updated = true;
        }

        // Slight delay
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        console.warn(`  Could not parse GitHub URL for ${tool.name}: ${tool.repository}`);
      }
    }

    if (updated) {
      writeTool(toolFile.filepath, tool);
      console.log(`✅ Updated ${toolFile.filename}`);
    }
  }
}

async function main() {
  const categories = getAllCategories();

  for (const category of categories) {
    await updateCategory(category);
  }
}

main();
