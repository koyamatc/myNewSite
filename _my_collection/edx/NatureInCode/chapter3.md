---
layout: post
title: Genetic Drift - The Power of Chance
date: 2017-08-08 12:00:00 +900
subject: natureincode
description:
  Nature, in Code teaches programming in JavaScript by implementing key concepts in biology (natural selection, genetic drift, epidemics, etc.). Learn programming while discovering the rules that govern life.
---

-------

#### Genetic Drift

前章において、ハーディ・ワインベルグの仮定（個体数は無限に大きい、自由交配、突然変異は起きない、自然選択もない、etc)の元、なんの変化も起きないとした。対立遺伝子の頻度は同じのままであり、遺伝子型頻度が今ハーディ・ワインベルグの頻度ではないとしたら、次の世代ではハーディ・ワインベルグ頻度となり、それからはずっと変わることはない。

ここで仮定の一つを外してみる。まずは、個体数は無限であるという仮定を外し、個体数は有限であるとする。このことは進化においてとても影響が大きいことが明らかになります。個体数が有限であると    、進化するチャンス効果が働き始めます。このチャンス効果は個体数がより小さいと、より大きくなります。

この章で学ぶこと:

• 有限サイズの個体数は、進化ダイナミックス（genetic drift：遺伝的浮動）に偶然性を持ち込みます。

• 遺伝的浮動は遺伝的変化を抑える働きをする

• 浮動効果は、個体群のサイズに比例している：個体数がより小さいと、浮動効果はより大きい。

• 浮動効果に相対する別の力が無いならば、遺伝的浮動はどの個体群においても遺伝的変化を抑制する。

• 遺伝的不当はゆっくりとしたプロセスです-個体群の遺伝的変化を半分に減らすのに1.4N世代かかる。

• 効果的個体数サイズは、キーとなる概念である-そのサイズは理想的な(Wright-Fisher)個体数であり、遺伝的変化における退化を表し、それが、対象となる実際の個体数と同じであることを示している

• 効果的な個体数サイズはしばしば実際の個体数サイズより小さい、それは、個体数サイズのボトルネックとか性別の比率が同じではないなどの理由による。

---------
<style>
.MathJax {
  text-align: left;
  color: #000;
}
.MathJax_Display {
  text-align: left !important;
  color: #000;
}
.MathJax_SVG_Display {
  text-align: left;
}
.MathJax_SVG_Display line {
  stroke:#000;
}
.MathJax_SVG g{
  stroke:#000;
  stroke-width:2;
  fill:#000;
}
body{
    font-size: 1.3em;
    font-family: cursive;
}
</style>
##### Finite population size

Finite population size : 
$$
    N=10_{s},  100_{s},  10^2, 10^{12} \dots
$$

##### Genetic Drift in Theory

$$
\begin{array}{cccc}
  allele & allele F & genotype & genotype F \\
  \hline
  A_{1} & p & A_{1}A_{1} & p^2 \\
  A_{2} & q & A_{1}A_{2} & 2pq \\
  & & A_{2}A_{2} & q^2 
\end{array}
$$

ハーディ・ワインベルグモデルでは個体数(N)は無限でしたが

ここでは個体数(N)は、有限とします

diploid(２倍体)では、allele(対立遺伝子)の数は 2N　です

$$
\begin{array}{l}
p = 0.5 \quad q = 0.5 \\ 
N =  500 \ individuals \quad 2N = 1000 \ alleles
\end{array}
$$ 

上記は

対立遺伝子は　A1:A2 = 0.5:0.5 半半存在している

その中から１０００個の対立遺伝子を無作為に抽出する

ということで

<div class="row">
    <div class="input-field col s3">
        <select id="size">
            <option value="500" selected>500</option>
            <option value="1000">1000</option>
            <option value="2000">2000</option>
            <option value="5000">5000</option>
            <option value="10000">10000</option>
        </select>
        <label>Population Size</label>
    </div>
    <div class="input-field col s3">
        <select id="gens">
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000" selected>1000</option>
            <option value="5000">5000</option>
            <option value="10000">10000</option>
        </select>
        <label>Generations</label>
    </div>
    <div class="input-field col s3">
        <select id="sims">
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
        </select>
        <label>Simulations</label>
    </div>
</div>

<button id="rerun01" class="btn">再実行</button>
<div id="svg01"></div>

-----

##### Population Size and Genetic Drift

個体数と遺伝的浮動の関係を数学的に説明します

$$
\begin{array}{l}
G: \ ２つの対立遺伝子を抽出したときに同じ型になる確率とします (A_{1}A_{1}, A_{2}A_{2})\\
\end{array}
$$

<div id="svg02"></div>

大きな配偶子プールから無作為に対立遺伝子を抽出して、次の世代を作っていく

これを繰返し、世代を重ねていく

