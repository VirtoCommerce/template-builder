import { TemplateModel } from '@editor/models';

export function getTemplateName(template: TemplateModel | null, key: string | null = null) {
    return template?.settings?.name || key || '[no name]';
}
