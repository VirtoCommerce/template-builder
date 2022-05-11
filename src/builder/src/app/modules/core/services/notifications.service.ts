import { Injectable } from "@angular/core";
import { IndividualConfig, ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: "root"
})
export class NotificationsService {

    // todo: use options from config
    private _successOptions = {
        // timeOut: 0,
        // extendedTimeOut: 0
    };
    private _errorOptions = {};
    private _notifyOptions = {};

    constructor(private toastr: ToastrService) { }

    successLeft(message: string, options: Partial<IndividualConfig> | undefined = undefined) {
        this.success(message, {
            ...this._successOptions,
            ...options,
            positionClass: "toast-bottom-left"
        });
    }

    successRight(message: string, options: Partial<IndividualConfig> | undefined = undefined) {
        this.success(message, {
            ...this._successOptions,
            ...options,
            positionClass: "toast-top-right"
        });
    }

    errorRight(message: string, options: Partial<IndividualConfig> | undefined = undefined) {
        this.error(message, {
            ...this._successOptions,
            ...options,
            positionClass: "toast-top-right"
        });
    }

    private success(message: string, options: Partial<IndividualConfig>) {
        this.toastr.success(message, undefined, {
            ...options
        });
    }

    private error(message: string, options: Partial<IndividualConfig>) {
        this.toastr.error(message, undefined, {
            ...options
        });
    }
}
