import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const CONCURRENCY_LIMIT = 5;
const USER_AGENT = "foss-compare-link-checker/1.0 (+https://github.com/Ivoooo/foss-compare)";

interface LinkLocation {
  file: string;
  path: string; // approximate path in JSON (e.g., "0.features.website")
}

function findUrlsInObject(obj: unknown, currentPath: string, file: string, urls: Map<string, LinkLocation[]>): void {
  if (typeof obj === "string") {
    if (obj.startsWith("http://") || obj.startsWith("https://")) {
      const existing = urls.get(obj) || [];
      existing.push({ file, path: currentPath });
      urls.set(obj, existing);
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

async function checkUrl(url: string): Promise<{ ok: boolean; status?: number; error?: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(url, {
      method: "HEAD",
      headers: { "User-Agent": USER_AGENT },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      return { ok: true, status: response.status };
    } else if (response.status === 405) {
      // Method Not Allowed, try GET
      const controllerGet = new AbortController();
      const timeoutIdGet = setTimeout(() => controllerGet.abort(), 10000);
      const responseGet = await fetch(url, {
        method: "GET",
        headers: { "User-Agent": USER_AGENT },
        signal: controllerGet.signal,
      });
      clearTimeout(timeoutIdGet);

      return {
        ok: responseGet.ok,
        status: responseGet.status,
        error: responseGet.ok ? undefined : `HTTP ${responseGet.status} ${responseGet.statusText}`,
      };
    } else {
       // specific handling for 403/429?
       if (response.status === 403 || response.status === 429) {
           console.warn(`⚠️  Warning: ${url} returned ${response.status}. Treating as potentially valid but flagged.`);
           // For now, treat as failure or warning? Let's treat as warning (ok: true) but log it.
           // Actually, standard link checkers often fail on 403. But let's be strict for now.
           return { ok: false, status: response.status, error: `HTTP ${response.status} ${response.statusText}` };
       }
      return { ok: false, status: response.status, error: `HTTP ${response.status} ${response.statusText}` };
    }
  } catch (error: unknown) {
    return { ok: false, error: error instanceof Error ? error.message : "Network Error" };
  }
}

async function processQueue(urlsToCheck: string[], results: Map<string, { ok: boolean; status?: number; error?: string }>) {
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
  const files = fs.readdirSync(DATA_DIR).filter((file) => file.endsWith(".json"));
  const allUrls = new Map<string, LinkLocation[]>();

  console.log("🔍 Scanning for URLs...");

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const json = JSON.parse(content);
      findUrlsInObject(json, "root", file, allUrls);
    } catch (err) {
      console.error(`Error reading/parsing ${file}:`, err);
      process.exit(1);
    }
  }

  const uniqueUrls = Array.from(allUrls.keys());
  console.log(`Found ${uniqueUrls.length} unique URLs.`);

  const checkResults = new Map<string, { ok: boolean; status?: number; error?: string }>();
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
