import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Since we are running in tsx, we can import types if we want,
// but for simplicity in a script, we can just treat data as any or define a minimal interface locally
// to avoid importing from src which might require tsconfig path mapping setup for tsx.
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

const DATA_DIR = path.join(process.cwd(), 'data');

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
  // Use --network none to prevent external traffic noise if not needed,
  // but some apps might crash without network. Let's stick to default bridge.
  // We strictly limit memory to avoid OOMing the runner if the app goes crazy,
  // but ideally we just want to measure idle usage.
  runCommand(`docker run -d --name ${containerName} ${envString} ${image}`);

  try {
    // 4. Wait for stabilization
    console.log(`  Waiting 30s for stabilization...`);
    await new Promise(resolve => setTimeout(resolve, 30000));

    // 5. Measure RAM
    // docker stats --no-stream --format "{{.MemUsage}}" returns something like "123MiB / 7.7GiB"
    const statsOutput = runCommand(`docker stats --no-stream --format "{{.MemUsage}}" ${containerName}`);
    // Extract the first part (used memory)
    const usedMemRaw = statsOutput.split('/')[0].trim();

    // The output from docker stats is already human readable (e.g., "50.5MiB"),
    // but we might want to normalize it.
    // For now, let's trust docker's formatting but maybe replace MiB with MB for consistency if we want.
    // Actually, let's keep it as is, it's readable.

    // NOTE: Docker stats sometimes returns 0 or empty if the container crashed.
    // Let's verify container is still running.
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

async function main() {
  if (!fs.existsSync(DATA_DIR)) {
    console.error(`Data directory not found: ${DATA_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    console.log(`Processing ${file}...`);

    const content = fs.readFileSync(filePath, 'utf-8');
    const data: Tool[] = JSON.parse(content);
    let updated = false;

    for (const tool of data) {
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
    }

    if (updated) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n'); // Add newline at EOF
      console.log(`Updated ${file}`);
    }
  }
}

main().catch(console.error);
