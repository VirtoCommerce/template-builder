import { Initializator } from './init/initializator.bridge';
import { ServiceLocator } from './service-locator';

function startApp(frame) {
    // const initializator = new Initializator();
    // initializator.preStart();

    // const app = ServiceLocator.createApp();
    // app.run();

    // initializator.postStart();

    console.log(frame);

    window.addEventListener('message', (event) => {
        frame.contentWindow.postMessage(event.data, 'http://localhost:2082');
    });

}

window['designerPreviewApp'] = startApp;

// startApp();
