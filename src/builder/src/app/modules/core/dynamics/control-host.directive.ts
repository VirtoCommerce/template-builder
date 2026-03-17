import { Directive, ViewContainerRef, inject } from '@angular/core';

@Directive({
    selector: '[appControlHost]',
    standalone: true
})
export class ControlHostDirective {
    public readonly viewContainerRef = inject(ViewContainerRef);
}
