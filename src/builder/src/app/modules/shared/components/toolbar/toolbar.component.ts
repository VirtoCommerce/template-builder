import { ButtonDescriptor } from './../../models/button.descriptor';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    undoRedoButtons: ButtonDescriptor[] = [
        { icon: 'undo', hint: 'Undo last action', type: null },
        { icon: 'redo', hint: 'Redo canceled action', type: null }
    ];

    previewButtons: ButtonDescriptor[] = [
        { icon: 'screen', hint: '', type: null },
        { icon: 'tablet', hint: '', type: null },
        { icon: 'mobile', hint: '', type: null },
        { icon: 'preview', hint: '', type: null }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
