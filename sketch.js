var database ,dog
var position
var button
//var form
var feed,add
var foodobject
var Feedtime
var Lastfeed

//Create variables here

function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(800, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food();
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

  feed = createButton("FEED DOG")
  feed.position(900,60)
  feed.mousePressed(FeedDog)

  add = createButton("ADD FOOD")
  add.position(800,60)
  add.mousePressed(AddFood)

  var input = createInput("Name");
  var button = createButton('NEXT');
  
  input.position(130, 160);
  button.position(250, 200);
 
  button.mousePressed(function(){
 
    button.hide();
 
    var name = input.value();
    
    var greeting = createElement('h3');
    greeting.html("Hello " + name )
    greeting.position(130, 160)
  });
   
} 

function draw(){
 background(46,139,87);

 foodobject.display()
 
 fill(255,255,254);
 textSize(15);

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(x){
  if(x>0){
    x=x-1
  }
  else{
    x=0
  }
  database.ref('/').set({
    'Food': x
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}