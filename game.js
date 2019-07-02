var game = {
  setup: function() {
    p = new Player(30, h-200);
    bullets = [];

    let a = game.createLocation();
    platforms = a.platforms;
    enemies = a.enemies;
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

    translate(5, h-spritemap.redcross.h-5);
    drawSprite(spritemap.redcross);
    textSize(spritemap.redcross.h);
    stroke(255, 20, 20);
    fill(255, 20, 20);
    textAlign(LEFT);
    text(p.hp, spritemap.redcross.w + 2, spritemap.redcross.h);
  },
  createLocation: function() {
    var plats = [],
        enemies = [];
    const H = h / PLATFORM_H;
    var n = round(random(4, 5));
    plats.push(new Platform(0, h-H, w));
    for(var i=0; i<n; i++) {
      plats.push(new Platform(round(random(w-100)), H+i*(h-2*H)/n, round(random(100, w/2))));
    }
    return {platforms: plats, enemies: enemies};
  }
}
