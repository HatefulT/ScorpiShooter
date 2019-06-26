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
    normal: { x: 0, y: 36, w: 10, h: 21 }
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
  }
}