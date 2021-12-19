import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DEFAULT_BUILDER_SETTIGNS_PATH } from '@app/constants';

import { ConfigState } from './config.state';

export const ConfigFeatureName = 'config';

console.log(ConfigFeatureName);

const selectFeature = createFeatureSelector<ConfigState>(ConfigFeatureName);

const getUrlData = createSelector(
    selectFeature,
    state => state.location
);

const getUrlParameters = createSelector(
    getUrlData,
    location => location?.params || null
);

export const getConfigUrl = createSelector(
    getUrlParameters,
    parameters => parameters?.configUrl || DEFAULT_BUILDER_SETTIGNS_PATH
);
