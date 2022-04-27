import * as routerSelectors from '@shared/routing'

import * as data from './data';
import * as ui from './ui';
import * as domain from './domain';

export interface ThemeState {
    ui: ui.ThemeUIState;
    data: data.ThemeDataState;
    domain: domain.ThemeDomainState
};

export interface BuilderState extends routerSelectors.BuilderState {
    themeEditor: ThemeState
}

// export interface ThemeState {
//     ui: {
//         mode: 'list' | 'tiles'; // save to local storage
//     },
//     domain: {
//         dirty: boolean;
//         loading: boolean;
//         loaded: boolean;
//         error: any;
//     },
//     settingsData: {
//         [key: string]: any;
//     },
//     presets: {
//         [key: string]: any;
//     },
//     settingsSchema: {

//     }
// };

/**
 * ?({key}={value})*
 *
 *
 * #/theme // settings list
 * #/theme?groups={groups}&preset={preset}
 * #/theme/presets // presets list
 *
 *
 *
 */
