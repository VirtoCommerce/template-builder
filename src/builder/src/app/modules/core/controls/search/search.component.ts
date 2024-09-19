import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';

import { from, NextObserver, Subject, takeUntil } from 'rxjs';
import { concatMap, debounceTime, map } from 'rxjs/operators';

import { BaseControlDirective } from '@core/controls';
import { AssetsService, DataService } from '@core/services';
import { EnvironmentRef } from '@integration/services';
import { DisplaySearchResult, SearchDescriptor } from '@models/controls';

import { appHelpers } from '@integration/helpers';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent extends BaseControlDirective<SearchDescriptor> {
    private readonly ngUnsubscribe$: Subject<void> = new Subject<void>();
    private searchEvent$ = new Subject<string | null>();

    @ViewChild('control') control!: ElementRef;

    override setControlValue(value: any) {
        if (!value) {
            value = { __nodata: true, __searchQuery: null };
        }
        super.setControlValue(value);
    }

    constructor(
        private environment: EnvironmentRef,
        private cdk: ChangeDetectorRef,
        private data: DataService,
        private assets: AssetsService,
    ) { super(); }

    override ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.unsubscribe();
    }

    override initContent() {
        this.searchEvent$.pipe(
            takeUntil(this.ngUnsubscribe$),
            debounceTime(this.descriptor?.debounceTime || 1000) // move to settings
        ).subscribe({
            next: (searchQuery) => {
                this.searchModel(searchQuery);
            }
        });
    }

    getButtonText(): string {
        if (this.descriptor?.button !== true) {
            return <string>this.descriptor?.button;
        }
        return 'Search';
    }

    doRequest() {
        this.searchEvent$.next(null);
    }

    private searchModel(query: string | null) {
        let value = { __nodata: true, __searchQuery: query };
        const context = { ...this.context, __searchQuery: query };

        const observer: NextObserver<any> = {
            next: ({ key, result }) => {
                value = { ...value, __nodata: value.__nodata && !result, [key]: result };
            },
            error: (error) => {
                console.error(error);
                this.setControlValue(null);
                this.onValueChanged(this.controlValue);
            },
            complete: () => {
                this.setControlValue(value);
                this.onValueChanged(this.controlValue);
                this.cdk.detectChanges();
            }
        };
        if (!!this.descriptor?.request) {
            this.data.doRequest(this.descriptor.request, context).pipe(
                takeUntil(this.ngUnsubscribe$),
                map(result => ({ key: 'value', result }))
            ).subscribe(observer);
        } else if (!!this.descriptor?.requests) {
            const keys = Object.keys(this.descriptor.requests);
            from(keys).pipe(
                takeUntil(this.ngUnsubscribe$),
                concatMap(key => {
                    const request = this.descriptor!.requests[key];
                    context.item = value;
                    return this.data.doRequest(request, context).pipe(
                        takeUntil(this.ngUnsubscribe$),
                        map(result => ({ key, result }))
                    );
                })
            ).subscribe(observer);
        }
    }

    getAssetUrl(info: DisplaySearchResult): string | null {
        if (!info || !info.path) {
            return null;
        }
        return this.assets.adjustUrl(this.getValueByKey(info), this.context);
    }

    getValueByKey(info: DisplaySearchResult): string | null {
        if (!info || !info.path) {
            return null;
        }
        return appHelpers.getValueByPath(this.controlValue.value, info.path);
    }

    isArrayDisplayInfo() {
        return !!this.descriptor?.displayInfo && Array.isArray(this.descriptor.displayInfo);
    }

    onPaste(event: ClipboardEvent) {
        const value = (event.clipboardData || this.environment.nativeWindow.clipboardData).getData('text');
        this.onTextChange(value);
    }

    override getFocusableControl(): ElementRef {
        return this.control;
    }

    onTextChange(event: Event) {
        const element = <HTMLInputElement>event.target;
        const value = element.value;
        this.searchEvent$.next(value);
    }
}
