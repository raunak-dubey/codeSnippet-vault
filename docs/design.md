# 📦 Code Snippet Vault — Final Design Specification (MVP)

# 🧭 1. Product Overview

**Code Snippet Vault** is a minimal, high-speed developer tool for storing and retrieving reusable code snippets.

This product is **not a SaaS dashboard**.
It is a **focused utility tool** optimized for:

* ⚡ Fast retrieval (<5 seconds)
* ⚡ Fast creation (<15 seconds)
* 🧠 Low cognitive load
* 🧑‍💻 Developer-first workflows

# 🎯 2. Design Philosophy

## Core Principles

* **Speed over aesthetics**
* **Clarity over features**
* **Density over whitespace**
* **Function over decoration**

## UX Rules

* Everything must be accessible within **1–2 actions**
* No unnecessary navigation layers
* No “dashboard-style” complexity
* Prioritize keyboard-first interactions (future-ready)

## Product Identity

Inspired by:

* Raycast → speed & focus
* GitHub Gist → simplicity
* Linear → clean precision

# 🗺️ 3. Application Structure (Final Sitemap)

```
/auth
  ├── login
  └── register

/dashboard (single primary screen)
  ├── snippet list
  ├── editor
  └── create modal

/settings (minimal)

/logout
```

# 🧱 4. Core Layout (Main Application)

## 🧑‍💻 Dashboard = Single Workspace

### Layout Structure

```
[ Sidebar ] [ Snippet List ] [ Editor ]
```

## 📌 4.1 Sidebar (Left — Minimal)

### Purpose

Navigation only. No clutter.

### Contains

* Logo / App name
* “+ New Snippet” button
* Snippets (active state)

### Optional (deferred)

* Trash

### ❌ Must NOT include

* Analytics
* Shared
* Collections
* Deploy
* Any SaaS-style features

## 📄 4.2 Snippet List (Middle — High Priority)

### Purpose

Fast scanning & retrieval

### Behavior

* Scrollable list
* Instant search filtering
* Click = instant load (no page refresh)

---

### Snippet Item Design

Each item includes:

* Title (primary)
* Language badge
* Last updated time (subtle)

---

### Interaction

Hover:

* Highlight background
* Show quick actions:

  * Copy
  * Edit
  * Delete

Active:

* Slight tonal elevation (no borders)

---

### Density Rule

* Compact spacing (8–12px vertical)
* Optimized for scanning many items quickly

## 🧾 4.3 Editor Panel (Right — Primary Focus)

### Purpose

View + edit code

### Layout

```
Title + Language + Actions (top)
--------------------------------
Code Editor (dominant area)
--------------------------------
Optional metadata (collapsed/hidden)
```

---

### Requirements

* Code editor takes **80–90% width**
* Syntax highlighting (future-ready)
* Monospace font

---

### Top Bar

Contains:

* Snippet title (editable)
* Language tag
* Actions:

  * Copy
  * Save

---

### ❌ Must NOT include

* Analytics tabs
* Versioning UI (MVP)
* Heavy metadata panels

---

### Metadata Handling

* Hidden by default
* Accessible via icon or drawer
* Includes:

  * Description
  * Tags (future)

# ✍️ 5. Create Snippet Flow

## Trigger

* “+ New Snippet” button
* Keyboard shortcut (future)

## UI Pattern

Modal (centered, fast interaction)

## Layout

* Title input
* Language dropdown
* Code editor (large)
* Optional description

## UX Optimization

* Auto-focus on code field
* Allow paste-first workflow
* Minimal required fields

## Actions

* Primary: Create Snippet
* Secondary: Cancel

# 🔍 6. Search System

## Behavior

* Always visible (top of snippet list)
* Real-time filtering (no submit button)

## Search Scope

* Title
* Code content
* Language

## States

* Empty state
* No results state

# ⚡ 7. Key UX Flows

## 🔁 Retrieve Snippet

1. Focus search
2. Type query
3. Click result
4. Copy

⏱ Target: < 5 seconds

## ➕ Create Snippet

1. Click “New Snippet”
2. Paste code
3. Add title
4. Save

⏱ Target: < 15 seconds

# 🎨 8. Visual Design System

## Color System

### Base

* Background: #0a0e14
* Surface Low: #0e141c
* Surface: #121a25
* Surface High: #1a2637

---

### Text

* Primary: #d9e6fd
* Secondary: muted variants

---

### Accent

* Primary: #acc7ff
* Accent: #52b15b

## Rules

### “No-Line Rule”

* No hard borders
* Use tonal contrast for separation

---

### Elevation

* Use layered backgrounds
* Minimal soft shadows only for modals

---

### Density

* Compact layout
* Avoid excessive padding

# 🔤 9. Typography

* UI Font: Inter / Public Sans
* Code Font: JetBrains Mono

## Usage

* Titles: medium weight
* Metadata: small, muted
* Code: monospace only

# 🧩 10. Component System

## Core Components

* Sidebar
* Snippet List
* Snippet Item
* Code Editor
* Modal
* Search Bar
* Action Buttons

## Interaction Rules

* Hover = subtle background shift
* Click = instant response
* No heavy animations

# 🚫 11. Explicit Non-Goals (MVP)

Do NOT implement:

* Analytics dashboards
* Collaboration features
* Snippet sharing
* Version control UI
* Folder systems
* Complex tagging UI

# 🚀 12. Future Enhancements

* Syntax highlighting
* Tags
* Keyboard shortcuts (⌘ K)
* Snippet sharing
* Folder organization
* AI suggestions

# ✅ 13. Final Design Intent

This product should feel like:

> A **fast, quiet, developer tool** — not a SaaS platform

## Experience Goals

* Open app → instantly usable
* Search → instant results
* Copy → 1 click
* Create → frictionless

## Guiding Principle

> If a feature slows the user down, it should not exist.

# 📌 End of Specification
