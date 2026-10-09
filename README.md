# Andocs Demo

This folder contains demo documentation showcasing what Andocs can render. Use these files as sample content for the **Andocs Demo** project.

## Start here

You do not need to install anything by hand.

1. Open the Claude app on the **Code** tab, or the Codex app.
2. Choose an empty folder as the project.
3. Paste this prompt:

```text
Nainstaluj mi skill https://github.com/blogic-cz/blogic-marketplace/tree/main/template-ts/skills/andocs a udělej mi představení Andocs.
```

The agent installs the **andocs** skill, asks where to work, and guides you from a need to a clickable prototype.

To install the skill without the introduction, run `npx skills add blogic-cz/blogic-marketplace --skill andocs`. It works with Claude Code, Cursor, Copilot, Windsurf, and [other agents](https://skills.sh). Skill source: [blogic-cz/blogic-marketplace](https://github.com/blogic-cz/blogic-marketplace/tree/main/template-ts/skills/andocs).

## Contents

| File                                    | Feature                                                |
| --------------------------------------- | ------------------------------------------------------ |
| [Markdown Basics](markdown-basics.md)   | Headings, lists, blockquotes, links, images            |
| [Code Blocks](code-blocks.md)           | Syntax highlighting for multiple languages             |
| [Mermaid Diagrams](mermaid-diagrams.md) | Flowcharts, sequence diagrams, ER diagrams, pie charts |
| [Math Expressions](math-expressions.md) | Block LaTeX formulas via KaTeX                         |
| [Tables and Lists](tables-and-lists.md) | Markdown tables, task lists, nested lists              |
| [HTML Preview](html-preview-demo.md)    | Interactive HTML prototypes in sandboxed iframes       |
| [Prototype Demo](prototype-demo.md)     | External HTML prototypes via `prototype` blocks        |
| [Managed Datasets](managed-datasets.md) | Todo CRUD, shared task scope, and dataset demo flow      |
| [HTML Outputs](html-outputs.md)         | Direct links opening HTML files as standalone pages    |
| [BPMN Diagrams](bpmn-diagrams.md)       | Embedded and referenced BPMN diagrams                  |
| [Local Images](local-images.md)         | Relative image paths from local folders                |
| [Nested Link Repro](nested-link-repro/guide-one.md) | Generic nested markdown link reproduction               |

## How to use

1. Create a new project in Andocs (e.g. "Andocs Demo")
2. Connect a GitHub repository containing these files
3. Browse the rendered documentation to see each feature in action

## Generate with AI

Instead of writing documentation manually, use the **andocs** agent skill. Your AI coding agent will know all the syntax, conventions, and best practices:

```bash
npx skills add blogic-cz/blogic-marketplace --skill andocs
```

Then just tell your agent what you need:

- *"Create a prototype for a CRM dashboard"*
- *"Add a Mermaid diagram showing the auth flow"*
- *"Write an HTML preview for a loan application form"*

The agent handles the rest — correct block syntax, `prototype.json` configuration, shared CSS/JS, auto-resize boilerplate, and all Andocs-specific features.
