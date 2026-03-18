---
name: Coding patterns and conventions
description: Established patterns and user preferences for this Angular codebase
type: feedback
---

## DI: always inject(), never constructor
Use `inject()` for all dependencies. Never add constructor parameters.

**Why:** Established pattern throughout the codebase after Angular 17 migration.
**How to apply:** Every new or edited component/service/directive uses `inject()`.

## toSignal() for NgRx selectors
Replace `store.select(...) | async` with `toSignal(store.select(...), { initialValue: null })`.
Remove `AsyncPipe` from `imports` array when no more `| async` remain.

**Why:** Cleaner templates, no subscription management, consistent with signals approach.
**How to apply:** Any time a new NgRx selector is added to a component, use `toSignal()`.

## Keep Subject + debounceTime for search/debounce
Do not replace `Subject + debounceTime` with signals. Signals have no built-in debounce.

**Why:** `SearchComponent` pattern discussed explicitly — `toObservable()` bridge would be unnecessary complexity.
**How to apply:** Search/filter inputs that need debounce keep RxJS Subject pattern.

## Self-closing tags in templates
All component tags, `<router-outlet />`, `<ng-content />`, `<ng-template />` without child content must be self-closing.
`<textarea>` stays `<textarea></textarea>`. `<app-root>` in `index.html` stays standard (not an Angular template).

**Why:** Angular 15.1+ supports this, cleaner templates.
**How to apply:** When writing or editing templates, always use self-closing for empty component/directive tags.

## @Input with getter/setter — keep as @Input, not input()
When a setter has side effects (calls generateForm, propagates to children, computes derived state), keep `@Input({ required: true })` with getter/setter. Do not convert to `input()`.

**Why:** `input()` signals are read-only and don't support setter side effects.
**How to apply:** Only convert to `input()` when the input is a plain value with no side effects.

## No empty ngOnInit / ngOnDestroy
Remove lifecycle hooks that have no body. Use `DestroyRef.onDestroy()` for cleanup instead of `ngOnDestroy`.

**Why:** Reduces boilerplate, aligns with Angular 17 patterns.
**How to apply:** Never add an empty `ngOnInit()`. For cleanup, inject `DestroyRef` and call `this.destroyRef.onDestroy(...)`.
