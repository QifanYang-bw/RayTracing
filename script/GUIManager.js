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
    
    var cur;

    var fScene = datgui.addFolder('Scenes');
    cur = fScene.add(settings, 'SceneSelection', {
        Scene_1: 0,
        Scene_2: 1,
        Scene_3: 2,
        Scene_4: 3,
    } );
    cur.onChange(function(value) {onSceneChange();});

    var fRender = datgui.addFolder('Rendering');
    fRender.add(settings, 'AllowShadow');
    fRender.add(settings, 'TraceDepth', 0, 16).step(1);
    
    var fSample = datgui.addFolder('Sampling');
    fSample.add(settings, 'SuperSampling');
    fSample.add(settings, 'SampleSize', 1, 8).step(1);
    fSample.add(settings, 'Jitter');

    var fLights = datgui.addFolder('Lights');
    var fLamps = [];

    for (var i = 0; i < globalLightCount; i++) {
        fLamps[i] = fLights.addFolder('Light #' + i);

        thisLight = settings.lightSource[i];


        cur = fLamps[i].add(thisLight, 'isLit');
        cur.onChange(function(value) {this.object.apply();});

        cur = fLamps[i].add(thisLight, 'x');
        cur.onChange(function(value) {this.object.apply();});
        
        cur = fLamps[i].add(thisLight, 'y');
        cur.onChange(function(value) {this.object.apply();});
        
        cur = fLamps[i].add(thisLight, 'z');
        cur.onChange(function(value) {this.object.apply();});
        
        cur = fLamps[i].addColor(thisLight, 'ambient');
        cur.onChange(function(value) {this.object.apply();});
        
        cur = fLamps[i].addColor(thisLight, 'diffusal');
        cur.onChange(function(value) {this.object.apply();});
        
        cur = fLamps[i].addColor(thisLight, 'specular');
        cur.onChange(function(value) {this.object.apply();});
    }

    fScene.open();
    fRender.open();
    fSample.open();
    fLights.open();


}

var SettingsManager = function () {

    var LightManager = function(lightID) { //, isHeadLight = false) {

        this.lightID = lightID;
        this.isLit = true;

        // this.__isHeadLight = isHeadLight;

        // if (!this.__isHeadLight) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        // }

        this.ambient = [0, 0, 0];
        this.diffusal = [0, 0, 0];
        this.specular = [0, 0, 0];

    }

    LightManager.prototype.apply = function() {

        // console.log('this light test: ', this);

        globalLightList[this.lightID] = new CLight();
        var lamp = globalLightList[this.lightID];

        // console.log('changing light ', this, ' and ', lamp);

        lamp.isLit = this.isLit;

        vec4.set(lamp.pos, this.x, this.y, this.z, 1);

        vec3.copy(lamp.ambi, RGBIntToFloat(this.ambient));
        vec3.copy(lamp.diff, RGBIntToFloat(this.diffusal));
        vec3.copy(lamp.spec, RGBIntToFloat(this.specular));

    }

    this.SceneSelection = 3;

    this.AllowShadow = true;
    this.TraceDepth = 5;
    
    this.SuperSampling = true;
    this.SampleSize = 2;
    this.Jitter = true;

    this.lightSource = [];

    this.lightSource[0] = new LightManager();

    for (var i = 0; i < globalLightCount; i++) {
        this.lightSource[i] = new LightManager(i);
        this.lightSource.lightID = i;
    }

    this.lightSource[0].x = 0;
    this.lightSource[0].y = 0;
    this.lightSource[0].z = 10;

    this.lightSource[0].ambient = RGBFloatToInt([0.35, 0.35, 0.35]);
    this.lightSource[0].diffusal = RGBFloatToInt([0.4, 0.4, 0.4]);
    this.lightSource[0].specular = RGBFloatToInt([0.2, 0.2, 0.2]);

    this.lightSource[1].x = 2;
    this.lightSource[1].y = -8;
    this.lightSource[1].z = 1;

    this.lightSource[1].ambient = RGBFloatToInt([0.3, 0.3, 0.15]);
    this.lightSource[1].diffusal = RGBFloatToInt([0.9, 0.9, 0.45]);
    this.lightSource[1].specular = RGBFloatToInt([0.6, 0.6, 0.3]);

    this.lightSource[2].isLit = false;

    for (var i = 0; i < globalLightCount; i++) {
        this.lightSource[i].apply();
    }

};

// SettingsManager.prototype.applyLights = function() {

//     // Light Settings
//     for (var i = 0; i < 3; i++) {

//         var thisLight = settings.lightSource[i];
//         var lamp = globalLightList[i];

//         lamp.isLit = thisLight.isLit;

//         vec4.set(lamp.pos, thisLight.x, thisLight.y, thisLight.z, 1);

//         vec4.copy(lamp.ambi, RGBIntToFloat(thisLight.ambient));
//         vec4.copy(lamp.diff, RGBIntToFloat(thisLight.diffusal));
//         vec4.copy(lamp.spec, RGBIntToFloat(thisLight.specular));

//     }

// }