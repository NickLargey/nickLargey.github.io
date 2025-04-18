"use strict";
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

    // 1. Load Video/GIF Texture
    const video = document.createElement("video");
    video.src = "./src/MH_loop.mp4"; // Or GIF path
    video.loop = true;
    video.autoplay = true; // Important for video textures
    const texture = new THREE.VideoTexture(video);

    // 2. Geometry (Quad)
    const geometry = new THREE.PlaneGeometry(2, 2); // Adjust size as needed

    // 3. Shader Material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_texture: { value: texture },
        u_resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        }, // Pass resolution
        u_matrix: { value: new THREE.Matrix4() }, // Will be set in render loop
      },
      vertexShader,
      fragmentShader,
    });

    // 5. Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      // Update resolution uniform on resize:
      material.uniforms.u_resolution.value.set(
        window.innerWidth,
        window.innerHeight
      );

      // Important: Update the video texture if it's a video:
      if (texture.image.readyState >= 2) {
        // Check if video is playing
        texture.needsUpdate = true;
      }

      renderer.render(this._scene, this._camera);
    }

    animate();
  }
}

let _APP = null;

window.addEventListener("DOMContentLoaded", () => {
  _APP = new Fundamentals();
});
