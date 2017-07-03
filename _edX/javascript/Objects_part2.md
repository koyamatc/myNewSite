---
layout: post
title: Objects (Part2) properties and methods
date: 2017-06-29 00:00:00 +900
subject: javascript
description:
  edx's course by W3C.
  Introductory course designed to understand
  the basic concepts of JavaScript.  
---

-------

#### Introduction
You're already familiar with the concept of objects, but so far we've only seen one simple form, called "objects literals" or "singleton objects". I think we've referred to them as "simple objects" in the course. Here is an example:
{% highlight javascript linenos %}
var js1 = {
    courseName: 'JavaScript intro',
    weeks: 5,
    madeBy: 'W3Cx',
    author: 'Michel Buffa' // no "," after the last property!, even if ES5/6 accept it
}
{% endhighlight %}
And we access properties values using the "." operator, like this:
{% highlight console linenos %}
> js1.author
"Michel Buffa"

> js1.weeks
5
{% endhighlight %}

__However, we haven't explained 90% of what is going on, and what we can do with "objects".__ Our objective in this module, is to explain the most important features of objects, while keeping it simple (more advanced topics will be taught in a future "JavaScript Advanced" course, such as prototypes, context binding, etc.).

__Features you will learn:__

<ul class="collection">
  <li class="collection-item">
  The relationship between JavaScript objects and arrays,
  </li>
  <li class="collection-item">
  What a "reference" is in a programming language,
  </li>
  <li class="collection-item">
  How to embed methods in your objects (functions inside an object),
  </li>
  <li class="collection-item">
  The "this" object that you very often encounter in Object Oriented JavaScript code,
  </li>
  <li class="collection-item">
  How to add methods and properties to your objects,
  </li>
  <li class="collection-item">
  How to make multiple objects of the same class using ES6 classes,
  </li>
  <li class="collection-item">
  The built-in JavaScript objects and classes: Array, String, RegExp, Date, Math, Error, etc. And, we will remind you about objects such as navigator, document, window, screen, etc.
  </li>
</ul>

__Features you will learn in an upcoming course:__
<ul class="collection">
  <li class="collection-item">
  JavaScript prototypes,
  </li>
  <li class="collection-item">
  Inheritance,
  </li>
  <li class="collection-item">
  Advanced manipulations of properties and methods,
  </li>
  <li class="collection-item">
  Methods such as bind, call, etc., that can be useful for changing the value of "this",
  </li>
  <li class="collection-item">
  And more!
  </li>
</ul>

-----
#### From objects to arrays
In Javascript, an object = a table whose keys/indexes are defined!

Important note: Darth Vader is called "Dark Vador" in the French versions of SW, and, as a French tutor, I think it's cool to give to one of the heroes an international name. :-)

Look at this array:
{% highlight console linenos %}
> var darkVador = ['villain', 'half human half machine'];
undefined

> darkVador[0]
"villain"

> darkVador[1]
"half human half machine"
{% endhighlight %}

__And now, look at this object:__
{% highlight javascript linenos %}
var darkVador = {
    job: 'villain',
    race: 'half human half machine'
};
{% endhighlight %}

They look a bit similar, don't they?
<ul class="collection">
  <li class="collection-item">
  Same name of the variable that contains the object = darkVador
  </li>
  <li class="collection-item">
  Instead of '[' and ']' that we used for defining an array, we use '{' and '}' for defining an object
  </li>
  <li class="collection-item">
  The elements of the object (its properties) are separated by a comma ','
  </li>
  <li class="collection-item">
  The pairs of keys/values are separated by ':' as in race: 'half human, half machine'
  </li>
  <li class="collection-item">
  The last pair of keys/values has no ',' at the end.
  </li>
</ul>

__It is possible to access the object's properties with "." or with brackets__

We saw that we can use the "." operator, followed by the property name. It's also possible to use the bracket notation, and manipulate the object as an array whose indexes, instead of being 0, 1, 2 etc., are the property names!
{% highlight console linenos %}
> var book = {
title: 'Le Petit Prince',
author: 'Saint-Exupery'
};
undefined

> var title = book.title;
undefined

> title;
"Le Petit Prince"

> var title = book['title'];
undefined

> title
"Le Petit Prince";

> var author = book['author'];
undefined

> author;
"Saint-Exupery"
{% endhighlight %}

