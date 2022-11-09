import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgvMarkdownComponent } from './ngv-markdown.component';


@NgModule({
    declarations: [
        NgvMarkdownComponent
    ],
    imports: [
        HttpClientModule
    ],
    exports: [
        NgvMarkdownComponent
    ]
})
export class NgvMarkdownModule { }
