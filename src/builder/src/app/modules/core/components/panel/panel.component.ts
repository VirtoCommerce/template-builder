import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, AfterViewInit {

    @ViewChild('panelFooterRef') panelFooterRef!: ElementRef;

    hasFooter = true;

    constructor(private cdr: ChangeDetectorRef) { }

    ngAfterViewInit(): void {
        this.hasFooter = (<HTMLDivElement>this.panelFooterRef.nativeElement).children.length > 0;
        this.cdr.detectChanges();
    }

    ngOnInit(): void {
    }

}
