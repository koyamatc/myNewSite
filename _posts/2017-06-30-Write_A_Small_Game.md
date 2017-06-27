---
layout: post
title: Wite a small game
date: 2017-06-26 00:00:00 +900
categories: post edx javascript
description:
  edx's course by W3C.
  Introductory course designed to understand 
  the basic concepts of JavaScript.  
---

-------
<style type="text/css">
canvas {
   border: 1px solid black;
}
</style>

### Introduction to drawing/animating
#### HTML5 Canvas basic usage

HTML5 canvas は、絵を描いたり、アニメーションを作成するのに便利な透明な要素です。
##### A typical HTML code for adding a canvas to a Web page:
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="utf-8">
  <title>Draw a monster in a canvas</title>
 </head>
 <body>
  <canvas id="myCanvas" width="200" height="200"></canvas>
 </body>
</html>
{% endhighlight %}

8行目に canvas が宣言されています。 属性で幅と高さを指定しています。
しかし、CSSプロパティを追加しないと、画面に見えません、なぜならば透明だからです。

canvasが表示されるように、周囲に境界線を指定します 1px black border :
{% highlight css linenos %}
canvas {
   border: 1px solid black;
}
{% endhighlight %}

canvasを使った練習:

<ul class="collection">
    <li class="collection-item">
    1. ページが完全に読み込まれた（DOMが使用できるようになった）後に、呼び出される関数を使い、DOMの中の canvas を選択します。( init 関数ですね、 window.onload = init )
    </li>
    <li class="collection-item">
    2. 次に、この canvas ように 2D グラフィック　コンテキストを取得します (このコンテキストはオブジェクトです、canvas に絵を描いたり、グローバルプロパティである、色、グラデーション、模様、線の幅などを設定するのに使用します
    </li>
    <li class="collection-item">
    3. 次は何かを描くだけです
    </li>
    <li class="collection-item">
    4. canvas と　コンテキスト・オブジェクトのためにグローバル変数を使うことを忘れないように。また、canvas の幅と高さをどこかに保持しておくことをお勧めします。後々役立つでしょう。
    </li>
    <li class="collection-item">
    5. コンテキスト (color, line width, coordinate system, etc.)を変える関数のために、コンテキストを保存することから始めます、そして、元に戻して終了します
    </li>
</ul>

<canvas id="myCanvas"  width="200" height="200"></canvas>

Extract from the JavaScript code:
{% highlight javascript linenos %}
// useful to have them as global variables
var canvas, ctx;
 
window.onload = function init() {
  // called AFTER the page has been loaded
  canvas = document.querySelector("#myCanvas");
  // important, we will draw with this object
  ctx = canvas.getContext('2d');
  // ready to go! We can use the context for drawing
  // or changing colors, line widths, etc.
  // filled rectangle
  ctx.fillStyle = 'red';
  ctx.fillRect(10, 10, 30, 30);
  // wireframe rectangle
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 4;
  ctx.strokeRect(100, 40, 40, 40);
  // fill circle, will use current ctx.fillStyle
  ctx.beginPath();
  ctx.arc(60, 60, 10, 0, 2*Math.PI);
  ctx.fill(); // or ctx.stroke() for a wireframe circle
  // some text
  ctx.fillStyle = "purple";
  ctx.font = "20px Arial";
  ctx.fillText("Hello!", 60, 20); // or ctx.strokeText for wireframe
}
{% endhighlight %}
Explanations:

<ul class="collection">
    <li class="collection-item">
    1. We use a function (line 4) called after the page is loaded (we say "after the DOM is ready"), so that the querySelector at line 6 will return the canvas.  If the page was not completely loaded and if this code had been run before it had finished loading, the canvas value would have been "undefined".
    </li>
    <li class="collection-item">
    2. Once we have the canvas, we request a "graphic context" (line 8). This is a variable for 2D or 3D  drawing on a canvas (in our case: 2D!) that we will use for drawing or setting colors, line widths, text fonts, etc.    
    </li>
    <li class="collection-item">
    3. Then we can draw. Here we show only a few things you can do with the canvas API, but believe me, you can do much more (draw images, gradients, textures, etc.)! At line 15, we draw a filled rectangle. Parameters are the x and y coordinates of the top left corner (x goes to the right, y to the bottom of your screen), and the width and the height of the rectangle. At line 14, we used the fillStyle property of the context to set the color of filled shapes. This means: "now, all filled shapes you are going to draw will be in red!". It's like a global setting.
    </li>
    <li class="collection-item">
    4. Lines 17-20 draw a green wireframe rectangle, with a line width equal to 4 pixels. Notice the use of "stroke" instead of "fill" in the property name strokeStyle/fillStyle and in the context method for drawing a rectangle strokeRect/fillRect.
    </li>
    <li class="collection-item">
    5. Lines 23-25 draw a filled circle. The syntax is a bit different as circles are parts of a "path" (see the HTML5 fundamentals course, we explain the concept of "path" in the canvas API). Just keep in mind for now that before drawing a circle you need to call beginPath(). The call to arc(x, y, radius, start_angle, end_angle) does not draw the circle, it defines it. The next instruction ctx.fill() at line 25 will draw all shapes that have been defined since a new path began, as filled shapes. Calling ctx.stroke() here, instead of ctx.fill() would have drawn a wireframe circle instead of a filled one. Also note that the filled circle is red even if we did not specify the color. Remember that we set ctx.fillStyle = 'red' at line 14. Unless we change this, all filled shapes will be red.   
    </li>
    <li class="collection-item">
    6. Lines 28-30 draw a filled text. The call to filltext(message, x, y) draws a filled text at the x,y position; this time in purple as we called ctx.fi
    </li>
</ul>

##### Example 2: functions that save and restore the context before drawing
<canvas id="myCanvas2"  width="200" height="200"></canvas>

{% highlight javascript linenos %}
// useful to have them as global variables
var canvas, ctx, w, h; 

window.onload = function init() {
    // called AFTER the page has been loaded
    canvas = document.querySelector("#myCanvas");
  
    // often useful
    w = canvas.width; 
    h = canvas.height;  
  
    // important, we will draw with this object
    ctx = canvas.getContext('2d');
  
    // ready to go !
    drawFilledRectangle(10, 10, 20, 20, "red");
  
    drawFilledCircle(100, 100, 15, "green");
};

function drawFilledRectangle(x, y, width, height, color) {
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();
  
    // translate the coordinate system, draw relative to it
    ctx.translate(x, y);
  
    ctx.fillStyle = color;
    // (0, 0) is the top left corner of the monster.
    ctx.fillRect(0, 0, width, height);
  
    // GOOD practice: restore the context
    ctx.restore();
}

function drawFilledCircle(x, y, radius, color) {
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();
  
    // translate the coordinate system, draw relative to it
    ctx.translate(x, y);
  
    ctx.fillStyle = color;
    // (0, 0) is the top left corner of the monster.
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fill();
 
    // GOOD practice: restore the context
    ctx.restore();
}
{% endhighlight %}

###### Explanations:

This time we've written two functions for a cleaner code: one function that draws a filled rectangle with a given color, and one function that draws a filled circle, with a given color.

The values for x, y, width, height, radius, color can be passed as parameters to these functions.

When a function changes anything to the "global context": filled or stroke color, line width, or the position of the coordinate system (located by default in 0, 0, at the top left of the canvas), then it is good practice to save this context at the beginning of the function, with a call to ctx.save(), and to restore it at the end of the function, with a call to ctx.restore(). In this way, any change to the "global context" won't have any effect outside of the function.

We used also ctx.translate(x, y) in order to move the rectangle and the circle (look, they have been drawn at x=0, y=0, but as we translate the origin of the coordinate system with ctx.translate, the shapes are located in x, y on in the canvas). This is also a good practice: indeed, if we add more shapes (like eyes in the rectangle, in order to draw a monster), using coordinates relative to 0, 0, the whole set of shapes will be translated by the call to ctx.translate(x, y). This will make it easier to draw characters, monsters, etc. as we will see in a third example.


###### Example 3: draw a monster instead of a simple rectangle or circle

This is where you reap the benefits of your good habits of saving/restoring the context and using ctx.translate(x, y)!

<canvas id="myCanvas3"  width="200" height="200"></canvas>

Here is JavaScript code that implements these best practices:
{% highlight javascript linenos %}
// useful to have them as global variables
var canvas, ctx, w, h;

 
window.onload = function init() {
  // Called AFTER the page has been loaded
  canvas = document.querySelector("#myCanvas");

  // Often useful
  w = canvas.width;
  h = canvas.height;

  // Important, we will draw with this object
  ctx = canvas.getContext('2d');

  // Ready to go!
  // Try to change the parameter values to move
    // the monster
  drawMyMonster(10, 10); // try to change that
};
 
function drawMyMonster(x, y) {
  // Draw a big monster!
  // Head
  
  // BEST practice: save the context, use 2D transformations
  ctx.save();

  // Translate the coordinate system, draw relative to it
  ctx.translate(x, y);
  
  // (0, 0) is the top left corner of the monster.
  ctx.strokeRect(0, 0, 100, 100);
  
  // Eyes
  ctx.fillRect(20, 20, 10, 10);
  ctx.fillRect(65, 20, 10, 10);
  
  // Nose
  ctx.strokeRect(45, 40, 10, 40);
  
  // Mouth
  ctx.strokeRect(35, 84, 30, 10);
  
  // Teeth
  ctx.fillRect(38, 84, 10, 10);
  ctx.fillRect(52, 84, 10, 10);
  
  // BEST practice: restore the context
  ctx.restore();
}
{% endhighlight %}

In this small example, we used the context object to draw a monster using the default color (black) and wireframe and filled modes:

<ul class="collection">
    <li class="collection-item">
    ctx.fillRect(x, y, width, height): draws a rectangle whose top left corner is at (x, y) and whose size is specified by the width and height parameters; and both outlined by, and filled with, the default color.
    </li>
    <li class="collection-item">
    ctx.strokeRect(x, y, width, height): same but in wireframe mode.    
    </li>
    <li class="collection-item">
    Note that we use (line 30) ctx.translate(x, y) to make it easier to move the monster around. So, all the drawing instructions are coded as if the monster was in (0, 0), at the top left corner of the canvas (look at line 33). We draw the body outline with a rectangle starting from (0, 0). Calling context.translate "changes the coordinate system" by moving the "old (0, 0)" to (x, y) and keeping other coordinates in the same position relative to the origin.    
    </li>
    <li class="collection-item">
    Line 19: we call the drawMonster function with (10, 10) as parameters, which will cause the original coordinate system to be translated by (10, 10).    
    </li>
    <li class="collection-item">
    And if we change the coordinate system (this is what the call to ctx.translate(...) does) in a function, it is good practice to always save the previous context at the beginning of the function and restore it at the end of the function (lines 27 and 50).
    </li>
</ul>

----------

#### Animating

A typical animation loop will do the following at regular intervals:

<ul class="collection">
    <li class="collection-item">
    1. Clear the canvas 
    </li>
    <li class="collection-item">
    2. Draw graphic objects / shapes
    </li>
    <li class="collection-item">
    3. Move graphic shapes / objects
    </li>
    <li class="collection-item">
    4. Go to step 1
    </li>
</ul>

Optional steps can be:
<ul class="collection">
    <li class="collection-item">
    Look at the keyboard / mouse / gamepad if we need to do something according to their status (i.e. if the left arrow is pressed: move the player to the left)
    </li>
    <li class="collection-item">
    Test collisions: the player collided with an enemy, remove one life
    </li>
    <li class="collection-item">
    Test game states: if there are no more lives, then go to the "game over" state and display a "game over" menu.
    </li>
    <li class="collection-item">
    Etc.    
    </li>
</ul>

##### Example 1: let's do some animation

There are different methods for coding an animation loop in JavaScript, that are described in the above video, and detailed both in the HTML5 Coding Essentials and Best Practices W3Cx course (week 4), and in the HTML5 Apps and Games W3Cx course (Week 2 is for learning how to code HTML5 games).

In this intro course, we'll only use the recommended one, without going into advanced use.

The trick is to write a function, and at the end of this function, to ask the browser to call it again in 1/60th of a second if possible.

Here is an example:

<canvas id="myCanvas4"  width="200" height="200"></canvas>

##### Example 2: animating a ball that bounces on the sides of the canvas (walls)

<canvas id="myCanvas5"  width="200" height="200"></canvas>

##### Explanations:

This time we've used "simple objects" for the circle and the rectangles, and we've called them "player" and "ball":
{% highlight javascript linenos %}
var ball = {
  x: 100,
  y:100,
  radius: 15,
  color:'green',
  speedX:2,
  speedY:1
}
 
var player = {
  x:10,
  y:10,
  width:20,
  height:20,
  color:'red'
}
{% endhighlight %}
With this syntax, it's easier to manipulate "the x pos of the ball" - you just have to use ball.x. we added two properties to the ball object: speedX and speedY. Their value is the number of pixels that will be added to the current ball.x and ball.y position, at each frame of animation.

Let's look at the animation loop:
{% highlight javascript linenos %}
function mainLoop() {
  // 1 - clear the canvas
  ctx.clearRect(0, 0, w, h);
  // draw the ball and the player
  drawFilledRectangle(player);
  drawFilledCircle(ball);
 
  // animate the ball that is bouncing all over the walls
  moveBall(ball);
  // ask for a new animation frame
  requestAnimationFrame(mainLoop);
}
{% endhighlight %}
Now, let's decompose the animation loop in some external functions to make it more readable. At each frame of animation, we will clear the canvas, draw the player as a rectangle, draw the ball as a circle, and move the ball. 

You can take a look at the new versions of drawFilledRectangle that now take only one parameter named r, instead of x, y, width, height and a color. We've only changed a few things in its code (changed x to r.x, y to r.y, color to r.color etc.)

Let's look at the moveBall function:
{% highlight javascript linenos %}
function moveBall(b) {
    b.x += b.speedX;
    b.y += b.speedY;

    testCollisionBallWithWalls(b);
}
{% endhighlight %}
This function is called 60 times per second. So, 60 times per second we modify the b.x and b.y positions of the ball passed as parameter by adding to them the b.speedX and b.speedY property values.

Notice that we call moveBall(ball) from mainLoop. In the moveBall function, the ball passed as a parameter becomes the b parameter. So when we change the b.x value inside the function, we are in reality changing the x value of the global object ball! 

Ok, and at line 5 we call testCollisionBallWithWalls(b), which will test if the ball b hits a vertical or horizontal wall. Let's see an extract of this function now:
{% highlight javascript linenos %}
function testCollisionBallWithWalls(b) {
    // COLLISION WITH VERTICAL WALLS?
    if((b.x + b.radius) > w) {
        // the ball hit the right wall
        // change horizontal direction
        b.speedX = -b.speedX;

        // put the ball at the collision point
       b.x = w - b.radius;
    } ...
    ...
}
{% endhighlight %}
At line 3 you can see the test that checks if the ball b hits the right side of the canvas. The right wall is at w (the width of the canvas) on the X-axis. If we compare (b.x + b.radius) with w, we can check if a part of the ball extends beyond the right wall. 

Remember that each 1/60th of a second, the ball moves a certain number of pixels to the right (the exact value is b.speedX). Imagine that the ball moves 10 pixels to the right at each frame of animation. At some point, it will "cross the right wall". We cannot just change the sign of b.speedX to make it go to the other side. If we did this, it may stay stuck against the side with one half of the ball on either side of the wall. 

If we now remove b.speedX to the ball.x position, we return the ball to the position it was in before it hit the wall. If we then reverse speedX, the ball will indeed start moving with a reverse horizontal speed. This will work but can give a strange visual effect if the balls moves, say, 20 pixels per frame or more. The ball will never be in a position where the eye can "see it against the wall". This is why experienced game coders know that you just need to put the ball "at the contact position", not to its previous position, before reversing the speed value. This is done at lines 8-9. Try changing speedX to say, 20, and you'll see what we mean.

------------

#### Animating multiple objects
<canvas id="myCanvas6"  width="400" height="400"></canvas>

##### createBalls(numberOfBalls), returns an array of balls:
{% highlight javascript linenos %}
function createBalls(n) {
  // empty array
  var ballArray = [];

  // create n balls
  for(var i=0; i < n; i++) {
      var b = {
          x:w/2,
          y:h/2,
          radius: 5 + 30 * Math.random(), // between 5 and 35
          speedX: -5 + 10 * Math.random(), // between -5 and + 5
          speedY: -5 + 10 * Math.random(), // between -5 and + 5
          color: getARandomColor(),
      }
      // add ball b to the array
      ballArray.push(b);
  }
  // returns the array full of randomly created balls
  return ballArray;
}
{% endhighlight %}
##### Explanations:
<ul class="collection">
    <li class="collection-item">
    Line 3: we declare an empty array that will contain the balls,    
    </li>
    <li class="collection-item">
    Lines 7-14: we create a new ball object with random values. Note the use of Math.random(), a predefined JavaScript function that returns a decimal value between 0 and 1. We call another function named getARandomColor() that returns a color taken randomly.
    </li>
    <li class="collection-item">
    Line 16: we add the newly created ball b to the array,
    </li>
    <li class="collection-item">
    Line 19: we return the array to the caller.
    </li>
</ul>

##### The getARandomColor function
{% highlight javascript linenos %}
function getARandomColor() {
    var colors = ['red', 'blue', 'cyan', 'purple',
                  'pink', 'green', 'yellow'];
    // a value between 0 and color.length-1
    // Math.round = rounded value
    // Math.random() a value between 0 and 1
    var colorIndex = Math.round((colors.length-1)*Math.random());
    var c = colors[colorIndex];

    // return the random color
    return c;
}
{% endhighlight %}
###### Explanations:
<ul class="collection">
    <li class="collection-item">
    Line 2: in this function, we use an array of random color names named colors (you can go on the codePen example and change these colors or add new ones).
    </li>
    <li class="collection-item">
    Line 7: then we compute an index with a random value between 0 and colors.length-1. Remember that in an array of n elements, the index of the first is always 0 and the index of the last one is always equal to the length of the array -1. For example: var myArray = ['red', 'blue', 'green'], red is at index 0, green at index 2, while myArray.length = 3, the number of elements in the array.
    </li>
    <li class="collection-item">
    Lines 8 and 11: once we get a random index in the correct range, we can return the corresponding color.
    </li>
</ul>

##### Functions drawAllBalls and moveAllBalls:
{% highlight javascrpit linenos %}
function drawAllBalls(ballArray) {
    ballArray.forEach(function(b) {
        drawFilledCircle(b);
    });
}
 
function moveAllBalls(ballArray) {
    // iterate on all balls in array
    ballArray.forEach(function(b) {
        // b is the current ball in the array
        b.x += b.speedX;
        b.y += b.speedY;
        testCollisionBallWithWalls(b);
    });
}
{% endhighlight %}

##### Explanations:
<ul class="collection">
    <li class="collection-item">
    These two functions use an iterator on the array of balls (using the forEach method that looked the best fit here). The code inside the iterator is the same as in the previous example. We did not have to modify the testCollisionBallWithWalls code, for example.
    </li>
</ul>

-----------

### Mouse interactions, mouse events
#### Mouse interactions, mouse events in a canvas
##### INTRODUCTION

Detecting mouse events in a canvas is quite straightforward: you add an event listener to the canvas, and the browser invokes that listener when the event occurs.

The example below is about listening to mouseup and mousedown events (when a user presses or releases any mouse button):
{% highlight javascript linenos %}
canvas.addEventListener('mousedown', function (evt) {
    // do something with the mousedown event
});
 
canvas.addEventListener('mousedup', function (evt) {
    // do something with the mouseup event
});
{% endhighlight %}

The event received by the listener function will be used for getting the button number or the coordinates of the mouse cursor. Before looking at different examples, let's look at the different event types we can listen to.

##### The different mouse events (reminder)

In the last example, we saw how to detect the mouseup and mousedown events.

There are other events related to the mouse:
<ul class="collection">
    <li class="collection-item">
    mouseleave: similar to mouseout, fired when the mouse leaves the surface of the element. The difference between mouseleave and mouseout is that mouseleave does not fire when the cursor moves over descendant elements, and mouseout is fired when the element the cursor moves to is outside the bounds of the original element or is a child of the original element.
    </li>
    <li class="collection-item">
    mouseover: the mouse cursor is moving over the element that listens to that event. A mouseover event occurs on an element when you are over it - coming from either its child OR parent element, but a mouseenter event only occurs when the mouse moves from the parent element to the child element.
    </li>
    <li class="collection-item">
    mousedown: fired when a mouse button is pressed.
    </li>
    <li class="collection-item">
    mouseup: fired when a mouse button is released.
    </li>
    <li class="collection-item">
    mouseclick: fired after a mousedown and a mouseup have occured.
    </li>
    <li class="collection-item">
    mousemove: fired while the mouse moves over the element. Each time the mouse moves, a new event is fired, unlike with mouseover or mouseenter, where only one event is fired.
    </li>
</ul>

##### The tricky part: getting the position of the mouse relative to the canvas

When you listen to any of the above events, the event object (we call it a "DOM event"), passed to the listener function, has properties that correspond to the mouse coordinates: clientX and clientY.

However, these are what we call "viewport coordinates". Instead of being relative to the canvas itself, they are relative to the viewport (the visible part of the page).

Most of the time you need to work with the mouse position relative to the canvas, not to the viewport, so you must convert the coordinates between the viewport and the canvas. This will take into account the position of the canvas in the viewport, and the CSS properties that may affect the canvas position (margin, etc.).

Fortunately, there is a method for getting the position and size of any element in the viewport: getBoundingClientRect().

Here is an example that shows the problem:

Move the mouse cursor to the
top left corner of the canvas:<p></p>
<p>Instead of (0, 0), you will see coordinates relative to the window object (page)</p>
<canvas id="myCanvas7" width="300" height="200"></canvas>

##### WRONG code used in this example:
{% highlight javascript linenos %}
...
canvas.addEventListener('mousemove', function (evt) {
    mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    writeMessage(canvas, message);
}, false);
 
...
function getMousePos(canvas, evt) {
   // WRONG!!!
   return {
      x: evt.clientX,
      y: evt.clientY
   };
}
{% endhighlight %}

##### A good version of the code: 
<p> Move the mouse cursor and click anywhere!</p>
<canvas id="myCanvas8" width="300" height="200"></canvas>

And here is the fixed version of the getMousePos function:
{% highlight javascript linenos %}
function getMousePos(canvas, evt) {
   // necessary to take into account CSS boundaries
   var rect = canvas.getBoundingClientRect();
   return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
   };
}
{% endhighlight %}

