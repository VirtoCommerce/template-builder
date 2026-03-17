import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { cutString, stripHtmlTags } from '@app/modules/integration/helpers/utils';
import { BaseControlDescriptor, SectionPropertyDescriptor } from '@app/modules/models';
import { SectionSchema } from '@models/document';
import { isArray } from 'lodash-es';
import { IconComponent } from '@core/components/icon/icon.component';

@Component({
    selector: 'app-add-section-item',
    templateUrl: './add-section-item.component.html',
    styleUrls: ['./add-section-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, IconComponent]
})
export class AddSectionItemComponent implements OnInit {

    @Input() section!: SectionSchema;
    @Input() inPreview: boolean = false;
    @Input() child: boolean = false;
    @Input() descriptor: BaseControlDescriptor | undefined;

    @Output() onPreview = new EventEmitter();
    @Output() onAdd = new EventEmitter();

    ngOnInit(): void {
    }

    raiseOnPreview() {
        this.onPreview.emit();
    }

    getSectionName(): string {
        const properties = ['name', 'type'];
        if (this.descriptor && this.descriptor.displayPropertyName) {
            const otherPropertiese = Array.isArray(this.descriptor.displayPropertyName) ? this.descriptor.displayPropertyName : [this.descriptor.displayPropertyName];
            properties.splice(0, 0, ...otherPropertiese);
        }
        const v = <any>this.section;
        const result = properties.find(x => !!v[x])!;
        return cutString(stripHtmlTags(v[result]));
    }

    raiseOnAdd(event: MouseEvent) {
        event.stopPropagation();
        this.onAdd.emit();
    }

}
