import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: []
})
export class LogoComponent {

    readonly version = input<string | null>(null);

}
