var PLAYER_W = 16,
    PLAYER_H = 20,
    PLAYER_SPEED = 5;

var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.hp = 100;
  this.direction = true; // true - right, false - left;
}

Player.prototype.draw = function() {
  fill(255, 20, 20);
  stroke(20, 20, 20);
  rect(this.x-PLAYER_W/2, this.y-PLAYER_H, PLAYER_W, PLAYER_H);
}

Player.prototype.move = function(k) {
  var vx = 0,
      vy = 0;
  // if(k.w) jump();
  if(k.a) vx -= PLAYER_SPEED;
  if(k.d) vy += PLAYER_SPEED;
  // if(k.s)
  this.x += vx;
  this.y += vy;
}

Player.prototype.shoot = function() {
  
}

Player.prototype.collide = function(x, y) {
  var ax = this.x - PLAYER_W/2,
      ay = this.y - PLAYER_H,
      bx = this.x + PLAYER_W/2,
      by = this.y;
  return (x > ax && x < bx) && (y > ay && y < by);
}
