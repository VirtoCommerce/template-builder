import {
    Component,
    Input,
    OnInit,
    ViewChild,
    forwardRef,
    ChangeDetectionStrategy,
    // HostBinding,
    ChangeDetectorRef,
    inject
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, UntypedFormGroup } from '@angular/forms';

import { ControlHostDirective } from './control-host.directive';
import { ControlsFactory } from '@core/controls/controls.factory'; import { BaseControlDirective } from '@core/controls/base-control.directive';

import { ControlContext } from '@core/models';
import { BaseControlDescriptor } from '@models/controls';

@Component({
    selector: 'app-control-holder',
    template: `<ng-template appControlHost></ng-template>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlHolderComponent),
        multi: true,
    }],
    styleUrls: ['./control-holder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ControlHostDirective]
})
export class ControlHolderComponent implements OnInit, ControlValueAccessor {

    private readonly controlsFactory = inject(ControlsFactory);
    private readonly cdr = inject(ChangeDetectorRef);


    private component!: BaseControlDirective<BaseControlDescriptor>;
    private _context!: ControlContext;
    private _currentForm!: UntypedFormGroup;

    @ViewChild(ControlHostDirective, { static: true }) host!: ControlHostDirective;

    @Input() descriptor!: BaseControlDescriptor;
    @Input() get currentForm(): UntypedFormGroup {
        return this._currentForm;
    }
    set currentForm(value: UntypedFormGroup) {
        this._currentForm = value;
        if (this.component) {
            this.component.currentForm = value;
            this.cdr.detectChanges();
        }
    }

    @Input() get context(): ControlContext {
        return this._context;
    }
    set context(value: ControlContext) {
        this._context = value;
        if (this.component) {
            this.component.context = value;
            this.cdr.detectChanges();
        }
    }

    ngOnInit(): void {
        const type = this.controlsFactory.resolve(this.descriptor.type);
        if (!type) {
            // todo: null is not possible, maybe remove it?
            console.log('unknown component type:', this.descriptor);
        } else {
            const viewContainerRef = this.host.viewContainerRef;
            const componentRef = viewContainerRef.createComponent(type); // todo: control type must be set as generic type, but now i don't know how do it for generic type (BaseControlDirective<T problem here>)
            this.component = componentRef.instance;
            this.component.descriptor = this.descriptor;
            this.component.currentForm = this.currentForm;
            this.component.context = this.context;
        }
    }

    onChange = (_: any) => { };

    writeValue(obj: any): void {
        if (this.component) {
            this.component.setControlValue(obj);
        }
    }

    registerOnChange(fn: any): void {
        if (this.component) {
            this.component.registerOnValueChanged((event) => {
                fn(event);
            });
        }
    }

    registerOnTouched(fn: any): void {
        if (this.component) {
            this.component.registerOnControlTouched(fn);
        }
    }
}
