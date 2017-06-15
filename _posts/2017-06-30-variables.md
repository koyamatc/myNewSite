---
layout: post
title: JS variables and values 
date: 2017-06-14 00:00:00 +900
categories: post edx javascript
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

The next section of the course talks about "operators" but there is one that is better introduced in this section: the "typeof" operator, that is useful for knowing the type of a variable depending in its value (possible values: number, string, boolean, undefined, object, or function)

We will use it in lots of examples in the next three sections.

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
    The value Infinity (or +Infinity) represents all number values greater than 1.79769313486231570e+308 and -Infinity represents values smaller than -1.79769313486231570e+308.
</p>
{% highlight javascript linenos %}
18/8 
>Infinity

0/0
>NaN
{% endhighlight %}

----------------

#### JS operators and expressions

##### JavaScript operators and expressions

__Introduction__

An expression is a small piece of code used to produce a value.

For example, the expression 3 + 5 produces the value 8, and the value 11 alone is also an expression. Within an expression, we can find values, variables, operators, and expressions. The first two have been already described above, so all that's left are operators.

In JavaScript, an operator can be unary or binary (plus one ternary operator). A unary operator is applied to one expression. It can be prefixed or suffixed.


__Unary operator example: __

{% highlight javascript linenos %}
typeof 'world';
{% endhighlight %}

A binary operator is applied to two different expressions, and is both prefixed and suffixed.

__Binary operator example:__

{% highlight javascript linenos %}
var x = 45 / 32;
{% endhighlight %}

The division operator is binary.


Within an expression, we can also use parentheses to force the execution of the expression inside. Parentheses can be used to indicate precedence.

For example, this is an expression: (3 + 2). And the expression (3 + 2) * 4, which equals 20, depends on the expression within the parentheses.

In JavaScript, expressions can evaluate to four types, which are: numbers, strings, booleans, and objects. For example, an expression with the operator - will evaluate to a number. But an expression with the operator + can evaluate to a number or a string (for addition or concatenation).

#### Number operators
The following arithmetic operators are binary:

+, - , /, *, % (modulo)

Example: 7 % 5 equals 2, which is the remainder of the integer division of 7 by 5

Note: (7 / 5 = 5 * 1 + 2 ).


And there are also unary operators:

++, --, - (the opposite of a number)

++ and -- operators increment or decrement the value of a variable. They can be both prefixed or suffixed, which have different effects:

Suffixed ++ adds one to the value of the variable, then returns the new value.
Prefixed ++ also adds one to the value, but returns the old value. Both of these must be used with variables.
Examples typed in the devtool console of a browser:

__Short variant that mixes assignment and execution of an operator__

Binary operators can be used with a shorter syntax when we want to assign the resulting value to a variable at the same time:

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

To declare or manipulate strings you must write them with single quotes ' or double quotes " around them. Single quotes or double quotes are both accepted, and there is no difference between them in JavaScript. However, the community prefers to use single quote for string - this is not a convention, but a recommendation.

And finally, you cannot start a string with a single and end with a double quotes, or the opposite.

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

There are many reasons to use simple quotes when possible:
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

The operator (+) used with strings is called the concatenation operator, and it allows you to concatenate strings.
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
The shorthand assignment operator (+=) can also be used to concatenate strings.

//the assignment operator (+=)
var s1 = 'one';
var s2 = 'two';
s1+= s2; // or directly s1+='two'
s1;
//returns 'onetwo'
{% endhighlight %}

__The method concat()__

Another way to concatenate strings is the method concat().

{% highlight javascript linenos %}
//the 'concat' method
var s1 = 'one';
var s2 ='two';
var s = s1.concat(s2);
s;
//returns 'onetwo'
{% endhighlight %}

All the methods shown above can be used with a variable number of arguments:

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

A String number in an arithmetic expression is converted to Number, unless the formula is a pure addition.

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

There is trick for converting a Number into a String: we concatenate with an empty string, at the beginning of expression (type this in the devtools):

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

The \ is useful for "escaping" special characters. Here are a few examples:

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