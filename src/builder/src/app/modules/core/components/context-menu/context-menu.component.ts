import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, AfterContentInit, AfterViewInit, inject } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ContextMenuAction, ContextMenuActionType } from '@core/models';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, NgStyle, OverlayModule, IconComponent]
})
export class ContextMenuComponent implements OnInit, AfterViewInit {

    @Input() actions: ContextMenuAction[] | null = null;
    @Input() visible: boolean = false;
    @Input() getActions: (() => Promise<ContextMenuAction[]>) | null = null;

    @ViewChild(CdkConnectedOverlay) overlay!: CdkConnectedOverlay;

    @Output() onAction = new EventEmitter<ContextMenuActionType>();

    private readonly cdr = inject(ChangeDetectorRef);
    isOpen = false;
    positions: ConnectedPosition[] = [];

    ngAfterViewInit(): void {
        // this.overlay.positionChange.subscribe(x => {
        //     console.log(x);
        // });
    }

    ngOnInit(): void {

    }

    evaluateFunction(func: boolean | (() => boolean) | undefined): boolean {
        if (typeof func === 'function') {
            return func();
        }
        return !!func;
    }

    getActionsList(): ContextMenuAction[] {
        if (!this.actions && this.getActions) {
            this.getActions().then(actions => {
                this.actions = actions;
                this.cdr.detectChanges();
            }).catch(() => {
                this.cdr.detectChanges();
            });
        }
        return this.actions || [];
    }

    showActions() {
        this.isOpen = true;
    }

    hideActions() {
        if (!!this.getActions) {
            this.actions = null;
        }
        this.isOpen = false;
    }

    gearClick(event: MouseEvent) {
        if (event.pageY > window.innerHeight / 2) {
            this.positions = [
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                },
            ];
        } else {
            this.positions = [
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                },
            ];
        }
        event.stopPropagation();
        this.showActions();
    }

    outsideClick(event: MouseEvent) {
        event.stopPropagation();
        this.hideActions();
    }

    raiseOnAction(action: ContextMenuAction) {
        if (action !== '|' && !this.evaluateFunction(action.inactive)) {
            this.onAction.emit(action);
            this.hideActions();
        }
    }
}
