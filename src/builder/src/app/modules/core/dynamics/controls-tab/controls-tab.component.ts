import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';

import { ControlContext, TabModel, GroupsStateModel } from '@core/models';
import { ControlsListComponent } from '@core/dynamics/controls-list/controls-list.component';
import { ControlsGroupComponent } from '@core/dynamics/controls-group/controls-group.component';

@Component({
    selector: 'app-controls-tab',
    templateUrl: './controls-tab.component.html',
    styleUrls: ['./controls-tab.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor, ReactiveFormsModule, ControlsListComponent, ControlsGroupComponent]
})
export class ControlsTabComponent implements OnInit {

    @Input() tab!: TabModel;
    @Input() state!: GroupsStateModel;
    @Input() currentForm!: UntypedFormGroup;
    @Input() context!: ControlContext;

    ngOnInit(): void {
    }

}
