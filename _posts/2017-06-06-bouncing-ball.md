---
layout: post
title:  Bouncing Balls
categories: post javascript oojs
description:
  MDNの Object Oriented Javascript の解説にあった練習課題です。
  複数のボールが壁に跳ね返るというものです。
---

----
MDNの Object Oriented Javascriptの解説にあった練習問題です。

複数のボールが飛び交い、壁に当たり跳ね返る。

ボールどうし衝突すると色が変わる。

画面の中の　丸印は　PCのキー　"W","A","S","D"で動かし
ボールに当てるとボールは消える

<div class="col s12 m4">
  <img src="{{site.url}}/images/bouncing-ball.PNG"/>  
</div>

デモ画面は <a href="{{site.url}}/MDN/javascript/oojs/bouncing-balls/">こちら</a>

##### Javascript
{% highlight javascript linenos %}
// setup canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var para = document.querySelector('p');
var paraText = para.textContent;

// function to generate random number
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// constructor function
function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists; 
}

function Ball(x, y, velX, velY, exists) {
        Shape.call(this, x, y, velX, velY, exists);

}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball; 
Ball.prototype.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';;
Ball.prototype.size = random(10,20);

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}

function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, this.velX, this.velY, exists);
}
EvilCircle.prototype.color = 'white';
EvilCircle.prototype.size = 10;
EvilCircle.prototype.velX = 20;
EvilCircle.prototype.velY = 20;

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  //ctx.lineWidth(3);
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}

EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.size) >= width) {
    this.x = width - this.size;
  }

  if ((this.x - this.size) <= 0) {
    this.x = this.size;
  }

  if ((this.y + this.size) >= height) {
    this.y = height - this.size;
  }

  if ((this.y - this.size) <= 0) {
    this.y = this.size;
  }

}

EvilCircle.prototype.setControls = function(){
  var _this = this;
  
  window.onkeydown = function(e) {
 
    if (e.keyCode === 65) {
      _this.x -= _this.velX;
    } else if (e.keyCode === 68) {
      _this.x += _this.velX;
    } else if (e.keyCode === 87) {
      _this.y -= _this.velY;
    } else if (e.keyCode === 83) {
      _this.y += _this.velY;
    }
  }
  this.x = _this.x;
  this.y = _this.y;
}

EvilCircle.prototype.collisionDetect = function(j) {
//  for (var j = 0; j < balls.length; j++) {
    
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        count--;
        para.textContent = paraText + eval(count);
      }
    
//  }
}

var balls = [];
var count = 0;

var evil = new EvilCircle(
  random(0,width),
  random(0,height),

//  20,
//  20,
  true  
);

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  while (balls.length < 25) {
    var ball = new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      true
    );
    count++;
    para.textContent = paraText + eval(count);
    balls.push(ball);

  }

  for (var i = 0; i < balls.length; i++) {

    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
      evil.collisionDetect(i);
    }
  }

  evil.checkBounds();
  evil.setControls();
  evil.draw();

  requestAnimationFrame(loop);
}

loop();

{% endhighlight %}


<br><br><br><br>