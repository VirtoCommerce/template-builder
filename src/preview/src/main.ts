import { Environment } from './environment';
import { ServiceLocator } from './service-locator';

function startApp() {
    const builderUrl = window.location.search.substring(1).split('&').find(q => q.startsWith('ep='));
    if (!!builderUrl) {
        Environment.DesignerUrl = builderUrl.substring(3); // "ep=".length = 3
    }
    const app = ServiceLocator.createApp();
    app.run();
    console.log('preview loaded');
    try {
        window.parent.postMessage({ source: "preview", type: "loaded" }, Environment.DesignerUrl);
    }
    catch (e) {
        debugger;
        console.log(e);
    }
}

window.addEventListener('click', (event) => {
    // ??
    event.preventDefault();
});

startApp();
