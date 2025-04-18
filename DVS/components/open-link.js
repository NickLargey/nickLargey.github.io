AFRAME.registerComponent("open-link", {
  schema: {
    link: { type: "string", default: "" },
  },
  init: function () {
    this.el.addEventListener("click", this.onClick.bind(this));
    this.el.addEventListener("mouseenter", this.onEnter.bind(this));
    this.el.addEventListener("mouseleave", this.onLeave.bind(this));
  },
  onEnter: function () {
    this.el.setAttribute("text-geometry", "bevelEnabled", "true");
  },
  onLeave: function () {
    this.el.setAttribute("text-geometry", "bevelEnabled", "false");
  },
  onClick: function () {
    const link = this.data.link;
    if (link) {
      window.open(link); // Open the link in a new tab
    } else {
      console.warn("No link attribute found on the element.");
    }
  },
  update: function () {},
  tick: function () {},
  remove: function () {},
  pause: function () {},
  play: function () {},
});
