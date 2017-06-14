---
layout: post
title: Interactive Function Plotter
date: 2017-06-14 01:00:00 +900
categories: post edx javascript
description:
  edx's course by W3C.
  Introductory course designed to understand 
  the basic concepts of JavaScript.  
---

-------
<style type="text/css">
.section {
  border: 4px solid grey;
  border-radius: 15px;
    box-shadow: 5px 5px 5px grey;
  display: inline-block; 
  height: 400px;
  padding: 20px;
}

#plotSettings {
  width:150px;
}

#plot {
  width:550px;
}
input {
  width:40px;
}
</style>
<div class="row">
<div class="col s4 m4 section" id="plotSettings">
  <ul>
  <li>
    <label for="xMax">xMax: </label>
    value:<input type="number" id="xMax" value="6.28318" step="0.5" onChange="plot()">
  </li>
  <li>
  <label for="yMax">yMax: </label>
  value:<input type="number" id="yMax" value="1" step="0.5" onChange="plot()">
  </li>
  <li>
  <label for="color">Color: </label>
  value:<input type="color" id="color" onChange="plot();">
  </li>
  <li>
  <label for="function">function to plot: </label>
  <input type="text" id="function"
        value="sin(x)"
        onChange="plot()">
  </li>
  <li>
    <button class="btn" onClick="plot()">Plot!</button>
  </li>
  </ul>
</div>  

<div id="plot" class="col s8 m8 section">
  <div id="myFunction"></div>
</div>
</div>

##### グラフの上でマウスを動かしたり、ドラッグしたり、ホイールを操作してみてください

<br><br>

<script src="https://d3js.org/d3.v3.min.js"></script>
<script src="https://mauriciopoppe.github.io/function-plot/js/function-plot.js"></script>
<script>
var parameters = {
  target: '#myFunction',
  data: [{
    fn: 'sin(x)', 
    color: 'red'
    }
  ],
  grid: true,
  yAxis: {domain: [-1, 1]},
  xAxis: {domain: [0, 2*Math.PI]}
};

plot();

function plot(){
  var xMax = document.querySelector("#xMax").value;
  var yMax = document.querySelector("#yMax").value;
  var color = document.querySelector("#color").value;
  var fn = document.querySelector("#function").value;
  parameters.xAxis.domain = [0, xMax];
  parameters.yAxis.domain = [-yMax, yMax];
  parameters.data[0].color = color;
  parameters.data[0].fn = fn;

  functionPlot(parameters);
}
</script>
