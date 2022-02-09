import { Environment } from './environment';
import { BlockViewModel } from './models';
import { measureElement } from './helpers';

export class PreviewInteractor {

    private currentUrl: string;
    private preview1: HTMLIFrameElement;
    private previewA: HTMLIFrameElement;

    private primary: HTMLIFrameElement;
    private underlay: HTMLIFrameElement;

    constructor() { }

    init() {
        this.preview1 = this.preparePreview('preview-1')
        this.previewA = this.preparePreview('preview-a')
        
        this.primary = this.preview1;
        this.underlay = this.previewA;
    }

    togglePreview() {
        const t = this.primary;
        this.primary = this.underlay;
        this.underlay = t;
        this.setIFrameUrl(this.currentUrl);
    }

    private preparePreview(id: string): HTMLIFrameElement {
        const result = <HTMLIFrameElement>document.getElementById(id);
        result.addEventListener('load', () => this.previewLoaded());
        return result;
    }

    scrollTo(vm: BlockViewModel) {
        const rect = measureElement(vm.element);
        const targetPosition = rect.top - window.innerHeight / 10;
        window.scroll({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    setIFrameUrl(url: string) {
        if (!this.primary) return;
        let targetUrl = this.addUrlParameter(url);
        this.primary.contentWindow.location.href = targetUrl;
        this.currentUrl = targetUrl;
        console.info(`preview url is set to ${targetUrl}`);
    }

    private attachUrlChangeListener() {
        this.primary.contentWindow.removeEventListener('unload', this.unloadHandler);
        this.primary.contentWindow.addEventListener('unload', this.unloadHandler);
    }

    private unloadHandler = () => {
        setTimeout(() => this.dispatchChange(), 0);
    }

    private dispatchChange() {
        const newHref = this.primary.contentWindow.location.href;
        if (newHref !== this.currentUrl) {
            const targetUrl = this.addUrlParameter(newHref);
            this.setIFrameUrl(targetUrl);
        }
    }


    private previewLoaded() {
        this.attachUrlChangeListener();
        this.injectScript();
        this.primary.style.display = 'block';
        this.primary.style.zIndex = '1';
        this.underlay.style.display = 'none';
        this.underlay.style.zIndex = '0';
    }

    private injectScript() {
        if (!this.primary) return;
        var platformUrl = Environment.DesignerUrl;
        var relativeUrl = (platformUrl.endsWith('/') ? '' : '/') + 'Modules/$(VirtoCommerce.PageBuilderModule)/Content/store/designer.bundle.js';
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = platformUrl + relativeUrl;
        this.primary.contentWindow.document.body.appendChild(script);
    }

    private addUrlParameter(url: string) {
        if (url.indexOf('preview_mode') !== -1)
            return url;
        if (url.indexOf('?') === -1)
            return url + '?' + 'preview_mode=true';
        return url + '&' + 'preview_mode=true';
    }
}
