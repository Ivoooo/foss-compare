import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

async function fetchGitHubStats(owner: string, repo: string): Promise<GitHubStats | null> {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  const headers: HeadersInit = {
    "User-Agent": "foss-compare-updater",
    "Accept": "application/vnd.github.v3+json",
  };

  if (GITHUB_TOKEN) {
    headers["Authorization"] = `token ${GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Repository not found: ${owner}/${repo}`);
        return null;
      }
      if (response.status === 403) {
        console.warn(`Rate limit exceeded or forbidden for: ${owner}/${repo}`);
        // Optionally inspect headers for rate limit reset
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

async function updateFile(filename: string) {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) {
    console.warn(`File not found: ${filename}`);
    return;
  }

  try {
    const rawData = fs.readFileSync(filepath, "utf-8");
    const tools: Tool[] = JSON.parse(rawData);
    let updatedCount = 0;

    console.log(`Processing ${filename}...`);

    for (const tool of tools) {
      if (tool.repository && tool.repository.includes("github.com")) {
        // Extract owner and repo from URL
        // format: https://github.com/owner/repo or https://github.com/owner/repo.git
        const match = tool.repository.match(/github\.com\/([^/]+)\/([^/]+?)(\.git)?$/);

        if (match) {
          const owner = match[1];
          const repo = match[2];

          console.log(`  Fetching stats for ${tool.name} (${owner}/${repo})...`);

          const stats = await fetchGitHubStats(owner, repo);

          if (stats) {
            tool.githubStats = stats;
            updatedCount++;
          }

          // Slight delay to be nice to the API
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
            console.warn(`  Could not parse GitHub URL for ${tool.name}: ${tool.repository}`);
        }
      }
    }

    if (updatedCount > 0) {
      fs.writeFileSync(filepath, JSON.stringify(tools, null, 2) + "\n", "utf-8");
      console.log(`✅ Updated ${updatedCount} tools in ${filename}.`);
    } else {
      console.log(`No updates for ${filename}.`);
    }

  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
  }
}

async function main() {
  const files = fs.readdirSync(DATA_DIR).filter(file => file.endsWith(".json"));

  for (const file of files) {
    await updateFile(file);
  }
}

main();
