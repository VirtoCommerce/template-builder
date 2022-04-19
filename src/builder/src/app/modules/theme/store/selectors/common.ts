import { createSelector } from '@ngrx/store'
import { BuilderState } from '../state';

export const selectThemeEditorFeature = (state: BuilderState) => state.themeEditor;

export const selectThemeUIState = createSelector(
    selectThemeEditorFeature,
    state => state.ui
);

export const selectThemeDataState = createSelector(
    selectThemeEditorFeature,
    state => state.data
);

export const selectThemeDomainState = createSelector(
    selectThemeEditorFeature,
    state => state.domain
);


// export const AtmsFeatureName = 'atms';
// import * as routerSelectors from '@navigation/state';

// import { AtmsState } from '../reducers';

// export const selectFeature = createFeatureSelector<AppState, AtmsState>(AtmsFeatureName);

// import { getSettings } from './common';

// import {
//     DisplayFieldDescriptor,
//     ValuesTableDescriptor,
//     ContentElement,
//     SingleOlapDescriptor,
//     SingleOlapRowDescriptor
// } from '@shared/models';


// export const getDetailsSettings = createSelector(
//     getSettings,
//     settings => settings?.details
// );

// export const getCurrentItem = createSelector(
//     selectFeature,
//     state => state.currentItem
// );

// const getTilesContents = createSelector(
//     getDetailsSettings,
//     settings => <ContentElement[]>settings?.tiles?.reduce((result, currentTile) => {
//         const contents = currentTile.content || [];
//         return [...result, ...contents];
//     }, []) || []
// );

// const getTabsContents = createSelector(
//     getDetailsSettings,
//     settings => <ContentElement[]>settings?.tabs?.items?.reduce((result, currentTab) => {
//         const contents = currentTab.content || [];
//         return [...result, ...contents];
//     }, []) || []
// );

// const getAllContents = createSelector(
//     getTilesContents,
//     getTabsContents,
//     (tiles, tabs) => [...tiles, ...tabs]
// );

// const getTables = createSelector(
//     getAllContents,
//     contents => <ValuesTableDescriptor[]>contents.filter(c => c.type === 'table')
// );

// const getSingleOlaps = createSelector(
//     getAllContents,
//     contents => <SingleOlapDescriptor[]>contents.filter(c => c.type === 'single-olap')
// );

// const getAttributesNamesFromTables = createSelector(
//     getTables,
//     tables => <string[]>tables.reduce((result, table) => {
//         const attributes = table.fields?.filter(x => !!x.attribute).map(x => x.attribute) || [];
//         return [...result, ...attributes];
//     }, [])
// );

// const getOlapsRows = createSelector(
//     getSingleOlaps,
//     olaps => <SingleOlapRowDescriptor[]>olaps.reduce((result, olap) => {
//         const rows = olap.rows || [];
//         return [...result, ...rows]
//     }, [])
// );

// const getOlapsCells = createSelector(
//     getOlapsRows,
//     rows => <DisplayFieldDescriptor[]>rows.reduce((result, olap) => {
//         const cells = olap.cells || [];
//         return [...result, ...cells]
//     }, [])
// )

// const getAttributesNamesFromOlaps = createSelector(
//     getOlapsCells,
//     cells => cells.filter(x => !!x.attribute).map(x => x.attribute)
// );

// export const getAttributesNames = createSelector(
//     getAttributesNamesFromTables,
//     getAttributesNamesFromOlaps,
//     (tables, olaps) => [...tables, ...olaps].join(',')
// );

// export const getCurrentItemAttributes = createSelector(
//     selectFeature,
//     state => state.currentItemAttributes
// );

// export const getAtmAttributesAsObject = createSelector(
//     getCurrentItemAttributes,
//     attributes => attributes?.reduce((result, item) => { result[item.alias] = item.value; return result; }, {}) || {}
// );

// export const getBna = createSelector(
//     selectFeature,
//     state => state.bnaInfo
// );

// export const getBnaLoading = createSelector(
//     selectFeature,
//     state => state.bnaLoading
// );

// export const getInventory = createSelector(
//     selectFeature,
//     state => state.inventory
// );

// export const getInventoryLoading = createSelector(
//     selectFeature,
//     state => state.inventoryLoading
// );

// export const getChildrenContentLoading = createSelector(
//     getBnaLoading,
//     getInventoryLoading,
//     (bna, inventory) => !!bna || !!inventory
// );
