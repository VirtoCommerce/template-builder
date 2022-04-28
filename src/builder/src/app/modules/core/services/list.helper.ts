import { Dictionary } from '@core/models';
import { Injectable } from "@angular/core";
import { SectionSchema, ItemsGroup } from '@core/models';

@Injectable({
    providedIn: 'root'
})
export class ListHelpers {
    groupSections(list: SectionSchema[]): ItemsGroup<SectionSchema>[] {
        if (list) {
            const groups = list.reduce((acc, value) => {
                const groupName = value.group || '__noname__';
                if (!acc[groupName]) {
                    acc[groupName] = <ItemsGroup<SectionSchema>>{
                        icon: value.groupIcon,
                        name: value.group,
                        items: [],
                        noname: !value.group
                    };
                }
                acc[groupName].items.push(value);
                if (!acc[groupName].icon) {
                    acc[groupName].icon = value.groupIcon;
                }
                return acc;
            }, <any>{});
            const result = Object.keys(groups).map(key => groups[key]);
            return result;
        }
        return [];
    }

    findInObjectOrFirst<T>(obj: Dictionary<T>, comparerFn: (item: T, key: string) => boolean): { key: string | null, obj: T | null } {
        const keys = Object.keys(obj);
        if (keys.length) {
            const result = keys.find(key => comparerFn(obj[key], key)) || keys[0];
            return { key: result, obj: obj[result] };
        }
        return { key: null, obj: null };
    }
}
