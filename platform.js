var PLATFORM_H = 20;

var Platform = function(x, y, _w) {
  this.x = x;
  this.y = y;
  this.w = _w;
  this.texture = [];
  W = _w;
  this.texture.push(spritemap.platform.left);
  W -= spritemap.platform.left.w;
  W -= spritemap.platform.right.w;

  while(W > 0) {
    var r = floor(random(spritemap.platform.normal.length));
    if(W - spritemap.platform.normal[r].w >= 0) {
      this.texture.push(spritemap.platform.normal[r]);
      W -= spritemap.platform.normal[r].w;
    }
  }

  this.texture.push(spritemap.platform.right);
}

Platform.prototype.draw = function () {
  // fill(20, 255, 40);
  // noStroke();
  // rect(this.x, this.y, this.w, PLATFORM_H);
  var _x = this.x;
  for(var i=0; i<this.texture.length; i++) {
    push();
    translate(_x, this.y);
    drawSprite(this.texture[i]);
    pop();
    _x += this.texture[i].w;
  }
};

Platform.prototype.getCBox = function () {
  return { x: this.x, y: this.y, x1: this.x+this.w, y1: this.y+PLATFORM_H };
};
