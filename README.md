# Andocs Demo

This folder contains demo documentation showcasing what Andocs can render. Use these files as sample content for the **Andocs Demo** project.

> **🛠️ AI Agent Skill available!** Install the **andocs** skill to let your coding agent generate documentation, prototypes, diagrams, and HTML previews automatically:
>
> ```bash
> npx skills add blogic-cz/blogic-marketplace --skill andocs
> ```
>
> Works with Claude Code, Cursor, Copilot, Windsurf, and [35+ other agents](https://skills.sh). The skill teaches your agent the correct syntax for all Andocs features — `prototype` blocks, `html-preview`, Mermaid diagrams, math formulas, Web Components, and more.
>
> 📖 **Skill source & docs:** [blogic-cz/blogic-marketplace](https://github.com/blogic-cz/blogic-marketplace/tree/main/agent-kit/skills/andocs)

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
