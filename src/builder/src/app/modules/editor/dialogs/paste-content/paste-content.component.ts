import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-paste-content',
    templateUrl: './paste-content.component.html',
    styleUrls: ['./paste-content.component.scss']
})
export class PasteContentComponent implements OnInit {

    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<PasteContentComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        let text = data.clipboardData;
        try {
            // try format json
            const obj = JSON.parse(text);
            text = JSON.stringify(obj, null, 4);
        } catch {
            // ignore any error
        }
        this.form = new FormGroup({
            value: new FormControl(text)
        });
    }

    ngOnInit(): void { }

    confirm() {
        const result = { ...this.form.value, accept: true };
        this.dialogRef.close(result);
    }

    decline() {
        this.dialogRef.close({ accept: false });
    }
}
