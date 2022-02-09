import { Initializator } from './init/initializator.bridge';
import { ServiceLocator } from './service-locator';

function startApp() {
    const initializator = new Initializator();
    initializator.preStart();

    const app = ServiceLocator.createApp();
    app.run();

    initializator.postStart();
}

startApp();
