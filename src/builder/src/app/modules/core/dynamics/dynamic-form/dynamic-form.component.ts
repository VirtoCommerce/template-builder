import { Component, DestroyRef, Input, OnInit, Output, EventEmitter, ChangeDetectorRef, NgZone, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { formsHelpers } from '@core/helpers';
import { ControlContext, ModelChangedEventArgs } from '@core/models';
import { BaseControlDescriptor } from '@models/controls';
import { SectionModel } from '@models/document';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

    private readonly destroyRef = inject(DestroyRef);
    private readonly formReset$ = new Subject<void>();

    private _sectionModel!: SectionModel;
    private _descriptors!: BaseControlDescriptor[];
    private _currentSectionId: string | null = null;
    private _currentSection: object | null = null;

    @Input() get sectionModel(): SectionModel {
        return this._sectionModel;
    }
    set sectionModel(value: SectionModel) {
        if (this._sectionModel !== value) {
            this._sectionModel = value;
            this.generateForm(true);
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

    form: UntypedFormGroup | null = null;

    constructor(private cdr: ChangeDetectorRef, private zone: NgZone) { }

    ngOnInit(): void {
        this.generateForm();
    }

    private generateForm(modelChanged: boolean = false) {
        const m = this.sectionModel;
        if (m && !!this.descriptors && (!this.form || m.id !== this._currentSectionId)) {
            this._currentSectionId = m.id;
            this.form = null;
            this.formReset$.next();
            setTimeout(() => {
                const form = formsHelpers.generateForm(m, this.descriptors);
                form.valueChanges.pipe(
                    takeUntilDestroyed(this.destroyRef)
                ).subscribe(value => {
                    this.modelChanged.emit({
                        model: { ...this.sectionModel, ...value },
                        changes: { ...value }
                    });
                });
                this.zone.run(() => {
                    this.form = form;
                    this.cdr.detectChanges(); // todo: here or out of a zone cycle?
                });
            });
        } else if (m && !!this.descriptors && this.form && modelChanged) {
            if (!this.equalsModels(m, this._currentSection)) {
                this._currentSection = m;
                this.form.patchValue(m);
            }
        }
    }

    private equalsModels(a: any, b: any): boolean {
        return !!a && !!b && JSON.stringify(a) === JSON.stringify(b);
    }
}
