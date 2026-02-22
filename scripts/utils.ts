import fs from 'fs';
import path from 'path';

// Define the standard order for keys in the JSON files
const STANDARD_KEY_ORDER = [
  'id',
  'name',
  'description',
  'website',
  'repository',
  'license',
  'openSource',
  'githubStats',
  'language',
  'dockerSupport',
  'armSupport',
  // ... category specific keys will fill in here
  'automation',
  'performance',
  'notes',
  'meta'
];

// Keys that should always be at the end
const TAIL_KEYS = ['automation', 'performance', 'notes', 'meta'];

const DATA_DIR = path.join(process.cwd(), 'data');

export interface ToolFile {
  category: string;
  filename: string;
  filepath: string;
  data: Record<string, unknown>;
}

/**
 * Returns a list of all category directory names in the data directory.
 */
export function getAllCategories(): string[] {
  if (!fs.existsSync(DATA_DIR)) {
    throw new Error(`Data directory not found: ${DATA_DIR}`);
  }

  return fs.readdirSync(DATA_DIR).filter(item => {
    return fs.statSync(path.join(DATA_DIR, item)).isDirectory();
  });
}

/**
 * Returns a list of all tool files in a given category.
 */
export function getCategoryTools(category: string): ToolFile[] {
  const categoryDir = path.join(DATA_DIR, category);
  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  const files = fs.readdirSync(categoryDir).filter(file => file.endsWith(".json"));

  return files.map(file => {
    const filepath = path.join(categoryDir, file);
    try {
      const content = fs.readFileSync(filepath, 'utf-8');
      const data = JSON.parse(content);
      return {
        category,
        filename: file,
        filepath,
        data
      };
    } catch (error) {
      console.error(`Error reading ${category}/${file}:`, error);
      return null;
    }
  }).filter((t): t is ToolFile => t !== null);
}

/**
 * Reads a JSON file from the given path.
 */
export function readTool(filepath: string): Record<string, unknown> {
  const content = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Sorts the keys of a tool object according to the standard order.
 */
export function sortToolKeys(tool: Record<string, unknown>): Record<string, unknown> {
  const sorted: Record<string, unknown> = {};
  const keys = Object.keys(tool);

  // 1. Add keys from STANDARD_KEY_ORDER that exist in tool, except TAIL_KEYS
  for (const key of STANDARD_KEY_ORDER) {
    if (TAIL_KEYS.includes(key)) continue;
    if (key in tool) {
      sorted[key] = tool[key];
    }
  }

  // 2. Add any other keys (category specific), sorted alphabetically
  const remainingKeys = keys.filter(k =>
    !STANDARD_KEY_ORDER.includes(k) && !TAIL_KEYS.includes(k)
  ).sort();

  for (const key of remainingKeys) {
    sorted[key] = tool[key];
  }

  // 3. Add TAIL_KEYS
  for (const key of TAIL_KEYS) {
    if (key in tool) {
      sorted[key] = tool[key];
    }
  }

  return sorted;
}

/**
 * Writes the tool data to the file, ensuring sorted keys and consistent formatting.
 */
export function writeTool(filepath: string, data: Record<string, unknown>): void {
  const sortedData = sortToolKeys(data);
  fs.writeFileSync(filepath, JSON.stringify(sortedData, null, 2) + "\n", "utf-8");
}
