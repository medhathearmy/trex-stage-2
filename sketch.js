var trex,trexanimation,ground, groundimage, iiground,cloudii,ob1,ob2,b3,ob4,ob5,ob6,count,PLAY,END,gamestate,obGroup,cloudGroup,trexDead;

function preload(){
trexanimation=loadAnimation("trex1.png","trex3.png","trex4.png");
trexDead=loadAnimation("trex_collided.png");
groundimage=loadImage("ground2.png");
cloudii=loadImage("cloud.png");
ob1=loadImage("obstacle1.png");
ob2=loadImage("obstacle2.png");
ob3=loadImage("obstacle3.png");
ob4=loadImage("obstacle4.png");  
ob5=loadImage("obstacle5.png");  
ob6=loadImage("obstacle6.png");
}



function setup() {
  createCanvas(600, 200);
  trex=createSprite(30,173,5,5);
  trex.scale=0.45;
  trex.addAnimation("t1",trexanimation);
  trex.addAnimation("t2",trexDead);
  ground=createSprite(300,190,600,1)
  ground.addImage(groundimage);
  iiground=createSprite(300,193,600,1);
  iiground.visible=false;
  count=0;
  PLAY=1;
  END=0;
  gamestate=PLAY;
  obGroup=new Group();
  cloudGroup= new Group();
}

function draw() {
  background(247);
text("score: "+ count, 500, 20)
 
  
  if(gamestate === PLAY){
    ground.velocityX=-5;
    count=count+Math.round(getFrameRate()/60);
  if(keyDown("space")){
  trex.velocityY=-12;
  }
 trex.velocityY = trex.velocityY + 0.8;
  if (ground.x < 0){
    ground.x = ground.width/2;
    }
  spawnClouds();

  spawnObstacles();
  if(obGroup.isTouching(trex)){
   gamestate=END;
  }
  
  }
else if(gamestate===END){
  ground.velocityX = 0;
   cloudGroup.setVelocityXEach(0);
   obGroup.setVelocityXEach(0);
   trex.velocityY=0;
   cloudGroup.setLifetimeEach(-1);
   obGroup.setLifetimeEach(-1)
  trex.changeAnimation("t2",trexDead);
}
  
  
  
  
trex.collide(iiground);
   
  drawSprites();

}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,20,40,10);
    cloud.y = random(20,80);
   cloud.addImage(cloudii);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 207;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudGroup.add(cloud);
  }
} 
function spawnObstacles(){
 if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(ob1);   
      break;
    case 2:obstacle.addImage(ob2);   
      break;
    case 3:obstacle.addImage(ob3);   
      break;
    case 4:obstacle.addImage(ob4);   
      break;
    case 5:obstacle.addImage(ob5);   
      break;
    case 6:obstacle.addImage(ob6);   
      break;
      default:break;
    }
           
  obGroup.add(obstacle);
    
   //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.7;
    obstacle.lifetime = 110;
  }

}
