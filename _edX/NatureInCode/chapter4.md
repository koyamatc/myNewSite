---
layout: post
title: Mutation - The Power of Mistakes
date: 2017-09-06 12:00:00 +900
subject: natureincode
description:
  Nature, in Code teaches programming in JavaScript by implementing key concepts in biology (natural selection, genetic drift, epidemics, etc.). Learn programming while discovering the rules that govern life.
---

-------

Mutation(突然変異)は、遺伝子の連鎖における無作為な変化。
突然変異のほとんどは、遺伝子の連鎖（DNA）が複製されるときに起こる。
複製の処理は、非常に正確ではあるが、100％エラーが無いのではない。
いつしかエラーは起こり、その新しいコピーは、オリジナルのコピー元とは異なるものになる。
この章では、この複製処理についてみていきます

この章で学ぶこと:

• 突然変異は、遺伝的変異の源である

• 遺伝的浮動は遺伝的変異を抑える働きをするが、突然変異は遺伝的変異を増加させる。突然変異の効果で、浮動の効果が相殺されると、個体数における遺伝的変異は変わらない

• 個体数が少ない、もしくは突然変異率が低いならば、均衡点において遺伝的変異は低い。反対に個体数が多い、もしくは突然変異率が高いなら、遺伝的変異は高くなる

• 新しい突然変異が定着する割合は1/2N。定着するとすれば、そのプロセスには平均で４Ｎ世代かかる

• 置換率は突然変異率で与えられ、個体数には依存しない


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

-----

##### DNA and Mutation

-----

##### Genetic Drift and Mutation
 

<link href="https://fonts.googleapis.com/earlyaccess/roundedmplus1c.css" rel="stylesheet" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://d3js.org/d3.v4.js"></script>
<script src="../../js/d3V4draws.js"></script>

<script>
  $(document).ready(function() {
    $('select').material_select();
  });

  var number_of_sequences = 100;  
  var sequence_length = 20;
  var original_sequence = [];
  var sequences = []; // population  
  
  // 第１世代生成
  function generate_first_generation(){
    generate_first_sequence();
    for (let i = 0;i < number_of_sequences;i++){
        sequences.push(original_sequence.slice());
    }
  }
  // 最初の遺伝子配列生成  
  function generate_first_sequence(){
    for (let i = 0; i  < sequence_length; i++){
        original_sequence.push(random_base);
    }  
  }
  // 遺伝子配列生成  
  function random_base(){
      let bases = ['A','G','C','T'];
      let index = Math.floor(Math.random()*4);
      return bases[index];
  }

  generate_first_generation();  


var ar = [0,0,0,0,0,0,0];
var max = [110,260,330,180,90,30,10];
var i = 0;
function children_in_family(){
    if (ar[i]>=max[i]){
        i++;
    }
    ar[i]++;
    return i;
}

for (let i=100;i<1000;i++){
    children_in_family();
}

console.log(ar,i);








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
