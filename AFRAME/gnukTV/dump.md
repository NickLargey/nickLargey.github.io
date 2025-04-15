## UNUSED FROM 3D GALLERY

```html
<script src="https://unpkg.com/aframe-template-component@3.x.x/dist/aframe-template-component.min.js"></script>
<script src="https://unpkg.com/aframe-layout-component@5.x.x/dist/aframe-layout-component.min.js"></script>
<script src="https://unpkg.com/aframe-event-set-component@5.x.x/dist/aframe-event-set-component.min.js"></script>
<script src="https://unpkg.com/aframe-proxy-event-component@2.1.0/dist/aframe-proxy-event-component.min.jss"></script>
<script src="https://unpkg.com/aframe-room-component/dist/aframe-room-component.min.js"></script>

<audio
  crossorigin="anonymous"
  id="click-sound"
  src="https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg"
></audio>

<img
  crossorigin="anonymous"
  id="sechelt"
  src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg"
/>
<img
  crossorigin="anonymous"
  id="sechelt-thumb"
  src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-sechelt.jpg"
/>
<script id="link" type="text/html">
  <a-entity
    class="link"
    geometry="primitive: plane; height: 1; width: 1"
    material="shader: flat; src: ${thumb}"
    sound="on: click; src: #click-sound"
    event-set__mouseenter="scale: 1.2 1.2 1"
    event-set__mouseleave="scale: 1 1 1"
    event-set__click="_target: #image-360; _delay: 300; material.src: ${src}"
    proxy-event="event: click; to: #image-360; as: fade"
  ></a-entity>
</script>

<!-- 360-degree image. -->
<a-sky
  id="image-360"
  radius="10"
  src="#sechelt"
  animation__fade="property: components.material.material.color; type: color; from: #FFF; to: #000; dur: 300; startEvents: fade"
  animation__fadeback="property: components.material.material.color; type: color; from: #000; to: #FFF; dur: 300; startEvents: animationcomplete__fade"
></a-sky>

<!-- Link template we will build. -->
<a-entity class="link"></a-entity>
<a-entity id="links" layout="type: line; margin: 1.5" position="-1.5 1.5 -4">
  <a-entity
    template="src: #link"
    data-src="#sechelt"
    data-thumb="#sechelt-thumb"
  ></a-entity>
</a-entity>
<!-- Basic plane. -->
<a-plane color="#CCC" height="20" width="20"></a-plane>

<!-- Interior -->
<a-cubemap id="reflection">
  <img src="./assets/tile 9.png" />
  <img src="./assets/tile 9.png" />
  <img src="./assets/tile 9.png" />
  <img src="./assets/tile 9.png" />
  <img src="./assets/tile 9.png" />
  <img src="./assets/tile 9.png" />
</a-cubemap>

<!-- Collider -->
<script>
  AFRAME.registerComponent("collider-check", {
    dependencies: ["raycaster"],

    init: function () {
      this.el.addEventListener("raycaster-intersection", function () {
        console.log("Player hit something!");
      });
    },
  });
</script>

<!-- Old Models -->
<a-gltf-model src="#desk" position="-4 0 -5.65" static-body></a-gltf-model>

<a-gltf-model
  src="#sony"
  position="-3.25 .5 -5"
  rotation="0 25 0"
  scale="2 2 2"
  dynamic-body
></a-gltf-model>

animation__fade="property: components.material.material.color; type: color;
from: #FFF; to: #000; dur: 300; startEvents: fade"
animation__fadeback="property: components.material.material.color; type: color;
from: #000; to: #FFF; dur: 300; startEvents: animationcomplete__fade"

<script id="video" type="text/html">
  <a-entity
    class="video"
    geometry="primitive: plane; height: 4; width: 3;"
    material="shader: flat; src: ${src}"
    event-set__mouseenter="scale: 1.2 1.2 1"
    event-set__mouseleave="scale: 1 1 1"
    event-set__click="_target: #video_play; _delay: 300; material.src: ${src}"
    proxy-event="event: click; to: #video_play; as: fade"
  ></a-entity>
</script>

<img id="devo-thumb" src="./assets/devo-day.png" />
<img id="max-thumb" src="./assets/max.png" />
<a-entity
  template="src: #video"
  data-src="#men-who-make"
  data-thumb="men-who-make"
  play-on-click
></a-entity>

<a-entity
  template="src: #video"
  data-src="#max"
  data-thumb="max"
  play-on-click
></a-entity>

<!-- background="color: #ff00b4" -->

<a-box
  src="#ground"
  repeat="12"
  height="12"
  width="9"
  depth=".1"
  position="0 0 0"
  rotation="-90 0 0"
  static-body
></a-box>
<!-- AREA RUG -->
<a-box
  src="#rug"
  height="7"
  width="5"
  depth="0.1"
  position="0 .01 0"
  rotation="-90 0 0"
  static-body
></a-box>

<!-- LEFT WALL -->
<a-box
  color="blue"
  height="4"
  width="12"
  depth=".1"
  position="-4.45 2 0"
  rotation="0 90 0"
  static-body
>
</a-box>
<!-- REAR WALL -->
<a-box
  color="green"
  height="4"
  width="9"
  depth=".1"
  position="0 2 -5.95"
  rotation="0 0 0"
  static-body
>
  <a-box
    color="skyblue"
    height="2"
    width="1.5"
    depth=".1"
    position="-.1 .35 0.25"
    rotation="0 0 0"
    static-body
  ></a-box>
  <a-plane
    src="#sed"
    anchored="persistent: true"
    height="2.5"
    width="1.5"
    position="-3 .35 0.1"
    rotation="0 0 0"
  ></a-plane>
</a-box>
<!-- RIGHT WALL -->
<a-box
  color="blue"
  height="4"
  width="12"
  depth=".1"
  position="4.45 2 0"
  rotation="0 90 0"
  static-body
>
  <a-plane
    src="#skeletons"
    anchored="persistent: true"
    height="1.5"
    width="2"
    position="-4 .35 -0.1"
    rotation="0 180 0"
  ></a-plane
></a-box>
```

```json
[

]
```
