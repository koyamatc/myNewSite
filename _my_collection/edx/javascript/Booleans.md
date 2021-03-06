---
layout: post
title: Adding interactivity to HTML documents
date: 2017-06-19 00:00:00 +900
subject: javascript
description:
  edx's course by W3C.
  Introductory course designed to understand 
  the basic concepts of JavaScript.  
---

-------
<style type="text/css">
#myDiv {
  color:red;
  background-color: pink;
  width:100px;
  height:100px;
  text-align:center;
  margin:20px;
}
</style>

#### Boolean values and logical operators

##### Introduction

以前、JavaScriptのプログラムがどの様に判断を下せるのかについて話しました、
それは「もし条件が満たされたらこのことを行う、さもなければ、そちらを行う」というようにです、さらに少し概念を導入する必要があります。

まず、"真偽値(boolean value)" と "論理演算子"からです

##### Boolean values
真偽型は、2種類の値 真(true) と 偽(false) を持つ論理的エンティティを表します

キーワード true と false　を使う:
{% highlight javascript linenos %}
var b = true; 
 
var b = false;
{% endhighlight %}

真偽型の変数はクォーテーションマークで囲ってはいけません、それは文字列変数になってしまいます:
{% highlight javascript linenos%}
var b = 'true'; // b is not a boolean but a string
{% endhighlight %}

##### Undefined and null values

__Undefined__

undefined は　変数がまだ割り当てられていないときに返されます:
{% highlight javascript linenos %}
var foo;
> foo
undefined
 
> typeof foo;
'undefined'
 
>if (foo === undefined) {
    console.log('The variable foo has no value and is undefined');
}
'The variable foo has no value and is undefined'
{% endhighlight %}

上記の例は、変数が値を持っているかをどうテストするかを示しています（８行目は条件文を使用しています）

キーワード "undefined" は、JavaScript 言語の仕様であり、変数に未定義の値を割り当てられるということです:
{% highlight javascript linenos %}
> var foo = undefined; // equivalent to var foo; without giving any value
undefined
 
> foo;
undefined
 {% endhighlight%}

