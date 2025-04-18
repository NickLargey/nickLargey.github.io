import videos from "./videos.json" assert { type: "json" };

AFRAME.registerComponent("video", {
  schema: {
    id: { type: "string", default: "max" },
    title: { type: "string", default: "Max Headroom" },
    vidSrc: { type: "string", default: "./assets/videos/MH_loop.mp4" },
    thumb: { type: "string", default: "./assets/videos/thumbs/max.png" },
  },
  update: function () {
    var self = this;
    self.screen = document.createElement("a-entity");
    self.screen.setAttribute("id", self.data.id);
    self.screen.setAttribute(
      "material",
      "shader: flat; src: " + self.data.vidSrc + ""
    );
    self.screen.setAttribute(
      "geometry",
      "primitive: plane; width: 0.82; height: .6;"
    );
    self.screen.setAttribute("position", "1.9 1.38 3.75");
    self.screen.setAttribute("rotation", "0 -145 0");
    this.el.appendChild(self.screen);
    self.screen.setAttribute("visible", true);
    self.screen.play();
  },
});

AFRAME.registerComponent("swap-video", {
  schema: {
    videos: { type: "asset" },
  },

  init: function () {
    var self = this;
    this.currentID = 0;
    this.loader = new THREE.FileLoader();
  },

  update: function (oldData) {
    var self = this;
    const data = this.data;
    
    if (
      data.videos[this.currentID] &&
      data.videos[this.currentID] !== oldData.videos[this.currentID]
    ) {
      console.log("Loading video: ", data.videos[this.currentID]);
      this.loader.load(
        data.videos[this.currentID],
        this.onDataLoaded.bind(this)
      );
      this.currentID = (this.currentID + 1) % data.videos.length;
    }
  },

  onDataLoaded: function (file) {
    var self = this;
    const data = this.data;

    var screen = document.createElement("a-entity");
    this.el.appendChild(screen);

    var videos = JSON.parse(file);

    const video = videos[this.currentID];
    self.screen = document.createElement("a-entity");
    self.screen.setAttribute("id", video.id);
    self.screen.setAttribute(
      "material",
      "shader: flat; src: " + video.vidSrc + ""
    );
    self.screen.setAttribute(
      "geometry",
      "primitive: plane; width: 0.82; height: .6;"
    );
    self.screen.setAttribute("position", "1.9 1.38 3.75");
    self.screen.setAttribute("rotation", "0 -145 0");
    this.el.appendChild(self.screen);
    self.screen.addEventListener("click", function () {
      self.screen.setAttribute("visible", true);
      self.screen.play();
    });
  },
});

document.addEventListener("click", function (event) {
  console.log("DOM fully loaded and parsed");

  var scene = document.querySelector("a-scene");

  var entity = document.createElement("a-entity");
  entity.setAttribute("swap-video", {
    // id: "max",
    // title: "Max Headroom",
    // vidSrc: "./assets/videos/MH_loop.mp4",
    // thumb: "./assets/videos/thumbs/max.png",
    videos: videos,
  });
  scene.appendChild(entity);
});
