var menu = {
  draw: function() {
    image(menu_img, 0, 0, w, h);
    if(mouseX > 139 && mouseX < 139+351 &&
       mouseY > 267 && mouseY < 267+60 &&
       mouseIsPressed) {
       game.setup();
       gameStarted = true;
     }
  }
}