<div id="svg03"></div>

対立遺伝子の入った器があり、そこから１つを無作為に抽出してコピーを作る

抽出した対立遺伝子は元の器に戻す

もう一つ器から対立遺伝子を無作為に抽出してコピーを作り元の器に戻す

このコピーを前のコピーと合わせて隣の器に入れる

これを繰返し次の世代を作っていくと考える

$$
\begin{array}{l}
２回とも全く同じ遺伝子を抽出する確率は \ \frac{1}{2N} \\
２回とも異なる型の遺伝子を抽出する確率は \ (1 - \frac{1}{2N})　\\
次の世代の抽出する２つの遺伝子が同型の場合の確率は \ G^{1} = \frac{1}{2N} + (1 - \frac{1}{2N})G \\
抽出した遺伝子が異なる型の確率を \ H = 1 - G \ とします \\
遺伝的多様性が大きい \rightarrow 抽出される２つの対立遺伝子がより異なると言えることを証明します \\
次の世代 \\
H^{1} = 1 - G^{1} \\
G^{1} = \frac{1}{2N} + (1 - \frac{1}{2N})G \\
\begin{eqnarray}
H^{1} &=& 1 - (\frac{1}{2N} + (1 - \frac{1}{2N})G) \\
&=& 1 - \frac{1}{2N} - (1 - \frac{1}{2N})(1-H) \\
&=& 1 - \frac{1}{2N} - (1 - \frac{1}{2N} - H + \frac{H}{2N}) \\
&=& H - \frac{H}{2N} \\
&=& (1 - \frac{1}{2N})H　\\
\end{eqnarray} \\

Nが大きいと、H \ と \ H^{1}の差は少なくなる \rightarrow 影響は弱くなる \\
Nが小さいと、H \ と \ H^{1}の差は大きくなる \rightarrow 影響は強くなる \\
\end{array}
$$

-----

##### Speed of Genetic Drift

$$
\begin{array}{l}
H_{0}を初期遺伝的変化率とすると \\

H_{1} = (1 - \frac{1}{2N})H_{0} \\
H_{2} = (1 - \frac{1}{2N})H_{1} = (1 - \frac{1}{2N})(1 - \frac{1}{2N})H_{0} \\
H_{3} = (1 - \frac{1}{2N})(1 - \frac{1}{2N})(1 - \frac{1}{2N})H_{0} \\
H_{x} = (1 - \frac{1}{2N})^{x}H_{0} \\

x \rightarrow \infty \Rightarrow H_{x} \rightarrow 0 \\
遺伝的変化がなくなってしまう、遺伝的浮動が起こらなくなるということで現実とは異なりますが\\
ここではこのまま進めます\\
H_{0} が半部になるにはどのくらいの世代数が必要でしょうか？\\
\frac{H_{0}}{2} = (1 - \frac{1}{2N})^{x}H_{0} \ とします \\
\frac{1}{2} = (1 - \frac{1}{2N})^{x} \\
\ln(\frac{1}{2}) = \ln(1 - \frac{1}{2N})x \qquad \ln(1 + x) \approx x を利用\\
\ln(\frac{1}{2}) \approx - \frac{1}{2N}x \\
\ln(\frac{1}{2})(-2N) \approx x \qquad \ln(\frac{1}{x}) = -\ln(x)を利用して \\
-\ln(2)(-2N) \approx x \\
2N \dot \ln(2) \approx x  \qquad \ln(2) \approx 0.7\\
x \approx 1.4N \\
N = 100 \rightarrow 140 世代 \\
N = 10000 \rightarrow 14000世代 \\
N = 1000000 \rightarrow 1400000 世代 \\
個体数が大きいと、遺伝的変化率が半分になるのに多くの世代数が必要となる\\
個体数が少ないと、遺伝的変化率が半分になるのに少ない世代数で達成できる\\   
\end{array}    
$$

-----

##### Effective Population Size

<link href="https://fonts.googleapis.com/earlyaccess/roundedmplus1c.css" rel="stylesheet" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://d3js.org/d3.v4.js"></script>
<script src="../../js/d3V4draws.js"></script>

<script>
  $(document).ready(function() {
    $('select').material_select();
  });


  var p = 0.5;
  var N = 500;
  var generations = 1000;
  var simulations = 10;
  var population_sizes = [];
  var data = [];

  var rerun01 = document.querySelector('#rerun01');
  rerun01.addEventListener('click', executeDrawLineChart);

