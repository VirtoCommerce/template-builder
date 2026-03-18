import { Inject, Optional } from '@angular/core';
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ChangeDetectionStrategy, Component, NgZone, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MAT_DATEPICKER_SCROLL_STRATEGY, MatDatepickerBase, MatDatepickerContent, MatDatepickerControl } from './datepicker-base';
import { MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER, DateRange, MatDateSelectionModel } from './date-selection-model';
import { MAT_CALENDAR_RANGE_STRATEGY_PROVIDER } from './date-range-selection-strategy';
import { Overlay } from '@angular/cdk/overlay';
import { DateAdapter } from './core';
import { Directionality } from '@angular/cdk/bidi';

/**
 * Input that can be associated with a date range picker.
 * @docs-private
 */
export interface MatDateRangePickerInput<D> extends MatDatepickerControl<D> {
    comparisonStart: D | null;
    comparisonEnd: D | null;
}

// TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="matDateRangePicker"). We can change this to a
// directive if angular adds support for `exportAs: '$implicit'` on directives.
/** Component responsible for managing the date range picker popup/dialog. */
@Component({
    selector: 'mat-date-range-picker',
    template: '',
    exportAs: 'matDateRangePicker',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER,
        MAT_CALENDAR_RANGE_STRATEGY_PROVIDER,
        { provide: MatDatepickerBase, useExisting: MatDateRangePicker },
    ]
})
export class MatDateRangePicker<D> extends MatDatepickerBase<
    MatDateRangePickerInput<D>,
    DateRange<D>,
    D
> {
    constructor(
        overlay: Overlay,
        ngZone: NgZone,
        viewContainerRef: ViewContainerRef,
        @Inject(MAT_DATEPICKER_SCROLL_STRATEGY) scrollStrategy: any,
        @Optional() dateAdapter: DateAdapter<D>,
        @Optional() dir: Directionality,
        model: MatDateSelectionModel<DateRange<D>, D>,
    ) {
        super(overlay, ngZone, viewContainerRef, scrollStrategy, dateAdapter, dir, model);
    }

    protected override _forwardContentValues(instance: MatDatepickerContent<DateRange<D>, D>) {
        super._forwardContentValues(instance);

        const input = this.datepickerInput;

        if (input) {
            instance.comparisonStart = input.comparisonStart;
            instance.comparisonEnd = input.comparisonEnd;
        }
    }
}
