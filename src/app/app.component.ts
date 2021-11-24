import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    panelOpened = false;
    editOpened = false;

    openPanel() {
        this.panelOpened = true;
    }

    openEdit() {
        this.editOpened = true;
    }

    closePanels() {
        this.panelOpened = false;
        this.editOpened = false;
    }
}
