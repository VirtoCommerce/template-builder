import { Directive, ViewContainerRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRouteSnapshot, ResolveEnd, Router } from "@angular/router";

@Directive({
    selector: '[toolbar-placeholder]'
})
export class ToolbarPlaceholderDirective {

    private readonly router = inject(Router);
    private readonly viewContainerRef = inject(ViewContainerRef);

    private currentToolbar: any;

    constructor() {
        this.router.events.pipe(takeUntilDestroyed()).subscribe(e => {
            if (e instanceof ResolveEnd) {
                const toolbar = this.findToolbar(e.state.root);

                if (toolbar === null) {
                    this.viewContainerRef.clear();
                }
                else if (toolbar !== this.currentToolbar) {
                    this.viewContainerRef.clear();
                    this.viewContainerRef.createComponent(toolbar);
                    this.currentToolbar = toolbar;
                }
            }
        });
    }

    private findToolbar(node: ActivatedRouteSnapshot): any {
        if (node.data && !!node.data['toolbar']) {
            return node.data['toolbar'];
        }

        if (node.children) {
            for (let child of node.children) {
                const result = this.findToolbar(child);
                if (!!result) {
                    return result;
                }
            }
        }

        return null;
    }
}
