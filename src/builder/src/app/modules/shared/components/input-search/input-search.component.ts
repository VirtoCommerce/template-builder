import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-input-search',
    templateUrl: './input-search.component.html',
    styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {

    @Output() searchChange = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void { }

    onChange(event: Event) {
        const target = <HTMLInputElement>event!.target!;
        this.searchChange.emit(target.value);
    }

}
