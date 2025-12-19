import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  // Root
  index("routes/entry.tsx"),
  // Windows
  // Dashboard (library, citations, activity, ...)
  layout("routes/dashboard/layout.tsx", [

    /**
     * Dashboard window.
     * To keep separate from other window.
     * This widow initially opens when application starts.
     * Always minimized, never automatically closed.
     */
    ...prefix("dashboard", [
      /** Home - Overview of all books available
       * and reading progress, latest comment edits,
       * and social media activity
      */
      index("routes/dashboard/index.tsx"),
      ...prefix("home", [
        index("routes/dashboard/home/index.tsx"),
        // TODO: Any other routes to implement in the future related to the home screen.
      ]),
      ...prefix("library", [
        index("routes/dashboard/library/index.tsx"),
        // TODO: Any other routes to implement in the future related to the library screen.
      ]),
      ...prefix("citations", [
        index("routes/dashboard/citations/index.tsx"),
        // TODO: Any other routes to implement in the future related to the citations screen.
      ]),
      ...prefix("activity", [
        index("routes/dashboard/activity/index.tsx"),
        // TODO: Any other routes to implement in the future related to the activity screen.
      ]),
    ])
  ]),
  //
] satisfies RouteConfig;
