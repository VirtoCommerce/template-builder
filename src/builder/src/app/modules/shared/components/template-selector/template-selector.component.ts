import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { MultipageSelectDescriptor } from '@core/models';
import { TemplateEntry } from '@shared/models';

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

    rootTemplates$ = this.store$.select(fromState.selectTemplatesEntriesAsList).pipe(
        map(value => value?.map(x => this.convertTemplateToItem(x)) || [])
    );
    currentTemplate$ = this.store$.select(fromState.selectCurrentTemplateEntry).pipe(
        map(value => !!value ? this.convertTemplateToItem(value) : null)
    );
    currentFilter$ = this.store$.select(fromState.selectCurrentFilter);
    listTitle$ = this.store$.select(fromState.selectRootTemplateTitle);
    childrenItems$ = this.store$.select(fromState.selectChildrenTemplatesEntriesAsList).pipe(
        map(value => value?.map(x => this.convertTemplateToItem(x)) || null)
    );


    constructor(private store$: Store<BuilderState>) { }

    ngOnInit(): void {
    }

    onTemplateSelected(item: MultipageSelectDescriptor) {


        // this.currentTemplate$ = item;
        // if (item.hasChildren) {
        //     this.titleText = item.title;
        //     this.childrenItems$ = this.childrenList;
        //     this.filter = '';
        // }
        if (item.hasChildren) {
            this.store$.dispatch(actions.switchToChildrenTemplates({ template: item.alias }));
        } else {
            this.store$.dispatch(actions.selectTemplate({ template: item.alias }));
        }
    }

    onFilterChanged(value: string) {
        this.store$.dispatch(actions.filterTemplates({ filter: value }));
        // this.filter = value;
        // if (this.childrenItems$) {
        //     this.childrenItems$ = this.filter ? this.childrenList.filter(x => x.title.toLowerCase().includes(value.toLowerCase())) : this.childrenList;
        // } else {
        //     this.rootTemplates$ = this.filter ? this.items.filter(x => x.title.indexOf(value) !== -1 || x.alias.indexOf(value) !== -1) : this.items;
        // }
    }

    onBackClick() {
        this.store$.dispatch(actions.displayRootTemplates());
        // this.childrenItems$ = null;
        // this.filter = '';
        // this.titleText = 'Templates';
    }

    private convertTemplateToItem(value: TemplateEntry): MultipageSelectDescriptor {
        return {
            title: value.name,
            alias: this.generateTemplateAlias(value),
            hasChildren: value.hasChildren
        };
    }

    private generateTemplateAlias(value: TemplateEntry): string {
        return value.alias || (value.type!! + value.path!!);
    }
}
