// Initiate Space and Form
var space = new CanvasSpace("#pts").setup({
  bgcolor: "#252934",
  resize: true,
  retina: true,
});
var form = space.getForm();

// Pts.quickStart("#pt", "#123");

(function () {
  var de = new Delaunay(); // Delaunay is a Group of Pts
  var triangles = []; // store the delaunay triangles
  var cells = []; // store the voronoi cells
  var lastPt = new Pt();

  // A simple function to repel the points if they are too close
  let repel = (size) => {
    for (let k = 0, len = de.length; k < len; k++) {
      for (let i = 0, len = de.length; i < len; i++) {
        if (i !== k) {
          let d = de[k].$subtract(de[i]);
          if (d.magnitudeSq() < size * size) {
            de[k].subtract(d.$divide(-size / 3));
            de[i].subtract(d.$divide(size / 3));
          }
        }
      }
    }
  };

  space.add({
    start: (bound) => {
      // Create 20 random points and generate initial tessellations
      de = Create.delaunay(Create.distributeRandom(space.innerBound, 20));
      triangles = de.delaunay();
      cells = de.voronoi();
    },

    animate: (time, ftime) => {
      // draw the cells
      form.strokeOnly("#505561", 1).polygons(triangles);
      form.fill("#93a0bf").points(de, 2, "circle");
      form.strokeOnly("#a3baf0").polygons(cells);

      // If more than 100 pts are added, do fancy things
      if (de.length >= 100) {
        de[de.length - 1] = space.pointer;
        repel(50);
        triangles = de.delaunay();
        cells = de.voronoi();

        // Guides: Show the neighbor cells of the point nearest to pointer
        let nearIndex = Polygon.nearestPt(de, space.pointer);
        de.neighbors(nearIndex, true).map((n) => {
          form.strokeOnly("rgba(73,121,235, .9)", 2).polygon(n.triangle);
          form.strokeOnly("rgba(255,255,0,.3)", 1).circle(n.circle);
          form.fillOnly("#fe6", 1).point(n.circle[0], 2);
        });
      }
    },

    action: (type, x, y) => {
      // Add up to 100 points on mouse move
      if (type == "move" && de.length < 100) {
        let p = new Pt(x, y);
        if (lastPt.$subtract(p).magnitudeSq() > 1000) {
          lastPt = p;
          de.push(p);
          triangles = de.delaunay();
          cells = de.voronoi();
        }
      }
    },
  });

  //// ----

  space.bindMouse().bindTouch().play();
})();
