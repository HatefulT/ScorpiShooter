var game = {
  setup: function() {
    p = new Player(30, h-100);
    bullets = [];
    gameover.choosed = -1;
    game.createLocation();
  },
  draw: function() {
    drawBackground();
    p.update();
    if(mouseIsPressed) {
      p.shoot(mouseX, mouseY);
    }
    p.draw();

    for(var i=0; i<bullets.length; i++) {
      if(bullets[i] != undefined) bullets[i].update();
      if(bullets[i] != undefined) bullets[i].draw();
    }

    for(var i=0; i<enemies.length; i++) {
      if(enemies[i] != undefined) enemies[i].update();
      if(enemies[i] != undefined) enemies[i].draw();
    }

    for(var i=0; i<platforms.length; i++) {
      platforms[i].draw();
    }

    for(var i=0; i<drops.length; i++) {
      if(drops[i] != undefined) {
        if(intersect(drops[i].getCBox(), p.getCBox())) {
          if(drops[i].type === 0) p.hp += 10;
          else if(drops[i].type === 1) p.bullets += 40;
          delete drops[i];
        } else drops[i].draw();
      }
    }

    textSize(spritemap.redcross.h);
    stroke(255, 20, 20);
    fill(255, 20, 20);
    textAlign(LEFT);

    push();

    translate(5, h-spritemap.redcross.h-5);
    drawSprite(spritemap.redcross);
    text(p.hp, spritemap.redcross.w + 2, spritemap.redcross.h);

    pop();
    push();
    translate(5+80, h-PLATFORM_H);
    drawSprite(spritemap.bullet_icon);
    text(p.bullets, spritemap.redcross.w + 2, spritemap.redcross.h);
    pop();

    textSize(30);
    text("Kills: " + p.kills, 10, 20);

  },
  createLocation: function() {
    platforms = [];
    enemies = [];
    drops = [];

    const H = h / PLATFORM_H;
    var n = round(random(4, 5));
    platforms.push(new Platform(0, h-H, w));
    for(var i=0; i<n; i++) {
      let x = (i+1 === n) ? round(random(100, w-100)) : round(random(w-100)),
          y = 2*H+i*(h-3*H)/n,
          _w = min(round(random(100, w/2)), w-x);
      platforms.push(new Platform(x, y, _w));
      enemies.push(new Enemy(random(x, x+_w), y-2));
    }
  }
}
