// ANIMATED SINE WAVE
precision mediump float; // set precision to float

varying vec2 pos; // get xy position from vertex shader

// have to set the uniforms to pass in time ("millis") by passing
// the milliseconds from js to fragment shader in a draw or update function.
// P5 uses exampleShader.setUniform("millis", millis()); to do this.
uniform float millis;
main() {
  float c = (sin(pos.x * 16. + millis/1000.) + 1. )/2.; // divide millis by 1000 to put into seconds, slowing down the scroll
  gl_fragColor = vec4(c, 0., 1., 1.);
}