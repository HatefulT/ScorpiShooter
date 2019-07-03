var Drop = function(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type; // 0 - +10 hp ; 1 - +40 ammo
}

Drop.prototype.draw = function () {
  push();
  translate(this.x-DROP_W/2, this.y-DROP_W);

  fill(217, 160, 102);
  stroke(144, 106, 68);
  rect(0, 0, DROP_W, DROP_W, DROP_W/4);

  pop();
};

Drop.prototype.getCBox = function () {
  return { x: this.x-DROP_W/2, y: this.y-DROP_W, x1: this.x+DROP_W/2, y1: this.y };
};
