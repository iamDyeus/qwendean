import { FuseV1Options, FuseVersion } from "@electron/fuses";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { VitePlugin } from "@electron-forge/plugin-vite";
import type { ForgeConfig } from "@electron-forge/shared-types";
import path from "node:path";
import fs from "node:fs";

function copyDirSync(src: string, dest: string, ignore: RegExp[] = []) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (ignore.some((r) => r.test(srcPath))) continue;
    if (entry.isSymbolicLink()) {
      // Resolve symlink and copy the real file/dir
      try {
        const real = fs.realpathSync(srcPath);
        const stat = fs.statSync(real);
        if (stat.isDirectory()) copyDirSync(real, destPath, ignore);
        else fs.copyFileSync(real, destPath);
      } catch { /* broken symlink — skip */ }
      continue;
    }
    if (entry.isDirectory()) copyDirSync(srcPath, destPath, ignore);
    else fs.copyFileSync(srcPath, destPath);
  }
}

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    prune: true,
    ignore: (file: string) => {
      if (!file) return false;
      const keep = file.startsWith("/.vite") || file.startsWith("/node_modules");
      return !keep;
    },
    icon: "./images/qwendean",
    extraResource: [
      "resources/toolkit",
      "resources/node.exe",
      "images/qwendean.ico",
    ],
  },
  hooks: {
    prePackage: async () => {
      // Copy toolkit
      const toolkitSrc = path.resolve(__dirname, "..", "toolkit");
      const toolkitDest = path.resolve(__dirname, "resources", "toolkit");
      if (fs.existsSync(toolkitDest)) {
        try {
          fs.rmSync(toolkitDest, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 });
        } catch {
          // On Windows, .node files may be locked; continue — copyDirSync will overwrite
        }
      }
      copyDirSync(toolkitSrc, toolkitDest, [
        /[/\\]\.next([/\\]|$)/,
        /app.builds.\[buildId\].\d+/,
      ]);
    },
    postPackage: async (_config, buildPath) => {
      const toolkitDest = path.resolve(__dirname, "resources", "toolkit");
      if (fs.existsSync(toolkitDest))
        fs.rmSync(toolkitDest, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 });

      // Copy agents directly into packaged output, renaming .venv -> venv to avoid Forge dotfolder stripping
      const agentsSrc = path.resolve(__dirname, "..", "agents");
      const agentsDest = path.join(buildPath.outputPaths[0], "resources", "agents");
      copyDirSync(agentsSrc, agentsDest, [
        /[/\\]__pycache__([/\\]|$)/,
        /[/\\]build([/\\]|$)/,
        /[/\\]dist([/\\]|$)/,
      ]);
      // Rename .venv -> venv so it survives zip extraction
      const dotVenv = path.join(agentsDest, ".venv");
      const venv = path.join(agentsDest, "venv");
      if (fs.existsSync(dotVenv)) fs.renameSync(dotVenv, venv);
    },
  },
  rebuildConfig: {
    extraModules: ["better-sqlite3"],
  },
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ["darwin"]),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "iamDyeus",
          name: "qwendean",
        },
        draft: true,
        prerelease: false,
      },
    },
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new VitePlugin({
      build: [
        {
          entry: "src/main.ts",
          config: "vite.main.config.mts",
          target: "main",
        },
        {
          entry: "src/preload.ts",
          config: "vite.preload.config.mts",
          target: "preload",
        },
      ],
      renderer: [
        {
          name: "main_window",
          config: "vite.renderer.config.mts",
        },
      ],
    }),

    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
