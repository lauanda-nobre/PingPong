let device;
if ("ontouchstart" in window) {
  device = "touch";
} else {
  device = "notouch";
}

function setup() {
  if (device == "notouch") {
    setup();
  } else if (device == "touch") {
    window.location.replace("./message.html");
  }
}

function draw() {
  if (device == "notouch") {
    draw();
  }
}
