import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ControlContext, BaseControlDescriptor, TabModel, GroupsStateModel } from '@core/models';

@Component({
    selector: 'app-controls-tab',
    templateUrl: './controls-tab.component.html',
    styleUrls: ['./controls-tab.component.scss']
})
export class ControlsTabComponent implements OnInit {

    @Input() tab!: TabModel;
    @Input() state!: GroupsStateModel;
    @Input() currentForm!: FormGroup;
    @Input() context!: ControlContext;

    constructor() { }

    ngOnInit(): void {
    }

}
