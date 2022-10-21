import * as handlers from "./handlers";

export class HandlersFactory {
    private static handlers: handlers.MessageHandler[] = [
        new handlers.UpdateHandler(),
        new handlers.PreviewHandler(),
        new handlers.SelectHandler(),
        new handlers.PageHandler()
        // new handlers.AddHandler(),
        // new handlers.CloneHandler(),
        // new handlers.HideHandler(),
        // new handlers.ShowHandler(),
        // new handlers.RemoveHandler(),
        // new handlers.SwapHandler(),
        // new handlers.ReloadHandler(),
    ];

    get(key: string): handlers.MessageHandler {
        return HandlersFactory.handlers.find(x => x.key == key);
    }
}
