import { Inject, Optional } from '@angular/core';
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ChangeDetectionStrategy, Component, NgZone, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MAT_DATEPICKER_SCROLL_STRATEGY, MatDatepickerBase, MatDatepickerControl } from './datepicker-base';
import { MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER, MatDateSelectionModel } from './date-selection-model';
import { Overlay } from '@angular/cdk/overlay';
import { DateAdapter } from './core';
import { Directionality } from '@angular/cdk/bidi';

// TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="matDatepicker"). We can change this to a directive
// if angular adds support for `exportAs: '$implicit'` on directives.
/** Component responsible for managing the datepicker popup/dialog. */
@Component({
    selector: 'mat-datepicker',
    template: '',
    exportAs: 'matDatepicker',
    standalone: true,
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER,
        { provide: MatDatepickerBase, useExisting: MatDatepicker },
    ]
})
export class MatDatepicker<D> extends MatDatepickerBase<MatDatepickerControl<D>, D | null, D> {
    constructor(
        overlay: Overlay,
        ngZone: NgZone,
        viewContainerRef: ViewContainerRef,
        @Inject(MAT_DATEPICKER_SCROLL_STRATEGY) scrollStrategy: any,
        @Optional() dateAdapter: DateAdapter<D>,
        @Optional() dir: Directionality,
        model: MatDateSelectionModel<D | null, D>,
    ) {
        super(overlay, ngZone, viewContainerRef, scrollStrategy, dateAdapter, dir, model);
    }
}
