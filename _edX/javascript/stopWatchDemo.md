---
layout: post
title: Stopwatch Demo
date: 2017-07-10 15:00:00 +900
subject: javascript
description:
  edx's course by Microsoft.
  Asyncronous programming with JavaScript course.  
---

-------

The user should see the following:
<ul class="collection">
    <li class="collection-item">
1. An application title labeled "Stopwatch Demo"
    </li>
    <li class="collection-item">
2. A section with a timer that displays the current elapsed time to the hundredth second
    </li>
    <li class="collection-item">
3. A button labeled "Start/Stop"
    </li>
    <li class="collection-item">
4. A button labeled "Reset" 
    </li>
    <li class="collection-item">
5. A button labeled "Record Time"
    </li>
    <li class="collection-item">
6. A section labeled "Past Times" that keeps a record of previously recorded times
    </li>
</ul>

The user should be able to do the following:
<ul class="collection">
    <li class="collection-item">
1. Start and stop the timer by pressing the "Start/Stop" button.
    </li>
    <li class="collection-item">
2. Start and stop the timer by pressing the 's' key.
    </li>
    <li class="collection-item">
3. Record the current timer count into the Past Times section by pressing the "Record Time" button
    </li>
    <li class="collection-item">
4. Record the current timer count into the Past Times section by pressing the 't' key.
    </li>
    <li class="collection-item">
5. Reset the timer count to 0 and wipe all previously recorded times in the Past Times section by pressing the "Reset" button.
    </li>
    <li class="collection-item">
6. Reset the timer count to 0 and wipe all previously recorded times in the Past Times section by pressing the 'r' key.
    </li>
</ul>

<div class="row">
    <div class="col s12 m6">
        <h3>Stopwatch Demo</h3>
        <h5 id="timer"></h5>
        <button class="btn" id="startstop">Start/Stop</button>
        <button class="btn" id="reset">Reset</button>
        <button class="btn" id="record">Record Time</button>
        <b>Past Times</b>
        <p id="pastTimes"></p>
    </div>
    <div class="col s12 m6">
    </div>
</div>

<script>
/* global variables */
var interval;
var start = false;
var counter = 0;

/* execute function */
setUp();

/* function definition */
function setUp() {
    let timer = document.querySelector("#timer");
    let pastTimes = document.querySelector("#pastTimes");
    timer.innerHTML = "0.00"; 
    document.querySelector("#startstop").addEventListener('click', function(){
        if(start){
            clearInterval(interval);
        }else{
            interval = setInterval(function(){
                counter += 0.01;
                timer.innerHTML = counter.toFixed(2); 
            }, 100);
        }         
        start = !start;
    })
    document.querySelector('#reset').addEventListener('click', function(){
        /*location.reload();*/
        clearInterval(interval);
        counter = 0;
        start = false;
        timer.innerHTML = counter.toFixed(2);
        pastTimes.innerHTML = "";
    })
    document.querySelector('#record').addEventListener('click', function(){
        pastTimes.innerHTML += counter.toFixed(2) + "<br/>";
        
    })
}

</script>