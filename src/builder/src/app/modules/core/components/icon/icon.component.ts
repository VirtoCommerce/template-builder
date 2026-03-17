import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatIcon]
})
export class IconComponent implements OnInit {

    @Input() @HostBinding('class.inline') inline: boolean = false;
    @Input() @HostBinding('class.hoverable') hoverable: boolean = false;
    @Input() @HostBinding('class.small-size') smallSize: boolean = false;

    ngOnInit(): void {
    }

}
