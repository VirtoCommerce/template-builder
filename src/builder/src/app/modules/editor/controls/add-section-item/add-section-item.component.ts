import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SectionSchema } from '@models/document';

@Component({
    selector: 'app-add-section-item',
    templateUrl: './add-section-item.component.html',
    styleUrls: ['./add-section-item.component.scss']
})
export class AddSectionItemComponent implements OnInit {

    @Input() section!: SectionSchema;
    @Input() inPreview: boolean = false;
    @Input() child: boolean = false;

    @Output() onPreview = new EventEmitter();
    @Output() onAdd = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    raiseOnPreview() {
        this.onPreview.emit();
    }

    raiseOnAdd(event: MouseEvent) {
        event.stopPropagation();
        this.onAdd.emit();
    }

}
