export interface ThemeState {
    ui: {
        mode: 'list' | 'tiles'; // save to local storage
    },
    domain: {
        dirty: boolean;
        loading: boolean;
        loaded: boolean;
        error: any;
    },
    settingsData: {
        [key: string]: any;
    },
    presets: {
        [key: string]: any;
    },
    settingsSchema: {

    }
};

/**
 * ?({key}={value})*
 *
 *
 * #/theme // settings list
 * #/theme?groups={groups}&preset={preset}
 * #/theme/presets // presets list
 * #/theme/presets/:name // preview preset
 *
 *
 *
 */
