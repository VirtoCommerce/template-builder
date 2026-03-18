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

## Angular Patterns (applied throughout the codebase)

> Migration status: Angular 17 complete → Angular 18 in progress

### Dependency Injection
Always use `inject()` function — never constructor injection.
Exception: classes extending framework classes (e.g. `HttpClient`) must call `super(inject(X))`:
```typescript
private readonly store = inject(Store<BuilderState>);
private readonly destroyRef = inject(DestroyRef);

// For subclasses:
private readonly evaluator = inject(EvaluatorService);
constructor() { super(inject(HttpHandler)); }
```

### Component Inputs / Outputs / Queries
```typescript
// Signal-based inputs (use for simple values — no side effects)
readonly label = input.required<string>();
readonly opened = input(false);

// Getter/setter @Input — keep when side effects are needed (e.g. generateForm, propagate to children)
@Input({ required: true }) set descriptor(value: ...) { ... }

// Mutable input (externally bound AND internally mutated) — signal + @Input alias:
readonly controlValue = signal<any>(null);
@Input('controlValue') set controlValueInput(v: any) { this.controlValue.set(v ?? null); }

// Async-fetched input with internal cache — input() + private signal:
readonly actions = input<T[] | null>(null);
private readonly _cachedActions = signal<T[] | null>(null);

// output() replaces @Output() + EventEmitter
readonly onAdd = output<SectionItem>();

// viewChild() replaces @ViewChild
readonly frame = viewChild<ElementRef>('frame');
readonly host = viewChild.required(ControlHostDirective);
```

### Control Flow
Use `@if` / `@for` / `@switch` — never `*ngIf` / `*ngFor` / `[ngSwitch]`:
```html
@if (viewModel(); as vm) { ... }
@for (item of items; track item) { ... }
```

### Signals & NgRx
- `toSignal()` to bridge NgRx selectors → signals (removes `| async` from templates)
- `signal()` for local synchronous state
- Keep `Subject + debounceTime` for time-based streams (e.g. search debounce)
- No `AsyncPipe` — use `toSignal()` or subscribe + signal
```typescript
readonly viewModel = toSignal(this.store.select(selectSomething), { initialValue: null });
// Observable stream → signal:
readonly options = signal<any[]>([]);
// in ngOnInit: concat(...streams).pipe(takeUntilDestroyed(...)).subscribe(v => this.options.set(v));
```

### Lifecycle / Cleanup
Use `takeUntilDestroyed()` for RxJS streams, `DestroyRef.onDestroy()` for imperative cleanup — no `ngOnDestroy`:
```typescript
private readonly destroyRef = inject(DestroyRef);
this.destroyRef.onDestroy(() => clearInterval(this._interval));
someStream$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(...);
```

### Lazy Controls
Heavy controls (text/CKEditor, calendar, color, markdown, files, images) are registered lazily in `ControlsFactory` via dynamic `import()`. Light controls are eager. See `controls-register.ts` and `control-holder.component.ts`.

`ControlHolderComponent` buffers `writeValue` / `registerOnChange` / `registerOnTouched` calls that arrive before the lazy component is created (`_hasPendingValue`, `_pendingOnChange`, `_pendingOnTouched`), then applies them in `createComponent()`.

### @defer
Use `@defer (on viewport; prefetch on idle)` for large visual lists (e.g. add-section items). Not applicable to `ViewContainerRef.createComponent()` patterns.

### Template Style
- Self-closing tags for all components, directives, `<router-outlet />`, `<ng-content />`, `<ng-template />` with no child content
- `<textarea>` and `<app-root>` in `index.html` keep standard closing tags
- No `AsyncPipe` — use `toSignal()` instead
- Guard `[formGroup]="form"` with `@if (form)` when form is initialized asynchronously (e.g. `collection.component.html`)

### Angular Material MDC Style Overrides
MDC components apply non-standard typography (e.g. `letter-spacing: 0.089em`). Override at component level:
```scss
::ng-deep .mdc-tab__text-label {
    font-size: $default-font-size;
    font-weight: 400;
    letter-spacing: normal;
}
// Same pattern for mat-menu-item, mat-button, etc.
```

### ng-scrollbar (ngx-scrollbar v14)
For `<ng-scrollbar>` to contain scroll within itself (not leak to window):
```scss
.parent-container {
    flex: 1 1 0;      // flex-shrink must be 1, not 0
    overflow: hidden;
    ng-scrollbar { height: 100%; }
}
```
API notes: `visibility` type is `'native' | 'hover' | 'visible'` (not `'always'`). All inputs are `InputSignal`. Global config via `provideScrollbarOptions()`.
