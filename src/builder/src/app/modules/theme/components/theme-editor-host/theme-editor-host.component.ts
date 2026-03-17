import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-theme-editor-host',
    templateUrl: './theme-editor-host.component.html',
    styleUrls: ['./theme-editor-host.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeEditorHostComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
