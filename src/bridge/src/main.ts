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
        // todo: get url from parameters from preview template?? or something else
        frame.contentWindow.postMessage(event.data, window.location.origin);
    });

}

window['designerPreviewApp'] = startApp;

// startApp();