----------

### Moving a player with the mouse
This time, we've added a mousemove event listener to the canvas in the init function, and reused the trick that you saw in the previous section to get the correct mouse position:

Working example:

<canvas id="myCanvas9"  width="400" height="400"></canvas>

Extract from the JavaScript source code:
{% highlight javascript linenos %}
var mousePos;
 
window.onload = function init() {
...
   // create 10 balls
   balls = createBalls(10);

   // add a mousemove event listener to the canvas
   canvas.addEventListener('mousemove', mouseMoved);
 
   // ready to go !
   mainLoop();
};
 
function mouseMoved(evt) {
   mousePos = getMousePos(canvas, evt);
}
 
function getMousePos(canvas, evt) {
   // from the previous section
   var rect = canvas.getBoundingClientRect();
   return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
   };
}
{% endhighlight %}
Line 9 defines a mousemove event listener: the mouseMoved callback function will be called each time the user moves the mouse on the canvas.

The mouseMoved(evt) function uses the trick from the previous section and puts the correct mouse position in the mousePos variable. 

With this code, as soon as we move the mouse on top of the canvas, we'll have this mousePos global variable (line1) that will contain the mouse position (in the form of the mousePos.x and mousePos.y properties).

And here is the new mainLoop function. We added a call to the mousePlayerWithMouse function:
{% highlight javascript linenos %}
function mainLoop() {
    // 1 - clear the canvas
    ctx.clearRect(0, 0, w, h);
    // draw the ball and the player
    drawFilledRectangle(player);
    drawAllBalls(balls);
 
    // animate the ball that is bouncing all over the walls
    moveAllBalls(balls);
    movePlayerWithMouse();
    // ask for a new animation frame
    requestAnimationFrame(mainLoop);
}
{% endhighlight %}
And here is the code of the movePlayerWithMouse function:
{% highlight javascript linenos %}
function movePlayerWithMouse() {
    if(mousePos !== undefined) {
        player.x = mousePos.x;
        player.y = mousePos.y;
    }
}
{% endhighlight %}

