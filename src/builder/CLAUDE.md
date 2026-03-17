# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development server
npm start

# Full build (must build libraries first, then app)
npm run build

# Build only the main app (after libraries are already built)
ng build

# Run tests
npm test

# Run a single test file
ng test --include='**/path/to/component.spec.ts'

# Lint
npm run lint
```

> **Important:** The internal libraries (`ngv-markdown`, `ngv-datepicker`) must be built before the main app. The `npm run build` script handles this in the correct order. If you only rebuild the main app, ensure the `dist/` folder already contains built library artifacts.

## Path Aliases

TypeScript path aliases are configured in `tsconfig.json`:

| Alias | Maps to |
|---|---|
| `@app/*` | `src/app/*` |
| `@core/*` | `src/app/modules/core/*` |
| `@shared/*` | `src/app/modules/shared/*` |
| `@editor/*` | `src/app/modules/editor/*` |
| `@theme/*` | `src/app/modules/theme/*` |
| `@integration/*` | `src/app/modules/integration/*` |
| `@models/*` | `src/app/modules/models/*` |

## Architecture

### Module Structure

The app is organized into feature modules under `src/app/modules/`:

- **`core/`** — Foundational services (data, assets, clipboard, modal, notifications, event bus) and reusable UI controls/dialogs. Imported eagerly in `AppModule`.
- **`editor/`** — Template/page editing functionality. Lazy-loaded at route `/pages`. Contains its own store, services, controls, and dialogs.
- **`theme/`** — Theme editor. Lazy-loaded at route `/themes`. Contains its own store, services, and controls.
- **`shared/`** — Components, dialogs, services, and NgRx store slices shared across feature modules (including routing state).
- **`integration/`** — Platform integration helpers and `AppInitializator` service (runs at app startup via `APP_INITIALIZER`).
- **`models/`** — Data model definitions for controls, documents, HTTP, and module configurations.

### Layout

`AppComponent` renders a full-screen flex layout:
- `<app-toolbar>` — top bar
- `<router-outlet>` inside `<app-sidebar>` — left panel (lazy-loads editor or theme children)
- `<app-preview-area>` — right panel (live preview)
- `<app-fullscreen-loader>` — overlay shown during HTTP/editor/theme loading

### State Management (NgRx)

Each major module has its own NgRx store slice. The root store includes `router` state via `@ngrx/router-store`. Global loading state is derived from HTTP, editor, and theme stores and drives the fullscreen loader.

### Custom Webpack & Styling

- Custom webpack config (`webpack.config.js`) processes SCSS with PostCSS (Tailwind CSS + Autoprefixer).
- Tailwind CSS v3 is used alongside Angular Material for UI.
- Internal library `ngv-datepicker` has its own SCSS theme compilation step (`npm run build:datepicker:themes`).

### Internal Libraries (`projects/`)

- **`ngv-markdown`** — Custom markdown editor integration
- **`ngv-datepicker`** — Custom datepicker with prebuilt Sass themes

These are built with `ng-packagr` and resolved from `dist/` in development via tsconfig path aliases.

### Key Third-Party Integrations

- **CKEditor 4** — Rich text editing (assets copied to `dist/external/ckeditor` during build)
- **EasyMDE** — Markdown editing
- **ngx-color** — Color picker
- **@ng-select/ng-select** — Searchable selects
- **ngx-toastr** — Notifications
- **date-fns / moment / chrono-node** — Date handling
- **lodash-es** — Utility functions
- **jsonpath** — JSON querying for template data bindings
