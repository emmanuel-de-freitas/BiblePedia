# BiblePedia Documentation

Documentation site for BiblePedia built with [Mintlify](https://mintlify.com).

## Installation

Install dependencies from the monorepo root:

```bash
bun install
```

## Usage

### Development

Start the local documentation server:

```bash
cd apps/docs
bun run dev
```

The documentation will be available at `http://localhost:3000`

### Validation

Check for errors in your documentation:

```bash
bun run validate
```

### Check for Broken Links

Scan the documentation for broken links:

```bash
bun run broken-links
```

### Accessibility Check

Check for accessibility issues:

```bash
bun run a11y
```

### Export Static Site

Export the documentation as a static site:

```bash
bun run export
```

## Available Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start local development server |
| `bun run validate` | Validate documentation build |
| `bun run broken-links` | Check for broken links |
| `bun run a11y` | Check accessibility |
| `bun run export` | Export static site |
| `bun run format` | Format with Biome |
| `bun run lint` | Lint with Biome |

## Writing Documentation

### Creating a New Page

1. Create a new `.mdx` file in the appropriate directory
2. Add frontmatter with `title` and `description`
3. Add the page to `docs.json` navigation

Example:

```mdx
---
title: "My New Page"
description: "Description of the page"
---

# My New Page

Content goes here...
```

### Adding to Navigation

Edit `docs.json` and add your page to the appropriate group:

```json
{
  "group": "My Group",
  "pages": [
    "path/to/my-page"
  ]
}
```

### Using Components

Mintlify provides built-in components:

```mdx
<Card title="Card Title" icon="icon-name" href="/link">
  Card content
</Card>

<Accordion title="Accordion Title">
  Accordion content
</Accordion>

<Tabs>
  <Tab title="Tab 1">
    Content 1
  </Tab>
  <Tab title="Tab 2">
    Content 2
  </Tab>
</Tabs>

<Steps>
  <Step title="Step 1">
    Step content
  </Step>
</Steps>
```

## File Structure

```
apps/docs/
├── docs.json           # Documentation configuration
├── index.mdx           # Homepage
├── quickstart.mdx      # Quick start guide
├── tech-stack/         # Tech stack documentation
├── desktop/            # Desktop app docs
├── web/                # Web app docs
├── guides/             # How-to guides
└── reference/          # API and configuration reference
```

## Preview Changes

Changes are automatically reloaded in the browser when running `bun run dev`.

## Need Help?

- [Mintlify Documentation](https://mintlify.com/docs)
- [Mintlify Components](https://mintlify.com/docs/components)
- [BiblePedia GitHub](https://github.com/emmanuel-de-freitas/biblepedia)