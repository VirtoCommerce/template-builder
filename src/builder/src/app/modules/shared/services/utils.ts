import { ControlDescriptor } from '@shared/models';
import * as jp from 'jsonpath';

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
