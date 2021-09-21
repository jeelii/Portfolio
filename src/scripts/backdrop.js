import { CanvasSpace, Create } from "pts";

const space = new CanvasSpace("#pts").setup({
  bgcolor: "#1c292e",
  resize: true,
  retina: true,
});
const form = space.getForm();

let pts = [];
let ratio = {};
let fraction;

const getRatio = (area) => {
  return {
    count: (area[0] * area[1]) / 17000,
    length: area[1],
    width: (area[1] * 0.7 * area[0]) / area[1],
  };
};

const getValue = (max, fraction) => {
  return max - max * fraction;
};

const getColor = (fraction) => {
  const red = getValue(0, fraction);
  const green = getValue(135, fraction);
  const blue = getValue(158, fraction);
  const opacity = getValue(1, fraction);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
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
      form.fillOnly("fc9105").point(p, getValue(0.9, fraction), "square");
      form
        .strokeOnly(getColor(fraction), 1)
        .line([p, p.$add(ratio.width, -ratio.length)]);
      p.rotate2D(0.00003 / fraction, space.innerBound.center);
    });
  },
  action: function (type, x, y, event) {
    if (type == "click") {
      pts[pts.length - 1] = space.pointer;
    }
  },
  resize: function (size, event) {
    ratio = getRatio(space.innerBound.size);
    pts = Create.distributeRandom(space.innerBound, ratio.count);
  },
});

space.bindMouse().bindTouch().play();
