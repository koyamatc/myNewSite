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

__進化__　：　時間とともに個体群(population)の中で対立遺伝子(allele)の頻度における変化。

__allele(対立遺伝子)__ :　遺伝子の別バージョンと言える

<div class="row">
    <div class="col s1">gene</div>
    <div class="col s1"></div>
    <div class="col s1">A</div>
    <div class="col s1"></div>
</div>
<div class="row">
    <div class="col s1">allele</div>
    <div class="col s1">A1</div>
    <div class="col s1"></div>
    <div class="col s1">A2</div>
</div>

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

<style>
#root01,
#root02,
#root03,
#root04,
#root05
 {
    display:flex;
}
.cell {
    border: 1px solid black;
    border-radius:50%;
    height: 40px;
    width: 40px;
    text-align: center;
    vertical-align: middle;
    font-size: 1.7em;
}
.space {
    height: 40px;
    width: 70px;
}
</style>
<div id="root01">
<div class="cell">||</div>
<div class="cell">||</div>
<div class="cell">||</div>
<div class="cell">||</div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="cell">||</div>
<div class="cell">||</div>
<div class="cell">||</div>
<div class="cell">||</div>
</div>
<div id="root02">
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space">meiosis  減算分裂</div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
</div>
<div id="root03">
<div class="cell">|</div>
<div class="cell">|</div>
<div class="cell">|</div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="cell">|</div>
<div class="cell">|</div>
<div class="cell">|</div>
<div class="space">gametes</div>
<div class="space">(配偶子)</div>
</div>
<div id="root04">
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
</div>
<div id="root05">
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="cell">||</div>
<div class="space">zygote</div>
<div class="space">(接合子)</div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
</div>



<script>
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
</script>
