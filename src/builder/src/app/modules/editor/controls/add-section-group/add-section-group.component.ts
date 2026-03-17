import { ItemsGroup } from '@core/models';
import { SectionSchema } from '@models/document';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { IconComponent } from '@core/components/icon/icon.component';
import { ChevronComponent } from '@core/components/chevron/chevron.component';
import { AddSectionItemComponent } from '@editor/controls/add-section-item/add-section-item.component';

@Component({
    selector: 'app-add-section-group',
    templateUrl: './add-section-group.component.html',
    styleUrls: ['./add-section-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor, IconComponent, ChevronComponent, AddSectionItemComponent]
})
export class AddSectionGroupComponent implements OnInit {

    @Input() group!: ItemsGroup<SectionSchema>;
    @Input() opened: boolean = false;

    @Input() underPreviewType: string | null = null;

    @Output() onAdd = new EventEmitter<SectionSchema>();
    @Output() onPreview = new EventEmitter<SectionSchema>();
    @Output() onOpened = new EventEmitter();

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
