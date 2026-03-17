import { AfterContentInit, Directive, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { appHelpers } from "@app/modules/integration/helpers";
// import { FormGroup } from '@angular/forms';
import { ControlContext } from '@core/models';
import { BaseControlDescriptor } from '@models/controls';

@Directive({ standalone: true })
export class BaseControlDirective<T extends BaseControlDescriptor> implements OnInit, AfterContentInit, OnDestroy {

    private _descriptor: T | null = null;
    public get descriptor(): T | null {
        return this._descriptor;
    }
    public set descriptor(value: T | null) {
        this._descriptor = value;
        this.descriptorChanged();
    }
    context!: ControlContext;
    currentForm!: UntypedFormGroup;

    @Input() controlValue: any;
    onValueChanged = (value: any) => this.defaultValueChanged(value);
    onControlTouched = (_: any) => { };

    @Output() valueChanged = new EventEmitter<any>();

    ngOnInit(): void {
        this.initContent();
    }

    ngOnDestroy(): void {
        this.destroyContent();
    }

    ngAfterContentInit(): void {
        if (this.descriptor?.autofocus) {
            setTimeout(() => {
                this.setFocus();
            });
        }
    }

    setControlValue(value: any) {
        if (!value && value !== 0 && value !== BigInt(0)) {
            value = null;
        }
        this.controlValue = value;
        this.applyNewValue();
    }

    registerOnValueChanged(fn: (_: any) => void) {
        this.onValueChanged = (value) => {
            this.defaultValueChanged(value);
            fn(value);
        }
    }

    registerOnControlTouched(fn: (_: any) => void) {
        this.onControlTouched = fn;
    }

    onAction(action: { label?: string | undefined; icon?: string | undefined; execute?: string | undefined; }) {
        if (!action.execute) {
            return;
        }
        const result = appHelpers.evalInContext(action.execute, this.context);
        if (result) {
            this.setControlValue(result);
        }
    }

    protected applyNewValue() { }

    protected setFocus() {
        const control = this.getFocusableControl();
        if (control) {
            control.nativeElement.focus();
        }
    }

    protected getFocusableControl(): ElementRef | null {
        return null;
    }

    protected defaultValueChanged(value: any) {
        this.controlValue = value;
        this.valueChanged.emit(value);
    }

    protected initContent() { }
    protected destroyContent() { }
    protected descriptorChanged() { }
}
