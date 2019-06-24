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
  p.move(keys);
  p.draw();

  for(var i=0; i<bullets.length; i++) {
    bullets.update();
    bullets.draw();
  }
}

var keyPressed = function() {
  if(key == "w" || key == "ц") {
    keys.w = true;
  } else if(key == 'a' || key == 'ф') {
    keys.a = true;
  } else if(key == 's' || key == 'ы') {
    keys.s = true;
  } else if(key == 'd' || key == 'в') {
    keys.d = true;
  }
}

var keyReleased = function() {
  if(key == "w" || key == "ц") {
    keys.w = false;
  } else if(key == 'a' || key == 'ф') {
    keys.a = false;
  } else if(key == 's' || key == 'ы') {
    keys.s = false;
  } else if(key == 'd' || key == 'в') {
    keys.d = false;
  }
}
