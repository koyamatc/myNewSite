---
layout: post
title: The Genes, They are a-Changing
date: 2017-08-08 00:00:00 +900
subject: natureincode
description:
  Nature, in Code teaches programming in JavaScript by implementing key concepts in biology (natural selection, genetic drift, epidemics, etc.). Learn programming while discovering the rules that govern life.
---

-------
##### Evolution

__Evolution__ : The Change in allele frequencies in a population over time.

__進化__　：　時間とともに個体群(population)の中で起こる対立遺伝子(allele)の変化頻度。

__allele(対立遺伝子)__ :　遺伝子の別バージョンと言える

<div id="root01"></div>

##### 進化にかかわる4つの力

1. (Natural) selection (自然)選択

2. Genetic drift 遺伝子的変化

3. Migration 移住

4. Mutation 突然変異


#### Hardy-Weinberg model

+ 進化にかかわる力は無い

+ 対立遺伝子は2種類。遺伝子A から派生しているA1とA2とする。

+ 遺伝子は diploid(染色体を2セット持っている)として扱う。
          haploid(染色体が1セットだけのもの：精子、卵子)  

<div id="root02"></div>

diploidは、減算分裂(meiosis)をしてhaploid:gametes(配偶子)となる。

配偶子どうしが結合してdiploid:zegote(結合子)となる

<script src="https://d3js.org/d3.v4.js"></script>
<script src="../../js/d3V4draws.js"></script>
<script>
/*
function round_to_half(value){
    let a = Math.round(value);
    let b = (value % 0.5);
    let c = (b>=0.25)?(a>value)?0:1:(a>value)?-1:0;
    let result = a + (0.5 *  c);
//    console.log(value,a,b,c,result);
    return result;
}
round_to_half(0.2);
round_to_half(0.3);
round_to_half(1.7);
round_to_half(1.75);
round_to_half(3.24563);

function round_3_decimals(value){
    return Math.round(value * 1000) /1000;
}
var p = 0;
var q = 1 - p;

console.log('p =', p, 'q =', q);

p = p + 0.2;
q = 1 - p;
console.log('p =', p, 'q =', q);

p = p + 0.2;
q = 1 - p;
console.log('p =', p, 'q =', q);

p = p + 0.2;
q = 1 - p;
console.log('p =', p, 'q =', q);

p = p + 0.2;
q = 1 - p;
console.log('p =', p, 'q =', q);

p = p + 0.2;
q = 1 - p;
console.log('p =', p, 'q =', q);

function print_value(){
    console.log('p =', p, 'q =', q);
    
}
var p=0,q=1-p;
for (let i = 0;i<6;i=I+0.2){
    p=i;
    print_value();
}
*/
var svg01 = d3.select("#root01").append("svg")
            .attr("height",400)
            .attr("width",450)
            .style("background","#000");

var data01 = [
  {x: 150, y: 175, r: 30, fill: "yellow"},
  {x: 330, y: 100, r: 30, fill: "yellow"},
  {x: 330, y: 250, r: 30, fill: "yellow"}
];
var textData01 = [
    {x: 120, y: 50, text:"gene"},
    {x: 300, y: 50, text:"allele"},
    {x: 180, y: 205, text:"A"},
    {x: 360, y: 130, text:"A1"},
    {x: 360, y: 280, text:"A2"}
]
svg01.selectAll('text')
    .data(textData01)
    .enter().append('text')
    .attr("x", function(d){return d.x})
    .attr("y", function(d){return d.y})
    .text(function(d){return d.text})
    .attr("stroke","#fff");

svg01.selectAll("circle")
    .data(data01)
  .enter().append("circle")
  .attr("cx", function(d){return d.x})
  .attr("cy", function(d){return d.y})
  .attr("r", function(d){return d.r})
	.style("transparent", "0.5")
  .style("fill", function(d) { return d.fill; });

svg01.selectAll(".line1")
  .data(data01)
.enter().append("line")
  .attr("x1", function(d){return d.x - 5})
  .attr("y1", function(d){return d.y - d.r + 10})
  .attr("x2", function(d){return d.x - 5})
  .attr("y2", function(d){return d.y + d.r - 10})
  .attr("class","line1")
  .attr("stroke","#00b");

