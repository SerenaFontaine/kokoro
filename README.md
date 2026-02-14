# Kokoro

A warm, documentation-focused Hugo theme with light and dark modes.

## Features

- Sidebar navigation, table of contents, prev/next links
- Client-side search (Ctrl/Cmd+K)
- Syntax highlighting with copy button
- Shortcodes: callouts, badges, cards, buttons
- Light/dark/system theme toggle
- Responsive with mobile sidebar drawer
- No build pipeline — Hugo Pipes only

## Requirements

Hugo 0.115.0+

## Installation

```bash
git submodule add https://github.com/SerenaFontaine/kokoro.git themes/kokoro
```

In your `hugo.toml`:

```toml
theme = "kokoro"

[outputs]
  home = ["HTML", "RSS", "JSON"]
```

The JSON output is required for search.

## Configuration

All options live under `[params]` and have sensible defaults.

| Parameter | Default | Description |
|-----------|---------|-------------|
| `brand.name` | Site title | Header brand name |
| `brand.logo` | — | Logo image path (replaces text) |
| `brand.tagline` | — | Home page tagline |
| `color.defaultMode` | `"system"` | `"system"`, `"light"`, or `"dark"` |
| `docs.section` | `"docs"` | Content section for docs layout |
| `docs.sidebar.enabled` | `true` | Show sidebar |
| `docs.sidebar.collapsible` | `true` | Collapsible sidebar sections |
| `docs.toc.enabled` | `true` | Show table of contents |
| `docs.prevnext` | `true` | Prev/next links in docs |
| `search.enabled` | `true` | Enable search |
| `repo.url` | — | Repo URL for "Edit this page" links |
| `repo.editPath` | `"edit/main"` | Edit link path segment |
| `footer.text` | — | Footer text (supports Markdown) |

## Content Structure

```
content/
  _index.md              # Home page
  about.md               # Standalone page
  docs/
    _index.md
    getting-started/
      _index.md
      installation.md
      configuration.md
    guide/
      _index.md
      shortcodes.md
  blog/
    _index.md
    my-post.md
```

Use `weight` in front matter to control page ordering in docs.

## Shortcodes

### Callout

```
{{< callout type="note" title="Optional title" >}}
Content here.
{{< /callout >}}
```

Types: `note`, `tip`, `warn`, `info`

### Badge

```
{{< badge "New" >}}
```

### Cards

```
{{< cards >}}
Title|/url|Description
Another|/other|Optional description
{{< /cards >}}
```

### Button

```
{{< button url="/docs" text="Get Started" type="primary" >}}
```

Types: `primary`, `secondary`

## Code Blocks

Standard fenced code blocks work. Add a filename with:

````
```go {filename="main.go"}
package main
```
````

A copy button is added automatically.

## License

MIT
