---
layout: post
title: Simulation
date: 2017-09-22 00:00:00 +900
subject: pixar
description:
  Pixar in a Box is a behind-the-scenes look at how Pixar artists do their jobs. You will be able to animate bouncing balls, build a swarm of robots, and make virtual fireworks explode. The subjects you learn in school — math, science, computer science, and humanities — are used every day to create amazing movies at Pixar. This collaboration between Pixar Animation Studios and Khan Academy is sponsored by Disney. 
---

-------
#### Simple a particle falling due to gravity

<canvas id="canvas1"></canvas>
<button id="restart1" class="btn">Restart</button>

-------

#### 1D spring-mass system 
<canvas id="canvas2"></canvas>
<button id="restart2" class="btn">Restart</button>

--------

#### Damping
<canvas id="canvas3"></canvas>
<button id="restart3" class="btn">Restart</button>

--------

#### 2D spring-mass system

<canvas id="canvas4"></canvas>
<button id="restart4" class="btn">Restart</button>

--------

##### Multiple spring-mass system

<canvas id="canvas5"></canvas>
<button id="restart5" class="btn">Restart</button>






<script src="{{site.url}}/js/processing.min.js"></script>
<script>
function sketchProc1(processing) {
  var width = 400;
  var height = 400;
  var backgroundColor = processing.color(200, 200, 200);
  var gravity = 10;
  var mass = 30;
  var positionY = 100;
  var velocityY = 0;
  var timeStep = 0.02;
 
  processing.setup = function(){
    /* canvas size */ 
    processing.size(width,height);
  }
  
  processing.draw = function(){
  
  
   /* FORCE CALCULATIONS */
     var forceY = mass * gravity;
     var accelerationY = forceY/mass;
     velocityY = velocityY + accelerationY * timeStep;
     positionY = positionY + velocityY * timeStep;
     
     /* DRAW PARTICLE */
     processing.background(backgroundColor);
     processing.ellipse(200, positionY, 20, 20);
   
  }; 
  
};  

/* 1D spring-mass system*/
function sketchProc2(processing) {
  var width = 400;
  var height = 400;
  var backgroundColor = processing.color(200, 200, 200);
  var gravity = 10;
  var mass = 30;
  var positionY = 100;
  var velocityY = 0;
  var timeStep = 0.28;
  var anchorX = 209;
  var anchorY = 181;
  var k = 7;
  
  processing.setup = function(){
    /* canvas size */ 
    processing.size(width,height);
  }
  
  processing.draw = function(){
  
  
    /* FORCE CALCULATIONS */
    var springForceY = -k*(positionY - anchorY);
    var forceY = springForceY + mass * gravity;   
    var accelerationY = forceY/mass;
    velocityY = velocityY + accelerationY * timeStep;
    positionY = positionY + velocityY * timeStep;
     
    /* DRAW PARTICLE */
    processing.background(backgroundColor);
    processing.rect(anchorX-5, anchorY-5, 10, 10);
    processing.line(210, positionY, anchorX, anchorY);
    processing.ellipse(210, positionY, 20, 20);
    
  }; 

  
};  

/* Damped spring-mass system*/
function sketchProc3(processing) {
  var width = 400;
  var height = 400;
  var backgroundColor = processing.color(200, 200, 200);
  var gravity = 10;
  var mass = 30;
  var positionY = 200;
  var velocityY = 0;
  var timeStep = 0.28;
  var anchorX = 209;
  var anchorY = 181;
  var k = 2;
  var damping = 10;
  
  processing.setup = function(){
    /* canvas size */ 
    processing.size(width,height);
  }
  
  processing.draw = function(){
  
   /* FORCE CALCULATIONS */
    var springForceY = -k*(positionY - anchorY);
    var dampingForceY = damping * velocityY;
    var forceY = springForceY + mass * gravity - dampingForceY;
    var accelerationY = forceY/mass;
    velocityY = velocityY + accelerationY * timeStep;
    positionY = positionY + velocityY * timeStep;
     
    /* DRAW SPRING-MASS*/
    processing.background(255, 255, 255);
    processing.rect(anchorX-5, anchorY-5, 10, 10);
    processing.line(210, positionY, anchorX, anchorY);
    processing.ellipse(210, positionY, 20, 20);
    
  }; 
  
};  

/* 2D spring-mass system*/
function sketchProc4(processing) {
  var width = 400;
  var height = 400;
  var backgroundColor = processing.color(200, 200, 200);
  var gravity = 10;
  var mass = 30;
  var positionY = 200;
  var positionX = 150;
  var velocityY = 0;
  var velocityX = 0;
  var timeStep = 0.28;
  var anchorX = 209;
  var anchorY = 181;
  var k = 2;
  var damping = 10;
  
  processing.setup = function(){
    /* canvas size */ 
    processing.size(width,height);
  }
  
  processing.draw = function(){
  
   /* FORCE CALCULATIONS */
    var springForceY = -k*(positionY - anchorY);
    var springForceX = -k*(positionX - anchorX);
    var dampingForceY = damping * velocityY;
    var dampingForceX = damping * velocityX;
    var forceY = springForceY + mass * gravity - dampingForceY;
    var forceX = springForceX - dampingForceX;
    var accelerationY = forceY/mass;
    var accelerationX = forceX/mass;
    velocityY = velocityY + accelerationY * timeStep;
    velocityX = velocityX + accelerationX * timeStep;
    positionY = positionY + velocityY * timeStep;
    positionX = positionX + velocityX * timeStep;
     
    /* DRAW SPRING-MASS*/
    processing.background(255, 255, 255);
    processing.rect(anchorX-5, anchorY-5, 10, 10);
    processing.line(positionX, positionY, anchorX, anchorY);
    processing.ellipse(positionX, positionY, 20, 20);
    
  }; 
  
};  

