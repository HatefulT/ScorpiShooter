var w, h;

const PLAYER_W = ENEMY_W = 20,
    PLAYER_H = ENEMY_H = 42,
    PLAYER_SPEED = 5,
    ENEMY_SPEED = 4,
    RELOAD_TIME = 20,
    ENEMY_RELOAD_TIME = 50,
    BULLET_DMG = 10,
    BULLET_SPREAD = 0.2,
    JUMP_SPEED = 20,
    ENEMY_MIN_DISTANCE = 70,
    ENEMY_LOOK_DISTANCE = 200,
    GRAVITY = 1,
    JUMPING_COOLDOWN = JUMP_SPEED / GRAVITY,
    PLATFORM_H = 20,
    DROP_W = 20,
    REGENERATION_HP = 10,
    REGENERATION_TIME = 60;

let player;
var bullets = [],
    platforms = [],
    enemies = [],
    drops = [];

var keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  space: false
};

var gameStarted = false,
    isDead = false;

var setup = function() {
  w = window.innerWidth < 610 ? window.innerWidth : 607;
  h = window.innerHeight < 510 ? window.innerHeight : 500;
  createCanvas(w, h);
  noSmooth();
  gameover.setup();
}

var draw = function() {
  if(gameStarted) game.draw();
  else if(isDead) gameover.draw();
  else menu.draw();
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
