export interface BaseMessage {
    type: string;
    sectionId: string;
    template?: TemplateContent;
    section?: MessageContent;
    index?: number;
    // swap
    currentIndex?: number;
    newIndex?: number;
    sectionIds?: string[];
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

    // block
    hidden?: boolean;

    // page
    blocks?: MessageContent[];
}