var foo; と var foo = undefined; は、同じですが、変数を宣言するときは最初のほうを推奨します(短くてコードを短縮できます）

まだ宣言されていない変数にアクセスしようとすると、参照エラー（ReferenceError）が生成されます。
しかし、 typeof演算子は "undefined"を返します。
{% highlight javascript linenos %}
> bar;
ReferenceError
 
> typeof bar;
'undefined'
{% endhighlight %}

##### Logical operators

論理演算子は以下のようなものがあります: 
<ul class="collection">
    <li class="collection-item">
        <em>&&(AND)</em>
        <p使用例 : if ((x  > 0) && (x < 10)) { 
                 console.log('x is strictly positive and less than 10'); 
             }</p>
    </li>
    <li class="collection-item">
        <em>||(OR)</em>
        <p>使用例 : if ((x  > 0) || (x == -5)) { 
                 console.log('x is positive or equal to -5'); 
             }</p>
    </li>
    <li class="collection-item">
        <em>!(NOT)</em>
        <p使用例 : if (!(x  > 0)) { 
                 console.log('x is not positive (x is less or equal to 0'); 
             }</p>
    </li>
    <li class="collection-item">
        <p>&&, || 演算子は2項, ! は単項 </p>
    </li>
</ul>
{% highlight javascript linenos %}
var b = !true; 
b; //false
 
var b = !!true;
b; //true
 
var b = "one"; 
!b;   false // implicit conversion of "one" to a boolean value
 
var b = "one"; // implicit conversion of "one" to a boolean value
!!b; //true
{% endhighlight %}
 論理演算子を含む式（上記例の８と１１行目）では、真偽型ではない値は、真偽値に変換されます。

 ##### Lazy evaluation or short-circuit evaluation:
論理式は左から右の順に評価されます。 JavaScript は　"short-circuit evaluation"として知られるメカニズムを使い明らかなケースにおいては、2番目、3番目、n番目の条件のテストを回避します：
<ul class="collection">
    <li class="collection-item">
    false && something (an expression)  is always false, and the part to the right of && operator is not tested.
    </li>
    <li class="collection-item">
    true || something (an expression) is evaluated to true, and the part to the right of the || operator is not tested.
    </li>
</ul>
例:
{% highlight javvascript linenos %}
var b = 5;
var c = 6;
 
if ((b === 5) || (b === 6))  { //the second part is never tested
    console.log('b is equal to 5 or equal to 6');
}
 
if ((b === 5) && (c === 6)) {  // second part is evaluated
    console.log('b  is equal to 5 and c is equal to 6');
}
 
if ((b === 15) && (c === 6)) {  // second part is never evaluated
    console.log('b  is equal to 5 and c is equal to 6');
} else {
    console.log('b not equal to 15 or c not equal to 6');
}
{% endhighlight %}

##### Implicit conversions of non boolean values in expressions

論理演算子が付いている、または、ステートメントの中にあるとき、
真偽型でない値は、真偽値に変換されます
<strong class="red-text">下記のすべての値は false と評価されます:</strong>
<ul class="collection">
    <li class="collection-item">false</li>
    <li class="collection-item">undefined</li>
    <li class="collection-item">null</li>
    <li class="collection-item">0</li>
    <li class="collection-item">NaN</li>
    <li class="collection-item">the empty string ''</li>
</ul>

<strong class="red-text">そのほかすべての値は true と評価されます!</strong>
{% highlight javascript linenos %}
var boo = 'hello' && 'world';
{% endhighlight %}
boo equals 'world' because 'hello' is a string value that is evaluated as true.
{% highlight javascript linenos %}
var boo2 = (0/0) || 43.2 ;
{% endhighlight %}
 boo2 equals 43.2 because the expression 0/0 equals NaN, which is evaluated as false.

__Question:__

このコードが実行された後の変数 myNumber の値は何ですか？ 
{% highlight javascript linenos %}
var myNumber = !1;
 
if(myNumber == null){
   myNumber = 3;
}
 
myNumber = myNumber || 2;
{% endhighlight %}

__説明:__ 1行目の後に、 myNumber は false。
3行目の if 文の中では false は null　とイコールではないので、値３は 変数 myNumber に割り当てられwません。
最後の行で、 myNumber は false と評価されます、 そして値２が変数 myNumber に与えられます。

##### Comparison Operators
<ul class="collection">
    <li class="collection-item">Equal ==</li>
    <li class="collection-item">Not equal !=</li>
    <li class="collection-item">Greater than ></li>
    <li class="collection-item">Greater than or equal >=</li>
    <li class="collection-item">Less than <</li>
    <li class="collection-item">Less than or equal to <=</li>
    <li class="collection-item">Strict equal ===</li>
    <li class="collection-item">Strict not equal !==</li>
</ul>

JavaScriptにおいて __==__ と __===__ の違いは何でしょう?

__Equal (==)__

オペランド（演算の対象）が型変換をすれば、まったく同じであるとき true を返します

__Strict equal (===)__

オペランドが型変換をしなくても全く同じであるとき true を返します

3重イコール演算子は型変換を決して行いませんから、オペランド両方が、同じオブジェクトを参照しているか、
または、値の型が同じで、値も同じである場合に true を返します。

Some examples :
{% highlight javascript linenos %}
1 == 1 ;
//true
 
1 == 2 ;
//false
 
/* Here, the interpreter will try to convert the string ‘1’
into a number before doing the comparison */
 
1 == '1';
//true :
 
 
//with strict equal, no conversion:
 
1 === 1;
//true
1 === '1';
//false
{% endhighlight %}

<p class="materialize-red-text">
内容によりますが、一般には　厳密なイコール（厳密な 否イコール）をつかうのがよい 
</p>
<p class="materialize-red-text">
初心者は: === または !== を比較には常に使いましょう
</p>

ここに、この件に関する興味ある記事があります

["Why you should use strict equal"](https://www.impressivewebs.com/why-use-triple-equals-javascipt/) (Impressive Webs, March 1st, 2012)

##### Specific case of NaN

JavaScript には特別な値があることを見てきました。
その一つが NaN: “Not-a-Number”. 

NaN は　このような特別な属性があります : 
{% highlight javascript linenos %}
NaN == NaN;
// false
 
NaN === NaN;
// false
{% endhighlight %}

 __Nan は何もないということです - 自分自身でさえないのです!__  しかし　NaN値をチェックする関数があります:  isNaN(expr) 

isNaN: 引数が NaN である場合のみ true を返し、それ以外では false を返します。
{% highlight javascript linenos %}
isNaN(NaN);
// true
 
isNaN(0/0);
// true
 
isNaN(12);
// false
 
isNaN('foo');
// true
{% endhighlight %}

"値 X が NaN であるかをテストする頼れる ECMAScript コードは、
X !== X 形式です。 結果は X が NaN　の時だけ true となります。 " ([isNan documentation](http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.2.4))を見てください。

##### A complete example with isNaN: 
{% highlight javascript linenos %}
var num =0/0;
 
if(isNaN(num)){
   num = 0;
}
//shortened version with the conditional operator
var num = isNaN(num) ? 0 : num
 
//version with logical operator (implicit conversion)
var num = num || 0;
 
/*
   <=> num = NaN || 0
 
   <=> num = false || 0
*/
 
num;
//returns 0 in this three cases
{% endhighlight %}
当然 0/0 も、たまには起こりますが、 NaN が発生する別のケースがあります、例えば:
<ul class="collection">
    <li class="collection-item">
    parseInt('foo');  NaNを返す   //parseInt は文字列を数値に変換しようとします    
    </li>
    <li class="collection-item">
    Math.sqrt(-1); NaN を返す     
    </li>
</ul>

-------

#### Conditional statements: if...then...else, switch
##### Conditional statements

__What are statements?__

JavaScript の　ソースコードは、ステートメント（文）の集まりです。
ステートメントにはいくつかの種類があります。
すでに見てきたステートメントの種類に、変数ステートメントがあります:
{% highlight javascript lineons %}
var myVar = 'hello ' + 'world';
{% endhighlight %}
式ステートメントも見ました:
{% highlight javascript linenos%}
3 + 4;
 
// more often like this
var x = (3 + 4);
var y = (5 + x);
{% endhighlight %}
ステートメントは、セミコロンで終わります、しかし、後で出てきますが、
セミコロンがない場合に、自動的に挿入されます(コードを読みとるための理由。W3Cでは、すべてのステートメントの終わりには、セミコロンを機械的につけることを強く推奨しています）。

ステートメントは通常、スクリプトの上から下へと順番に実行されます。
　しかし、この流れを変えることができます、その時使うものに、条件文や繰返し文があります。

__The block statement__

ブロック文は、単純な文であり、それは波括弧に挟まれた複数の分を一まとめにしたものです

Block statement:
{% highlight javascript linenos %}
{
    var i = 0;
    var result = false;
    console.log('i = ' + i);
}
{% endhighlight %}
ブロック文は、ほかの文で使われます、例えば、if 文 とか for 文でです。

__Conditional statements__

CodePen や devTool の console でいろいろ試してみてください

{% highlight javascript linenos %}
/*CONDITIONAL STATEMENTS*/
/*if statement*/

var num = 10;
if (num == 10) {
    num = 20;
}

console.log('if statement,\n num>> ' + num);

/*if-else statement*/

var num = 10;
if (num > 10) {
    num = 20;
} else {
    num = 0;
}

console.log('if-else statement,\n num>> ' +num);

/*
Question 1 
how to replace this code by an expression including one operator?
*/
var max; 
var min;
// Try to uncomment that and // see the difference!
// var min=1;
if (min){
    max = min + 10;
} else {
    max = 10;
}
console.log('question1, \n max>> ' + max);
//Answer is at the end of the document


/*switch statement*/

//this example is equivalent to the previous if-else example
var num = 10;
switch(num){
  case(num>10): num=20;
    break;
  default: num = 0;
}
console.log('switch1,\n num> ' + num);

//switch statement behaviour when break keyword is missing
//comment and uncomment cloudColor variable to see the different results

var gear = '';
//var cloudColor;
//var cloudColor = 'green';
var cloudColor = 'black';
switch(cloudColor) {
    case 'green': gear += 'spacesuit';
        break;
    case 'black': gear += 'boots, ';
    case 'grey': gear += 'umbrella, ';
    case 'white': gear += 'jacket, ';
    default: gear += 'watch';
}

console.log('switch2,\n gear >> ' + gear);

//The above example with break; 

var gear = '';
//var cloudColor;
//var cloudColor = 'green';
var cloudColor = 'black';
switch(cloudColor) {
    case 'green': 
      gear += 'spacesuit';
      break;
    case 'black': 
      gear += 'boots, ';
      break;
    case 'grey': 
      gear += 'umbrella, ';
      break;
    case 'white': 
      gear += 'jacket, ';
      break;
    default: 
      gear += 'watch';
}

console.log('swtich3,\n gear >> ' + gear);



/*
Question 1 
how to replace this code by an expression including one operator?
var max;
var min;
if (min){
    max = min + 10;
} else {
    max = 10;
}
*/

//Answer
var max;
var min;
max = (min)? min+10 : 10;
//console.log('question 1,\n max >> ' + max);
{% endhighlight %}

(Please look, edit and try whatever you want. There are parts that are commented - please remove comments and try to understand the results).

<p class="center">
条件文は一塊のコードを実行するために使われます 
</p>
<p class="center">
条件が true と評価された場合のみ
</p>

##### The if statement

Syntax:
{% highlight javascript linenos %}
if ( Expression ) Statement else Statement

if ( Expression ) Statement
{% endhighlight %}

__The expression may include:__

<ul class="collection">
    <li class="collection-item">
    論理演算子 ( ! && || )    
    </li>
    <li class="collection-item">
    比較演算子 ( ==, ===, >, >=, <, <= )    
    </li>
    <li class="collection-item">
    値 や 式　で、それらは真偽値に変換される    
    </li>
</ul>

Example: if-statement
{% highlight javascript linenos %}
var num = 10;
 
if (num === 10) {
    num = 20;
}
 
// num equals 20
{% endhighlight %}

Example: if-else statement
{% highlight javascript linenos %}
var num = 10;
 
if (num > 10) {
    num = 20;
} else {
    num = 0;
}
 
// num equals 0
{% endhighlight %}

__Reminder:__

下記の値は false と評価される:
<ul class="collection">
    <li class="collection-item">false</li>
    <li class="collection-item">undefined</li>
    <li class="collection-item">null</li>
    <li class="collection-item">0</li>
    <li class="collection-item">NaN</li>
    <li class="collection-item">""(empty string)</li>
</ul>
<p class="materialize-red-text">
すべてのオブジェクトを含め、すべての値は、条件文のなかでは true と評価されます
</p>

__The if-then-else ternary operator__

三項演算子は if...then...else　の短縮バージョンです。

コード例:
{% highlight javascript linenos %}
var max;
var min = 2;
 
if (min < 10) {
    max = min + 10;
} else {
    max = min;
}
{% endhighlight %}
__Explanation:__ この "if-then-else" 文を 三項演算子で置き換えられます、 "?" and ":"文法を使います
{% highlight javascript linenos %}
var max;
var min;
max = (min < 10)? min+10 : min;
{% endhighlight %}

行 3 は if (min < 10) then max = min+10, else max = min　と読めます。 "then"部分は "?" の後ろで "else" 部分は　":" の後ろです。

この短縮形は "then" と　"else　部分が、とても分かりやすい命令を含む、
とても単純な文である以外には推奨されません。通常、初心者には大変読みづらい文法です。

__Curly braces__

if-then-else 文で波括弧を使わなければならないのか? 
波括弧の無い例がウェブ上にあります。: どういう意味でしょう?

同じコードの2つのバージョンです。

Version 1: no curly braces
{% highlight javascript linenos %}
if (a > 2)
    result = 'a is bigger than 2';
else
    result = 'a is not bigger than 2';
{% endhighlight %}
Version 2: with curly braces for delimiting the "then" and "else" blocks
{% highlight javascript linenos %}
if (a > 2) {
    result = 'a is bigger than 2';
} else {
    result = 'a is not bigger than 2';
}
{% endhighlight %}

バージョン 1 と 2 は、同等です。 しかし、バージョン 1 が正解です: 波括弧は付けなくていいです
もし "then" または "else" ブロックが 1文 (1行のコード)だけの場合は。

しかし、バージョン 2 は、より簡潔で読みやすく、特に、保守性に優れています 
(なぜならエンターキーを押すだけで1行追加できます。
さらに、"1行ルール" を破り波括弧を追加することを気にせず、もっと行を追加できます).

それゆえに、if-statements には、波括弧を常に使うことを勧めます。 

当然、このような1行 if-statements は :
{% highlight javascript linenos %}
if (true) doSomething();
{% endhighlight %}
実際、速く書けます、しかし、後で文を追加する予定があるならば、その時はより時間がかかると予想されます

__Conclusion:__ always use curly braces!

##### The switch statement

if と else を連続して使うのを避けるために、switch 文を使うことができます。 

switch 文の文法は:
{% highlight javascript linenos %}
switch (expression) {
    case value1:
        statement
        break;       // break を省けるのは、
                     // その次のテストケースを実行させる場合です
                     // ほとんどの場合 break を付けます;
                     // "case"の最後のところに
 
    case value2:
        statement
        break;
 
    case value3:
        statement
        break;
 
    default:         // if no case tested true
        statement
        break;
}
{% endhighlight %}
もし式の値がケースのひとつとイコールである（評価に使われる演算子は===です）、
この case ブロックの次のすべての文はキーワード break が見つかるまで順番に実行されます。

Example 1: a common switch/case/default example.
{% highlight javascript linenos %}
var gear = '';
 
switch (cloudColor) {
    case 'green':
        gear = 'spacesuit';
        break;
 
    case 'black':
        gear = 'boots';
        break;
 
    case 'grey':
        gear = 'umbrella';
        break;
 
    case 'white':
        gear = 'jacket';
        break;
 
    default:
        gear = 'watch';
        break; // useless if in the last case
} // end of the switch statement
{% endhighlight %} 

この例では、もし雲が灰色の場合、使うものは傘になります。もし雲が白なら、上着を着ます、
もし黒なら、裸でブーツだけ（！）、そして緑なら、宇宙服。
雲の色がこの中になかったときは、腕時計をつけるだけ。
異なるケースの最後に break キーワードがあることは、100% 排他的に選択が行われ、1つのケースだけが実行されます。

 Example 2: a switch without "breaks" at the end of each case.
{% highlight javascript linenos %}
var gear = '';
 
switch (cloudColor) {
    case 'green':
        gear += 'spacesuit';
        break;
 
    case 'black':
        gear += 'boots, ';
 
    case 'grey':
        gear += 'umbrella, ';
 
    case 'white':
        gear += 'jacket, ';
 
    default:
        gear += 'watch';
} // end of the switch statement
{% endhighlight %} 
__Explanation:__ もし雲が黒いなら、使うものは、'ブーツ, 傘, 上着, 腕時計'となります。
もし雲が緑なら、使うものは 宇宙服 (break キーワードがない場合, ほかのケースはテストされません)。
もし色がリストの中に無ければ、使うものは腕時計だけです(default case)。

このセクションの最後に完全な例を: three ways to do condition statements (to run it: click on the "edit on codepen" label and once in codepen, open the devtool console to see the outputs of this program):

{% highlight javascript linenos %}
/*CONDITIONAL STATEMENTS*/
/*3 examples which are equivalent*/

//try to change foo value 
var foo=1;
//var foo=2; 
//var foo=1000;
//var foo=0;
//var foo='1';

var bar1,bar2,bar3;

//example 1 
if(foo===1){
  bar1='one';
}
else if(foo===2){
  bar1='two';
}
else{
  bar1='something';
}

//example 2
bar2 = (foo===1)?'one':(foo===2)?'two':'something';

//example 3
switch(foo){
  case 1 :
    bar3='one';
    break;
  case 2 : 
    bar3 ='two';
    break;
  default:
    bar3 ='something';
}

//now we print results :

console.log('example1,\n bar1 >> ' + bar1);
console.log('example2,\n bar2 >> ' + bar2);
console.log('example3,\n bar3 >> ' + bar3);

{% endhighlight %}

-----------

#### Loop statements
##### Loops
ループは、条件が満たされている間、数回同じコードブロックを実行するために使います。

ループで困ったときには、オンライン・ツールの slowmoJS が、役立つでしょう: 
その中の例をコピペして、ステップバイステップで動かし、プログラムがどの様に実行されるかを見てみましょう。

__The while statement__

while 文は、 指定された条件が満たされている間(True)、繰返しコードブロックが実行されます。

Syntax:
{% highlight javascript linenos %}
while ( condition ) statement
{% endhighlight %}
条件は式です、 そして、文は、ブロック文でもよいです。

while 文の例:
{% highlight javascript linenos %}
var i = 1, j = 1;
 
while ( i < 4 ) {
    j += i;
    i += 1; 
}
...
{% endhighlight %}

while 内のブロック (行 4 と 5) は、3回実行されます:
<ul class="collection">
    <li class="collection-item">
    行 1 は、i を 値 1 で初期化します    
    </li>
    <li class="collection-item">
    行 3 で、while 文に入ります。i の値は厳密に比較して 4 より小さいですか？    
    </li>
    <li class="collection-item">
はい, 変数 i は 1 に等しいです、 while 内の文に入ります
    </li>
    <li class="collection-item">
        Run 1:
        <ul class="collection">
            <li class="collection-item">
            行 4 を実行: j += i; (equivalent to j = j + i). 1 行目で j は 1 に設定されています, そして j は今 2です。
            </li>
            <li class="collection-item">
            行 5 を実行すると i は 1 増加します。 変数 i は 2 となります。            
            </li>
            <li class="collection-item">
            3 行目の while に戻ります。 i < 4? はい, 行 3 と 4 を再び実行します
            </li>
        </ul>
    </li>
    <li class="collection-item">
        Run 2:
        <ul class="collection">
            <li class="collection-item">
            今、行 5 の最後にいます、 j は "古い j 値" + "新しい i の値"、つまり j = 2 + 2 = 4, i は１増えて今 ３ です。
            </li>
            <li class="collection-item">
            行 3 に戻ります. i < 4? はい, 行 3 と 4 を再び実行します。
            </li>
        </ul>
    </li>
    <li class="collection-item">
        Run 3:
        <ul class="collection">
            <li class="collection-item">
            ５行目の最後にいます, j は"古い j の値" + "新しい i の値", つまり j = 4 + 3 = 7, i は増加し 4　となります。
            </li>
            <li class="collection-item">
            行３の while に戻ります。 i < 4? いいえ! i の値は 4　です、 4より小さくありません。
            i = 4 で j = 7　で行７よりプログラムは実行を続けます。
            </li>
        </ul>
    </li>
</ul>


もちろん、決っして条件が false に決っしてときは、コード・ブロックは無限に実行され続けます
つまりマシンがクラッシュするまで... while (i > 0) { .....}のようなテストは
づっと止まらず、CPUを食い尽くします。

この例を slowmoJS で試してみましょう!

__The do-while statement__
do-while 文は while 文ととてもよく似ています、しかし、文法は異なります：
{% highlight javascript linenos %}
do statement while ( condition )
{% endhighlight %}

典型的な例:
{% highlight javascript linenos %}
var i = 0;
 
do {
    console.log('i = ' + i);
    i++;
} while(i < 20);

console.log('Value of i after the do-while statement: ' + i);
{% endhighlight %} 

do-while 文は while の条件をチェックする前に１度ループの中を実行します、
一方、 while 文は、ループの中を実行する前、最初に条件をチェックします

do-while は、１度はコード・ブロックを実行すべき時に使用します。
このような状況は珍しいと思われますので、単純な while-文がよく使われます

違いを確認したいのであれば [look at the "do-while" statement with slowmoJS](http://toolness.github.io/slowmo-js/?code=var%20condition%3D%20false%3B%0Avar%20foo%20%3D%200%3B%0Ado%7B%0A%20foo%2B%2B%3B%0A%7D%20while(condition%20%3D%3D%20true)%3B%0A%0Afoo%3B&filterrange=80-80) and [the "while" statement slowmoJS](http://toolness.github.io/slowmo-js/?code=var%20condition%3D%20false%3B%0Avar%20foo%20%3D%200%3B%0Awhile(condition%20%3D%3D%20true)%3B%20%7B%0Afoo%2B%2B%0A%7D%0A%0Afoo%3B&filterrange=68-68). 

__The for statement__

この文は、while と do-while 文に幾つかのものを追加します：初期化式と加算式

文法:
{% highlight javascript linenos %}
for (initialization; condition; incrementation) statement
{% endhighlight %}

括弧の中の３つの式はオプショナルです。 もし条件を省くと true に置き換わります（無限ループ）

Typical example (counting from 0 to 10):
{% highlight javascript linenos %}
for (var i = 0; i <= 10; i++) {
   console.log('i = ' + i);
}
{% endhighlight %}

初期化部分には１命令以上を設定できます、そして、加算部分にも：
{% highlight javascript linenos %}
for (var i = 1, j = 1; i <= 10; i++, j+=2) {
    console.log('i = ' + i + ' j = ' + j);
}
{% endhighlight %}

この例では、初期化式の中で２つの変数が定義され値が割り当てられています、
ブロック文が毎回実行される前に条件がチェックされます： i <= 10 が必要です。
ブロック文が毎回実行された後に加算式が実行され、変数 i を 1、j を 2 増加します

Open the devtool console of your browser and copy and paste the above code, or [look at the slowmoJS execution](http://toolness.github.io/slowmo-js/?code=for%20(var%20i%20%3D%201%2C%20j%20%3D%201%3B%20i%20%3C%3D%2010%3B%20i%2B%2B%2C%20j%2B%3D2)%20%7B%0A%20%20%20%20console.log(%27i%20%3D%20%27%20%2B%20i%20%2B%20%27%20j%20%3D%20%27%20%2B%20j)%3B%0A%7D&filterrange=0-89).

__The for-in statement__

for-in 文はオブジェクトや配列の中を繰り返すのに使われます
文法:
{% highlight javascript linenos %}
for ( variable in expression ) statement
{% endhighlight %}
例:
{% highlight javascript linenos %}
var michel = {              // michel is an object
    familyName:'Buffa',     // familyName, givenName, age
                            // are its properties
    givenName: 'Michel',
    age: 51
}
 
for(var property in michel) {   // the for-in will
                                // enumerate properties
    console.log(property);      // will print "familyName",
                                // "givenName",
                                // "age"
    console.log(michel[property]);  // michel['givenName'] same 
                                    // as michel.givenName
}
{% endhighlight %}

ブロック文が毎回実行される前に、 "property" と名付けた変数は、そのオブジェクトの属性(key)の一つの名前で
割り付けられています。

##### [ADVANCED] Other statements

__The continue statement__

continue 文はブロックの実行を止め、そのループの次の繰り返しを開始します。
break文との違いは、ループは継続するということです。
 
文法:

{% highlight javascript linenos %}
continue [label]
{% endhighlight %}
The label is optional.

例:
{% highlight javascript linenos %}
for(var i = 1, k = 0; i < 5; i++) {
    if (i === 3) {
        continue;
    }
 
    k += 2*i;
    console.log('k += ' + (2*i));
}
console.log('Final k value:' + k)
{% endhighlight %}
Copy and paste this example in your devtool console, but first, try to guess what the value of k will be!

Hint: lines 2-4 mean that line 6 will never be executed for i = 3. That means that i*2 will only be added to k for i = 1, 2 and 4...

__The break statement__

break 文は繰り返し、switch、ラベル付き文を止める時に使われます。

文法:

{% highlight javascript linenos %}
break [label]
{% endhighlight %}

例:
{% highlight javascript linenos %}
var tab = ['michel', 'john', 'donald', 'paul']; // johh at index = 1
 
function isNameInTheArray(name, theArray) {
    console.log("Number of elements in the array : " + theArray.length);
    for(var i=0; i < theArray.length; i++) {
        console.log('comparing with element in the array at pos ' + i);
 
        if(theArray[i] === name) {
           console.log('the name ' + name +
                       ' is in the array at pos: ' + i);
           break;
        } else {
           console.log(name + ' is not at pos ' + i);
        }
    }
}
 
// Execute the function
isNameInTheArray('john', tab);
{% endhighlight %}

Copy and paste in the devtool console. You'll see that the function that compares each element in the array passed as the second parameter with the name 'john', will stop looping after 'john' has been found at index = 1.

__Detailed explanations:__

<ul class="collection">
    <li class="collection-item">
    Line 20 関数を実行する    
    </li>
    <li class="collection-item">
    Line 6: for 文は　tab 内のインデックスの全てを繰り返す、0 から tab.length まで    
    </li>
    <li class="collection-item">
    Line 9: 条件が true なら、ブロックの中に入り、lines 10-12　を実行する    
    </li>
    <li class="collection-item">
    line 12 の break 文はループから抜けます
    </li>
    <li class="collection-item">
    インデクスが1より大きいと、別の console.log(...) はメッセージ "comparing with elements..." を表示しません：そのループはインデックス１（i = 1）に'john' が見つかった時に存在するのです。
    </li>
</ul>

------------

#### Functions and callbacks
##### Two ways to declare a function

__1 - Standard function declaration__

この文法を使い関数を宣言できることを知っています:
{% highlight javascript linenos %}
function functionName(parameters) {
// code to be executed
}
{% endhighlight %}
この方法で宣言された関数は、次のように呼び出すことができます:
{% highlight javascript linenos %}
functionName(parameters);
{% endhighlight %}
関数宣言の最後にセミコロンが追加されていないことに気づいてください。

セミコロンが使われるのは、実行可能なJavaScript 文を分けるためです、
つまり、関数宣言は、実行可能な文ではないということです。

例:
{% highlight javascript linenos %}
function sum(a, b) {
  // this function returns a result
  return (a + b);
}

function displayInPage(message, value) {
  // this function does not return anything
  document.body.innerHTML += message + value + "<br>";
}

var result = sum(3, 4);
displayInPage("Result: ", result);

// we could have written this
displayInPage("Result: ", sum(10, 15));
{% endhighlight %}

上記の例では、 sum 関数は値を返します、そして、displayInPage 関数は何も返しません

__2 - Use a function expression__

JavaScript 関数は、変数に保存する式を使って定義することもできます。
そうすると、変数が関数として使用できます。

例:
{% highlight javascript linenos %}
var sum = function(a, b) {
  return (a + b);
};

var displayInPage = function(message, value) {
  // this function does not return anything
  document.body.innerHTML += message + value + "<br>";
};

var result = sum(3, 4);
displayInPage("Result: ", result);

// we could have written this
displayInPage("Result: ", sum(10, 15));
{% endhighlight %}


sum と displayInPage 関数がどのように宣言されているか注目してください。
関数式を保存するために変数を使用しました、そして、変数名を使ってその関数を呼び出せます。
そして、その最後にセミコロンをつけました、なぜなら、変数に値を与えて、JavaScriptの命令を実行したからです。

"関数式" は "anonymous 関数"です、それは名前を持たない関数で
変数に割り当てられる値を表しています。その変数が関数実行に使われます。

関数は "ファースト　クラス　オブジェクト" で　JavaScript の他の　オブジェクト/値と同じように操作が可能です。

このことは、関数は他の関数の引数として使えることを意味します。この場合の引数となる関数を”コールバック”と呼びます。

##### Callbacks

関数はファースト　クラス　オヴジェクトなので、別の関数の引数として受け渡すことができて、
受け渡された関数を後で実行したり、後で実行させるために関数を返すことさえできます。
JavaScriptのコールバック関数とは：
別の関数に受け渡された関数で、呼び出した関数の中で実行されるもの。

今まで見てきたイベント・リスナの例はコールバック関数を使っていました。
もう一つの方法を見てみましょう:
{% highlight javascript linenos %}
// Add a click event listener on the whole document
// the processClick function is a callback:
// a function called by the browser when a click event
// is detected
window.addEventListener('click', processClick);

function processClick(event) {
  document.body.innerHTML += "Button clicked<br>";
}

// We could have written this, with the body of the callback as an argument of the addEventListener function
window.addEventListener('click', function(evt) {
  document.body.innerHTML += "Button clicked version 2<br>";
});
{% endhighlight %}

このケースでは processClick 関数は addEventListener method/function へ引数として受け渡されています。

コールバック関数はファンクショナ・プログラミングとして知られているプログラミング規範に由来しています。
JavaScriptではとても当たり前です。

-----------

### handling events
#### Introduction
ウェブ　アプリケーションをインターラクティヴにするには、例えば、
CSSの疑似クラス :hover を使ってもできます
<div class="row">
    <div class="col s12 m6">
{% highlight javascript linenos %}
button:hover {
  color:red;
  border:2px solid;
}
{% endhighlight %}
    </div>
    <div class="col s12 m6">
<style type="text/css">
#hoverButton:hover {
  color:red;
  border:2px solid;
}
#box01 {
    border: 3px solid #000;
    height: 200px;
}
</style>
    <button id="hoverButton" class="btn">Put the mouse cursor over me</button>
    </div>

</div>

しかし、マウスボタンを使ってボタンが押されたときに特定のアクションを起こさせるには、
マウス・ポインターの位置(x, y)が、ボタンのシステム座標内にあるか計算します、
また、もっと複雑な作業を実行するには、JavaScript を通してのみ行うことができます。

JavaScript で, ボタンのクリック、マウスの移動、ウィンドウのリサイズ、その他の多くの相互作用は
"イベント(event)"と呼ばれつものを生成します。
 イベントが生成されるタイミングと順番は、前もって予言できません。
 イベント処理は、非同期であるといえます。
 ウェブ　ブラウザはイベントの発生を検知し、そして、JavaScript コードへ受け渡します。
 これをするために、イベント・リスナとしての関数を登録し、
 特定のイベントのためのハンドラまたはコールバックを呼び出します
 
イベントが発生するたびに、 ブラウザは、そのイベントをイベント・キュウーに入れます

次に、ブラウザはイベント・リスナのリストを見て、聞いているイベントタイプに対応するリスナを呼び出します

#### Adding and removing event listeners
##### Event listeners: a typical example

イベント・リスナの登録方法の一つです。ボックス内でのクリック・イベントを聞いています。
ウェブ・ドキュメント上でクリックされると、そのイベント・ハンドラが処理を行います。
<div class="row">
    <div class="col s12 m6">
{% highlight javascript linenos %}
<script>
  addEventListener('click', function(evt) {
       document.body.innerHTML += "Button clicked!";
    });
</script>
{% endhighlight %}
    </div>
    <div id="box01" class="col s12 m6">
        <p>Click anywhere on this box</p>
    </div>
Try it below by clicking anywhere on the document:
<script>
  addEventListener('click', function(evt) {
      document.getElementById("box01").innerHTML += 'Button clicked!<br>';
  });
</script>
</div>

addEventListener 関数は、与えられたイベント・タイプが発生したときに、
呼び出される関数を登録する方法の一つです。
{% highlight javascript linenos %}
addEventListener(type_of_elem, __callback_function__)
{% endhighlight %}

To do >>>
例では, イベント・タイプは 'click'で、コールバック関数が the part in bold:

{% highlight javascript linenos %}
function(evt) {
   console.log("Button clicked!");
}t
{% endhighlight %}

コールバック関数が小さい（数行のコードの）時は、addEventListner関数の第二引数として本体に入れてしまうのが実践的です。

言い換えれば、これは:

{% highlight javascript linenos %}
addEventListener('click', function(evt) {
    document.body.innerHTML += 'Button clicked!';
});
{% endhighlight %}
クリックが発生したときに呼ばれる関数の本体は、addEventListnerの引数の外側にあり、
第二引数の名前を使って呼び出します。

{% highlight javascript linenos %}
addEventListener('click', processClick);
function processClick(evt) {
    console.log("Button clicked!");
}
{% endhighlight%}

##### Adding an event listener to specific HTML elements

ドキュメント全体でイベントを聞くのではなく、特定の DOM 要素に対して聞くことができます。

特定のボタンのクリック・イベントを聞く方法です
<div class="row">
    <div class="col s12 m8">
    {% highlight javascript linenos %}
    var b = document.querySelector("#myButton");
    b.addEventListener('click', function(evt) {
      alert("Button clicked");
    });
    {% endhighlight %}
    </div>
    <div class="col s12 m4">
        <button id="myButton" class="btn">Click me!</button>
    </div>
 <script>
    var b = document.querySelector("#myButton");
    b.addEventListener('click', function(evt) {
      alert("Button clicked");
    });
</script>    
</div>

この例では、直接 addEventListner メソッドを使う代わりに、
DOM オブジェクト(button) に対してメソッドを使っています。
<ul class="collection">
    <li class="collection-item">
    1. 検知したいイベントを起動する HTML 要素への参照を取得する。
    これは, DOM APIを使って行われる。
    この例では: var b = document.querySelector("#myButton");
    </li>
    <li class="collection-item">
    2. このオブジェクト上で、addEventListener メソッドを呼びだす。
    この例では: b.addEventListener('click', callback)
    </li>
</ul>

どの DOM オブジェクトにも addEventListener メソッドがあります。
JavaScript で、HTML要素への参照を取得しさえすれば、
その要素のイベントを聞くことが始められる。

__An alternative method for adding an event listener to an HTML element: use an "on" attribute (ex: onclick = "....")__

b.addEventListener('click', callback)を使う代わりに、onclick='doSomething();' 属性を
直接 その要素の HTML タグに書くこともできます:

<div class="row">
    <div class="col s12 m8">
    {% highlight javascript linenos %}
<button id="myButton2" class="btn" onclick="processClick(event);">Click me!</button>
    {% endhighlight %}
    {% highlight javascript linenos %}
    function processClick(evt) {
      alert("Button clicked");
    };
    {% endhighlight %}
    </div>
    <div class="col s12 m8">
        <button id="myButton2" class="btn" onclick="processClick(event);">Click me!</button>
    </div>
    <script>
        function processClick(evt) {
          alert("Button clicked");
        };
    </script>     
</div>

この文法は:
{% highlight javascript linenos %}
<button id="myButton" onclick="processClick(event);">Click me!</button>
{% endhighlight %}
... ok ですが、このボタンに対するクリック・イベントを聞くイベント・リスナが たった一つだけのときにはです。
なぜなら、onClick 属性は要素ごとに一つだけしか設置できないからです。

b.addEventListener('click', callback) 文法を使うことは, 
一つ以上のイベント・リスナを登録できるということです。
こんなことはめったに必要ないでしょうから、どちらの文法を使ってもいいでしょう。

大規模なプロジェクトの時には覚えておいてください、
HTML, CSS, JavaScript コードは、ファイルを分けるほうがより良いです。
この場合、すべてのイベント・リスナ定義を分割したJavaScriptファイルに置くことを推奨します。
"on" 属性文法への参照を addEventListner 文法を使います。

##### Removing event listeners
ボタンをクリックしたとき、processClick(evt) コールバック関数を実行します、
そして、その中で前もって登録していたリスナを取り除きます。
その結果: ボタンをクリックしても、何も起こりません。
<div class="row">
    <div class="col s12 m8">
    {% highlight javascript linenos %}
<button id="myButton">Click me, this will work only once!</button>
  <p></p>
    {% endhighlight %}
    {% highlight javascript linenos %}
    var b = document.querySelector("#myButton");
    b.addEventListener('click', processClick);
    
    function processClick(evt) {
     alert("Button clicked, event listener removed, try to click on the button again: nothing will happen anymore!"); 
      b.removeEventListener('click', processClick);
    }
    {% endhighlight %}
   </div>
    <div class="col s12 m8">
        <button id="myButton3"> class="btn" Click me, this will work only once!</button>
    </div>
      <script>
    var b = document.querySelector("#myButton3");
    b.addEventListener('click', processClick);
    
    function processClick(evt) {
     alert("Button clicked, event listener removed, try to click on the button again: nothing will happen anymore!"); 
      b.removeEventListener('click', processClick);
    }
  </script>
</div>

注：イベント・リスナを取り除くためには、名前付き関数で追加しておく必要があります、
そうすることで、addEventListener と removeEventListener 両方へ受け渡すことができます

-------------

#### Event Object

##### The event object is the only parameter passed to event listeners
Typical example:
{% highlight javascript linenos %}
function processClick(evt) {
    alert("Button clicked!");
}
{% endhighlight %}

各イベント・リスナには一つの引数があります、それは、"DOM event object"です。
そこには、役に立ついろいろなプロパティやメソッドがあります。

例えば、 'keyup', 'keydown' または 'keypress' イベントでは、
イベント・オブジェクトはキーが pressed/released　されたコードを持っています
'mousemove' リスナでは、イベントを生成したDOM要素内での相対位置を取得できます。

イベント・オブジェクトは、幾つかの重要なプロパティとメソッドがあり、それらはすべてのタイプのイベントに共通です：

<ul class="collection">
    <li class="collection-item">evt.type: イベントの名前</li>
    <li class="collection-item">
    evt.target: 例えば、イベントを起動した HTML 要素。 
    前述の例では ボタンのクリック・リスナにおいて、イベント・リスナ内の evt.target はそのボタン自身です。
    </li>
    <li class="collection-item">
    evt.stopPropagation(): は、イベントを聞いているすべての他の要素にそのイベントを伝えません。
    クリック・イベントがいろいろな要素に対して登録さsれているとします、例えば、ボタンとウィンドウに。
    ボタンをクリックしたとします、そのクリック・リスナ内で evt.stopPropagation()を呼ぶと、
    ウィンドウ・オブジェクトのクリック・イベント・リスナは呼び出されません。alled.
    </li>
    <li class="collection-item">
    evt.preventDefault(): ブラウザの既定の動作は実行されません。
    例えば、オブジェクトに設定した'contextmenu' イベント リスナの中で、
    evt.preventDefault()を呼び出すと、ブラウザの右クリックで表示される既定のコンテキスト・メニュの代わりに
    独自のコンテキスト・メニュを表示できるようになります。
    </li>
</ul>

イベントのタイプに関連したプロパティも持っています：
<ul class="collectio">
    <li class="collection-item">
    evt.button: マウス・イベント・リスナの場合で使われたマウス・ボタン
    </li>
    <li class="collection-item">
    evt.keyCode: 使われたキーのコード
    </li>
    <li class="collection-item">
    evt.pageX: ページに対して相対的なマウスの座標
    </li>
    <li class="collection-item">
    etc,
    </li>
</ul>

__Reference table__

もっとも役立つプロパティ:
<table class="bordered">
    <tr>
        <th>type</th>
        <td>イベントの名前を返す</td>
    </tr>
    <tr>
        <th>target</th>
        <td>イベントを起動した要素を返す</td>
    </tr>
</table>

もっとも役立つ共通なメソッド:

<table class="bordered">
    <tr>
        <th>preventDefault()</th>
        <td>
        キャンセル可能なイベントならば、そのイベントをキャンセルする。
        そのイベントの既定の動作は起こらないという意味です。
        ブラウザの既定の動作をキャンセルするのに役立ちます。
        例えば、右クリックで出てくるコンテキスト・メニュを作成したいとしたら、
        ブラウザ既定のコンテキスト・メニュが出てくるのを防ぐ必要があります。
        </td>
    </tr>
    <tr>
        <th>stopPropagation()</th>
        <td>イベント・フロー中にイベントのさらなる伝搬を抑止します</td>
    </tr>
</table>

-------

#### Page lifecycle events
これらのイベントは、ページが読み込まれたこと、DOMが準備できたことを検知します。

##### Events related to the page lifecycle

ページ　ライフ　サイクルに関連した多くのイベントがあります。
イントロダクションコースでもっとも役立つイベントは:

<table class="bordered">
    <tr>
        <th>load</th>
        <td>
        イメージなどのリソース全てを含んでいるオブジェクトが読み込まれた時に、このイベントは発生します。
        JSコードを実行したい時、DOMが利用可能か確かめたい時にこのイベントは有用です。
        言い換えれば、document.getElementById(...) や document.querySelector(...) はエラーを生成しません、なぜなら、ドキュメントは読み込まれていないし、探している要素はまだ利用可能ではないからです。
        </td>
    </tr>
    <tr>
        <th>resize</th>
        <td>
        ドキュメントの見かけのサイズが変わった時に発生するイベントです。
        通常、var w = window.innerWidth; と var h = window.innerHeight; を使い
        イベント・リスナ内で新しいウィンドウのサイズを取得します
        </td>
    </tr>
    <tr>
        <th>scroll</th>
        <td>
        要素のスクロールバーがスクロールされた時に発生するイベントです。
        通常、スクロール　イベント　リスナでこのように使います:
  var max = document.body.scrollHeight - innerHeight;
 var percent = (pageYOffset / max);
...ページでのスクロールのパーセントを知るために。
        </td>
    </tr>
</table>

__Page event properties__

ここで述べる必要のある特別なプロパティはありません。

__Example 1: 何かを実行する前にページが読み込まれる（DOMが利用可能となる）まで待つ__

This first variant that uses <body onload="init();">

HTML
{% highlight html linenos %}
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Example1 of the 'load' event</title>
</head>
<body onload='init();'>
  <p>This page uses <code>&lt;body onload='init();'&gt;</code> in the JS code  to execute the init function ONLY WHEN THE PAGE HAS BEEN LOADED!</p>
  
  <p>This is important as very often we cannot do important things before the DOM is ready (all HTML elements have been created and can be manipulated from JavaScript).</p>
  
  <p>PAGE STATUS: <span id="pageStatus">NOT LOADED YET</span></p>
</body>
</html>
{% endhighlight %}
JS
{% highlight javascript linenos %}
function init() {
  var status = document.querySelector('#pageStatus');
  status.innerHTML = 'LOADED!';
  
  // start working!
  // ....
}
{% endhighlight %}

This second variant: using window.onload = init; in the JavaScript code...

{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Example1 of the 'load' event</title>
</head>
<body>
  <p>This page uses <code>window.onload = init;</code> in the JS code  to execute the init function ONLY WHEN THE PAGE HAS BEEN LOADED!</p>
  
  <p>This is important as very often we cannot do important things before the DOM is ready (all HTML elements have been created and can be manipulated from JavaScript).</p>
  
  <p>PAGE STATUS: <span id="pageStatus">NOT LOADED YET</span></p>
</body>
</html>
{% endhighlight %}
{% highlight javascript linenos %}
window.onload = init;

function init() {
  var status = document.querySelector('#pageStatus');
  status.innerHTML = 'LOADED!';
  
  // start working!
  // ....
}
{% endhighlight %}

__Example 2: detect a resize of the window__

In this example, we're listening to page load and page resize events. When the window is loaded for the first time, or resized, we call the resize() callback function. The window.innerWidth and window.innerHeight properties are used to display the updated size of the window. We also use screen.width and screen.height to display the screen size.
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Example1 of the 'resize' event</title>
</head>
<body>
  <p>This page uses <code>window.onresize = resize;</code> in the JS code  to execute the resize function. Try to change the size of your window now!</p>
 
  <p>Curent page size: <span id="pageSize"></span></p>
  <p>Screen size: <span id="screenSize"></span></p>
</body>
</html>
{% endhighlight %}
{% highlight javascript linenos %}
window.onload = resize;
window.onresize = resize;

function resize(evt) {
  console.log("resize");
  var pageSizeSpan = document.querySelector('#pageSize');
  pageSizeSpan.innerHTML = "Width: " + window.innerWidth + " Height: " + window.innerHeight;
  
 // screen size
var screenSizeSpan = document.querySelector('#screenSize');
  screenSizeSpan.innerHTML = "Width: " + screen.width + " Height: " + screen.height;
  
}
{% endhighlight %}

__Example 3: do something as the page is being scrolled up or down__
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Example of the 'scroll' event</title>
</head>
  <body>
<div class="progress">
  <div>Percentage</div>
    </div>
    <p id="text">Scroll me and the progress bar on the right will show 
  the percentage of scroll. Look also at the CSS
  code (body is 2000px height, for example)...</p>
  </body>
</html>
{% endhighlight %}
{% highlight javascript linenos %}
window.onload = init;

var progressBar;

function init() {
  progressBar = document.querySelector(".progress div");

  window.addEventListener("scroll", function() {
      var max = document.body.scrollHeight - window.innerHeight;
      var percent = (window.pageYOffset / max) * 100;
      progressBar.style.width = percent + "%";
  });
}
{% endhighlight %}

-----

#### Key events: legacy API
##### Dealing with key events

__Introduction__

This has been a bit of a nightmare for years, as different browsers have had different ways of handling key events and key codes (read this if you are fond of JavaScript archeology). Fortunately it's much better today, and we are able to rely on methods that should work on any browser.

When you listen to keyboard related events (keydown, keyup or keypressed), the event parameter passed to the listener function will contain the code of the key that fired the event. Then it is possible to test which key has been pressed or released, like this:
{% highlight javascript linenos %}
window.addEventListener('keydown', function(event) {
   if (event.keyCode === 37) {
     //left arrow was pressed
   }
});
{% endhighlight %}

At line 2, the value "37" is the key code that corresponds to the left arrow. It might be difficult to know which codes represent which real keyboard keys, so here are some handy pointers:

Try key codes with this interactive example: http://www.asquare.net/javascript/tests/KeyCode.html
And find a list of keyCodes (taken from: http://css-tricks.com/snippets/javascript/javascript-keycodes/) below:

##### The different key events

__Event types related to keyboard__

<table>
    <tr>
        <th class="center">keydown</th>
        <td>The event occurs when the user is pressing a key.</td>
    </tr>      
    <tr>
        <th class="center">keyup</th>
        <td>The event occurs when the user releases a key.</td>
    </tr>      
    <tr>
        <th>keypress (now deprecated)</th>
        <td>The event occurs when the user presses a key (up and release).</td>
    </tr>      
</table>

__keyboardEvent properties__

These are legacy properties, still used by many JavaScript code around the world. However, we do not recommend that you use them if you are targeting modern browsers. keyCode has a more powerful/easy to use replacement called code (not yet supported by all browsers), that comes with a new key property (see the following pages of the course).

<table>
    <tr>
        <th>keyCode</th>
        <td>Returns the Unicode character code of the key that triggered the onkeypress ,onkeydown or onkeyup event.</td>
    </tr>
    <tr>
        <th>shiftKey</th>
        <td>Returns whether the "shift" key was pressed when the key event was triggered</td>
    </tr>
    <tr>
        <th>ctrlKey</th>
        <td>Returns whether the "ctrl" key was pressed when the key event was triggered.</td>
    </tr>
    <tr>
        <th>altKey</th>
        <td>Returns whether the "alt" key was pressed when the key event was triggered</td>
    </tr>
</table>
__Example 1: use keyup and keydown on the window object__

__Example 2: see  keypress on the window object__

See the Pen keyup and keydown events on window by W3Cx (@w3devcampus) on CodePen.

__Example 3: detect a combination of keys + modifier keys (shift, ctrl, alt)__

Try to type shift-a for example, ctrl-shift-b or alt-f...

------

#### Key and code properties
##### New recommended properties you can use with modern browsers: key and code

You may have noticed that in some examples from the previous course page about key events, we used event.key in order to display the character that has been typed. The key property has been introduced with a new W3C API called UI Events (or DOM level 3 events), that has been discussed since 2000.  All major browsers have implemented this very practical key property. It comes with another property named code, which is what keyCode should have been. The value of the code property corresponds to a code that is more readable than the value of the old keyCode property.
<ul class="collection">
    <li class="collection-item">
__key:__ when the pressed key is a printable character, you get the character in string form. When the pressed key is not a printable character (for example: Backspace, Control, but also Enter or Tab which actually are printable characters), you get a multi-character descriptive string, like 'Backspace', 'Control', 'Enter', 'Tab'.
    </li>
    <li class="collection-item">
__code:__ Gives you the physical key that was pressed, in string form. This means it’s totally independent of the keyboard layout that is being used. So let’s say the user presses the Q key on a QWERTY keyboard. Then event.code gives you 'KeyQ' while event.key gives you 'q'.
    </li>
</ul>
<p class="red-text">
But when an AZERTY keyboard user presses the A key, he also gets 'KeyQ' as event.code, yet event.key contains 'a'. This happens because the A key on a AZERTY keyboard is at the same location as the Q key on a QWERTY keyboard.
</p>

As for numbers, the top digit bar yields values like 'Digit1', while the numeric pad yields values like 'Numpad1'.

Unfortunately this feature is not yet implemented by Microsoft IE/Edge but support is coming soon to Edge.

__List of codes, the reference keyboard__

There’s no existing keyboard with all the possible keys. That’s why the W3C published a specification just for this. You can read about the existing mechanical layouts around the world, as well as their reference keyboard. For instance here is their reference keyboard for the alphanumerical part:

You can also read this document published by the W3C with explanations about all the possible values for the code property.

Also read through the examples given in the specification. They show very clearly what happens when the user presses various types of keys, both for code and key.

__Example that displays the key and code values with your current keyboard__
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>key and keyCode</title>
    <meta charset="utf-8"/>
  </head>
  <body>
   <p>Press some keys on your keyboard and see the corresponding evt.key and evt.code values. If you are not using a QWERTY keyboard, notice that the values might be different. This is because an 'a' on an AZERTY keyboard, will correspond to the KeyQ code on the reference keyboard.</p>
    <p>  You typed:</p>
  </body>
</html>
{% endhighlight %}
{% highlight javascript linenos %}
window.onkeydown = function(evt) {
  document.body.innerHTML += "key = " + evt.key + "<br>";
 document.body.innerHTML += "code = " + evt.code + "<br><br>";
}
{% endhighlight %}

I encourage you to take a look and get at least an overview of this specification.

Please note that the W3C has also published a sibling specification describing the values for the key property.

Before looking at examples, let's see the current Web browser support for these properties:

As of April 2017:

-----

#### Mouse events
##### Mouse interaction, mouse events

__Introduction__

Important note: Remember that many people do not use the mouse and rely on the keyboard to interact with the Web. This requires keyboard access to all functionality, including form controls, input, and other user interface components (learn more).

Detecting mouse events in a canvas is quite straightforward: you add an event listener to the canvas, and the browser invokes that listener when the event occurs.

The example below is about listening to mouseup and mousedown events (when a user presses or releases any mouse button):
{% highlight javascript linenos %}
canvas.addEventListener('mousedown', function (evt) {
   // do something with the mousedown event
});
 
canvas.addEventListener('mouseup', function (evt) {
   // do something with the mouseup event
});
{% endhighlight %} 
he event received by the listener function will be used for getting the button number or the coordinates of the mouse cursor. Before looking at different examples, let's look at the different event types we can listen to.

##### Mouse events

__Event types related to mouse__
<table class="bordered">
<tr>
    <th>click</th>
    <td>ユーザーが要素の上でクリックするとイベントが発生します（ボタンを押して離す）</td>
</tr>
<tr>
    <th>dblclick</th>
    <td>ユーザーが要素の上でダブルクリックするとイベントが発生します</td>
</tr>
<tr>
    <th>mousedown</th>
    <td>ユーザーがキーを押した時イベントが発生します (up and release)</td>
</tr>
<tr>
    <th>mouseup</th>
    <td>ユーザーが要素の上でマウスボタンを離したときイベントが発生します</td>
</tr>
<tr>
    <th>mousemove</th>
    <td>マウスポインタが要素の上にある間にポインタが動いている時にイベントは発生します</td>
</tr>
<tr>
    <th>mouseenter</th>
    <td>ポインタが要素の上に移動したらイベントが発生します</td>
</tr>
<tr>
    <th>mouseleave</th>
    <td>ポインタが要素の外へ移動したらイベントが発生します</td>
</tr>
<tr>
    <th>mouseover</th>
    <td>ポインタが要素の上、または、その子要素の上に移動した時にイベントが発生します</td>
</tr>
<tr>
    <th>contextmenu</th>
    <td>ユーザーがコンテキストメニュを開くために右クリックをする時にイベントが発生します</td>
</tr>
</table>

__MouseEvent properties__

<table>
    <tr>
        <th>button</th>
        <td>マウス・イベントが起動したとき、どのマウスのボタンが押されたかを返す</td>
    </tr>
    <tr>
        <th>clientX and clientY</th>
        <td>イベントを起動した要素の座標システムに関連したマウス・ポインタの座標を返す。左上角をクリックすると値は常に (0,0) で、スクロール位置からは独立しています、これらの座標は VIEWPORT (ドキュメント　ページの見えている部分)に関連している</td>
    </tr>
    <tr>
        <th>pageX and pageY</th>
        <td>マウス・イベントが起きたときに、ドキュメントに関連するマウス・ポインタの座標を返す。この座標は完全に document/page に相対していて, 常に document/page　の先頭に相対している、それは、スクロール　ダウンしてページの先頭が見えなかったとしても。ページがスクロールしてもマウスは動かないときに、座標の値は変わります。</td>
    </tr>
    <tr>
        <th>screenX and screenY</th>
        <td>イベントが起動したとき画面に関連するマウス・ポインタの座標を返す</td>
    </tr>
    <tr>
        <th>altKey, ctrlKey, shiftKey</th>
        <td>イベントが起きたとき押されたキーが "alt, ctrl and shif" かを返す</td>
    </tr>
    <tr>
        <th>detail</th>
        <td>マウスがクリックされた回数を示す数値を返す</td>
    </tr>
</table>

__Examples__
__Example 1: detect a click on an element__
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>detect mouse clicks on elements</title>
</head>
  <body>
    <button id="button1" onclick="processClick(event)">Button1</button>
    <div id="myDiv" onclick="processClick(event)">Click also on this div!</div>
    <div id="clicks"></div>
  </body>
</html>
{% endhighlight %}

{% highlight javascript linenos %}
window.onclick = processClick;

function processClick(evt) {
  var clicks = document.querySelector('#clicks');

  var target = evt.target.id;
  
  if(target === "") {
    clicks.innerHTML += "You clicked on the window, not on a particular element!<br>";
  } else {
    clicks.innerHTML += "Element clicked id: " + target + "<br>";
{% endhighlight %}

<script>
//window.onclick = click01;

function click01(evt) {
  var clicks = document.querySelector('#clicks');

  var target = evt.target.id;
  
  if(target === "") {
    clicks.innerHTML += "You clicked on the window, not on a particular element!<br>";
  } else {
    clicks.innerHTML += "Element clicked id: " + target + "<br>";
</script><q></q>

<button id="button1" onclick="click01(event)">Button1</button>
<div id="myDiv" onclick="click01(event)">Click also on this div!</div>
<div id="clicks"></div>


{% highlight javascript linenos %}

{% endhighlight %}

{% highlight javascript linenos %}

{% endhighlight %}

{% highlight javascript linenos %}

{% endhighlight %}

{% highlight javascript linenos %}

{% endhighlight %}

{% highlight javascript linenos %}

{% endhighlight %}

{% highlight javascript linenos %}

{% endhighlight %}

{% highlight javascript linenos %}

{% endhighlight %}

#### Form and input field events
##### Forms
__Events related to forms__
<table class="bordered">
    <tr>
        <th>input</th>
        <td>The event occurs when an element gets user input (e.g., a key is typed on an input field, a slider is moved, etc.)</td>
    </tr>
    <tr>
        <th>change</th>
        <td>
        The event occurs when the content of a form element, the selection, or the checked state have changed (for &lt;input>, &lt;select>, and &lt;textarea>). A change event listener on a slider will generate an event when the drag/move ends, while input events will be useful to do something as the slider is being moved.
        </td>
    </tr>
    <tr>
        <th>focus</th>
        <td>
        The event occurs when an element gets focus (e.g., the user clicks in an input field)
        </td>
    </tr>
    <tr>
        <th>blur</th>
        <td>
        The event occurs when an element loses focus (e.g., the user clicks on another element)
        </td>
    </tr>
    <tr>
        <th>select</th>
        <td>
        The event occurs after the user selects some text (for &lt;input> and &lt;textarea>)
        </td>
    </tr>
    <tr>
        <th>submit</th>
        <td>The event occurs when a form is submitted</td>
    </tr>
</table>

__FormEvent properties__

There are no particular properties that need to be mentioned here. Usually, on a form event listener, we check the content of the different input fields, using their value property. See examples in the part of the course that deals with form events.

##### Example 1: validating on the fly as the user types in a text input field

__First variant: using the 'input' event:__
<div class="row">
    <div class="col s12 m8">
    {% highlight javascript linenos %}
function validateName(field) {
  // this is the input field text content
  var name = field.value;  
  
  // get the output div
  var output = document.querySelector('#nameTyped');
  // display the value typed in the div 
  output.innerHTML = "Valid name: " + name;
  
  // You can do validation here, set the input field to
  // invalid is the name contains forbidden characters
  // or is too short
  // for example, let's forbid names with length < 5 chars
  if(name.length < 5) {
    output.innerHTML = "This name is too short (at least 5 chars)";
  }
}    
    {% endhighlight %}
    </div>
    <div class="col s12 m4">
        <h3>Simple input field validation using the 'input' event</h3>
        <p>Just type a name in the input field and see what happens!</p>
        <label>
            <span>Name (required):</span>
            <input type="text" 
                    name="nom" 
                    maxlength="32" 
                    required
               oninput = "validateName(this)">
        </label>
        <p>
            <span id="nameTyped"></span>
        </p>  
    </div>

</div>


__Second variant: using the 'keyup' event:__
<div class="row">
    <div class="col s12 m8">
    {% highlight javascript linenos %}
function validateName(evt) {
  // this is the input field text content
  var key = evt.key;  
  
  // get the output div
  var output = document.querySelector('#keyTyped');
  // display the value typed in the div 
  output.innerHTML = "Valid key: " + key;
  
  // You can do validation here, set the input field to
  // invalid is the name contains forbidden characters
  // or is too short
  // for example, let's forbid names with length < 5 chars
  if(key === "!") {
    output.innerHTML = "This key is forbidden!";
    // remove the forbodden char
    // current typed value
    var name = evt.target.value;
    // we use the substring JavaScript function
    // to remove the last character
    // first parameter = start index
    // second = last index
    evt.target.value = name.substring(0, name.length-1);
  }
}    
    {% endhighlight %}
    </div>
    <div class="col s12 m4">
        <h3>Simple input field validation using the 'input' event</h3>
        <p>Just type a name in the input field and see what happens! <span style="color:red"> TRY TO TYPE A "!" too</span></p>
        <label>
            <span>Name (required):</span>
            <input type="text" 
                   name="nom" 
                   maxlength="32" 
                   required
                   onkeyup = "validateName2(event)">
        </label>
        <p>
            <span id="keyTyped"></span>
        </p>  
    </div>
</div>
Note that HTML5 forms and the multiple facets of form and input field validation are covered in depth in the HTML5 fundamentals course, which dedicates a whole week to this topic.

##### Example 2: do something while a slider is being moved
<div class="row">
    <div class="col s12 m8">
        {% highlight javascript linenos %}
        function doSomething(evt) {
        // this is the slider value
        var val = evt.target.value;  
  
        // get the output div
        var output = document.querySelector('#sliderValue');
        // display the value typed in the div 
        output.innerHTML = "Value selected: " + val;
        }
        {% endhighlight %}
   </div>
   <div class="col s12 m4">
       <h3>Simple <code>&lt;input type=range&gt;</code> field validation using the 'input' event</h3>
       <p>Just move the slider</p>
       <label>
           <input type="range" 
                  min="1"
                  max="12"
                  step="0.1"
                 oninput = "doSomething(event)">   
        </label>
        <p>
        <span id="sliderValue"></span>
        </p>  
    </div>
</div>

##### Example 3: detect value changes in a number input field
<div class="row">
    <div class="col s12 m8">
    {% highlight javascript linenos %}
function doSomething2(evt) {
  // this is the slider value
  var val = evt.target.value;  
  
  // get the output div
  var output = document.querySelector('#numberValue');
  // display the value typed in the div 
  output.innerHTML = "Value selected: " + val;
}
    {% endhighlight %}
    </div>
    <div class="col s12 m4">
        <h3>Simple <code>&lt;input type=number&gt;</code> field validation using the 'input' event</h3>
        <p>type a number or use the small vertical arrows</p>
        <label>
            Type a number: 
            <input type="number" 
                    min="1"
                    max="12"
                    step="0.1"
                    oninput = "doSomething2(event)">
        </label>
        <p>
        <span id="numberValue"></span>
        </p>
    </div>
</div>

##### Example 4: choose a color and do something
<div class="row">
    <div class="col s12 m8">
        {% highlight javascript linenos %}
        function changePageBackgroundColor(color) {
            var div = document.querySelector("#backgroundColorDiv");
            div.style.backgroundColor = color;  
            // get the output div
            var output = document.querySelector('#choosedColor');
            // display the value typed in the div 
            output.innerHTML = "Color selected: " + color;
        }
        {% endhighlight %}
    </div>
    <div id="backgroundColorDiv" class="col s12 m4">
        <h3>Simple <code>&lt;input type=color&gt;</code> use</h3>
        <p>Pick a color to change the background color of the page</p>
        <label>
            <input type="color" 
                    onchange = "changePageBackgroundColor(this.value)">
            <!-- we could have used oninput= in the previous line -->
        </label>
        <p>
        <span id="choosedColor"></span>
        </p>  
    </div>
</div>

<script>
function validateName(field) {
 // this is the input field text content
 var name = field.value;  
  
 // get the output div
 var output = document.querySelector('#nameTyped');

 // display the value typed in the div 
 output.innerHTML = "Valid name: " + name;
  
// You can do validation here, set the input field to
// invalid is the name contains forbidden characters
// or is too short
// for example, let's forbid names with length < 5 chars
    if(name.length < 5) {
        output.innerHTML = "This name is too short (at least 5 chars)";
    }
}    
function validateName2(evt) {
  /* this is the input field text content */
  var key = evt.key;  
  
  // get the output div
  var output = document.querySelector('#keyTyped');
  // display the value typed in the div 
  output.innerHTML = "Valid key: " + key;
  
  // You can do validation here, set the input field to
  // invalid is the name contains forbidden characters
  // or is too short
  // for example, let's forbid names with length < 5 chars
  if(key === "!") {
    output.innerHTML = "This key is forbidden!";
    // remove the forbodden char
    // current typed value
    var name = evt.target.value;
    // we use the substring JavaScript function
    // to remove the last character
    // first parameter = start index
    // second = last index
    evt.target.value = name.substring(0, name.length-1);
  }
}
function doSomething(evt) {
  // this is the slider value
  var val = evt.target.value;  
  
  // get the output div
  var output = document.querySelector('#sliderValue');
  // display the value typed in the div 
  output.innerHTML = "Value selected: " + val;
}

function doSomething2(evt) {
  // this is the slider value
  var val = evt.target.value;  
  
  // get the output div
  var output = document.querySelector('#numberValue');
  // display the value typed in the div 
  output.innerHTML = "Value selected: " + val;
}

function changePageBackgroundColor(color) {
    var div = document.querySelector("#backgroundColorDiv");
    div.style.backgroundColor = color;  
  /* get the output div */
  var output = document.querySelector('#choosedColor');
  /* display the value typed in the div */
  output.innerHTML = "Color selected: " + color;
}
</script>