If the mouse position is defined, the player's x and y position will equal to the positions of the mouse pointer.

The mouse position may be undefined if the animation loop started without the mouse cursor being on top of the canvas. Remember that the mainLoop starts as soon as the page is loaded.

Perhaps it's occurred to you that it might be better to move the player "from its center" instead of from its top left corner. We leave this improvement to you! :-)

----------------

#### Making it a game! Adding collision detection

<canvas id="myCanvas10"  width="400" height="400"></canvas>


<script>
// useful to have them as global variables
var canvas,  canvas2, canvas3, canvas4, canvas5,
    canvas6, canvas7, canvas8, canvas9, canvas10,
    ctx, ctx2, ctx3, ctx4, ctx5, ctx6, ctx7, ctx8, ctx9, ctx10,
    w, w3, w4, w6, w9,
    h, h3, h4, h6, h9;
var mousePos;    
var xMonster = 10;
var yMonster = 10;
var monsterSpeed = 1;

var ball = {
  x: 100,
  y:100,
  radius: 15,
  color:'green',
  speedX:2,
  speedY:1
}

var player = {
  x:10,
  y:10,
  width:20,
  height:20,
  color:'red'
}

// an empty array!
var balls = []; 
var balls9 = [];
var balls10 = [];

window.onload = function init() {
    /* called AFTER the page has been loaded*/
    canvas = document.querySelector("#myCanvas");
    /* important, we will draw with this object*/
    ctx = canvas.getContext('2d');
  
    /* ready to go !*/
    /* filled rectangle*/
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, 30, 30);
  
    /* wireframe rectangle*/
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 4;
    ctx.strokeRect(100, 40, 40, 40);
  
    /* fill circle, will use current ctx.fillStyle*/
    ctx.beginPath();
    ctx.arc(60, 60, 10, 0, 2*Math.PI);
    ctx.fill();
  
    /* some text */
    ctx.fillStyle = "purple";
    ctx.font = "20px Arial";
    ctx.fillText("Hello!", 60, 20);

 /* called AFTER the page has been loaded*/
    canvas2 = document.querySelector("#myCanvas2");
  
    /* often useful*/
    w = canvas2.width; 
    h = canvas2.height;  
  
    /* important, we will draw with this object*/
    ctx2 = canvas2.getContext('2d');
  
    /* ready to go !*/
    drawFilledRectangle(10, 10, 20, 20, "red");
  
    drawFilledCircle(100, 100, 15, "green");

    /* called AFTER the page has been loaded*/
    canvas3 = document.querySelector("#myCanvas3");
  
    /* often useful*/
    w3 = canvas3.width; 
    h3 = canvas3.height;  
  
    /* important, we will draw with this object*/
    ctx3 = canvas3.getContext('2d');
  
    /* ready to go !*/
    /* Try to change the parameter values to move*/
    /* the monster*/
    drawMyMonster(10, 10, ctx3); 

    /*  example 2-1 */
 /* called AFTER the page has been loaded*/
    canvas4 = document.querySelector("#myCanvas4");
  
    /* often useful*/
    w4 = canvas.width; 
    h4 = canvas.height;  
  
    /* important, we will draw with this object*/
    ctx4 = canvas4.getContext('2d');
  
    /* ready to go !*/
    mainLoop();

    /* example 2-2 */
