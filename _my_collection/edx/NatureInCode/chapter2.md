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


##### 進化にかかわる4つの力

1. (Natural) selection (自然)選択

2. Genetic drift 遺伝子的変化

3. Migration 移住

4. Mutation 突然変異


#### Hardy-Weinberg model

+ 進化にかかわる力は無い

+ 対立遺伝子は2種類。遺伝子A から派生しているA1とA2とする。

+ 遺伝子は diploid(遺伝的物質を2セット持っている)として扱う。
          haploid(遺伝的物質を1セットだけのもの：精子、卵子)  
          

<div id="root02"></div>

diploidは、減算分裂(meiosis)をしてhaploid:gametes(配偶子)となる。

配偶子どうしが結合してdiploid:zegote(結合子)となる

父親からの配偶子を精子、母親からの配偶子を卵子

１セットづつ遺伝子を受け取った結合子を複製して個体となる

ハーディ・ワインベルグ　モデルでは１つだけの遺伝子を導入する

その遺伝子を A 、　対立遺伝子の１つを A1、　もう一つを A2 とする。

<div id="root01"></div>

ここでは、diploid system（人間や一般的な動物の持つ） を扱うものとする。

遺伝子の組合せはというと３種類ある

<div id="root03"></div>

同じ型の対立遺伝子を持つ場合をホモ接合(homosygous)

異なる型の対立遺伝子を持つ場合をヘテロ接合(heterozygous)

##### 例

１００個体あるとします

遺伝子の組み合わせのことを遺伝子型と呼ぶことにします

個体数を下記の通りとします

<table class="bordered">
  <tr>
    <th>遺伝子型</th>
    <th>個体数</th>
    <th>割合</th>
  </tr>
  <tr>
    <td>A1A1</td>
    <td>15</td>
    <td>15%</td>
  </tr>
  <tr>
    <td>A1A2</td>
    <td>50</td>
    <td>50%</td>
  </tr>
  <tr>
    <td>A2A2</td>
    <td>35</td>
    <td>35%</td>
  </tr>
  <tr>
    <td>合計</td>
    <td>100</td>
    <td>100%</td>
  </tr>
</table>

次に、対立遺伝子の頻度を確認してみましょう
<style>
.MathJax_Display {
  text-align: left;
  color: #000;
}
.MathJax_SVG_Display {
  text-align: left !important;
}
.MathJax_SVG_Display line {
  stroke:#000;
}
.MathJax_SVG g{
  stroke:#000;
  stroke-width:2;
  fill:#000;
}
</style>

$$
\begin{eqnarray}
  \left.
    \begin{array}{r}
      A1A1 \ : \ 15 \ \rightarrow \ A1 = 30 \\
      A1A2 \ : \ 50 \ \rightarrow \ A1 = 50 \\
    \end{array}
  \right\}
  A1 = 80 \ \rightarrow \ 40 ％
  \\
  \left.
    \begin{array}{r}
      \ \searrow \ A2 = 50\\
      \ A2A2 \ : \ 35 \ \rightarrow \ A2 = 70 
    \end{array}
  \right\}
  A2 = 120 \ \rightarrow \ 60％
\end{eqnarray}
$$      

#### Hardy-Weinberg Frequencies

$$
  \underbrace{
    \begin{array}{c}
      A1A1 \ : \ 15％ \\
      A1A2 \ : \ 50％ \\
      A2A2 \ : \ 35％ 
    \end{array}
  }_{genotype}
  \qquad
  \underbrace{
    \begin{array}{c}
      A1 \ : \ 40％ \\
      A2 \ : \ 60％ 
    \end{array}
  }_{allele}

$$

ここで、単純化のためにいくつかの前提条件を導入します

-- 無限の個体数（遺伝子的変化の影響を受けない）

-- 世代間で個体は重ならない（新しい世代が誕生すると、前の世代はすぐさま死亡する）

-- 性的な再生は考慮しない、対立遺伝子はランダムにくっ付きあい
新しい世代を生成し、新しい遺伝子型(genotype)の頻度となる

-- 進化に影響する４つの力は無い


上記の条件をもとに次の世代がどの様いなるか計算をします

$$
  \begin{array}{clc}
    A_{1}A_{1} & 0.4 \times 0.4 = 0.16 & \\ 
    \hline
    A_{1}A_{2} & 
      \left.
        \begin{array}{l}
          0.4 \times 0.6 = 0.24 \\
          0.6 \times 0.4 = 0.24
        \end{array} 
      \right\}& 0.48 \\
    \hline  
    A_{2}A_{2} & 0.6 \times 0.6 = 0.36 & \\ 
  \end{array} 
