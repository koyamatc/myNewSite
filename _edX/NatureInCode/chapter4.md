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

|:--|:---:|--|
|Genetic Drift|&rarr;|decrease genetic variation|
|Mutation|&rarr;|increase genetic variation|

$$
\begin{array}{l}
次世代に同じタイプの対立遺伝子を選択する確率\\
G^{'} = \frac{1}{2N} + (1 - \frac{1}{2N})G　\\
突然変異を加える\\
突然変異率/allele/generation　\\
\mu \\
突然変異しない確率は \\
1 - \mu \\
２つの対立遺伝子が共に変異しない確率 \ ２つとも同じタイプのまま \\
(1 - \mu)(1 - \mu) = (1 - \mu)^2 \\
同じタイプのalleleを選択して、突然変異が起こらない確率\\
G^{'} = (1 - \mu)^2(\frac{1}{2N} + (1 - \frac{1}{2N})G)　\\
(1 - \mu)^2を展開します\\
1-2\mu + \mu^2 \quad \mu^2は非常に小さいので無視できる　\rightarrow 1-2\mu \\
  \begin{eqnarray}
  G^{'} &=& (1 - 2\mu)(\frac{1}{2N} + (1 - \frac{1}{2N})G)　\\
  &=& (1 - 2\mu)(\frac{1}{2N} + G - \frac{G}{2N})　\\
  &=& \frac{1}{2N} + G - \frac{G}{2N} -\frac{2\mu}{2N} - 2\mu G + \frac{2\mu G}{2N} \\
  \frac{2\mu}{2N} \ \frac{2\mu G}{2N} \ は非常に小さいので無視\\
  &=& \frac{1}{2N} + G - \frac{G}{2N} - 2\mu G \\
  &=& \frac{1}{2N} +(1 - \frac{1}{2N})G - 2\mu G \\
  H^{'} = 1 - G^{'}なので \\
  H^{'} &=& 1 - \frac{1}{2N} -(1 - \frac{1}{2N})(1-H) - 2\mu(1-H) \\
  &=& 1 - \frac{1}{2N} - 1 + H + \frac{1}{2N} - \frac{H}{2N} -2\mu + 2\mu H\\
  &=& (1 - \frac{1}{2N})H - 2\mu (1 - H)\\
\end{eqnarray}



\end{array}
$$

<link href="https://fonts.googleapis.com/earlyaccess/roundedmplus1c.css" rel="stylesheet" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://d3js.org/d3.v4.js"></script>
<script src="../../js/d3V4draws.js"></script>

<script>
  $(document).ready(function() {
    $('select').material_select();
  });

  const bases = ['A','G','C','T'];
  var number_of_sequences = 100;  
  var sequence_length = 20;
  var original_sequence = [];
  var sequences = []; // population
  var number_of_generations = 100;
  var mutation_rate = 0.0001; // per base and generation  
  
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
        original_sequence.push(random_base(""));
    }  
  }
  // 遺伝子配列生成  
  function random_base(current_base){
      let new_base;
      do {
        let index = Math.floor(Math.random()*4);
        new_base = bases[index];
      }while(new_base == current_base); /* 現在の元と同じ元が返らないようにする*/
      return new_base;
  }

  function print_sequences(title){
    console.log(title);
    for (let i=0;i < number_of_sequences;i++){
       print_sequence(sequences[i]);
    }
    console.log("");
  }

  function print_sequence(sequence){
    let sequence_string = "";  
    for (let i=0;i < sequence_length;i++){
      sequence_string += sequence[i];
    }
    console.log(sequence_string);
  }  

  function run_generations(){
    for (let i =0; i < number_of_generations; i++){
      /* each generation */
      for (let j = 0; j < sequences.length; j++){
        /*each sequence*/
        for (let k = 0; k < sequences[j].length; k++){
          /*each base*/
          if (Math.random() < mutation_rate){
            sequences[j][k] = random_base(sequences[j][k]);
          }
        }

      }
    }
  }

  generate_first_generation();  
  print_sequences("Generation 0");
  run_generations();
  print_sequences("After " + number_of_generations + " generations");









</script>
