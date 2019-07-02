let bg;
let spriteshit;
let scorpi_text;

var preload = function() {
  bg = loadImage("assets/1.png");
  spriteshit = loadImage("assets/sprites.png");
  scorpi_text = loadImage("assets/scorpi.png");
}

var drawBackground = function() {
  const k = h / bg.height;
  const scaledwidth = bg.width * k;

  let N = ceil(w / scaledwidth);
  for(var i=0; i<N; i++) {
    image(bg, i*scaledwidth, 0, scaledwidth, h);
  }
}

var drawSprite = function(obj, _w, _h) {
  if(_w && _h) image(spriteshit, 0, 0, _w, _h, obj.x, obj.y, obj.w, obj.h);
  else image(spriteshit, 0, 0, obj.w, obj.h, obj.x, obj.y, obj.w, obj.h);
}

let spritemap = {
  player: {
    normal: { x: 81, y: 48, w: 13, h: 21 },
    jump: [
      { x: 18, y: 48, w: 17, h: 22 },
      { x: 36, y: 48, w: 20, h: 19 },
      { x: 58, y: 48, w: 21, h: 21 }
    ],
    run: [
      { x: 2, y: 58, w: 12, h: 21 },
      { x: 0, y: 81, w: 17, h: 21 },
      { x: 0, y: 104, w: 17, h: 21 },
      { x: 2, y: 127, w: 13, h: 22 },
      { x: 18, y: 48, w: 12, h: 21 }
    ]
  },
  platform: {
    left:  { x: 44,  y: 18, w: 10, h: 27 },
    right: { x: 133, y: 18, w: 11, h: 27 },
    normal: [
      { x: 55,  y: 18, w: 7, h: 27 },
      { x: 63,  y: 18, w: 2, h: 27 },
      { x: 67,  y: 18, w: 9,  h: 27 },
      { x: 78,  y: 18, w: 2, h: 27 },

      { x: 80, y: 18, w: 2, h: 27 },
      { x: 87, y: 18, w: 4, h: 27 },
      { x: 91, y: 18, w: 1, h: 27 },
      { x: 96, y: 18, w: 3, h: 27 },

      { x: 101, y:18, w: 3, h: 27 },
      { x: 105, y: 18, w: 2, h: 27 },
      { x: 111, y: 18, w: 9, h: 27 },
      { x: 123, y: 18, w: 7, h: 27 },
    ]
  },
  bullet: { x: 39, y: 39, w: 2, h: 1 },
  enemy: {
    normal: { x: 38, y: 157, w: 12, h: 22 },
    run: [
      { x: 22, y: 131, w: 12, h:23 },
      { x: 18, y: 156, w: 18, h: 24 },
      { x: 35, y: 107, w: 17, h: 23 },
      { x: 37, y: 132, w: 13, h: 23 }
    ]
  },
  redcross: { x: 0, y: 150, w: 17, h: 17 }
}
