// 2D GRADIENT
precision mediump float; // set precision to float

varying vec2 pos; // get xy position from vertex shader

main() {
  vec4 tl = vec4(0.5, 0.1, 0.9, 1.);
  vec4 tr = vec4(0.6, 0.3, 0.1, 1.);
  vec4 bl = vec4(0.1, 0.7, 0.3, 1.);
  vec4 br = vec4(0.9, 0.2, 0.2, 1.);
  
  
  vec4 top = mix(tl, tr, pos.x);
  vec4 bottom = mix(bl,br, pos.x);

  
  vec4 c = mix(top, bottom, pos.y);
  gl_fragColor = c;
}