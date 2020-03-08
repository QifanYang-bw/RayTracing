// Originated from materials_Ayerdi.js

// 2015.03.08   courtesy Alex Ayerdi
// 2016.02.22		J. Tumblin revised comments & return value names
// 2016.03.01		J. Tumblin added K_name member; added data members to hold
//							GPU's 'uniform' locations for its MatlT struct members;
//							added 'setMatl()' function to allow change of materials without
//							calling constructor (it discards GPU locations kept in uLoc_XX).
//------------------------------------------------------------------------------

var MATL_RED_PLASTIC =    1;
var MATL_GRN_PLASTIC =    2;
var MATL_BLU_PLASTIC =    3;
var MATL_BLACK_PLASTIC =  4;
var MATL_BLACK_RUBBER =   5;
var MATL_BRASS =          6;
var MATL_BRONZE_DULL =    7;
var MATL_BRONZE_SHINY =   8;
var MATL_CHROME =         9;
var MATL_COPPER_DULL =   10;
var MATL_COPPER_SHINY =  11;
var MATL_GOLD_DULL =     12;
var MATL_GOLD_SHINY =    13;
var MATL_PEWTER =        14;
var MATL_SILVER_DULL =   15;
var MATL_SILVER_SHINY =  16;
var MATL_EMERALD =       17;
var MATL_JADE =          18;
var MATL_OBSIDIAN =      19;
var MATL_PEARL =         20;
var MATL_RUBY =          21;
var MATL_TURQUOISE =     22;

// var MATL_TURQUOISE =     22;

var MATL_DEFAULT =       0; // (used for unrecognized material names)

function CMaterial(opt_Matl) {
//==============================================================================
// Constructor:  use these defaults:

	this.name = "Undefined Material";		// text string with material name.

	this.emit = vec4.create();		// JS arrays that hold 4 (not 3!) reflectance values: 
											// r,g,b,a where 'a'==alpha== opacity; usually 1.0.
											// (Opacity is part of this set of measured materials)
	this.ambi = vec4.create();
	this.diff = vec4.create();
	this.spec = vec4.create();
	this.shiny = 0.0;
	// this.matlNum = MATL_DEFAULT;				// material number.
	

	// THEN: ?Did the user specified a valid material?
	if(		opt_Matl && opt_Matl >=0)	{		
		this.setMatl(opt_Matl);			// YES! set the reflectance values (xx)
	}

	return this;
}


