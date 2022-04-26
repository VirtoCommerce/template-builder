import { Directive, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveEnd, Router, RouterStateSnapshot } from "@angular/router";

@Directive({
    selector: '[toolbar-placeholder]'
})
export class ToolbarPlaceholderDirective {

    private currentToolbar: any;

    constructor(private router: Router, private viewContainerRef: ViewContainerRef) {
        this.router.events.subscribe(e => {
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
