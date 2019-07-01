var BULLET_W = 4,
    BULLET_SPEED = 10;

var Bullet = function(x, y, vx, vy, type) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.ownerType = type; // false - player's shoot, true - enemy's shoot
}

Bullet.prototype.update = function () {
  if(this.x < 0 || this.y < 0 || this.x >= w || this.y >= h || collide(this.getCBox())) {
    delete bullets[bullets.indexOf(this)];
  }

  let myCBox = this.getCBox();

  if(!this.ownerType) {
    for(var i=0; i<enemies.length; i++) {
      if(enemies[i] === undefined) continue;
      if(intersect(myCBox, enemies[i].getCBox())) {
        enemies[i].hp -= BULLET_DMG;
        delete bullets[bullets.indexOf(this)];
      }
    }
  } else {
    if(intersect(myCBox, p.getCBox())) {
      p.hp -= BULLET_DMG;
      delete bullets[bullets.indexOf(this)];
    }
  }

  this.x += this.vx;
  this.y += this.vy;
}

Bullet.prototype.draw = function () {
  push();
  translate(this.x, this.y);
  rotate(atan2(this.vy, this.vx));

  fill(0, 0, 0);
  noStroke();
  var k = spritemap.bullet.w / spritemap.bullet.h;
  // rect(0, 0, BULLET_W, BULLET_W);
  drawSprite(spritemap.bullet, k * BULLET_W, BULLET_W);
  pop();
};
Bullet.prototype.getCBox = function () {
  return { x: this.x-1, y: this.y-1, x1: this.x+1, y1: this.y+1 };
};