svg01.selectAll(".line2")
  .data(data01)
.enter().append("line")
  .attr("x1", function(d){return d.x + 5})
  .attr("y1", function(d){return d.y - d.r+10})
  .attr("x2", function(d){return d.x + 5})
  .attr("y2", function(d){return d.y + d.r - 10})
  .attr("class","line2")
  .attr("stroke","#00b");

var vecData01 = [
{"x1":200,"y1":175,"angles":35,"length":100,"stroke":"#f0f","strokeWidth":4},
{"x1":200,"y1":175,"angles":-35,"length":100,"stroke":"#f0f","strokeWidth":4}
];    

drawVectorA(svg01,vecData01);  

/* root02 */
var svg02 = d3.select("#root02").append("svg")
            .attr("height",400)
            .attr("width",600)
            .style("background","#000");

var vecData02 = [
{"x1":180,"y1":50,"angles":120,"length":75,"stroke":"#f0f","strokeWidth":4},
{"x1":180,"y1":50,"angles":60,"length":75,"stroke":"#f0f","strokeWidth":4},
{"x1":350,"y1":50,"angles":120,"length":75,"stroke":"#f0f","strokeWidth":4},
{"x1":350,"y1":50,"angles":60,"length":75,"stroke":"#f0f","strokeWidth":4},
{"x1":210,"y1":150,"angles":60,"length":75,"stroke":"#f0f","strokeWidth":4},
{"x1":320,"y1":150,"angles":120,"length":75,"stroke":"#f0f","strokeWidth":4}
];    

drawVectorA(svg02,vecData02);

var data02 = [
  {cx: 40, cy: 50, r: 30, fillColor: "yellow",type:"diploid"},
  {cx: 110, cy: 50, r: 30, fillColor: "yellow",type:"diploid"},
  {cx: 180, cy: 50, r: 30, fillColor: "yellow",type:"diploid"},
  {cx: 350, cy: 50, r: 30, fillColor: "yellow",type:"diploid"},
  {cx: 420, cy: 50, r: 30, fillColor: "yellow",type:"diploid"},
  {cx: 490, cy: 50, r: 30, fillColor: "yellow",type:"diploid"},
  {cx: 140, cy: 150, r: 30, fillColor: "yellow",type:"haploid"},
  {cx: 210, cy: 150, r: 30, fillColor: "yellow",type:"haploid"},
  {cx: 320, cy: 150, r: 30, fillColor: "yellow",type:"haploid"},
  {cx: 390, cy: 150, r: 30, fillColor: "yellow",type:"haploid"},
  {cx: 265, cy: 250, r: 30, fillColor: "yellow",type:"diploid"},

];
drawCircle(svg02,data02);

svg02.selectAll(".line1")
  .data(data02)
.enter().append("line")
  .attr("x1", function(d){return d.type=="diploid"?d.cx - 5:d.cx})
  .attr("y1", function(d){return d.cy - d.r + 10})
  .attr("x2", function(d){return d.type=="diploid"?d.cx - 5:d.cx})
  .attr("y2", function(d){return d.cy + d.r - 10})
  .attr("class","line1")
  .attr("stroke","#00b");

svg02.selectAll(".line2")
  .data(data02)
.enter().append("line")
  .attr("x1", function(d){return d.type=="diploid"?d.cx + 5:d.cx})
  .attr("y1", function(d){return d.cy - d.r+10})
  .attr("x2", function(d){return d.type=="diploid"?d.cx + 5:d.cx})
  .attr("y2", function(d){return d.cy + d.r - 10})
  .attr("class","line2")
  .attr("stroke","#00b");

var textData02 = [
    {x: 215, y: 100, text:"meiosis",
     stroke:"#fff",fontFamily:"courier", fontSize:"1.5em"},
    {x: 420, y: 180, text:"gametes",
     stroke:"#fff",fontFamily:"courier", fontSize:"1.5em"},
    {x: 300, y: 280, text:"zygote",
     stroke:"#fff",fontFamily:"courier", fontSize:"1.5em"},
]

drawText(svg02,textData02);








</script>
