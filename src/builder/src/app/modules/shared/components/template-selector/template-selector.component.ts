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

    defaultTemplate = { title: 'Choose template', type: '', path: '', templateKey: '' };

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
            this.store$.dispatch(actions.switchToChildrenTemplates({ templateKey: item.templateKey }));
        } else {
            this.store$.dispatch(actions.selectTemplate({ templateKey: item.templateKey, templateType: item.type, path: item.path }));
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
            templateKey: this.generateTemplateKey(value.entry),
            type: value.entry.type || '',
            path: value.entry.path!,
            hasChildren: value.entry.hasChildren,
            isDirty: !!value.state?.isDirty
        };
    }

    private generateTemplateKey(value: TemplateEntry): string {
        return value.key || (value.type!! + "::" + value.path!!);
    }
}
