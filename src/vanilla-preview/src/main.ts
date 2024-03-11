import { Environment } from './environment';
import { ServiceLocator } from './service-locator';

function startApp() {
    const builderUrl = window.location.search.substring(1).split('&').find(q => q.startsWith('ep='));
    if (!!builderUrl) {
        Environment.DesignerUrl = builderUrl.substring(3);
    }
    const app = ServiceLocator.createApp();
    app.run();
    ServiceLocator.getMessages().loaded();
}

window.addEventListener('click', (event) => {
    event.preventDefault();
});

startApp();