$$

遺伝子型の頻度は

$$
  \begin{array}{lccl}
    次の世代の頻度 & 前の世代との差 & & 対立遺伝子の頻度\\
    A_{1}A_{1} \ : \ 16％ & +1％ & \rightarrow & A_{1} = 16％ \\
    A_{1}A_{2} \ : \ 48％ & -2％ & 
                                   \begin{array}{c}
                                      \nearrow \\
                                      \searrow
                                   \end{array} 
                                 & \begin{array}{l}
                                      A_{1} = 24％ \\
                                      A_{2} = 24％
                                   \end{array}  \\
    A_{2}A_{2} \ : \ 36％ & +1％ & \rightarrow & A_{2} = 36％ \\
  \end{array}
$$

対立遺伝子の頻度は

$$
  \begin{eqnarray}
  A_{1} = 40％ \\
  A_{2} = 60％
  \end{eqnarray}
$$

こちらは前の世代の頻度と変わっていない、
言い換えると、進化が無いということ

進化にとっては、対立遺伝子の変化が必要

それではさらに次の世代の頻度はどうなるでしょう

対立遺伝子の頻度が変わっていないので、遺伝子型の頻度は前回と同じになります

結局、世代を重ねてもこの値を繰り返すだけです

この1世代進んだ遺伝子型頻度を __ハーディ・ワインベルグ頻度__ と言いい、変わることはありません

------------

##### Programming

$$
\begin{array}{l}
  \hline
  Allele frequencies \\
  \hline
  f(A_{1}) \rightarrow p = 1 - q \\
  f(A_{2}) \rightarrow q = 1 - p \\

  \hline
  Genotype frequencies \\
  \hline
  f(A_{1}A_{1}) = p * p = p^2 \\
  f(A_{1}A_{2}) = (p * q) + (q * p)= 2pq \\
  f(A_{2}A_{2}) = q * q = q^2 \\
  \qquad \qquad \Downarrow \\
  p^2 + 2pq + q^2 = 1
\end{array}  
$$

<button id="calcBtn" class="btn">計算</button>

<table id="resultTable"></table>

{% highlight javascript linenos %}
var calcBtn = document.querySelector('#calcBtn');
calcBtn.addEventListener('click', calc);

// genotype frequencies
var a1a1 = 0.15;
var a2a2 = 0.35;
var a1a2 = 1 -(a1a1 + a2a2);

// allele frequencies
var p = a1a1 + (a1a2 / 2);
var q = 1 - p;

var table = document.querySelector('#resultTable');

function calc(){

  table.innerHTML = '';

  var tHead = table.createTHead();
  var hRow = tHead.insertRow();
  hRow.insertCell().innerHTML = 'Generation'; 
  hRow.insertCell().innerHTML = 'a1a1';
  hRow.insertCell().innerHTML = 'a1a2';
  hRow.insertCell().innerHTML = 'a2a2';

  createRow(0);

  for (let i = 1; i < 6; i++){
    nextGeneration();
    createRow(i);
  }
}

function createRow(i){

  let row = table.insertRow();
  row.insertCell().innerHTML = i; 
  row.insertCell().innerHTML = a1a1;
  row.insertCell().innerHTML = a1a2;
  row.insertCell().innerHTML = a2a2;

}

function nextGeneration(){
  a1a1 = p * p;
  a1a1 = round_3_decimals(a1a1);
  a1a2 = 2 * p * q;
  a1a2 = round_3_decimals(a1a2);
  a2a2 = q * q;
  a2a2 = round_3_decimals(a2a2);
}

function round_3_decimals(value){
    return Math.round(value * 1000) /1000;
}
{% endhighlight %}
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
for (let i = 0;i<6;i=i+0.2){
    p=i;
    print_value();
}
*/
var svg01 = d3.select("#root01").append("svg")
            .attr("height",200)
            .attr("width",300)
            .style("background","#000");

var textData01 = [
    {x: 50, y: 100, text:"gene A"},
    {x: 150, y: 50, text:"allele A1"},
    {x: 150, y: 135, text:"alleleA2"}
]
svg01.selectAll('text')
    .data(textData01)
    .enter().append('text')
    .attr("x", function(d){return d.x})
    .attr("y", function(d){return d.y})
    .text(function(d){return d.text})
    .attr("stroke","#fff");


