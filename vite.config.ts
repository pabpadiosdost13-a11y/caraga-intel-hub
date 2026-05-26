// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

function tanstackInjectedHeadScriptsCompat(): Plugin {
  const moduleId = "tanstack-start-injected-head-scripts:v";
  const resolvedId = `\0${moduleId}`;

  return {
    name: "tanstack-injected-head-scripts-compat",
    enforce: "pre",
    resolveId(id) {
      if (id === moduleId) {
        return resolvedId;
      }
    },
    load(id) {
      if (id === resolvedId) {
        return "export const injectedHeadScripts = undefined;";
      }
    },
  };
}

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  plugins: [tanstackInjectedHeadScriptsCompat()],
});
