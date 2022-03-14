export interface SearchableItemDescriptor {
    title: string;
    hasChildren?: boolean;
    children?: SearchableItemDescriptor[];
}
