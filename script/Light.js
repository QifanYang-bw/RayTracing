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
    vec3.set(lamp.ambi, 1, 1, 1);
    vec3.set(lamp.diff, 0.4, 0.4, 0.4);
    vec3.set(lamp.spec, 0.2, 0.2, 0.2);

    globalLightList.push(lamp);
    
	var lamp = new CLight();
    vec4.set(lamp.pos, 2, -8, 1, 1);
    vec3.set(lamp.ambi, 0.4, 0.4, 0.2);
    vec3.set(lamp.diff, 0.9, 0.9, .45);
    vec3.set(lamp.spec, 0.6, 0.6, 0.3);
    
    globalLightList.push(lamp);
    
}