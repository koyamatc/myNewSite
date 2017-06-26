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

ctx.fillRect(x, y, width, height): draws a rectangle whose top left corner is at (x, y) and whose size is specified by the width and height parameters; and both outlined by, and filled with, the default color.
ctx.strokeRect(x, y, width, height): same but in wireframe mode.
Note that we use (line 30) ctx.translate(x, y) to make it easier to move the monster around. So, all the drawing instructions are coded as if the monster was in (0, 0), at the top left corner of the canvas (look at line 33). We draw the body outline with a rectangle starting from (0, 0). Calling context.translate "changes the coordinate system" by moving the "old (0, 0)" to (x, y) and keeping other coordinates in the same position relative to the origin.
Line 19: we call the drawMonster function with (10, 10) as parameters, which will cause the original coordinate system to be translated by (10, 10).
And if we change the coordinate system (this is what the call to ctx.translate(...) does) in a function, it is good practice to always save the previous context at the beginning of the function and restore it at the end of the function (lines 27 and 50).

<script>
// useful to have them as global variables
var canvas,canvas2,canvas3, ctx, ctx2, ctx3, w, w3, h, h3;

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
    drawMyMonster(10, 10);    
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

function drawMyMonster(x, y) {
    /* draw a big monster !*/
    /* head*/
  
    /* GOOD practice: save the context, use 2D trasnformations*/
    ctx3.save();
  
    /*translate the coordinate system, draw relative to it*/
    ctx3.translate(x, y);
  
    /* (0, 0) is the top left corner of the monster.*/
    ctx3.strokeRect(0, 0, 100, 100);
  
    /* eyes, x=20, y=20 is relative to the top left corner*/
    /* of the previous rectangle*/
    ctx3.fillRect(20, 20, 10, 10);
    ctx3.fillRect(65, 20, 10, 10);
  
    /* nose*/
    ctx3.strokeRect(45, 40, 10, 40);
  
    /* mouth*/
   ctx3.strokeRect(35, 84, 30, 10);
  
   /* teeth*/
   ctx3.fillRect(38, 84, 10, 10);
   ctx3.fillRect(52, 84, 10, 10);
  
   /* GOOD practice: restore the context*/
   ctx3.restore();
}
</script>

