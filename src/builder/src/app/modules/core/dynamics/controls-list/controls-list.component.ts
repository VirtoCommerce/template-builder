import { DisplayTextDescriptor } from '@models/controls';
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from '@angular/forms';

import { ControlContext } from '@core/models';
import { BaseControlDescriptor } from '@models/controls';

@Component({
    selector: 'app-controls-list',
    templateUrl: './controls-list.component.html',
    styleUrls: ['./controls-list.component.scss']
})
export class ControlsListComponent implements OnInit {

    // @Input() sectionModel!: SectionModel;
    @Input() currentForm!: FormGroup;
    @Input() context!: ControlContext;
    @Input() descriptors!: BaseControlDescriptor[]; // todo: controls order

    ngOnInit(): void { }

    getContent(control: BaseControlDescriptor): string {
        const result = <DisplayTextDescriptor>control;
        return result.content;
    }
}
