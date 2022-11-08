import { Component, OnInit, AfterViewInit, ElementRef, NgZone, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
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

    @Input() value!: MarkdownModel;

    @Input() set options(options: EasyMDE.Options) {
        // if (this.easyMDE) {
        //     this.easyMDE.options = options;
        // }
    }

    @Output() valueChanged = new EventEmitter<MarkdownModel>();

    constructor(private elementRef: ElementRef, private ngZone: NgZone) { }

    ngOnInit(): void {

        // console.log(turndown);
    }

    ngOnDestroy(): void {
        this.easyMDE?.toTextArea();
        this.easyMDE = null;
    }

    ngAfterViewInit(): void {
        this.ngZone.runOutsideAngular(() => {
            const element = document.createElement('textarea');
            this.elementRef.nativeElement.appendChild(element);
            // EasyMDE.cleanBlock
            this.easyMDE = new EasyMDE({ element });
            this.setValue();
            this.easyMDE?.codemirror.on("paste", (_: any, event: ClipboardEvent) => {
                const text = event.clipboardData?.getData('text/html');
                const result = this.turndown.turndown(text || '');
                if (result) {
                    event.preventDefault();
                    this.easyMDE?.codemirror.replaceSelection(result);
                }
            });
            this.easyMDE?.codemirror.on("change", () => {
                const markdown: string | null = this.easyMDE?.value() || null;
                const html = markdown ? marked(markdown) : null;
                this.valueChanged.emit({ markdown, html });
            });
            detector().listenTo(this.elementRef.nativeElement, () => {
                this.easyMDE?.codemirror.refresh();
            });
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
}
