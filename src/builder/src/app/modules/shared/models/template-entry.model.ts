export interface TemplateEntry {
    name: string;
    alias: string;
    previewUrl: string;
    isDefault?: boolean | null;
    children?: any;
}
