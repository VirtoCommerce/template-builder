import { EnvironmentRef } from '../../services/environment.ref';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-overlap-panel',
    templateUrl: './overlap-panel.component.html',
    styleUrls: ['./overlap-panel.component.scss']
})
export class OverlapPanelComponent implements OnInit {

    @Input() expandable = true;

    isOpened = false; // todo: maybe should be stored in state or in url

    constructor(private windowRef: EnvironmentRef) {}

    ngOnInit(): void { }

    getContentWidth(): number | null {
        if (this.isOpened) {
            return this.windowRef.nativeWindow.innerWidth / 2;
        }
        return null;
    }

}
