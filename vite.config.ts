import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: [
      // Backward-compat aliases: old paths → shared/ (more specific must come first)
      { find: "@/components/ui", replacement: path.resolve(__dirname, "./src/shared/ui") },
      { find: "@/components/common", replacement: path.resolve(__dirname, "./src/shared/common") },
      { find: "@/components/design-system", replacement: path.resolve(__dirname, "./src/shared/design-system") },
      { find: "@/hooks", replacement: path.resolve(__dirname, "./src/shared/hooks") },
      { find: "@/lib", replacement: path.resolve(__dirname, "./src/shared/lib") },
      { find: "@/utils", replacement: path.resolve(__dirname, "./src/shared/utils") },
      { find: "@/types", replacement: path.resolve(__dirname, "./src/shared/types") },
      { find: "@/contexts", replacement: path.resolve(__dirname, "./src/shared/contexts") },
      // General alias (must be last)
      { find: "@", replacement: path.resolve(__dirname, "./src") },
    ],
  },
}));
