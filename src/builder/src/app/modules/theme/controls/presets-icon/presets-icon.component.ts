import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { IconWithPreviewComponent } from '@core/components/icon-with-preview/icon-with-preview.component';

@Component({
    selector: 'app-presets-icon',
    templateUrl: './presets-icon.component.html',
    styleUrls: ['./presets-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgStyle, IconWithPreviewComponent]
})
export class PresetsIconComponent implements OnInit {

    private _name!: string;
    background!: string;
    color!: string;
    letter!: string;

    @Input() icon?: string | null = undefined;
    @Input() preview?: string | null = undefined;

    @Input() get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
        this.background = this.stringToColour();
        this.color = this.getTextColor();
        this.letter = value[0];
    }

    ngOnInit(): void { }

    private stringToColour(): string {
        // return "#000000";
        let hash = 0;
        for (let i = 0; i < this.name.length; i++) {
            hash = this.name.charCodeAt(i) + ((hash << 5) - hash);
        }
        let colour = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF;
            const stringValue = '00' + value.toString(16);
            colour += stringValue.substring(stringValue.length - 2);
        }
        return colour;
    }

    private getTextColor(): string {
        const hexcolor = this.background.substring(1);
        const r = parseInt(hexcolor.substring(0, 2), 16);
        const g = parseInt(hexcolor.substring(2, 2), 16);
        const b = parseInt(hexcolor.substring(4, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    };
}
