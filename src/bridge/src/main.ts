function startApp(frame, platformUrl) {
    console.log(frame);
    window.addEventListener('message', (event) => {
        // todo: get url from parameters from preview template?? or something else
        if (event.data.source === 'builder') {
            console.log('builder => preview', event);
            frame.contentWindow.postMessage(event.data, window.location.origin);
        } else if (event.data.source === 'preview') {
            console.log('preview => builder', event);
            window.parent.postMessage(event.data, platformUrl);
        }
    });
}

window['designerPreviewApp'] = startApp;
