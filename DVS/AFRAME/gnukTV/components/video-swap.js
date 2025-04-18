AFRAME.registerComponent("video-swap", {
  schema: {
    videos: [
      {
        id: "men-who-make",
        title: "Devo: The Men Who Make The Music",
        vidsrc: "./assets/videos/Devo - The Men Who Make The Music (1979).mp4",
        img: "./assets/videos/thumbs/We're_All_DEVO_thumb.jpg",
      },
      {
        id: "max",
        title: "The Max Headroom Event",
        vidsrc: "./assets/videos/MH_loop.mp4",
        img: "./assets/videos/thumbs/max.png",
      },
    ],
  },
  dependencies: ["material"],

  init: function () {
    console.log(this.data.videos[0]);
    this.currentID = 0;
    this.onClick = this.onClick.bind(this);
    this.update();
  },
  play: function () {
    window.addEventListener("click", this.onClick);
  },
  onClick: function (evt) {
    const videoMaterial = this.el.getAttribute("material").src;
    const vidTitle = this.data.videos[this.currentID].title;
    const videoSrc = this.data.videos[this.currentID].vidsrc;
    const boxArtSrc = this.data.videos[this.currentID].img;

    if (videoSrc) {
      videoMaterial.src = videoSrc;
      this.el.object3D.visible = true;
      videoMaterial.play();
      this.currentID = (this.currentID + 1) % this.data.length;
      console.log("Video Source: ", videoSrc);
      console.log("Video ID: ", this.currentID);
    }
    // if (boxArtSrc) {
    //   this.el.setAttribute("material", "src", boxArtSrc);
    // }
  },

  remove: function () {
    // Do something when the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },
});
