import { CanvasSpace, Create } from "pts";

const space = new CanvasSpace("#pts").setup({
  bgcolor: "#1c292e",
  resize: true,
  retina: true,
});
const form = space.getForm();

let pts = [];
let ratio = {
  count: 10,
  h: 100,
  w: 100
};
let fraction;

const getRatio = (area) => {
  return {
    count: (area[0] * area[1]) / 14000,
    h: area[1],
    w: area[0],
  };
};

const getValue = (max, fraction) => {
  return max - max * fraction;
};

const RGB_Linear_Shade = (p, c) => {
  var i = parseInt, r = Math.round, [a, b, c, d] = c.split(","), P = p < 0, t = P ? 0 : 255 * p, P = P ? 1 + p : 1 - p;
  return "rgb" + (d ? "a(" : "(") + r(i(a[3] == "a" ? a.slice(5) : a.slice(4)) * P + t) + "," + r(i(b) * P + t) + "," + r(i(c) * P + t) + (d ? "," + d : ")");
};

const getColor = (p, ratio, fraction) => {
  const xPos = p[0];
  const yPos = p[1];
  const xMax = ratio.w;
  const yMax = ratio.h;
  const shade = yPos > yMax / 2 ? -yPos / 2 / yMax : (yMax - yPos) / yMax / 2;
  const opacity = shade > 0 ? 1 - shade : 1 + shade;
  const c1 = `rgba(23, 132, 138,${opacity})`; // primary
  const c2 = `rgba(221, 102, 38,${opacity})`;
  const c3 = `rgba(220, 174, 48,${opacity})`;
  let color = xPos > xMax / 2 ? c2 : c3;
  if (fraction < .15) color = c1;
  return RGB_Linear_Shade(shade, color);
};

const isOutside = (p, ratio) => {
  if (p[0] < 0) return true;
  if (p[1] < 0) return true;
  if (p[0] > ratio.w) return true;
  if (p[1] > ratio.h) return true;
  return false;
};

space.add({
  start: function (time, ftime) {
    ratio = getRatio(space.innerBound.size);
    pts = Create.distributeRandom(space.innerBound, ratio.count);
  },
  animate: function (time, ftime) {
    if (space.pointer.id === "move" || space.pointer.id === "click") {
      pts.sort(
        (a, b) =>
          a.$subtract(space.pointer).magnitudeSq() -
          b.$subtract(space.pointer).magnitudeSq()
      );
    }
    pts.forEach((p, i) => {
      fraction = i / pts.length;
      form
        .fillOnly(getColor(p, ratio, fraction))
        .point(p, getValue(9, fraction), "square");
      p.rotate2D(0.0003 / fraction / 2, space.pointer);
      if (isOutside(p, ratio)) {
        pts[i][0] = Math.random() * ratio.w;
        pts[i][1] = Math.random() * ratio.h;
      }
    });
  },
  action: function (type, x, y, event) {
    if (type == "click") {
      console.log(space.pointer);
      pts[pts.length - 1] = space.pointer;
    }
  },
  resize: function (size, event) {
    ratio = getRatio(space.innerBound.size);
    pts = Create.distributeRandom(space.innerBound, ratio.count);
  },
});

space.bindMouse().bindTouch().play();
