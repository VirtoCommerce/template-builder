import * as jp from 'jsonpath';

import { ValueDescriptorModel } from '@models/index';

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

// const nargs = /\{\{([=0-9a-zA-Z_\.]+)\}\}/g;
const nargs = /\{\{(.+?)\}\}/g;

export function template(value: string, ...args: any) {

    const values = (args?.length === 1 && typeof args[0] === 'object' ? args[0] : args) || {};

    return value.replace(nargs, (match, i, index) => {
        let result;

        if (value[index - 1] === '{' &&
            value[index + match.length] === '}') {
            return `{${i}}`;
        } else if (i.startsWith('=')){
            result = evalInContext(i.substring(1), values);
        }
        else {
            result = getValueByPath(values, i);
        }
        if (result === null || result === undefined) {
            return '';
        }
        return result;
    });
}

export function evalInContext(expr: string, context: any): any {
    return function () { return eval(expr); }.call(context);
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

export function getItemValue(item: any, descriptor: (string | ValueDescriptorModel)[]): any {
    const result: any = {};
    descriptor.forEach(p => {
        const [query, property, isArray] = typeof p === 'string' ? [p, p, null] : [p.query, p.key, p.isArray];
        const x = getValueByPath(item, query);
        result[property] = arrayCastByConfig(x, isArray);
    });
    return result;
}

export function arrayCastByConfig(item: any, isArray: boolean | null = null): any {
    if (isArray === null) {
        return item;
    }
    if (Array.isArray(item) && !isArray) {
        if (item.length > 0) {
            return item[0];
        } else {
            return null;
        }
    } else if (!Array.isArray(item) && isArray) {
        return [item];
    }
    return item;
}
