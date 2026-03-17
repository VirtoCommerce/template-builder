import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-template-editor-host',
    templateUrl: './template-editor-host.component.html',
    styleUrls: ['./template-editor-host.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateEditorHostComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
