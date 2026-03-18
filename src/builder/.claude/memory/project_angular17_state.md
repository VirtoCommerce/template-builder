---
name: Angular 17 migration state
description: Which Angular 17 features have been applied to the codebase and what is deferred
type: project
---

## Completed

- **Package upgrade** — All packages updated to Angular 17, NgRx 17, custom-webpack 17, TypeScript ~5.4.5
- **New control flow** — `@if` / `@for` / `@switch` applied everywhere, `*ngIf` / `*ngFor` removed
- **Standalone Material imports** — Module-level imports (`MatButtonModule` etc.) replaced with standalone component imports (`MatButton` etc.)
- **`inject()` pattern** — All components and dialogs use `inject()`, no constructor injection
- **`input()` / `output()` / `viewChild()`** — Applied where compatible. Getter/setter `@Input` kept where side effects are needed
- **`@Input({ required: true })`** — Applied to required getter/setter inputs
- **`takeUntilDestroyed()`** — Replaces manual unsubscribe / ngOnDestroy for RxJS streams
- **`DestroyRef.onDestroy()`** — Replaces `ngOnDestroy` for imperative cleanup (e.g. clearInterval)
- **Lazy controls** — Heavy controls (text/CKEditor, calendar, color, markdown, files, images) registered lazily via `ControlsFactory.registerLazy()` + dynamic `import()`. `ControlHolderComponent` handles both sync and async resolution
- **`@defer` blocks** — Applied to add-section group/item lists (viewport trigger + idle prefetch)
- **`signal()` for local state** — `LivePreviewComponent`: replaced BehaviorSubject with `signal(false)` + pending queue
- **`toSignal()` for NgRx** — Applied to all components with NgRx selectors: removes `| async`, drops `AsyncPipe` from imports. Affected: template-selector, presets-panel, theme-editor, toolbar-host (theme+editor), and ~10 others
- **Self-closing tags** — All component tags, `<router-outlet />`, `<ng-content />`, `<ng-template />` with no child content use self-closing syntax throughout all templates
- **Empty `ngOnInit` removed** — All empty lifecycle hooks cleaned up

## Deferred / Not Applied

- **Untyped Forms migration** — 36 `UntypedFormGroup` / `UntypedFormControl` instances, kept as-is
- **Sass `if-function` deprecation** — SCSS warnings deferred
- **`SearchComponent` Subject** — Intentionally kept as `Subject + debounceTime`; signals have no built-in debounce
- **`actions-dropdown` layout issue** — Visual/font issue noted, not yet fixed

**Why:** Progressive modernization approach — apply non-breaking changes first, keep complex form migrations for a dedicated pass.
**How to apply:** When touching any component, assume Angular 17 patterns are the standard. Do not reintroduce `ngOnInit` empty stubs, `AsyncPipe`, constructor injection, or `*ngIf`/`*ngFor`.
