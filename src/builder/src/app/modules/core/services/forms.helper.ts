import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { SectionPropertyDescriptor } from '@core/models';

@Injectable({
    providedIn: 'root'
})
export class FormsHelper {
    generateForm(model: any, properties: SectionPropertyDescriptor[]): FormGroup {
        const result = new FormGroup({});
        properties.filter(p => !!p.id).forEach(p => {
            const value = model[p.id];
            result.addControl(p.id, new FormControl(value));
        });
        return result;
    }

    generateFormArray(items: any[], properties: SectionPropertyDescriptor[]): FormArray {
        return new FormArray(items.map(item => this.generateForm(item, properties)));
    }
}
