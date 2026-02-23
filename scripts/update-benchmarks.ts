import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { getAllCategories, getCategoryTools, writeTool } from './utils';

interface DockerConfig {
  image: string;
  env?: Record<string, string>;
}

interface PerformanceStats {
  ramUsage?: string;
  dockerImageSize?: string;
}

interface Tool {
  id: string;
  name: string;
  automation?: {
    docker?: DockerConfig;
  };
  performance?: PerformanceStats;
  [key: string]: unknown;
}

function runCommand(command: string): string {
  try {
    return execSync(command, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch (error: unknown) {
    throw new Error(`Command failed: ${command}\n${error instanceof Error ? error.message : String(error)}`);
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function benchmarkTool(image: string, env: Record<string, string> = {}): Promise<{ imageSize: string; ramUsage: string }> {
  // 1. Pull Image
  console.log(`  Pulling ${image}...`);
  runCommand(`docker pull ${image}`);

  // 2. Get Image Size
  const sizeOutput = runCommand(`docker inspect -f "{{ .Size }}" ${image}`);
  const imageSizeBytes = parseInt(sizeOutput, 10);
  const imageSize = formatBytes(imageSizeBytes);

  // 3. Start Container
  const containerName = `foss-bench-${Math.random().toString(36).substring(7)}`;
  const envString = Object.entries(env).map(([k, v]) => `-e ${k}="${v}"`).join(' ');

  console.log(`  Starting container ${containerName}...`);
  runCommand(`docker run -d --name ${containerName} ${envString} ${image}`);

  try {
    // 4. Wait for stabilization
    console.log(`  Waiting 30s for stabilization...`);
    await new Promise(resolve => setTimeout(resolve, 30000));

    // 5. Measure RAM
    const statsOutput = runCommand(`docker stats --no-stream --format "{{.MemUsage}}" ${containerName}`);
    const usedMemRaw = statsOutput.split('/')[0].trim();

    const isRunning = runCommand(`docker inspect -f "{{.State.Running}}" ${containerName}`) === 'true';
    if (!isRunning) {
      throw new Error("Container crashed before measurement.");
    }

    return {
      imageSize,
      ramUsage: usedMemRaw
    };

  } finally {
    // 6. Cleanup
    try {
      runCommand(`docker rm -f ${containerName}`);
    } catch (e) {
      console.error(`  Failed to remove container ${containerName}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
}

async function updateCategory(category: string) {
  const tools = getCategoryTools(category);
  if (tools.length === 0) return;

  console.log(`Processing category ${category}...`);

  for (const toolFile of tools) {
    const tool = toolFile.data as unknown as Tool;
    let updated = false;

    if (tool.automation?.docker?.image) {
      console.log(`Benchmarking ${tool.name}...`);
      try {
        const result = await benchmarkTool(tool.automation.docker.image, tool.automation.docker.env);

        if (!tool.performance) {
          tool.performance = {};
        }

        tool.performance.dockerImageSize = result.imageSize;
        tool.performance.ramUsage = result.ramUsage;

        console.log(`  Result: Size=${result.imageSize}, RAM=${result.ramUsage}`);
        updated = true;
      } catch (error: unknown) {
        console.error(`  Error benchmarking ${tool.name}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    if (updated) {
      writeTool(toolFile.filepath, tool);
      console.log(`Updated ${toolFile.filename}`);
    }
  }
}

async function main() {
  const categories = getAllCategories();

  for (const category of categories) {
    await updateCategory(category);
  }
}

main().catch(console.error);
