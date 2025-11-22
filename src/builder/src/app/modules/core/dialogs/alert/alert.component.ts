import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
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
