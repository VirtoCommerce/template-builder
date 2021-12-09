import { Component, OnInit } from '@angular/core';

import { BaseControlDirective } from '@shared/controls';
import { FilesDescriptor } from '@shared/models';

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.scss']
})
export class FilesComponent extends BaseControlDirective<FilesDescriptor> {

}
