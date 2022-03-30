import { SectionModel, SectionSchema } from '@shared/models';
import { TemplateModel } from './../../modules/editor/models/template.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    addMode = false;
    editMode = false;

    template: TemplateModel = <any>{
        settings: {
            name: 'Product'
        },
        content: [
            {
                type: 'cover-with-image',
                name: 'Main slide'
            },
            {
                type: 'cover-with-variations',
                name: 'Cover with variations',
                title: 'Headline title and some other info',
                content: 'Section content',
                color: '#43ebaa',
                singleFile: 'path/to/file/single-file-name.txt',
                multipleFiles: [
                    'different/urls/for/files/filename-1.ext',
                    'different/urls/for/files/filename-2.ext',
                    'different/urls/for/files/filename-3.ext',
                    'different/urls/for/files/filename-4.ext'
                ]
            },
            { type: 'cover-with-variations', name: 'Cover with variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            {
                type: 'product-info',
                name: 'Product info',
                blocks: [
                    { name: 'Image', type: 'image' },
                    { name: 'text', type: 'text' }
                ]
            },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            { type: 'cover-with-variations', name: 'Cover variations' },
            {
                type: 'product-info',
                name: 'Product info',
                blocks: [
                    { name: 'Image', type: 'image' },
                    { name: 'text', type: 'text' }
                ]
            }
        ]
    };

    sectionsSchemas = <any>{
        'cover-with-image': {
            name: 'Product details',
            icon: 'image',
            displayNameProperty: 'name',
            group: 'Blog'
        },
        'cover-with-image1': {
            name: 'Product details 1',
            icon: 'image',
            displayNameProperty: 'name',
            group: 'Blog'
        },
        'cover-with-image2': {
            name: 'Product details 2',
            icon: 'image',
            displayNameProperty: 'name',
            group: 'Blog'
        },
        'cover-with-image3': {
            name: 'Product details 3',
            icon: 'image',
            displayNameProperty: 'name',
            group: 'Blog'
        },
        'cover-with-image4': {
            name: 'Product details 4',
            icon: 'image',
            displayNameProperty: 'name',
            group: 'Integration',
            groupIcon: 'image'
        },
        'cover-with-image5': {
            name: 'Product details 5',
            icon: 'image',
            displayNameProperty: 'name',
            group: 'Integration'
        },
        'cover-with-image6': {
            name: 'Product details 6',
            icon: 'image',
            displayNameProperty: 'name',
            group: 'Integration'
        },
        'cover-with-image7': {
            name: 'Product details 7',
            icon: 'image',
            displayNameProperty: 'name',
            group: 'Integration'
        },
        'cover-with-variations': {
            name: 'Variations',
            icon: 'article',
            displayNameProperty: 'name',
            settings: [
                {
                    id: 'name',
                    type: 'string',
                    label: 'Name'
                },
                {
                    id: 'title',
                    type: 'string',
                    multiline: true,
                    label: 'Title'
                },
                {
                    id: 'content',
                    type: 'text',
                    label: 'Content'
                },
                {
                    id: 'color',
                    type: 'color',
                    label: 'Color'
                },
                {
                    id: 'singleFile',
                    type: 'file',
                    label: 'Single file'
                },
                {
                    id: 'multipleFiles',
                    type: 'files',
                    label: 'Multiple files'
                }
            ]
        },
        'product-info': {
            name: 'Product',
            icon: 'smartphone',
            displayNameProperty: 'name',
            blocks: ['image', 'text']
        }
    };

    sectionsSchemasList!: SectionSchema[];

    blocksSchemas = <any>{
        image: {
            name: 'main image',
            icon: 'article',
            displayNameProperty: 'name'
        },
        text: {
            name: 'Product title',
            icon: 'article',
            displayNameProperty: 'name'
        }
    };

    context: any = {};

    constructor() { }

    ngOnInit(): void {
        // todo: must be on sectionsSchemas setter
        this.sectionsSchemasList = Object.keys(this.sectionsSchemas).map(x => ({ ...this.sectionsSchemas[x], type: x }));
    }

    addItem() {
        this.addMode = true;
    }

    editItem() {
        this.editMode = true;
    }

    closePanels() {
        this.addMode = false;
        this.editMode = false;
    }
}
