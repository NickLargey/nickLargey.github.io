// LOADING AND MANIPULATING AN IMAGE
precision mediump float; // set precision to float

varying vec2 pos; // get xy position from vertex shader
uniform sampler2D background;

main() {
  vec2 newPos = pos;
  newPos.y = 1. - newPos.y; // have to invert because image loads upside-down (because of canvas origin coord difference?)
  vec4 col = texture2D(background, newPos);

  gl_fragColor = vec4(col);

  // Grayscale Image
  // float avg = (col.r + col.g + col.b) / 3.;
  // gl_fragColor = vec4(avg, avg, avg, 1.);

}