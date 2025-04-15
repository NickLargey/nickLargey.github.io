## AFrame's Entity Component System (ECS)

### A basic definition of ECS involves:

- [Entities](https://aframe.io/docs/1.7.0/core/entity.html) are container objects into which components can be attached. Entities are the base of all objects in the scene. Without components, entities neither do nor render anything, similar to an empty `<div>`.
- [Components](https://aframe.io/docs/1.7.0/core/component.html) are reusable modules or data containers that can be attached to entities to provide appearance, behavior, and/or functionality. Components are like plug-and-play for objects. All logic is implemented through components, and we define different types of objects by mixing, matching, and configuring components. Like alchemy!
- [Systems](https://aframe.io/docs/1.7.0/core/systems.html) provide global scope, management, and services for classes of components. Systems are often optional, but we can use them to separate logic and data; systems handle the logic, components act as data containers.

### Examples

Some abstract examples of different types of entities built from composing together different components:

- `Box = Position + Geometry + Material`
- `Light Bulb = Position + Light + Geometry + Material + Shadow`
- `Sign = Position + Geometry + Material + Text`
- `VR Controller = Position + Rotation + Input + Model + Grab + Gestures`
- `Ball = Position + Velocity + Physics + Geometry + Material`
- `Player = Position + Camera + Input + Avatar + Identity`

### ECS in A-Frame

A-Frame has APIs that represents each piece of ECS:

- [Entities](https://aframe.io/docs/1.7.0/core/entity.html) are represented by the <a-entity> element and prototype.
- [Components](https://aframe.io/docs/1.7.0/core/component.html) are represented by HTML attributes on <a-entity>‘s. Underneath, components are objects containing a schema, lifecycle handlers, and methods. Components are registered via the AFRAME.registerComponent (name, definition) API.
- [Systems](https://aframe.io/docs/1.7.0/core/systems.html) are represented by <a-scene>‘s HTML attributes. System are similar to components in definition. Systems are registered via the AFRAME.registerSystem (name, definition) API.

### Syntax

We create <a-entity> and attach components as HTML attributes. Most components have multiple properties that are represented by a syntax similar to HTMLElement.style CSS. This syntax takes the form with a colon (:) separating property names from property values, and a semicolon (;) separating different property declarations:

`<a-entity ${componentName}="${propertyName1}: ${propertyValue1}; ${propertyName2}: ${propertyValue2}"></a-entity>`

For example, we have <a-entity> and attach the geometry, material, light, and position components with various properties and property values:

```html
<a-entity
  geometry="primitive: sphere; radius: 1.5"
  light="type: point; color: white; intensity: 2"
  material="color: white; shader: flat; src: glow.jpg"
  position="0 0 -5"
></a-entity>
```

### Composition

From there, we could attach more components to add additional appearance, behavior, or functionality (e.g., physics). Or we could update the component values to configure the entity (either declaratively or through .setAttribute).

We plug in components into a hand entity to provide it behavior as if we were attaching superpowers or augmentations for VR! Each of the components below have no knowledge of each other, but can be combined to define a complex entity:

```html
<a-entity <!-- Hook into the Gamepad API for pose. -->
  tracked-controls
  <!-- Vive button mappings. -->
  vive-controls
  <!-- Oculus button mappings. -->
  meta-touch-controls
  <!-- Appearance (model), gestures, and events. -->
  hand-controls
  <!-- Laser to interact with menus and UI. -->
  laser-controls
  <!-- Listen when hand is in contact with an object. -->
  sphere-collider
  <!-- Provide ability to grab objects. -->
  grab
  <!-- Provide ability to throw objects. -->
  throw
  <!-- Hide hand when grabbing object. -->
  event-set="_event: grabstart; visible: false"
  <!-- Show hand when no longer grabbing object. -->
  event-set="_event: grabend; visible: true" >
</a-entity>
```

[Writing a Component](https://aframe.io/docs/1.7.0/introduction/writing-a-component.html)
A simple ECS codebase might be structured like:

```
index.html
components/
  ball.js
  collidable.js
  grabbable.js
  enemy.js
  scoreboard.js
  throwable.js
```

### Higher-Order Components

Components can set other components on the entity, making them a higher-order or higher-level component in abstraction.

For example, the [cursor component](https://aframe.io/docs/1.7.0/components/cursor.html) sets and builds on top of the [raycaster component](https://aframe.io/docs/1.7.0/components/raycaster.html). Or the [hand-controls component](https://aframe.io/docs/1.7.0/components/hand-controls.html) sets and builds on top of the [vive-controls component](https://aframe.io/docs/1.7.0/components/vive-controls.html) and [meta-touch-controls component](https://aframe.io/docs/1.7.0/components/meta-touch-controls.html) which in turn build on top of the [tracked-controls component](https://aframe.io/docs/1.7.0/components/tracked-controls.html).

[Example Particle System Component](https://www.npmjs.com/package/@c-frame/aframe-particle-system-component)

```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.7.0/aframe.min.js"></script>
    <script src="https://unpkg.com/@c-frame/aframe-particle-system-component@1.2.x/dist/aframe-particle-system-component.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-entity particle-system="preset: snow" position="0 0 -10"></a-entity>
    </a-scene>
  </body>
</html>
```

### Floating Orb in Water Example

```html
<html>
  <head>
    <title>Community Components Example</title>
    <meta name="description" content="Community Components Example" />
    <script src="https://aframe.io/releases/1.7.0/aframe.min.js"></script>
    <script src="https://unpkg.com/@c-frame/aframe-particle-system-component@1.2.x/dist/aframe-particle-system-component.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/aframe-simple-sun-sky@^1.2.2/simple-sun-sky.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/c-frame/aframe-extras@7.5.0/dist/aframe-extras.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-entity
        id="rain"
        particle-system="preset: rain; color: #24CAFF; particleCount: 5000"
      ></a-entity>

      <a-entity
        id="sphere"
        geometry="primitive: sphere"
        material="color: #EFEFEF; shader: flat"
        position="0 0.15 -5"
        light="type: point; intensity: 5"
        animation="property: position; easing: easeInOutQuad; dir: alternate; dur: 1000; to: 0 -0.10 -5; loop: true"
      ></a-entity>

      <a-entity
        id="ocean"
        ocean="density: 20; width: 50; depth: 50; speed: 4"
        material="color: #9CE3F9; opacity: 0.75; metalness: 0; roughness: 1"
        rotation="-90 0 0"
      ></a-entity>

      <a-simple-sun-sky sun-position="1 0.4 0"></a-simple-sun-sky>

      <a-entity id="light" light="type: ambient; color: #888"></a-entity>
    </a-scene>
  </body>
</html>
```

### Where to Place JavaScript Code for A-Frame

Important: Before we go over the different ways to use JavaScript and DOM APIs, we prescribe encapsulating your JavaScript code within A-Frame components. Components modularize code, make logic and behavior visible from HTML, and ensure that code is executed at the correct time (e.g., after the scene and entities have attached and initialized). As the most basic example, to register a console.log component before `<a-scene>`:

```javascript
AFRAME.registerComponent("log", {
  schema: { type: "string" },

  init: function () {
    var stringToLog = this.data;
    console.log(stringToLog);
  },
});
```

And after the registration, use the component from HTML:

```html
<a-scene log="Hello, Scene!">
  <a-box log="Hello, Box!"></a-box>
</a-scene>
```

Do not try to put A-Frame-related JavaScript in a raw `<script>` tag after `<a-scene>` as we would with traditional 2D scripting. If we do, we’d have to take special measures to make sure code runs at the right time (see [Running Content Scripts on the Scene](https://aframe.io/docs/1.7.0/core/scene.html#running-content-scripts-on-the-scene)).

### Getting Entities by Querying and Traversing

The wonderful thing about the DOM as a scene graph is that the standard DOM provides utilities for traversal, querying, finding, and selecting through `.querySelector()` and `.querySelectorAll()`. Originally inspired by jQuery selectors, we can learn about query selectors on [MDN](https://developer.mozilla.org/docs/Web/API/Document/querySelector).

Take the scene below for example:

```html
<html>
  <a-scene>
    <a-box id="redBox" class="clickable" color="red"></a-box>
    <a-sphere class="clickable" color="blue"></a-sphere>
    <a-box color="green"></a-box>
    <a-entity light="type: ambient"></a-entity>
    <a-entity light="type: directional"></a-entity>
  </a-scene>
</html>
```

### With `.querySelector()`

If we want to grab just one element, we use .querySelector() which returns one element. Let’s grab the scene element:

```javascript
var sceneEl = document.querySelector("a-scene");
```

Note if we were working within a component, we’d already have a reference to the scene element without needing to query. All entities have reference to their scene element:

```javascript
AFRAME.registerComponent("foo", {
  init: function () {
    console.log(this.el.sceneEl); // Reference to the scene element.
  },
});
```

If an element has an ID, we can use an ID selector (i.e., #<ID>). Let’s grab the red box which has an ID. Before we did a query selector on the entire document. Here, we’ll do a query selector just within the scope of the scene. With query selectors, we’re able to limit the scope of the query to within any element:

```javascript
var sceneEl = document.querySelector("a-scene");
console.log(sceneEl.querySelector("#redBox"));
// <a-box id="redBox" class="clickable" color="red"></a-box>
```

### With `.querySelectorAll()`

If we want to grab a group of elements, we use .querySelectorAll() which returns an array of elements. We can query across element names:

```javascript
console.log(sceneEl.querySelectorAll("a-box"));
// [
//  <a-box id="redBox" class="clickable" color="red"></a-box>,
//  <a-box color="green"></a-box>
// ]
```

We can query for elements that have a class with a class selector (i.e., `.<CLASS_NAME>`). Let’s grab every entity that has the `clickable` class:

```javascript
console.log(sceneEl.querySelectorAll(".clickable"));
// [
//  <a-box id="redBox" class="clickable" color="red"></a-box>
//  <a-sphere class="clickable" color="blue"></a-sphere>
// ]
```

We can query for elements containing an attribute (or in this case, a component) with an attribute selector (i.e., [`<ATTRIBUTE_NAME>`]). Let’s grab every entity that has a light:

```javascript
console.log(sceneEl.querySelectorAll("[light]"));
// [
//  <a-entity light="type: ambient"></a-entity>
// <a-entity light="type: directional"></a-entity>
// ]
```

### Looping Over Entities from `.querySelectorAll()`

If we grabbed a group of entities using `.querySelectorAll()`, we can loop over them with a for loop. Let’s loop over every element in the scene with `*`.

```javascript
var els = sceneEl.querySelectorAll("*");
for (var i = 0; i < els.length; i++) {
  console.log(els[i]);
}
```

### A Note About Performance

Avoid using `.querySelector` and `.querySelectorAll` in tick and tock functions that get called every frame as it does take some time to loop over the DOM to retrieve entities. Instead, keep a cached list of entities, calling the query selectors beforehand, and then just loop over that.

```javascript
AFRAME.registerComponent("query-selector-example", {
  init: function () {
    this.entities = document.querySelectorAll(".box");
  },

  tick: function () {
    // Don't call query selector in here, query beforehand.
    for (let i = 0; i < this.entities.length; i++) {
      // Do something with entities.
    }
  },
});
```

### Retrieving Component Data with `.getAttribute()`

We can get the data of components of an entity via `.getAttribute`. A-Frame augments `.getAttribute` to return values rather than strings (e.g., returning objects) in most cases since components usually consist of multiple properties, or returning an actual boolean for like `.getAttribute('visible')`. Often, `.getAttribute` will return the internal data object of the component so do not modify the object directly:

```javascript
// <a-entity geometry="primitive: sphere; radius: 2"></a-entity>
el.getAttribute("geometry");
// >> {"primitive": "sphere", "radius": 2, ...}
```

### Retrieving position and scale

Doing `el.getAttribute('position')` or `el.getAttribute('scale')` will return the three.js Object3D position and scale properties which are `Vector3`s. Keep in mind that modifying these objects will modify the actual entity data.

This is because A-Frame allows us to modify position, rotation, scale, visible at the three.js level, and in order for `.getAttribute` to return the correct data, A-Frame returns the actual three.js Object3D objects.

This is not true for the `.getAttribute('rotation')` because A-Frame, for better or worse, uses degrees instead of radians. In such case, a normal JavaScript object with x/y/z properties is returned. The Object3D Euler can be retrieved via `el.object3D.rotation` if we need to work at a lower level with radians.

### Modifying the A-Frame Scene Graph

With JavaScript and DOM APIs, we can dynamically add and remove entities as we would with normal HTML elements

### Creating an Entity with `.createElement()`

To create an entity, we can use document.createElement. This will give us a blank entity:

```javascript
var el = document.createElement("a-entity");
```

However, this entity will not be initialized or be a part of the scene until we attach it to our scene.

### Adding an Entity with `.appendChild()`

To add an entity to the DOM, we can use `.appendChild(element)`. Specifically, we want to add it to our scene. We grab the scene, create the entity, and append the entity to our scene.

```javascript
var sceneEl = document.querySelector("a-scene");
var entityEl = document.createElement("a-entity");
// Do `.setAttribute()`s to initialize the entity.
sceneEl.appendChild(entityEl);
```

Note that `.appendChild()` is an asynchronous operation in the browser. Until the entity has finished appending to the DOM, we can’t do many operations on the entity (such as calling `.getAttribute()`). If we need to query an attribute on an entity that has just been appended, we can listen to the loaded event on the entity, or place logic in an A-Frame component so that it is executed once it is ready:

```javascript
var sceneEl = document.querySelector("a-scene");

AFRAME.registerComponent("do-something-once-loaded", {
  init: function () {
    // This will be called after the entity has properly attached and loaded.
    console.log("I am ready!");
  },
});

var entityEl = document.createElement("a-entity");
entityEl.setAttribute("do-something-once-loaded", "");
sceneEl.appendChild(entityEl);
```

### Removing an Entity with `.removeChild()`

To remove an entity from the DOM and thus from the scene, we call `.removeChild(element)` from the parent element. If we have an entity, we have to ask its parent (parentNode) to remove the entity.

```javascript
entityEl.parentNode.removeChild(entityEl);
```

## Modifying an Entity

A blank entity doesn’t do anything. We can modify the entity by adding components, configuring component properties, and removing components.
Adding a Component with `.setAttribute()`

To add a component, we can use `.setAttribute(componentName, data)`. Let’s add a geometry component to the entity.

```javascript
entityEl.setAttribute("geometry", {
  primitive: "box",
  height: 3,
  width: 1,
});
```

Or adding the [community physics component](https://github.com/c-frame/aframe-physics-system):

```javascript
entityEl.setAttribute("dynamic-body", {
  shape: "box",
  mass: 1.5,
  linearDamping: 0.005,
});
```

Unlike a normal HTML `.setAttribute()`, an entity’s `.setAttribute()` is improved to take a variety of types of arguments such as objects, or to be able to update a single property of a component. [Read more about `Entity.setAttribute()`.](https://aframe.io/docs/1.7.0/core/entity.html#setattribute-attr-value-componentattrvalue)

### Updating a Component with `.setAttribute()`

To update a component, we also use `.setAttribute()`. Updating a component takes several forms.

### Updating Property of Single-Property Component

Let’s update the property of the position component, a single-property component. We can pass either an object or a string. It is slightly preferred to pass an object so A-Frame doesn’t have to parse the string.

```javascript
entityEl.setAttribute("position", { x: 1, y: 2, z: -3 });
// using `entityEl.object3D.position.set(1, 2, -3)` is preferred though.
```

Updating Single Property of Multi-Property Component

Let’s update a single property of the [material component](https://aframe.io/docs/1.7.0/components/material.html), a multi-property component. We do this by providing the component name, property name, and then property value to `.setAttribute()`:

```javascript
entityEl.setAttribute("material", "color", "red");
```

Updating Multiple Properties of a Multi-Property Component

Let’s update multiple properties at once of the [light component](https://aframe.io/docs/1.7.0/components/material.html), a multi-property component. We do this by providing the component name and an object of properties to `.setAttribute()`. We’ll change the light’s color and intensity but leave the type the same:

```javascript
// <a-entity light="type: directional; color: #CAC; intensity: 0.5"></a-entity>
entityEl.setAttribute("light", { color: "#ACC", intensity: 0.75 });
// <a-entity light="type: directional; color: #ACC; intensity: 0.75"></a-entity>
```

Updating position, rotation, scale, and visible.

As a special case, for better performance, memory, and access to utilities, we recommend modifying position, rotation, scale, and visible directly at the three.js level via the entity’s Object3D rather than via `.setAttribute()`.

```javascript
// Examples for position.
entityEl.object3D.position.set(1, 2, 3);
entityEl.object3D.position.x += 5;
entityEl.object3D.position.multiplyScalar(5);

// Examples for rotation.
entityEl.object3D.rotation.y = THREE.MathUtils.degToRad(45);
entityEl.object3D.rotation.divideScalar(2);

// Examples for scale.
entityEl.object3D.scale.set(2, 2, 2);
entityEl.object3D.scale.z += 1.5;

// Examples for visible.
entityEl.object3D.visible = false;
entityEl.object3D.visible = true;
```

This lets us skip over the `.setAttribute` overhead and instead do simple setting of properties for components that are most commonly updated. Updates at the three.js level will still be reflected when doing for example `entityEl.getAttribute('position');`.

### Replacing Properties of a Multi-Property Component

Let’s replace all the properties of the geometry component, a multi-property component. We do this by providing the component name, an object of properties to `.setAttribute()`, and a flag that specifies to clobber the existing properties. We’ll replace all of the geometry’s existing properties with new properties:

```javascript
// <a-entity geometry="primitive: cylinder; height: 4; radius: 2"></a-entity>
entityEl.setAttribute(
  "geometry",
  { primitive: "torusKnot", p: 1, q: 3, radiusTubular: 4 },
  true
);
// <a-entity geometry="primitive: torusKnot; p: 1; q: 3; radiusTubular: 4"></a-entity>
```

### Removing a Component with `.removeAttribute()`

To remove or detach a component from an entity, we can use `.removeAttribute(componentName)`. Let’s remove the default wasd-controls from the camera entity:

```javascript
var cameraEl = document.querySelector("[camera]");
cameraEl.removeAttribute("wasd-controls");
```

### Events and Event Listeners

With JavaScript and the DOM, there is an easy way for entities and components to communicate with one another: events and event listeners. Events are a way to send out a signal that other code can pick up and respond to. Read more about browser events.
Emitting an Event with `.emit()`

A-Frame elements provide an easy way to emit custom events with `.emit(eventName, eventDetail, bubbles)`. For example, let’s say we are building a physics component and we want the entity to send out a signal when it has collided with another entity:

```javascript
entityEl.emit("physicscollided", { collidingEntity: anotherEntityEl }, false);
```

Then other parts of the code can wait and listen on this event and run code in response. We can pass information and data through the event detail as the second argument. And we can specify whether the event bubbles, meaning that the parent entities will also emit the event. So other parts of the code can register an event listener.

### Adding an Event Listener with `.addEventListener()`

Like with normal HTML elements, we can register an event listener with `.addEventListener(eventName, function)`. When the event the listener is registered to is emitted, then the function will be called and handle the event. For example, continuing from the previous example with the physics collision event:

```javascript
entityEl.addEventListener("physicscollided", function (event) {
  console.log("Entity collided with", event.detail.collidingEntity);
});
```

When the entity emits the physicscollided event, the function will be called with the event object. Notably in the event object, we have the event detail which contains data and information passed through the event.

### Removing an Event Listener with `.removeEventListener()`

Like with normal HTML elements, when we want to remove the event listener, we can use `.removeEventListener(eventName, function)`. We have to pass the same event name and function that the listener was registered with. For example, continuing from the previous example with the physics collision event:

```javascript
// We have to define this function with a name if we later remove it.
function collisionHandler(event) {
  console.log("Entity collided with", event.detail.collidingEntity);
}

entityEl.addEventListener("physicscollided", collisionHandler);
entityEl.removeEventListener("physicscollided", collisionHandler);
```

### Binding Event Listeners

By default, Javascript execution context rules binds this to the global context (window) for any independent function, meaning that these functions won’t have access to the component’s this by default.

In order for the component’s this to be accessible inside an event listener, it must be bound.
There are several ways you can do this:

1. By using an arrow function to define the event listener. Arrow functions automatically bind this

```javascript
this.el.addEventListener("physicscollided", (event) => {
  console.log(this.el.id);
});
```

2. By defining your event listener within the events object of the component (this will also handling adding and removing the listener automatically)

[See the explanation here.](https://aframe.io/docs/1.7.0/core/component.html#events)

3. By creating another function, which is the bound version of the function.

```javascript
this.listeners = {
    clickListener: this.clickListener.bind(this);
}
entityEl.addEventListener('click', this.listeners.clickListener);
```

### Caveats

A-Frame entities and primitives are implemented in a way that [favours performance](https://aframe.io/docs/1.7.0/introduction/faq.html#why-is-the-html-not-updating-when-i-check-the-browser-inspector) such that some HTML APIs may not work as expected. For instance, [attribute selectors involving values](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) won’t work and a [mutation observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) won’t trigger changes when a entity’s component is altered.

## Working With three.js Objects

A-Frame is an abstraction on top of three.js, but we still operate with three.js underneath. A-Frame’s elements have doors that lead to three.js’s scene graph.

### Accessing the three.js Scene

The three.js scene is accessible from the `<a-scene>` element as `.object3D`

```javascript
document.querySelector("a-scene").object3D; // THREE.Scene
```

And every A-Frame entity also has a reference to `<a-scene>` via `.sceneEl`:

```javascript
document.querySelector("a-entity").sceneEl.object3D; // THREE.Scene
```

From a [component](https://aframe.io/docs/1.7.0/core/component.html), we access the scene through its entity (i.e., `this.el`):

```javascript
AFRAME.registerComponent("foo", {
  init: function () {
    var scene = this.el.sceneEl.object3D; // THREE.Scene
  },
});
```

### Setting an `Object3D`on an Entity

Setting an `Object3D` on an entity adds the `Object3D` to the entity’s Group, which makes the newly set `Object3D` part of the three.js scene. We set the `Object3D` with the entity’s `.setObject3D(name)` method where the name denotes the `Object3D`s purpose.

For example, to set a point light from within a component:

```javascript
AFRAME.registerComponent("pointlight", {
  init: function () {
    this.el.setObject3D("light", new THREE.PointLight());
  },
});
// <a-entity light></a-entity>
```

We set the light with the name light. To later access it, we can use the entity’s `.getObject3D(name)` method as described before:

```javascript
entityEl.getObject3D("light");
```

And when we set a three.js object on an A-Frame entity, A-Frame will set a reference to the A-Frame entity from the three.js object via `.el`:

```javascript
entityEl.getObject3D("light").el; // entityEl
```

###Removing an Object3D From an Entity
To remove an Object3D from an entity, and consequently the three.js scene, we can use the entity’s .removeObject3D(name) method. Going back to our example with the point light, we remove the light when the component is detached:

```javascript
AFRAME.registerComponent("pointlight", {
  init: function () {
    this.el.setObject3D("light", new THREE.PointLight());
  },

  remove: function () {
    // Remove Object3D.
    this.el.removeObject3D("light");
  },
});
```

### Transforming Between Coordinate Spaces

Every object and the scene (world) in general has their own coordinate space. A parent object’s position, rotation, and scale transformations are applied to its children’s position, rotation, and scale transformations. Consider this scene:

```html
<a-entity id="foo" position="1 2 3">
  <a-entity id="bar" position="2 3 4"></a-entity>
</a-entity>
```

From the world’s reference point, `foo` has position `(1,2,3)` and `bar` has position `(3, 5, 7)` since `foo`’s transformations apply onto `bar`’s. From `foo`’s reference point, `foo` has position `(0, 0, 0)` and `bar` has position `(2, 3, 4)`.

Often we will want to transform between these reference points and coordinate spaces. Above was a simple example, but we might want to do operations such as finding the world-space coordinate of bar’s position, or translate an arbitrary coordinate into foo’s coordinate space. In 3D programming, these operations are accomplished with matrices, but three.js provides helpers to make them easier.

### Local to World Transforms

Normally, we’d need to call `.updateMatrixWorld()` on parent Object3Ds, but three.js defaults `Object3D.matrixAutoUpdate` to **true**. We can use three.js’s `.getWorldPosition(vector)` and `.getWorldQuaternion(quaternion)`.

- To get the world position of an Object3D:

```javascript
var worldPosition = new THREE.Vector3();
entityEl.object3D.getWorldPosition(worldPosition);
```

- To get the world rotation of an Object3D:

```javascript
var worldQuaternion = new THREE.Quaternion();
entityEl.object3D.getWorldQuaternion(worldQuaternion);
```

three.js Object3D has more functions available for [local-to-world transforms](https://threejs.org/docs/#api/core/Object3D):

- `.localToWorld(vector)`
- `.getWorldDirection(vector)`
- `.getWorldQuaternion(quaternion)`
- `.getWorldScale(vector)`

### World to Local Transforms

To obtain a matrix that transforms from world to an object’s local space, get the inverse of the object’s world matrix.

```javascript
var worldToLocal = new THREE.Matrix4().getInverse(object3D.matrixWorld);
```

Then we can apply that `worldToLocal` matrix to anything we want to transform:

```javascript
anotherObject3D.applyMatrix(worldToLocal);
```
