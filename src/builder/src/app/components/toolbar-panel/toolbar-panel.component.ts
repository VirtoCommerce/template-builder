import { ButtonDescriptor } from '@app/models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-toolbar-panel',
    templateUrl: './toolbar-panel.component.html',
    styleUrls: ['./toolbar-panel.component.scss']
})
export class ToolbarPanelComponent implements OnInit {

    @Input() buttons: ButtonDescriptor[] = [];

    constructor() { }

    ngOnInit(): void {
    }

}
