# Micro-App Demo

This page demonstrates how to embed external HTML micro-apps using the `andocs-app` block. Micro-apps run inside sandboxed iframes with **Tailwind CSS** and **Alpine.js** injected automatically.

## Demo Structure

```text
micro-app-demo/
  andocs-app.json          # marks this folder as a micro-app root
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

```andocs-app path=micro-app-demo/pages/counter.html

```

## 2. Client Dashboard (Multi-Page)

A more complex micro-app with **navigation between pages** — click a client row to open the detail view, then navigate back. All powered by Alpine.js state management within a single HTML file.

```andocs-app path=micro-app-demo/pages/crm.html

```


## 3. Web Components & Shared Scripts

Native **Custom Elements** with Shadow DOM, slots, and observed attributes — zero build, zero framework.

Component classes are defined **once** in `shared.js` and auto-injected into every page under the same `andocs-app.json` root. No `<script src>` needed — Andocs reads `shared.js` and inlines it as a `<script>` block in `<head>`.

### Shared component definitions (`shared.js`)

Three reusable Web Components live in a single file next to `andocs-app.json`:

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

```andocs-app path=micro-app-demo/pages/web-components.html title="Component Showcase" height=800

```

### Page 2: Team Dashboard

The **same components** reused in a completely different context — team member cards with status badges and notification toggles. Zero code duplication.

```andocs-app path=micro-app-demo/pages/team-dashboard.html title="Team Dashboard" height=800

```

## How It Works
2. **Tailwind CSS** and **Alpine.js** CDNs are injected automatically — no setup needed.
3. **`shared.css`** is discovered from the nearest parent directory that contains `andocs-app.json`. It provides smart-default utility classes (`micro-app-shell`, `micro-app-btn`, `micro-app-section`, etc.) so micro-apps look polished out of the box.
4. **`shared.js`** works the same way — place it next to `andocs-app.json` to share Web Component definitions (or any runtime code) across all pages in that micro-app root.
5. **Andocs design tokens** (`--primary`, `--background`, `--foreground`, `--border`, etc.) are available as CSS custom properties inside the iframe, keeping micro-apps visually consistent with the parent documentation site.
