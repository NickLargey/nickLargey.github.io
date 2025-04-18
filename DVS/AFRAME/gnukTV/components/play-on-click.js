/* global AFRAME */
AFRAME.registerComponent("play-on-click", {
  init: function () {
    this.vidPlaying = false;
    // this.onClick = this.onClick.bind(this);
  },
  play: function () {
    window.addEventListener("keydown", (event) => {
      if (event.key === " " || event.code === "Space") {
        console.log("Space key pressed!");
        this.onClick();
      }
    });
  },
  pause: function () {
    window.removeEventListener("keydown", (event) => {
      if (event.key === " " || event.code === "Space") {
        this.onClick;
      }
    });
  },
  onClick: function (evt) {
    var videoEl = this.el.getAttribute("material").src;
    if (!videoEl) {
      return;
    }
    if (!this.vidPlaying) {
      this.el.object3D.visible = true;
      console.log("Video is playing now!");
      this.vidPlaying = true;
      videoEl.play();
    } else {
      this.el.object3D.visible = false;
      console.log("Video is paused now!");
      this.vidPlaying = false;
      videoEl.pause();
    }
  },
});
