import { SectionSchema } from '@shared/models';
import { SettingsModel, PresetsModel, SettingsSchemaModel } from '@theme/models';

export interface ThemeDomainState {
    settingsLoading: boolean;
    schemaLoading: boolean;
}

export const initialState: ThemeDomainState = {
    settingsLoading: false,
    schemaLoading: false
}
