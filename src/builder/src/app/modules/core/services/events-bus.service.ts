import { Injectable, Predicate } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject, Subscription, Observable, tap, map, switchMap, switchMapTo, filter, withLatestFrom } from "rxjs";

export type Enricher = {
    filter: (item: any) => boolean;
    selector: (item: any) => any;
    reducer: (model: any, item: any) => any;
};

@Injectable({
    providedIn: 'root'
})
export class EventsBusService {
    private events$: Subject<any>;
    // private selectors: Enricher[] = [];

    constructor(private store$: Store) {
        this.events$ = new Subject();
    }

    // addStateSelector(...selectors: Enricher[]) {
    //     this.selectors.push(...selectors);
    // }

    on(matcher: Predicate<any>, handler: (item: any) => void): Subscription {
        return this.events$
            .asObservable()
            .pipe(
                filter(matcher),
                // withLatestFrom(
                //     ...this.selectors.map(x => this.store$.select(x.selector))
                // ),
                // map(items => this.selectors.reduce((acc, x, i) => x.reducer(acc, items[i + 1]), items[0])),
                tap(handler)
            )
            .subscribe();
    }

    emit(item: any) {
        this.events$.next(item);
    }
}
