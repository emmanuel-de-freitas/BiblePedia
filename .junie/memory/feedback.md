[2026-04-06 01:45] - Updated by Junie
{
    "TYPE": "correction",
    "CATEGORY": "Route nesting correction",
    "EXPECTATION": "Routes under dashboard and bible should be nested under their respective parent folders per fs-routes conventions.",
    "NEW INSTRUCTION": "WHEN defining dashboard or bible routes THEN place them under routes/dashboard and routes/bible with a parent layout module."
}

[2026-04-06 02:36] - Updated by Junie
{
    "TYPE": "correction",
    "CATEGORY": "TypeScript path alias",
    "EXPECTATION": "The import using \"@/components/provider\" should resolve correctly via the project path alias.",
    "NEW INSTRUCTION": "WHEN using \"@/\" imports in apps/web THEN map \"@\" to \"src\" in tsconfig and Vite."
}

