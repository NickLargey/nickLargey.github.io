AFRAME.registerComponent("room", {
  schema: { scale: { type: "number", default: 1 } },
  dependencies: ["material"],
  init: function () {
    this.roomsMesh = this.createRooms(
      1 * this.data.scale,
      1 * this.data.scale,
      1 * this.data.scale
    );
    this.el.setObject3D("mesh", this.roomsMesh[0]);
    this.el.setObject3D("room", this.roomsMesh[1]);
    // this.el.setAttribute("static-body", {});
    console.log("room component initialized");
  },
  // Draw front and rear walls as 2 mirrored segments for slanted ceilingconst
  frontAndRearWallShape: function (x, y) {
    const frontAndRearWall = new THREE.Shape();
    frontAndRearWall.moveTo(0, 0);
    frontAndRearWall.lineTo(x, 0);
    frontAndRearWall.lineTo(x, y * 0.75);
    frontAndRearWall.lineTo(0, y);
    frontAndRearWall.lineTo(0, 0);
    return frontAndRearWall;
  },
  // Draw side walls as single shapes
  sideWallShape: function (y, z) {
    const wallShape = new THREE.Shape();
    wallShape.moveTo(0, 0);
    wallShape.lineTo(z + 0.2, 0);
    wallShape.lineTo(z + 0.2, y * 0.75);
    wallShape.lineTo(0, y * 0.75);
    wallShape.lineTo(0, 0);
    return wallShape;
  },
  // Add holes to walls for windows and doors
  punchoutToOutside: function (wall, x0, y0, x1, y1) {
    const wallWindow = new THREE.Path();
    wallWindow.moveTo(y0, x0);
    wallWindow.lineTo(y0, x1);
    wallWindow.lineTo(y1, x1);
    wallWindow.lineTo(y1, x0);
    wallWindow.lineTo(y0, x0);
    wall.holes.push(wallWindow);
    return wall;
  },
  // Create the geometry for the walls
  extrudeWallGeometry: function (wallShape) {
    const frWallGeometry = new THREE.ExtrudeGeometry([wallShape], {
      steps: 1,
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 1,
    });

    return frWallGeometry;
  },
  // "main" function to create the room
  createRooms: function (x, y, z) {
    const roomsGroup = new THREE.Group();
    const room = new THREE.Object3D();

    // Front Wall
    const frontWall = this.frontAndRearWallShape(x, y);
    const frWallShape = this.punchoutToOutside(
      frontWall,
      0,
      y * 0.5,
      x * 0.6,
      y * 0.2
    );
    const frWallGeometry = this.extrudeWallGeometry(frWallShape);
    const frWall = new THREE.Mesh(
      frWallGeometry,
      new THREE.MeshBasicMaterial({ color: 0x012345 })
    );
    frWall.translateZ(-0.15);
    room.add(frWall);

    const frontWallShapeB = this.frontAndRearWallShape(x, y);
    const frWallGeometryB = this.extrudeWallGeometry(frontWallShapeB);
    const frWallB = new THREE.Mesh(
      frWallGeometryB,
      new THREE.MeshBasicMaterial({ color: 0x543210 })
    );
    frWallB.rotateY(Math.PI);
    frWallB.translateZ(0.1);
    room.add(frWallB);

    const rearWall = this.frontAndRearWallShape(x, y);

    const rearWallShape = this.punchoutToOutside(
      rearWall,
      x * 0.2,
      y * 0.3,
      x * 0.4,
      y * 0.6
    );
    const rearWallGeometry = this.extrudeWallGeometry(rearWallShape);
    const rearWallMeshA = new THREE.Mesh(
      rearWallGeometry,
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    rearWallMeshA.translateZ(z + 0.1);
    room.add(rearWallMeshA);

    const rearWallMeshB = new THREE.Mesh(
      rearWallGeometry,
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    rearWallMeshB.rotateY(Math.PI);
    rearWallMeshB.translateZ(-z - 0.15);
    room.add(rearWallMeshB);

    const sideWall = this.sideWallShape(y, z);
    const sideWallShape = this.punchoutToOutside(
      sideWall,
      x * 0.2,
      y * 0.3,
      x * 0.4,
      y * 0.6
    );
    const sideWallGeometry = this.extrudeWallGeometry(sideWallShape);
    const eastWallMesh = new THREE.Mesh(
      sideWallGeometry,
      new THREE.MeshStandardMaterial({ color: 0x0000ff })
    );
    eastWallMesh.rotation.y = Math.PI / 2;
    eastWallMesh.position.x = -x;
    eastWallMesh.position.z = z + 0.1;
    room.add(eastWallMesh);

    const westWallMesh = new THREE.Mesh(
      sideWallGeometry,
      new THREE.MeshStandardMaterial({ color: 0xff0000 })
    );
    westWallMesh.rotation.y = Math.PI / 2;
    westWallMesh.position.x = x - 0.05;
    westWallMesh.position.z = z + 0.1;
    room.add(westWallMesh);

    // // Draw roof
    // const roofShape = new THREE.Shape();
    // roofShape.moveTo(-2.2, 0);
    // roofShape.lineTo(3.6, 0);
    // roofShape.lineTo(3.6, 2.2);
    // roofShape.lineTo(-2.2, 2.2);
    // roofShape.lineTo(-2.2, 0);
    // const roofGeometry = new THREE.ExtrudeGeometry([roofShape], {
    //   steps: 1,
    //   depth: 0.2,
    //   bevelEnabled: false,
    //   curveSegments: 32,
    // });
    // const roofA = new THREE.Mesh(
    //   roofGeometry,
    //   new THREE.MeshStandardMaterial({ color: 0x9999ff })
    // );
    // roofA.rotateY(-Math.PI / 2);
    // roofA.rotateX(-Math.PI / 2 - 0.25);
    // roofA.translateZ(1);
    // roofA.translateY(-0.4);
    // room.add(roofA);

    // const roofB = roofA.clone();
    // roofB.rotateZ(Math.PI);
    // roofB.rotateX(-0.5);
    // roofB.translateY(-0.2);
    // roofB.translateZ(-0.05);
    // roofB.translateX(-1.4);
    // room.add(roofB);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("./assets/images/floor.png");
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 13),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.1,
      })
    );
    ground.rotateX(-Math.PI / 2);
    // ground.translateX(-0.5);
    // ground.translateY(-0.5);
    roomsGroup.add(ground);

    room.translateX(-0.5);
    room.translateZ(-0.5);

    mesh = [roomsGroup, room];

    return mesh;
  },
  update: function () {},
  tick: function () {},
  remove: function () {},
  pause: function () {},
  play: function () {},
});
