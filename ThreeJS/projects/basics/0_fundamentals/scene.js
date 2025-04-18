import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

class Fundamentals {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    }); // init webgl rendering
    this._threejs.shadowMap.enabled = true; // init shadow map
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap; // attach PCFSoftShadowMap
    this._threejs.setPixelRatio(window.devicePixelRatio); // get pixel ratio from browser window
    this._threejs.setSize(window.innerWidth, window.innerHeight); // get canvas size

    document.body.appendChild(this._threejs.domElement); // attach 3js to DOM

    window.addEventListener(
      "resize",
      () => {
        this._OnWindowResize(); // attach listener for if the window is resized to adjust the canvas
      },
      false
    );

    /* 
    CAMERA --
      A PerspectiveCamera defines its frustum based on 4 properties. 
      
      NEAR - defines where the front of the frustum starts. 
      (FRUSTUM - the portion of a cone or pyramid which remains after its upper part has been cut off by a plane parallel to its base, 
      or which is intercepted between two such planes.)

      FAR - defines where it ends. fov, the field of view, defines how tall the front and back of the frustum are by computing the correct 
      height to get the specified field of view at near units from the camera. 
      
      ASPECT - defines how wide the front and back of the frustum are. 
      
      WIDTH - of the frustum is just the height multiplied by the aspect.
    */

    const fov = 60; // set field of view
    const aspect = 1920 / 1080; // hard coded aspect ratio
    const near = 1.0; // camera near limit ####
    const far = 1000.0; // camera far limit ####
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far); // create new Perspective Camera object
    this._camera.position.set(150, 100, 0); // set the camera's position to

    this._scene = new THREE.Scene();
    /*
    LIGHTS --

    */
    let light = new THREE.DirectionalLight(0xffffff, 1.0); // create new Directional Light object
    light.position.set(20, 100, 10); // set lighting position
    light.target.position.set(0, 0, 0); // set lighting target direction
    light.castShadow = true; // allow shadows
    light.shadow.bias = -0.001; // set shadow bias ####
    light.shadow.mapSize.width = 2048; // set width of shadow throw
    light.shadow.mapSize.height = 2048; // set height of shadow throw
    light.shadow.camera.near = 0.1; // set shadow camera frustum near (start) position
    light.shadow.camera.far = 500.0; // set shadow camera frustum  far (end) position limit
    light.shadow.camera.near = 0.5; // Why set it twice?
    light.shadow.camera.far = 500.0; // Why set it twice?
    light.shadow.camera.left = 100; // set shadow camera left position limit
    light.shadow.camera.right = -100; // set shadow camera right position limit
    light.shadow.camera.top = 100; // set shadow camera top position limit
    light.shadow.camera.bottom = -100; // set shadow camera bottom position limit
    this._scene.add(light);

    light = new THREE.AmbientLight(0x101010); // create new ambient lighting object
    this._scene.add(light); // attach ambient lighting object to scene

    /* 
    CONTROLS --
      Orbit controls allow the camera to orbit around a target.
      To use this, as with all files in the /examples directory, you will have to include the file separately in your HTML.
    
      OrbitControls is an add-on, and must be imported explicitly. See Installation / Addons.
      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    */
    const controls = new OrbitControls(this._camera, this._threejs.domElement); // create new Orbit Controls object
    controls.target.set(0, 20, 0);
    controls.update(); // update controls for each move

    /*
    TEXTURES -- 
    */
    const loader = new THREE.CubeTextureLoader(); // create new loader object for "Cube" primitive shape
    const texture = loader.load([
      "./assets/bg.jpg",
      "./assets/bg.jpg",
      "./assets/bg.jpg",
      "./assets/bg.jpg",
      "./assets/bg.jpg",
      "./assets/bg.jpg",
    ]);
    this._scene.background = texture; // set the loaded texture to the background for the surrounding scenery

    /*
    MESH GEOMETRY AND PRIMATIVE SHAPES -- */
    const plane = new THREE.Mesh( // create a Mesh object to hold a Plane primative as a platform for the scene
      new THREE.PlaneGeometry(250, 250, 10, 10), // set the Plane width, height, widthSegments (amount of triangles in the X direction) and heightSegments (amount of triangles in the Y direction)
      new THREE.MeshStandardMaterial({
        // set Plane's Mesh properties
        color: 0x0ff0ff, // set color to teal
      })
    );
    plane.castShadow = false; // disallow plane from casting shadow
    plane.receiveShadow = true; // allow shadows to be projected onto plane
    plane.rotation.x = -Math.PI / 2; // rotate the plane in the X direction in scene
    this._scene.add(plane); // attach Plane to Scene

    const geometry = new THREE.Mesh(
      new THREE.TetrahedronGeometry(25, 1),
      new THREE.MeshStandardMaterial({
        color: 0xff0ff0,
      })
    );

    geometry.position.set(0, 50, 0);

    geometry.castShadow = true;
    geometry.receiveShadow = true;

    this._scene.add(geometry);

    // const box = new THREE.Mesh( // create a Mesh object to hold Box primative object
    //   new THREE.BoxGeometry(2, 2, 2), // set the size of the Box (X, Y, Z)
    //   new THREE.MeshStandardMaterial({
    //     color: 0xffffff, // Set the color to white
    //   })
    // );
    // box.position.set(0, 1, 0); // set the starting position of the Box object
    // box.castShadow = true; // allow boxes to cast shadows
    // box.receiveShadow = true; // all shadows to be projected onto the box
    // this._scene.add(box); // add the box object to the scene

    // for (let x = -8; x < 8; x++) {
    //   // create 256 box objects with random positions (but still in a grid)
    //   for (let y = -8; y < 8; y++) {
    //     const box = new THREE.Mesh(
    //       new THREE.BoxGeometry(2, 2, 2),
    //       new THREE.MeshStandardMaterial({
    //         color: 0x808080,
    //       })
    //     );
    //     box.position.set(
    //       Math.random() + x * 5,
    //       Math.random() * 4.0 + 2.0,
    //       Math.random() + y * 5
    //     );
    //     box.castShadow = true;
    //     box.receiveShadow = true;
    //     this._scene.add(box);
    //   }
    // }

    // const box = new THREE.Mesh(
    //   new THREE.SphereGeometry(2, 32, 32),
    //   new THREE.MeshStandardMaterial({
    //       color: 0xFFFFFF,
    //       wireframe: true,
    //       wireframeLinewidth: 4,
    //   }));
    // box.position.set(0, 0, 0);
    // box.castShadow = true;
    // box.receiveShadow = true;
    // this._scene.add(box);

    this._RAF();
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      this._RAF();
    });
  }
}

let _APP = null;

window.addEventListener("DOMContentLoaded", () => {
  _APP = new Fundamentals();
});
