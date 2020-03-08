
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
