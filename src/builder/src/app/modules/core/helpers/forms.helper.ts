import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { SectionPropertyDescriptor } from '@models/controls';

export function generateForm(model: any, properties: SectionPropertyDescriptor[]): FormGroup {
    const result = new FormGroup({});
    properties.filter(p => !!p.id).forEach(p => {
        const value = model[p.id];
        result.addControl(p.id, new FormControl(value));
    });
    return result;
}

export function generateFormArray(items: any[], properties: SectionPropertyDescriptor[]): FormArray {
    return new FormArray(items.map(item => generateForm(item, properties)));
}
