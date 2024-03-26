export interface BaseMessage {
    type: string;
    sectionId: string;
    template?: TemplateContent;
    section?: MessageContent;
    index?: number;
}

export interface TemplateContent {
    settings: MessageContent;
    content: MessageContent[];
}

export interface MessageContent {
    id?: string;

    // clone
    source?: string;
    destination?: string;

    // swap
    currentIndex?: number;
    newIndex?: number;

    // block
    hidden?: boolean;

    // page
    blocks?: MessageContent[];
}
