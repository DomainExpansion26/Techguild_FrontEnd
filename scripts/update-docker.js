import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const CONTAINER_NAME = "techguild_frontend";
const IMAGE_NAME = "techguild-frontend:latest";

function isTruthy(value) {
  return value === "1" || value === "true";
}

function shouldSkip() {
  if (isTruthy(process.env.SKIP_DOCKER_UPDATE)) {
    return "SKIP_DOCKER_UPDATE is set";
  }
  if (isTruthy(process.env.DOCKER_BUILD) || fs.existsSync("/.dockerenv")) {
    return "running inside Docker";
  }
  if (
    process.env.CI ||
    process.env.VERCEL ||
    process.env.RENDER ||
    process.env.GITHUB_ACTIONS
  ) {
    return "running in CI/hosting environment";
  }
  return null;
}

function canRun(cmd, args) {
  const res = spawnSync(cmd, args, { cwd: PROJECT_ROOT, stdio: "ignore" });
  return !res.error && res.status === 0;
}

function isContainerRunning() {
  const res = spawnSync("docker", ["ps", "--format", "{{.Names}}"], {
    cwd: PROJECT_ROOT,
    encoding: "utf8",
  });
  if (res.error || res.status !== 0) return false;
  return res.stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .includes(CONTAINER_NAME);
}

/**
 * Rebuild the Docker image (and recreate the running container if active)
 * automatically after `npm install` or manually via `npm run docker:update`.
 */
function main() {
  const strict = process.argv.includes("--strict");
  const forceUp = process.argv.includes("--up");
  const skipReason = shouldSkip();

  if (skipReason && !strict) {
    console.log(`[docker-update] Skipping (${skipReason}).`);
    return;
  }

  if (!canRun("docker", ["--version"])) {
    const msg = "[docker-update] Docker CLI not found; skipping image update.";
    if (strict) {
      console.error(msg);
      process.exit(1);
    }
    console.log(msg);
    return;
  }

  if (!canRun("docker", ["info"])) {
    const msg =
      "[docker-update] Docker daemon is not running; skipping image update.";
    if (strict) {
      console.error(msg);
      process.exit(1);
    }
    console.log(msg);
    return;
  }

  const hasComposeV2 = canRun("docker", ["compose", "version"]);
  const running = isContainerRunning();

  let cmd = "docker";
  let args;

  if (hasComposeV2) {
    args =
      running || forceUp
        ? ["compose", "up", "-d", "--build"]
        : ["compose", "build"];
  } else {
    args = ["build", "-t", IMAGE_NAME, "."];
  }

  console.log(`[docker-update] Running: ${cmd} ${args.join(" ")}`);
  const result = spawnSync(cmd, args, {
    cwd: PROJECT_ROOT,
    stdio: "inherit",
  });

  if (result.error) {
    console.error(`[docker-update] Failed: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  console.log("[docker-update] Docker image updated successfully.");
}

main();
