let bg;
let spriteshit;

var preload = function() {
  bg = loadImage("assets/1.png");
  spriteshit = loadImage("assets/sprites.png");
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
    normal: { x: 0, y: 36, w: 10, h: 21 },
    jump: [
      { x: 18, y: 48, w: 12, h: 21 },
      { x: 32, y: 48, w: 16, h: 21 },
      { x: 50, y: 48, w: 17, h: 21 }
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
    left:  { x: 44,  y: 18, w: 23, h: 28 },
    right: { x: 121, y: 18, w: 23, h: 26 },
    normal: [
      { x: 66,  y: 18, w: 11, h: 29 },
      { x: 77,  y: 18, w: 15, h: 30 },
      { x: 91,  y: 18, w: 1,  h: 23 },
      { x: 110, y: 18, w: 11, h: 29 }
    ]
  },
  bullet: { x: 39, y: 39, w: 2, h: 1 }
}
