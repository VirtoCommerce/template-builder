import { ServiceLocator } from './service-locator';
import { BlockViewModel } from './block.view-model';
import { HttpService } from './services/http.service';
import { PreviewInteractor } from './preview.interactor';

export class Renderer {

    private interactor: PreviewInteractor;

    private http: HttpService;
    private previewModel: BlockViewModel | null = null;

    constructor(public container: HTMLElement) {
        this.interactor = ServiceLocator.getPreviewInteractor();
        this.http = ServiceLocator.getHttp();
    }

    syncList(list: BlockViewModel[]) {
        const container = this.container;
        container.innerHTML = '';
        for (let i = 0; i < list.length; i++) {
            const vm = list[i];
            if (!vm.element) {
                vm.element = document.createElement('div');
                this.http.postTo('/designer-preview/block?preview_mode=true', vm.source).then(result => {
                    vm.htmlString = result;
                    const newElement = this.createElement(vm);
                    container.replaceChild(newElement, vm.element);
                    this.parseScript(newElement);
                    vm.element = newElement;
                });
            }
            container.appendChild(vm.element);
        }
    }

    addPreview(previewModel: BlockViewModel) {
        this.previewModel = previewModel;
        this.http.postTo('/designer-preview/block?preview_mode=true', previewModel.source).then(result => {
            previewModel.htmlString = result;
            previewModel.element = this.createElement(previewModel);
            this.container.appendChild(previewModel.element);
            this.parseScript(previewModel.element);
        });
    }

    clearPreview() {
        if (this.previewModel) {
            if (this.previewModel.element) {
                this.container.removeChild(this.previewModel.element);
            }
            this.previewModel = null;
        }
    }

    scrollTo(vm: BlockViewModel) {
        if (vm && vm.element) {
            this.interactor.scrollTo(vm);
        }
    }

    private parseScript(element: HTMLElement) {
        var scripts = new Array();         // Array which will store the script's code

        let strcode = element.innerHTML;
        while (strcode.indexOf("<script") > -1 || strcode.indexOf("</script") > -1) {
            var s = strcode.indexOf("<script");
            var s_e = strcode.indexOf(">", s);
            var e = strcode.indexOf("</script", s);
            var e_e = strcode.indexOf(">", e);

            scripts.push(strcode.substring(s_e + 1, e));
            strcode = strcode.substring(0, s) + strcode.substring(e_e + 1);
        }

        for (var i = 0; i < scripts.length; i++) {
            try {
                eval(scripts[i]);
            }
            catch (ex) {
                console.error('preview could not run script', ex);
            }
        }
    }

    private createElement(vm: BlockViewModel) {
        const div = document.createElement('div');
        div.innerHTML = `<div>${vm.htmlString}</div>`;
        const result = <HTMLElement>div.firstChild;
        result.style.userSelect = 'none';
        return result;
    }



    // add(vm: BlockViewModel) {
    //     // vm.element = this.createElement(vm);
    //     // this.container.append(vm.element);
    //     // this.executeScripts(vm);
    //     // if (vm.hidden) {
    //     //     vm.element.style.display = 'none';
    //     // }
    // }

    // update(vm: BlockViewModel) {
    //     // const element = vm.element;
    //     // if (!element) {
    //     //     return;
    //     // }
    //     // vm.element = this.createElement(vm);
    //     // this.container.replaceChild(vm.element, element);
    //     // this.executeScripts(vm);
    // }

    // insert(vm: BlockViewModel, index: number) {
    //     // vm.element = this.createElement(vm);
    //     // const beforeElement = this.container.children.item(index);
    //     // this.container.insertBefore(vm.element, beforeElement);
    //     // this.executeScripts(vm);
    //     // if (vm.hidden) {
    //     //     vm.element.style.display = 'none';
    //     // }
    // }

    // scrollTo(vm: BlockViewModel) {
    //     // if (vm && vm.element && !vm.hidden) {
    //     //     this.interactor.scrollTo(vm)
    //     // }
    // }

    // private createElement(vm: BlockViewModel) {
    //     // const div = document.createElement('div');
    //     // div.innerHTML = `<div>${vm.htmlString}</div>`;
    //     // const result = <HTMLElement>div.firstChild;
    //     // result.style.userSelect = 'none';
    //     // return result;
    // }


    // private executeScripts(vm: BlockViewModel) {
    //     // this.nodeScriptReplace(vm.element);
    // }

    // private nodeScriptReplace(node) {
    //     // if (this.nodeScriptIs(node) === true) {
    //     //     node.parentNode.replaceChild(this.nodeScriptClone(node), node);
    //     // }
    //     // else {
    //     //     var i = -1, children = node.childNodes;
    //     //     while (++i < children.length) {
    //     //         this.nodeScriptReplace(children[i]);
    //     //     }
    //     // }

    //     // return node;
    // }
    // private nodeScriptClone(node) {
    //     // var script = document.createElement("script");
    //     // script.text = node.innerHTML;

    //     // var i = -1, attrs = node.attributes, attr;
    //     // while (++i < attrs.length) {
    //     //     script.setAttribute((attr = attrs[i]).name, attr.value);
    //     // }
    //     // return script;
    // }

    // private nodeScriptIs(node) {
    //     // return node.tagName === 'SCRIPT';
    // }
}
