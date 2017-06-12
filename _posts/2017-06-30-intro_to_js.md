---
layout: post
title: Introduction to Javascript
date: 2017-06-12 00:00:00 +900
categories: post javascript
description:
  edx's course by W3C.
  Introductory course designed to understand 
  the basic concepts of JavaScript.  
---

-------
### Module1

#### First Example

<div id="myFunction"></div>

HTML
<pre>
&lt;div id="myFunction">&lt;/div>
&lt;!-- import external libraries -->
&lt;script src="https://d3js.org/d3.v3.min.js">&lt;/script>
&lt;script src="https://mauriciopoppe.github.io/function-plot/js/function-plot.js">&lt;/script>
</pre>

JavaScript
<pre>
var parameters = {
  target: '#myFunction',
  data: [{
    fn: 'sin(x)', 
    color: 'red'
    },
    {
    fn: 'cos(x)', 
    color: 'blue'
    }         
  ],
  grid: true,
  yAxis: {domain: [-1, 1]},
  xAxis: {domain: [0, 2*Math.PI]}
};
functionPlot(parameters); // a function call
</pre>

<script src="https://d3js.org/d3.v3.min.js"></script>
<script src="https://mauriciopoppe.github.io/function-plot/js/function-plot.js"></script>
<script type="text/javascript">
var parameters = {
  target: '#myFunction',
  data: [{
    fn: 'sin(x)', 
    color: 'red'
    },
    {
    fn: 'cos(x)', 
    color: 'blue'
    }         
  ],
  grid: true,
  yAxis: {domain: [-1, 1]},
  xAxis: {domain: [0, 2*Math.PI]}
};

functionPlot(parameters);
</script>
<br>

------
#### What can be done with JavaScript
##### FIRST: interact with the HTML and CSS content of a document, respond to events
<style>
#interactWith h1 {
  color:red;
  background-color:lightGreen;
  border:12px solid violet;
  padding: 5px;
  border-radius: 15px;
  text-align: center;
}

#interactWith p, 
#interactWith h1 {
  font-family: cursive 
}

#interactWith p, 
#interactWith img, 
#interactWith button {
  margin-left:50px;
}
</style> 
<div id="interactWith">
 <h1 id="mainTitle">My home page</h1> 

<p>This is an example of interactivity between JavaScript and the HTML content of a document.</p>
<button onclick="changeTitle();">Click me to change the title of the page</button>
</div>
<script>
    function changeTitle() {
      var title = document.querySelector("#mainTitle");
      title.innerHTML += "<br>This new <u>title</u> has been changed from JavaScript!";
    }
</script>
