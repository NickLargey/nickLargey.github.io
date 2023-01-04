let hydraCanvas = document.getElementById("hydra-bg");
// set small size to avoid high resource demand:
hydraCanvas.width = Math.min(window.innerWidth / 2, 1280);
hydraCanvas.height = Math.min(window.innerHeight / 2, 720);

const hydra = new Hydra({
  canvas: hydraCanvas,
  detectAudio: false,
  enableStreamCapture: false,
});

osc(20, 0.03, 1.7)
  .kaleid()
  .mult(osc(20, 0.001, 0).rotate(1.58))
  .blend(o0, 0.94)
  .modulateScale(osc(10, 0), -0.03)
  .scale(0.8, () => 1.05 + 0.1 * Math.sin(0.05 * time + 0.1))
  .out(o0);
