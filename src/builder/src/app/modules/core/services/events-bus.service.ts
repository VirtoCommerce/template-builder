import { Injectable, Predicate } from "@angular/core";
import { filter, Subject, Subscription, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EventsBusService {
    private events$: Subject<any>;

    constructor() {
        this.events$ = new Subject();
    }

    on(matcher: Predicate<any>, handler: (item: any) => void): Subscription {
        return this.events$
            .asObservable()
            .pipe(filter(matcher), tap(handler))
            .subscribe();
    }

    emit(item: any) {
        this.events$.next(item);
    }
}
