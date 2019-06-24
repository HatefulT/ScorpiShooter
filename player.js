var PLAYER_W = 16,
    PLAYER_H = 20,
    PLAYER_SPEED = 5,
    RELOAD_TIME = 20;

var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.vy = 0;
  this.hp = 100;
  this.direction = true; // true - right, false - left;
  this.reload = 0;
}

Player.prototype.draw = function() {
  fill(255, 20, 20);
  stroke(20, 20, 20);
  rect(this.x-PLAYER_W/2, this.y-PLAYER_H, PLAYER_W, PLAYER_H);
}

Player.prototype.update = function() {
  let cbox = this.getCBox();

  var vx = 0;
  if(keys.w) this.jump();
  if(keys.a) vx -= PLAYER_SPEED;
  if(keys.d) vx += PLAYER_SPEED;
  if(this.x + vx + PLAYER_W/2 >= w || this.x + vx - PLAYER_W/2 < 0) vx = 0;

  this.vy += GRAVITY;

  let a = this.slowDownIfCollise(cbox, vx, this.vy);
  vx = a.vx;
  this.vy = a.vy;
  // console.log(this.vy);

  this.x += vx;
  this.y += this.vy;

  this.vy *= 0.9;

  this.reload += (this.reload%RELOAD_TIME == 0) ? 0 : 1;
}

Player.prototype.shoot = function(x, y) {
  if(this.reload % RELOAD_TIME != 0) return;
  a = Math.atan2(y-this.y, x-this.x,);
  bullets.push(new Bullet(this.x, this.y - PLAYER_H/2, BULLET_SPEED*cos(a), BULLET_SPEED*sin(a)));
  this.reload = 1;
}

Player.prototype.jump = function() {
  if(this.vy == 0) {
    this.vy = -40;
    keys.w = false;
  }
}

Player.prototype.collide = function(x, y) {
  var ax = this.x - PLAYER_W/2,
      ay = this.y - PLAYER_H,
      bx = this.x + PLAYER_W/2,
      by = this.y;
  return (x > ax && x < bx) && (y > ay && y < by);
}

Player.prototype.getCBox = function () {
  return { x: this.x-PLAYER_W/2, y: this.y-PLAYER_H, x1: this.x+PLAYER_W/2, y1: this.y };
};

Player.prototype.slowDownIfCollise = function (cbox, vx, vy) {
  var newVx = vx,
      newVy = vy,
      needToSlowAgain = false;
  if(collide(moveCBox(cbox, vx, 0))) {
    newVx /= 2;
    needToSlowAgain = true;
  }
  if(collide(moveCBox(cbox, 0, vy))) {
    newVy /= 2;
    needToSlowAgain = true;
  }
  if(needToSlowAgain) {
    return this.slowDownIfCollise(cbox, (abs(newVx) < 0.25 ? 0 : newVx), (abs(newVy) < 0.25 ? 0 : newVy));
  } else return {vx: newVx, vy: newVy};
};

var moveCBox = function(cbox, dx, dy) {
  return { x: cbox.x+dx, y: cbox.y+dy, x1: cbox.x1+dx, y1: cbox.y1+dy }
}
