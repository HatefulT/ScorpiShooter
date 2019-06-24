var w, h;

var GRAVITY = 10;

let player;
var bullets = [];
var platforms = [];

var keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  space: false
};

var setup = function() {
  w = window.innerWidth; h = window.innerHeight;
  createCanvas(w, h);
  p = new Player(30, h-200);
  platforms.push(new Platform(0, h-115, w));
}

var draw = function() {
  background(255);
  p.update(keys);
  if(mouseIsPressed) {
    p.shoot(mouseX, mouseY);
  }
  p.draw();

  for(var i=0; i<bullets.length; i++) {
    bullets[i].update();
    bullets[i].draw();
  }

  for(var i=0; i<platforms.length; i++) {
    platforms[i].draw();
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
  } else if(key == " ") {
    keys.space = true;
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
  } else if(key == " ") {
    keys.space = false;
  }
}

var collide = function(cbox) {
  for(var i=0; i<platforms.length; i++) {
    if(intersect(cbox, platforms[i].getCBox())) return true;
  }
  return false;
}

var intersect = function(a,b){
  return(
    (
      (
        ( a.x>=b.x && a.x<=b.x1 )||( a.x1>=b.x && a.x1<=b.x1  )
      ) && (
        ( a.y>=b.y && a.y<=b.y1 )||( a.y1>=b.y && a.y1<=b.y1 )
      )
    )||(
      (
        ( b.x>=a.x && b.x<=a.x1 )||( b.x1>=a.x && b.x1<=a.x1  )
      ) && (
        ( b.y>=a.y && b.y<=a.y1 )||( b.y1>=a.y && b.y1<=a.y1 )
      )
    )
  )||(
    (
      (
        ( a.x>=b.x && a.x<=b.x1 )||( a.x1>=b.x && a.x1<=b.x1  )
      ) && (
        ( b.y>=a.y && b.y<=a.y1 )||( b.y1>=a.y && b.y1<=a.y1 )
      )
    )||(
      (
        ( b.x>=a.x && b.x<=a.x1 )||( b.x1>=a.x && b.x1<=a.x1  )
      ) && (
        ( a.y>=b.y && a.y<=b.y1 )||( a.y1>=b.y && a.y1<=b.y1 )
      )
    )
  );
}
