attribute vec3 aPosition; // worldspace x,y,z position;
attribute vec2 aTexCoord; // x,y coord for pixel to be sent to frag shader;

varying vec2 pos; // current pixel x,y coord for frag shader; 

void main() {
  pos = aTexCoord;

  vec4 position = vec4(aPosition, 1.0);
  position.xy = position.xy * 2. - 1.;

  // gl_Position = projection * modelView * vec4(position.xyz, 1);
  gl_position = position; 
}