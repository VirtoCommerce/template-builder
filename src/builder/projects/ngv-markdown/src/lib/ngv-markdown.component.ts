import { Component, OnInit, AfterViewInit, ElementRef, NgZone, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarkdownModel } from './markdown.model';
import EasyMDE from 'easymde';
import detector from 'element-resize-detector';
import TurndownService from 'turndown';
import { marked } from 'marked';

// https://github.com/Ionaru/easy-markdown-editor

@Component({
    selector: 'ngv-markdown',
    templateUrl: './ngv-markdown.component.html',
    styleUrls: ['./ngv-markdown.component.scss']
})
export class NgvMarkdownComponent implements OnInit, AfterViewInit, OnDestroy {

    private easyMDE: EasyMDE | null = null;
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

    @Output() valueChanged = new EventEmitter<MarkdownModel>();

    constructor(private elementRef: ElementRef, private ngZone: NgZone, private http: HttpClient) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.easyMDE?.toTextArea();
        this.easyMDE = null;
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
                ]
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
        this.easyMDE?.codemirror.on("paste", (_: any, event: ClipboardEvent) => {
            const text = event.clipboardData?.getData('text/html');
            const result = this.turndown.turndown(text || '');
            if (result) {
                event.preventDefault();
                this.easyMDE?.codemirror.replaceSelection(result);
            }
        });
    }

    private handleChangeValue() {
        this.easyMDE?.codemirror.on("change", () => {
            const markdown: string | null = this.easyMDE?.value() || null;
            const html = markdown ? marked(markdown) : null;
            console.log(html);
            this.valueChanged.emit({ markdown, html });
        });
    }

    private handleResizeElement() {
        detector().listenTo(this.elementRef.nativeElement, () => {
            this.easyMDE?.codemirror.refresh();
        });
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
