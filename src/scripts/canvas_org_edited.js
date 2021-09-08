import { CanvasSpace, Create, Polygon, Line, Vec } from "pts";

// Initiate Space and Form
var space = new CanvasSpace("#pts").setup({
  bgcolor: "#252934",
  resize: true,
  retina: true,
});
var form = space.getForm();

// Elements
// var pts = [];
var center = space.size.$divide(1.8); // 0,0
var angle = -(window.innerWidth * 0.5); // angle: -371.5
var count = window.innerWidth * 0.05; // 37.15
if (count > 150) count = 150;
// var line = new Line(0, angle).to(space.size.x, 0);
var line = new Line([[0, 50], space.pointer]);
var mouse = center.clone();

// var r = Math.min(space.size.x, space.size.y) * 1;
// for (var i = 0; i < count; i++) {
//   var p = new Vec(
//     Math.random() * r - Math.random() * r,
//     Math.random() * r - Math.random() * r
//   );
//   // p.moveBy(center).rotate2D((i * Math.PI) / count, center);
//   p.brightness = 0.1;
//   pts.push(p);
// }
const pts = Create.distributeRandom(space.innerBound, 100);

console.log(space.height);

var colors = ["#FF3F8E", "#04C2C9", "#2E55C1"];

space.add({
  animate: (time, fps, context) => {
    for (var i = 0; i < pts.length; i++) {
      // rotate the points slowly
      var pt = pts[i];

      // pt.rotate2D(Const.one_degree / 20, center);
      form
        .stroke(false)
        .fill(colors[i % 3])
        .point(pt, 1);

      // get line from pt to the mouse line
      // var ln = new Line(pt).to(line.getPerpendicularFromPoint(pt));

      // opacity of line derived from distance to the line
      var opacity = Math.min(0.8);
      // var distFromMouse = Math.abs(ln.getDistanceFromPoint(mouse));

      // if (distFromMouse < 50) {
      //   if (pts[i].brightness < 0.3) pts[i].brightness += 0.015;
      // } else {
      //   if (pts[i].brightness > 0.1) pts[i].brightness -= 0.01;
      // }

      var color = "rgba(255,255,255," + pts[i].brightness + ")";
      // form.stroke(color).fill(true).line(ln);
    }
  },

  onMouseAction: function (type, x, y, evt) {
    if (type == "move") {
      mouse.set(x, y);
    }
  },

  onTouchAction: function (type, x, y, evt) {
    this.onMouseAction(type, x, y);
  },
});

// bind mouse events and play animation
space.bindMouse().bindTouch().play();
