import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import macros from 'unplugin-parcel-macros';

export default defineConfig({
  plugins: [macros.vite(), reactRouter(), tsconfigPaths()],
  build: {
    target: ['es2022'],
    // Lightning CSS produces much a smaller CSS bundle than the default minifier.
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        // Bundle all S2 and style-macro generated CSS into a single bundle instead of code splitting.
        // Because atomic CSS has so much overlap between components, loading all CSS up front results in
        // smaller bundles instead of producing duplication between pages.
        manualChunks(id) {
          if (/macro-(.*)\.css$/.test(id) || /@react-spectrum\/s2\/.*\.css$/.test(id)) {
            return 's2-styles';
          }
        }
      }
    },
  },
});
