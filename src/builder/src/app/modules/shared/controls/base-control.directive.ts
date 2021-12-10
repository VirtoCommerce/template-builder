import { AfterContentInit, Directive, ElementRef, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
// import { FormGroup } from '@angular/forms';
import { BaseControlDescriptor, ControlContext } from '@shared/models';

@Directive()
export class BaseControlDirective<T extends BaseControlDescriptor> implements OnInit, AfterContentInit {

    descriptor!: T;
    context!: ControlContext;
    currentForm!: FormGroup;

    controlValue: any;
    onValueChanged = (_: any) => { };
    onControlTouched = (_: any) => { };


    ngOnInit(): void {
        this.initContent();
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
}
