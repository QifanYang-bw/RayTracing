CScene.prototype.traceRayColor = function (depth, eyeRay, ignoredGeom = null) {

    if (printed2 < 10 && depth == 1){
        console.log("ray2 sample :", eyeRay);
        printed2++;
    }
        
    // if (printed < 10 && depth == 0){
    //     console.log("ray sample :", eyeRay);
    //     printed++;
    // }
    
    var hit = new CHit(); // holds the nearest ray/grid intersection (if any)
                            // found by tracing eyeRay thru all CGeom objects
                            // held in our CScene.item[] array.

    hit.init();     // start by clearing our 'nearest hit-point', and

    for (var k = 0; k < this.item.length; k++) {  // for every CGeom in item[] array,
        if (ignoredGeom !== this.item[k]) {
                       
                // if (printed3 < 10 && Math.abs(eyeRay.orig[3] - 1.) > 1e-4){
                //     console.log("error in orig.w: ", eyeRay);
                //     printed3++;
                // }
                
            this.item[k].traceMe(eyeRay, hit);  // trace eyeRay thru it
        }
    }  // & keep nearest hit point in hit
    
    return this.findShade(depth, hit);
}

var printed = 0;
var printed2 = 0;
var errorCount = 0;

var printed3 = 0;

CScene.prototype.traceShadowRay = function (shadowRay, lightSourceDist, ignoredGeom = null) {

    var hit = new CHit(); // holds the nearest ray/grid intersection (if any)
                            // found by tracing shadowRay thru all CGeom objects
                            // held in our CScene.item[] array.

    hit.init();     // start by clearing our 'nearest hit-point'
    hit.t0 = lightSourceDist;

    if (!shadowRay.isShadowRay) {
        console.log("Warning: CScene.t" +
            "raceShadowRay does not actually trace a shadow ray\n\n");
    }
    
    // Shadow Ray Detector saves some calculation effort
    for (k = 0; k < this.item.length; k++) {  // for every CGeom in item[] array,
        if (ignoredGeom !== this.item[k]) {
            this.item[k].traceMe(shadowRay, hit);  // trace shadowRay thru it
            if (hit.hitGeom !== -1) break;
        }
    }
    
    return hit.hitGeom !== -1; // true: in shadow, false: not in shadow
}


CScene.prototype.findShade = function (depth, hit) {

    // ======================================================================
    // returns Material Color

    var color = vec4.create(); // floating-point RGBA color value
    
    // Find eyeRay color from hit----------------------------------------
    if (hit.hitGeom.mat != null && hit.hitGeom !== -1) {
        // Has material
        
        // Phong Shader
        
        var ambient = vec4.create();
        var diffuse = vec4.create();
        var specular = vec4.create();
        
        var lamp, localShadowFlag;
        
        for (var i = 0; i < globalLightList.length; i++) {
            lamp = globalLightList[i];
            
            // =============================================================
            // Calculate Light Direction and Reflect Direction for multiple uses
            
            var t = vec4.create();
            var lightDirection = vec4.create();
    
            vec4.sub(t, lamp.pos, hit.hitPt);
            vec4.normalize(lightDirection, t);
            
            var C2 = vec4.create();
            var eyeDirection = vec4.create();
            var reflectDirection = vec4.create();
    
            vec4.copy(eyeDirection, hit.viewN);
            // already normalized
    
            var nDotL = Math.max(vec4.dot(lightDirection, hit.surfNorm), 0);
            
            C2 = vec4.scale(C2, hit.surfNorm, vec4.dot(lightDirection, hit.surfNorm) * 2);
            vec4.sub(reflectDirection, C2, lightDirection);
            
            // =============================================================
            // Pause Calculation ...
            // Check whether the light source is covered
            
            var shadowRay = new CRay();   
            vec4.copy(shadowRay.orig, hit.hitPt);   // memory-to-memory copy. 
            vec4.copy(shadowRay.dir, lightDirection);
            // vec4.scale(shadowRay.dir, shadowRay.dir, -1);
            shadowRay.isShadowRay = true;
            
            vec4.mul(t, hit.hitGeom.mat.ambi, lamp.ambi);
            vec4.add(ambient, ambient, t);
            
            // =============================================================
            // Resume Calculation only if not in shadow
            
            if (settings.AllowShadow)
                localShadowFlag = this.traceShadowRay(shadowRay, Math.sqrt(vec4.dist(hit.hitPt, lamp.pos)), hit.hitGeom);
            
            if (!localShadowFlag || !settings.AllowShadow) {
                
                var RdotV = Math.max(vec4.dot(reflectDirection, eyeDirection), 0);
                var e64 = Math.pow(RdotV, hit.hitGeom.mat.shiny);
                
                vec4.mul(t, hit.hitGeom.mat.diff, lamp.diff);
                vec4.scaleAndAdd(diffuse, diffuse, t, nDotL);
                
                vec4.mul(t, hit.hitGeom.mat.spec, lamp.spec);
                vec4.scaleAndAdd(specular, specular, t, e64);
            }
            
            if (hit.hitGeom.mat.allowReflect && depth < 1) { // global settings later
                var reflectRay = new CRay();   
                vec4.copy(reflectRay.orig, hit.hitPt);   // memory-to-memory copy. 
                vec4.copy(reflectRay.dir, reflectDirection);
     
                var reflectColor = this.traceRayColor(depth + 1, reflectRay, hit.hitGeom);
                vec4.scale(reflectColor, reflectColor, hit.hitGeom.mat.reflectRatio);
                
                vec4.add(color, color, reflectColor);
            }
        }
        
        vec4.copy(color, hit.hitGeom.mat.emit);
        vec4.add(color, color, ambient);
        vec4.add(color, color, diffuse);
        vec4.add(color, color, specular); // A property can be a potential problem
        
    }
    else {
        // No material, use default
        
        if (hit.hitNum == 0) {  // use myGrid tracing to determine color
            vec4.copy(color, hit.hitGeom.gapColor);
        } else if (hit.hitNum == 1) {
            vec4.copy(color, hit.hitGeom.lineColor);
        } else { // if hit.hitNum== -1)
            vec4.copy(color, this.skyColor);
        }
    }

    return color;

}