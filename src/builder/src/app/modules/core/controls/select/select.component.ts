import { catchError } from 'rxjs';
import { switchMap } from 'rxjs';
import { tap } from 'rxjs';
import { of } from 'rxjs';
import { DataService } from './../../services/data.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { concat, Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { cloneDeep, isArray } from 'lodash-es';

import { SelectDescriptor, SelectOptionModel } from '@models/controls';
import { BaseControlDirective } from '@core/controls';
import { FormControl, FormGroup } from '@angular/forms';

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

    constructor(
        private data: DataService
    ) {
        super();
    }

    raiseValueChanged(event: any) {
        if (!event) {
            this.onValueChanged(null);
        }
        // todo: select value
        if (isArray(event)) {
            this.onValueChanged(event.map(x => x.value));
        } else {
            this.onValueChanged(event.value);
        }
    }

    trackBy = (item: any) => {
        return item?.[this.descriptor.equalKey || 'value'];
    }

    override initContent() {
        super.initContent();
        this.form = new FormGroup({
            value: new FormControl(this.controlValue)
        });
        this.updateOptions();
        // load options if need
    }

    private updateOptions() {

        const options = [
            of([]), // start value
            this.doRequest(null), // initial loaded items
        ];

        if (this.descriptor.searchable) {
            options.push(
                this.searchEvent$.pipe(
                    distinctUntilChanged(),
                    tap(() => this.loading = true),
                    switchMap(searchQuery => this.doRequest(searchQuery))
            ));
        }

        this.options$ = concat(...options);
    }

    private doRequest(filter: string | null): Observable<any[]> {
        let result: Observable<any[]> = of([]);
        if (this.descriptor.request) {
            const context = cloneDeep(this.context);
            context.__searchQuery = filter;
            result = this.data.getData(this.descriptor.request, context).pipe(
                map(items => items?.map((x: any) => ({
                    label: x[this.descriptor.request.label],
                    group: this.descriptor.request.group ? x[this.descriptor.request.group] : null,
                    value: x
                }) || [])),
                tap(() => this.loading = false)
            );
        }
        return result.pipe(
            map(items => [...this.descriptor.options || [], ...items]),
            map(items => !filter || !this.descriptor.searchable
                ? items
                : items.filter(item => item.label.toLocaleUpperCase().indexOf(filter.toLocaleUpperCase()) !== -1)
            )
        );
    }
}
