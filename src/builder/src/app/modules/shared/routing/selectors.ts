import { createSelector } from '@ngrx/store';
// import { RouterReducerState, getSelectors } from '@ngrx/router-store';
import { BuilderState } from './state';

// import { appHelpers } from '@core/services';

export const selectFeature = (state: BuilderState) => state.router;


// export const {
//     selectCurrentRoute,   // select the current route
//     selectFragment,       // select the current route fragment
//     selectQueryParams,    // select the current route query params
//     selectQueryParam,     // factory function to select a query param
//     selectRouteParams,    // select the current route params
//     selectRouteParam,     // factory function to select a route param
//     selectRouteData,      // select the current route data
//     selectUrl,            // select the current url
// } = getSelectors();

// function selectQueryParam(paramName) {

//     return createSelector(
//         selectRouterFeature,
//         route => route?.state?.queryParams[paramName]
//     )
// }

// function selectRouteParam(paramName) {
//     return createSelector(
//         selectRouterFeature,
//         route => route?.state?.params[paramName]
//     )
// }

export const selectQueryParams = createSelector(
    selectFeature,
    route => route?.state.queryParams
);

export const selectGroupsParameter = createSelector(
    selectQueryParams,
    queryParams => queryParams && queryParams['groups'] || ''
);

export const selectPresetParameter = createSelector(
    selectQueryParams,
    queryParams => queryParams && queryParams['preset'] || ''
);

export const selectTemplateParameter = createSelector(
    selectQueryParams,
    queryParams => queryParams && queryParams['template'] || ''
);

export const selectPreviewModeParameter = createSelector(
    selectQueryParams,
    queryParams => queryParams && queryParams['preview-mode'] || ''
);

export const isFullscreenPreviewMode = createSelector(
    selectPreviewModeParameter,
    value => value === 'fullscreen'
);

export const isPresetPreviewMode = createSelector(
    selectPresetParameter,
    preset => !!preset
);

export const isEmpty = createSelector(
    selectFeature,
    state => state.state.isEmpty
);

export const selectUrl = createSelector(
    selectFeature,
    route => route?.state.url
);

export const selectPath = createSelector(
    selectUrl,
    url => url?.split('?')[0]
);

// export const getId = createSelector(
//     selectRouteParam('id'),
//     id => appHelpers.getNumber(id));

// export const getTypeId = createSelector(
//     selectRouteParam('typeId'),
//     id => appHelpers.getNumber(id));

// export const getTaskId = createSelector(
//     selectRouteParam('taskId'),
//     id => appHelpers.getNumber(id));

// export const getPage = createSelector(
//     selectQueryParam('page'),
//     page => appHelpers.getNumber(page, 1));

// export const getFilter = createSelector(
//     selectQueryParam('filter'),
//     filter => appHelpers.getNumber(filter)
// );

// export const getAtmId = createSelector(
//     selectQueryParam('atmId'),
//     atmId => appHelpers.getNumber(atmId)
// );

// export const getGroup = createSelector(
//     selectQueryParam('group'),
//     group => appHelpers.getNumber(group)
// );

// export const getQuery = createSelector(
//     selectQueryParam('query'),
//     query => query || null
// );

// export const getRegistratorId = createSelector(
//     selectQueryParam('registratorId'),
//     registratorId => appHelpers.getNumber(registratorId)
// );

// export const getCardNumber = createSelector(
//     selectQueryParam('cardNumber'),
//     cardNumber => cardNumber
// );

// export const getDateStart = createSelector(
//     selectQueryParam('dateStart'),
//     dateStart => dateStart
// );

// export const getDateEnd = createSelector(
//     selectQueryParam('dateEnd'),
//     dateEnd => dateEnd
// );

// export const getEventId = createSelector(
//     selectQueryParam('eventId'),
//     eventId => appHelpers.getNumber(eventId)
// );

// export const getModuleName = createSelector(
//     selectRouterFeature,
//     route => route?.state?.data?.module
// );

// export const getModeName = createSelector(
//     selectRouterFeature,
//     route => route?.state?.data?.mode
// );

// export const getNeedNavigationInsideTheModule = createSelector(
//     selectRouterFeature,
//     route => route?.state?.data?.needNavigationInsideTheModule
// );