CMaterial.prototype.setMatl = function(nuMatl) {
//==============================================================================
// Call this member function to change the Ke,Ka,Kd,Ks members of this object 
// to describe the material whose identifying number is 'nuMatl' (see list of
// these numbers and material names at the top of this file).
// This function DOES NOT CHANGE values of any of its uLoc_XX member variables.

	switch(nuMatl)
	{
		case MATL_RED_PLASTIC: // 1
			vec4.set(this.emit, 0.0,     0.0,    0.0,    1.0);
			
			
			vec4.set(this.ambi,  0.1,     0.1,    0.1,    1.0);
			vec4.set(this.diff,  0.6,     0.0,    0.0,    1.0);
			vec4.set(this.spec,  0.6,     0.6,    0.6,    1.0);   
			this.shiny = 100.0;
			this.name = "MATL_RED_PLASTIC";
			break;
		case MATL_GRN_PLASTIC: // 2
			vec4.set(this.emit, 0.0,     0.0,    0.0,    1.0);
			vec4.set(this.ambi,  0.05,    0.05,   0.05,   1.0);
			vec4.set(this.diff,  0.0,     0.6,    0.0,    1.0);
			vec4.set(this.spec,  0.2,     0.2,    0.2,    1.0);   
			this.shiny = 60.0;
			this.name = "MATL_GRN_PLASTIC";
			break;
		case MATL_BLU_PLASTIC: // 3
			vec4.set(this.emit, 0.0,     0.0,    0.0,    1.0);
			vec4.set(this.ambi,  0.05,    0.05,   0.05,   1.0);
			vec4.set(this.diff,  0.0,     0.2,    0.6,    1.0);
			vec4.set(this.spec,  0.1,     0.2,    0.3,    1.0);   
			this.shiny = 5.0;
			this.name = "MATL_BLU_PLASTIC";
			break;
		case MATL_BLACPLASTIC:
			vec4.set(this.emit, 0.0,     0.0,    0.0,    1.0);
			vec4.set(this.ambi,  0.0,     0.0,    0.0,    1.0);
			vec4.set(this.diff,  0.01,    0.01,   0.01,   1.0);
			vec4.set(this.spec,  0.5,     0.5,    0.5,    1.0);   
			this.shiny = 32.0;
			this.name = "MATL_BLACPLASTIC";
			break;
		case MATL_BLACRUBBER:
			vec4.set(this.emit, 0.0,     0.0,    0.0,    1.0);
			vec4.set(this.ambi,  0.02,    0.02,   0.02,   1.0);
			vec4.set(this.diff,  0.01,    0.01,   0.01,   1.0);
			vec4.set(this.spec,  0.4,     0.4,    0.4,    1.0);   
			this.shiny = 10.0;
			this.name = "MATL_BLACRUBBER";
			break;
		case MATL_BRASS:
			vec4.set(this.emit, 0.0,      0.0,      0.0,      1.0);
			vec4.set(this.ambi,  0.329412, 0.223529, 0.027451, 1.0);
			vec4.set(this.diff,  0.780392, 0.568627, 0.113725, 1.0);
			vec4.set(this.spec,  0.992157, 0.941176, 0.807843, 1.0);   
			this.shiny = 27.8974;
			this.name = "MATL_BRASS";
			break;
		case MATL_BRONZE_DULL:
			vec4.set(this.emit, 0.0,      0.0,      0.0,      1.0);
			vec4.set(this.ambi,  0.2125,   0.1275,   0.054,    1.0);
			vec4.set(this.diff,  0.714,    0.4284,   0.18144,  1.0);
			vec4.set(this.spec,  0.393548, 0.271906, 0.166721, 1.0);  
			this.shiny = 25.6;
			this.name = "MATL_BRONZE_DULL";
			break;
		case MATL_BRONZE_SHINY:
			vec4.set(this.emit, 0.0,      0.0,      0.0,      1.0);
			vec4.set(this.ambi,  0.25,     0.148,    0.06475,  1.0);
			vec4.set(this.diff,  0.4,      0.2368,   0.1036,   1.0);
			vec4.set(this.spec,  0.774597, 0.458561, 0.200621, 1.0);  
			this.shiny = 76.8;
			this.name = "MATL_BRONZE_SHINY";
			break;
		case MATL_CHROME:
			vec4.set(this.emit, 0.0,      0.0,      0.0,      1.0);
			vec4.set(this.ambi,  0.25,     0.25,     0.25,     1.0);
			vec4.set(this.diff,  0.4,      0.4,      0.4,      1.0);
			vec4.set(this.spec,  0.774597, 0.774597, 0.774597, 1.0);  
			this.shiny = 76.8;
			this.name = "MATL_CHROME";
			break;
		case MATL_COPPER_DULL:
			vec4.set(this.emit, 0.0,      0.0,      0.0,      1.0);
			vec4.set(this.ambi,  0.19125,  0.0735,   0.0225,   1.0);
			vec4.set(this.diff,  0.7038,   0.27048,  0.0828,   1.0);
			vec4.set(this.spec,  0.256777, 0.137622, 0.086014, 1.0);  
			this.shiny = 12.8;
			this.name = "MATL_COPPER_DULL";
			break;
		case MATL_COPPER_SHINY:
			vec4.set(this.emit, 0.0,      0.0,      0.0,       1.0);
			vec4.set(this.ambi,  0.2295,   0.08825,  0.0275,    1.0);
			vec4.set(this.diff,  0.5508,   0.2118,   0.066,     1.0);
			vec4.set(this.spec,  0.580594, 0.223257, 0.0695701, 1.0);  
			this.shiny = 51.2;
			this.name = "MATL_COPPER_SHINY";
			break;
		case MATL_GOLD_DULL:
			vec4.set(this.emit, 0.0,      0.0,      0.0,      1.0);
			vec4.set(this.ambi,  0.24725,  0.1995,   0.0745,   1.0);
			vec4.set(this.diff,  0.75164,  0.60648,  0.22648,  1.0);
			vec4.set(this.spec,  0.628281, 0.555802, 0.366065, 1.0);  
			this.shiny = 51.2;
			this.name = "MATL_GOLD_DULL";
			break;
		case MATL_GOLD_SHINY:
			vec4.set(this.emit, 0.0,      0.0,      0.0,      1.0);
			vec4.set(this.ambi,  0.24725,  0.2245,   0.0645,   1.0);
			vec4.set(this.diff,  0.34615,  0.3143,   0.0903,   1.0);
			vec4.set(this.spec,  0.797357, 0.723991, 0.208006, 1.0);  
			this.shiny = 83.2;
			this.name = "MATL_GOLD_SHINY";
			break;
		case MATL_PEWTER:
			vec4.set(this.emit, 0.0,      0.0,      0.0,      1.0);
			vec4.set(this.ambi,  0.105882, 0.058824, 0.113725, 1.0);
			vec4.set(this.diff,  0.427451, 0.470588, 0.541176, 1.0);
			vec4.set(this.spec,  0.333333, 0.333333, 0.521569, 1.0);  
			this.shiny = 9.84615;
			this.name = "MATL_PEWTER";
			break;
		case MATL_SILVER_DULL:
			vec4.set(this.emit, 0.0,      0.0,      0.0,      1.0);
			vec4.set(this.ambi,  0.19225,  0.19225,  0.19225,  1.0);
			vec4.set(this.diff,  0.50754,  0.50754,  0.50754,  1.0);
			vec4.set(this.spec,  0.508273, 0.508273, 0.508273, 1.0);  
			this.shiny = 51.2;
			this.name = "MATL_SILVER_DULL";
			break;
		case MATL_SILVER_SHINY:
			vec4.set(this.emit, 0.0,      0.0,      0.0,      1.0);
			vec4.set(this.ambi,  0.23125,  0.23125,  0.23125,  1.0);
			vec4.set(this.diff,  0.2775,   0.2775,   0.2775,   1.0);
			vec4.set(this.spec,  0.773911, 0.773911, 0.773911, 1.0);  
			this.shiny = 89.6;
			this.name = "MATL_SILVER_SHINY";
			break;
		case MATL_EMERALD:
			vec4.set(this.emit, 0.0,     0.0,      0.0,     1.0);
			vec4.set(this.ambi,  0.0215,  0.1745,   0.0215,  0.55);
			vec4.set(this.diff,  0.07568, 0.61424,  0.07568, 0.55);
			vec4.set(this.spec,  0.633,   0.727811, 0.633,   0.55);   
			this.shiny = 76.8;
			this.name = "MATL_EMERALD";
			break;
		case MATL_JADE:
			vec4.set(this.emit, 0.0,      0.0,      0.0,      1.0);
			vec4.set(this.ambi,  0.135,    0.2225,   0.1575,   0.95);
			vec4.set(this.diff,  0.54,     0.89,     0.63,     0.95);
			vec4.set(this.spec,  0.316228, 0.316228, 0.316228, 0.95);   
			this.shiny = 12.8;
			this.name = "MATL_JADE";
			break;
		case MATL_OBSIDIAN:
			vec4.set(this.emit, 0.0,      0.0,      0.0,      1.0);
			vec4.set(this.ambi,  0.05375,  0.05,     0.06625,  0.82);
			vec4.set(this.diff,  0.18275,  0.17,     0.22525,  0.82);
			vec4.set(this.spec,  0.332741, 0.328634, 0.346435, 0.82);   
			this.shiny = 38.4;
			this.name = "MATL_OBSIDIAN";
			break;
		case MATL_PEARL:
			vec4.set(this.emit, 0.0,      0.0,      0.0,      1.0);
			vec4.set(this.ambi,  0.25,     0.20725,  0.20725,  0.922);
			vec4.set(this.diff,  1.0,      0.829,    0.829,    0.922);
			vec4.set(this.spec,  0.296648, 0.296648, 0.296648, 0.922);   
			this.shiny = 11.264;
			this.name = "MATL_PEARL";
			break;
		case MATL_RUBY:
			vec4.set(this.emit, 0.0,      0.0,      0.0,      1.0);
			vec4.set(this.ambi,  0.1745,   0.01175,  0.01175,  0.55);
			vec4.set(this.diff,  0.61424,  0.04136,  0.04136,  0.55);
			vec4.set(this.spec,  0.727811, 0.626959, 0.626959, 0.55);   
			this.shiny = 76.8;
			this.name = "MATL_RUBY";
			break;
		case MATL_TURQUOISE: // 22
			vec4.set(this.emit, 0.0,      0.0,      0.0,      1.0);
			vec4.set(this.ambi,  0.1,      0.18725,  0.1745,   0.8);
			vec4.set(this.diff,  0.396,    0.74151,  0.69102,  0.8);
			vec4.set(this.spec,  0.297254, 0.30829,  0.306678, 0.8);   
			this.shiny = 12.8;
			this.name = "MATL_TURQUOISE";
			break;
		default:
			// ugly featureless (emissive-only) red:
			vec4.set(this.emit, 0.5, 0.0, 0.0, 1.0); // DEFAULT: ugly RED emissive light only
			vec4.set(this.ambi,  0.0, 0.0, 0.0, 1.0); // r,g,b,alpha  ambient reflectance
			vec4.set(this.diff,  0.0, 0.0, 0.0, 1.0); //              diffuse reflectance
			vec4.set(this.spec,  0.0, 0.0, 0.0, 1.0); //              specular reflectance
			this.shiny = 1.0;       // Default (don't set specular exponent to zero!)
			this.name = "DEFAULT_RED";
			break;
	}
	// console.log('set to:', this.K_name, '\n');
	return this;
}