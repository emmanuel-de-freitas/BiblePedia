import type {Config} from "@react-router/dev/config";

export default {
   appDirectory: "src/app",
   buildDirectory: "build",
   future: {
      unstable_optimizeDeps: true,
   },
   routeDiscovery: {
      mode: "initial",
   },
   // Config options...
   // Server-side render by default, to enable SPA mode set this to `false`
   ssr: false,
} satisfies Config;
