// ── Status Badge ──────────────────────────────────────────────────
// Demonstrates: observed attributes, reactive rendering, Shadow DOM
class StatusBadge extends HTMLElement {
  static observedAttributes = ["status"];

  #shadow;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#render();
  }

  attributeChangedCallback() {
    this.#render();
  }

  #render() {
    const status = this.getAttribute("status") ?? "unknown";
    const colors = {
      active: { bg: "hsl(142 71% 45%)", fg: "#fff" },
      inactive: {
        bg: "var(--muted)",
        fg: "var(--muted-foreground)",
      },
      pending: { bg: "hsl(38 92% 50%)", fg: "#fff" },
    };
    const c = colors[status] ?? colors.inactive;

    this.#shadow.innerHTML = `
        <style>
          :host { display: inline-flex; }
          span {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 5px 5px;
            border-radius: 999px;
            font-size: 0.8125rem;
            font-weight: 600;
            letter-spacing: 0.02em;
            background: ${c.bg};
            color: ${c.fg};
            font-family: var(--font-sans, system-ui, sans-serif);
          }
          .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: currentColor;
            opacity: 0.8;
          }
        </style>
        <span><span class="dot"></span>${status}</span>
      `;
  }
}
customElements.define("status-badge", StatusBadge);

// ── Info Card ─────────────────────────────────────────────────────
// Demonstrates: slots (named + default), Shadow DOM encapsulation
class InfoCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
        <style>
          :host {
            display: block;
            max-width: 360px;
          }
          .card {
            border: 1px solid var(--border);
            border-radius: calc(var(--radius, 6px) * 1.5);
            background: var(--card, #fff);
            overflow: hidden;
          }
          .header {
            padding: 16px 20px 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .header ::slotted(*) {
            font-size: 0.9375rem;
            font-weight: 700;
            color: var(--foreground);
          }
          .body {
            padding: 0 20px 16px;
          }
          .body ::slotted(*) {
            font-size: 0.8125rem;
            color: var(--muted-foreground);
            line-height: 1.6;
          }
          .footer {
            padding: 12px 20px;
            border-top: 1px solid var(--border);
            background: var(--muted);
          }
          .footer ::slotted(*) {
            font-size: 0.75rem;
            color: var(--muted-foreground);
          }
        </style>
        <div class="card">
          <div class="header">
            <slot name="title"></slot>
            <slot name="badge"></slot>
          </div>
          <div class="body">
            <slot></slot>
          </div>
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      `;
  }
}
customElements.define("info-card", InfoCard);

// ── Toggle Switch ─────────────────────────────────────────────────
// Demonstrates: custom events, boolean attributes, interactive state
// DOM is built once; state changes toggle a CSS class so transitions
// actually animate (innerHTML would destroy & recreate elements).
class ToggleSwitch extends HTMLElement {
  static observedAttributes = ["checked", "label"];
  #shadow;
  #track;
  #labelEl;
  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }
  get checked() {
    return this.hasAttribute("checked");
  }
  set checked(val) {
    if (val) this.setAttribute("checked", "");
    else this.removeAttribute("checked");
  }
  connectedCallback() {
    // Build DOM once — never replaced
    this.#shadow.innerHTML = `
      <style>
        :host { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; }
        .track {
          width: 44px;
          height: 24px;
          border-radius: 12px;
          background: var(--muted);
          border: 1px solid var(--border);
          position: relative;
          transition: background 0.25s cubic-bezier(.4,0,.2,1),
                      border-color 0.25s cubic-bezier(.4,0,.2,1),
                      box-shadow 0.25s cubic-bezier(.4,0,.2,1);
        }
        .track.on {
          background: var(--primary);
          border-color: var(--primary);
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 20%, transparent);
        }
        .thumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--muted-foreground);
          transition: transform 0.25s cubic-bezier(.4,0,.2,1),
                      background 0.25s cubic-bezier(.4,0,.2,1),
                      box-shadow 0.25s cubic-bezier(.4,0,.2,1);
        }
        .track.on .thumb {
          transform: translateX(20px);
          background: var(--primary-foreground);
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }
        .label {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--foreground);
          font-family: var(--font-sans, system-ui, sans-serif);
          user-select: none;
        }
      </style>
      <div class="track"><div class="thumb"></div></div>
      <span class="label"></span>
    `;

    this.#track = this.#shadow.querySelector(".track");
    this.#labelEl = this.#shadow.querySelector(".label");

    // Apply initial state
    this.#update();

    // Single click listener on shadow root — survives across updates
    this.#shadow.addEventListener("click", () => {
      this.checked = !this.checked;
      this.dispatchEvent(
        new CustomEvent("toggle", {
          detail: { checked: this.checked },
          bubbles: true,
        })
      );
    });
  }
  attributeChangedCallback() {
    if (this.#track) this.#update();
  }

  #update() {
    this.#track.classList.toggle("on", this.checked);
    const label = this.getAttribute("label") ?? "";
    this.#labelEl.textContent = label;
    this.#labelEl.style.display = label ? "" : "none";
  }
}
customElements.define("toggle-switch", ToggleSwitch);
