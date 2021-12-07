import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from 'ckeditor4-angular';

import { COMPONENTS } from './components';
import { CONTROLS } from './controls';
import { DYNAMIC_COMPONENTS } from './dynamics';

const ALL_COMPONENTS = [
    ...COMPONENTS,
    ...CONTROLS,
    ...DYNAMIC_COMPONENTS
];

@NgModule({
    declarations: ALL_COMPONENTS,
    exports: ALL_COMPONENTS,
    entryComponents: [...CONTROLS],
    imports: [
        CommonModule,
        CKEditorModule,
        ReactiveFormsModule
    ]
})
export class SharedModule { }
