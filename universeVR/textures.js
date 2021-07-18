
const jupiter_texture = new window.THREE.TextureLoader().load({
  j: "textures/jupiter.jpg",
  e: "textures/earth.jpg",
});
jupiter_texture.anisotropy = 16;
jupiter_texture.minFilter = THREE.NearestFilter;
jupiter_texture.maxFilter = THREE.NearestFilter;

const jMaterial_tex = new THREE.MeshBasicMaterial({ map: jupiter_texture.j });
const jup = document.querySelector("#jupiter");
const jmesh = jup.getObject3D("mesh");

jmesh.material = jMaterial_tex;

// const texture = new window.THREE.TextureLoader().load("textures/earth.jpg");
// texture.anisotropy = 16;
// texture.minFilter = THREE.NearestFilter;
// texture.maxFilter = THREE.NearestFilter;

const material_tex = new THREE.MeshBasicMaterial({ map: jupiter_texture.e });
const box = document.querySelector("#earth");
const mesh = box.getObject3D("mesh");

mesh.material = material_tex;
