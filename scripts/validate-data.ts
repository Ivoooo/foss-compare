import fs from "fs";
import path from "path";
import { ZodError, ZodSchema } from "zod";
import { StreamerToolSchema, PasswordManagerToolSchema } from "../lib/schemas";

const DATA_DIR = path.join(process.cwd(), "data");

const SCHEMAS: Record<string, ZodSchema> = {
  "media-servers": StreamerToolSchema,
  "password-managers": PasswordManagerToolSchema,
};

function validateCategory(category: string) {
  const categoryDir = path.join(DATA_DIR, category);
  if (!fs.existsSync(categoryDir)) {
    console.error(`Directory not found: ${categoryDir}`);
    return false;
  }

  const schema = SCHEMAS[category];
  if (!schema) {
    console.error(`No schema defined for ${category}`);
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
          console.error(`\nError in ${category}/${file} (ID: ${json.id || "unknown"}):`);
          error.issues.forEach((err) => {
            console.error(`  - ${err.path.join(".")}: ${err.message}`);
          });
        } else {
          console.error(`Unknown error in ${category}/${file}:`, error);
        }
      }
    } catch (error) {
      console.error(`Error reading or parsing ${category}/${file}:`, error);
      hasError = true;
    }
  }

  if (hasError) {
    return false;
  }

  console.log(`✅ ${category} passed validation.`);
  return true;
}

function main() {
  const categories = Object.keys(SCHEMAS);
  let allValid = true;

  console.log("Starting validation...\n");

  for (const category of categories) {
    if (!validateCategory(category)) {
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
