import { GroupsStateModel, TabModel } from '@core/models';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { ControlContext } from '@core/models';
import { BaseControlDescriptor } from '@models/controls';

@Component({
    selector: 'app-controls-tabs',
    templateUrl: './controls-tabs.component.html',
    styleUrls: ['./controls-tabs.component.scss']
})
export class ControlsTabsComponent implements OnInit {

    @Input() currentForm!: UntypedFormGroup;
    @Input() context!: ControlContext;
    @Input() descriptors!: BaseControlDescriptor[];

    groupsState: GroupsStateModel = {};

    tabs: TabModel[] = [];
    hasTabs: boolean = false;
    singleList: boolean = false;

    constructor() { }

    ngOnInit(): void {
        this.groupsState = {};
        const tabs = this.descriptors.reduce((acc, item) => {
            const key = item.tab || '';
            if (!acc[key]) {
                acc[key] = {
                    order: Object.keys(acc).length,
                    groups: {},
                    ungrouped: []
                };
            }
            if (!!item.group) {
                if (!acc[key].groups[item.group]) {
                    acc[key].groups[item.group] = {
                        order: Object.keys(acc[key].groups).length,
                        descriptors: []
                    };
                    this.groupsState[item.group] = { opened: false };
                }
                acc[key].groups[item.group].descriptors.push(item);
            } else {
                acc[key].ungrouped.push(item);
            }
            return acc;
        }, <any>{});

        this.tabs = Object.keys(tabs).map(x => ({
            ...tabs[x],
            label: x,
            groups: Object.keys(tabs[x].groups).map(y => ({
                ...tabs[x].groups[y],
                name: y
            })).sort((a, b) => a.order - b.order) // sort groups
        })).filter(x => x.ungrouped.length || Object.keys(x.groups).length) // hide empty tabs
            .sort((a, b) => !a.label && -1 || a.order - b.order); // default tab is first

        const keys = Object.keys(tabs);
        this.singleList = keys.length === 1 && keys[0] === '';
        this.hasTabs = keys.length > 1 || (keys.length === 1 && keys[0] !== '');
    }
}
