# Markdown Basics

Andocs renders standard Markdown with a few extras. This page covers the fundamentals.

## Text Formatting

Regular paragraph text with **bold**, _italic_, ~~strikethrough~~, and `inline code`.

You can combine them: **_bold and italic_**, **`bold code`**.

## Headings

Headings from `#` (h1) through `######` (h6) are supported. Each heading gets an auto-generated anchor link on hover.

### Third-level heading

#### Fourth-level heading

##### Fifth-level heading

###### Sixth-level heading

## Links

- [External link](https://github.com) opens in a new tab
- [Relative link](./code-blocks.md) navigates within the project
- [Anchor link](#text-formatting) scrolls to a section on this page

## Blockquotes

> Blockquotes are styled with a left border and muted text.
>
> They can span multiple paragraphs.

## Images

Images render with rounded corners and max-width constraints:

![Placeholder](https://placehold.co/600x200/e2e8f0/64748b?text=Sample+Image)

## Horizontal Rules

Use `---` to insert a separator:

---

## Frontmatter

Andocs strips YAML frontmatter from the rendered output. You can include metadata like `title`, `description`, or custom fields at the top of any `.md` file:

```yaml
---
title: My Document
description: A brief summary
author: team
---
```

The frontmatter won't appear in the rendered page.
