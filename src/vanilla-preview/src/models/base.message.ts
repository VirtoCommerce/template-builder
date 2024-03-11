export interface BaseMessage {
    type: string;
    template?: TemplateContent;
    content: MessageContent;
}

export interface TemplateContent {
    settings: MessageContent;
    content: MessageContent[];
}

export interface MessageContent {
    id?: number;
    __index?: number;

    // clone
    source?: number;
    destination?: number;

    // swap
    currentIndex?: number;
    newIndex?: number;

    // block
    hidden?: boolean;

    // page
    blocks?: MessageContent[];
}
