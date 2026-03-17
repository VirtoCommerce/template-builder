import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IconComponent } from '@core/components/icon/icon.component';
import { IconButtonComponent } from '@core/components/icon-button/icon-button.component';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, MatDialogModule, IconComponent, IconButtonComponent]
})
export class ConfirmComponent implements OnInit {

    title: string;
    icon: string;

    confirmText: string;
    declineText: string;

    constructor(
        private dialogRef: MatDialogRef<ConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.title = data.title;
        this.icon = data.icon;
        this.confirmText = data.confirmText || 'OK';
        this.declineText = data.declineText || 'Cancel';
    }

    ngOnInit(): void { }

    confirm() {
        this.dialogRef.close(true);
    }

    decline() {
        this.dialogRef.close(false);
    }
}
