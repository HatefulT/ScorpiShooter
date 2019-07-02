var game = {
  setup: function() {
    p = new Player(30, h-200);
    platforms.push(new Platform(0, h-115, w));
    platforms.push(new Platform(w/2-100, h/2+50, 200));

    enemies.push(new Enemy(w/2, 280));
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
  }
}
