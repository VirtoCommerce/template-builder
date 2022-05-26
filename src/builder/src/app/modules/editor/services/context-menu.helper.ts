import { Injectable } from "@angular/core";
import { EditorServicesModule } from '@editor/editor-services.module';
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

    getSectionsActions(item: SectionModel): ContextMenuAction[] {
        const emptyClipboardData = !this.hasClipboardData();

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

    private hasClipboardData(): boolean {
        return false;
    }
}
