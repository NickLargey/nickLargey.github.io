import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

// VER AND FRAG SHADERS
const BasicShader = {
  name: "BasicShader",
  uniforms: {},
  vertexShader: /* glsl */ `
		void main() {
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,

  fragmentShader: /* glsl */ `
		void main() {
			gl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5 );
		}`,
};

// SCENE, CAMERA AND RENDERER OBJECT INIT
const scene = new THREE.Scene();
scene.background = new THREE.Color().setHex(0xff35a5);

const fov = 60;
const aspect = 1920 / 1080;
const near = 1;
const far = 10000.0;
let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// HANDLE WINDOW RESIZE
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// LIGHTS
let ambLight = new THREE.AmbientLight(0xffffff); // create new ambient lighting object
scene.add(ambLight); // attach ambient lighting object to scene

// VIDEO TEXTURE
const video = document.createElement("video");
video.src = "../../assets/Max_No_Audio.mp4"; // Replace with your video path
video.loop = true; // Optional: Loop the video
video.muted = true; // Optional: Mute the video

// Important: Add event listeners to handle video loading and playback
video.addEventListener("loadeddata", () => {
  console.log("%s Video Loaded", video.src);
  video.play(); // Autoplay after video is loaded
});

video.addEventListener("error", (error) => {
  console.error("Error loading video:", error);
});

const vidTexture = new THREE.VideoTexture(video);
vidTexture.colorSpace = THREE.LinearSRGBColorSpace;
vidTexture.anisotropy = 0;

// PLANE GEOMETRY AND MATERIAL
const geometry = new THREE.PlaneGeometry(4, 3); // Adjust size to match video aspect ratio (example: 16:9)
const vidMaterial = new THREE.MeshBasicMaterial({ map: vidTexture }); //Use MeshBasicMaterial for unlit video`
const material = new THREE.ShaderMaterial(BasicShader);
const plane = new THREE.Mesh(geometry, vidMaterial); // material,

scene.add(plane);

const box = new THREE.Mesh( // create a Mesh object to hold Box primative object
  new THREE.BoxGeometry(2, 2, 2), // set the size of the Box (X, Y, Z)
  new THREE.MeshStandardMaterial({
    color: 0xff0000,
  })
);

box.position.set(5, 0, 0); // set the starting position of the Box object
scene.add(box); // add the box object to the scene

// ADDED MOVEMENT CONTROLS

const controls = new OrbitControls(camera, renderer.domElement); // create new Orbit Controls object
controls.target.set(0, 0, 0);
controls.object.position.set(0, 0, 10);
controls.update(); // update controls for each move

// Position the camera
camera.position.z = 25; // Adjust as needed

// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  plane.rotation.x += 0.01;
  plane.rotation.y += 0.01;

  renderer.render(scene, camera);
}

requestAnimationFrame(animate);
