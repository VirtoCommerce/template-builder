import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

    title: string;

    confirmText: string;
    declineText: string;

    constructor(
        private dialogRef: MatDialogRef<ConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.title = data.title;
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