As you can see, if you look at lines 7-10 and 13-16, writing book.title or book['title'] is equivalent!

<p class="red-text">
In JavaScript, objects are arrays whose indexes are property names: please remember this!
</p>

------

#### Property declaration syntax
##### Property names: different possibilities

We can put single or double quotes around the name of the property, or nothing at all:
{% highlight javascript linenos %}
var louis = {age: 40}; // WE DO THIS MOST OF THE TIME!
var louis = {"age": 40};
var louis = {'age': 40};
{% endhighlight %}

__In some cases we have to put quotes around the property name:__

<ul class="collection">
  <li class="collection-item">
  When it is a reserved word from JavaScript,
  </li>
  <li class="collection-item">
  Or it contains spaces or special characters,
  </li>
  <li class="collection-item">
  Or it begins with a number.
  </li>
</ul>

__Examples:__
{% highlight javascript linenos %}
book.1stPublication = '6 avril 1943'; // begins with a number
                                      // Throws a SyntaxError
book['1stPublication'] = '6 avril 1943'; // OK
book.date of publication = '6 avril 1943'; // spaces not allowed!
book['date of publication'] = '6 avril 1943'; // allowed, but avoid!
{% endhighlight %}

##### Another classic case where the name of a property is in a variable

In this case it is necessary  to use the syntax with '[' and ']' ...

__Example:__

{% highlight console linenos %}
> var key = 'title';
undefined

> book[key];
"Le Petit Prince"
{% endhighlight %}

#### An object can contain another object
Example:
{% highlight console linenos %}
> var book = {
    name: 'Catch-22',
    published: 1961,
    author: {                 // embedded object!
        givenName: 'Joseph',
        familyName: 'Heller'
    }
};
undefined

> book.author.givenName;
"Joseph"

> book.author.familyName;
"Heller"
{% endhighlight %}

Accessing the embedded object author is done by chaining property accesses using the "." operator, like in book.author.givenName (here we access the givenName property of the object author, which is also a property of the book object).

-------

#### Elements, properties and methods
Some vocabulary:

<ul class="collection">
  <li class="collection-item">
  For arrays, we speak of elements
  </li>
  <li class="collection-item">
  For objects, we talk about properties
  </li>
  <li class="collection-item">
  But a property can also be a function, in which case it is called a method
  </li>
</ul>

__Yes, it is possible for an object's property to be a function!__

A very simple example:
{% highlight javascript linenos %}
var medor = {
    name: 'Benji',
    bark: function(){
        alert('Ouarf, Ouarf!');
    }
};
{% endhighlight %}

In this example, the bark property's value is a function, so we call bark "a method".

__A method is a special property that corresponds to the object's behavior

Properties correspond to an object's DNA (its characteristics),
and are nouns (age, name, etc.)

Methods correspond to an object's behavior
and are verbs (bark, move, changeSpeed, etc.)

__Calling a method__

