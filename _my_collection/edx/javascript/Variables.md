---
layout: post
title: JS variables and values 
date: 2017-06-16 00:00:00 +900
subject: javascript
description:
  edx's course by W3C.
  Introductory course designed to understand 
  the basic concepts of JavaScript.  
---

-------
#### Variables

##### Introduction
__Variable(変数)__ ： 変数は、値（value）を記憶するために、プログラム言語が使う概念です。

変数に名前(identifier)を与え、その名前を使って値を保存し、その値はその名前を使って再利用することができる。

##### Create(declaring) a variable
変数を宣言するには、　キーワード __var__ または __let__ を使い、そのあとに名前を与えます
{% highlight javascript linenos %}
var myVar;
let x;
{% endhighlight %}

変数名の最初の文字は "$", "_", "a" to "z", "A" to "Z" でなくてはならない。

その他の場所は、上記も文字または数字です。

変数名は大文字、小文字が区別されます（case sensitive） ので "myVar" と "MyVar" は異なる変数です。

JavaScriptの予約語(reserved words)は使用できません：　boolean, if, delete,function, var etc

##### Give a value to a variable (assign a value to a variable)
値は宣言された変数に割り当てることができます、また直接宣言内で割り当てることもできます。

割り当てる時は 等号"="(assignment operator)を使います。
{% highlight javascript linenos %}
var myValue;
myValue = 78;
 
// With the ES2015 syntax.
let myNumber = 1.34;
{% endhighlight %} 

複数の変数を宣言することもできます
{% highlight javascript linenos %}
var myNumber1, myNumber2 = 34, myNumber3;
 
//With the ES2015 syntax
let x = 1, y = 3, z = 12;
{% endhighlight %}

##### Name conventions for variables
Javascriptコミュニティでは、命名規則を設けています

__&#1776; The camelCase notation is preferred: mySpaceShip, sumOfAllGrades, etc.__

__&#1776; For a variable, the first letter is lowercase and each first letter of each word is capitalized. Example: var myVariableName__
{% highlight javascript linenos %}
var myModel;
// ES2015 syntax
let michelBuffaAge = 51;
{% endhighlight %}

##### Constants（定数）
定数は設定された値が変更できない変数です。

命名規則は、　アンダースコアとともに大文字を使います

__Example: var TIME_LIMIT = 50;__

JavaScript 5 では、定数は通常の変数として "var" キーワードを使って 宣言します、しかし、
JavaScript インタープリタは、割り当てられた値が変更されてもエラーとなりません；

ES2015/2016 では、　キーワード "const" を使うことを推奨しています。これで、値を変更しようとするとエラーが起きます。

{% highlight javascript linenos %}
var TIME_LIMIT;
 
// ES2015 Syntax
const MAX_GRADE = 20;
{% endhighlight %}

##### Summary
{% highlight javascript linenos %}
let a;
let thisIsAVariable;
let and_this_too; // but does not respect the usual naming convention
let mix12three;
// invalid!
let 2three4five; // can't start with a digit!
 
let a = 1
let v1, v2, v3 = 'hello', v4 = 4, v5;
 
// Beware with lowercase / uppercase
let case_matters = 'lower';
let CASE_MATTERS = 'upper';
{% endhighlight %}

#### Scope of vaiables
##### 1 - JavaScript 5 / ES5 scopes, with the var keyword
<p class="red-text text-darken-3">
JavaScript 5 / ES5 には 変数宣言に "var" キーワードがあります
</p>
<p class="red-text text-darken-3">
JavaScript 5 / ES5 には 2つのスコープ: 1) グローバル変数宣言のグローバル・スコープ(global scope)、　
と 2) 関数内でローカルに使う変数宣言の関数スコープ(function scope)があります。
</p>
さらに言うと、関数内のローカル変数は、同じ名前のグローバル変数が在ってもかくしてしまいます。

__1.1 - Global scope / global variable__

グローバル変数は関数の外側で宣言された変数で、コードのどこででも使うことができます。
{% highlight javascrit linenos %}
var x = 1;

// global scope
function f1() {
  console.log(x); // displays '1' in devtool console
}

