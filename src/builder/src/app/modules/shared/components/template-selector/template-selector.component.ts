import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { MultipageSelectDescriptor } from '@core/models';
import { TemplateEntry } from '@shared/models';

import { BuilderState } from '@shared/store';
import * as fromState from '@shared/store';
import * as actions from '@shared/store/actions';

import { map } from 'rxjs';

@Component({
    selector: 'app-template-selector',
    templateUrl: './template-selector.component.html',
    styleUrls: ['./template-selector.component.scss']
})
export class TemplateSelectorComponent implements OnInit {

    templates$ = this.store$.select(fromState.selectTemplatesEntriesAsList).pipe(
        map(value => value?.map(x => this.convertTemplateToItem(x)) || [])
    );
    currentTemplate$ = this.store$.select(fromState.selectCurrentTemplateEntry).pipe(
        map(value => !!value ? this.convertTemplateToItem(value) : null)
    );

    constructor(private store$: Store<BuilderState>) { }

    ngOnInit(): void {
    }

    onTemplateSelected(item: MultipageSelectDescriptor) {
        this.store$.dispatch(actions.selectTemplate({ template: item.alias }));
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
