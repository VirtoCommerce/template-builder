import { ItemsGroup, SectionSchema } from '@core/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-add-section-group',
    templateUrl: './add-section-group.component.html',
    styleUrls: ['./add-section-group.component.scss']
})
export class AddSectionGroupComponent implements OnInit {

    @Input() group!: ItemsGroup<SectionSchema>;
    @Input() opened: boolean = false;

    @Input() underPreview: SectionSchema | null = null;

    @Output() onAdd = new EventEmitter<SectionSchema>();
    @Output() onPreview = new EventEmitter<SectionSchema>();
    @Output() onOpened = new EventEmitter();


    constructor() { }

    ngOnInit(): void {
    }

    raiseOnAdd(section: SectionSchema) {
        this.onAdd.emit(section);
    }

    raiseOnPreview(section: SectionSchema) {
        this.onPreview.emit(section);
    }

    raiseOnOpened() {
        this.onOpened.emit();
    }

}
