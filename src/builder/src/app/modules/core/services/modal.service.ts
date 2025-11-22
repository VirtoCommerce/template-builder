import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
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
        return this.show(ConfirmComponent, { data: { title, icon: 'error' }, panelClass: 'confirm-dialog' });
    }

    alert(title: string): Observable<boolean> {
        return this.show(AlertComponent, { data: { title } });
    }
}
