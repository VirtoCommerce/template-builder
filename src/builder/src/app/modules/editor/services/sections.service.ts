import { TemplateModel } from '@editor/models';
import { SectionModel, SectionSchema } from '@shared/models';
import { Injectable } from "@angular/core";

import { appHelpers } from '@shared/services';

@Injectable({
    providedIn: 'root'
})
export class SectionsService {

    // changeSection(sections: SectionModel[], index: number, section: SectionModel): SectionModel[] {
    //     const sourceSections = sections;
    //     const index = sourceSections.findIndex(x => x.__index === index);
    //     const element = sourceSections[index];
    //     return [...sourceSections.slice(0, index), { ...element, ...section }, ...sourceSections.slice(index + 1)];
    // }



    // cloneItem(items: SectionModel[], sourceItem: SectionModel): { items: SectionModel[], newItem: SectionModel } {
    //     const result = [...items];
    //     const newItem = <SectionModel>{ ...sourceItem };
    //     const index = result.findIndex(x => x.__uid === sourceItem.__uid);
    //     newItem.__id = this.generateItemId(newItem, true);
    //     result.splice(index + 1, 0, newItem);
    //     const resultItems = this.reindexItems(result);
    //     return {
    //         items: resultItems,
    //         newItem: resultItems.find(x => x.__id === newItem.__id)!
    //     };
    // }

    // removeItem(items: SectionModel[], item: SectionModel): SectionModel[] {
    //     const index = items.findIndex(x => x.__uid === item.__uid);
    //     const result = [...items.slice(0, index), ...items.slice(index + 1)];
    //     return this.reindexItems(result);
    // }

    // changeOrder(items: SectionModel[], previousIndex: number, currentIndex: number): SectionModel[] {
    //     const result = [...items];
    //     const section = result.splice(previousIndex, 1);
    //     // const shift = previousIndex >= currentIndex ? 0 : 1;
    //     result.splice(currentIndex, 0, ...section);
    //     return this.reindexItems(result);
    // }

    // generateItemId(item: SectionModel, force: boolean = false): string {
    //     if (item.__id && !force) {
    //         return item.__id;
    //     }
    //     return appHelpers.onlyLettersAndDigits(`${item.type}${appHelpers.generateUniqueString(4)}`);
    // }

    // private reindexBlocks(section: SectionModel): SectionModel {
    //     if (!!section.blocks) {
    //         return {
    //             ...section,
    //             blocks: section.blocks.map((x, index) => (<SectionModel>{
    //                 ...x,
    //                 __id: this.generateItemId(x),
    //                 __uid: index + 1
    //             }))
    //         };
    //     }
    //     return section;
    // }

    // private reindexItems(sections: SectionModel[]): SectionModel[] {
    //     return sections.map((x, index) => ({ ...x, __uid: index + 1 }));
    // }
}
