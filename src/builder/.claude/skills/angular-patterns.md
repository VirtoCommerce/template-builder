# Angular Patterns

## Description
Conventions and patterns used in this Angular 16 page builder project. Use this skill when creating new components, services, store slices, or modifying existing ones to maintain consistency with the codebase.

## Triggers
- Creating or editing Angular components, services
- Adding NgRx store features (actions, effects, reducers, selectors)
- Working with dynamic forms or control descriptors
- Routing changes
- Writing tests

---

## Angular Version & Features

- **Angular 16** with strict mode (`strict: true`, `strictTemplates: true`, `strictInjectionParameters: true`)
- **All components are standalone** — NgModules have been removed (`app.module.ts`, `core.module.ts`, `editor.module.ts`, `theme.module.ts`, `shared.module.ts` deleted)
- **`bootstrapApplication`** entry point with `appConfig` (`app.config.ts`)
- **TypeScript 4.x** with `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`
- **`useDefineForClassFields: false`** — explicitly set in `tsconfig.json` to prevent ES2022 class field semantics from breaking NgRx effects (constructor params would be `undefined` at field initializer time)
- **RxJS 7** — pipe style, no deprecated operators
- Custom webpack via `@angular-builders/custom-webpack` for Tailwind CSS integration

## Component Patterns

### Structure
- Always use separate template/style files (`templateUrl`, `styleUrls`), not inline
- Style language: SCSS
- Prefix: `app-`
- Lifecycle: primarily `OnInit`
- All components are `standalone: true` with explicit `imports: []` array

### Standalone Component Template
```typescript
@Component({
    selector: 'app-edit-section',
    templateUrl: './edit-section.component.html',
    styleUrls: ['./edit-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, AsyncPipe, SomeChildComponent]
})
export class EditSectionComponent implements OnInit {
    private readonly store = inject(Store<BuilderState>);

    viewModel$ = this.store.select(fromState.selectEditSectionContext);

    ngOnInit(): void { }

    onModelChanged(args: ModelChangedEventArgs) {
        this.store.dispatch(actions.sectionChangedAction({ changes: args.changes }));
    }
}
```

**Key conventions:**
- Observables declared at class property level, not in `ngOnInit`
- Event handlers dispatch actions directly, no intermediate logic
- Components are thin — business logic lives in effects/services
- Use `Store<BuilderState>` (or combined state types in root)
- Store observable variables use `$` suffix

### Signals
`toSignal()` is used in some components for simpler template bindings (no `async` pipe needed):
```typescript
readonly isLoading = toSignal(this.store.select(fromState.selectIsLoading));
```

### Input Setters for Change Detection
When inputs need side-effects, use getter/setter pattern:
```typescript
private _sectionModel!: SectionModel;

@Input() get sectionModel(): SectionModel {
    return this._sectionModel;
}
set sectionModel(value: SectionModel) {
    if (this._sectionModel !== value) {
        this._sectionModel = value;
        this.generateForm(true);
    }
}
```

## Dependency Injection

- **`inject()` function only** — constructor injection is NOT used; all dependencies are declared as class fields with `inject()`
- Services use `@Injectable({ providedIn: 'root' })` for singletons

```typescript
export class MyComponent {
    private readonly store = inject(Store<BuilderState>);
    private readonly service = inject(MyService);
}
```

## State Management — NgRx 16

### Bootstrapping
Store is wired in `app.config.ts` (no root NgModule):
```typescript
provideStore({ router: routerReducer }, { initialState: { router: initialRoute } }),
provideRouterStore({ serializer: RouterSerializer }),
provideEffects([RoutingEffects]),
provideState('shared', sharedReducers),
provideEffects([SharedEffects]),
```

Feature state is provided at the route level (lazy-loaded):
```typescript
// editor.routes.ts
{
    path: '',
    component: TemplateEditorHostComponent,
    providers: [
        provideState(EditorFeatureName, editorReducers),
        provideEffects(EFFECTS)
    ],
    data: { module: EditorModuleInfo.name, toolbar: ToolbarHostComponent },
    ...
}
```

