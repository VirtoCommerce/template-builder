import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { BaseControlDirective } from '@core/controls';
import { SelectDescriptor } from '@core/models';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent extends BaseControlDirective<SelectDescriptor> {

    options: { options: any[], groups: any[] } = { options: [], groups: [] };

    raiseValueChanged(event: MatSelectChange) {
        this.onValueChanged(event.value);
    }

    override initContent() {
        super.initContent();
        this.updateOptions();
        // load options if need
    }

    private updateOptions() {
        if (this.descriptor && this.descriptor.options) {
            const grouped = this.descriptor.options.reduce((acc, item) => {
                if (item.group) {
                    if (!acc.groups[item.group]) {
                        acc.groups[item.group] = [];
                    }
                    acc.groups[item.group].push(item);
                } else {
                    acc.options.push(item);
                }
                return acc;
            }, { options: <any[]>[], groups: <any>{} });
            this.options.options = grouped.options;
            this.options.groups = Object.keys(grouped.groups).map(key => ({ group: key, options: grouped.groups[key] }));
        }
    }
}
