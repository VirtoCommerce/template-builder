import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit {

    title: string;

    confirmText: string;

    constructor(
        private dialogRef: MatDialogRef<AlertComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.title = data.title;
        this.confirmText = data.confirmText || 'ОК';
    }

    ngOnInit(): void { }

    confirm() {
        this.dialogRef.close();
    }
}