f1();
{% endhighlight %}

__1.2 - Local scope / local variable (also called function scope)__

関数内でキーワード"var"で宣言された変数は、その関数に対してローカルであるといいます。
つまり、同じ名前のグローバル変数を隠してしまいます。

関数内で宣言された変数を、グローバル変数に対してローカル変数といいます。
JavaScript 5 では、 ローカル変数はその関数に対してローカルで、その関数内のどこででも使えます。

多くのプログラミング言語には、ローカル変数があり、変数宣言のある"{", "}"の間のブロック内に制限されています。　
このような変数をブロック変数(block variable)と呼びます。
これは、キーワード "let" で宣言された変数の場合です。

{% highlight javascript linenos %}
var a = 1; // global variable

function f() {
  if (true) {
    // this is a block, defined by "{" and "}"
    var a = 4; // this "a" is NOT local to the block
  }

  alert(a); // alerts '4', not the global value of '1'
            // a variable declared with "var" in a 
            // function is local to the function!
            // and can be used anywhere in the function
            // so here, the local a masks the global a!
}
{% endhighlight %}

{% highlight javascript linenos %}
var x = 1; // global variable, could be "masked" by local variables

function f2(x) {
  console.log(x); // displays the given argument  
                  // not the global value of x (value = 1)
                  // the x parameter acts as a variable
                  // local to the function, that "masks"
                  // the global variable x
}

f2(3); // will display 3

// local scope again
function f3() {
  var x = 4;      // local variable, scope = the function
  console.log(x); // displays '4'. The local variable x
                  // "masks" the global variable x
}

f3(); // will display '4' 
{% endhighlight %}

__1.3 Never declare a variable without the keyword var!__

JavaScript は、時としてとても寛容な言語と言われます。　とても見つけ辛いが単純なエラーを犯してしまいます。
そのような一つが、　ローカル変数を宣言する際に　"var" キーワードをつけ忘れたときです。

JavaScript 5 / ES5　では、 "var" キーワード無しで関数内で宣言された変数は、　グローバル変数となります。

Better: ターゲットとするブラウザが JavaScript 6 またはそれ以上をサポートするなら　キーワード "let"　を使いましょう

{% highlight javascript linenos %}
// local scope again, but mistake! We forgot var
// when declaring the local variable x
// -> same as declaring a global function var x = 3; 
function f3() {
  x = 3;      // mistake, we forgot "var"
              // x is no more a local variable, 
              // x is now global!
  var y = 5;  // real local variable
  console.log(x); // displays '3'. 
}

function f4() {
  console.log(x); // will display 3 even if there is no
                  // global declaration var x outside of 
                  // functions. The error in the declaration of x
                  // in f3 has made x global
}

function f5() {
  console.log(y); // error, no global variable y
}

f3(); // displays 3
f4(); // displays 3, x declared without var in f3
      // is considered global, and usable in f4

f5(); // error, y is a variable local to the f3 function
{% endhighlight %}

##### 2 - JavaScript 6 / ES6 scopes, with the let keyword
JavaScript 6 / ES6 には、　変数宣言用に "let", 定数宣言用に "const" があります

JavaScript 6 / ES6 には2種類のスコープ: 1) グローバル・スコープ、 2) ブロック・スコープ　があります

付け加えると、　ブロック内のローカル変数は、　このブロックを含むより外側のブロック・スコープ（グローバル、ほかのブロック）で宣言された変数を隠します

{% highlight javascript linenos %}
var a = 1; // global variable

function f() {
  if (true) {
    // this is a block, defined by { and }
    let a = 4; // this "a" IS LOCAL TO THE BLOCK
  }

  alert(a); // alerts '1', a is the global variable
            // a variable declared with "let" in a 
            // block is local to the block!
            // and is not defined anywhere else
            // The a defined in the if block is not
            // visible here, so the a we have here
            // is the "global" a!
}
{% endhighlight %}

#### JS data types

__What kind of values can we assign to a variable?__

__1. What we call "primitive data types": for example a number, a string, etc. ex: 
var x = 3; var name = "Buffa";__

