---
layout: post
title: Memory Match Game
date: 2017-07-10 00:00:00 +900
subject: javascript
description:
  edx's course by Microsoft.
  Asyncronous programming with JavaScript course.  
---

-------

<div class="row">
    <div class="col s12 m6">
        <table id="gridTable">
            <tr>
                <td id="grid7"></td>
                <td id="grid8"></td>
                <td id="grid9"></td>
            </tr>
            <tr>
                <td id="grid4"></td>
                <td id="grid5"></td>
                <td id="grid6"></td>
            </tr>
            <tr>
                <td id="grid1"></td>
                <td id="grid2"></td>
                <td id="grid3"></td>
            </tr>
        </table>
        <button class="btn" id="restart">やり直し</button>
        <p id="timer"></p>
    </div>
    <div class="col s12 m6">
        <p>グリッド2つをマウスでクリックするか　テンキー（1..9）で選択してください</p>
        <p>同じ数字が出れば、ペア完成</p>
        <p>4組のペアをできるだけ早く完成させてください</p>
        <p>やり直しボタンで最初から</p>
    </div>
</div>

{% highlight javascript %}
/* globale variables  */
var clickedArray = [];
var interval;
var started = false;
var time = 0;
var ready = true;
var numCompleted = 0;

/* execute function */
setUp();

/* function definitions */
function randomAnswers(){
    var answers = [1,1,2,2,3,3,4,4,5];
    answers.sort(function(item){
        return .5 - Math.random();
    })
    return answers;
}

function setUp(){
    var grid = document.querySelectorAll("td");
    var answers = randomAnswers();

    for(var i = 0; i < grid.length; i++){
        var cell = grid[i];
        cell.completed = false;
        cell.clicked = false;
        cell.value = answers[i];
        
        cell.addEventListener("mouseenter",function(){
            if(this.completed == false && this.clicked == false)
                this.style.background = "orange";
        });

        cell.addEventListener("mouseleave",function(){
            if(this.completed == false && this.clicked == false)
                this.style.background = "blue";
        });

        cell.addEventListener('click',function(){
            if(ready == false)
                return;

            startTimer();

            if(this.clicked == false && this.completed == false){
                clickedArray.push(this);
                reveal(this);
            }

            if(clickedArray.length == 2){

                if(clickedArray[0].value == clickedArray[1].value){
                    /*if a matching pair is found*/
                    complete(clickedArray[0]);
                    complete(clickedArray[1]);

                    clickedArray = [];

                    if(numCompleted == 8){
                        alert("You won in " + time + " seconds!");
                        clearInterval(interval);
                    }    

                }
                else{
                    /*if a matching pair is not found*/
                    ready = false;
                    document.querySelector("#gridTable").style.border = "5px solid red";    

                    setTimeout(function(){
                        /*after a 500ms delay*/
                        hide(clickedArray[0]);
                        hide(clickedArray[1]);

                        clickedArray = [];

                        ready = true;
                        document.querySelector("#gridTable").style.border = "5px solid black";

                    },500);

                }

            }
        });
    }
    document.addEventListener('keydown', function(event){
        if(event.key > 0 && event.key < 10 ){
            let num = 0;
            if(event.key>0 && event.key < 4){
                num = -5;
            }else if(event.key > 3 && event.key < 7){
                num = 1;
            }else{
                num = 7;
            }
            grid[event.key - num].click();
        }
    });
    document.getElementById('restart').addEventListener('click', function(){
        location.reload();
    });
}

function reveal(cell){
    cell.style.backgroundColor = "red";
    cell.innerHTML = cell.value;
    cell.clicked = true;
}

function startTimer(){
    if (started == false){
        interval = setInterval(function(){
            time++;
            document.querySelector("#timer").innerHTML = "Time Elapsed: " + time;
        },1000)
        started = true;
    }
}

function hide(cell){
    cell.style.backgroundColor = "blue";
    cell.innerHTML = "";
    cell.clicked = false;
}

function complete(cell){
    numCompleted++;
    cell.completed = true;
    cell.style.backgroundColor = "purple";
}
{% endhighlight %}

<style type="text/css">
table, td {
    border: 5px solid black;
}

td{
    width:100px;
    height:100px;
    font-size: 1.5em;
    text-align:center;
    background-color: blue;
}
</style>

<script>
/* globale variables  */
var clickedArray = [];
var interval;
var started = false;
var time = 0;
var ready = true;
var numCompleted = 0;

/* execute function */
setUp();

/* function definitions */
function randomAnswers(){
    var answers = [1,1,2,2,3,3,4,4,5];
    answers.sort(function(item){
        return .5 - Math.random();
    })
    return answers;
}

function setUp(){
    var grid = document.querySelectorAll("td");
    var answers = randomAnswers();

    for(var i = 0; i < grid.length; i++){
        var cell = grid[i];
        cell.completed = false;
        cell.clicked = false;
        cell.value = answers[i];
        
        cell.addEventListener("mouseenter",function(){
            if(this.completed == false && this.clicked == false)
                this.style.background = "orange";
        });

        cell.addEventListener("mouseleave",function(){
            if(this.completed == false && this.clicked == false)
                this.style.background = "blue";
        });

        cell.addEventListener('click',function(){
            if(ready == false)
                return;

            startTimer();

            if(this.clicked == false && this.completed == false){
                clickedArray.push(this);
                reveal(this);
            }

            if(clickedArray.length == 2){

                if(clickedArray[0].value == clickedArray[1].value){
                    /*if a matching pair is found*/
                    complete(clickedArray[0]);
                    complete(clickedArray[1]);

                    clickedArray = [];

                    if(numCompleted == 8){
                        alert("You won in " + time + " seconds!");
                        clearInterval(interval);
                    }    

                }
                else{
                    /*if a matching pair is not found*/
                    ready = false;
                    document.querySelector("#gridTable").style.border = "5px solid red";    

                    setTimeout(function(){
                        /*after a 500ms delay*/
                        hide(clickedArray[0]);
                        hide(clickedArray[1]);

                        clickedArray = [];

                        ready = true;
                        document.querySelector("#gridTable").style.border = "5px solid black";

                    },500);

                }

            }
        });
    }
    document.addEventListener('keydown', function(event){
        if(event.key > 0 && event.key < 10 ){
            let num = 0;
            if(event.key>0 && event.key < 4){
                num = -5;
            }else if(event.key > 3 && event.key < 7){
                num = 1;
            }else{
                num = 7;
            }
            grid[event.key - num].click();
        }
    });
    document.getElementById('restart').addEventListener('click', function(){
        location.reload();
    });
}

function reveal(cell){
    cell.style.backgroundColor = "red";
    cell.innerHTML = cell.value;
    cell.clicked = true;
}

function startTimer(){
    if (started == false){
        interval = setInterval(function(){
            time++;
            document.querySelector("#timer").innerHTML = "Time Elapsed: " + time;
        },1000)
        started = true;
    }
}

function hide(cell){
    cell.style.backgroundColor = "blue";
    cell.innerHTML = "";
    cell.clicked = false;
}

function complete(cell){
    numCompleted++;
    cell.completed = true;
    cell.style.backgroundColor = "purple";
}

</script>