import { BaseControlDescriptor } from "./base-control.descriptor";
import { ControlDescriptor } from './index';
import { AssetsRequest } from "../http";

export interface FilesDescriptor extends BaseControlDescriptor {
    multiple?: boolean;
    sortable?: boolean;
    accept?: string;
    collapseThreshold?: number;
    collapseCount?: number;
    skipRemoveConfirmation?: boolean;
    removeMessage?: string;

    urlField?: string;
    filenameField?: string;

    element: ControlDescriptor[];

    uploadAssetsRequest?: AssetsRequest | string;
}
