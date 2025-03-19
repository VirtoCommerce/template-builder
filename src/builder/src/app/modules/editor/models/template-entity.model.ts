/*
    this item stored in database
 */
export interface TemplateEntity {
    id: string;
    storeId: string;
    cultureName: string;
    name: string;
    permalink: string;
    status: string;
    pageContent: string;

    pages: [];
    pageIds: [];

    createDate: Date;
    modifiedDate: Date;
    createdBy: string;
    modifiedBy: string;

}
