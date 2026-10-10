# CLAUDE.md — ClaudeWork

## Project Overview

This repository is a workspace for Claude-assisted development tasks related to the **PadreFR** GitHub organisation. It is currently empty and intended to hold future projects, scripts, or experiments developed with Claude Code.

---

## Repository Structure

```
ClaudeWork/
├── CLAUDE.md          # This file
├── hello-world/       # .NET Hello World console app (built by .github/workflows/dotnet-build.yml)
└── frange-coiffeur/   # Client-side appointment booking module for one hair salon (French)
    ├── index.html     # All HTML, CSS and JS; no build step
    └── README.md
```

### frange-coiffeur

- Scope is the client booking module only: service → slot (staff, day, time) → contact details → confirmation, plus "Mes rendez-vous" to view or cancel.
- Open `frange-coiffeur/index.html` directly, or serve it with `python3 -m http.server 8000 --directory frange-coiffeur`.
- No dependencies or build. Fonts load from Google Fonts with system fallbacks.
- Salon settings (hours, staff, services, booking rules) live in the `CONFIG` object at the top of the script.
- Bookings are stored in `localStorage` through the `store` object; `demoAgenda()` fakes existing appointments. Both are the integration points for a real backend.
- Colors are CSS custom properties on `:root`, with dark-theme overrides. Add new colors as tokens, not literals.

---

## Development Workflow

### Branching

- Default branch: `main`
- Feature branches follow the pattern: `<source>/<short-description>-<id>`  
  Example: `claude/add-claude-documentation-mhYGf`

### Getting Started

When adding a new project to this repository:

1. Create a directory for the project at the repo root.
2. Add a `README.md` describing its purpose.
3. Update this `CLAUDE.md` with build commands, conventions, and structure.

---

## Related Repositories

| Repository | Description |
|---|---|
| [padrefr/codex](https://github.com/padrefr/codex) | C# .NET 9 OPC UA client/server demo (see its own `CLAUDE.md`) |
| [padrefr/claudework](https://github.com/padrefr/claudework) | This repository |
