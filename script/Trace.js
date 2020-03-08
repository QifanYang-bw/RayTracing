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

    var lamp = new CLight();
    vec4.set(lamp.pos, 0, 0, 10, 1);
    vec3.set(lamp.ambi, 0.4, 0.4, 0.4);
    vec3.set(lamp.diff, 1, 1, 1);
    vec3.set(lamp.spec, 1, 1, 1);

    // Find eyeRay color from hit----------------------------------------
    if (hit.hitGeom.mat != null) {
        // Has material
        
        // Phong Shader
        
        var color3d = vec3.create(); // floating-point RGBA color value
        vec3.set(color3d, 0, 0, 0); // floating-point RGBA color value
        
        var ambient = vec3.fromValues(0, 0, 0);
        var diffuse = vec3.fromValues(0, 0, 0);
        var specular = vec3.fromValues(0, 0, 0);

        var t4 = vec4.create();
        var t = vec3.create();
        var C2 = vec3.create();
        
        var lightDirection = vec3.create();
        var eyeDirection = vec3.create();
        var reflectDirection = vec3.create();

        vec3.sub(t, lamp.pos, hit.hitPt);
        vec3.normalize(lightDirection, t);

        vec3.copy(eyeDirection, hit.viewN);
        // already normalized

        var nDotL = Math.max(vec3.dot(lightDirection, hit.surfNorm), 0);
        
        C2 = vec3.scale(C2, hit.surfNorm, vec3.dot(lightDirection, hit.surfNorm) * 2);
        vec3.sub(reflectDirection, C2, lightDirection);
        
        var RdotV = Math.max(vec3.dot(reflectDirection, eyeDirection), 0);
        var e64 = Math.pow(RdotV, hit.hitGeom.mat.shiny);
        
        vec3.mul(t, hit.hitGeom.mat.ambi, lamp.ambi);
        vec3.add(ambient, ambient, t);
        
        vec3.mul(t, hit.hitGeom.mat.diff, lamp.diff);
        vec3.scaleAndAdd(diffuse, diffuse, t, nDotL);
        
        vec3.mul(t, hit.hitGeom.mat.spec, lamp.spec);
        vec3.scaleAndAdd(specular, specular, t, e64);
        
        vec3.add(color3d, color3d, ambient);
        vec3.add(color3d, color3d, diffuse);
        vec3.add(color3d, color3d, specular);
        
        vec4.copy(color, hit.hitGeom.mat.emit);
        vec4.set(t4, color3d[0], color3d[1], color3d[2], 0);
        vec4.add(color, color, t4);
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