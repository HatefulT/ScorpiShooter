var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.vy = 0;
  this.hp = 100;
  this.reload = 0;
  this.jump_cooldown = 0;
  this.runStep = 0;
  this.hp = 100;
  this.bullets = 100;
  this.kills = 0;
}

Player.prototype.draw = function() {
  push();
  translate(this.x-PLAYER_W/2, this.y-PLAYER_H);
  if(this.vx != 0) {
    if(this.vx < 0) {
      scale(-1, 1);
      translate(-PLAYER_W, 0);
    }
  } else if(this.x-mouseX >= 0) {
    scale(-1, 1);
    translate(-PLAYER_W, 0);
  }

  const k = (PLAYER_H / spritemap.player.normal.h);

  var sprite = spritemap.player.normal;
  if(abs(this.vy) < JUMP_SPEED/2 && !this.onPlatform()) sprite = spritemap.player.jump[1];
  else if(this.vy <= JUMP_SPEED  && !this.onPlatform()) sprite = spritemap.player.jump[0];
  else if(this.vy >= JUMP_SPEED/2) sprite = spritemap.player.jump[2];
  else if(this.onPlatform() && this.vx != 0) {
    // console.log(this.vx);
    sprite = spritemap.player.run[this.runStep];
    if(frameCount % 8 == 0)
      this.runStep = (this.runStep+1 >= spritemap.player.run.length ? 0 : this.runStep+1);
  }
  drawSprite(sprite, k * sprite.w, k * sprite.h);
  pop();
}

Player.prototype.update = function() {
  if(this.x + PLAYER_W/2 >= w) {
    game.createLocation();
    this.x = PLAYER_W;
    this.y = h-100;
    return;
  }

  if(this.hp <= 0) {
    gameStarted = false;
    isDead = true;
    return;
  }
  let cbox = this.getCBox();

  this.vx = 0;
  if(keys.w) this.jump();
  if(keys.a) this.vx -= PLAYER_SPEED;
  if(keys.d) this.vx += PLAYER_SPEED;
  if(this.x + this.vx - PLAYER_W/2 < 0) this.vx = 0;

  this.vy += GRAVITY;

  let a = this.slowDownIfCollise(cbox, this.vx, this.vy);
  this.vx = a.vx;
  this.vy = a.vy;

  this.x += this.vx;
  this.y += this.vy;

  // this.vy *= 0.9; // friction

  this.reload += (this.reload%RELOAD_TIME == 0) ? 0 : 1;
  this.jump_cooldown += (this.jump_cooldown%JUMPING_COOLDOWN == 0) ? 0 : 1;
}

Player.prototype.shoot = function(x, y) {
  if(this.reload % RELOAD_TIME != 0 || this.bullets <= 0) return;
  a = Math.atan2(y-this.y, x-this.x) + random(-BULLET_SPREAD, BULLET_SPREAD);
  bullets.push(new Bullet(this.x, this.y - PLAYER_H/2, BULLET_SPEED*cos(a), BULLET_SPEED*sin(a), false));
  this.reload = 1;
  this.bullets --;
}

Player.prototype.jump = function() {
  if(this.onPlatform() && this.jump_cooldown % JUMPING_COOLDOWN == 0) {
    this.vy = -JUMP_SPEED;
    this.jump_cooldown = 0;
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

Player.prototype.slowDownIfCollise = function (cbox, vx, vy, depth) {
  return {vx: this.slowDownX(cbox, vx, 0), vy: this.slowDownY(cbox, vy, 0)};
};

Player.prototype.onPlatform = function () {
  if(collide(moveCBox(this.getCBox(), 0, GRAVITY))) {
    return true;
  }
  return false;
};

Player.prototype.slowDownX = function(cbox, v, depth) {
  if(depth > 50) return 0;
  if(collide(moveCBox(cbox, v, 0))) {
    return this.slowDownX(cbox, v/2, depth+1);
  } else {
    return v;
  }
}

Player.prototype.slowDownY = function(cbox, v, depth) {
  if(depth > 50) return 0;
  if(collide(moveCBox(cbox, 0, v))) {
    return this.slowDownY(cbox, v/2, depth+1);
  } else {
    return v;
  }
}

var moveCBox = function(cbox, dx, dy) {
  return { x: cbox.x+dx, y: cbox.y+dy, x1: cbox.x1+dx, y1: cbox.y1+dy }
}
