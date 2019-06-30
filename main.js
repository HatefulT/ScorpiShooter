var w, h;

var PLAYER_W = ENEMY_W = 20,
    PLAYER_H = ENEMY_H = 42,
    PLAYER_SPEED = 5,
    ENEMY_SPEED = 4,
    RELOAD_TIME = 20,
    JUMP_SPEED = 20,
    ENEMY_MIN_DISTANCE = 20,
    GRAVITY = 1,
    JUMPING_COOLDOWN = JUMP_SPEED / GRAVITY + 2;

let player;
var bullets = [],
    platforms = [],
    enemies = [];

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
  platforms.push(new Platform(w/2-100, h/2+50, 200));
  noSmooth();

  enemies.push(new Enemy(w/2, 280));
}

var draw = function() {
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
}

var keyPressed = function() {
  if(key.toLowerCase() == "w" || key.toLowerCase ( ) == "ц" || key.toLowerCase ( ) == " ") {
    keys.w = true;
  } else if(key.toLowerCase ( ) == 'a' || key.toLowerCase ( ) == 'ф') {
    keys.a = true;
  } else if(key.toLowerCase ( ) == 's' || key.toLowerCase ( ) == 'ы') {
    keys.s = true;
  } else if(key.toLowerCase ( ) == 'd' || key.toLowerCase ( ) == 'в') {
    keys.d = true;
  }
}

var keyReleased = function() {
  if(key.toLowerCase ( ) == "w" || key.toLowerCase ( ) == "ц" || key.toLowerCase ( ) == ' ') {
    keys.w = false;
  } else if(key.toLowerCase ( ) == 'a' || key.toLowerCase ( ) == 'ф') {
    keys.a = false;
  } else if(key.toLowerCase ( ) == 's' || key.toLowerCase ( ) == 'ы') {
    keys.s = false;
  } else if(key.toLowerCase ( ) == 'd' || key.toLowerCase ( ) == 'в') {
    keys.d = false;
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