/* called AFTER the page has been loaded*/
    canvas5 = document.querySelector("#myCanvas5");
  
    /* often useful */ 
    w = canvas5.width; 
    h = canvas5.height;  
  
    /* important, we will draw with this object*/
    ctx5 = canvas5.getContext('2d');
  
    /* ready to go !*/
    mainLoop2();

    /* multiple objects*/
    /* called AFTER the page has been loaded*/
    canvas6 = document.querySelector("#myCanvas6");
  
    /* often useful*/
    w6 = canvas6.width; 
    h6 = canvas6.height;  
  
    /* important, we will draw with this object*/
    ctx6 = canvas6.getContext('2d');
  
    /* create 10 balls*/
    balls = createBalls(10);
  
    /* ready to go !*/
    mainLoop3();

/* mouse cursor */
    canvas7 = document.getElementById('myCanvas7');
    ctx7 = canvas7.getContext('2d');

    canvas7.addEventListener('mousemove', function (evt) {
        mousePos = getMousePos(canvas7, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        writeMessage(canvas7, message, ctx7);
    }, false);

    canvas7.addEventListener('mousedown', function (evt) {
        mouseButton = evt.button;
        var message = "Mouse button " + evt.button + " down at position: " + mousePos.x + ',' + mousePos.y;
        writeMessage(canvas7, message, ctx7);
    }, false);

    canvas7.addEventListener('mouseup', function (evt) {
        var message = "Mouse up at position: " + mousePos.x + ',' + mousePos.y;
        writeMessage(canvas, message, ctx7);
    }, false);

    canvas8 = document.getElementById('myCanvas8');
    ctx8 = canvas8.getContext('2d');

    canvas8.addEventListener('mousemove', function (evt) {
        mousePos = getMousePos2(canvas8, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        writeMessage(canvas8, message, ctx8);
    }, false);

    canvas8.addEventListener('mousedown', function (evt) {
        mouseButton = evt.button;
        var message = "Mouse button " + evt.button + " down at position: " + mousePos.x + ',' + mousePos.y;
        writeMessage(canvas8, message, ctx8);
    }, false);

    canvas8.addEventListener('mouseup', function (evt) {
        var message = "Mouse up at position: " + mousePos.x + ',' + mousePos.y;
        writeMessage(canvas8, message, ctx8);
    }, false);

    canvas9 = document.querySelector("#myCanvas9");
 
    /* often useful*/
    w9 = canvas9.width; 
    h9 = canvas9.height;  
  
    /* important, we will draw with this object*/
    ctx9 = canvas9.getContext('2d');
  
    /* create 10 balls*/
    balls9 = createBalls(10);
  
    /* add a mousemove event listener to the canvas*/
    canvas9.addEventListener('mousemove', mouseMoved);

    /* ready to go !*/
    mainLoop9();

    canvas10 = document.querySelector("#myCanvas10");
 
    /* often useful*/
    w10 = canvas10.width; 
    h10 = canvas10.height;  
  
    /* important, we will draw with this object*/
    ctx10 = canvas10.getContext('2d');
  
    /* create 10 balls*/
    balls10 = createBalls(10);
  
    /* add a mousemove event listener to the canvas*/
    canvas10.addEventListener('mousemove', mouseMoved);

    /* ready to go !*/
    //mainLoop10();

};


function drawFilledRectangle(x, y, width, height, color) {
    /* GOOD practice: save the context, use 2D trasnformations*/
    ctx2.save();
  
    /* translate the coordinate system, draw relative to it*/
    ctx2.translate(x, y);
  
    ctx2.fillStyle = color;
    /* (0, 0) is the top left corner of the monster.*/
    ctx2.fillRect(0, 0, width, height);
  
    /* GOOD practice: restore the context*/
    ctx2.restore();
}

function drawFilledCircle(x, y, radius, color) {
    /* GOOD practice: save the context, use 2D trasnformations*/
    ctx2.save();
  
    /* translate the coordinate system, draw relative to it*/
    ctx2.translate(x, y);
  
    ctx2.fillStyle = color;
    /* (0, 0) is the top left corner of the monster*/
    ctx2.beginPath();
    ctx2.arc(0, 0, radius, 0, 2*Math.PI);
    ctx2.fill();
 
    /* GOOD practice: restore the context*/
    ctx2.restore();
}

function drawMyMonster(x, y, ctx_) {
    /* draw a big monster !*/
    /* head*/
  
    /* GOOD practice: save the context, use 2D trasnformations*/
    ctx_.save();
  
    /*translate the coordinate system, draw relative to it*/
    ctx_.translate(x, y);
  
    /* (0, 0) is the top left corner of the monster.*/
    ctx_.strokeRect(0, 0, 100, 100);
  
    /* eyes, x=20, y=20 is relative to the top left corner*/
    /* of the previous rectangle*/
    ctx_.fillRect(20, 20, 10, 10);
    ctx_.fillRect(65, 20, 10, 10);
  
    /* nose*/
    ctx_.strokeRect(45, 40, 10, 40);
  
    /* mouth*/
   ctx_.strokeRect(35, 84, 30, 10);
  
   /* teeth*/
   ctx_.fillRect(38, 84, 10, 10);
   ctx_.fillRect(52, 84, 10, 10);
  
   /* GOOD practice: restore the context*/
   ctx_.restore();
}
function mainLoop() {
  /* 1 - clear the canvas. We told you that w, and h will be useful!*/
  ctx4.clearRect(0, 0, w, h);
  
  /* 2 - draw the monster*/
  drawMyMonster(xMonster, yMonster, ctx4);
  
  /* 3 - move the monster*/
  xMonster += monsterSpeed;
  
  /* 4 - test collisions with vertical boundaries*/
   if (((xMonster + 100)> w) || (xMonster < 0))  {
     /* collision with left or right wall*/
    /* change the direction of movement*/
    monsterSpeed = -monsterSpeed;
  }
  
  /* 5 - request a new frame of animation in 1/60s*/
  requestAnimationFrame(mainLoop);
}

function mainLoop2() {
  /* 1 - clear the canvas*/
  ctx5.clearRect(0, 0, w, h);
  
  /* draw the ball and the player*/
  drawFilledRectangle2(player);
  drawFilledCircle2(ball);

  /* animate the ball that is bouncing all over the walls*/
  moveBall(ball);
  
  /* ask for a new animation frame*/
  requestAnimationFrame(mainLoop2);
}

function moveBall(b) {
  b.x += b.speedX;
  b.y += b.speedY;
  
  testCollisionBallWithWalls(b);
}

function testCollisionBallWithWalls(b) {
    /* COLLISION WITH VERTICAL WALLS ?*/
    if((b.x + b.radius) > w) {
    /* the ball hit the right wall*/
    /* change horizontal direction*/
    b.speedX = -b.speedX;
    
    /* put the ball at the collision point*/
    b.x = w - b.radius;
  } else if((b.x -b.radius) < 0) {
    /* the ball hit the left wall*/
    /* change horizontal direction*/
    b.speedX = -b.speedX;
    
    /* put the ball at the collision point*/
    b.x = b.radius;
  }
  
  /* COLLISIONS WTH HORIZONTAL WALLS ?*/
  /* Not in the else as the ball can touch both*/
  /* vertical and horizontal walls in corners*/
  if((b.y + b.radius) > h) {
    /* the ball hit the right wall*/
    /* change horizontal direction*/
    b.speedY = -b.speedY;
    
    /* put the ball at the collision point*/
    b.y = h - b.radius;
  } else if((b.y -b.radius) < 0) {
    /* the ball hit the left wall*/
    /* change horizontal direction*/
    b.speedY = -b.speedY;
    
    /* put the ball at the collision point*/
    b.Y = b.radius;
  }  
}

function drawFilledRectangle2(r) {
    /* GOOD practice: save the context, use 2D trasnformations*/
    ctx5.save();
  
    /* translate the coordinate system, draw relative to it*/
    ctx5.translate(r.x, r.y);
  
    ctx5.fillStyle = r.color;
    /* (0, 0) is the top left corner of the monster.*/
    ctx5.fillRect(0, 0, r.width, r.height);
  
    /* GOOD practice: restore the context*/
    ctx5.restore();
}

function drawFilledCircle2(c) {
    /* GOOD practice: save the context, use 2D trasnformations*/
    ctx5.save();
  
    /* translate the coordinate system, draw relative to it*/
    ctx5.translate(c.x, c.y);
  
    ctx5.fillStyle = c.color;
    /* (0, 0) is the top left corner of the monster.*/
    ctx5.beginPath();
    ctx5.arc(0, 0, c.radius, 0, 2*Math.PI);
    ctx5.fill();
 
    /* GOOD practice: restore the context*/
    ctx5.restore();
}

/*
    Example multiple objects */
function mainLoop3() {
  /* 1 - clear the canvas*/
  ctx6.clearRect(0, 0, w6, h6);
  
  /* draw the ball and the player*/
  drawFilledRectangle6(player);
  drawAllBalls(balls);

  /* animate the ball that is bouncing all over the walls*/
  moveAllBalls(balls)
  
  /* ask for a new animation frame*/
  requestAnimationFrame(mainLoop3);
}

function createBalls(n) {
  /* empty array*/
  var ballArray = [];
  
  /* create n balls*/
  for(var i=0; i < n; i++) {
     var b = {
        x:w6/2,
        y:h6/2,
        radius: 5 + 30 * Math.random(), /* between 5 and 35*/
        speedX: -5 + 10 * Math.random(), /* between -5 and + 5*/
        speedY: -5 + 10 * Math.random(), /* between -5 and + 5*/
        color:getARandomColor(),
      }
     /* add ball b to the array*/
     ballArray.push(b);
    }
  /* returns the array full of randomly created balls*/
  return ballArray;
}

function getARandomColor() {
  var colors = ['red', 'blue', 'cyan', 'purple', 'pink', 'green', 'yellow'];
  /* a value between 0 and color.length-1*/
  /* Math.round = rounded value*/
  /* Math.random() a value between 0 and 1*/
  var colorIndex = Math.round((colors.length-1)*Math.random()); 
  var c = colors[colorIndex];
  
  /* return the random color*/
  return c;
}

function drawAllBalls(ballArray) {
    ballArray.forEach(function(b) {
      drawFilledCircle6(b);
    });
}

function moveAllBalls(ballArray) {
  /* iterate on all balls in array*/
  ballArray.forEach(function(b) {
      /* b is the current ball in the array*/
      b.x += b.speedX;
      b.y += b.speedY;
  
      testCollisionBallWithWalls6(b); 
  });
}

function testCollisionBallWithWalls6(b) {
    /* COLLISION WITH VERTICAL WALLS ?*/
    if((b.x + b.radius) > w6) {
    /* the ball hit the right wall*/
    /* change horizontal direction*/
    b.speedX = -b.speedX;
    
    /* put the ball at the collision point*/
    b.x = w6 - b.radius;
  } else if((b.x -b.radius) < 0) {
    /* the ball hit the left wall*/
    /* change horizontal direction*/
    b.speedX = -b.speedX;
    
    /* put the ball at the collision point*/
    b.x = b.radius;
  }
  
  /* COLLISIONS WTH HORIZONTAL WALLS ?*/
  /* Not in the else as the ball can touch both*/
  /* vertical and horizontal walls in corners*/
  if((b.y + b.radius) > h6) {
    /* the ball hit the right wall*/
    /* change horizontal direction*/
    b.speedY = -b.speedY;
    
    /* put the ball at the collision point*/
    b.y = h6 - b.radius;
  } else if((b.y -b.radius) < 0) {
    /* the ball hit the left wall*/
    /* change horizontal direction*/
    b.speedY = -b.speedY;
    
    /* put the ball at the collision point*/
    b.Y = b.radius;
  }  
}

function drawFilledRectangle6(r) {
    /* GOOD practice: save the context, use 2D trasnformations*/
    ctx6.save();
  
    /* translate the coordinate system, draw relative to it*/
    ctx6.translate(r.x, r.y);
  
    ctx6.fillStyle = r.color;
    /* (0, 0) is the top left corner of the monster.*/
    ctx6.fillRect(0, 0, r.width, r.height);
  
    /* GOOD practice: restore the context*/
    ctx6.restore();
}

function drawFilledCircle6(c) {
    /* GOOD practice: save the context, use 2D trasnformations*/
    ctx6.save();
  
    /* translate the coordinate system, draw relative to it*/
    ctx6.translate(c.x, c.y);
  
    ctx6.fillStyle = c.color;
    /* (0, 0) is the top left corner of the monster.*/
    ctx6.beginPath();
    ctx6.arc(0, 0, c.radius, 0, 2*Math.PI);
    ctx6.fill();
 
    /* GOOD practice: restore the context*/
    ctx6.restore();
}

function writeMessage(canvas, message, ctx) {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '12pt Calibri';
    ctx.fillStyle = 'black';
    ctx.fillText(message, 10, 25);
    ctx.restore();
}

function getMousePos(canvas, evt) {
    /* WRONG ! */
    return {
        x: evt.clientX,
        y: evt.clientY
    };
}
function getMousePos2(canvas, evt) {
   /* necessary to take into account CSS boundaries*/
   var rect = canvas.getBoundingClientRect();
   return {
      x: Math.floor(evt.clientX - rect.left),
      y: Math.floor(evt.clientY - rect.top)
   };
}


function mouseMoved(evt) {
    mousePos = getMousePos3(canvas9, evt);
}

function getMousePos3(canvas, evt) {
    /* necessary work in the canvas coordinate system*/
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function movePlayerWithMouse() {
  if(mousePos !== undefined) {
    player.x = mousePos.x;
    player.y = mousePos.y;
  }
}

function mainLoop9() {
  /* 1 - clear the canvas*/
  ctx9.clearRect(0, 0, w9, h9);
  
  /* draw the ball and the player*/
  drawFilledRectangle9(player);
  drawAllBalls9(balls9);

  /* animate the ball that is bouncing all over the walls*/
  moveAllBalls(balls9);
  
  movePlayerWithMouse();
  
  /* ask for a new animation frame*/
  requestAnimationFrame(mainLoop9);
}

function drawAllBalls9(ballArray) {
    ballArray.forEach(function(b) {
      drawFilledCircle9(b);
    });
}

function moveAllBalls9(ballArray) {
  /* iterate on all balls in array*/
  ballArray.forEach(function(b) {
      /* b is the current ball in the array*/
      b.x += b.speedX;
      b.y += b.speedY;
  
      testCollisionBallWithWalls9(b); 
  });
}

function testCollisionBallWithWalls9(b) {
    /* COLLISION WITH VERTICAL WALLS ?*/
    if((b.x + b.radius) > w9) {
    /* the ball hit the right wall*/
    /* change horizontal direction*/
    b.speedX = -b.speedX;
    
    /* put the ball at the collision point*/
    b.x = w9 - b.radius;
  } else if((b.x -b.radius) < 0) {
    /* the ball hit the left wall*/
    /* change horizontal direction*/
    b.speedX = -b.speedX;
    
    /* put the ball at the collision point*/
    b.x = b.radius;
  }
  
  /* COLLISIONS WTH HORIZONTAL WALLS ?*/
  /* Not in the else as the ball can touch both*/
  /* vertical and horizontal walls in corners*/
  if((b.y + b.radius) > h9) {
    /* the ball hit the right wall*/
    /* change horizontal direction*/
    b.speedY = -b.speedY;
    
    /* put the ball at the collision point*/
    b.y = h9 - b.radius;
  } else if((b.y -b.radius) < 0) {
    /* the ball hit the left wall*/
    /* change horizontal direction*/
    b.speedY = -b.speedY;
    
    /* put the ball at the collision point*/
    b.Y = b.radius;
  }  
}

function drawFilledRectangle9(r) {
    /* GOOD practice: save the context, use 2D trasnformations*/
    ctx9.save();
  
    /* translate the coordinate system, draw relative to it*/
    ctx9.translate(r.x, r.y);
  
    ctx9.fillStyle = r.color;
    /* (0, 0) is the top left corner of the monster.*/
    ctx9.fillRect(0, 0, r.width, r.height);
  
    /* GOOD practice: restore the context*/
    ctx9.restore();
}

function drawFilledCircle9(c) {
    /* GOOD practice: save the context, use 2D trasnformations*/
    ctx9.save();
  
    /* translate the coordinate system, draw relative to it*/
    ctx9.translate(c.x, c.y);
  
    ctx9.fillStyle = c.color;
    /* (0, 0) is the top left corner of the monster.*/
    ctx9.beginPath();
    ctx9.arc(0, 0, c.radius, 0, 2*Math.PI);
    ctx9.fill();
 
    /* GOOD practice: restore the context*/
    ctx9.restore();
}


</script>

