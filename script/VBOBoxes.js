//=============================================================================
function VboBoxScene0() {
    VboBoxPrev.call(this);
}

VboBoxScene0.prototype = Object.create(VboBoxPrev.prototype);
VboBoxScene0.prototype.constructor = VboBoxScene1;

VboBoxScene0.prototype.draw = function () {
//=============================================================================
// Render current VBObox contents.

    VboBoxPrev.prototype.draw.apply(this, arguments);

    // check: was WebGL context set to use our VBO & shader program?
    if (this.isReady() == false) {
        console.log('ERROR! before' + this.constructor.name +
            '.draw() call you needed to call this.switchToMe()!!');
    }
    // ----------------------------Draw the contents of the currently-bound VBO:
    // SPLIT UP the drawing into separate shapes, as each needs different
    // transforms in its mvpMatrix uniform.  VboBoxPrev.adjust() already set value
    // to the GPU's uniform u_mvpMat for drawing in world coords, so we're ready
    // to draw the ground-plane grid (first vertex at this.bgnGrid)

    // SAVE world-space coordinate transform-----
    // (LATER replace this naive method with a push-down stack
    //   so that we can traverse a scene-graph).
    var tmp = mat4.create();
    mat4.copy(tmp, this.mvpMat);

    // Draw each World-space object:-------------
    // xyz axes, ground-plane grid.  Uniforms already set properly.
    gl.drawArrays(gl.LINES,         // select the drawing primitive to draw,
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        // WHICH vertices to draw:  see constructor fcn to see how we
        //  filled our VBO...
        0,                          // location of 1st vertex to draw;
        // The number of vertices to draw on-screen:
        // (see constructor to understand)
        this.bgnDisk);  // draw only the axes & ground-plane.

    // Draw Model-space objects:--------------
    var tmp = mat4.create();
    mat4.copy(tmp, this.mvpMat);    // SAVE current value (needs push-down stack!)

    // 1) -----------------copy transforms for Disk 1 in CScene.initScene(0) :
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(1.0, 1.0, 1.3));
    mat4.rotate(this.mvpMat, this.mvpMat, 0.25 * Math.PI, vec3.fromValues(1, 0, 0));
    mat4.rotate(this.mvpMat, this.mvpMat, 0.25 * Math.PI, vec3.fromValues(0, 0, 1));
    // Send  new 'ModelMat' values to the GPU's 'u_ModelMat1' uniform: 
    gl.uniformMatrix4fv(this.u_mvpMatLoc,   // GPU location of the uniform
        false,              // use matrix transpose instead?
        this.mvpMat);   // send data from Javascript.
    mat4.copy(this.mvpMat, tmp);      // restore world-space mvpMat values.
    gl.drawArrays(gl.LINES,         // select the drawing primitive to draw,
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnDisk,   // location of 1st vertex to draw;
        this.bgnSphere - this.bgnDisk);  // How many vertices to draw
    
    
    // 2) -----------------copy transforms for Disk 2 in CScene.initScene(0) :
    mat4.copy(this.mvpMat, tmp); // RESTORE current value (needs push-down stack!)
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(-1.0, 1.0, 1.3));
    mat4.rotate(this.mvpMat, this.mvpMat, 0.75 * Math.PI, vec3.fromValues(1, 0, 0));
    mat4.rotate(this.mvpMat, this.mvpMat, Math.PI / 3.0, vec3.fromValues(0, 0, 1));
    // Send new 'ModelMat' values to the GPU's 'u_ModelMat1' uniform: 
    gl.uniformMatrix4fv(this.u_mvpMatLoc,   // GPU location of the uniform
        false,              // use matrix transpose instead?
        this.mvpMat);   // send data from Javascript.
    mat4.copy(this.mvpMat, tmp);      // restore world-space mvpMat values.
    gl.drawArrays(gl.LINES,         // select the drawing primitive to draw,
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnDisk,   // location of 1st vertex to draw;
        this.bgnSphere - this.bgnDisk);  // How many vertices to draw

    // 3)--------------------copy transforms for Sphere 1 in CScene.initScene(0)
    mat4.copy(this.mvpMat, tmp); // RESTORE current value (needs push-down stack!)
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(1.2, -1.0, 1.0));
    // Send  new 'ModelMat' values to the GPU's 'u_ModelMat1' uniform: 
    gl.uniformMatrix4fv(this.u_mvpMatLoc,   // GPU location of the uniform
        false,              // use matrix transpose instead?
        this.mvpMat);   // send data from Javascript.
    mat4.copy(this.mvpMat, tmp);      // restore world-space mvpMat values.
    gl.drawArrays(gl.LINE_STRIP,          // select the drawing primitive to draw,
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnSphere,     // location of 1st vertex to draw;
        this.bgnCyl - this.bgnSphere); // How many vertices to draw
    mat4.copy(this.mvpMat, tmp); // RESTORE current value (needs push-down stack!) 

    // 4)--------------------copy transforms for Sphere 1 in CScene.initScene(0)
    mat4.copy(this.mvpMat, tmp); // RESTORE current value (needs push-down stack!)
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(5.2, -1.0, 1.0));
    // Send  new 'ModelMat' values to the GPU's 'u_ModelMat1' uniform: 
    gl.uniformMatrix4fv(this.u_mvpMatLoc,   // GPU location of the uniform
        false,              // use matrix transpose instead?
        this.mvpMat);   // send data from Javascript.
    mat4.copy(this.mvpMat, tmp);      // restore world-space mvpMat values.
    gl.drawArrays(gl.LINE_STRIP,          // select the drawing primitive to draw,
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnSphere,     // location of 1st vertex to draw;
        this.bgnCyl - this.bgnSphere); // How many vertices to draw
    mat4.copy(this.mvpMat, tmp); // RESTORE current value (needs push-down stack!) 

    // 5)--------------------copy transforms for Sphere 1 in CScene.initScene(0)
    mat4.copy(this.mvpMat, tmp); // RESTORE current value (needs push-down stack!)
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(9.2, -1.0, 1.0));
    // Send  new 'ModelMat' values to the GPU's 'u_ModelMat1' uniform: 
    gl.uniformMatrix4fv(this.u_mvpMatLoc,   // GPU location of the uniform
        false,              // use matrix transpose instead?
        this.mvpMat);   // send data from Javascript.
    mat4.copy(this.mvpMat, tmp);      // restore world-space mvpMat values.
    gl.drawArrays(gl.LINE_STRIP,          // select the drawing primitive to draw,
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnSphere,     // location of 1st vertex to draw;
        this.bgnCyl - this.bgnSphere); // How many vertices to draw
    mat4.copy(this.mvpMat, tmp); // RESTORE current value (needs push-down stack!) 
}

