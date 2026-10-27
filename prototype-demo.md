# Prototype Demo

For a stateful Todo walkthrough using Andocs-managed datasets, see the [Managed Datasets guide](managed-datasets.md).

> **🛠️ Want to generate prototypes like these with AI?** Open the Claude app on the **Code** tab, or the Codex app, choose an empty folder, and paste this prompt:
>
> ```text
> Pusť `bunx andocs@latest agent` a postupuj podle jeho pokynů. Udělej mi představení Andocs. Než cokoli vytvoříš, zeptej se mě, co chci vytvořit, a dej mi pár příkladů. Pokud chybí Bun, nainstaluj ho.
> ```
>
> The agent starts the Andocs CLI and follows its instructions. It asks what you want to build, shows a few examples, and guides you to a clickable prototype. See [Start here](README.md#start-here).

This page demonstrates how to embed external HTML prototypes using the `prototype` block. Prototypes run inside sandboxed iframes with **Tailwind CSS** and **Alpine.js** injected automatically.

## Demo Structure

```text
prototype-demo/
  prototype.json          # marks this folder as a prototype root
  shared.css               # smart-default styles (buttons, cards, typography)
  shared.js                # shared Web Component definitions (auto-injected)
  todo/
    prototype.json         # Todo tasks use project scope
    pages/index.html       # shared Todo walkthrough
  pages/
    prototype.json        # Evolu declaration for the Client database only
    stateful-clients.html # CRUD demo using the Andocs data API
  stateless/
    counter.html           # simple interactive counter
    crm.html               # multi-page CRM dashboard with client detail
    web-components.html    # Web Components showcase
    team-dashboard.html    # reuses same components in a different layout
```

## 1. Counter App

A simple counter demonstrating basic Alpine.js reactivity and the smart-default CSS classes.

```prototype path=prototype-demo/stateless/counter.html

```

## 2. Client Dashboard (Multi-Page)

A more complex prototype with **navigation between pages** — click a client row to open the detail view, then navigate back. All powered by Alpine.js state management within a single HTML file.

```prototype path=prototype-demo/stateless/crm.html

```


## 3. Stateful Client Database

Open [Stateful Prototypes](./stateful-prototypes.md) to try the client database and refresh persistence demo.

## 4. Web Components & Shared Scripts

Native **Custom Elements** with Shadow DOM, slots, and observed attributes — zero build, zero framework.

Component classes are defined **once** in `shared.js` and auto-injected into every page under the same `prototype.json` root. No `<script src>` needed — Andocs reads `shared.js` and inlines it as a `<script>` block in `<head>`.

### Shared component definitions (`shared.js`)

Three reusable Web Components live in a single file next to `prototype.json`:

- **`<status-badge status="active">`** — reactive pill with observed attributes
- **`<info-card>`** — card with named slots (`title`, `badge`, `footer`) + default slot
- **`<toggle-switch label="..." checked>`** — animated toggle dispatching `toggle` custom events

```js
// shared.js (simplified)
class StatusBadge extends HTMLElement {
  static observedAttributes = ["status"];
  #shadow;
  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() { this.#render(); }
  attributeChangedCallback() { this.#render(); }
  #render() { /* shadow DOM with status-colored pill */ }
}
customElements.define("status-badge", StatusBadge);
// + InfoCard, ToggleSwitch ...
```

### Page 1: Component Showcase

All three components demonstrated with usage examples — badges, slotted cards, and interactive toggles wired to Alpine.js state.

```prototype path=prototype-demo/stateless/web-components.html title="Component Showcase" height=800

```

### Page 2: Team Dashboard

The **same components** reused in a completely different context — team member cards with status badges and notification toggles. Zero code duplication.

```prototype path=prototype-demo/stateless/team-dashboard.html title="Team Dashboard" height=800

```

## 5. CSS Cascade — Inherited Styles

Prototypes support **CSS cascade**: when a sub-prototype has its own `prototype.json`, it inherits `shared.css` from all parent `prototype.json` roots. Base styles load first, then more specific styles override them.

```text
prototype-demo/
  prototype.json          # root marker
  shared.css               # ← base styles (buttons, cards, typography)
  cascade-demo/
    prototype.json         # sub-prototype marker
    shared.css              # ← adds table & badge styles on top
    pages/
      import-log.html      # gets BOTH shared.css files!
```

The page below uses `.prototype-shell`, `.prototype-title`, `.prototype-btn` from the **parent** `shared.css` and `.cascade-table`, `.cascade-badge` from its **own** `shared.css` — no duplication needed.

```prototype path=prototype-demo/cascade-demo/pages/import-log.html title="Import Log (CSS Cascade)" height=500

```

## How It Works
1. **CSS cascade**: `shared.css` files are collected from ALL `prototype.json` roots walking up the directory tree. Root styles load first, sub-prototype styles load last — so deeper styles can override base styles. No need to duplicate common styles in every sub-prototype.
2. **Tailwind CSS** and **Alpine.js** CDNs are injected automatically — no setup needed.
3. **`shared.css`** provides smart-default utility classes (`prototype-shell`, `prototype-btn`, `prototype-section`, etc.) so prototypes look polished out of the box.
4. **`shared.js`** works the same way — place it next to `prototype.json` to share Web Component definitions (or any runtime code) across all pages in that prototype root.
5. **Andocs design tokens** (`--primary`, `--background`, `--foreground`, `--border`, etc.) are available as CSS custom properties inside the iframe, keeping prototypes visually consistent with the parent documentation site.

---

> **💡 Tip:** Don't write prototypes manually. Paste the prompt from [Start here](README.md#start-here) into your AI coding agent. It will generate all of this for you: `prototype.json`, `shared.css`, `shared.js`, multi-page HTML, Web Components, and the correct markdown syntax.
