import { BuilderConfig } from '@app/models';
import { LocationContext } from '@shared/models';

export interface ConfigState {
    configLoading: boolean;
    configLoaded: boolean;
    location: LocationContext | null;
    config: BuilderConfig | null
}

export const initialState: ConfigState = {
    configLoading: false,
    configLoaded: false,
    location: null,
    config: null
};
