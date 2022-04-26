import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import * as router from '@core/routing/actions';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    // undoRedoButtons: ButtonDescriptor[] = [
    //     { icon: 'undo', hint: 'Undo last action', type: null },
    //     { icon: 'redo', hint: 'Redo canceled action', type: null }
    // ];

    // previewButtons: ButtonDescriptor[] = [
    //     { icon: 'screen', hint: '', type: null },
    //     { icon: 'tablet', hint: '', type: null },
    //     { icon: 'mobile', hint: '', type: null },
    //     { icon: 'preview', hint: '', type: null }
    // ];

    // @ViewChild(RouterOutlet) outlet!: RouterOutlet;

    constructor(private router: Router, private store: Store) { }

    ngOnInit() {
        // this.router.events.subscribe(e => {
        //     console.log('router event', e);
        //     if (e instanceof ActivationStart && e.snapshot.outlet === "toolbar")
        //         this.outlet.deactivate();
        // });
    }


    routerOutletActivated(ro: RouterOutlet) {
        // console.log('activated');
        // if (!_shouldActivate(_router.url))
        //     ro.deactivate();
    }

}
