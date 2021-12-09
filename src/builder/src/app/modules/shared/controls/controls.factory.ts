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
        this.controls['files'] = editors.FilesComponent; // todo: files
        this.controls['images'] = editors.ImagesComponent; // todo: images
        this.controls['number'] = editors.NumberComponent;
        this.controls['select'] = editors.SelectComponent;
        this.controls['string'] = editors.StringComponent;
        this.controls['text'] = editors.TextComponent;
        // this.controls['list'] = editors.ListItemComponent;
        // this.controls['object'] = editors.ObjectItemComponent;
        // this.controls['popup-list'] = editors.PopupListItemComponent;
        // this.controls['search'] = editors.SearchItemComponent;
        // this.controls['url'] = editors.UrlItemComponent;
        // this.controls['slider'] = editors.SliderItemComponent;
    }

    resolve(type: string): Type<any> {
        const result = this.controls[type];
        return result;
    }
}