/* Multiple spring-mass system*/
function sketchProc5(processing) {
  var width = 400;
  var height = 400;
  var backgroundColor = processing.color(200, 200, 200);
  
  var gravity = 5;
  var mass = 30;

  /* Mass 1*/
  var mass1PositionY = 238;
  var mass1PositionX = 89;
  var mass1VelocityY = 0;
  var mass1VelocityX = 0;

  /* Mass 2*/
  var mass2PositionY = 106;
  var mass2PositionX = 85;
  var mass2VelocityY = 0;
  var mass2VelocityX = 0;

  var timeStep = 0.28;
  var anchorX = 209;
  var anchorY = 53;
  var k = 2;
  var damping = 2;
  
  processing.setup = function(){
    /* canvas size */ 
    processing.size(width,height);
  }
  
  processing.draw = function(){
  
    /* Mass 1 Spring Force */
    var mass1SpringForceY = -k*(mass1PositionY - anchorY);
    var mass1SpringForceX = -k*(mass1PositionX - anchorX);
     
    /* Mass 2 Spring Force*/
    var mass2SpringForceY = -k*(mass2PositionY - mass1PositionY);
    var mass2SpringForceX = -k*(mass2PositionX - mass1PositionX);
     
    /* Mass 1 daming*/
    var mass1DampingForceY = damping * mass1VelocityY;
    var mass1DampingForceX = damping * mass1VelocityX;
     
    /* Mass 2 daming*/
    var mass2DampingForceY = damping * mass2VelocityY;
    var mass2DampingForceX = damping * mass2VelocityX;
     
     /* Mass 1 net force*/
    var mass1ForceY = mass1SpringForceY + mass * gravity - mass1DampingForceY - mass2SpringForceY + mass2DampingForceY;
     
    var mass1ForceX = mass1SpringForceX - mass1DampingForceX - mass2SpringForceX + mass2DampingForceX;
     
    /* Mass 2 net force*/
    var mass2ForceY = mass2SpringForceY + mass * gravity - mass2DampingForceY;
    var mass2ForceX = mass2SpringForceX - mass2DampingForceX;
     
    /* Mass 1 acceleration*/
    var mass1AccelerationY = mass1ForceY/mass;
    var mass1AccelerationX = mass1ForceX/mass;
     
    /* Mass 2 acceleration*/
    var mass2AccelerationY = mass2ForceY/mass;
    var mass2AccelerationX = mass2ForceX/mass;
     
     /* Mass 1 velocity*/
     mass1VelocityY = mass1VelocityY + mass1AccelerationY * timeStep;
     mass1VelocityX = mass1VelocityX + mass1AccelerationX * timeStep;
     
     /* Mass 2 velocity*/
     mass2VelocityY = mass2VelocityY + mass2AccelerationY * timeStep;
     mass2VelocityX = mass2VelocityX + mass2AccelerationX * timeStep;
     
     /* Mass 1 position*/
     mass1PositionY = mass1PositionY + mass1VelocityY * timeStep;
     mass1PositionX = mass1PositionX + mass1VelocityX * timeStep;
     
     /* Mass 2 position*/
     mass2PositionY = mass2PositionY + mass2VelocityY * timeStep;
     mass2PositionX = mass2PositionX + mass2VelocityX * timeStep;
    
     
     processing.background(255, 255, 255);
     processing.rect(anchorX-5, anchorY-5, 10, 10);
     /* Draw mass 1*/
     processing.line(mass1PositionX, mass1PositionY, anchorX, anchorY);
     processing.ellipse(mass1PositionX, mass1PositionY, 20, 20);
     /* Draw mass 2*/
     processing.line(mass2PositionX, mass2PositionY, mass1PositionX, mass1PositionY);
     processing.ellipse(mass2PositionX, mass2PositionY, 20, 20);
  
  }; 
  
};  

var canvas1 = document.querySelector("#canvas1");
var canvas2 = document.querySelector("#canvas2");
var canvas3 = document.querySelector("#canvas3");
var canvas4 = document.querySelector("#canvas4");
var canvas5 = document.querySelector("#canvas5");

/* attaching the sketchProc function to the canvas*/
var p1 = new Processing(canvas1, sketchProc1);
var p2 = new Processing(canvas2, sketchProc2);
var p3 = new Processing(canvas3, sketchProc3);
var p4 = new Processing(canvas4, sketchProc4);
var p5 = new Processing(canvas5, sketchProc5);

var b1 = document.querySelector("#restart1");
var b2 = document.querySelector("#restart2");
var b3 = document.querySelector("#restart3");
var b4 = document.querySelector("#restart4");
var b5 = document.querySelector("#restart5");

/* EventListener */
b1.addEventListener('click', function(evt) {
  p1.exit();
  p1 = new Processing(canvas1, sketchProc1);
});
b2.addEventListener('click', function(evt) {
  p2.exit();
  p2 = new Processing(canvas2, sketchProc2);
});
b3.addEventListener('click', function(evt) {
  p3.exit();
  p3 = new Processing(canvas3, sketchProc3);
});
b4.addEventListener('click', function(evt) {
  p4.exit();
  p4 = new Processing(canvas4, sketchProc4);
});
b5.addEventListener('click', function(evt) {
  p5.exit();
  p5 = new Processing(canvas5, sketchProc5);
});





</script>