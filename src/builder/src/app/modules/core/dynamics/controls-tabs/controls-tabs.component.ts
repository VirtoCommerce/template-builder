import { GroupsStateModel } from '@core/models';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControlDescriptor, ControlContext, TabsModel } from '@core/models';

@Component({
    selector: 'app-controls-tabs',
    templateUrl: './controls-tabs.component.html',
    styleUrls: ['./controls-tabs.component.scss']
})
export class ControlsTabsComponent implements OnInit {

    @Input() currentForm!: FormGroup;
    @Input() context!: ControlContext;
    @Input() descriptors!: BaseControlDescriptor[];

    groupsState: GroupsStateModel = {};

    tabs: TabsModel = { };
    hasTabs: boolean = false;
    singleList: boolean = false;

    constructor() { }

    ngOnInit(): void {
        this.groupsState = {};
        const tabs = this.descriptors.reduce((acc, item) => {
            const key = item.tab || '';
            if (!acc[key]) {
                acc[key] = {
                    groups: {},
                    ungrouped: []
                };
            }
            if (!!item.group) {
                if (!acc[key].groups[item.group]) {
                    acc[key].groups[item.group] = [];
                    this.groupsState[item.group] = { opened: false };
                }
                acc[key].groups[item.group].push(item);
            } else {
                acc[key].ungrouped.push(item);
            }
            return acc;
        }, <TabsModel>{});

        this.tabs = tabs;
        const keys = Object.keys(tabs);
        this.singleList = keys.length === 1 && keys[0] === '';
        this.hasTabs = keys.length > 1 || (keys.length === 1 && keys[0] !== '');
    }
}
