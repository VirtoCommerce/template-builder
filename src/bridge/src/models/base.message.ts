export interface BaseMessage {
    type: string;
    content: MessageContent;
    data: any;
    model: any;
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
