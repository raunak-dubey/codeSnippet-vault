# UI/UX Design System — Code Snippet Vault

## 1. Design Intent

The product is designed as a **high-speed developer utility** focused on one primary action:

> Quickly find and copy code.

All design decisions must optimize for:

* Fast retrieval (<5 seconds)
* Instant copy interaction (1 click)
* Minimal cognitive load

## 2. Design Philosophy

### Core Principles

* Speed over aesthetics
* Clarity over features
* Function over decoration
* Consistency over creativity

---

### UX Rules

* Primary action must always be visible (Copy)
* Everything accessible within 1–2 actions
* No unnecessary navigation layers
* Avoid context switching

## 3. Layout System

### 3.0 Dashboard Layout

```
[ Snippet List ] [ Editor ]
```

---

### Layout Intent

* Snippet List = **primary (discovery + selection)**
* Editor = **secondary (view + edit)**

This layout prioritizes **scan → select → copy workflow**.

---

### Width Distribution

* Snippet List: 35–40%
* Editor: 60–65%

## 3.1 Snippet List

### Purpose

Fast scanning and instant access to snippets.

---

### Behavior

* Scrollable list
* Real-time search filtering
* Instant selection (no page reload)

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
* Show actions:

  * Copy (primary)
  * Edit
  * Delete

---

### Primary UX Rule

> Copy must be possible directly from the list without opening the editor.

---

### Density Rule

* Compact spacing (8–12px)
* Optimized for high information density

## 3.2 Editor Panel

### Purpose

View and edit code when needed.

---

### Layout

```
Title + programmingLanguage + Actions
-------------------------
Code Editor
-------------------------
Metadata (optional)
```

---

### Constraints

* Code editor dominates visual space
* Metadata hidden by default
* Minimal UI chrome

---

### Top Bar Actions

* Copy (primary)
* Save

---

### Rule

> Editor must never slow down the copy workflow.

## 4. Interaction Patterns

### Create Snippet (UI)

* Trigger: button
* Pattern: modal

---

### Layout

* Title input
* programmingLanguage select
* Code editor
* Optional description

---

### UX Rules

* Auto-focus on code field
* Allow paste-first workflow
* Minimal required fields

---

### Search (UI Behavior)

* Always visible
* Real-time filtering
* No submit button

## 5. Copy Experience (Critical)

### Requirements

* Copy action must be available:

  * In snippet list (hover)
  * In editor (top bar)

---

### Feedback

* Instant visual confirmation (toast or icon change)
* No blocking UI

---

### Performance

* Copy must feel instantaneous (<100ms)

## 6. Visual System

### Design Direction

* Dark-first UI
* Minimal and modern
* Focus on readability

---

### Colors

* Background: #0a0e14
* Surface: #121a25
* Elevated Surface: #1a2637

---

### Text

* Primary: #d9e6fd
* Secondary: muted variants

---

### Accent

* Primary: #acc7ff
* Success (copy feedback): #52b15b

---

### Rules

* No hard borders
* Use contrast for separation
* Minimal shadows only for modals

---

## 7. Typography

* UI Font: Inter / Public Sans
* Code Font: JetBrains Mono

---

### Usage

* Titles: medium weight
* Metadata: small and muted
* Code: monospace only

## 8. Component System

### Core Components

* Snippet List
* Snippet Item
* Code Editor
* Modal
* Search Bar
* Action Buttons

---

### Interaction Rules

* Hover = subtle feedback
* Click = instant response
* Avoid heavy animations

## 9. Explicit Non-Goals

Do NOT include:

* Analytics dashboards
* Collaboration features
* Snippet sharing
* Version control UI
* Complex tagging systems

## 10. Design Intent Summary

The product should feel like:

> A fast, minimal developer tool focused on instant code retrieval and copying.

### Guiding Principle

If a feature slows down finding or copying code, it should not exist.
