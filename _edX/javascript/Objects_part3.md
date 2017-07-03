---
layout: post
title: Objects (Part3) - creating multiple objects
date: 2017-06-29 00:00:00 +900
subject: javascript
description:
  edx's course by W3C.
  Introductory course designed to understand
  the basic concepts of JavaScript.  
---

-------
#### Classes: definition
##### Introduction: the concept of "class" in object oriented programming languages
So far in this course, we've only used singleton objects: objects that only occur once: player, darkVador, etc.

Ok, this is not quite true, I'd forgotten that we created many balls in the module 2 game. We'll come back to this example further down the page!

But even with the balls from module 2, we did not use a template to tell us how to easily create multiple objects that share the same properties and the same methods, but whose properties' values may differ.

For example, imagine Luke Skywalker, Ian Solo and Dark Vador. What do they have in common? They all are Star Wars heroes, they all have a name, they all belong to one side (the good/bad people, or rebels vs empire), etc. Imagine that we have a way of programming that describes not the objects themselves, but a "model", a "template" for these objects. We could call it StarWarsHero and use it for creating our heroes' objects.

Imagine the balls from module 2: they all had the same shape (circle), the same x, y, radius and color properties, but they were all different. They all belonged to the same class of object (ball), but they were all different in terms of their properties' values.

<p class="red-text">
In many programming languages, these templates are called "classes".
</p>

<ul class="collection">
  <li class="collection-item">
  In JavaScript 5 (also called ES5), we did not have such a concept, instead we had "constructor functions".
  </li>
  <li class="collection-item">
  In JavaScript 6 (ES6), we have the concept of classes, and the syntax is rather similar to what we find in other object oriented programming languages.
  </li>
</ul>

Let's introduce these two ways of defining "pseudo classes" with ES5's function constructors, and with ES6 classes!

#### ES5's constructor functions, the "new" keyword

With JavaScript version 5 (and previous versions), you can define a pseudo-class template called "a constructor function". The syntax is the same as for creating a function, except that:

<ul class="collection">
  <li class="collection-item">
  1. By convention, its name is Capitalized. The first letter of the function name is in uppercase, this is a good way to know, when you read someone else's code, that this is not a regular function, but a constructor function. Its name is a noun, the name of the class of objects you are going to build. Example: Person, Vehicle, Enemy, Product, Circle, Ball, Player, Hero, etc.
  </li>
  <li class="collection-item">
  2. You build new objects using the new keyword:
  Examples (Car, Hero, Ball, Product are constructor function names):

  var car = new Car('Ferrari', 'red');
  var luke = new Hero('Luke Skywalker', 'rebels");
  var ball1 = new Ball(10, 10, 20, 'blue'); // x=10, y=10, radius = 20, color = 'blue'
  var p1 = new Product('Epson printer P1232', '183', 'Mr Buffa'); // ref, price, customer
  etc.
  </li>
  <li class="collection-item">
  The parameters of the function are the "constructor parameters": the new object that you are building will take these as its initial properties' values. You can build a Hero, but you must give him/her a name, a side, etc.
  </li>
  <li class="collection-item">
  4. You define the property names and method names using the this keyword. But beware: the syntax is not the same as the syntax we used for singleton/simple objects. No more ":" and "," between properties. Here we use "=" and ";" like in regular functions.

  Example:

  function Hero(name, side) {
    this.name = name;
    this.side = side;
    this.speak = function() {
      console.log("My name is " + this.name + " and I'm with the " + this.side);
    }
  }

  In a constructor function named "Hero", you will find properties declared like this: this.name this.side; and methods declared like this: this.speak = function() {...}
  </li>
  <li class="collection-item">
  5. Very often some properties are initialized using the constructor function parameters, so that the newly constructed objects will get an initial value for their properties. In this case, we use the this keyword to distinguish the property from the constructor function parameter:

  Example:

  function Hero(name) {
    this.name = name;
    ...
  }
  </li>
</ul>
