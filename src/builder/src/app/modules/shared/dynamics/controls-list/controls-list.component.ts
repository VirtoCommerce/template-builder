import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from '@angular/forms';

import { ControlContext, SectionModel, BaseControlDescriptor } from '@shared/models';

@Component({
    selector: 'app-controls-list',
    templateUrl: './controls-list.component.html',
    styleUrls: ['./controls-list.component.scss']
})
export class ControlsListComponent implements OnInit {

    // @Input() sectionModel!: SectionModel;
    @Input() currentForm!: FormGroup;
    @Input() context!: ControlContext;
    @Input() descriptors!: BaseControlDescriptor[];

    ngOnInit(): void { }
}