function draw_line_chart(data,x_label,y_label,legend_values,x_max,y_max_flex) {
    var margin = {top: 20, right: 20, bottom: 50, left: 50},
        width = 700 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var version = d3.scale ? 3 : 4;
    var color = (version == 3 ? d3.scale.category10() : d3.scaleOrdinal(d3.schemeCategory10));
                
    if (!x_max) {
        x_max = data[0].length > 0 ? data[0].length : data.length
    }
                
    var y_max = data[0].length > 0 ? d3.max(data, function(array) {
            return d3.max(array);
        }) : d3.max(data);

    var x = (version == 3 ? d3.scale.linear() : d3.scaleLinear())
        .domain([0,x_max])
        .range([0, width]);

    var y = y_max_flex ? (version == 3 ? d3.scale.linear() : d3.scaleLinear())
        .domain([0, 1.1 * y_max])
        .range([height, 0]) : (version == 3 ? d3.scale.linear() : d3.scaleLinear())
        .range([height, 0]);
        
    var xAxis = (version == 3 ? d3.svg.axis().scale(x).orient("bottom") : 
    	d3.axisBottom().scale(x));

    var yAxis = (version == 3 ? d3.svg.axis().scale(y).orient("left") : 
    	d3.axisLeft().scale(y));

    var line = (version == 3 ? d3.svg.line() : d3.line())
        .x(function (d, i) {
            var dat = (data[0].length > 0 ? data[0] : data);
            return x((i/(dat.length-1)) * x_max);
        })
        .y(function (d) {
            return y(d);
        });

    d3.select("svg").remove();    
    var svg = d3.select("#svg01").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .style("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", 6)
        .attr("dy", "3em")
        .style("fill", "#000")
        .text(x_label);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("dy", "-3.5em")
        .style("text-anchor", "middle")
        .style("fill", "#000")
        .text(y_label);

    if (legend_values.length > 0) {		
        var legend = svg.append("text")
            .attr("text-anchor", "star")
            .attr("y", 30)
            .attr("x", width-100)
            .append("tspan").attr("class", "legend_title")
            .text(legend_values[0])
            .append("tspan").attr("class", "legend_text")
            .attr("x", width-100).attr("dy", 20).text(legend_values[1])
            .append("tspan").attr("class", "legend_title")
            .attr("x", width-100).attr("dy", 20).text(legend_values[2])
            .append("tspan").attr("class", "legend_text")
            .attr("x", width-100).attr("dy", 20).text(legend_values[3]);
    }
    else {
        svg.selectAll("line.horizontalGridY")
            .data(y.ticks(10)).enter()
            .append("line")
            .attr("x1", 1)
            .attr("x2", width)
            .attr("y1", function(d){ return y(d);})
            .attr("y2", function(d){ return y(d);})
            .style("fill", "none")
            .style("shape-rendering", "crispEdges")
            .style("stroke", "#f5f5f5")
            .style("stroke-width", "1px");

        svg.selectAll("line.horizontalGridX")
            .data(x.ticks(10)).enter()
            .append("line")
            .attr("x1", function(d,i){ return x(d);})
            .attr("x2", function(d,i){ return x(d);})
            .attr("y1", 1)
            .attr("y2", height)
            .style("fill", "none")
            .style("shape-rendering", "crispEdges")
            .style("stroke", "#f5f5f5")
            .style("stroke-width", "1px");
    }

    d3.select("#svg01").style("font","10px sans-serif");
    d3.selectAll(".axis line").style("stroke","#000"); 
    d3.selectAll(".y.axis path").style("display","none"); 
    d3.selectAll(".x.axis path").style("display","none");    
    d3.selectAll(".legend_title")
        .style("font-size","12px").style("fill","#555").style("font-weight","400");
    d3.selectAll(".legend_text")
        .style("font-size","20px").style("fill","#bbb").style("font-weight","700");

    if (data[0].length > 0) {
        var simulation = svg.selectAll(".simulation")
            .data(data)
            .enter().append("g")
            .attr("class", "simulation");

        simulation.append("path")
            .attr("class", "line")
            .attr("fill", "none")
            .attr("d", function(d) { return line(d); })
            .style("stroke", function(d,i) { return color(i); });
    } 
    else {
        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("d", line)
            .style("stroke","steelblue");
    }
    d3.selectAll(".line").style("fill", "none").style("stroke-width","1.5px");    
}
  
  function nextGeneration(simulation_counter, current_N){
    var draws = 2 * current_N;
    var a1 = 0;
    var a2 = 0;
    for (let i = 0; i < draws; i++){
      if (Math.random() <= p){
        a1++;
      } else {
        a2++;
      }
    }
    p = a1 / draws;
    data[simulation_counter].push(p);
  }

  function roundNumber(value, decimals){
    let shifter = Math.pow(10, decimals);
    return Math.round(value * shifter) / shifter;
  }

  function executeDrawLineChart(){
    
    generations = document.querySelector("#gens").value;
    simulations = document.querySelector("#sims").value;
    N           = document.querySelector("#size").value;    
  
    data = [];
    population_sizes = [];

    for (let i = 0; i < simulations; i++){
      data.push([]);
    }

    for (let j = 0; j < simulations; j++){

      p = 0.5;
      var population_size;
      for (let i = 0; i < generations; i++){
        if (i % 10 == 9){
            population_size = 10;
        }  else {
            population_size = N;  
            }
        population_sizes.push(population_size);  
        nextGeneration(j, population_size);
      }
    
    }

    function effective_population_size(all_Ns){
        var denominator = 0;
        for (let i = 0; i < all_Ns.length; i++){
            denominator += 1 / all_Ns[i];
        }
        return Math.round(all_Ns.length / denominator);
    }
    var Ne = effective_population_size(population_sizes);

    draw_line_chart(data,"Generation","p",["Eff. Population Size:",Ne,"Generations:",generations]);
  }

  executeDrawLineChart();