### Three-Layer Store Pattern (editor & theme modules)

```
store/
  actions/
    data.ts      — API/data loading actions
    logic.ts     — business logic actions (computed, transformations)
    ui.ts        — UI state actions (panels, filters, selection)
    index.ts     — re-exports all
  selectors/
    data.ts      — raw data selectors
    domain.ts    — derived/computed selectors
    ui.ts        — UI state selectors
    common.ts    — feature state selector, cross-cutting
    index.ts     — re-exports all
  data/
    state.ts     — DataState interface + initialState
    reducers.ts  — data reducers
    effects.ts   — data effects (API calls)
    index.ts
  domain/
    state.ts     — DomainState interface + initialState
    reducers.ts  — domain reducers
    effects.ts   — domain effects (transformations)
    index.ts
  ui/
    state.ts     — UIState interface + initialState
    reducers.ts  — UI reducers
    effects.ts   — UI effects
    index.ts
  state.ts       — combined BuilderState type
  index.ts
```

### Action Naming Convention
Action type format: `[feature name] action description`

```typescript
export const loadTemplateModel = createAction(
    '[template editor] load template model',
    props<{ templateKey: string }>()
);
export const loadTemplateModelSuccess = createAction(
    '[template editor] load template model success',
    props<{ template: TemplateModel, templateKey: string }>()
);
export const loadTemplateModelFails = createAction(
    '[template editor] load template model fails',
    props<{ error: HttpErrorResponse, templateKey: string }>()
);
```

**Pattern:** `action` / `actionSuccess` / `actionFails` triplet for async operations.

### Effects Pattern — CRITICAL: inject() fields BEFORE createEffect fields

Due to `useDefineForClassFields: false` + ES2022 target, all injected services **must be declared as `inject()` fields before any `createEffect()` fields**. If `createEffect()` fields appear first, the services will be `undefined` at initializer time.

```typescript
@Injectable()
export class TemplateEditorDataEffects {
    // ✅ inject() fields FIRST
    private readonly store$ = inject(Store<BuilderState>);
    private readonly actions$ = inject(Actions);
    private readonly schemas = inject(SchemasService);

    // ✅ createEffect() fields AFTER
    loadSchemas$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadTemplateSchemas),
        exhaustMap(() => this.schemas.getSchemas().pipe(
            filter(schemas => !!schemas),
            map(schemas => actions.loadTemplateSchemasSuccess({ schemas })),
            catchError(error => of(actions.loadTemplateSchemasFails({ error })))
        ))
    ));
}
```

- Use `withLatestFrom` to access current state
- Use `filter` to guard side effects
- Use `switchMap` for cancellable, `exhaustMap` for non-cancellable operations
- Return arrays of actions where multiple dispatches needed: `switchMap(() => [action1(), action2()])`

### Reducers
Functional style with `createReducer` and `on`:

```typescript
export const editorDataReducers = createReducer<EditorDataState>(
    initialState,
    on(actions.loadTemplateModelSuccess, (state, { template, templateKey }) => ({
        ...state,
        templates: { ...state.templates, [templateKey]: template }
    })),
);
```

### Selectors
Composed with `createSelector`. Cross-module selectors imported via path aliases:

```typescript
import * as fromRoute from '@shared/routing/selectors';

export const selectCurrentTemplateModel = createSelector(
    selectLoadedTemplates,
    selectTemplateKeyParameter,
    (templates, templateKey) => templateKey ? templates[templateKey] : null
);
```

### RouterSerializer — Exclude Non-Serializable Values
Route `data` often carries component class references (e.g. `toolbar: ToolbarHostComponent`). NgRx deep-freezes state in dev mode; if a class is frozen, Angular's DI can't assign `__NG_ELEMENT_ID__` to it. The `RouterSerializer` filters out functions/classes from route data before storing in NgRx state:

