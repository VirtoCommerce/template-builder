# Design System

## Description
Styling conventions, theme configuration, and UI component library used in the page builder. Use this skill when creating UI, styling components, or choosing the right Material/Tailwind approach.

## Triggers
- Creating or modifying component styles (SCSS)
- Adding UI elements (buttons, dialogs, forms, icons)
- Working with layout, spacing, responsive design
- Choosing between Tailwind utility classes and SCSS

---

## UI Stack

| Layer | Technology |
|---|---|
| Utility-first CSS | Tailwind CSS 3 (JIT mode) |
| Component library | Angular Material 13 |
| CDK | Drag-drop, Overlay, Clipboard |
| Scrollbars | ngx-perfect-scrollbar |
| Color pickers | ngx-color (Sketch, Twitter variants) |
| File uploads | @iplab/ngx-file-upload |
| Select dropdowns | @ng-select/ng-select |
| Rich text | CKEditor 4 |
| Markdown | Internal ngv-markdown library (EasyMDE) |
| Date picker | @matheo/datepicker |
| Notifications | ngx-toastr |

## Typography

- **Font family:** `'Inter', sans-serif` (set on `body` in `styles.scss`)
- **Custom Material typography:** `mat.define-typography-config($font-family: 'Inter')`

### Font Sizes (SCSS variables in `src/layout/variables.scss`)

| Variable | Value |
|---|---|
| `$default-font-size` | `0.875rem` (14px) |
| `$middle-font-size` | `0.9375rem` (15px) |
| `$small-font-size` | `0.6875rem` (11px) |
| `$icon-size` | `1rem` (16px) |
| `$small-icon-size` | `0.75rem` (12px) |
| `$btn-icon-size` | `0.8125rem` (13px) |

## Color Palette (SCSS variables)

### Text Colors
| Variable | Hex | Usage |
|---|---|---|
| `$heading-color` | `#121212` | Headings |
| `$content-color` | `#202223` | Content text |
| `$text-color` | `#363636` | General text |
| `$controls-text-color` | `#363636` | Dropdowns, toolbar sections |
| `$label-color` | `#646464` | Form labels |
| `$info-color` | `#6D7175` | Info/helper text |
| `$disable-text-color` | `#8C9196` | Disabled text |

### UI Colors
| Variable | Hex | Usage |
|---|---|---|
| `$active-color` | `#1665D8` | Active/selected state |
| `$icons-color` | `#484848` | Icons |
| `$disable-icon-color` | `#8C9196` | Disabled icons |
| `$secondary-element-color` | `rgba(72, 72, 72, 0.48)` | Secondary elements |
| `$hover-color` | `rgba(246, 246, 246, 1)` | Hover backgrounds |

### Form Colors
| Variable | Hex | Usage |
|---|---|---|
| `$form-controls-text-color` | `#202223` | Form input text |
| `$controls-border-color` | `#BABFC3` | Input borders |
| `$border-color` | `#e0e0e0` | General borders |
| `$no-image` | `#BABFC3` | Image placeholder |

## Material Theme

- Base theme: `indigo-pink` prebuilt (imported directly)
- Custom typography override with Inter font
- CDK overlay styles imported
- Material modules used: Checkbox, Menu, Icon, Tabs, Ripple, Slider, Dialog, ProgressBar, ProgressSpinner, SlideToggle

**Note:** The theme colors are NOT customized beyond defaults — the codebase has TODO comments about properly redefining Material palette colors.

## Tailwind CSS Configuration

- **Mode:** JIT
- **Content:** `./src/**/*.html`, `./src/**/*.scss`
- **Plugins:** `@tailwindcss/forms`, `@tailwindcss/typography`
- **No custom theme extensions** — uses default Tailwind values
- Integrated via custom webpack + PostCSS (not Angular's native support)

## Styling Approach

### When to use Tailwind vs SCSS
- **Tailwind** for layout, spacing, positioning (see `@apply` usage in `styles.scss`)
- **SCSS** for component-specific styles, variables, Material overrides
- **SCSS variables** (not CSS custom properties) for the color/typography design tokens

### Global Style Files (`src/layout/`)
| File | Purpose |
|---|---|
| `variables.scss` | Design tokens: colors, font sizes, icon sizes |
| `material-theme.scss` | Material typography + theme setup |
| `external.scss` | Overrides for third-party component styles |
| `toastr.scss` | Toast notification style overrides |
| `controls.scss` | Shared form control styles |
| `dialogs.scss` | Dialog/modal styles |
| `extras.scss` | Misc global utility styles |

### Common Layout Pattern
Overlap panels use a standard Tailwind composition:

```scss
.overlap-panel {
    @apply absolute h-full bg-white inset-y-0 left-8 -right-8 flex flex-col;
}
```

## No Dark Mode
Dark mode is not implemented. The `tailwind.config.js` has `darkMode` commented out.

## No Custom Breakpoints
Uses default Tailwind breakpoints. No custom responsive configuration.

## Angular Material Modules in Use

All imported in `CoreModule`:
- `MatCheckboxModule`, `MatMenuModule`, `MatIconModule`, `MatTabsModule`
- `MatRippleModule`, `MatSliderModule`, `MatDialogModule`
- `MatProgressBarModule`, `MatProgressSpinnerModule`, `MatSlideToggleModule`

CDK modules: `DragDropModule`, `OverlayModule`, `ClipboardModule`