/** Po;ulation sizen and Genetic Drift */
var svg02 = d3.select("#svg02").append("svg")
                .attr("width",700)
                .attr("height", 200)
                .style("background","#000");
gametes02 = [
    {"startPos":75,"endPos":220,"innerRadius":70,"outerRadius":70,"stroke":"#fff","strokeWidth":3,"fillColor":"#000","xTranslate":80,"yTranslate":80},
    {"startPos":75,"endPos":220,"innerRadius":70,"outerRadius":70,"stroke":"#fff","strokeWidth":3,"fillColor":"#000","xTranslate":430,"yTranslate":80}
];  
drawArc(svg02,gametes02);

circle02 = [
  {cx: 260, cy: 100, r: 40, fillColor: "yellow"},
  {cx: 610, cy: 100, r: 40, fillColor: "yellow"},
];
drawCircle(svg02,circle02);

text02 = [
    {x: 80, y: 80, text:"大きな", "anchor":"middle",
     stroke:"#fff",fontFamily:"serif", fontSize:"0.7em"},
    {x: 80, y: 100, text:"配偶子プール", "anchor":"middle",
     stroke:"#fff",fontFamily:"serif", fontSize:"0.7em"},
    {x: 430, y: 80, text:"大きな", "anchor":"middle",
     stroke:"#fff",fontFamily:"serif", fontSize:"0.7em"},
    {x: 430, y: 100, text:"配偶子プール", "anchor":"middle",
     stroke:"#fff",fontFamily:"serif", fontSize:"0.7em"},
    {x: 260, y: 100, text:"2N", "anchor":"middle",
     stroke:"#000",fontFamily:"serif", fontSize:"1.3em"},
    {x: 610, y: 100, text:"2N", "anchor":"middle",
     stroke:"#000",fontFamily:"serif", fontSize:"1.3em"},
]
drawText(svg02,text02);

var vecData02 = [
{"x1":160,"y1":100,"angles":0,"length":50,"stroke":"#fff","strokeWidth":4},
{"x1":310,"y1":100,"angles":0,"length":50,"stroke":"#fff","strokeWidth":4},
{"x1":510,"y1":100,"angles":0,"length":50,"stroke":"#fff","strokeWidth":4},
];    
drawVectorA(svg02,vecData02);

var svg03 = d3.select("#svg03").append("svg")
                .attr("width",700)
                .attr("height", 200)
                .style("background","#000");
rectData03 = [
{"x":50,"y":50,"width":60,"height":100,"stroke":"#fff" },
{"x":320,"y":50,"width":60,"height":100,"stroke":"#fff"},
{"x":590,"y":50,"width":60,"height":100,"stroke":"#fff"} 
];
drawRect(svg03,rectData03);

text03 = [
    {x: 80, y: 100, text:"2N", "anchor":"middle",
     stroke:"#fff",fontFamily:"serif", fontSize:"1.3em"},
    {x: 350, y: 100, text:"2N", "anchor":"middle",
     stroke:"#fff",fontFamily:"serif", fontSize:"1.3em"},
    {x: 620, y: 100, text:"2N", "anchor":"middle",
     stroke:"#fff",fontFamily:"serif", fontSize:"1.3em"},
    {x: 80, y: 190, text:"G", "anchor":"middle",
     stroke:"#fff",fontFamily:"serif", fontSize:"1.3em"},
    {x: 350, y: 190, text:"G1", "anchor":"middle",
     stroke:"#fff",fontFamily:"serif", fontSize:"1.3em"},
    {x: 620, y: 190, text:"G2", "anchor":"middle",
     stroke:"#fff",fontFamily:"serif", fontSize:"1.3em"},

]
drawText(svg03,text03);

var vecData03 = [
{"x1":150,"y1":100,"angles":0,"length":130,"stroke":"#fff","strokeWidth":4},
{"x1":420,"y1":100,"angles":0,"length":130,"stroke":"#fff","strokeWidth":4},
];    
drawVectorA(svg03,vecData03);

</script>



