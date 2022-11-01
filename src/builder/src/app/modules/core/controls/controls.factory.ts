import { Injectable, Type } from "@angular/core";

import * as editors from './index';

@Injectable({
    providedIn: 'root'
})
export class ControlsFactory {
    private controls: { [key: string]: Type<any> } = {};

    constructor() {
        this.controls['calendar'] = editors.CalendarComponent;
        this.controls['checkbox'] = editors.CheckboxComponent;
        this.controls['color'] = editors.ColorComponent;
        this.controls['files'] = editors.FilesComponent;
        this.controls['images'] = editors.ImagesComponent;
        this.controls['list'] = editors.CollectionComponent;
        this.controls['number'] = editors.NumberComponent;
        this.controls['object'] = editors.ObjectComponent;
        this.controls['slider'] = editors.NumberComponent;
        this.controls['select'] = editors.SelectComponent;
        this.controls['string'] = editors.StringComponent;
        this.controls['text'] = editors.TextComponent;
        this.controls['search'] = editors.SearchComponent;

        // this.controls['popup-list'] = editors.PopupListItemComponent;
        // this.controls['url'] = editors.UrlItemComponent;
    }

    resolve(type: string): Type<any> {
        const result = this.controls[type];

        if (!result) {
            return editors.UnknownEditorComponent;
        }

        return result;
    }
}
