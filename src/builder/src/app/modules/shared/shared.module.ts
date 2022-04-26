import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '@core/core.module';

import { COMPONENTS } from './components';

const ALL_COMPONENTS = [
    ...COMPONENTS
];

@NgModule({
    declarations: ALL_COMPONENTS,
    exports: ALL_COMPONENTS,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CoreModule
    ]
})
export class SharedModule { }
