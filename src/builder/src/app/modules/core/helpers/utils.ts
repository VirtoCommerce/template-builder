import * as jp from 'jsonpath';

import { ControlDescriptor, ItemsGroup, SectionSchema } from '@core/models';

export const NO_NAME_GROUP_KEY = '__noname__';
export function groupSections(list: SectionSchema[]): ItemsGroup<SectionSchema>[] {
    if (list) {
        const groups = list.reduce((acc, value) => {
            const groupName = value.group || NO_NAME_GROUP_KEY;
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

export function spreadPropertyByOther(obj: any, keyProperty: string, spreadProperty: string): any {
    const groups = Object.keys(obj).reduce((groups, key) => {
        const group = obj[key][keyProperty];
        if (!groups) {
            return groups;
        }
        return {
            [group]: obj[key][spreadProperty],
            ...groups
        };
    }, <any>{});
    const result = Object.keys(obj).reduce((result, key) => {
        const group = obj[key][keyProperty];
        return {
            ...result,
            [key]: {
                ...obj[key],
                [spreadProperty]: group ? groups[group] : null
            }
        };
    }, {});
    return result;
}

export function generateUniqueString(length: number): string {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-';
    const randomChar = () => characters[Math.floor(Math.random() * characters.length)];
    const result = Array.from({ length }, randomChar).join('');
    return result;
}

export function onlyLettersAndDigits(value: string): string {
    if (!!value) {
        return value.replace(/[^a-zA-Z0-9]/g, '');
    }
    return value;
}

const nargs = /\{\{([0-9a-zA-Z_\.]+)\}\}/g;

export function template(value: string, ...args: any) {

    const values = (args?.length === 1 && typeof args[0] === 'object' ? args[0] : args) || {};

    return value.replace(nargs, (match, i, index) => {
        let result;

        if (value[index - 1] === '{' &&
            value[index + match.length] === '}') {
            return `{${i}}`;
        } else {
            result = getValueByPath(values, i);
            if (result === null || result === undefined) {
                return '';
            }
            return result;
        }
    });
}

export function getValueOrDefault(value: any, defaultValue: any = null) {
    if (value === 0 || value === null || value === false || value === '') {
        return value;
    }
    return value || defaultValue;
}

export function getValueByPath(model: any, path: any): any {
    const value = jp.query(model, path);
    const result = Array.isArray(value) ? value[0] : value;
    if (typeof result === 'function') {
        return null;
    }
    return result;
}

export function combine(...parts: string[]): string {
    const result = parts.reduce((acc, part, index) => {
        if (!part) {
            return acc;
        }
        if (index === 0) {
            return part;
        }
        if (acc.endsWith('/') && part.startsWith('/')) {
            return acc + part.substring(1);
        }
        if (!acc.endsWith('/') && !part.startsWith('/')) {
            return acc + '/' + part;
        }
        return acc + part;
    }, '');
    return result;
}

export function createDefaultObject(settings: ControlDescriptor[]) {
    return settings.filter(x => typeof(x.default) !== 'undefined').reduce((acc, value) => ({...acc, [<string>value.id] : value.default}), {});
}

export function toList(obj: any, keyPropertyName: string) {
    return Object.keys(obj).map(key => ({ [keyPropertyName]: key, ...obj[key] }));
}

export function tryParseJson(value: string): any {
    try {
        return JSON.parse(value);
    } catch (e) {
        return null;
    }
}
