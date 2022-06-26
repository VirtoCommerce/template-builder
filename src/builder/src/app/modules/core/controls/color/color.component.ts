import { ConnectedPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';

import { BaseControlDirective } from '@core/controls';
import { ColorDescriptor } from '@core/models';
import { ColorEvent } from 'ngx-color';

/**
 * https://ngx-color.vercel.app/
 * https://www.npmjs.com/package/ngx-color
 */

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent extends BaseControlDirective<ColorDescriptor> {
    isOpen = false;

    positions: ConnectedPosition[] = [{
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
        weight: 2
    }, {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
        weight: 1
    }];

    clearColor() {
        this.onValueChanged(this.descriptor.clearValue || null);
        this.close();
    }

    changeColor(value: ColorEvent) {
        this.onValueChanged(value.color.hex);
    }

    togglePopover() {
        this.isOpen = !this.isOpen;
    }

    close() {
        this.isOpen = false;
    }

    applyColor() {
        this.close();
    }

    outsideClick(event: MouseEvent) {
        event.stopPropagation();
        this.close();
    }
}
