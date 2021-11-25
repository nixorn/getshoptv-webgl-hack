// initial source https://github.com/mdn/webgl-examples/tree/gh-pages/tutorial/sample5

var cubeRotation = 0.0;

main();

//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;

  // Fragment shader program

  const fsSource = `
    void main(void) {
      gl_FragColor = vec4(0.9, 0.9, 0.06, 1);
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVertexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    }
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initBuffers(gl);

  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    drawScene(gl, programInfo, buffers, deltaTime);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers(gl) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positions = [
  0.0, 1.000, 0.076,
  0.195, 0.981, -0.064,
  0.0, 1.000, -0.064,
  0.195, 0.981, 0.076,
  0.383, 0.924, -0.064,
  0.195, 0.981, -0.064,
  0.383, 0.924, 0.076,
  0.556, 0.831, -0.064,
  0.383, 0.924, -0.064,
  0.556, 0.831, 0.076,
  0.707, 0.707, -0.064,
  0.556, 0.831, -0.064,
  0.707, 0.707, 0.076,
  0.831, 0.556, -0.064,
  0.707, 0.707, -0.064,
  0.831, 0.556, 0.076,
  0.924, 0.383, -0.064,
  0.831, 0.556, -0.064,
  0.924, 0.383, 0.076,
  0.981, 0.195, -0.064,
  0.924, 0.383, -0.064,
  0.981, 0.195, 0.076,
  1.000, 0.0, -0.064,
  0.981, 0.195, -0.064,
  1.000, 0.0, 0.076,
  0.981, -0.195, -0.064,
  1.000, 0.0, -0.064,
  0.981, -0.195, 0.076,
  0.924, -0.383, -0.064,
  0.981, -0.195, -0.064,
  0.924, -0.383, 0.076,
  0.831, -0.556, -0.064,
  0.924, -0.383, -0.064,
  0.831, -0.556, 0.076,
  0.707, -0.707, -0.064,
  0.831, -0.556, -0.064,
  0.707, -0.707, 0.076,
  0.556, -0.831, -0.064,
  0.707, -0.707, -0.064,
  0.556, -0.831, 0.076,
  0.383, -0.924, -0.064,
  0.556, -0.831, -0.064,
  0.383, -0.924, 0.076,
  0.195, -0.981, -0.064,
  0.383, -0.924, -0.064,
  0.195, -0.981, 0.076,
  0.0, -1.000, -0.064,
  0.195, -0.981, -0.064,
  0.0, -1.000, 0.076,
  -0.195, -0.981, -0.064,
  0.0, -1.000, -0.064,
  -0.195, -0.981, 0.076,
  -0.383, -0.924, -0.064,
  -0.195, -0.981, -0.064,
  -0.383, -0.924, 0.076,
  -0.556, -0.831, -0.064,
  -0.383, -0.924, -0.064,
  -0.556, -0.831, 0.076,
  -0.707, -0.707, -0.064,
  -0.556, -0.831, -0.064,
  -0.707, -0.707, 0.076,
  -0.831, -0.556, -0.064,
  -0.707, -0.707, -0.064,
  -0.831, -0.556, 0.076,
  -0.924, -0.383, -0.064,
  -0.831, -0.556, -0.064,
  -0.924, -0.383, 0.076,
  -0.981, -0.195, -0.064,
  -0.924, -0.383, -0.064,
  -0.981, -0.195, 0.076,
  -1.000, 0.0, -0.064,
  -0.981, -0.195, -0.064,
  -1.000, 0.0, 0.076,
  -0.981, 0.195, -0.064,
  -1.000, 0.0, -0.064,
  -0.981, 0.195, 0.076,
  -0.924, 0.383, -0.064,
  -0.981, 0.195, -0.064,
  -0.924, 0.383, 0.076,
  -0.831, 0.556, -0.064,
  -0.924, 0.383, -0.064,
  -0.831, 0.556, 0.076,
  -0.707, 0.707, -0.064,
  -0.831, 0.556, -0.064,
  -0.707, 0.707, 0.076,
  -0.556, 0.831, -0.064,
  -0.707, 0.707, -0.064,
  -0.556, 0.831, 0.076,
  -0.383, 0.924, -0.064,
  -0.556, 0.831, -0.064,
  -0.924, 0.383, 0.076,
  -0.383, -0.924, 0.076,
  0.924, -0.383, 0.076,
  -0.383, 0.924, 0.076,
  -0.195, 0.981, -0.064,
  -0.383, 0.924, -0.064,
  -0.195, 0.981, 0.076,
  0.0, 1.000, -0.064,
  -0.195, 0.981, -0.064,
  0.981, 0.195, -0.064,
  0.195, -0.981, -0.064,
  -0.981, -0.195, -0.064,
  0.195, 0.981, 0.076,
  0.383, 0.924, 0.076,
  0.556, 0.831, 0.076,
  0.707, 0.707, 0.076,
  0.831, 0.556, 0.076,
  0.924, 0.383, 0.076,
  0.981, 0.195, 0.076,
  1.000, 0.0, 0.076,
  0.981, -0.195, 0.076,
  0.924, -0.383, 0.076,
  0.831, -0.556, 0.076,
  0.707, -0.707, 0.076,
  0.556, -0.831, 0.076,
  0.383, -0.924, 0.076,
  0.195, -0.981, 0.076,
  0.0, -1.000, 0.076,
  -0.195, -0.981, 0.076,
  -0.383, -0.924, 0.076,
  -0.556, -0.831, 0.076,
  -0.707, -0.707, 0.076,
  -0.831, -0.556, 0.076,
  -0.924, -0.383, 0.076,
  -0.981, -0.195, 0.076,
  -1.000, 0.0, 0.076,
  -0.981, 0.195, 0.076,
  -0.924, 0.383, 0.076,
  -0.831, 0.556, 0.076,
  -0.707, 0.707, 0.076,
  -0.556, 0.831, 0.076,
  -0.383, 0.924, 0.076,
  0.383, 0.924, 0.076,
  0.195, 0.981, 0.076,
  0.0, 1.000, 0.076,
  -0.195, 0.981, 0.076,
  -0.383, 0.924, 0.076,
  -0.556, 0.831, 0.076,
  -0.707, 0.707, 0.076,
  -0.831, 0.556, 0.076,
  -0.981, 0.195, 0.076,
  -1.000, 0.0, 0.076,
  -0.981, -0.195, 0.076,
  -0.924, -0.383, 0.076,
  -0.831, -0.556, 0.076,
  -0.707, -0.707, 0.076,
  -0.556, -0.831, 0.076,
  -0.195, -0.981, 0.076,
  0.0, -1.000, 0.076,
  0.195, -0.981, 0.076,
  0.383, -0.924, 0.076,
  0.556, -0.831, 0.076,
  0.707, -0.707, 0.076,
  0.831, -0.556, 0.076,
  0.981, -0.195, 0.076,
  1.000, 0.0, 0.076,
  0.981, 0.195, 0.076,
  0.924, 0.383, 0.076,
  0.831, 0.556, 0.076,
  0.707, 0.707, 0.076,
  0.556, 0.831, 0.076,
  -0.195, 0.981, 0.076,
  0.0, 1.000, 0.076,
  -0.195, 0.981, -0.064,
  0.0, 1.000, -0.064,
  0.195, 0.981, -0.064,
  0.383, 0.924, -0.064,
  0.556, 0.831, -0.064,
  0.707, 0.707, -0.064,
  0.831, 0.556, -0.064,
  0.924, 0.383, -0.064,
  1.000, 0.0, -0.064,
  0.981, -0.195, -0.064,
  0.924, -0.383, -0.064,
  0.831, -0.556, -0.064,
  0.707, -0.707, -0.064,
  0.556, -0.831, -0.064,
  0.383, -0.924, -0.064,
  0.0, -1.000, -0.064,
  -0.195, -0.981, -0.064,
  -0.383, -0.924, -0.064,
  -0.556, -0.831, -0.064,
  -0.707, -0.707, -0.064,
  -0.831, -0.556, -0.064,
  -0.924, -0.383, -0.064,
  -1.000, 0.0, -0.064,
  -0.981, 0.195, -0.064,
  -0.924, 0.383, -0.064,
  -0.831, 0.556, -0.064,
  -0.707, 0.707, -0.064,
  -0.556, 0.831, -0.064,
  -0.383, 0.924, -0.064
]

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.
const indices = [
  0, 1, 2,
  3, 4, 5,
  6, 7, 8,
  9, 10, 11,
  12, 13, 14,
  15, 16, 17,
  18, 19, 20,
  21, 22, 23,
  24, 25, 26,
  27, 28, 29,
  30, 31, 32,
  33, 34, 35,
  36, 37, 38,
  39, 40, 41,
  42, 43, 44,
  45, 46, 47,
  48, 49, 50,
  51, 52, 53,
  54, 55, 56,
  57, 58, 59,
  60, 61, 62,
  63, 64, 65,
  66, 67, 68,
  69, 70, 71,
  72, 73, 74,
  75, 76, 77,
  78, 79, 80,
  81, 82, 83,
  84, 85, 86,
  87, 88, 89,
  90, 91, 92,
  93, 94, 95,
  96, 97, 98,
  99, 100, 101,
  0, 102, 1,
  3, 103, 4,
  6, 104, 7,
  9, 105, 10,
  12, 106, 13,
  15, 107, 16,
  18, 108, 19,
  21, 109, 22,
  24, 110, 25,
  27, 111, 28,
  30, 112, 31,
  33, 113, 34,
  36, 114, 37,
  39, 115, 40,
  42, 116, 43,
  45, 117, 46,
  48, 118, 49,
  51, 119, 52,
  54, 120, 55,
  57, 121, 58,
  60, 122, 61,
  63, 123, 64,
  66, 124, 67,
  69, 125, 70,
  72, 126, 73,
  75, 127, 76,
  78, 128, 79,
  81, 129, 82,
  84, 130, 85,
  87, 131, 88,
  132, 133, 134,
  134, 135, 132,
  135, 136, 132,
  136, 137, 138,
  138, 139, 90,
  90, 140, 141,
  141, 142, 90,
  142, 143, 90,
  143, 144, 145,
  145, 146, 91,
  91, 147, 148,
  148, 149, 150,
  150, 151, 152,
  152, 153, 92,
  92, 154, 155,
  155, 156, 92,
  156, 157, 92,
  157, 158, 159,
  159, 160, 132,
  136, 138, 132,
  138, 90, 132,
  143, 145, 91,
  91, 148, 92,
  148, 150, 92,
  150, 152, 92,
  157, 159, 92,
  159, 132, 92,
  90, 143, 91,
  132, 90, 92,
  93, 161, 94,
  96, 162, 97,
  163, 164, 165,
  165, 166, 167,
  167, 168, 169,
  169, 170, 167,
  170, 99, 167,
  99, 171, 172,
  172, 173, 99,
  173, 174, 99,
  174, 175, 100,
  175, 176, 100,
  176, 177, 100,
  100, 178, 179,
  179, 180, 181,
  181, 182, 101,
  182, 183, 101,
  183, 184, 101,
  101, 185, 186,
  186, 187, 188,
  188, 189, 190,
  190, 191, 163,
  163, 165, 167,
  100, 179, 101,
  179, 181, 101,
  101, 186, 163,
  186, 188, 163,
  188, 190, 163,
  163, 167, 99,
  99, 174, 100,
  163, 99, 101
]

  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    indices: indexBuffer,
  };
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers, deltaTime) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [0.0, 0.0, -6.0]);  // amount to translate
  // mat4.rotate(modelViewMatrix,  // destination matrix
  //             modelViewMatrix,  // matrix to rotate
  //             cubeRotation,     // amount to rotate in radians
  //             [0, 0, 1]);       // axis to rotate around (Z)
  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation * .7,// amount to rotate in radians
              [0, 1, 0]);       // axis to rotate around (X)

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  // Update the rotation for the next draw

  cubeRotation += deltaTime;
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

