var globalLightList;

function CLight(isOn = true) {
//===============================================================================
// Constructor function:
	var isLit = isOn;						// true/false for ON/OFF

    this.name = "Undefined Light";		// text string with material name.

    this.pos = vec4.create();
	this.ambi = vec3.create();
	this.diff = vec3.create();
	this.spec = vec3.create();
}

function SetGlobalLights() {
	
	globalLightList = [];
	
	var lamp = new CLight();
    vec4.set(lamp.pos, 0, 0, 10, 1);
    vec3.set(lamp.ambi, 0.4, 0.4, 0.4);
    vec3.set(lamp.diff, 1, 1, 1);
    vec3.set(lamp.spec, 1, 1, 1);

    globalLightList.push(lamp);
    
	var lamp = new CLight();
    vec4.set(lamp.pos, 0, -10, 2, 1);
    vec3.set(lamp.ambi, 0.2, 0.2, 0.2);
    vec3.set(lamp.diff, .7, .7, .7);
    vec3.set(lamp.spec, 2, 2, .3);
    
    globalLightList.push(lamp);
    
}