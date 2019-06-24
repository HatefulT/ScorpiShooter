var PLATFORM_H = 20;

var Platform = function(x, y, _w) {
  this.x = x;
  this.y = y;
  this.w = _w;
}

Platform.prototype.draw = function () {
  fill(20, 255, 40);
  noStroke();
  rect(this.x, this.y, this.w, PLATFORM_H);
};

Platform.prototype.getCBox = function () {
  return { x: this.x, y: this.y, x1: this.x+this.w, y1: this.y+PLATFORM_H };
};