//=============================================================================
function VboBoxScene1() {
    VboBoxPrev.call(this);
}

VboBoxScene1.prototype = Object.create(VboBoxPrev.prototype);
VboBoxScene1.prototype.constructor = VboBoxScene1;

VboBoxScene1.prototype.draw = function() {
//=============================================================================
// Render current VBObox contents.

    VboBoxPrev.prototype.draw.apply(this, arguments);

    // check: was WebGL context set to use our VBO & shader program?
    if (this.isReady() == false) {
        console.log('ERROR! before' + this.constructor.name +
            '.draw() call you needed to call this.switchToMe()!!');
    }
    // ----------------------------Draw the contents of the currently-bound VBO:
    // SPLIT UP the drawing into separate shapes, as each needs different
    // transforms in its mvpMatrix uniform.  VboBoxPrev.adjust() already set value
    // to the GPU's uniform u_mvpMat for drawing in world coords, so we're ready
    // to draw the ground-plane grid (first vertex at this.bgnGrid)

    // SAVE world-space coordinate transform-----
    // (LATER replace this naive method with a push-down stack
    //   so that we can traverse a scene-graph).
    var tmp = mat4.create();
    mat4.copy(tmp, this.mvpMat);

    // Draw each World-space object:-------------
    // xyz axes, ground-plane grid.  Uniforms already set properly.
    gl.drawArrays(gl.LINES, 	    // select the drawing primitive to draw,
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        // WHICH vertices to draw:  see constructor fcn to see how we
        //  filled our VBO...
        0, 							// location of 1st vertex to draw;
        // The number of vertices to draw on-screen:
        // (see constructor to understand)
        this.bgnDisk);  // draw only the axes & ground-plane.

    // Draw Model-space objects:--------------
    var tmp = mat4.create();
    mat4.copy(tmp, this.mvpMat);    // SAVE current value (needs push-down stack!)

    // 1)--------------------copy transforms for Sphere 1 in CScene.initScene(0)
    mat4.copy(this.mvpMat, tmp); // RESTORE current value (needs push-down stack!)
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(1.2, -1.2, 1.0));
    // Send  new 'ModelMat' values to the GPU's 'u_ModelMat1' uniform: 
    gl.uniformMatrix4fv(this.u_mvpMatLoc,	// GPU location of the uniform
        false, 				// use matrix transpose instead?
        this.mvpMat);	// send data from Javascript.
    mat4.copy(this.mvpMat, tmp);      // restore world-space mvpMat values.
    gl.drawArrays(gl.LINE_STRIP, 	      // select the drawing primitive to draw,
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnSphere, 	// location of 1st vertex to draw;
        this.bgnCyl - this.bgnSphere); // How many vertices to draw
    mat4.copy(this.mvpMat, tmp); // RESTORE current value (needs push-down stack!)  
    
    // 2)--------------------copy transforms for Sphere 2 in CScene.initScene(0)
    mat4.copy(this.mvpMat, tmp); // RESTORE current value (needs push-down stack!)
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(0, 1.0, 1.0));
    // Send  new 'ModelMat' values to the GPU's 'u_ModelMat1' uniform: 
    gl.uniformMatrix4fv(this.u_mvpMatLoc,	// GPU location of the uniform
        false, 				// use matrix transpose instead?
        this.mvpMat);	// send data from Javascript.
    mat4.copy(this.mvpMat, tmp);      // restore world-space mvpMat values.
    gl.drawArrays(gl.LINE_STRIP, 	      // select the drawing primitive to draw,
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnSphere, 	// location of 1st vertex to draw;
        this.bgnCyl - this.bgnSphere); // How many vertices to draw
    mat4.copy(this.mvpMat, tmp); // RESTORE current value (needs push-down stack!)  
    
    
    // 3)--------------------copy transforms for Sphere 3 in CScene.initScene(0)
    mat4.copy(this.mvpMat, tmp); 
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(-1.5, -0.8, 1));
    gl.uniformMatrix4fv(this.u_mvpMatLoc, false, this.mvpMat);
    mat4.copy(this.mvpMat, tmp); 
    gl.drawArrays(gl.LINE_STRIP, 
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnSphere,
        this.bgnCyl - this.bgnSphere); 
    mat4.copy(this.mvpMat, tmp);
}

