export interface BaseMessage {
    type: string;
    template?: any;
    section?: any;
    block?: any;
    sectionId?: string;
    blockId?: string;
    // content: MessageContent;
}

// export interface MessageContent {
//     id?: number;
//     __index?: number;

//     // clone
//     source?: number;
//     destination?: number;

//     // swap
//     currentIndex?: number;
//     newIndex?: number;

//     // block
//     hidden?: boolean;

//     // page
//     blocks?: MessageContent[];
// }
