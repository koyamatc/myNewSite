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



var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");

// attaching the sketchProc function to the canvas
var p1 = new Processing(canvas1, sketchProc1);
var p2 = new Processing(canvas2, sketchProc2);

var b1 = document.querySelector("#restart1");
var b2 = document.querySelector("#restart2");

/* EventListener */
b1.addEventListener('click', function(evt) {
  p1.exit();
  p1 = new Processing(canvas1, sketchProc1);
});
b2.addEventListener('click', function(evt) {
  p2.exit();
  p2 = new Processing(canvas2, sketchProc2);
});





</script>