//=============================================================================
function VboBoxScene2() {
    VboBoxPrev.call(this);
}

VboBoxScene2.prototype = Object.create(VboBoxPrev.prototype);
VboBoxScene2.prototype.constructor = VboBoxScene1;

VboBoxScene2.prototype.draw = function() {
//=============================================================================
// Render current VBObox contents.

    VboBoxPrev.prototype.draw.apply(this, arguments);

    // check: was WebGL context set to use our VBO & shader program?
    if (this.isReady() == false) {
        console.log('ERROR! before' + this.constructor.name +
            '.draw() call you needed to call this.switchToMe()!!');
    }
    // ----------------------------Draw the contents of the currently-bound VBO:
    // SPLIT UP the drawing into separate shapes, as each needs different
    // transforms in its mvpMatrix uniform.  VboBoxPrev.adjust() already set value
    // to the GPU's uniform u_mvpMat for drawing in world coords, so we're ready
    // to draw the ground-plane grid (first vertex at this.bgnGrid)

    // SAVE world-space coordinate transform-----
    // (LATER replace this naive method with a push-down stack
    //   so that we can traverse a scene-graph).
    var tmp = mat4.create();
    mat4.copy(tmp, this.mvpMat);

    // Draw each World-space object:-------------
    // xyz axes, ground-plane grid.  Uniforms already set properly.
    gl.drawArrays(gl.LINES,         // select the drawing primitive to draw,
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        // WHICH vertices to draw:  see constructor fcn to see how we
        //  filled our VBO...
        0,                          // location of 1st vertex to draw;
        // The number of vertices to draw on-screen:
        // (see constructor to understand)
        this.bgnDisk);  // draw only the axes & ground-plane.

    // Draw Model-space objects:--------------
    var tmp = mat4.create();
    mat4.copy(tmp, this.mvpMat);    // SAVE current value (needs push-down stack!)

    // 1)--------------------copy transforms for Cylinder 1 in CScene.initScene(2)
    mat4.copy(this.mvpMat, tmp); 
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(0, 4.0, 3.2));
    mat4.rotate(this.mvpMat, this.mvpMat, 0.45 * Math.PI, vec3.fromValues(1, 0, 0));
    gl.uniformMatrix4fv(this.u_mvpMatLoc, false, this.mvpMat);
    mat4.copy(this.mvpMat, tmp); 
    gl.drawArrays(gl.LINE_STRIP, 
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnCyl,
        this.vboVerts - this.bgnCyl); 
    mat4.copy(this.mvpMat, tmp);


    // 3)--------------------copy transforms for Sphere 3 in CScene.initScene(0)
    mat4.copy(this.mvpMat, tmp); 
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(.4, 2.0, 3));
    gl.uniformMatrix4fv(this.u_mvpMatLoc, false, this.mvpMat);
    mat4.copy(this.mvpMat, tmp); 
    gl.drawArrays(gl.LINE_STRIP, 
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnSphere,
        this.bgnCyl - this.bgnSphere); 
    mat4.copy(this.mvpMat, tmp);


    // 3)--------------------copy transforms for Sphere 3 in CScene.initScene(0)
    mat4.copy(this.mvpMat, tmp); 
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(6.0, 6.0, 6.0));
    mat4.scale(this.mvpMat, this.mvpMat, vec3.fromValues(.75, .75, .75));
    gl.uniformMatrix4fv(this.u_mvpMatLoc, false, this.mvpMat);
    mat4.copy(this.mvpMat, tmp); 
    gl.drawArrays(gl.LINE_STRIP, 
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnSphere,
        this.bgnCyl - this.bgnSphere); 
    mat4.copy(this.mvpMat, tmp);

    // 3)--------------------copy transforms for Sphere 3 in CScene.initScene(0)
    mat4.copy(this.mvpMat, tmp); 
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(-1, -2.3, 3));
    gl.uniformMatrix4fv(this.u_mvpMatLoc, false, this.mvpMat);
    mat4.copy(this.mvpMat, tmp); 
    gl.drawArrays(gl.LINE_STRIP, 
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnSphere,
        this.bgnCyl - this.bgnSphere); 
    mat4.copy(this.mvpMat, tmp);

    // 4) -----------------copy transforms for Disk 1 in CScene.initScene(0) :
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(-6, 0, 5));
    mat4.rotate(this.mvpMat, this.mvpMat, 0.45 * Math.PI, vec3.fromValues(0, 1, 0));
    mat4.scale(this.mvpMat, this.mvpMat, vec3.fromValues(3, 3, 1));
    // Send  new 'ModelMat' values to the GPU's 'u_ModelMat1' uniform: 
    gl.uniformMatrix4fv(this.u_mvpMatLoc,   // GPU location of the uniform
        false,              // use matrix transpose instead?
        this.mvpMat);   // send data from Javascript.
    mat4.copy(this.mvpMat, tmp);      // restore world-space mvpMat values.
    gl.drawArrays(gl.LINES,         // select the drawing primitive to draw,
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnDisk,   // location of 1st vertex to draw;
        this.bgnSphere - this.bgnDisk);  // How many vertices to draw
}

