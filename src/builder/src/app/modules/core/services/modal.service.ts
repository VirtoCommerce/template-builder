import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent, AlertComponent } from '../dialogs';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    constructor(private modals: MatDialog) { }

    show<T>(content: ComponentType<any>, config: MatDialogConfig): Observable<T> {
        const dialog = this.modals.open(content, config);
        return dialog.afterClosed();
    }

    confirm(title: string): Observable<boolean> {
        return this.show(ConfirmComponent, { data: { title } });
    }

    alert(title: string): Observable<boolean> {
        return this.show(AlertComponent, { data: { title } });
    }
}
