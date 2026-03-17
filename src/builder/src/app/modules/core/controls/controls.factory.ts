import { Injectable, Type } from "@angular/core";

import { BaseControlDirective } from './base-control.directive';
import { UnknownEditorComponent } from './unknown-editor/unknown-editor.component';

@Injectable({
    providedIn: 'root'
})
export class ControlsFactory {
    private controls: { [key: string]: Type<BaseControlDirective<any>> } = {};

    register(type: string, component: Type<BaseControlDirective<any>>): void {
        this.controls[type] = component;
    }

    resolve(type: string): Type<any> {
        return this.controls[type] ?? UnknownEditorComponent;
    }
}
