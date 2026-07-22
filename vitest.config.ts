import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  resolve: { alias: { "@": `${root}src` } },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
      include: [
        "src/lib/config/**/*.ts",
        "src/lib/content/**/*.ts",
        "src/lib/i18n/**/*.ts",
        "src/lib/security/**/*.ts"
      ],
      thresholds: { statements: 80, branches: 75, functions: 80, lines: 80 }
    }
  }
});
