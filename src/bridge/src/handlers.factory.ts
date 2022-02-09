import * as handlers from "./handlers";
import * as bridge from "./bridge-handlers";

export class HandlersFactory {
    private static handlers: handlers.MessageHandler[] = [
        // new handlers.AddHandler(),
        // new handlers.UpdateHandler(),
        // new handlers.CloneHandler(),
        // new handlers.HideHandler(),
        // new handlers.ShowHandler(),
        // new handlers.RemoveHandler(),
        // new handlers.PreviewHandler(),
        // new handlers.SwapHandler(),
        // new handlers.ReloadHandler(),
        // new handlers.PageHandler(),
        // new handlers.RequestSettingsHandler(),
        new bridge.InitPreviewHandler(),
        new bridge.PreviewLoadedHandler(),
        new bridge.UpdateSectionHandler()
    ];

    get(key: string): handlers.MessageHandler {
        return HandlersFactory.handlers.find(x => x.key == key);
    }
}
