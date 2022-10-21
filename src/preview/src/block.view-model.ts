import { MessageContent } from './models';

export class BlockViewModel {
    id: string;
    source: MessageContent;
    element: HTMLElement;
    htmlString: string;
    hidden: boolean;
    isPreview: boolean;
}
