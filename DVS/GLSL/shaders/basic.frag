precision mediump float; // set frag shader precision 

varying vec2 pos; // take in 'pos' from vertex shader

void main() {
  // gl_fragColor = vec4(1.) // set all 4 indeces to 1.0 for white;
  // gl_fragColor = vec4(1., 0., 1., 1.) // set output to magenta;
  // gl_fragColor = vec4(pos.x, 0., 1., 1.) // set output to 1D gradient;
  gl_fragColor = vec4(pos, 1., 1.) // set output to 2D gradient;
}