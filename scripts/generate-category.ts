import fs from "fs";
import path from "path";

const ts = new Date().toISOString().split('T')[0];

function createVerification(status: any, version: string, link: string) {
    if (typeof status === "object") {
        return {
            status: status.status,
            note: status.note,
            verification: {
                verifiedAtVersion: status.version || version,
                verificationLink: status.link || link
            }
        };
    }
    return {
        status: status,
        verification: {
            verifiedAtVersion: version,
            verificationLink: link
        }
    };
}

async function main() {
    const categoryId = process.argv[2];
    if (!categoryId) {
        console.error("Usage: npx tsx scripts/generate-category.ts <category-id>");
        process.exit(1);
    }

    const dataPath = path.join(process.cwd(), "scripts", "data", `${categoryId}.ts`);
    if (!fs.existsSync(dataPath)) {
        console.error(`Data file not found: ${dataPath}`);
        process.exit(1);
    }

    // Dynamic import to load the data file
    const module = await import(dataPath);
    const category: any = module.default;

    const outDir = path.join(process.cwd(), "data", category.id);
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    for (const app of category.apps) {
        const data: any = {
            id: app.id,
            name: app.name,
            description: app.description,
            website: app.website,
            repository: app.repository,
            license: app.license,
            openSource: app.openSource,
            githubStats: { stars: 0, forks: 0, lastCommit: "2024-01-01T00:00:00Z", openIssues: 0 },
            language: app.language,
            dockerSupport: createVerification(app.dockerSupport, app.version, app.link),
            armSupport: createVerification(app.armSupport, app.version, app.link),
            platforms: {},
            features: {},
            notes: app.notes,
            meta: {
                lastCheck: {
                    date: ts,
                    version: app.version,
                    changelogLink: app.link
                }
            }
        };

        if (app.codecs) {
            data.codecs = {};
            for (const [key, val] of Object.entries(app.codecs)) {
                data.codecs[key] = createVerification(val, app.version, app.link);
            }
        }

        if (app.automation) data.automation = app.automation;
        if (app.performance) data.performance = app.performance;

        for (const [key, val] of Object.entries(app.platforms)) {
            data.platforms[key] = createVerification(val, app.version, app.link);
        }
        for (const [key, val] of Object.entries(app.features)) {
            data.features[key] = createVerification(val, app.version, app.link);
        }

        // Try to preserve existing githubStats and other fields if modifying existing file
        const filePath = path.join(outDir, `${app.id}.json`);
        if (fs.existsSync(filePath)) {
            const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            if (existing.githubStats) {
                data.githubStats = existing.githubStats;
            }
            if (existing.automation && !app.automation) {
                data.automation = existing.automation;
            }
            if (existing.performance && !app.performance) {
                data.performance = existing.performance;
            }
            if (existing.meta && existing.meta.lastCheck && existing.meta.lastCheck.date) {
                // If it was checked TODAY, keep the current data
                // Otherwise, use the today's date
            }
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
        console.log(`Wrote ${app.id}.json`);
    }
}

main().catch(console.error);
