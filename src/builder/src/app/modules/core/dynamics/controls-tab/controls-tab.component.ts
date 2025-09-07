import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { ControlContext, TabModel, GroupsStateModel } from '@core/models';

@Component({
    selector: 'app-controls-tab',
    templateUrl: './controls-tab.component.html',
    styleUrls: ['./controls-tab.component.scss']
})
export class ControlsTabComponent implements OnInit {

    @Input() tab!: TabModel;
    @Input() state!: GroupsStateModel;
    @Input() currentForm!: UntypedFormGroup;
    @Input() context!: ControlContext;

    constructor() { }

    ngOnInit(): void {
    }

}
