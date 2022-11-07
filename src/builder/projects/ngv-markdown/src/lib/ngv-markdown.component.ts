import { Component, OnInit, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import EasyMDE from 'easymde';

// https://github.com/Ionaru/easy-markdown-editor

@Component({
    selector: 'ngv-markdown',
    templateUrl: './ngv-markdown.component.html',
    styleUrls: ['./ngv-markdown.component.scss']
})
export class NgvMarkdownComponent implements OnInit, AfterViewInit {

    private easyMDE!: EasyMDE;

    constructor(private elementRef: ElementRef, private ngZone: NgZone) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.ngZone.runOutsideAngular(() => {
            const element = document.createElement('textarea');
            this.elementRef.nativeElement.appendChild(element);
            // EasyMDE.cleanBlock
            this.easyMDE = new EasyMDE({ element });
            console.log(this.easyMDE);
        });
    }


}
