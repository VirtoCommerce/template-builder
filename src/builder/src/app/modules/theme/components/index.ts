import { ThemeEditorHostComponent } from './theme-editor-host/theme-editor-host.component';
import { ThemeEditorComponent } from './theme-editor/theme-editor.component';
import { SettingsPanelComponent } from './settings-panel/settings-panel.component';
import { PresetsPanelComponent } from './presets-panel/presets-panel.component';

// todo: remove it, only for routes in main module
export * from './theme-editor-host/theme-editor-host.component';

export const COMPONENTS = [
    ThemeEditorHostComponent,
    ThemeEditorComponent,
    SettingsPanelComponent,
    PresetsPanelComponent
];
