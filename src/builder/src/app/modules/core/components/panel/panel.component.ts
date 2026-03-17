import { Component, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef, inject } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    standalone: true,
    imports: [NgScrollbar]
})
export class PanelComponent implements AfterViewInit {

    private readonly cdr = inject(ChangeDetectorRef);

    @ViewChild('panelFooterRef') panelFooterRef!: ElementRef;
    @ViewChild('panelBody') panelBody!: ElementRef;
    // @ViewChild(PerfectScrollbarDirective, { static: false }) perfectScrollbarDirectiveRef?: PerfectScrollbarDirective;

    hasFooter = true;

    ngAfterViewInit(): void {
        this.hasFooter = (<HTMLDivElement>this.panelFooterRef.nativeElement).children.length > 0;
        this.cdr.detectChanges();
    }
}
