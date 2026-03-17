import { DisplayTextDescriptor } from '@models/controls';
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';

import { ControlContext } from '@core/models';
import { BaseControlDescriptor } from '@models/controls';
import { appHelpers } from '@integration/helpers';
import { ControlHolderComponent } from '@core/dynamics/control-holder.component';

@Component({
    selector: 'app-controls-list',
    templateUrl: './controls-list.component.html',
    styleUrls: ['./controls-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor, ReactiveFormsModule, ControlHolderComponent]
})
export class ControlsListComponent implements OnInit {

    // @Input() sectionModel!: SectionModel;
    @Input() currentForm!: UntypedFormGroup;
    @Input() context!: ControlContext;
    @Input() descriptors!: BaseControlDescriptor[]; // todo: controls order

    ngOnInit(): void { }

    getContent(control: BaseControlDescriptor): string {
        const result = <DisplayTextDescriptor>control;
        return result.content;
    }

    checkVisibility(descriptor: BaseControlDescriptor): boolean {
        if (!!descriptor.visibility && !descriptor.hidden) {
            try {
                const result = appHelpers.evalInContext(descriptor.visibility!, this.context);
                return result;
            } catch (error) {
                console.error(error);
            }
        }
        return !descriptor.hidden;
    }
}
