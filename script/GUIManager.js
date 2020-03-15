var datgui, settings;

function RGBIntToFloat(intArray) {
    if (intArray.length != 3) {
        console.log('function RGBIntToFloat only support vec3!')
    }

    return [intArray[0] / 255, intArray[1] / 255, intArray[2] / 255]
}

function RGBFloatToInt(floatArray) {
    if (floatArray.length != 3) {
        console.log('function RGBIntToFloat only support vec3!')
    }

    return [floatArray[0] * 255, floatArray[1] * 255, floatArray[2] * 255]
}

function initGUI() {

    datgui = new dat.GUI({
        // load: defaultSettings
    });
    settings = new SettingsManager();

    // gui.remember(settings);

    // for (var i = 0; i < lightSourceCount; i++) {
    // 	gui.remember(settings.lightSource[i]);
    // }

    var fScene = datgui.addFolder('Scenes');
    fScene.add(settings, 'SceneSelection', {
        Scene_1: 0,
        Scene_2: 1,
        Scene_3: 2,
        Scene_4: 3,
    } );

    var fRender = datgui.addFolder('Rendering');
    fRender.add(settings, 'AllowShadow');
    fRender.add(settings, 'TraceDepth', 0, 8).step(1);
    
    var fSample = datgui.addFolder('Sampling');
    fSample.add(settings, 'SuperSampling');
    fSample.add(settings, 'SampleSize', 1, 5).step(1);
    fSample.add(settings, 'Jitter');

    fScene.open();
    fRender.open();
    fSample.open();

    // for (var i = 1; i < lightSourceCount; i++) {

    //     fLamps[i] = gui.addFolder('Light #' + i);

    //     thisLight = settings.lightSource[i];

    //     fLamps[i].add(thisLight, 'isLit');
    //     fLamps[i].add(thisLight, 'x');
    //     fLamps[i].add(thisLight, 'y');
    //     fLamps[i].add(thisLight, 'z');

    //     fLamps[i].addColor(thisLight, 'ambient');
    //     fLamps[i].addColor(thisLight, 'diffusal');
    //     fLamps[i].addColor(thisLight, 'specular');

    // }
}

var SettingsManager = function () {

    this.SceneSelection = 1;

    this.AllowShadow = true;
    this.TraceDepth = 1;
    
    this.SuperSampling = true;
    this.SampleSize = 2;
    this.Jitter = true;

};
