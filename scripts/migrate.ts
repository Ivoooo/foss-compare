import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformFeatures(source: any, defaultVersion: string, defaultLink?: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = {};
    for (const [key, value] of Object.entries(source)) {
        if (typeof value === "string") {
            result[key] = {
                status: value,
                verification: {
                    verifiedAtVersion: defaultVersion,
                    ...((defaultLink) ? { verificationLink: defaultLink } : {})
                }
            };
        } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const objValue = value as any;
            if (objValue.status && !objValue.verification) {
                result[key] = {
                    ...objValue,
                    verification: {
                        verifiedAtVersion: defaultVersion,
                        ...((defaultLink) ? { verificationLink: defaultLink } : {})
                    }
                };
            } else {
                result[key] = value;
            }
        } else {
            result[key] = value;
        }
    }
    return result;
}

function processCategory(filename: string, category: string) {
    const filepath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filepath)) {
        console.error(`File not found: ${filename}`);
        return false;
    }

    const rawData = fs.readFileSync(filepath, "utf-8");
    const data = JSON.parse(rawData);

    const categoryDir = path.join(DATA_DIR, category);
    if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
    }

    const exportNames: string[] = [];

    for (const item of data) {
        const defaultVersion = item.meta?.lastCheck?.version;
        const defaultLink = item.meta?.lastCheck?.changelogLink;

        if (item.platforms) {
            item.platforms = transformFeatures(item.platforms, defaultVersion, defaultLink);
        }
        if (item.codecs) {
            item.codecs = transformFeatures(item.codecs, defaultVersion, defaultLink);
        }
        if (item.features) {
            item.features = transformFeatures(item.features, defaultVersion, defaultLink);
        }

        // Also Docker and ARM
        if (typeof item.dockerSupport === "string") {
            item.dockerSupport = {
                status: item.dockerSupport,
                verification: {
                    verifiedAtVersion: defaultVersion,
                    ...((defaultLink) ? { verificationLink: defaultLink } : {})
                }
            };
        } else if (item.dockerSupport?.status && !item.dockerSupport?.verification) {
            item.dockerSupport.verification = {
                verifiedAtVersion: defaultVersion,
                ...((defaultLink) ? { verificationLink: defaultLink } : {})
            };
        }

        if (typeof item.armSupport === "string") {
            item.armSupport = {
                status: item.armSupport,
                verification: {
                    verifiedAtVersion: defaultVersion,
                    ...((defaultLink) ? { verificationLink: defaultLink } : {})
                }
            };
        } else if (item.armSupport?.status && !item.armSupport?.verification) {
            item.armSupport.verification = {
                verifiedAtVersion: defaultVersion,
                ...((defaultLink) ? { verificationLink: defaultLink } : {})
            };
        }

        const targetName = `${item.id}.json`;
        const targetPath = path.join(categoryDir, targetName);
        fs.writeFileSync(targetPath, JSON.stringify(item, null, 2) + "\n");
        console.log(`Wrote ${targetPath}`);
        exportNames.push(item.id);
    }

    const exportDataName = `${category.replace(/-/g, '_')}Data`;
    let indexContent = exportNames.map(name => `import ${name.replace(/-/g, '_')} from "./${name}.json";`).join("\n") + "\n\n";
    indexContent += `export const ${exportDataName} = [\n` + exportNames.map(name => `  ${name.replace(/-/g, '_')},`).join("\n") + "\n];\n\n";
    indexContent += `export default ${exportDataName};\n`;

    fs.writeFileSync(path.join(categoryDir, "index.ts"), indexContent);
    console.log(`Wrote ${path.join(categoryDir, "index.ts")}`);
    return true;
}

if (processCategory("media-servers.json", "media-servers")) {
    fs.unlinkSync(path.join(DATA_DIR, "media-servers.json"));
}
if (processCategory("password-managers.json", "password-managers")) {
    fs.unlinkSync(path.join(DATA_DIR, "password-managers.json"));
}
