import { AfterContentInit, AfterViewInit, ChangeDetectorRef, HostBinding, HostListener, inject } from '@angular/core';
import { EnvironmentRef } from '@integration/services';
import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { NgIf, NgClass } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'app-overlap-panel',
    templateUrl: './overlap-panel.component.html',
    styleUrls: ['./overlap-panel.component.scss'],
    standalone: true,
    imports: [NgIf, NgClass, IconComponent]
})
export class OverlapPanelComponent implements OnInit {

    private readonly windowRef = inject(EnvironmentRef);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly elementRef = inject(ElementRef);

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