__2.Objects (everything that is not a  "primitive data type" is an object): 
var michel = {firstName:'Michel', lastName:'Buffa'};__

&#1776;There is a set of "predefined objects" in JavaScript (arrays, functions, etc). 

__JavaScript has a small set of primitive data types__

__&#1776;number__: 1,2,105,3.14 ...

__&#1776;string__: 'a', "one", 'two' , 'World Wide Web' ...

__&#1776;boolean__: true / false

__&#1776;undefined__: absent or unknown value

__&#1776;null__: special keyword, meaning no value or empty. The difference from undefined is 
that when a variable is null, it is still defined.

上記のリストに無い物は　オブジェクトです。

__Knowing the type of a JavaScript variable: the typeof operator__

演算子"operators" についてです。ここで役に立つのが "typeof" operatorで、変数の型を知ることができます(possible values: number, string, boolean, undefined, object, or function)

#### Numbers
<ul class="collection">
  <li class="collection-item"><strong>Integer:</strong> 1, 4, 274929</li>
  <li class="collection-item"><strong>Signed integer:</strong> -17</li>
  <li class="collection-item"><strong>Decimal:</strong> 3.46, -466.8770</li>
  <li class="collection-item"><strong>Scientific notation:</strong> 3.46e4, 5.3e+6, 5344000e-5</li>
  <li class="collection-item"><strong>Octal:</strong> 010</li>
  <li class="collection-item"><strong>Hexadecimal:</strong>  0xF3</li>
  <li class="collection-item"><strong>Special values:</strong>
    <ul class="collection">
      <li class="collection-item"><strong>+Infinity</strong></li>
      <li class="collection-item"><strong>-Infinity</strong></li>
      <li class="collection-item"><strong>NaN (Not a Number)</strong></li>  
    </ul>
  </li>
</ul>
<p>
    値 Infinity (or +Infinity) は　1.79769313486231570e+308 より大きいすべての数値を表します、
    そして -Infinity は -1.79769313486231570e+308　より小さいすべての数値を表します.
</p>
{% highlight javascript linenos %}
18/8 
>Infinity

0/0
>NaN
{% endhighlight %}

----------------

#### JS operators and expressions

__Introduction__

式(expression) は、値を得るために使われる短いコードです。

例えば 3 + 5 という式は　8　という値を生成します、そして　値　11　だけでも　式です。
式の中には、値、変数、演算子、式を含めることができます。
最初の2つはすでに上記で紹介しています。残るは演算子です。

JavaScript　では、演算子は　unary　または binary (plus one ３つからなるternary operator).

unary 演算子は 1つの式に適用されます. 式は前に置くか、後に置くかできます。

__Unary operator example: __

{% highlight javascript linenos %}
typeof 'world';
{% endhighlight %}

Binary 演算子は 2つの異なる式に適用します、 式は前後に配置されます

__Binary operator example:__

{% highlight javascript linenos %}
var x = 45 / 32;
{% endhighlight %}

除算演算子は binary.

JavaScriptでは、 式を4つの型に評価します　: numbers, strings, booleans, and objects.
例えば 演算子 - のある式は　数値型と判定されますが、演算子 + がある式は　数値型　または　文字列型　に判定できます。

#### Number operators
次の算術演算子は binary:

+, - , /, *, % (modulo)

Example: 7 % 5 equals 2, which is the remainder of the integer division of 7 by 5

Note: (7 / 5 = 5 * 1 + 2 ).

unary operators:

++, --, - (the opposite of a number)

++ と -- 演算子は 変数の値を　加算 または 減算 します. 演算子は前にも後にも置くことができますが
それぞれで異なる効果を与えます:

前につけた ++ は変数の値に　１　を加えます、そして新しい値となります。

後につけた ++ も変数に　1 を加えますが、前の値を返します。 

どちらも変数とともに使います

__Short variant that mixes assignment and execution of an operator__

Binary 演算子は、値を計算しながら同時に変数に割り当てるときに、短縮文法を使えます：

