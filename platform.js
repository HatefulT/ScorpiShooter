var Platform = function(x, y, _w) {
  this.x = x;
  this.y = y;
  this.w = _w;
  this.texture = [];
  const k = spritemap.platform.normal[0].h / PLATFORM_H;
  W = _w;
  this.texture.push(spritemap.platform.left);
  W -= spritemap.platform.left.w*k;
  W -= spritemap.platform.right.w*k;

  while(W > 0) {
    var r = floor(random(spritemap.platform.normal.length));
    if(W - spritemap.platform.normal[r].w*k >= 0) {
      this.texture.push(spritemap.platform.normal[r]);
      W -= spritemap.platform.normal[r].w*k;
    } else {
      this.texture.push(spritemap.platform.normal[6]);
      W -= spritemap.platform.normal[6].w*k;
    }
  }

  this.texture.push(spritemap.platform.right);
}

Platform.prototype.draw = function () {
  const k = this.texture[0].h / PLATFORM_H;
  var _x = this.x;
  for(var i=0; i<this.texture.length; i++) {
    push();
    translate(_x, this.y);
    drawSprite(this.texture[i], k*this.texture[i].w, k*PLATFORM_H);
    pop();
    _x += k*this.texture[i].w;
  }
};

Platform.prototype.getCBox = function () {
  const k = this.texture[0].h / PLATFORM_H;
  return { x: this.x, y: this.y+2*k, x1: this.x+this.w, y1: this.y+PLATFORM_H-2*k };
};
