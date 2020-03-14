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

    datgui.add(settings, 'AllowShadow');
    datgui.add(settings, 'TraceDepth', 0, 4).step(1);
    
    var f1 = datgui.addFolder('Sampling');
    f1.add(settings, 'SuperSampling');
    f1.add(settings, 'SampleSize', 1, 5).step(1);
    f1.add(settings, 'Jitter');

    f1.open();
}

var SettingsManager = function () {

    this.AllowShadow = true;
    this.TraceDepth = 3;
    
    this.SuperSampling = true;
    this.SampleSize = 3;
    this.Jitter = true;

};
