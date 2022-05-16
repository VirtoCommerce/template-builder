import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { MatSelectModule } from '@angular/material/select';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';

import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';

import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorTwitterModule } from 'ngx-color/twitter';
import { CKEditorModule } from 'ckeditor4-angular';
import { ToastrModule } from 'ngx-toastr';

import { COMPONENTS } from './components';
import { CONTROLS } from './controls';
import { DYNAMIC_COMPONENTS } from './dynamics';

const ALL_COMPONENTS = [
    ...COMPONENTS,
    ...CONTROLS,
    ...DYNAMIC_COMPONENTS
];

const MATERIAL_MODULES = [
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatRippleModule,
    MatSliderModule,
    DragDropModule,
    OverlayModule
];

@NgModule({
    declarations: ALL_COMPONENTS,
    exports: ALL_COMPONENTS,
    entryComponents: [...CONTROLS],
    imports: [
        CommonModule,
        ReactiveFormsModule,

        PerfectScrollbarModule,

        ...MATERIAL_MODULES,

        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,

        FileUploadModule,
        ColorSketchModule,
        ColorTwitterModule,
        CKEditorModule,
        // todo: use options from builder config
        // https://www.npmjs.com/package/ngx-toastr
        ToastrModule.forRoot()
    ]
})
export class CoreModule { }
