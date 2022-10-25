import { EventsDispatcher } from './events.dispatcher';
import { BlockViewModel } from './block.view-model';

export class App {
    private list: BlockViewModel[] = [];

    constructor(private dispatcher: EventsDispatcher) { }

    run() {
        this.dispatcher.handleMessage =
            (handler, msg) => {
                this.list = handler.execute(msg, this.list);
            };
        this.dispatcher.run();
    }

    public getList(): BlockViewModel[] {
        return this.list;
    }
}
