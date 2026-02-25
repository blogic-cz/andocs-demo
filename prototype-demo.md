# Prototype Demo

> **🛠️ Want to generate prototypes like these with AI?** Install the **andocs** agent skill and let your coding agent create prototypes, HTML previews, diagrams, and documentation automatically.
>
> ```bash
> npx skills add blogic-cz/blogic-marketplace --skill andocs
> ```
>
> The skill works with Claude Code, Cursor, Copilot, Windsurf, and [35+ other agents](https://skills.sh). It teaches your agent the correct `prototype` syntax, `prototype.json` configuration, shared CSS/JS conventions, Web Components patterns, and all Andocs rendering features.
>
> 📖 **Skill source & docs:** [blogic-cz/blogic-marketplace](https://github.com/blogic-cz/blogic-marketplace/tree/main/agent-kit/skills/andocs)

This page demonstrates how to embed external HTML prototypes using the `prototype` block. Prototypes run inside sandboxed iframes with **Tailwind CSS** and **Alpine.js** injected automatically.

## Demo Structure

```text
prototype-demo/
  prototype.json          # marks this folder as a prototype root
  shared.css               # smart-default styles (buttons, cards, typography)
  shared.js                # shared Web Component definitions (auto-injected)
  pages/
    counter.html           # simple interactive counter
    crm.html               # multi-page CRM dashboard with client detail
    web-components.html    # Web Components showcase
    team-dashboard.html    # reuses same components in a different layout
```

## 1. Counter App

A simple counter demonstrating basic Alpine.js reactivity and the smart-default CSS classes.

```prototype path=prototype-demo/pages/counter.html

```

## 2. Client Dashboard (Multi-Page)

A more complex prototype with **navigation between pages** — click a client row to open the detail view, then navigate back. All powered by Alpine.js state management within a single HTML file.

```prototype path=prototype-demo/pages/crm.html

```


## 3. Web Components & Shared Scripts

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

```prototype path=prototype-demo/pages/web-components.html title="Component Showcase" height=800

```

### Page 2: Team Dashboard

The **same components** reused in a completely different context — team member cards with status badges and notification toggles. Zero code duplication.

```prototype path=prototype-demo/pages/team-dashboard.html title="Team Dashboard" height=800

```

## How It Works
2. **Tailwind CSS** and **Alpine.js** CDNs are injected automatically — no setup needed.
3. **`shared.css`** is discovered from the nearest parent directory that contains `prototype.json`. It provides smart-default utility classes (`prototype-shell`, `prototype-btn`, `prototype-section`, etc.) so prototypes look polished out of the box.
4. **`shared.js`** works the same way — place it next to `prototype.json` to share Web Component definitions (or any runtime code) across all pages in that prototype root.
5. **Andocs design tokens** (`--primary`, `--background`, `--foreground`, `--border`, etc.) are available as CSS custom properties inside the iframe, keeping prototypes visually consistent with the parent documentation site.

---

> **💡 Tip:** Don't write prototypes manually — use the **andocs** agent skill! Your AI coding agent will generate all of this for you: `prototype.json`, `shared.css`, `shared.js`, multi-page HTML, Web Components, and the correct markdown syntax.
>
> ```bash
> npx skills add blogic-cz/blogic-marketplace --skill andocs
> ```
