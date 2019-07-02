var gameover = {
  setup: function() {
    gameover.restart_btn = { x: w/2-100, y: h/2-50, w: 200, h: 70 };
  },
  draw: function() {
    fill(0);
    stroke(0);
    textAlign(CENTER);
    textSize(50);
    text("GameOver, but it's OK ;)", w/2, h/5);

    fill(200, 50, 70, 20);
    stroke(200, 50, 70);
    rect(gameover.restart_btn.x, gameover.restart_btn.y, gameover.restart_btn.w, gameover.restart_btn.h, 15);

    fill(255);
    stroke(0);
    text("to menu", w/2, h/2);

    if(mouseX > gameover.restart_btn.x && mouseX < gameover.restart_btn.x+gameover.restart_btn.w &&
       mouseY > gameover.restart_btn.y && mouseY < gameover.restart_btn.y+gameover.restart_btn.h &&
       mouseIsPressed) {
      gameStarted = false;
      isDead = false;
    }
  }
};