Example (try them in the devtool console of your browser)
{% highlight javascript linenos %}
> var a = 10;
> a *= 5; // equivalent to a = a * 5;
> console.log(a);
> 50
{% endhighlight %}

Other examples:
{% highlight javascript linenos %}
> var a = 5;
undefined
 
> a += 3 // equivalent to a = a + 3;
8
 
> a -= 2; // equivalent to a = a - 2;
6
 
> a *= 10; // equivalent to a = a * 10;
60
 
> a /= 5; // equivalent to a = a / 5;
12
 
> a %= 2; // equivalent to a = a % 2;
0
 
> // this is normal, as a is even
{% endhighlight %}

--------------

#### Strings (part 1)

__Introduction__

文字列型を宣言、または操作するためには、シングル・クォート ' または　ダブル・クォート " で文字列を挟みます。　シングルもダブルもどちらも受け付けられますし、JavaScriptでは違いはありません。
しかしながら、コミュニティは、文字列にはシングル・クォートがよりよいとしています
　-　これは規則ではなく、推奨しています。 
 
最後に、シングル・クォートではじめ、終わりをダブル・クォートにする、またはその逆はできません。

{% highlight javascrit linenos %}
> "Hello World";
"Hello World"
 
> "JavaScript Course";
"JavaScript Course"
 
> 'With simple quotes';
"With simple quotes"
 
> "Do not mix double and simple quotes'; // here we opened the string with double and closed with simple quotes
VM24763:1 Uncaught SyntaxError: Invalid or unexpected token
{% endhighlight %}

可能なら、シングル・クォートを使う理由
<ul class="collection">
  <li class="collection-item">
    1. Double quotes are used in HTML
  </li>
  <li class="collection-item">
    2. You must hold the Shift key to type "
  </li> 
  <li class="collection-item">
    3. Single quotes are easier to read and to type
  </li> 
  <li class="collection-item">
    4. To output HTML in JavaScript, single quotes are more useful
  </li>
</ul>

-------

#### String operators

__The concatenation operator (+)__

文字列とともに使う演算子 (+) は、結合演算子と呼ばれて, 文字列の結合を行います：
{% highlight javascript linenos %}
//the operator (+)
var s1 = 'one';
var s2= 'two';
var s = s1 + s2;
s;
// returns 'onetwo'
typeof s;
//'string'
{% endhighlight %}

__The shorthand assignment operator (+=)__

{% highlight javascript linenos %}
短縮形の割当演算子 (+=) 文字列の結合に使えます。

//the assignment operator (+=)
var s1 = 'one';
var s2 = 'two';
s1+= s2; // or directly s1+='two'
s1;
//returns 'onetwo'
{% endhighlight %}

__The method concat()__

文字列を結合するもう一つの方法は、concat()　メソッドを使います

{% highlight javascript linenos %}
//the 'concat' method
var s1 = 'one';
var s2 ='two';
var s = s1.concat(s2);
s;
//returns 'onetwo'
{% endhighlight %}

上記のメソッドでは、引数の数を幾つもとることができます

{% highlight javascript linenos %}
var s1 = 'Hello';
s1 = s1 + ' World' + ' JavaScript';
var s2 = 'Hello';
s2+= ' World' + ' JavaScript';
var s3 = 'Hello';
s3.concat(' World' , ' JavaScript' );
//s1,s2 and s3 return 'Hello World JavaScript'
{% endhighlight %}

__Converting strings__

算術式が単純な加算ではなければ、式の中の文字列型の数値は、数値型に変換されます 

{% highlight javascript linenos %}
> var s = '1'; s = 3 * s; typeof s;
"number"
 
> s;
3
 
> var s = '1'; s++; typeof s;
"number"
 
> s;
2
 
> var s = "100"; typeof s;
"string"
 
> s = s * 1;
100
 
> typeof s;
"number"
 
> var d = "101 dalmatians";
undefined
 
> d * 1;
NaN
{% endhighlight %}

__How to convert a Number into a String__

数値型を文字列型に変換するトリックがあります：
空の文字列を式の先頭に付けます

