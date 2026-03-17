import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-fullscreen-loader',
    templateUrl: './fullscreen-loader.component.html',
    styleUrls: ['./fullscreen-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullscreenLoaderComponent implements OnInit {
    ngOnInit(): void { }
}
