var BULLET_W = 2;

var Bullet = function(x, y, vx, vy) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
}

Bullet.prototype.update = function () {
  this.x += vx;
  this.y += vy;
}

Bullet.prototype.draw = function () {
  fill(0, 0, 0);
  noStroke();
  rect(this.x-BULLET_W/2, this.y-BULLET_W/2, BULLET_W, BULLET_W);
};
