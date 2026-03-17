import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, RouterOutlet } from '@angular/router';
import { LogoComponent } from '@core/components/logo/logo.component';
import { ToolbarPlaceholderDirective } from './toolbar-placeholder.directive';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    standalone: true,
    imports: [LogoComponent, ToolbarPlaceholderDirective]
})
export class ToolbarComponent implements OnInit {

    private readonly router = inject(Router);
    private readonly store = inject(Store);

    ngOnInit() {
    }

    routerOutletActivated(ro: RouterOutlet) {
    }

}
