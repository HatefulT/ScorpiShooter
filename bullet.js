var BULLET_W = 4,
    BULLET_SPEED = 10;

var Bullet = function(x, y, vx, vy) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
}

Bullet.prototype.update = function () {
  if(this.x < 0 || this.y < 0 || this.x >= w || this.y >= h || collide(this.getCBox())) {
    delete bullets[bullets.indexOf(this)];
  }
  this.x += this.vx;
  this.y += this.vy;
}

Bullet.prototype.draw = function () {
  fill(0, 0, 0);
  noStroke();
  rect(this.x-BULLET_W/2, this.y-BULLET_W/2, BULLET_W, BULLET_W);
};
Bullet.prototype.getCBox = function () {
  return { x: this.x-1, y: this.y-1, x1: this.x+1, y1: this.y+1 };
};