{% highlight javascript linenos %}
var n = 1;
typeof n;
// returns "number"
n = "" + n;
// returns "1"
typeof n;
// returns "string"
{% endhighlight %}

__Special character: the "\"__

\ は特別な文字をエスケープするために役立ちます
{% highlight javascript linenos %}
var s = 'I don\'t know';
var s = "I don\'t know"; // here the \ is useless
var s = "I don't know";  // same result as previous line
var s = '"Hello", he said.'; // ok, double quotes inside single one will be displayed
var s = "\"Hello\", he said."; // double quotes inside double quotes need to be escaped
{% endhighlight %}

__Escaping the escape! Use a double "\"__

{% highlight javascript linenos %}
var s = "1\\2"; s;
// returns "1\2"
{% endhighlight %}

__Special characters starting with "\"__

__"\n" for "next line":__

{% highlight javascript linenos %}
var s = '\n1\n2\n3\n';
s
// returns "
1
2
3
"
{% endhighlight %}

__"\r" for "carriage return":__

{% highlight javascript linenos %}
var s = '1\r2';
var s = '1\n\r2';
var s = '1\r\n2';
// the three previous lines give :
"1
2"
{% endhighlight %}

__"\t" for "insert a tabulation":__

{% highlight javascript linenos %}
var s = "1\t2"
// s is equal to
"1 2"
{% endhighlight %}

--------------

#### Objects (part1)

__Introduction__

<ul class="collectio">
  <li class="collection-item">
  オブジェクトは"{" と "}"を使い宣言されます、このようにです
   var p = {givenName:'Michel', familyName: 'Buffa'}, 
   givenName と familyName は　プロパティ　と呼ばれます、
   Michel と Buffa は、それぞれの値です
  </li>
  <li class="collection-item">
  "." 演算子を使いプロパティやメソッドにアクセスします 例 : daysOfTheWeek.length (arrays are objects too - special ones, but objects), or document.body or window.innerWidth (try typing that in the devtool console). 多くの定義済みオブジェクトが JavaScriptにはあります (window, document, navigator, etc.). すでに console.log(...)を使いました, 実は console は、定義済みの JavaScript オブジェクトです. オブジェクト var p = {givenName:'Michel', familyName: 'Buffa'}を使って, 同様にプロパティにアクセスできます, with: p.givenName と p.familyName.
  </li>
</ul>

__Take a look at some common objects and properties!__

In devtool console
{% highlight javascript linenos%}
> window.innerHeight
217
> window.innerWidth
1704
> navigator.vendor
"Google Inc."
{% endhighlight %}

__You can define your own objects__

