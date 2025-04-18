import * as THREE from "three";
import { TrackballControls } from "../../../three.js/examples/jsm/controls/TrackballControls.js";

// Vertex Shader
const vVertexShader = `
precision mediump float;

attribute vec3 a_position;
attribute vec2 a_uv;

varying vec2 v_uv;

uniform mat4 projectionMatrix; // Declare projectionMatrix as uniform
uniform mat4 modelViewMatrix;  // Declare modelViewMatrix as uniform

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(a_position, 1.0);
  v_uv = a_uv;
}`;

// Fragment Shader
const vFragmentShader = `
precision mediump float;

uniform sampler2D u_texture;
varying vec2 v_uv;

void main() {
  gl_FragColor = texture2D(u_texture, v_uv);
}`;

// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color().setHex(0xf0f0f0);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new TrackballControls(camera, renderer.domElement);

// Video Texture
const video = document.createElement("video");
video.src = "../../assets/Max_No_Audio.mp4"; // Replace with your video path
video.loop = true;
video.muted = true;
video.autoplay = true; // Important for video textures
const texture = new THREE.VideoTexture(video);

video.addEventListener("loadeddata", () => {
  console.log("%s Video Loaded", video.src);
  video.play(); // Autoplay after video is loaded
});

video.addEventListener("error", (error) => {
  console.error("Error loading video:", error);
});

// Plane Geometry
const geometry = new THREE.PlaneGeometry(8, 6); // Adjust aspect ratio as needed

// Shader Material
const material = new THREE.ShaderMaterial({
  uniforms: {
    u_texture: { value: texture },
    projectionMatrix: { value: new THREE.Matrix4() }, // Add projection matrix
    modelViewMatrix: { value: new THREE.Matrix4() }, // Add model-view matrix
  },
  vertexShader: vVertexShader,
  fragmentShader: vFragmentShader,
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Position the camera
camera.position.z = 25; // Adjust as needed

// Animation Loop
function animate() {
  // Update resolution uniform on resize:
  material.uniforms.u_resolution.value.set(
    window.innerWidth,
    window.innerHeight
  );
  material.uniforms.u_matrix.value = plane.matrixWorld; // Update u_matrix
  // Important: Update the video texture if it's a video:
  if (vidTexture.image.readyState >= 2) {
    // Check if video is playing
    vidTexture.needsUpdate = true;
  }
  // console.log(vidTexture.image.readyState);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// function animate() {
//   requestAnimationFrame(animate);

//   // Important: Update the video texture
//   if (texture.image.readyState >= 2) {
//     texture.needsUpdate = true;
//   }
//   material.uniforms.projectionMatrix.value = camera.projectionMatrix; // Update projection matrix
//   material.uniforms.modelViewMatrix.value = camera.matrixWorldInverse.multiply(
//     plane.matrixWorld
//   ); // Update model-view matrix
//   // setTimeout(() => {
//   //   renderer.render(scene, camera); // Render the first frame after a delay
//   // }, 100); // Adjust the delay (in milliseconds) as needed
//   renderer.render(scene, camera);
// }

requestAnimationFrame(animate);

// Handle window resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  controls.update();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Vertex Shader (Simplified)
// const vVertexShader = `
// precision mediump float;

// attribute vec3 a_position;
// attribute vec2 a_uv;

// varying vec2 v_uv;

// void main() {
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(a_position, 1.0);
//   v_uv = a_uv;
// }
// `;

// // Fragment Shader (Invert Colors)
// const vFragmentShader = `
// precision mediump float;

// uniform sampler2D u_texture;
// varying vec2 v_uv;

// void main() {
//   vec4 color = texture2D(u_texture, v_uv);
//   gl_FragColor = vec4(1.0 - color.r, 1.0 - color.g, 1.0 - color.b, color.a);
// }
// `;
