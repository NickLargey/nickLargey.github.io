/* global AFRAME */
AFRAME.registerComponent('play-on-click', {
  init: function () {
    this.onClick = this.onClick.bind(this);
  },
  play: function () {
    window.addEventListener('click', this.onClick);
  },
  pause: function () {
    window.removeEventListener('click', this.onClick);
  },
  onClick: function (evt) {
    // var vidPlaying = false;
    var videoEl = this.el.getAttribute('material').src;
    if (!videoEl) {
      return;
    }
    this.el.object3D.visible = true;
    // if (!vidPlaying) {
    //   vidPlaying = true;
    //   videoEl.play();
    // } else {
    //   vidPlaying = false;
    //   videoEl.pause();
    // }
  }
});
