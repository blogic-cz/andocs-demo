# HTML Outputs

Generated HTML files (reports, exports, prototypes) can be linked directly from a
markdown page. The link opens the file as a **standalone page in a new tab** — no
documentation shell, no embedded block. Use this when you want one index page
listing many generated outputs.

## Generated reports

| Report                                                | What it shows                          |
| ----------------------------------------------------- | -------------------------------------- |
| [Quarterly Summary](html-outputs/reports/quarterly-summary.html) | Volume and handling-time comparison     |
| [Data Quality Check](html-outputs/reports/data-quality-check.html) | Validation results with a live filter |

## How it works

1. Put the HTML files anywhere under a folder marked with `prototype.json`.
2. Link them from markdown with a normal relative link — `[Report](html-outputs/reports/quarterly-summary.html)`.
3. Clicking the link opens `/app/<org>/<project>/<repo>/html-outputs/reports/quarterly-summary.html`
   directly. That URL is shareable — anyone with access to the project opens the same page.

```text
html-outputs/
  prototype.json                   # marks the folder as a prototype root
  shared.css                       # optional shared styles
  reports/
    quarterly-summary.html
    data-quality-check.html
```

## Link vs. embedded block

Both ways read the same files — pick per situation:

| Need                                          | Use                          |
| --------------------------------------------- | ---------------------------- |
| Index page listing many outputs               | Markdown link (this page)    |
| Output shown inline, in context of the text   | `prototype` block            |
| Full-window view, shareable URL               | Markdown link                |

Embedded variant of the same file:

```prototype path=html-outputs/reports/quarterly-summary.html title="Quarterly Summary" height=500

```

> **Note:** Andocs injects Tailwind, Alpine.js and its design tokens into every
> prototype HTML file — also when it is opened standalone. Any `shared.css` and
> `shared.js` from the `prototype.json` roots above the file are applied too.
