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

    // if (printed < 100 && hit.hitGeom.shapeType == RT_SPHERE){
    //     if (printed) {
    //         console.log("surf norm sample :", hit.surfNorm);
    //     }
    //     printed++;
    // }
    
    // Find eyeRay color from hit----------------------------------------
    if (hit.hitGeom.mat != null && hit.hitGeom !== -1) {
        // Has material
        
        // Phong Shader
        
        var ambient = vec3.create();
        var diffuse = vec3.create();
        var specular = vec3.create();
        
        var lamp, localShadowFlag;
        
        for (var i = 0; i < globalLightList.length; i++) {
            lamp = globalLightList[i];
            
            // =============================================================
            // Calculate Light Direction and Reflect Direction for multiple uses

            var color3d = vec3.create(); // floating-point RGB color value
            
            var t = vec3.create();

            var lightDirection = vec3.create();
    
            vec3.sub(t, lamp.pos, hit.hitPt);
            vec3.normalize(lightDirection, t);
            
            var C2 = vec3.create();
            var eyeDirection = vec3.create();
            var reflectDirection = vec3.create();
    
            vec3.copy(eyeDirection, hit.viewN);
            // already normalized
    
            var nDotL = Math.max(vec3.dot(lightDirection, hit.surfNorm), 0);
            
            vec3.scale(C2, hit.surfNorm, vec3.dot(lightDirection, hit.surfNorm) * 2);
            vec3.sub(reflectDirection, C2, lightDirection);
            
            // =============================================================
            // Pause Calculation ...
            // Check whether the light source is covered
            
            var shadowRay = new CRay();   

            vec4.copy(shadowRay.orig, hit.hitPt);   // memory-to-memory copy. 
            vec4.set(shadowRay.dir, lightDirection[0], lightDirection[1], lightDirection[2], 0);
            // vec4.scale(shadowRay.dir, shadowRay.dir, -1);
            shadowRay.isShadowRay = true;
            
            vec3.mul(t, hit.hitGeom.mat.ambi, lamp.ambi);
            vec3.add(ambient, ambient, t);
            
            // =============================================================
            // Resume Calculation only if not in shadow
            
            if (settings.AllowShadow)
                localShadowFlag = this.traceShadowRay(shadowRay, Math.sqrt(vec3.dist(hit.hitPt, lamp.pos)), hit.hitGeom);
            
            if (!localShadowFlag || !settings.AllowShadow) {
                
                var RdotV = Math.max(vec3.dot(reflectDirection, eyeDirection), 0);
                var e64 = Math.pow(RdotV, hit.hitGeom.mat.shiny);
                
                vec3.mul(t, hit.hitGeom.mat.diff, lamp.diff);
                vec3.scaleAndAdd(diffuse, diffuse, t, nDotL);
                
                vec3.mul(t, hit.hitGeom.mat.spec, lamp.spec);
                vec3.scaleAndAdd(specular, specular, t, e64);
            }
            
        }

        // Reflection is calculated regardless of lighting status

        if (hit.hitGeom.mat.allowReflect && depth < settings.TraceDepth) {
            var C2, reflectDirection;

            vec3.scale(C2, hit.surfNorm, vec3.dot(eyeDirection, hit.surfNorm) * 2);
            vec3.sub(reflectDirection, C2, eyeDirection);

            var reflectRay = new CRay();   
            vec4.copy(reflectRay.orig, hit.hitPt);   // memory-to-memory copy.
            vec4.set(reflectRay.dir, reflectDirection[0], reflectDirection[1], reflectDirection[2], 0);
 
            var reflectColor = this.traceRayColor(depth + 1, reflectRay, hit.hitGeom);

            // vec3.scale(reflectColor, reflectColor, hit.hitGeom.mat.reflectRatio);

            vec4.mul(reflectColor, reflectColor, ambient);
            
            vec3.add(color3d, color3d, reflectColor);
            
        }
        else {

            vec3.add(color3d, color3d, ambient);

        }

        vec3.add(color3d, color3d, diffuse);
        vec3.add(color3d, color3d, specular);

        vec4.copy(color, hit.hitGeom.mat.emit);
        var t4 = vec4.create();
        vec4.set(t4, color3d[0], color3d[1], color3d[2], 0);

        vec4.add(color, color, t4); // A property can be a potential problem
        
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