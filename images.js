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
  image(spriteshit, 0, 0, _w, _h, obj.x, obj.y, obj.w, obj.h);
}

let spritemap = {
  player: {
    normal: { x: 0, y: 36, w: 10, h: 21 }
  }
}
