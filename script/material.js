
function Material(opt_Matl) {
//==============================================================================
// Constructor:  use these defaults:

	this.K_emit = [];		// JS arrays that hold 4 (not 3!) reflectance values: 
											// r,g,b,a where 'a'==alpha== opacity; usually 1.0.
											// (Opacity is part of this set of measured materials)
	this.K_ambi = [];
	this.K_diff = [];
	this.K_spec = [];
	this.K_shiny = 0.0;
	this.K_name = "Undefined Material";		// text string with material name.
	this.K_matlNum = 	MATL_DEFAULT;				// material number.
	
	// GPU location values for GLSL struct-member uniforms (LampT struct) needed
	// to transfer K values above to the GPU. Get these values using the
	// webGL fcn 'gl.getUniformLocation()'.  False for 'not initialized'.
	this.uLoc_Ke = false;
	this.uLoc_Ka = false;
	this.uLoc_Kd = false;
	this.uLoc_Ks = false;
	this.uLoc_Kshiny = false;
	// THEN: ?Did the user specified a valid material?
	if(		opt_Matl && opt_Matl >=0 && opt_Matl < MATL_DEFAULT)	{		
		this.setMatl(opt_Matl);			// YES! set the reflectance values (K_xx)
	}
	return this;
}