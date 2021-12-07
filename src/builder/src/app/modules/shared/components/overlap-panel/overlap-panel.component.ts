import { ElementRef, ViewChild } from '@angular/core';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-overlap-panel',
    templateUrl: './overlap-panel.component.html',
    styleUrls: ['./overlap-panel.component.scss']
})
export class OverlapPanelComponent implements OnInit, AfterViewInit {

    hideFooter: boolean = false;

    @Input() title: string | null = null;
    @Output() backClick = new EventEmitter<any>();

    @ViewChild('panelFooterRef') panelFooter!: ElementRef;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.hideFooter = !this.panelFooter.nativeElement || !this.panelFooter.nativeElement.children.length;
        this.cdr.detectChanges();
    }

    backButtonClick() {
        this.backClick.emit();
    }

}
