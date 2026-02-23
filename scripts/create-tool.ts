import fs from "fs";
import path from "path";
import readline from "readline";
import { categories } from "../lib/categories";
import { writeTool, getCategoryTools, sortToolKeys } from "./utils";
import { CategoryConfig } from "../lib/categories/types";
import { CategorySection, FeatureItem } from "../lib/base-schemas";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, resolve));
};

function slugify(text: string): string {
  return text.toString().toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

async function updateCategoryIndex(categoryId: string) {
  const dataDir = path.join(process.cwd(), "data", categoryId);
  const indexFile = path.join(dataDir, "index.ts");

  if (!fs.existsSync(indexFile)) {
    console.warn(`Warning: index.ts not found for ${categoryId}. Skipping index update.`);
    return;
  }

  const existingContent = fs.readFileSync(indexFile, "utf-8");
  const exportMatch = existingContent.match(/export const (\w+) =/);
  const exportName = exportMatch ? exportMatch[1] : `${categoryId.replace(/-/g, '_')}Data`;

  const tools = getCategoryTools(categoryId);
  const imports: string[] = [];
  const exportList: string[] = [];

  // Sort tools by filename (or id?) to keep index stable
  tools.sort((a, b) => a.filename.localeCompare(b.filename));

  for (const tool of tools) {
     let importName = tool.filename.replace(".json", "").replace(/-/g, "_");
     // Ensure it's a valid JS identifier
     if (/^[0-9]/.test(importName)) {
        importName = `tool_${importName}`;
     }
     imports.push(`import ${importName} from "./${tool.filename}";`);
     exportList.push(importName);
  }

  const newContent = `${imports.join("\n")}

export const ${exportName} = [
  ${exportList.join(",\n  ")}
];

export default ${exportName};
`;

  fs.writeFileSync(indexFile, newContent, "utf-8");
  console.log(`Updated ${categoryId}/index.ts`);
}

async function main() {
  console.log("Welcome to the FOSS Comparison Tool Creator!");
  console.log("-------------------------------------------");

  // 1. Select Category
  console.log("Available Categories:");
  categories.forEach((c, idx) => {
    console.log(`${idx + 1}. ${c.title} (${c.id})`);
  });

  let categoryIndex = -1;
  while (categoryIndex < 0 || categoryIndex >= categories.length) {
    const answer = await question("Select a category (number): ");
    const parsed = parseInt(answer, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed <= categories.length) {
      categoryIndex = parsed - 1;
    } else {
      console.log("Invalid selection.");
    }
  }

  const selectedCategory = categories[categoryIndex];
  console.log(`Selected: ${selectedCategory.title}`);

  // 2. Tool Details
  const name = await question("Tool Name: ");
  const id = slugify(name); // Default ID
  const website = await question("Website URL: ");
  const repository = await question("Repository URL (optional): ");
  const license = await question("License (default: Unknown): ") || "Unknown";
  const openSourceInput = await question("Open Source? (Y/n): ");
  const openSource = openSourceInput.toLowerCase() !== 'n';
  const description = await question("Description: ");

  // 3. Construct Tool Object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tool: any = {
    id,
    name,
    description,
    website,
    repository: repository || undefined,
    license,
    openSource,
    githubStats: undefined, // Will be filled by update-github-stats
    language: [], // Empty array
    dockerSupport: { status: "Unknown" },
    armSupport: { status: "Unknown" },
    automation: {},
    performance: {},
    notes: "",
    meta: {
        lastCheck: {
            date: new Date().toISOString().split('T')[0],
            version: "0.0.0"
        }
    }
  };

  // 4. Populate Category-Specific Fields
  if (selectedCategory.sections) {
    selectedCategory.sections.forEach((section: CategorySection) => {
      section.items.forEach((item: FeatureItem) => {
        const parts = item.key.split('.');
        if (parts.length === 1) {
            // Top level key, already handled docker/arm support above if generic
            // But if it's category specific top level?
            if (!tool[parts[0]]) {
                tool[parts[0]] = { status: "Unknown" };
            }
        } else if (parts.length === 2) {
            const group = parts[0];
            const key = parts[1];
            if (!tool[group]) {
                tool[group] = {};
            }
            tool[group][key] = { status: "Unknown" };
        }
      });
    });
  }

  // 5. Write File
  const filepath = path.join(process.cwd(), "data", selectedCategory.id, `${id}.json`);

  if (fs.existsSync(filepath)) {
     const overwrite = await question(`File ${id}.json already exists. Overwrite? (y/N): `);
     if (overwrite.toLowerCase() !== 'y') {
         console.log("Aborted.");
         rl.close();
         return;
     }
  }

  writeTool(filepath, tool);
  console.log(`\nCreated ${filepath}`);

  // 6. Update Index
  await updateCategoryIndex(selectedCategory.id);

  console.log("\nDone! Don't forget to run 'npm run validate' to check your new tool.");
  rl.close();
}

main().catch((err) => {
  console.error(err);
  rl.close();
});
