export interface MultipageSelectDescriptor {
    title: string;
    alias: string;
    hasChildren?: boolean;
    children?: MultipageSelectDescriptor[];
}
