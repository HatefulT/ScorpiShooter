var w, h;

let player;
var bullets = [];

var keys = {
  w: false,
  a: false,
  s: false,
  d: false
};

var setup = function() {
  w = window.innerWidth; h = window.innerHeight;
  createCanvas(w, h);
  p = new Player(w/2, h);
}

var draw = function() {
  background(255);
  p.move();
  p.draw();

  for(var i=0; i<bullets.length; i++) {
    bullets.update();
    bullets.draw();
  }
}

var keyPressed = function() {
  if(key == "w" || key == "ц") {
    keys.w = true;
  }
}
