import { SectionSchema } from '@shared/models';
import { SettingsModel, PresetsModel, SettingsSchemaModel } from '@theme/models';

export interface ThemeDataState {
    settings: SettingsModel | null;
    presets: PresetsModel;
    settingsSchema: SettingsSchemaModel | null
}

export const initialState: ThemeDataState = {
    settings: null,
    presets: {},
    settingsSchema: null
}
