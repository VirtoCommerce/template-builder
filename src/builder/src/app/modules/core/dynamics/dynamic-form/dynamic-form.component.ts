import { Component, Input, OnDestroy, OnInit, Output, EventEmitter, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { formsHelpers } from '@core/helpers';
import { ControlContext, ModelChangedEventArgs } from '@core/models';
import { BaseControlDescriptor } from '@models/controls';
import { SectionModel } from '@models/document';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnDestroy {

    private _sectionModel!: SectionModel;
    private _descriptors!: BaseControlDescriptor[];
    private _currentSectionId: string | null = null;
    private _subscription: Subscription | null = null;

    @Input() get sectionModel(): SectionModel {
        return this._sectionModel;
    }
    set sectionModel(value: SectionModel) {
        if (this._sectionModel !== value) {
            this._sectionModel = value;
            this.generateForm();
        }
    }
    @Input() context!: ControlContext;
    @Input() get descriptors(): BaseControlDescriptor[] {
        return this._descriptors;
    }
    set descriptors(value: BaseControlDescriptor[]) {
        if (this._descriptors !== value) {
            this._descriptors = value;
            this.generateForm();
        }
    }
    @Output() modelChanged = new EventEmitter<ModelChangedEventArgs>();

    form: FormGroup | null = null;

    constructor(private cdr: ChangeDetectorRef, private zone: NgZone) { }

    ngOnInit(): void {
        this.generateForm();
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }

    private generateForm() {
        const m = this.sectionModel;
        if (m && !!this.descriptors && (!this.form || (m.id !== this._currentSectionId))) {
            this._currentSectionId = m.id;
            this.form = null;
            this.unsubscribe();
            setTimeout(() => {
                const form = formsHelpers.generateForm(m, this.descriptors);
                const subscription = form.valueChanges.subscribe(value => {
                    this.modelChanged.emit({
                        model: {
                            ...this.sectionModel,
                            ...value
                        },
                        changes: {
                            ...value
                        }
                    });
                });
                this.zone.run(() => {
                    this.form = form;
                    this._subscription = subscription;

                });
            });
            this.cdr.detectChanges(); // todo: here or in a zone cycle?
        }
    }

    private unsubscribe() {
        if (this._subscription !== null) {
            this._subscription.unsubscribe();
            this._subscription = null;
        }
    }
}
