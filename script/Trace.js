
CScene.prototype.traceRayColor = function (eyeRay) {

    var color = vec4.create(); // floating-point RGBA color value
    var myHit = new CHit(); // holds the nearest ray/grid intersection (if any)
                            // found by tracing eyeRay thru all CGeom objects
                            // held in our CScene.item[] array.

    myHit.init();     // start by clearing our 'nearest hit-point', and

    for (k = 0; k < this.item.length; k++) {  // for every CGeom in item[] array,
        this.item[k].traceMe(eyeRay, myHit);  // trace eyeRay thru it
    }                              // & keep nearest hit point in myHit
 
    // ======================================================================

    //                          Material Color

    // ======================================================================


    // Find eyeRay color from myHit----------------------------------------
    if (myHit.hitNum == 0) {  // use myGrid tracing to determine color
        vec4.copy(color, myHit.hitGeom.gapColor);
    } else if (myHit.hitNum == 1) {
        vec4.copy(color, myHit.hitGeom.lineColor);
    } else { // if myHit.hitNum== -1)
        vec4.copy(color, this.skyColor);
    }

    return color;
}

CScene.prototype.findShade = function (hit) {

}