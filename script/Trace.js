CScene.prototype.traceRayColor = function (eyeRay) {

    var hit = new CHit(); // holds the nearest ray/grid intersection (if any)
                            // found by tracing eyeRay thru all CGeom objects
                            // held in our CScene.item[] array.

    hit.init();     // start by clearing our 'nearest hit-point', and

    for (k = 0; k < this.item.length; k++) {  // for every CGeom in item[] array,
        this.item[k].traceMe(eyeRay, hit);  // trace eyeRay thru it
    }                              // & keep nearest hit point in hit
    
    return this.findShade(hit);
}

// var printed = false;

CScene.prototype.findShade = function (hit) {

    // ======================================================================
    // returns Material Color

    var color = vec4.create(); // floating-point RGBA color value


    // Find eyeRay color from hit----------------------------------------
    if (hit.hitGeom.mat != null) {
        // Has material
        
        // Phong Shader
        
        var color3d = vec3.create(); // floating-point RGBA color value
        
        var ambient = vec3.create();
        var diffuse = vec3.create();
        var specular = vec3.create();
        
        var lamp;
        
        for (var i = 0; i < globalLightList.length; i++) {
            
            // Check whether the light source is covered
            
            // var lightRay = new CRay();   
            // vec4.copy(lightRay.orig, hit.hitPt);   // memory-to-memory copy. 
            // vec4.copy(lightRay.dir, );
            
            lamp = globalLightList[i];
            
            var t = vec4.create();
            var C2 = vec4.create();
            
            var lightDirection = vec4.create();
            var eyeDirection = vec4.create();
            var reflectDirection = vec4.create();
    
            vec4.sub(t, lamp.pos, hit.hitPt);
            vec4.normalize(lightDirection, t);
    
            vec4.copy(eyeDirection, hit.viewN);
            // already normalized
    
            var nDotL = Math.max(vec4.dot(lightDirection, hit.surfNorm), 0);
            
            C2 = vec4.scale(C2, hit.surfNorm, vec4.dot(lightDirection, hit.surfNorm) * 2);
            vec4.sub(reflectDirection, C2, lightDirection);
            
            var RdotV = Math.max(vec4.dot(reflectDirection, eyeDirection), 0);
            var e64 = Math.pow(RdotV, hit.hitGeom.mat.shiny);
            
            vec4.mul(t, hit.hitGeom.mat.ambi, lamp.ambi);
            vec4.add(ambient, ambient, t);
            
            vec4.mul(t, hit.hitGeom.mat.diff, lamp.diff);
            vec4.scaleAndAdd(diffuse, diffuse, t, nDotL);
            
            vec4.mul(t, hit.hitGeom.mat.spec, lamp.spec);
            vec4.scaleAndAdd(specular, specular, t, e64);
            
        }
        
        vec4.copy(color, hit.hitGeom.mat.emit);
        vec4.add(color, color, ambient);
        vec4.add(color, color, diffuse);
        vec4.add(color, color, specular);
        
        // vec4.set(t4, color3d[0], color3d[1], color3d[2], 0);
        // vec4.add(color, color, t4);
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