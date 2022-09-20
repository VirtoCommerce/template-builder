import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemplateEntryInfo } from '@shared/models';

@Component({
    selector: 'app-save-template',
    templateUrl: './save-template.component.html',
    styleUrls: ['./save-template.component.scss']
})
export class SaveTemplateComponent implements OnInit {

    @ViewChild('selectAllInput') selectAllInput!: ElementRef<HTMLInputElement>;

    entries: TemplateEntryInfo[];
    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<SaveTemplateComponent>,
        fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) data: { entries: TemplateEntryInfo[] }
    ) {
        const result = data.entries.reduce((acc, value) => ({ ...acc, [value.alias]: true}), {});
        this.entries = data.entries;
        this.form = fb.group(result);
    }

    ngOnInit(): void { }

    selectAll(event: Event) {
        console.log(event);
        const element = <HTMLInputElement>event.target;
        const value = element.checked;
        this.entries.forEach(x => this.form.get(x.alias)?.setValue(!!value));
    }

    setSelectAll() {
        const value = this.form.value;
        const checked = Object.keys(value).every(key => value[key]);
        const indeterminate = !checked && Object.keys(value).some(key => value[key]);
        this.selectAllInput.nativeElement.indeterminate = indeterminate;
        this.selectAllInput.nativeElement.checked = checked || indeterminate;
    }

    confirm() {
        const value = this.form.value;
        const result = { entries: Object.keys(value).filter(key => value[key]), accept: true };
        console.log(result);
        this.dialogRef.close(result);
    }

    decline() {
        this.dialogRef.close({ accept: false });
    }
}
