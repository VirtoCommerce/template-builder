# Project-Specific Knowledge

## Description
Domain logic, platform integration, API patterns, and deployment context for the VirtoCommerce Page Builder Designer. Use this skill when working with platform communication, API integration, template/section editing logic, or understanding how this app fits into the VirtoCommerce ecosystem.

## Triggers
- Working with API calls, HTTP client, config-driven endpoints
- Platform integration (postMessage, BroadcastChannel)
- Template/section/block CRUD operations
- Auth/token management
- Understanding business domain (pages, templates, sections, themes)
- Build/deployment questions

---

## Project Purpose

An **Angular SPA page builder / theme editor** for the VirtoCommerce e-commerce platform. Runs **embedded as an iframe** inside the VC platform admin shell. Allows merchants to:
- Edit page templates by adding/removing/reordering sections and blocks
- Configure section properties via schema-driven dynamic forms
- Preview changes in a live storefront iframe
- Manage theme settings (presets, colors, typography)
- Publish page changes to the storefront

## Domain Model

### Core Entities
- **TemplateEntry** — metadata about a template in the templates list (path, type, groupId, state)
- **TemplateModel** — full template content: `settings` object + `sections` array
- **SectionModel** — a section within a template, has `id`, `type`, properties, and optional `blocks` array
- **SectionSchema** — describes a section's editable properties (`settings: BaseControlDescriptor[]`) and available blocks
- **SchemasList** — collection of schemas: `sections`, `blocks`, `objects`, `shared`
- **BaseControlDescriptor** — schema for a single form control (id, type, label, default, visibility, tab, group)

### Template Key
Templates are identified by a computed key: `type::groupId` or `type::path` (from URL query params).

### Control Types
The dynamic form system supports many control types via descriptors: `text`, `textarea`, `checkbox`, `select`, `color`, `range`, `image`, `images`, `files`, `markdown`, `richtext`, `calendar`, `object`, `array`, and more. Each maps to a component in `core/controls/`.

## Platform Integration Architecture

### Iframe Embedding
This app loads inside an `<iframe>` in the VirtoCommerce platform admin. Communication channels:

1. **postMessage** — bidirectional with parent window and preview iframe
2. **BroadcastChannel** (`vc-module-content-channel`) — communication with VC platform shell

### EventsBusService
Central message router. Messages have a `target` field:
- `target: 'preview'` — forward to preview iframe via `postMessage`
- `target: 'platform'` — forward to platform via `BroadcastPlatformService`

### Preview Iframe
- `live-preview` component manages a storefront preview `<iframe>`
- Builder broadcasts template data on every change
- Preview sends back events: `loaded`, `select`, `hover` (with `source: 'preview'`)

### Auth Flow
- JWT read from `ls.authenticationData` in localStorage (set by VC platform shell)
- `RefreshTokenInterceptor` attaches `Authorization: Bearer` to all API requests
- Silent token refresh via `/connect/token` endpoint before expiry
- Requests queued during token refresh

## Config-Driven HTTP — No Hardcoded URLs

### Config Loading (AppInitializator)
1. Loads `data/settings.json` (or URL from `?configUrl=` query param)
2. Optionally loads overrides from `/api/pagebuilder/settings`
3. Recursively resolves nested config with HTTP requests
4. Config stored in `AppConfig` singleton

### Config Interpolation
Config values support `{{token}}` template syntax. Tokens resolved from context:
- `location.*` — current URL parts (url, params, path, host, protocol)
- `config.*` — other config values
- `settings.*` — loaded settings

### BuilderHttpClient
Custom HTTP client that evaluates `ServerRequestDescriptor` objects:

```typescript
interface ServerRequestDescriptor {
    url: string;           // with {{token}} placeholders
    method?: string;       // GET or POST
    body?: any;            // POST body
    resultPath?: string;   // jsonpath to extract from response
    headers?: object;
}
```

Features:
- LRU cache (100 items) for GET requests
- Fallback chains — array of descriptors tried in sequence
- Response mapping via jsonpath expressions

### Key Config Keys
| Key | Purpose |
|---|---|
| `templatesListUrl` | List available templates |
| `templateUrl` | Load single template |
| `sectionsListUrl` | List available sections |
| `saveTemplates` | Save template changes |
| `settingsDataRequest` | Load theme settings data |
| `settingsSchemaRequest` | Load theme settings schema |
| `saveSettings` | Save theme settings |
| `uploadAssetsRequest` | Upload images/files |
| `publish` / `publishPages` | Publish changes |
| `saveGroupedPage` | Save grouped page |
| `externalPreview` | External preview URL |
| `assetsUrlTemplate` | Asset URL pattern |

## Schema-Driven Dynamic Forms

Sections/blocks are edited via forms generated from schemas:

1. `SectionSchema.settings` → array of `BaseControlDescriptor`
2. `formsHelpers.generateForm(model, descriptors)` → `FormGroup`
3. `DynamicFormComponent` renders the form
4. `controls-tabs` / `controls-group` / `controls-list` organize controls by `tab`/`group` properties
5. Each `descriptor.type` maps to a specific control widget component

### Descriptor Properties
- `id` — property name in the model
- `type` — control widget type
- `tab` / `group` — UI grouping
- `visibility` — JavaScript expression for conditional display
- `default` / `preview` — default and preview values
- `actions` — context menu actions on the control

## External Dependencies

| Dependency | Role |
|---|---|
| CKEditor 4 | Rich text editing (bundled to `external/ckeditor`) |
| EasyMDE (ngv-markdown) | Markdown editing with HTML paste conversion |
| Turndown | HTML-to-Markdown conversion for paste |
| jsonpath | Response data extraction in BuilderHttpClient |
| moment | Date handling in datepicker |
| lodash-es | Utility functions |

## Build & Deployment

- **Build:** `npm run build` — builds internal libraries (`ngv-markdown`, `ngv-datepicker`) first, then the main app. Do NOT run `ng build` directly unless the `dist/` folder already has built library artifacts.
- **Dev server:** `npm start`
- **Output:** `dist/template-builder/` — deployed as part of the .NET module
- **Budget:** 1500KB initial warning, 2MB error
- **The Angular app is embedded inside a C# .NET VirtoCommerce module** at `src/VirtoCommerce.PageBuilderModule.Web/`
- CI via GitHub Actions (`module-ci.yml`): Node 20, builds + packages as NuGet

## Environment Files

- `src/environments/environment.ts` — development
- `src/environments/environment.prod.ts` — production (file replacement in angular.json)

## Demo/Data Files

- `src/data/` — contains `settings.json` (runtime config) and other config files
- `src/demo/` — demo data for development
