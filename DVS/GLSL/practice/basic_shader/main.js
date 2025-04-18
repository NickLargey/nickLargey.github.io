import * as THREE from "../../../../three.js/build/three.module.js";

let frag_shader, vert_shader;

init();

async function init() {
  frag_shader = await (await fetch("../../shaders/basic.frag")).text();
  vert_shader = await (await fetch("../../shaders/basic.vert")).text();
  console.log(frag_shader);
  console.log(vert_shader);
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff));

const geometry = new THREE.BufferGeometry();

const positions = [
  0,
  0,
  0, // v1
  0,
  500,
  0, // v2
  0,
  500,
  500, // v3
];

geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(positions, 3)
);
geometry.computeVertexNormals();

const object = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
scene.add(object);
