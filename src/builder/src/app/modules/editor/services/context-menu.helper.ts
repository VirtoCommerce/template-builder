import { Injectable } from "@angular/core";
import { EditorServicesModule } from '@editor/editor-services.module';

import { ClipboardService } from '@core/services';
import { ContextMenuAction, Dictionary, SectionModel } from '@core/models';

@Injectable({
    providedIn: EditorServicesModule
})
export class ContextMenuHelper {
    private items: Dictionary<ContextMenuAction> = {
        '|': '|',
        'hide': {
            action: 'hide',
            title: 'Hide',
            icon: 'visibility',
            selected: false,
            inactive: false
        },
        'show': {
            action: 'show',
            title: 'Show',
            icon: 'visibility_off',
            selected: false,
            inactive: false
        },
        'copy': {
            action: 'copy',
            title: 'Copy',
            icon: 'content_copy',
            selected: false,
            inactive: false
        },
        'paste-before': {
            action: 'paste-before',
            title: 'Paste before',
            icon: 'content_paste',
            selected: false,
            inactive: false
        },
        'paste-after': {
            action: 'paste-after',
            title: 'Paste after',
            icon: 'content_paste',
            selected: false,
            inactive: false
        },
        'paste-section': {
            action: 'paste-section',
            title: 'Paste section',
            icon: 'content_paste',
            selected: false,
            inactive: false
        },
        'paste-block': {
            action: 'paste-block',
            title: 'Paste block',
            icon: 'content_paste',
            selected: false,
            inactive: false
        },
        'paste-template': {
            action: 'paste-template',
            title: 'Paste template',
            icon: 'content_paste',
            selected: false,
            inactive: false
        },
        'duplicate': {
            action: 'duplicate',
            title: 'Duplicate',
            icon: 'file_copy',
            selected: false,
            inactive: false
        },
        'delete': {
            action: 'delete',
            title: 'Delete',
            icon: 'delete_outline'
        }
    }

    constructor(private clipboard: ClipboardService) { }

    getActions(actions: (string | [string, boolean])[]): ContextMenuAction[] {
        return actions.map(x => {
            if (typeof x === 'string') {
                return this.items[x];
            } else {
                const [alias, inactive] = x;
                const action = this.items[alias] as object;
                return <ContextMenuAction>{ ...action, inactive };
            }
        });
    }

    async getSectionsActions(item: SectionModel): Promise<ContextMenuAction[]> {
        const emptyClipboardData = !(await this.hasClipboardData(item));

        const result: (string | [string, boolean])[] = [
            item.hidden ? 'show' : 'hide',
            '|',
            'copy',
            ['paste-before', emptyClipboardData],
            ['paste-after', emptyClipboardData],
            'duplicate',
            '|',
            'delete'
        ]

        return this.getActions(result);
    }

    private async hasClipboardData(item: SectionModel): Promise<boolean> {
        const clipboardData = await this.clipboard.getData();
        return clipboardData != null &&
            (
                clipboardData.wrongData
                || (clipboardData.type === 'block' && !!item.blocks && !!item.blocks.length)
                || (clipboardData.type === 'section' && (!item.blocks || !item.blocks.length)
                )
            );
    }
}