自身でJavaScript オブジェクトを作る方法はいろいろあります. まずは簡単な方法, "singleton objects", 今知っておくべきことは、オブジェクトは値を持ったプロパティを持つことができるということです
{% highlight javascript linenos %}
var student1 = {
    fullName:'John Doe',
    age: 23,
    city: 'New York',
    ssn: "11-22-33-44" // no comma at the end of the last property
}                      // declaration
{% endhighlight %}
オブジェクトのプロパティにアクセスする:  "."　演算子を使う
{% highlight javascript linenos %}
> student1.ssn
"11-22-33-44"
> student1.age
23
> student1
[object Object] {
    age: 23,
    city: "New York",
    fullName: "John Doe",
    ssn: "11-22-33-44"
{% endhighlight %}

-------

#### Arrays (part 1)

__Definition: arrays are containers with indexes__

Arrays（配列型） は特別はデータ型です. 配列の宣言に角括弧を使います:
{% highlight javascript linenos %}
var daysOfWeek = [];
{% endhighlight %}

{% highlight javascript linenos %}
var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var gradesInMaths = [12, 7, 14, 18, 9, 11];
{% endhighlight %}
配列の中の要素にはインデクスを使ってアクセスします

配列の各要素はインデクスを持っています。最初の要素のインデックスは 0　です, 2番目の要素のインデックスは 1 etc.

要素にアクセスするためには, 配列変数と "[" に続けてインデックスの値、それに続けて "]"

{% highlight javascript linenos %}
> var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
undefined
> daysOfWeek[0]
"Monday"
> daysOfWeek[1]
"Tuesday"
> daysOfWeek[2]
"Wednesday"
> daysOfWeek.length
7
{% endhighlight %}

__Use the length property of an array to know its length__

{% highlight javascript linenos %}
> var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday', 'Sunday'];
undefined
> daysOfWeek.length
7
{% endhighlight %}
実際, 1週間に7日あります、そして、 配列 daysOfWeek には　7つの要素があります, 
インデックスは 0　から daysOfWeek.length -1　までです

新しいインデックスを使って配列に要素を追加できます

配列の最後に新しい要素を加えるには、配列の長さと同じインデックスを使います
{% highlight javascript linenos %}
> var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
undefined
> daysOfWeek.length
6
> daysOfWeek[6]
undefined
// NO ELEMENT AT INDEX 6 in an array of 6 elements, first index is 0 // last 6-1 = 5
> daysOfWeek[6] = 'Sunday'
"Sunday"
> daysOfWeek.length
7
// Sunday, the 7th day of week is at index 6 !
{% endhighlight %}

__Arrays are JavaScript objects!__

今は重要ではないけど、見てください
{% highlight javascript linenos %}
> var a = [];
> typeof a;
"object"
> var a = [1,2,3];
> a
[1, 2, 3]
> a[0]
1
> a[1]
2
{% endhighlight %}
これは, daysOfWeek.length　と書いた時には, 配列オブジェクトを使っているのと
配列オブジェクトのプロパティ length を使っているのです

__Add an element at the end of an array using the push method__

配列はオブジェクトなので、もっといろいろなことができます。
いまは、最も役に立つ機能を見てみます
{% highlight javascript linenos %}
> var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
undefined
> daysOfWeek.length
6
> daysOfWeek.push('Sunday');
7
> daysOfWeek
["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
> daysOfWeek.length
7
{% endhighlight %}

__Arrays and Strings__

文字列は文字の配列です

Consequence:

<ul class="collection">
  <li class="collection-item">
    1. They are objects too! 
  </li>
  <li class="collection-item">
    2. They have a length property,
  </li>
  <li class="collection-item">
    3. Each individual character can be accessed using an index.
  </li>
</ul>

Examples:
{% highlight javascript linenos %}
> var s = 'one';
> s[0]
"o"
> s[1];
"n"
> s[2];
"e"
> s.length;
3
{% endhighlight %}

#### Functions (part 1)

__Definition of a function__

関数はコードをグループにしたもので、名前をつけて、その名前で関数を呼び出すことで関数を実行できます

関数は値を返します: 
<ul class="collection">
  <li class="collection-item">
  明示的に, キーワード return に続けた値
  </li>
  <li class="collection-item">
  暗黙的に, この場合は　return 値　は undefined.
  </li>
</ul>

__Declaring a function__

{% highlight javascript linenos %}
function sum(a, b) {
    var c = a + b;
    return c;
}
{% endhighlight %}

__Calling a function__

{% highlight javascript linenos %}
var result = sum(1, 2);
//result is equal to 3
console.log(result)
> 3
{% endhighlight %}

__Function parameters__

呼び出し中に引数が取り除かれたら、 JavaScript は　undefined　の値を与えます:

{% highlight javascript linenos %}
> sum(1)
NaN
{% endhighlight %}

__Functions with a variable number of parameters__

"argument"　という名の配列は自動的に関数に作られます、 そこには関数のすべての引数が入っています:
{% highlight javascrit linenos %}
function f() {
   return arguments;
}
...
f();
// returns []
...
f( 1, 2, 3, 4, true, 'Michel Buffa');
// returns [1, 2, 3, 4, true, "Michel Buffa"]
{% endhighlight %}

__Example of the sum with a variable number of arguments__

{% highlight javascript linenos %}
function newSum() {
    var i, res = 0;
    var numberOfParameters = arguments.length;
    for (i = 0; i < numberOfParameters; i++) {
       res += arguments[i];
    }
    return res;
}
...
>>> newSum(1, 1, 1);
3
>>> newSum(1, 2, 3, 4);
10
{% endhighlight %}