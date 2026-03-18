import {
    Component,
    OnInit,
    AfterViewInit,
    ElementRef,
    NgZone,
    Input,
    Optional,
    Output,
    EventEmitter,
    OnDestroy,
    Inject
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarkdownModel } from './markdown.model';
import EasyMDE from 'easymde';
import TurndownService from 'turndown';
import { marked } from 'marked';

import { MARKDOWN_DATA_SERVICE, IMarkdownDataService } from './ngv-markdown-data.service';

// https://github.com/Ionaru/easy-markdown-editor

@Component({
    selector: 'ngv-markdown',
    imports: [],
    templateUrl: './ngv-markdown.component.html',
    styleUrls: ['./ngv-markdown.component.scss']
})
export class NgvMarkdownComponent implements OnInit, AfterViewInit, OnDestroy {

    private easyMDE: EasyMDE | null = null;
    private resizeObserver: ResizeObserver | null = null;
    private turndown = new TurndownService({
        headingStyle: 'atx',
        // hr	Any Thematic break	* * *
        // bulletListMarker	-, +, or *	*
        // codeBlockStyle	indented or fenced	indented
        // fence	``` or ~~~	```
        emDelimiter: '*',	// _ or *	_
        // strongDelimiter	** or __	**
        // linkStyle	inlined or referenced	inlined
        // linkReferenceStyle	full, collapsed, or shortcut	full
        // preformattedCode	false or true	false
    });

    @Input() styles: string[] | string = [];
    @Input() value!: MarkdownModel;
    @Input() options: any | null;
    @Input() uploader: ((file: File) => Observable<{ url: string, name: string }>) | null = null;

    @Output() valueChanged = new EventEmitter<MarkdownModel>();

    constructor(
        private elementRef: ElementRef,
        private ngZone: NgZone,
        private http: HttpClient,
        @Optional() @Inject(MARKDOWN_DATA_SERVICE) private dataService: IMarkdownDataService) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.easyMDE?.toTextArea();
        this.easyMDE = null;
        this.resizeObserver?.disconnect();
        this.resizeObserver = null;
    }

    ngAfterViewInit(): void {
        this.ngZone.runOutsideAngular(() => {
            const element = document.createElement('textarea');
            this.elementRef.nativeElement.appendChild(element);
            this.easyMDE = new EasyMDE({
                element,
                status: ["lines", "words"],
                toolbar: [
                    'bold',
                    'italic',
                    'heading',
                    '|',
                    'quote',
                    'unordered-list',
                    'ordered-list',
                    '|',
                    'link',
                    'image',
                    // '|',
                    // 'preview',
                    // 'side-by-side',
                    // 'fullscreen',
                    '|',
                    'guide',
                    // 'strikethrough',
                    // 'code',
                    // 'table',
                    // 'redo',
                    // 'undo',
                    // 'heading-bigger',
                    // 'heading-smaller',
                    // 'heading-1',
                    // 'heading-2',
                    // 'heading-3',
                    // 'clean-block',
                    // 'horizontal-rule',
                ],
                spellChecker: false,
                ...this.options || {}
            });
            this.setValue();
            this.prepareEditor();
            this.handlePasteValue();
            this.handleChangeValue();
            this.handleResizeElement();
            this.prepareStyles();
        });
    }

    private setValue(): void {
        if (this.easyMDE) {
            const mdValue = !!this.value?.markdown
                ? this.value.markdown
                : this.turndown.turndown(this.value.html || '');
            this.easyMDE.value(mdValue);
        }
    }

    private handlePasteValue() {
        this.easyMDE?.codemirror.on(<any><unknown>"paste", (_: any, event: ClipboardEvent) => {
            if (event.clipboardData) {
                if (this.tryToPasteHtml(event.clipboardData)) {
                    event.preventDefault();
                } else if (this.tryToPasteImage(event.clipboardData)) {
                    event.preventDefault();
                }
            }
        });
    }

    private tryToPasteHtml(clipboard: DataTransfer): boolean {
        const html = clipboard.getData('text/html');
        if (html) {
            const htmlWithLocalImages = this.getImagesFromHtml(html);
            const result = this.turndown.turndown(htmlWithLocalImages || '');
            if (result) {
                this.easyMDE?.codemirror.replaceSelection(result);
                return true;
            }
        }
        return false;
    }

    private tryToPasteImage(clipboard: DataTransfer): boolean {
        for (let i = 0; i < clipboard.items.length; i++) {
            const image = clipboard.items[i];
            if (image && image.type.indexOf('image') === 0) {
                const file = image.getAsFile();
                const uploader = this.getUploader();
                if (!!uploader && file) {
                    uploader(file).subscribe(result => {
                        this.ngZone.run(() => this.easyMDE?.codemirror.replaceSelection(`![${result.name}](${result.url})`));
                    });
                }
            }
        }
        return false;
    }

    private getImagesFromHtml(html: string): string | null {
        return html;
        // const div = document.createElement('div');
        // div.innerHTML = html;
        // const images = div.querySelectorAll('img');
        // if (images.length === 0) {
        //     return html;
        // }
        // const uploader = this.getUploader();
        // if (!uploader) {
        //     return null;
        // }
        // images.forEach(image => {
        //     const src = image.getAttribute('src');
        //     if (src) {
        //         const file = this.dataService.getFile(src);
        //         if (file) {
        //             uploader(file).subscribe(result => {
        //                 image.setAttribute('src', result.url);
        //             });
        //         }
        //     }
        // });
        // return div.innerHTML;
    }

    private getUploader() {
        return this.dataService ? this.dataService.saveFile : this.uploader;
    }

    private handleChangeValue() {
        this.easyMDE?.codemirror.on("change", () => {
            const markdown: string | null = this.easyMDE?.value() || null;
            const html = markdown ? marked(markdown) : null;
            this.ngZone.run(() => this.valueChanged.emit({ markdown, html }));
        });
    }

    private handleResizeElement() {
        this.resizeObserver = new ResizeObserver(() => {
            this.easyMDE?.codemirror.refresh();
        });
        this.resizeObserver.observe(this.elementRef.nativeElement);
    }

    private _styles: string[] = [];

    private prepareStyles() {
        if (!!this.styles) {
            const items = Array.isArray(this.styles) ? this.styles : [this.styles];
            const result = items.map((item, index) => {
                const currentIndex = index;
                this.http.get(item, { responseType: 'text' }).subscribe(css => {
                    this._styles[currentIndex] = css;
                });
                return '';
            });
            this._styles = result;
        } else {
            this._styles = [];
        }
    }

    private prepareEditor() {
        const cm = <any>this.easyMDE?.codemirror;
        if (cm) {
            cm.sideBySideRenderingFunction = () => {
                const wrapper = cm.getWrapperElement();
                const preview = <any>wrapper.nextSibling;
                if (preview && this.easyMDE?.isSideBySideActive()) {
                    const value = this.easyMDE?.value();
                    const html = marked(value || '');
                    preview.innerHTML = html;
                    setTimeout(() => {
                        this._styles.forEach(item => {
                            const style = document.createElement('style');
                            style.attributes.setNamedItem(document.createAttribute('scoped'));
                            style.innerHTML = item;
                            preview.insertBefore(style, preview.firstChild);
                        });
                    });
                }
            }
        }
    }
}
