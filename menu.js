var menu = {
  buttons: [],
  setup: function() {
    menu.buttons.push({
      x: w/2 - 150,
      y: 4*h/8,
      w: 300,
      h: h/8,
      text: "infinity mode",
      onFocus: function() {},
      onClick: function() {
        game.setup();
        gameStarted = true;
      }
    });
  },
  draw: function() {
    background(217, 160, 102);

    const k = scorpi_text.width / scorpi_text.height;
    image(scorpi_text, w/2-50*k, 50, 100*k, 100);

    // button
    stroke(110);
    fill(128);
    rect(menu.buttons[0].x, menu.buttons[0].y, menu.buttons[0].w, menu.buttons[0].h, menu.buttons[0].w/12);

    fill(0);
    textSize(50);
    textAlign(CENTER);
    text(menu.buttons[0].text, menu.buttons[0].x+menu.buttons[0].w/2, menu.buttons[0].y+menu.buttons[0].h-menu.buttons[0].h/4);

    if(mouseX > menu.buttons[0].x && mouseX < menu.buttons[0].x+menu.buttons[0].w &&
       mouseY > menu.buttons[0].y && mouseY < menu.buttons[0].y+menu.buttons[0].h ) {
       if(mouseIsPressed) menu.buttons[0].onClick();
       else menu.buttons[0].onFocus();
     }
  }
}
