import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { MultipageSelectDescriptor } from '@core/models';
import { TemplateEntryState, TemplateEntry } from '@shared/models';

import { BuilderState } from '@shared/store';
import * as fromState from '@shared/store';
import * as actions from '@shared/store/actions';

import { map, of } from 'rxjs';

@Component({
    selector: 'app-template-selector',
    templateUrl: './template-selector.component.html',
    styleUrls: ['./template-selector.component.scss']
})
export class TemplateSelectorComponent implements OnInit {

    defaultTemplate = { title: 'Choose template', alias: '' };

    rootTemplates$ = this.store$.select(fromState.selectTemplatesEntriesWithState).pipe(
        map(value => value?.map(x => this.convertTemplateToItem(x)) || [])
    );
    currentTemplate$ = this.store$.select(fromState.selectCurrentTemplateEntry).pipe(
        map(value => !!value ? this.convertTemplateToItem({ entry: value, state: null }) : null)
    );
    currentFilter$ = this.store$.select(fromState.selectCurrentFilter);
    listTitle$ = this.store$.select(fromState.selectRootTemplateTitle);
    childrenItems$ = this.store$.select(fromState.selectCurrentChildrenTemplatesEntriesWithState).pipe(
        map(value => value?.map(x => this.convertTemplateToItem(x)) || null)
    );


    constructor(private store$: Store<BuilderState>) { }

    ngOnInit(): void {
    }

    onTemplateSelected(item: MultipageSelectDescriptor) {
        if (item.hasChildren) {
            this.store$.dispatch(actions.switchToChildrenTemplates({ template: item.alias }));
        } else {
            this.store$.dispatch(actions.selectTemplate({ template: item.alias }));
        }
    }

    onFilterChanged(value: string) {
        this.store$.dispatch(actions.filterTemplates({ filter: value }));
    }

    onBackClick() {
        this.store$.dispatch(actions.displayRootTemplates());
    }

    private convertTemplateToItem(value: { entry: TemplateEntry, state: TemplateEntryState | null }): MultipageSelectDescriptor {
        return {
            title: value.entry.name,
            alias: this.generateTemplateAlias(value.entry),
            hasChildren: value.entry.hasChildren,
            isDirty: !!value.state?.isDirty
        };
    }

    private generateTemplateAlias(value: TemplateEntry): string {
        return value.alias || (value.type!! + value.path!!);
    }
}
