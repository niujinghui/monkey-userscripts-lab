import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";
import react from "@vitejs/plugin-react";

// always find the scripts folder relative to this config file.
const SCRIPTS_DIR = path.resolve(__dirname, "scripts");

function listScripts() {
  return fs
    .readdirSync(SCRIPTS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
}

// If this file doesn’t exist, stop immediately and explain why.
function assertFileExists(filePath: string, description: string) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `${description} is missing:\n  ${filePath}`
    );
  }
}

export default defineConfig(async () => {
  const scripts = listScripts();
  const target = process.env.TARGET_USERSCRIPT;

  if (!target) {
    throw new Error(
      `TARGET_USERSCRIPT is required. Available scripts: ${scripts.join(", ")}`
    );
  }

  if (!scripts.includes(target)) {
    throw new Error(
      `Unknown TARGET_USERSCRIPT "${target}". Available: ${scripts.join(", ")}`
    );
  }

  const entry = path.join(SCRIPTS_DIR, target, "main.js");
  const metaPath = path.join(SCRIPTS_DIR, target, "meta.js");

  assertFileExists(entry, "Entry file (main.js)");
  assertFileExists(metaPath, "Metadata file (meta.js)");

  const metaModule = await import(metaPath);
  const meta = metaModule.default;

  return {
    plugins: [
      react(),
      monkey({
        entry,
        userscript: meta,
        build: {
          fileName: () => `${target}.user.js`,
        },
      }),
    ],
    build: {
      sourcemap: true,
      emptyOutDir: false,
    },
  };
});