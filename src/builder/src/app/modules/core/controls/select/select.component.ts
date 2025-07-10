import { NgSelectComponent } from '@ng-select/ng-select';
import { switchMap } from 'rxjs';
import { tap } from 'rxjs';
import { of } from 'rxjs';
import { DataService } from '@core/services';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { concat, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { SelectDescriptor } from '@models/controls';
import { BaseControlDirective } from '@core/controls';
import { FormControl, FormGroup } from '@angular/forms';

import { appHelpers } from '@integration/helpers';

/**
 * https://ng-select.github.io/ng-select#/data-sources
 * https://github.com/ng-select/ng-select
 */

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent extends BaseControlDirective<SelectDescriptor> {

    form!: FormGroup;
    options$!: Observable<any[]>;
    searchEvent$ = new Subject<string>();
    loading: boolean = false;

    @ViewChild('selectControl', { static: true }) select!: NgSelectComponent;

    constructor(
        private cdr: ChangeDetectorRef,
        private data: DataService
    ) {
        super();
    }

    raiseValueChanged(event: any) { }

    compareWith = (itemInSelect: any, itemInSource: any) => {
        const vA = (itemInSelect.value || itemInSelect)[this.descriptor?.equalKey || 'value'] || itemInSelect.value || itemInSelect;
        const v0 = (itemInSource.value || itemInSource)[this.descriptor?.equalKey || 'value'] || itemInSource.value || itemInSource;
        return vA === v0;
    }

    override initContent() {
        super.initContent();
        this.form = new FormGroup({
            value: new FormControl(this.selectControlValue)
        });
        this.updateOptions();
        this.form.valueChanges.subscribe({
            next: (v) => {
                this.onValueChanged(v.value);
            }
        });
    }

    get selectControlValue(): any {
        if (this.controlValue && Array.isArray(this.controlValue)) {
            return this.controlValue.map((x: any) => this.convertItemToOption(x));
        }
        return this.convertItemToOption(this.controlValue);
    }

    private updateOptions() {

        const options = [
            of(this.descriptor?.options || []), // start value
            this.doRequest(null), // initial loaded items
        ];

        if (this.descriptor?.searchable) {
            options.push(
                this.searchEvent$.pipe(
                    distinctUntilChanged(),
                    tap(() => this.loading = true),
                    switchMap(searchQuery => this.doRequest(searchQuery))
                ));
        }

        if (this.descriptor?.optionsSelector) {
            options.push(of(appHelpers.evalInContext(this.descriptor.optionsSelector, this.context)));
        }

        this.options$ = concat(...options);
    }

    unselect(item: any) {
        this.form.controls['value'].setValue(
            this.selectControlValue.filter((x: any) => !this.compareWith(x, item)),
            { emitEvent: true }
        );
    }

    private convertItemToOption(item: any) {
        if (!item) {
            return null;
        }
        return {
            label: this.descriptor!.request?.label ? item[this.descriptor!.request.label] : item,
            group: this.descriptor!.request?.group ? item[this.descriptor!.request.group] : null,
            value: this.descriptor!.request?.value ? item[this.descriptor!.request.value] : item,
        };
    }

    private doRequest(filter: string | null): Observable<any[]> {
        let result: Observable<any[]> = of([]);
        if (this.descriptor?.request) {
            const context = { ...this.context, __searchQuery: filter };
            result = this.data.doRequest(this.descriptor.request, context).pipe(
                map(items => items?.map((x: any) => this.convertItemToOption(x)) || []),
                tap(() => this.loading = false),
                // tap(() => {
                //     const value = this.select.itemsList.findItem(this.controlValue);
                //     this.select.itemsList.select(value);
                // })
            );
        }
        return result.pipe(
            map(items => [...this.descriptor?.options || [], ...items]),
            map(items => !filter || !this.descriptor?.searchable
                ? items
                : items.filter(item => item.label.toLocaleUpperCase().indexOf(filter.toLocaleUpperCase()) !== -1)
            )
        );
    }
}
