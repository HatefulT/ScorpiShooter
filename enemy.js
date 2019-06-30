var Enemy = function(x, y) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.runStep = 0;
}

Enemy.prototype.update = function() {
  this.vx = 0;
  if(this.x - p.x < -ENEMY_MIN_DISTANCE) {  // go left
    this.vx = ENEMY_SPEED;
  } else if(this.x - p.x > ENEMY_MIN_DISTANCE){
    this.vx = -ENEMY_SPEED;
  }

  this.vy += GRAVITY;

  let a = this.slowDownIfCollise(this.getCBox(), this.vx, this.vy);
  this.vx = a.vx;
  this.vy = a.vy;

  this.x += this.vx;
  this.y += this.vy;
}

Enemy.prototype.getCBox = function () {
  return { x: this.x-ENEMY_W/2, y: this.y-ENEMY_H, x1: this.x+ENEMY_W/2, y1: this.y };
};

Enemy.prototype.onPlatform = function (cbox) {
  if(collide(moveCBox(cbox, 0, GRAVITY))) {
    return true;
  }
  return false;
};

Enemy.prototype.draw = function () {
  push();
  translate(this.x-ENEMY_W/2, this.y-ENEMY_H);

  if(this.x - p.x > 0) {
    scale(-1, 1);
    translate(-ENEMY_W, 0);
  }

  const k = ENEMY_W / spritemap.enemy.normal.w;

  var sprite = spritemap.enemy.normal;
  if(this.vx != 0) {
    sprite = spritemap.enemy.run[this.runStep];
    if(frameCount % 9 == 0)
     this.runStep = (this.runStep+1 >= spritemap.enemy.run.length ? 0 : this.runStep+1);
  }
  drawSprite(sprite, k * sprite.w, k * sprite.h);

  pop();
};

Enemy.prototype.slowDownIfCollise = function (cbox, vx, vy, depth) {
  return {vx: this.slowDownX(cbox, vx, 0), vy: this.slowDownY(cbox, vy, 0)};
};

Enemy.prototype.slowDownX = function(cbox, v, depth) {
  if(depth > 200) return 0;
  if(collide(moveCBox(cbox, v, 0))) {
    return this.slowDownX(cbox, v, depth+1);
  } else {
    return v;
  }
}

Enemy.prototype.slowDownY = function(cbox, v, depth) {
  if(depth > 200) return 0;
  if(collide(moveCBox(cbox, 0, v))) {
    return this.slowDownY(cbox, v, depth+1);
  } else {
    return v;
  }
}