Since a method is a property we can use the '.' operator (or brackets with the method's name as a string index).

Let's see some examples:

<button class="btn" onclick='dvSpeak();'>Make Dark Vador speak!</button>
<h5 id="disp01"></h5>

JavaScript source code:
{% highlight javascript linenos %}
var darkVador = {
  race: 'human',
  job: 'villain',
  talk: function() {
    return 'come to the dark side, Luke!';
  },
  describeYourself: function() {
    return "I'm a " + this.race + " and I'm a " + this.job + " in a series of movies!";
  }
}

function dvSpeak() {
 let disp01 = document.querySelector('#disp01');    
 disp01.innerHTML += '<p>Dark Vador describes himself: ' + darkVador.describeYourself(); + '</p>';  document.body.innerHTML += '<p>Dark Vador says ' + darkVador.talk(); + '</p>';
}
{% endhighlight %}

In line 1, we created a simple object named darkVador, that has two properties (race and job) and a method (talk).

In the dvSpeak function, at line 10, we call darkVador's talk method. The syntax is a mix between the one for accessing a property (with the '.' operator), and the one for calling a function (with parentheses and ';' at the end).

When we write darkVador.talk(), we are executing the talk method of the object darkVador, but in plain English, we're just asking Dark Vador to talk. We invoke its behavior!

__Another example with the player we saw briefly in Module 2__

Here is the last version of the player object we saw in our small game:

<canvas id="myCanvas"  width="400" height="400"></canvas>

{% highlight javascript linenos %}
// useful to have them as global variables
var canvas, ctx, w, h;
var mousePos;

var player = {
  x:10,
  y:10,
  width:20,
  height:20,
  color:'red'
}

window.onload = function init() {
    // called AFTER the page has been loaded
    canvas = document.querySelector("#myCanvas");

    // often useful
    w = canvas.width;
    h = canvas.height;  

    // important, we will draw with this object
    ctx = canvas.getContext('2d');

    // add a mousemove event listener to the canvas
    canvas.addEventListener('mousemove', mouseMoved);

    // ready to go !
    mainLoop();
};

function mouseMoved(evt) {
    mousePos = getMousePos(canvas, evt);
}

function getMousePos(canvas, evt) {
    // necessary work in the canvas coordinate system
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

function mainLoop() {
  // 1 - clear the canvas
  ctx.clearRect(0, 0, w, h);

  // draw the player
  drawFilledRectangle(player);

  // make the player follow the mouse
  movePlayerWithMouse();

  // ask for a new animation frame
  requestAnimationFrame(mainLoop);
}

function drawFilledRectangle(r) {
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();

    // translate the coordinate system, draw relative to it
    ctx.translate(r.x, r.y);

    ctx.fillStyle = r.color;
    // (0, 0) is the top left corner of the monster.
    ctx.fillRect(0, 0, r.width, r.height);

    // GOOD practice: restore the context
    ctx.restore();
}
{% endhighlight %}

__Now that we've seen that we can include methods into objects, here is a better, more readable and more encapsulated version of our player object:__
{% highlight javascript linenos %}
var player = {
    x:10,
    y:10,
    width:20,
    height:20,
    color:'red',
    move(x, y) {
        // change x and y coordinates of the player
        // TODO!
    },
    draw() {
        // draw the player at its current position
        // with current width, height and color
        // TODO!
    }
}
{% endhighlight %}

Assuming that the move and draw methods are fully implemented, we will now be able to call:

<ul class="collection">
  <li class="collection-item">
  player.move(mousePos.x, mousePos.y) to change the position of the player,
  </li>
  <li class="collection-item">
  player.draw() to draw the player at its current position, with its current size and color.
  </li>
</ul>
Readability is better, it is like asking the player to move, or asking it to draw itself. And we do not need to pass the x, y, width, height, color to the draw method: it is inside the player object, and it can access all its internal property values!

In the next section we will look at how we can access other object's properties from a method or call other methods.

#### The this keyword: Accessing properties from a method
##### The this keyword!

When one wants to access an object property or wants to call another method from an object method, we must use the this keyword. In the code of the player object, this means "from this object".

Let's look at our game again, with a new version of the player object - this time fully functional:

<canvas id="myCanvas2"  width="400" height="400"></canvas>
{% highlight javascript linenos %}
var player = {
    x:10,
    y:10,
    width:20,
    height:20,
    color:'red',

    move: function(x, y) {
        this.x = x; // this.x is the property of "this object"
        this.y = y;
    },

    draw: function(ctx) {
        // draw the player at its current position
        // with current width, height and color
        // it's nearly the same code as the old drawFilledRect function
        ctx.save();

        // translate the coordinate system, draw relative to it
        ctx.translate(this.x, this.y);

        ctx.fillStyle = this.color;
        // (0, 0) is the top left corner of the monster
        ctx.fillRect(0, 0, this.width, this.height);

        // BEST practice: restore the context
        ctx.restore();
    }
}
{% endhighlight %}

Notice that we've used this followed by the '.' operator every time we've had to access the current value of an object's property (lines 9, 10, 20, 22 and 24).

We passed the canvas' graphic context as a parameter to the draw method (it's always good not to create dependencies when making objects). Passing the context as a parameter avoids using it as a global variable. If in another project we've got a context named "context" instead of "ctx", then we will just change the parameter when we call player.draw, otherwise we would have had to rename all occurrences of ctx in the code).

Same with the mouse coordinates we passed to the move method.

__Let's see the Dark Vador example with the use of this in a method__

<button onclick='dvSpeak2();'>Make Dark Vador speak!</button>
<h5 id="disp02"></h5>

{% highlight javascript linenos %}
var darkVador2 = {
  race: 'human',
  job: 'villain',
  talk: function() {
    return 'come to the dark side, Luke!' + this.breathe();
  },
  describeYourself: function() {
    return "I'm a " + this.race + " and I'm a " + this.job + " in a series of movies!" + this.breathe();
  },
  breathe() {
    return ".....shhhhhhhhh.....";
  }
}

function dvSpeak2() {
 let disp02 = document.querySelector('#disp02');
 disp02.innerHTML += '<p>Dark Vador describes himself: ' + darkVador2.describeYourself(); + '</p>';  disp02.innerHTML += '<p>Dark Vador says: ' + darkVador2.talk(); + '</p>';
}
{% endhighlight %}

-----

#### Properties and methods can be added/deleted after an object has been defined

##### Look at the JS code. This time we created an empty object and added properties and methods afterwards.
<button class="btn" onclick='dvSpeak3();'>Make Dark Vador speak!</button>
<h5 id="disp03"></h5>
<button class="btn" onclick='rest3();'>Rest</button>

{% highlight javascript linenos %}
// empty object with no properties/methods
var darkVador3 = {};

// add properties after darkVador has been created
 darkVador3.race = 'human';
  darkVador3.job = 'villain';
  darkVador3.talk = function() {
    return 'come to the dark side, Luke!' + this.breathe();
  };

  darkVador3.describeYourself = function() {
    return "I'm a " + this.race + " and I'm a " + this.job + " in a series of movies!" + this.breathe();
  };

  darkVador3.breathe = function() {
    return ".....shhhhhhhhh.....";
  };
{% endhighlight %}

__Deleting a property or a method__

You can use the JavaScript keyword "delete" to delete an object's property (it will become undefined).

Example:

##### Look at the JS code. This time we created an empty object and added properties and methods afterwards.
<button class="btn" onclick='dvSpeak4();'>Make Dark Vador speak!</button>
##### Click the button below (it will delete the "race" property of the darkVador object). Then click again the button above and see the "undefined" value of the darkVador.race property now.
<button class="btn" onclick="deleteSomeProperties()">Delete some of Dark Vador's properties</button>
<h5 id="disp04"></h5>


{% highlight javascript linenos %}
function deleteSomeProperties() {
  delete darkVador.race;
  delete darkVador.job;
}
{% endhighlight %}


<style type="text/css">
  canvas {
    border: 2px solid #000;
  }
</style>
<script>
var darkVador = {
  race: 'human',
  job: 'villain',
  talk: function() {
    return 'come to the dark side, Luke!';
  },
  describeYourself: function() {
    return "I'm a " + this.race + " and I'm a " + this.job + " in a series of movies!";
  }
}

function dvSpeak() {
 let disp01 = document.querySelector('#disp01');    
 disp01.innerHTML += '<p>Dark Vador describes himself: ' + darkVador.describeYourself(); + '</p>';  document.body.innerHTML += '<p>Dark Vador says ' + darkVador.talk(); + '</p>';
}

// useful to have them as global variables
var canvas, ctx, w, h;
var mousePos;

var player = {
  x:10,
  y:10,
  width:20,
  height:20,
  color:'red'
}

window.onload = function init() {
    // called AFTER the page has been loaded
    canvas = document.querySelector("#myCanvas");

    // often useful
    w = canvas.width;
    h = canvas.height;  

    // important, we will draw with this object
    ctx = canvas.getContext('2d');

    // add a mousemove event listener to the canvas
    canvas.addEventListener('mousemove', mouseMoved);

    // ready to go !
    mainLoop();
};

function mouseMoved(evt) {
    mousePos = getMousePos(canvas, evt);
}

function getMousePos(canvas, evt) {
    // necessary work in the canvas coordinate system
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

function mainLoop() {
  // 1 - clear the canvas
  ctx.clearRect(0, 0, w, h);

  // draw the player
  drawFilledRectangle(player);

  // make the player follow the mouse
  movePlayerWithMouse();

  // ask for a new animation frame
  requestAnimationFrame(mainLoop);
}

function drawFilledRectangle(r) {
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();

    // translate the coordinate system, draw relative to it
    ctx.translate(r.x, r.y);

    ctx.fillStyle = r.color;
    // (0, 0) is the top left corner of the monster.
    ctx.fillRect(0, 0, r.width, r.height);

    // GOOD practice: restore the context
    ctx.restore();
}

var canvas2, ctx2, w2, h2;
var mousePos2;

var player2 = {
  x:10,
  y:10,
  width:20,
  height:20,
  color:'red',

  move: function(x, y) {
    this.x = x;
    this.y = y;
  },

  draw: function(ctx) {
    // draw the player at its current position
    // with current width, height and color
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();

    // translate the coordinate system, draw relative to it
    ctx.translate(this.x, this.y);

    ctx.fillStyle = this.color;
    // (0, 0) is the top left corner of the monster.
    ctx.fillRect(0, 0, this.width, this.height);

    // GOOD practice: restore the context
    ctx.restore();    
  }
}

window.onload = function init2() {
    // called AFTER the page has been loaded
    canvas2 = document.querySelector("#myCanvas2");

    // often useful
    w2 = canvas2.width;
    h2 = canvas2.height;  

    // important, we will draw with this object
    ctx2 = canvas2.getContext('2d');

    // add a mousemove event listener to the canvas
    canvas2.addEventListener('mousemove', mouseMoved2);

    // ready to go !
    mainLoop2();
};

function mouseMoved2(evt) {
    mousePos2 = getMousePos2(canvas2, evt);
}

function getMousePos2(canvas, evt) {
    // necessary work in the canvas coordinate system
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function mainLoop2() {
  // 1 - clear the canvas
  ctx2.clearRect(0, 0, w2, h2);

  // draw the player
  player2.draw(ctx2);

  // make the player follow the mouse
  // the animations starts as the page is loaded
  // maybe the mouse is not yet over the canvas
  // this is why we test if the mousePos is defined
  if(mousePos2 !== undefined)
      player2.move(mousePos2.x, mousePos2.y);

  // ask for a new animation frame
  requestAnimationFrame(mainLoop2);
}

var darkVador2 = {
  race: 'human',
  job: 'villain',
  talk: function() {
    return 'come to the dark side, Luke!' + this.breathe();
  },
  describeYourself: function() {
    return "I'm a " + this.race + " and I'm a " + this.job + " in a series of movies!" + this.breathe();
  },
  breathe() {
    return ".....shhhhhhhhh.....";
  }
}

function dvSpeak2() {
 let disp02 = document.querySelector('#disp02');
 disp02.innerHTML += '<p>Dark Vador describes himself: ' + darkVador2.describeYourself(); + '</p>';  disp02.innerHTML += '<p>Dark Vador says: ' + darkVador2.talk(); + '</p>';
}

/**********************/
// empty object with no properties/methods
var darkVador3 = {};

// add properties after darkVador has been created
 darkVador3.race = 'human';
  darkVador3.job = 'villain';
  darkVador3.talk = function() {
    return 'come to the dark side, Luke!' + this.breathe();
  };

  darkVador3.describeYourself = function() {
    return "I'm a " + this.race + " and I'm a " + this.job + " in a series of movies!" + this.breathe();
  };

  darkVador3.breathe = function() {
    return ".....shhhhhhhhh.....";
  };


function dvSpeak3() {
 let disp03 = document.querySelector('#disp03');　  
 disp03.innerHTML += '<p>Dark Vador describes himself: ' + darkVador3.describeYourself(); + '</p>';  disp03.innerHTML += '<p>Dark Vador says: ' + darkVador3.talk(); + '</p>';
}
function rest3() {
 let disp03 = document.querySelector('#disp03');　  
 disp03.innerHTML = "";
}
/**********************************/
// empty object with properties/methods
var darkVador4 = {};

// add properties after darkVador4 has been created
 darkVador4.race = 'human';
 darkVador4.job = 'villain';

// add some methods
  darkVador4.talk = function() {
    return 'come to the dark side, Luke!' + this.breathe();
  };

  darkVador4.describeYourself = function() {
    return "I'm a " + this.race
      + " and I'm a " + this.job
      + " in a series of movies!" + this.breathe();
  };

  darkVador4.breathe = function() {
    return ".....shhhhhhhhh.....";
  };


function dvSpeak4() {
 let disp04 = document.querySelector("#disp04");
 disp04.innerHTML += '<p>Dark Vador describes himself: ' + darkVador4.describeYourself(); + '</p>';  disp04.innerHTML += '<p>Dark Vador says: ' + darkVador4.talk(); + '</p>';
}

function deleteSomeProperties() {
  delete darkVador4.race;
  delete darkVador4.job;
}
</script>