```typescript
const serializableData = Object.fromEntries(
    Object.entries(data).filter(([, v]) => typeof v !== 'function')
);
return { url, params, queryParams, data: serializableData, isEmpty: false };
```

### Shared Module Store
Uses flat structure (no data/domain/ui split) — simpler for cross-cutting state.

## Routing

- **Hash-based** (`withHashLocation()` in `provideRouter`)
- Lazy-loaded features via `loadChildren` returning route arrays (not modules):
  ```typescript
  loadChildren: () => import('./modules/editor/editor.routes').then(r => r.EDITOR_ROUTES)
  ```
- Template identity encoded in **query parameters** (`type`, `path`, `groupId`, `parent`)
- Route `data` carries `module` name, `mode` for effects filtering, and `toolbar` component class
- **Functional guards** — `CanActivateFn` (not class-based `CanActivate`)
- Custom `RouterSerializer` for `@ngrx/router-store`

## Dynamic Controls — ControlsFactory

Controls (form widgets) are registered at startup via `APP_INITIALIZER` to avoid circular dependencies. The old pattern (`ControlsFactory` importing all components directly) caused webpack circular initialization errors.

**Current pattern:**
```typescript
// controls.factory.ts — no component imports
@Injectable({ providedIn: 'root' })
export class ControlsFactory {
    private controls: { [key: string]: Type<BaseControlDirective<any>> } = {};
    register(type: string, component: Type<BaseControlDirective<any>>): void { ... }
    resolve(type: string): Type<any> { return this.controls[type] ?? UnknownEditorComponent; }
}

// controls-register.ts — registered via APP_INITIALIZER in app.config.ts
export function registerControls(): () => void {
    const factory = inject(ControlsFactory);
    return () => {
        factory.register('calendar', CalendarComponent);
        factory.register('checkbox', CheckboxComponent);
        // ... all controls
    };
}
```

**Why this matters:** Barrel files re-exporting components that import each other can create circular webpack module initialization. If `ControlsFactory` imported from a barrel that included components which themselves imported dynamics (which imported `ControlsFactory`), you get `Cannot access 'X' before initialization` at runtime.

## Forms

- **Reactive Forms** only
- Forms are **generated dynamically** from `BaseControlDescriptor[]` arrays via `formsHelpers.generateForm()`
- `DynamicFormComponent` creates a `FormGroup` from descriptors and a `SectionModel`
- Changes propagated via `form.valueChanges` subscription -> `modelChanged` EventEmitter
- No template-driven forms in the codebase

## File Naming Conventions

```
component-name.component.ts / .html / .scss / .spec.ts
service-name.service.ts
model-name.model.ts
descriptor-name.descriptor.ts
feature.routes.ts        — standalone route arrays (replaces *-routes.module.ts)
helpers/ directory for utility functions
```

## Module Organization (Post-Migration)

- NgModules have been deleted: `AppModule`, `CoreModule`, `EditorModule`, `ThemeModule`, `SharedModule`
- App bootstrapped via `bootstrapApplication(AppComponent, appConfig)` in `main.ts`
- Feature state/effects provided at route level with `provideState` / `provideEffects`
- `AppComponent`, all layout components, all feature components are `standalone: true`
- `integration/` — services provided in root, no module
- `models/` — pure TypeScript interfaces

## Error Handling

- HTTP errors caught in effects via `catchError` -> dispatch `*Fails` action with `HttpErrorResponse`
- Toast notifications via `ngx-toastr` (injected `ToastrService`)
- No global error handler or interceptor for errors
- `BuilderHttpClient` supports fallback chains for HTTP requests

## Testing

- **Karma + Jasmine** (no Jest)
- Many tests are disabled with `xdescribe` — limited test coverage
- Test pattern: stub child components with `@Component({ selector, template: '' })`
- Standard `TestBed.configureTestingModule` setup
- Focus tests with `fdescribe`/`fit`
