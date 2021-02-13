var balloon,db,position;

function preload(){
    backgroundImg = loadImage("images/bg.png");
    balloon_moving = loadAnimation("balloon1.png","balloon2.png","balloon3.png");
 }
 
function setup(){
    createCanvas(500,500);
    balloon = createSprite(250,250,10,10);
   // balloon.addAnimation("moving", balloon_moving);


db=firebase.database();
balloonref = db.ref("balloon/position")
balloonref.on("value",readPosition,showErrors)
}


function draw(){
    background(backgroundImg);
    if(position!==undefined){  
   
    if(keyDown(LEFT_ARROW)){
      balloon.x = balloon.x-10
    }
    else if(keyDown(RIGHT_ARROW)){
        balloon.x = balloon.x+10
    }
    else if(keyDown(UP_ARROW)){
        balloon.y = balloon.y-10
    }
    else if(keyDown(DOWN_ARROW)){
        balloon.y = balloon.y+10
    }

    if(keyDown(UP_ARROW)){
        updatePosition(0,-10)
        balloon.addAnimation("hotAirBalloon",balloon)
    }
    drawSprites();
}
}

function changePosition(x,y){
    // ball.x = ball.x + x;
    // ball.y = ball.y + y;
    db.ref("balloon/position").update({
        x: position.x + x,
        y: position.y + y
    });
}

function readPosition(data){
position=data.val()
balloon.x = position.x
balloon.y = position.y
}

function showErrors(){
    console.log("Error in database")
}