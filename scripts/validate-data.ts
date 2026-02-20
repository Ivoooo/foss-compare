import fs from "fs";
import path from "path";
import { ZodError, ZodSchema } from "zod";
import { StreamerToolSchema, PasswordManagerToolSchema } from "../lib/schemas";

const DATA_DIR = path.join(process.cwd(), "data");

const SCHEMAS: Record<string, ZodSchema> = {
  "streamers.json": StreamerToolSchema,
  "password-managers.json": PasswordManagerToolSchema,
};

function validateFile(filename: string) {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) {
    console.error(`File not found: ${filename}`);
    return false;
  }

  try {
    const rawData = fs.readFileSync(filepath, "utf-8");
    const json = JSON.parse(rawData);

    if (!Array.isArray(json)) {
      console.error(`Error in ${filename}: Root element is not an array.`);
      return false;
    }

    const schema = SCHEMAS[filename];
    if (!schema) {
      console.error(`No schema defined for ${filename}`);
      return false;
    }

    let hasError = false;
    json.forEach((item, index) => {
      try {
        schema.parse(item);
      } catch (error) {
        hasError = true;
        if (error instanceof ZodError) {
          console.error(`\nError in ${filename} at index ${index} (ID: ${item.id || "unknown"}):`);
          error.issues.forEach((err) => {
            console.error(`  - ${err.path.join(".")}: ${err.message}`);
          });
        } else {
          console.error(`Unknown error in ${filename} at index ${index}:`, error);
        }
      }
    });

    if (hasError) {
      return false;
    }

    console.log(`✅ ${filename} passed validation.`);
    return true;

  } catch (error) {
    console.error(`Error reading or parsing ${filename}:`, error);
    return false;
  }
}

function main() {
  const files = Object.keys(SCHEMAS);
  let allValid = true;

  console.log("Starting validation...\n");

  for (const file of files) {
    if (!validateFile(file)) {
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
