import {
    Component,
    Input,
    OnInit,
    ViewChild,
    forwardRef,
    ChangeDetectionStrategy,
    // HostBinding,
    ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';

import { ControlHostDirective } from './control-host.directive';
import { ControlsFactory, BaseControlDirective } from '@core/controls';

import { BaseControlDescriptor, ControlContext } from '@core/models';

@Component({
    selector: 'app-control-holder',
    template: `<ng-template appControlHost></ng-template>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlHolderComponent),
        multi: true,
    }],
    styleUrls: ['./control-holder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlHolderComponent implements OnInit, ControlValueAccessor {

    private component!: BaseControlDirective<BaseControlDescriptor>;
    private _context!: ControlContext;

    @ViewChild(ControlHostDirective, { static: true }) host!: ControlHostDirective;

    @Input() descriptor!: BaseControlDescriptor;
    @Input() currentForm!: FormGroup;
    // @Input() hideLabel: boolean;
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
    // @HostBinding('class') css: string;

    constructor(
        // private componentFactoryResolver: ComponentFactoryResolver,
        private controlsFactory: ControlsFactory,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        const type = this.controlsFactory.resolve(this.descriptor.type);
        if (!type) {
            // if (this.descriptor.type !== 'hidden') {

            // todo: null is not possible, maybe remove it?
            console.log('unknown component type:', this.descriptor);

            // }
        } else {
            const viewContainerRef = this.host.viewContainerRef;
            const componentRef = viewContainerRef.createComponent(type); // todo: control type must be set as generic type, but now i don't know how do it for generic type (BaseControlDirective<T problem here>)
            // console.log(componentRef.instance);
            // const factory = this.componentFactoryResolver.resolveComponentFactory(type);
            // const container = this.host.viewContainerRef;

            this.component = componentRef.instance;
            this.component.descriptor = this.descriptor;
            this.component.currentForm = this.currentForm;
            this.component.context = this.context;


            // container.clear();
            // this.component = container.createComponent(factory).instance;
            // this.component.descriptor = this.descriptor;
            // this.component.group = this.group;
            // this.component.hideLabel = this.hideLabel;
            // this.component.context = this.context;
            // this.css = this.component.parentClass;
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
