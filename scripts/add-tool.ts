import fs from 'fs';
import path from 'path';
import readline from 'readline';

const DATA_DIR = path.join(process.cwd(), 'data');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question: string): Promise<string> {
  return new Promise(resolve => rl.question(question, resolve));
}

function getCategories(): string[] {
  if (!fs.existsSync(DATA_DIR)) return [];
  return fs.readdirSync(DATA_DIR).filter(file => {
    return fs.statSync(path.join(DATA_DIR, file)).isDirectory();
  });
}

function getTemplateFile(categoryDir: string): string | null {
  if (!fs.existsSync(categoryDir)) return null;
  const files = fs.readdirSync(categoryDir).filter(f => f.endsWith('.json'));
  return files.length > 0 ? path.join(categoryDir, files[0]) : null;
}

function createBoilerplate(template: any, newId: string): any {
  if (Array.isArray(template)) {
    return [];
  }
  if (template === null) return null;

  if (typeof template === 'object') {
    const newObj: any = {};
    for (const key in template) {
      if (key === 'id') {
        newObj[key] = newId;
      } else {
        newObj[key] = createBoilerplate(template[key], newId);
      }
    }
    return newObj;
  }

  // Primitives
  return null;
}

async function updateIndexFile(categoryDir: string, toolId: string) {
  const indexPath = path.join(categoryDir, 'index.ts');
  if (!fs.existsSync(indexPath)) {
    console.warn(`Warning: No index.ts found in ${categoryDir}`);
    return;
  }

  let content = fs.readFileSync(indexPath, 'utf-8');

  // 1. Add import
  // Sanitize variable name: replace hyphens with underscores, and prefix with underscore if starting with digit
  const sanitizedId = toolId.replace(/-/g, '_');
  const varName = /^[0-9]/.test(sanitizedId) ? `_${sanitizedId}` : sanitizedId;
  const importStatement = `import ${varName} from "./${toolId}.json";`;

  const lines = content.split('\n');
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('import ')) {
      lastImportIdx = i;
    }
  }

  if (lastImportIdx !== -1) {
    lines.splice(lastImportIdx + 1, 0, importStatement);
  } else {
    // If no imports found, adding at top might conflict with comments, but usually safe for these files
    lines.unshift(importStatement);
  }

  content = lines.join('\n');

  // 2. Add to array
  // Regex to find `export const <name> = [` with flexible spacing
  const arrayStartRegex = /export\s+const\s+(\w+)\s*=\s*\[/;
  const match = content.match(arrayStartRegex);

  if (match) {
    const fullMatch = match[0];
    // Replace the opening `[` with `[\n  variableName,`
    // This assumes the file isn't minified and expects multiline array
    content = content.replace(fullMatch, `${fullMatch}\n  ${varName},`);

    fs.writeFileSync(indexPath, content);
    console.log(`Updated ${indexPath}`);
  } else {
    console.warn("Could not find the data array export in index.ts. Please add the new tool manually.");
  }
}

async function main() {
  console.log("Welcome to the Add Tool Wizard!");

  const categories = getCategories();

  if (categories.length === 0) {
    console.error("No categories found in data/ directory.");
    process.exit(1);
  }

  console.log("\nAvailable Categories:");
  categories.forEach((c, i) => console.log(`${i + 1}. ${c}`));

  const catIndexStr = await ask("\nSelect a category (number): ");
  const catIndex = parseInt(catIndexStr.trim()) - 1;

  if (isNaN(catIndex) || catIndex < 0 || catIndex >= categories.length) {
    console.error("Invalid selection.");
    rl.close();
    process.exit(1);
  }

  const category = categories[catIndex];
  const categoryDir = path.join(DATA_DIR, category);

  const toolIdRaw = await ask("Enter new Tool ID (e.g. 'my-tool'): ");
  const toolId = toolIdRaw.trim();

  // Basic validation: lowercase, numbers, hyphens
  if (!toolId || !/^[a-z0-9-]+$/.test(toolId)) {
    console.error("Invalid Tool ID. Use lowercase letters, numbers, and hyphens only.");
    rl.close();
    process.exit(1);
  }

  const newFilePath = path.join(categoryDir, `${toolId}.json`);
  if (fs.existsSync(newFilePath)) {
    console.error(`File ${newFilePath} already exists! Aborting.`);
    rl.close();
    process.exit(1);
  }

  const templateFile = getTemplateFile(categoryDir);
  if (!templateFile) {
    console.error(`No existing JSON files found in ${category} to use as template.`);
    rl.close();
    process.exit(1);
  }

  console.log(`Using ${path.basename(templateFile)} as template...`);
  const templateContent = fs.readFileSync(templateFile, 'utf-8');
  let templateJson;
  try {
    templateJson = JSON.parse(templateContent);
  } catch (e) {
    console.error("Failed to parse template file.");
    rl.close();
    process.exit(1);
  }

  const boilerplate = createBoilerplate(templateJson, toolId);

  fs.writeFileSync(newFilePath, JSON.stringify(boilerplate, null, 2));
  console.log(`Created ${newFilePath}`);

  await updateIndexFile(categoryDir, toolId);

  console.log("\nDone! Don't forget to fill in the data in the new JSON file.");
  rl.close();
}

main().catch(console.error);
