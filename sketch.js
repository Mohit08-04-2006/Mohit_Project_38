var dog, dogImg, dogImg2;
var feed;
var food = 0;
var lastFeed = 0;
var gameState = 0;
var currentTime;
var bedroomImg, gardenImg, WashroomImg, livingroom;
var bath, sleep, play, play_park;

function preload(){
	 dogImg = loadImage("Dog.png");
   dogImg2 = loadImage("Happy.png");
   bedroom = loadImage("Bed Room.png")
   garden = loadImage("Garden.png")
   Washroom = loadImage("Wash Room.png")
   Lazy = loadImage("Lazy.png");
   livingroom = loadImage("Living Room.png")
}

function setup() {
  database = firebase.database();
  console.log(database);

	createCanvas(500,500);
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.1;

  var foodStock = database.ref("food");
  foodStock.on("value",function(data){
    food = data.val();
  });

  var feedTime = database.ref("feedTime/lastFeed");
  feedTime.on("value",function(data){
    lastFeed = data.val();
  });

  var readState = database.ref("gameState");
  readState.on("value",function(data){
    gameState = data.val();
  });

//  feed = new Feed();
  dogFood = new Food();
}

function draw() {  
  background(46,139,87);
  fill('skyblue');

  if (lastFeed>=12){
    text("Last Feed: "+lastFeed%12+"PM",350,30);
  }
  else if (lastFeed == 0){
    text("Last Feed: 12AM",350,30);
  }
  else{
    text("Last Feed: "+lastFeed+"AM",350,30);
  }

  if (gameState == 1){
    dogFood.washroom();
  }
  else if (gameState == 2){
    dogFood.bedroom();
  }
  else if (gameState == 3){
    dogFood.garden();
  }
  else if (gameState == 4){
    dogFood.livingroom();
  }

 // feed.display();

  if (gameState != 0){
    dog.visible = false;
  }
  else{
    Button();
    dog.visible = true;
    dogFood.display();
  }
 
  drawSprites();
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
 }

 function Button(){
  feed = createButton("Feed The Dog");
  feed.position(370,100);
  feed.mousePressed(function(){ console.log("hello");
  update(0);
  dog.addImage(dogImg2);
  food-=1;
  lastFeed++;
  database.ref('/').update({
  "food":food

 })});

 var addfood = createButton("Add Food");
  addfood.position(490,100);
  addfood.mousePressed(function(){
    database.ref('/').update({
      "food": food
      });
      food++;
  });

  bath = createButton("I want to take bath");
  bath.position(580,100);
  bath.mousePressed(function(){
    update(1);
  });

  sleep = createButton("I am very Sleepy");
  sleep.position(720,100);
  sleep.mousePressed(function(){
    update(2);
  });

  play = createButton("Lets Play!");
  play.position(490,130);
  play.mousePressed(function(){
    update(4);
  });

  play_park = createButton("Lets Play in Park");
  play_park.position(580,130);
  play_park.mousePressed(function(){
    update(3);
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}
