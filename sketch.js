const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;




//var grArray = [];

var newTile;
var ladybug,ladybug_img;
var tile,tile_img;
var coin,coin_img;

var points = 0;
//var bk_song;

var ground;

function preload()
{
  bg_img = loadImage('Bg.jpg');
  ladybug_img = loadImage('Ladybug.png');
  tile_img = loadImage('Tile.png');
  coin_img = loadImage('coins.png');

  bk_song = loadSound('theme song.mpeg');
  

 

}

function setup() 
{
  createCanvas(windowWidth,windowHeight);
  frameRate(80);

  bk_song.loop();
  bk_song.setVolume(0);

  engine = Engine.create();
  world = engine.world;

   
  ladybug = createSprite(600,200,50,50);
  ladybug.addImage(ladybug_img);
  ladybug.scale = 1.5;

  tile = createSprite(540,530,50,50);
  tile.addImage(tile_img);
  tile.scale = 1.5;

  coinG = new Group();
 

  rectMode(CENTER);
  ellipseMode(RADIUS);
 
}


function draw() 
{
  background(bg_img);
  



    textSize(25);
    fill("red");
    text("Points: "+ points,900,50);
    
    if(ladybug.isTouching(coinG)){
      coinG.destroyEach();
      points = points+10;
    }

    

 
  if(frameCount%140 === 0){
    tile.x = 500;
    tile.y = Math.round(random(20,100));
  

    tile.velocityY = 2;
    
  }
 

  
 

 if(keyDown(UP_ARROW)){
   ladybug.y = ladybug.y-2;
 }

 if(keyDown(DOWN_ARROW)){
  ladybug.y = ladybug.y+2;
}

if(keyDown(LEFT_ARROW)){
  ladybug.x = ladybug.x-2;
}

if(keyDown(RIGHT_ARROW)){
  ladybug.x = ladybug.x+2;
}
  
  
     if(keyDown("SPACE")){
       ladybug.velocityY = -10;
     }
     ladybug.velocityY = ladybug.velocityY + 0.8;

    

  Engine.update(engine);
 
 

  spawnCoin();
 

  if(ladybug.y > 800){
    textSize(30);
    fill("black");
    text("GAME OVER",500,200);
    coinG.setVelocityEach(0);
    tile.setVelocityEach(0);
    
  }
  drawSprites();

}

function spawnCoin(){
  if(frameCount % 150 === 0){
    var coin = createSprite(600,330,20,20);
    coin.y = Math.round(random(50,300));
    coin.x = tile.x+50;
    coin.y = tile.y;
    coin.addImage(coin_img);
    coin.scale = 0.1;
    coin.velocityY = 2;

    coin.lifeTime = 200;

    coin.depth = ladybug.depth;
    ladybug.depth = ladybug.depth+1;
    coinG.add(coin);
    
  }
}



