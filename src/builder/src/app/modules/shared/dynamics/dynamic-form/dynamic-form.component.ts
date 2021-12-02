import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ControlContext, BaseControlDescriptor, SectionModel } from '@shared/models';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnDestroy {

    private _descriptors: BaseControlDescriptor[] = [];

    @Input() sectionModel!: SectionModel;
    @Input() context!: ControlContext;
    @Input() get descriptors(): BaseControlDescriptor[] {
        return this._descriptors;
    }
    set descriptors(value: BaseControlDescriptor[]) {
        this._descriptors = value;
    }

    form!: FormGroup;

    constructor() { }

    ngOnInit(): void {
        const model = this.sectionModel as any;
        this.form = new FormGroup({
            title: new FormControl(model.title),
            content: new FormControl(model.content)
        });
    }

    ngOnDestroy(): void {
    }

}
