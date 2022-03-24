import { TemplateModel } from './../../modules/editor/models/template.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    template: TemplateModel = <any>{
        settings: {
            name: "Product"
        },
        content: [
            {
                type: "cover-with-image",
                name: "Main slide"
            },
            {
                type: "cover-with-variations",
                name: "Cover with variations",
                title: "Headline title and some other info",
                content: "Section content",
                color: "#43ebaa",
                singleFile: "path/to/file/single-file-name.txt",
                multipleFiles: [
                    "different/urls/for/files/filename-1.ext",
                    "different/urls/for/files/filename-2.ext",
                    "different/urls/for/files/filename-3.ext",
                    "different/urls/for/files/filename-4.ext"
                ]
            },
            { type: "cover-with-variations", name: "Cover with variations" },
            { type: "cover-with-variations", name: "Cover variations" },
            {
                type: "product-info",
                name: "Product info",
                blocks: [
                    { name: "Image", type: "image" },
                    { name: "text", type: "text" }
                ]
            }
        ]
    };

    sectionsSchemas = <any>{
        'cover-with-image': {
            name: "Product details",
            icon: "image",
            displayNameProperty: 'name'
        },
        'cover-with-variations': {
            name: "Variations",
            icon: "article",
            displayNameProperty: 'name'
        },
        'product-info': {
            name: "Product",
            icon: "smartphone",
            displayNameProperty: 'name'
        }
    };

    constructor() { }

    ngOnInit(): void {
    }

}
