var gameover = {
  choosed: -1,
  setup: function() {
    gameover.restart_btn = { x: w/2-spritemap.btn_to_menu.w/2, y: h/2-50, w: spritemap.btn_to_menu.w, h: spritemap.btn_to_menu.h };
  },
  draw: function() {
    this.choosed = (this.choosed == -1) ? spritemap.deathsigns[floor(random(spritemap.deathsigns.length))] : this.choosed;
    push();
    translate(w/2-this.choosed.w/2, 100-this.choosed.h/2);
    drawDeathSign(this.choosed);
    pop();
    push();
    translate(this.restart_btn.x, this.restart_btn.y);
    drawDeathSign(spritemap.btn_to_menu);
    pop();
    if(mouseX > gameover.restart_btn.x && mouseX < gameover.restart_btn.x+gameover.restart_btn.w &&
       mouseY > gameover.restart_btn.y && mouseY < gameover.restart_btn.y+gameover.restart_btn.h &&
       mouseIsPressed) {
      gameStarted = false;
      isDead = false;
    }
  }
};
