import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { ClipboardModule } from '@angular/cdk/clipboard';

// import { MatDatepickerModule } from '@matheo/datepicker';
// import { MatNativeDateModule } from '@matheo/datepicker/core';
import { MatDatepickerModule, MatNativeDateModule } from 'ngv-datepicker';

// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { NgScrollbarModule } from 'ngx-scrollbar';

import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorTwitterModule } from 'ngx-color/twitter';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ckeditor4-angular';
import { ToastrModule } from 'ngx-toastr';

import { NgvMarkdownModule } from 'ngv-markdown';

import { COMPONENTS } from './components';
import { CONTROLS } from './controls';
import { DIALOGS } from './dialogs';
import { DYNAMIC_COMPONENTS } from './dynamics';

const ALL_COMPONENTS = [
    ...COMPONENTS,
    ...CONTROLS,
    ...DYNAMIC_COMPONENTS,
    ...DIALOGS
];

const MATERIAL_MODULES = [
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatRippleModule,
    MatSliderModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule
];

const CDK_MODULES = [
    DragDropModule,
    OverlayModule,
    ClipboardModule
];

@NgModule({
    declarations: ALL_COMPONENTS,
    exports: [
        ...ALL_COMPONENTS,
        ...CDK_MODULES,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ...MATERIAL_MODULES,
        ...CDK_MODULES,
        // PerfectScrollbarModule,
        NgScrollbarModule,
        FileUploadModule,
        ColorSketchModule,
        ColorTwitterModule,
        NgSelectModule,
        CKEditorModule,
        NgvMarkdownModule,
        // todo: use options from builder config
        // https://www.npmjs.com/package/ngx-toastr
        ToastrModule.forRoot()
    ]
})
export class CoreModule { }
