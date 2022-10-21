import { ServiceLocator } from './service-locator';
import { BlockViewModel } from './block.view-model';
import { PreviewInteractor } from './preview.interactor';

export class Renderer {

    private interactor: PreviewInteractor;

    constructor(public container: HTMLElement) {
        this.interactor = ServiceLocator.getPreviewInteractor();
    }

    add(vm: BlockViewModel) {
        vm.element = this.createElement(vm);
        this.container.append(vm.element);
        this.executeScripts(vm);
        if (vm.hidden) {
            vm.element.style.display = 'none';
        }
    }

    update(vm: BlockViewModel) {
        const element = vm.element;
        if (!element) {
            return;
        }
        vm.element = this.createElement(vm);
        this.container.replaceChild(vm.element, element);
        this.executeScripts(vm);
    }

    insert(vm: BlockViewModel, index: number) {
        vm.element = this.createElement(vm);
        const beforeElement = this.container.children.item(index);
        this.container.insertBefore(vm.element, beforeElement);
        this.executeScripts(vm);
        if (vm.hidden) {
            vm.element.style.display = 'none';
        }
    }

    scrollTo(vm: BlockViewModel) {
        if (vm && vm.element && !vm.hidden) {
            this.interactor.scrollTo(vm)
        }
    }

    private createElement(vm: BlockViewModel) {
        const div = document.createElement('div');
        div.innerHTML = `<div>${vm.htmlString}</div>`;
        const result = <HTMLElement>div.firstChild;
        result.style.userSelect = 'none';
        return result;
    }


    private executeScripts(vm: BlockViewModel) {
        this.nodeScriptReplace(vm.element);
    }

    private nodeScriptReplace(node) {
        if (this.nodeScriptIs(node) === true) {
            node.parentNode.replaceChild(this.nodeScriptClone(node), node);
        }
        else {
            var i = -1, children = node.childNodes;
            while (++i < children.length) {
                this.nodeScriptReplace(children[i]);
            }
        }

        return node;
    }
    private nodeScriptClone(node) {
        var script = document.createElement("script");
        script.text = node.innerHTML;

        var i = -1, attrs = node.attributes, attr;
        while (++i < attrs.length) {
            script.setAttribute((attr = attrs[i]).name, attr.value);
        }
        return script;
    }

    private nodeScriptIs(node) {
        return node.tagName === 'SCRIPT';
    }
}
