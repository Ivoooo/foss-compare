import fs from "fs";
import path from "path";
import { ZodError } from "zod";
import { categories } from "../lib/categories";

const DATA_DIR = path.join(process.cwd(), "data");

function validateCategory(categoryId: string, schema: any) {
  const categoryDir = path.join(DATA_DIR, categoryId);
  if (!fs.existsSync(categoryDir)) {
    console.error(`Directory not found: ${categoryDir}`);
    return false;
  }

  const files = fs.readdirSync(categoryDir).filter(file => file.endsWith(".json"));
  let hasError = false;

  for (const file of files) {
    const filepath = path.join(categoryDir, file);
    try {
      const rawData = fs.readFileSync(filepath, "utf-8");
      const json = JSON.parse(rawData);

      try {
        schema.parse(json);
      } catch (error) {
        hasError = true;
        if (error instanceof ZodError) {
          console.error(`\nError in ${categoryId}/${file} (ID: ${json.id || "unknown"}):`);
          error.issues.forEach((err) => {
            console.error(`  - ${err.path.join(".")}: ${err.message}`);
          });
        } else {
          console.error(`Unknown error in ${categoryId}/${file}:`, error);
        }
      }
    } catch (error) {
      console.error(`Error reading or parsing ${categoryId}/${file}:`, error);
      hasError = true;
    }
  }

  if (hasError) {
    return false;
  }

  console.log(`✅ ${categoryId} passed validation.`);
  return true;
}

function main() {
  let allValid = true;

  console.log("Starting validation...\n");

  for (const category of categories) {
    if (!validateCategory(category.id, category.schema)) {
      allValid = false;
    }
  }

  if (!allValid) {
    console.error("\n❌ Validation failed.");
    process.exit(1);
  } else {
    console.log("\n✨ All data files are valid.");
  }
}

main();
