var Enemy = function(x, y) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.runStep = 0;
  this.reloading = 0;
  this.hp = 100;
}

Enemy.prototype.update = function() {
  if(this.hp === 0) {
    delete enemies[enemies.indexOf(this)];
  }
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

  if(this.reloading % ENEMY_RELOAD_TIME === 0) {
    this.shoot();
    this.reloading = 0;
  }
  this.reloading++;
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

Enemy.prototype.shoot = function() {
  let a = atan2(p.y-this.y, p.x-this.x);
  bullets.push(new Bullet(this.x, this.y-ENEMY_H/2, cos(a)*BULLET_SPEED, sin(a)*BULLET_SPEED, true));
}

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
  push();
  translate(this.x-ENEMY_W/2, this.y-1.3*ENEMY_H);

  fill(128, 128, 128);
  noStroke();
  rect(0, 0, ENEMY_W, ENEMY_H/4, ENEMY_W/10);

  fill(255, 20, 20);
  noStroke();
  rect(0, 0, ENEMY_W/100 *this.hp, ENEMY_H/4, ENEMY_W/10);

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
