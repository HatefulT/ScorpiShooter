var game = {
  setup: function() {
    p = new Player(30, h-100);
    bullets = [];

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

    textSize(spritemap.redcross.h);
    stroke(255, 20, 20);
    fill(255, 20, 20);
    textAlign(LEFT);

    push();

    translate(5, h-spritemap.redcross.h-5);
    drawSprite(spritemap.redcross);
    text(p.hp, spritemap.redcross.w + 2, spritemap.redcross.h);

    pop();

    translate(5+80, h-PLATFORM_H);
    drawSprite(spritemap.bullet_icon);
    text(p.bullets, spritemap.redcross.w + 2, spritemap.redcross.h);
  },
  createLocation: function() {
    platforms = [];
    enemies = [];
    const H = h / PLATFORM_H;
    var n = round(random(4, 5));
    platforms.push(new Platform(0, h-H, w));
    for(var i=0; i<n; i++) {
      let x = round(random(w-100)),
          y = 2*H+i*(h-3*H)/n,
          _w = min(round(random(100, w/2)), w-x);
      platforms.push(new Platform(x, y, _w));
      enemies.push(new Enemy(random(x, x+_w), y-2));
    }
  }
}
