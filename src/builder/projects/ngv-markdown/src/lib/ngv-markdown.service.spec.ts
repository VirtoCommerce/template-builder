import { TestBed } from '@angular/core/testing';

import { NgvMarkdownService } from './ngv-markdown.service';

describe('NgvMarkdownService', () => {
    let service: NgvMarkdownService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgvMarkdownService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