//=============================================================================
function VboBoxScene3() {
    VboBoxPrev.call(this);
}

VboBoxScene3.prototype = Object.create(VboBoxPrev.prototype);
VboBoxScene3.prototype.constructor = VboBoxScene1;

VboBoxScene3.prototype.draw = function() {
//=============================================================================
// Render current VBObox contents.

    VboBoxPrev.prototype.draw.apply(this, arguments);

    // check: was WebGL context set to use our VBO & shader program?
    if (this.isReady() == false) {
        console.log('ERROR! before' + this.constructor.name +
            '.draw() call you needed to call this.switchToMe()!!');
    }
    // ----------------------------Draw the contents of the currently-bound VBO:
    // SPLIT UP the drawing into separate shapes, as each needs different
    // transforms in its mvpMatrix uniform.  VboBoxPrev.adjust() already set value
    // to the GPU's uniform u_mvpMat for drawing in world coords, so we're ready
    // to draw the ground-plane grid (first vertex at this.bgnGrid)

    // SAVE world-space coordinate transform-----
    // (LATER replace this naive method with a push-down stack
    //   so that we can traverse a scene-graph).
    var tmp = mat4.create();
    mat4.copy(tmp, this.mvpMat);

    // Draw each World-space object:-------------
    // xyz axes, ground-plane grid.  Uniforms already set properly.
    gl.drawArrays(gl.LINES,         // select the drawing primitive to draw,
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        // WHICH vertices to draw:  see constructor fcn to see how we
        //  filled our VBO...
        0,                          // location of 1st vertex to draw;
        // The number of vertices to draw on-screen:
        // (see constructor to understand)
        this.bgnDisk);  // draw only the axes & ground-plane.

    // Draw Model-space objects:--------------
    var tmp = mat4.create();
    mat4.copy(tmp, this.mvpMat);    // SAVE current value (needs push-down stack!)

    // 4) -----------------copy transforms for Disk 1 in CScene.initScene(0) :
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(0, 6, 3));
    mat4.rotate(this.mvpMat, this.mvpMat, 0.505 * Math.PI, vec3.fromValues(1, 0, 0));
    mat4.scale(this.mvpMat, this.mvpMat, vec3.fromValues(3, 3, 1));
    // Send  new 'ModelMat' values to the GPU's 'u_ModelMat1' uniform: 
    gl.uniformMatrix4fv(this.u_mvpMatLoc,   // GPU location of the uniform
        false,              // use matrix transpose instead?
        this.mvpMat);   // send data from Javascript.
    mat4.copy(this.mvpMat, tmp);      // restore world-space mvpMat values.
    gl.drawArrays(gl.LINES,         // select the drawing primitive to draw,
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnDisk,   // location of 1st vertex to draw;
        this.bgnSphere - this.bgnDisk);  // How many vertices to draw

    // 4) -----------------copy transforms for Disk 1 in CScene.initScene(0) :
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(0, -12, 3));
    mat4.rotate(this.mvpMat, this.mvpMat, 0.495 * Math.PI, vec3.fromValues(1, 0, 0));
    mat4.scale(this.mvpMat, this.mvpMat, vec3.fromValues(3, 3, 1));
    // Send  new 'ModelMat' values to the GPU's 'u_ModelMat1' uniform: 
    gl.uniformMatrix4fv(this.u_mvpMatLoc,   // GPU location of the uniform
        false,              // use matrix transpose instead?
        this.mvpMat);   // send data from Javascript.
    mat4.copy(this.mvpMat, tmp);      // restore world-space mvpMat values.
    gl.drawArrays(gl.LINES,         // select the drawing primitive to draw,
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnDisk,   // location of 1st vertex to draw;
        this.bgnSphere - this.bgnDisk);  // How many vertices to draw

    // 1)--------------------copy transforms for Cylinder 1 in CScene.initScene(2)
    mat4.copy(this.mvpMat, tmp); 
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(-1.6, 0, 1));
    mat4.rotate(this.mvpMat, this.mvpMat, 0.45 * Math.PI, vec3.fromValues(0, 1, 0));
    mat4.scale(this.mvpMat, this.mvpMat, vec3.fromValues(0.8, 0.8, 0.6));
    gl.uniformMatrix4fv(this.u_mvpMatLoc, false, this.mvpMat);
    mat4.copy(this.mvpMat, tmp); 
    gl.drawArrays(gl.LINE_STRIP, 
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnCyl,
        this.vboVerts - this.bgnCyl); 
    mat4.copy(this.mvpMat, tmp);

    // 3)--------------------copy transforms for Sphere 3 in CScene.initScene(0)
    mat4.copy(this.mvpMat, tmp); 
    mat4.translate(this.mvpMat, this.mvpMat, vec3.fromValues(1.2, -0.2, 1.0));
    gl.uniformMatrix4fv(this.u_mvpMatLoc, false, this.mvpMat);
    mat4.copy(this.mvpMat, tmp); 
    gl.drawArrays(gl.LINE_STRIP, 
        // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
        //          gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
        this.bgnSphere,
        this.bgnCyl - this.bgnSphere); 
    mat4.copy(this.mvpMat, tmp);

}