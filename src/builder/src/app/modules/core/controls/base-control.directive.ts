import { AfterContentInit, Directive, ElementRef, Input, OnInit, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { appHelpers } from "@app/modules/integration/helpers";
// import { FormGroup } from '@angular/forms';
import { ControlContext } from '@core/models';
import { BaseControlDescriptor } from '@models/controls';

@Directive()
export class BaseControlDirective<T extends BaseControlDescriptor> implements OnInit, AfterContentInit, OnDestroy {

    descriptor!: T;
    context!: ControlContext;
    currentForm!: FormGroup;

    controlValue: any;
    onValueChanged = (_: any) => { };
    onControlTouched = (_: any) => { };


    ngOnInit(): void {
        this.initContent();
    }

    ngOnDestroy(): void {
        this.destroyContent();
    }

    ngAfterContentInit(): void {
        if (this.descriptor.autofocus) {
            // child must not change the value of parent properties
            // but focus change the parent form (un)touched property indirectly
            // to avoid the ExpressionChangedAfterItHasBeenCheckedError focus should be changed outside the digest cycle
            setTimeout(() => {
                this.setFocus();
            });
        }
    }

    setControlValue(value: any) {
        if (!value && value !== 0 && value !== BigInt(0)) {
            // https://www.typescriptlang.org/docs/handbook/2/narrowing.html
            // 0
            // NaN
            // "" (the empty string)
            // 0n (the bigint version of zero)
            // null
            // undefined
            value = null;
        }
        this.controlValue = value;
        this.applyNewValue();
    }

    registerOnValueChanged(fn: (_: any) => void) {
        this.onValueChanged = (value) => {
            this.controlValue = value;
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

    protected initContent() { }
    protected destroyContent() { }
}
