import Home from "./views/Home.js";
import Calendar from "./views/Calendar.js";
import Gallery from "./views/Gallery.js";
import Error from "./views/Error.js";
import Shop from "./views/Shop.js";

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: Home },
    { path: "/calendar", view: Calendar },
    { path: "/gallery", view: Gallery },
    { path: "/error", view: Error },
    { path: "/shop", view: Shop },
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }
  const view = new match.route.view();

  document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      const i8 = async () => {
        speed = 0.001;
        voronoi(8, 1)
          .mult(
            osc(10, 0.014, () => Math.sin(time) / 3)
              .saturate(3)
              .kaleid(200)
          )
          .modulate(o0, 0.5)
          .add(o0, 0.8)
          .scrollY(-0.01)
          .scale(0.99)
          .modulate(voronoi(8, 1.143), 0.002)
          .luma(0.3)
          .out(o0);
      };

      const o10 = () => {
        noise(3, 0.1, 7)
          .rotate(1, -1, -2)
          .mask(shape(20))
          .colorama(0.5)
          .modulateScale(o0)
          .modulateScale(o0, 1)
          .blend(o0)
          .blend(o0)
          .blend(o0)
          .blend(o0)
          .out(o0);
      };

      const i9 = async () => {
        osc(20, 0.03, 1.7)
          .kaleid()
          .mult(osc(20, 0.001, 0).rotate(1.58))
          .blend(o0, 0.94)
          .modulateScale(osc(10, 0), -0.03)
          .scale(0.8, () => 1.05 + 0.1 * Math.sin(0.05 * time + 0.1))
          .out(o0);
      };

      const goToURL = () => {
        navigateTo(e.target.href);
        i9();
      };

      o10();
      setTimeout(goToURL, 2000);
      e.preventDefault();
    }
  });
  router();
});
