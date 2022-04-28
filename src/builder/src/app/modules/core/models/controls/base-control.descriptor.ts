export interface BaseControlDescriptor {
    id: string; // property name
    type: string; // control type
    label?: string;
    default?: any; // default value when block created
    preview?: any; // value when block under preview

    autofocus?: boolean;
    sort?: number;

    info?: string;
    placeholder?: string;
    hint?: string;

    visibility?: string; // java-script for property visibility

    tab?: string;
    group?: string;

}
