// REPEATING PATTERN
precision mediump float; // set frag shader precision 

varying vec2 pos; // take in 'pos' from vertex shader

main() {
  // fract() returns decimal from number
  vec2 newPos = fract(pos * 10); // mult pos by n for n repeats;
  gl_fragColor = vec4(newPos, 1., 1.);
}