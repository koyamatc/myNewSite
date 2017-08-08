---
layout: post
title: The Genes, They are a-Changing
date: 2017-08-08 00:00:00 +900
subject: natureincode
description:
  Nature, in Code teaches programming in JavaScript by implementing key concepts in biology (natural selection, genetic drift, epidemics, etc.). Learn programming while discovering the rules that govern life.
---

-------
#### Evolution

__Evolution__ : The Change in allele in a population

#### Hardy-Weinberg model

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
