# Andocs Demo

This folder contains demo documentation showcasing what Andocs can render. Use these files as sample content for the **Andocs Demo** project.

## Start here

You do not need to install anything by hand.

1. Open the Claude app on the **Code** tab, or the Codex app.
2. Choose an empty folder as the project.
3. Paste this prompt:

```text
Pusť `bunx andocs@latest agent` a postupuj podle jeho pokynů. Udělej mi představení Andocs. Než cokoli vytvoříš, zeptej se mě, co chci vytvořit, a dej mi pár příkladů. Pokud chybí Bun, nainstaluj ho.
```

The agent starts the Andocs CLI and follows its instructions. It installs Bun if it is missing. Before it creates anything, it asks what you want to build and shows a few examples. Then it guides you from a need to a clickable prototype.

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

Instead of writing documentation manually, paste the prompt from [Start here](#start-here) into your AI coding agent. It will know all the syntax, conventions, and best practices.

Then just tell your agent what you need:

- *"Create a prototype for a CRM dashboard"*
- *"Add a Mermaid diagram showing the auth flow"*
- *"Write an HTML preview for a loan application form"*

The agent handles the rest — correct block syntax, `prototype.json` configuration, shared CSS/JS, auto-resize boilerplate, and all Andocs-specific features.
