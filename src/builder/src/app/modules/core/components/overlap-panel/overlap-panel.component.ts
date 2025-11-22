import { AfterContentInit, AfterViewInit, ChangeDetectorRef, HostBinding, HostListener } from '@angular/core';
import { EnvironmentRef } from '@integration/services';
import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Component({
    selector: 'app-overlap-panel',
    templateUrl: './overlap-panel.component.html',
    styleUrls: ['./overlap-panel.component.scss']
})
export class OverlapPanelComponent implements OnInit {

    @Input() expandable = true;
    @HostBinding("class.inplace") @Input() skipTranslate: boolean | null = false;

    @HostListener('window:resize')
    onResize() {
        this.changeWidth();
    }

    private _interval: any;

    contentWidth: number | null = null;
    expanderPosition: number | null = null;
    isOpened = false; // todo: maybe should be stored in state or in url

    constructor(
        private windowRef: EnvironmentRef,
        private cdr: ChangeDetectorRef,
        private elementRef: ElementRef) { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        this._interval = setInterval(() => {
            this.changeWidth();
        }, 1000);
    }

    ngOnDestroy(): void {
        clearInterval(this._interval);
    }

    toggle() {
        this.isOpened = !this.isOpened;
        this.changeWidth();
    }

    changeWidth() {
        setTimeout(() => {
            if (this.isOpened) {
                this.contentWidth = this.windowRef.nativeWindow.innerWidth / 2;
            } else {
                this.contentWidth = null;
            }
            this.expanderPosition = this.contentWidth || this.elementRef.nativeElement.offsetWidth;
            this.cdr.detectChanges();
        });
    }

    // getContentWidth(): number | null {
    //     if (this.isOpened) {
    //         return this.windowRef.nativeWindow.innerWidth / 2;
    //     }
    //     return null;
    // }

    // getPanelWidth(): number {
    //     this.cdr.detectChanges();
    //     return this.getContentWidth() || this.elementRef.nativeElement.offsetWidth;
    // }

}
