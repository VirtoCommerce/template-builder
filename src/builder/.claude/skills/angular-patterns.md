# Angular Patterns

## Description
Conventions and patterns used in this Angular 13 page builder project. Use this skill when creating new components, services, store slices, or modifying existing ones to maintain consistency with the codebase.

## Triggers
- Creating or editing Angular components, services, modules
- Adding NgRx store features (actions, effects, reducers, selectors)
- Working with dynamic forms or control descriptors
- Routing changes
- Writing tests

---

## Angular Version & Features

- **Angular 13.3** with strict mode (`strict: true`, `strictTemplates: true`, `strictInjectionParameters: true`)
- **No standalone components** — all components are declared in NgModules
- **TypeScript 4.6** with `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`
- **RxJS 7.4** — use `rxjs/operators` pipe style, no deprecated operators
- Custom webpack via `@angular-builders/custom-webpack` for Tailwind CSS integration

## Component Patterns

### Structure
- Always use separate template/style files (`templateUrl`, `styleUrls`), not inline
- Style language: SCSS (configured in `angular.json` schematics)
- Prefix: `app-` (configured in `angular.json`)
- Lifecycle: primarily `OnInit` and `OnDestroy`

### Store-Connected Components
Components inject `Store<FeatureState>` and declare observables as class properties with `$` suffix:

```typescript
@Component({
    selector: 'app-edit-section',
    templateUrl: './edit-section.component.html',
    styleUrls: ['./edit-section.component.scss'],
})
export class EditSectionComponent implements OnInit {
    viewModel$ = this.store.select(fromState.selectEditSectionContext);
    sectionName$ = this.store.select(fromState.selectCurrentItemName);

    constructor(private store: Store<BuilderState>) { }

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
- Use `Store<BuilderState>` (or combined `Store<SharedState & EditorState & ThemeState>` in root)
- Store variable named `store` or `store$`

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

- **Constructor injection only** — `inject()` function is NOT used in this codebase
- Services use `@Injectable({ providedIn: 'root' })` for singleton services
- Effects also use `providedIn: 'root'`

## State Management — NgRx 13

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

### Effects Pattern
- Inject `Store`, `Actions`, and domain services
- Use `withLatestFrom` to access current state
- Use `filter` to guard side effects
- Use `switchMap` for cancellable, `exhaustMap` for non-cancellable operations
- Return arrays of actions via `switchMap(() => [action1(), action2()])`

```typescript
loadSchemas$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadTemplateSchemas),
    exhaustMap(() => this.schemas.getSchemas().pipe(
        filter(schemas => !!schemas),
        map(schemas => actions.loadTemplateSchemasSuccess({ schemas })),
        catchError(error => of(actions.loadTemplateSchemasFails({ error })))
    ))
));
```

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
import * as fromShared from '@shared/store/selectors';

export const selectCurrentTemplateModel = createSelector(
    selectLoadedTemplates,
    selectTemplateKeyParameter,
    (templates, templateKey) => templateKey ? templates[templateKey] : null
);
```

### Shared Module Store
Uses flat structure (no data/domain/ui split) — simpler for cross-cutting state.

## Routing

- **Hash-based** (`useHash: true`)
- Lazy-loaded features via `loadChildren`
- Template identity encoded in **query parameters** (`type`, `path`, `groupId`, `parent`)
- Path segments encode editor navigation state (section being edited, add panel, settings)
- Route `data` object carries `module` name and `mode` for effects filtering
- Custom `RouterSerializer` for `@ngrx/router-store`

```typescript
{
    path: ':sectionId',
    component: EditSectionComponent,
    data: { module: EditorModuleInfo.name, mode: 'edit-section' }
}
```

## Forms

- **Reactive Forms** only (`ReactiveFormsModule` in CoreModule)
- Forms are **generated dynamically** from `BaseControlDescriptor[]` arrays via `formsHelpers.generateForm()`
- `DynamicFormComponent` creates a `FormGroup` from descriptors and a `SectionModel`
- Changes propagated via `form.valueChanges` subscription -> `modelChanged` EventEmitter
- No template-driven forms in the codebase

## File Naming Conventions

```
component-name.component.ts / .html / .scss / .spec.ts
service-name.service.ts
feature-name.module.ts
feature-name-routes.module.ts
feature-name-services.module.ts (if services need a separate module)
model-name.model.ts
descriptor-name.descriptor.ts
helpers/ directory for utility functions
```

## Module Organization

- Feature modules (`EditorModule`, `ThemeModule`) are lazy-loaded
- `CoreModule` — shared UI components, imported by feature modules
- `SharedModule` — cross-cutting services, store, routing
- `integration/` — no NgModule, just services provided in root
- `models/` — no NgModule, pure TypeScript interfaces
- Components, controls, dialogs exported via barrel `index.ts` arrays (`COMPONENTS`, `CONTROLS`, `DIALOGS`)

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
- Focus tests with `fdescribe`/`fit` (no CLI flag for single-file)

```typescript
@Component({ selector: 'app-controls-tabs', template: '' })
class FakeControlsTabs {
    @Input() attributes!: any;
}

xdescribe('DynamicFormComponent', () => {
    let component: DynamicFormComponent;
    let fixture: ComponentFixture<DynamicFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DynamicFormComponent, FakeControlsTabs]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
```
