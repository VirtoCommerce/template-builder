import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SectionModel } from '@shared/models';

@Component({
    selector: 'app-edit-section',
    templateUrl: './edit-section.component.html',
    styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent implements OnInit {

    @Input() section: SectionModel = {
        __id: 'randomid',
        __index: 1,
        name: 'Edit section',
        type: 'headline'
    };

    @Output() backClick = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void {
    }

    backButtonClick() {
        this.backClick.emit();
    }

}
