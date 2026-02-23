import path from "path";
import { getAllTools } from "./utils";

const CONCURRENCY_LIMIT = 5;
const USER_AGENT = "foss-compare-link-checker/1.0 (+https://github.com/Ivoooo/foss-compare)";
const TIMEOUT_MS = 10000;

interface LinkLocation {
  file: string;
  path: string; // approximate path in JSON (e.g., "0.features.website")
}

interface CheckResult {
  ok: boolean;
  status?: number;
  error?: string;
}

function findUrlsInObject(obj: unknown, currentPath: string, file: string, urls: Map<string, LinkLocation[]>): void {
  if (typeof obj === "string") {
    // Improved regex to find URLs within text, not just starting with http
    const urlRegex = /https?:\/\/[^\s"']+/g;
    const matches = obj.match(urlRegex);
    if (matches) {
      matches.forEach(url => {
        // Clean up trailing punctuation often caught in regex
        const cleanUrl = url.replace(/[.,;)]+$/, "");
        const existing = urls.get(cleanUrl) || [];
        existing.push({ file, path: currentPath });
        urls.set(cleanUrl, existing);
      });
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      findUrlsInObject(item, `${currentPath}[${index}]`, file, urls);
    });
  } else if (typeof obj === "object" && obj !== null) {
    const record = obj as Record<string, unknown>;
    for (const key in record) {
      if (Object.prototype.hasOwnProperty.call(record, key)) {
        findUrlsInObject(record[key], `${currentPath}.${key}`, file, urls);
      }
    }
  }
}

async function fetchWithTimeout(url: string, method: string): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method,
      headers: { 
        "User-Agent": USER_AGENT,
        "Accept": "*/*"
      },
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function checkUrl(url: string): Promise<CheckResult> {
  try {
    // 1. Try HEAD first
    let response = await fetchWithTimeout(url, "HEAD");

    if (response.ok) {
      return { ok: true, status: response.status };
    }

    // 2. Fallback to GET for almost any non-ok HEAD (except 404 which is usually final)
    // Many WAFs/Servers block HEAD (403, 405, 503) but allow GET
    if (response.status !== 404) {
      try {
        const getResponse = await fetchWithTimeout(url, "GET");
        if (getResponse.ok) {
          return { ok: true, status: getResponse.status };
        }
        // update response for final status check if GET also failed
        response = getResponse;
      } catch {
        // if GET fails with exception, we still have the HEAD response to fall back to
      }
    }

    // 3. Handle specific status codes that might be valid but blocked (403, 429) after GET also failed
    if (response.status === 403 || response.status === 429) {
      console.warn(`⚠️  Warning: ${url} returned ${response.status}. Treating as potentially valid but flagged.`);
      return { ok: true, status: response.status, error: `HTTP ${response.status} ${response.statusText}` };
    }

    return {
      ok: false,
      status: response.status,
      error: `HTTP ${response.status} ${response.statusText}`
    };

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown Network Error";

    // Retry with GET on any network/timeout error
    try {
      const responseGet = await fetchWithTimeout(url, "GET");
      if (responseGet.ok) return { ok: true, status: responseGet.status };
      if (responseGet.status === 403 || responseGet.status === 429) {
         return { ok: true, status: responseGet.status, error: `HTTP ${responseGet.status}` };
      }
    } catch {
      // ignore retry error
    }

    return { ok: false, error: errorMessage };
  }
}

async function processQueue(urlsToCheck: string[], results: Map<string, CheckResult>) {
  const queue = [...urlsToCheck];
  const workers = [];

  for (let i = 0; i < CONCURRENCY_LIMIT; i++) {
    workers.push(
      (async () => {
        while (queue.length > 0) {
          const url = queue.shift();
          if (url) {
            console.log(`Checking: ${url}`);
            const result = await checkUrl(url);
            results.set(url, result);
          }
        }
      })()
    );
  }

  await Promise.all(workers);
}

async function main() {
  const tools = getAllTools();
  const allUrls = new Map<string, LinkLocation[]>();

  console.log(`🔍 Scanning ${tools.length} files for URLs...`);

  for (const tool of tools) {
    const relativePath = path.join(tool.category, tool.filename);
    findUrlsInObject(tool.data, "root", relativePath, allUrls);
  }

  const uniqueUrls = Array.from(allUrls.keys());
  console.log(`Found ${uniqueUrls.length} unique URLs.`);

  const checkResults = new Map<string, CheckResult>();
  await processQueue(uniqueUrls, checkResults);

  let hasErrors = false;
  console.log("\n--- Report ---");

  for (const [url, result] of checkResults) {
    if (!result.ok) {
      hasErrors = true;
      console.error(`❌ BROKEN: ${url}`);
      console.error(`   Error: ${result.error}`);
      const locations = allUrls.get(url);
      if (locations) {
        locations.forEach((loc) => {
          console.error(`   Found in: ${loc.file} -> ${loc.path}`);
        });
      }
      console.log("");
    }
  }

  if (hasErrors) {
    console.error("\n❌ Some links are broken.");
    process.exit(1);
  } else {
    console.log("\n✅ All links are reachable.");
    process.exit(0);
  }
}

main();
