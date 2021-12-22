import { ControlContext } from './../../../shared/models/control.context';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SectionModel, SectionPropertyDescriptor } from '@shared/models';

@Component({
    selector: 'app-edit-section',
    templateUrl: './edit-section.component.html',
    styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent implements OnInit {

    @Input() section!: SectionModel;
    @Input() descriptors: SectionPropertyDescriptor[] = [];
    @Input() context: ControlContext = {};

    @Output() backClick = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void {
    }

    backButtonClick() {
        this.backClick.emit();
    }

}
