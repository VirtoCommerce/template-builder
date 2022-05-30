import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

    @Input() @HostBinding('class.inline') inline: boolean = false;
    @Input() @HostBinding('class.hoverable') hoverable: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

}
