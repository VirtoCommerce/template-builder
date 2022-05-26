interface ContextMenuActionType {
    icon: string;
    title: string;
    action: string;
    selected?: boolean;
    inactive?: boolean;
}

export type ContextMenuAction = ContextMenuActionType | '|';