var vecData01 = [
{"x1":100,"y1":90,"angles":40,"length":50,"stroke":"#f0f","strokeWidth":4},
{"x1":100,"y1":90,"angles":-40,"length":50,"stroke":"#f0f","strokeWidth":4}
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
  {cx: 40, cy: 350, r: 30, fillColor: "yellow",type:"diploid"},
  {cx: 110, cy: 350, r: 30, fillColor: "yellow",type:"diploid"},
  {cx: 180, cy: 350, r: 30, fillColor: "yellow",type:"diploid"},
  {cx: 250, cy: 350, r: 30, fillColor: "yellow",type:"diploid"},
  {cx: 320, cy: 350, r: 30, fillColor: "yellow",type:"diploid"},
  {cx: 390, cy: 350, r: 30, fillColor: "yellow",type:"diploid"},
  {cx: 460, cy: 350, r: 30, fillColor: "yellow",type:"diploid"},
  {cx: 430, cy: 350, r: 30, fillColor: "yellow",type:"diploid"},

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

/* root03 */
var svg03 = d3.select("#root03").append("svg")
            .attr("height",300)
            .attr("width",300)
            .style("background","#000");

var data03 = [
  {cx: 60, cy: 70, r: 50, fillColor: "yellow",type:"diploid"},
  {cx: 200, cy: 70, r: 50, fillColor: "yellow",type:"diploid"},
  {cx: 130, cy: 200, r: 50, fillColor: "yellow",type:"diploid"},
];
drawCircle(svg03,data03);

var textData03 = [
    {x: 80, y: 135, text:"homozygous",
     stroke:"#fff",fontFamily:"courier", fontSize:"1.5em"},
    {x: 80, y: 265, text:"heterozygous",
     stroke:"#fff",fontFamily:"courier", fontSize:"1.5em"},
    {x: 30, y: 75, text:"A1     A1",
     stroke:"#000",fontFamily:"courier", fontSize:"1.4em"},
    {x: 170, y: 75, text:"A2     A2",
     stroke:"#000",fontFamily:"courier", fontSize:"1.4em"},
    {x: 100, y: 205, text:"A1     A2",
     stroke:"#000",fontFamily:"courier", fontSize:"1.4em"},
]

drawText(svg03,textData03);

svg03.selectAll(".line1")
  .data(data03)
.enter().append("line")
  .attr("x1", function(d){return d.type=="diploid"?d.cx - 5:d.cx})
  .attr("y1", function(d){return d.cy - d.r + 10})
  .attr("x2", function(d){return d.type=="diploid"?d.cx - 5:d.cx})
  .attr("y2", function(d){return d.cy + d.r - 10})
  .attr("class","line1")
  .attr("stroke","#00b");

svg03.selectAll(".line2")
  .data(data03)
.enter().append("line")
  .attr("x1", function(d){return d.type=="diploid"?d.cx + 5:d.cx})
  .attr("y1", function(d){return d.cy - d.r+10})
  .attr("x2", function(d){return d.type=="diploid"?d.cx + 5:d.cx})
  .attr("y2", function(d){return d.cy + d.r - 10})
  .attr("class","line2")
  .attr("stroke","#00b");

/* implement in JavaScript */
var calcBtn = document.querySelector('#calcBtn');
calcBtn.addEventListener('click', calc);

// genotype frequencies
var a1a1 = 0.15;
var a2a2 = 0.35;
var a1a2 = 1 -(a1a1 + a2a2);

// allele frequencies
var p = a1a1 + (a1a2 / 2);
var q = 1 - p;

var table = document.querySelector('#resultTable');

function calc(){

  table.innerHTML = '';

  var tHead = table.createTHead();
  var hRow = tHead.insertRow();
  hRow.insertCell().innerHTML = 'Generation'; 
  hRow.insertCell().innerHTML = 'a1a1';
  hRow.insertCell().innerHTML = 'a1a2';
  hRow.insertCell().innerHTML = 'a2a2';

  createRow(0);

  for (let i = 1; i < 6; i++){
    nextGeneration();
    createRow(i);
  }
}

function createRow(i){

  let row = table.insertRow();
  row.insertCell().innerHTML = i; 
  row.insertCell().innerHTML = a1a1;
  row.insertCell().innerHTML = a1a2;
  row.insertCell().innerHTML = a2a2;

}

function nextGeneration(){
  a1a1 = p * p;
  a1a1 = round_3_decimals(a1a1);
  a1a2 = 2 * p * q;
  a1a2 = round_3_decimals(a1a2);
  a2a2 = q * q;
  a2a2 = round_3_decimals(a2a2);
}

function round_3_decimals(value){
    return Math.round(value * 1000) /1000;
}
</script>
