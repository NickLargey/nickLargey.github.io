import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

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

const texture = new THREE.TextureLoader().load("./skeletons-fighting.png");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4);

const sedTexture = new THREE.TextureLoader().load("./sed.png");

// PLANE GEOMETRY AND MATERIAL
const geometry = new THREE.PlaneGeometry(16, 12); // Adjust size to match video aspect ratio (example: 16:9)
const BasicShader = new THREE.MeshStandardMaterial({ map: sedTexture }); //Use MeshBasicMaterial for unlit video
const plane = new THREE.Mesh(geometry, BasicShader); // material,

plane.position.set(-15, 0, 0); // set the starting position of the plane object
scene.add(plane);

const box = new THREE.Mesh( // create a Mesh object to hold Box primative object
  new THREE.BoxGeometry(20, 20, 20), // set the size of the Box (X, Y, Z)
  new THREE.MeshStandardMaterial({
    map: texture, // set the texture of the Box object
  })
);

box.position.set(25, 0, 0); // set the starting position of the Box object
scene.add(box); // add the box object to the scene

// ADDED MOVEMENT CONTROLS

const controls = new OrbitControls(camera, renderer.domElement); // create new Orbit Controls object
controls.target.set(0, 0, 0);
controls.object.position.set(0, 0, 10);
controls.update(); // update controls for each move

// Position the camera
camera.position.z = 40; // Adjust as needed

// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  plane.rotation.y += 0.01;
  plane.rotation.x += 0.01;

  box.rotation.x -= 0.001;
  box.rotation.y -= 0.001;

  renderer.render(scene, camera);
}

requestAnimationFrame(animate);
