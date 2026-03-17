import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef, AfterViewChecked, inject } from '@angular/core';
// import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

import { NgScrollbar } from 'ngx-scrollbar';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    standalone: true,
    imports: [NgScrollbar]
})
export class PanelComponent implements OnInit, AfterViewInit, AfterViewChecked {

    private readonly cdr = inject(ChangeDetectorRef);

    @ViewChild('panelFooterRef') panelFooterRef!: ElementRef;
    @ViewChild('panelBody') panelBody!: ElementRef;
    // @ViewChild(PerfectScrollbarDirective, { static: false }) perfectScrollbarDirectiveRef?: PerfectScrollbarDirective;

    hasFooter = true;

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.hasFooter = (<HTMLDivElement>this.panelFooterRef.nativeElement).children.length > 0;
        this.cdr.detectChanges();
    }

    ngAfterViewChecked(): void {
        // this.perfectScrollbarDirectiveRef?.update();
    }
}
