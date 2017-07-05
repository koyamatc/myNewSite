---
layout: post
title: Objects (Part4)
date: 2017-07-04 00:00:00 +900
subject: javascript
description:
  edx's course by W3C.
  Introductory course designed to understand
  the basic concepts of JavaScript.  
---

-------
#### References and objects
最初に”参照”について定義します。
メモリにオブジェクトの実際のアドレスを持っているポインタ変数とは異なり、
参照変数は変数の別名です。
参照変数を変更すれば、元の変数も変更されるという意味です。
なぜならば、二つの変数は同じオブジェクトを指し示しているからです。

変数を定義すると (var x = 10; or let name = "Michel"; or let courseAuthor = {firstName:'Michel', lastName:'Buffa')、 :

<ul class="collection">
  <li class="collection-item">
  値が、基本的なもの(number, string, or boolean)基本的なものならば、 その変数はその値を直接持っています。
  </li>
  <li class="collection-item">
  値がオブジェクトの場合、変数が持つものは、オブジェクトのメモリ上のアドレスです。
  この変数はオブジェクトを指している、またはオブジェクトを参照しているといいます。
  変数にアクセスすることは、自動的に参照先が分かり、
  それは、変数の値は、参照されたオブジェクトであるという意味になります。
  </li>
</ul>

Examples:
{% highlight javascript linenos %}
// Defining two variables
var x = 2; // the variable x contains the primitive datum 2
var y = { a: 2 } // The variable y references the object {a: 2}

// "Copying" two variables
var x2 = x;
var y2 = y;
var y3 = y;

// Modifying copied variables
x2 = 3;
y2 = { a: 3 };

// Check
x; // 2 <- x is not modified because it contains a primitive value
y; // { a: 2 } <- y is not modified because y2 does not point to same object
y3.a = 4;
y; // { a: 4 } <- The object referenced by "y" and "y3" is modified
{% endhighlight %}

もちろん、これらのルールはオブジェクトのプロパティにも適用されます。

Example:
{% highlight javascript linenos %}
var driver = {
    name: 'Jean'
};
var car = {
    color: 'red',
    driver: driver
};
driver.name = 'Albert';
car.driver.name; // 'Albert'
{% endhighlight %}

JavaScript is a "pass by value" language, unlike some other languages, which are "pass by reference" languages. 変数を関数の引数として受け渡すと、変数の値は引数にコピーされることを意味します。

Example:
{% highlight Javascript linenos %}
var x = 2;
function sum(a, b) {
    a = a + b;
    return a;
}
sum(x, 3); // returns 5
x; // 2 <- but x equals 2
{% endhighlight %}

オブジェクトを扱うときは、オブジェクトの参照が引数にコピーされます。
参照先のオブジェクトを修正できるという意味です。
しかし、例えば新しオブジェクトに割り当てることで参照先を変えてしまうと、元の変数は変更されません。
もう違うオブジェクトを指しているからです。

Example 1:
{% highlight javascript linenos %}
var obj = { x: 2 }
function add(a, b) {
a.x += b;
}
add(obj, 3);
obj.x; // 5 <- The referenced object is modified
{% endhighlight %}

Example 2:
{% highlight javascript linenos %}
var obj = { x: 2 };
function addAndSet(a, b) {
    var addition = a.x + b;
    a = { x: addition };
};
addAndSet(obj, 3);
obj.x; /* 2 <- The referenced object is not modified
because at the end of the function the variable "obj"
and the variable "a" are not referencing the same object.*/
{% endhighlight %}

Other examples:
{% highlight console linenos %}
> var originalObject = {name:'Michel'};
undefined

> var copy = originalObject;
undefined

> copy.name;
"Michel"

> copy.name = 'Dark Vador';
"Dark Vador"

> originalObject.name
"Dark Vador"

// They are the same. originalObject and copy are two "references" of the same object in memory
// If we change the name, we change the value in memory, but copy and originalObject "point to" the
// same place, to the same object. They are just "pointers" or "reference" to the same object
{% endhighlight %}

------------

#### Comparing two objects

二つのオブジェクトを比較したときには、同じオブジェクトを指しているときだけ、つまり、同じ参照先の時だけ true を返します。

同じ型で、同じプロパティ値を持ち、同じように見えても、同じ参照先を持っていないオブジェクトはお互い同じではない。それぞれメモリの別の場所を指しています。
{% highlight console linenos %}
> var originalObject = {name:'Michel'};
undefined

> var copy = originalObject;
undefined

> copy === originalObject
true

> var anotherObject = {name:'Michel'};
undefined

> copy === anotherObject
false
{% endhighlight %}

------

#### The "global" window object
JavaScript コードは、とある環境で実行されます（通常は Web browser　や ウェブ・サイトのサーバー側のコーディングに JavaScriptをつかっっているいくつかの HTTP Web servers -- NodeJS HTTP serverのように).

この環境にはグローバル・オブジェクトが定義されています。

この環境が ウェブ・サーバーなら（今まで見てきたすべての例がそうなんですが）、

ここでのグローバル・オブジェクトは window という名前です。

var キーワードを使い定義したグローバル変数は、window オブジェクトのプロパティです。
prompt, alert, etc のような既に定義されている関数も同じといえます。

しかし、var とは違い let は、グローバル・ウィンドウ・オブジェクトのプロパティを生成しません。

TIP: if you have global variables/objects declared with let,
just declare them with var instead, and you will be able to inspect them
easily from the devtool console.
You can switch back to using let, later.

Let's see some examples:
{% highlight console linenos %}
> var a = 1;
undefined

> a;
1

> window.a;
1

> window['a'];
1
> let z = 1; // LET DOES NOT DEFINE properties of the window object
undefined
> window.z
undefined
{% endhighlight %}

a と window.a は、同じ変数です。

navigator と window.navigator は同じです、document と window.document は同じものです。

{% highlight console linenos %}
> document === window.document
true

> navigator === window.navigator
true
{% endhighlight %}

Predefined functions are methods from the global object window:

{% highlight console linenos %}
> parseInt('10 little children');
10

> window.parseInt('10 little children');
10

> alert === window.alert
true

> prompt === window.prompt
true

> window.addEventListener === addEventListener
true
{% endhighlight %}

------

#### Built-in JS class: Object

##### The father of all objects: Object
すべてのオブジェクトは Object という名前の特別なクラスから、プロパティとメソッドを継承しています。

2行とも同じです:
{% highlight console linenos %}
> var o = {}; // creation of an empty object
undefined

> var o = new Object(); // same thing as in line 1
undefined
{% endhighlight %}

The toString method inherited from Object by all objects
{% highlight console linenos %}
> o.toString();
"[object Object]"

> o.name = 'Michel';
"Michel"

> o.toString();
"[object Object]"

> var t = [1, 2, 3];
undefined

> t.toString();
"1,2,3"
{% endhighlight %}

toString() in JavaScript is rather similar to the Object.toString() method we find in the Java programming language: when we try to "display" an object, it is transformed into a string by calling toString() implicitly.

{% highlight console linenos %}
> alert(t);

> alert(t.toString()); // same as previous line of code

> "An object into a string : " + t // same as t.toString()
"The object as a String : 1, 2, 3"
{% endhighlight %}

Line 5: using the + operator with a string as the left argument will force the other arguments to convert to string by implicitly calling their toString() method.

The valueOf method inherited from Object by all objects

The ValueOf method returns the value of an object:
{% highlight console linenos %}
> var t = [1, 2, 3];
undefined

> t.valueOf()
[1, 2, 3]

> t.toString();
"1,2,3"
{% endhighlight %}

#### Built-in JS class: Array
Array クラスを使い、配列を作成することができます、(しかし、すでに紹介した別のメソッドをお勧めします:

{% highlight console linenos %}
> var a = new Array(); // same as a = []; use this instead!
undefined

> var b = new Array(1, 2, 3);
undefined

> b;
[1, 2, 3]
{% endhighlight %}

Attention: 要素が一つだけだと、配列の初期サイズとなります。

{% highlight console linenos %}
> var myArray = new Array(3);
undefined

> myArray;
[undefined × 3]
{% endhighlight %}

__Arrays are objects, but they are “special” objects__

<ul class="collection">
  <li class="collection-item">
  Their property names are numerical indexes that start from 0
  </li>
  <li class="collection-item">
  They have a special length property that represents their length/number of elements
  </li>
  <li class="collection-item">
  They have other built-in properties in addition to the ones inherited from Object (toString, valueOf)
  </li>
</ul>

{% highlight console linenos %}
> var a = [], o = {};
undefined

> a.length; // a is an array
0

> o.length; // o is a simple literal object
undefined
{% endhighlight %}

__Some horrible things we can do with arrays (TO AVOID!):__

{% highlight console linenos %}
> var a = [1, 2];
undefined

> typeof a
"object"

> a.push(3);
3

> a
[1, 2, 3]

> a.length
3

// Now let’s add a name property to the array. Yes, we can do that!

> a.name = "I'm an array named a!";
"I'm an array named a!"

> a.length;
3

> a;
[1, 2, 3, name: "I'm an array named a!"]
{% endhighlight %}

<p class="red-text center">
With arrays, only properties with a numerical index are taken into account by the length property!
</p>

__The length property can be modified: reducing or increasing the size of an array__

If you give to the length property a value bigger than the number of elements in an array, it adds undefined elements to it:
{% highlight console linenos %}
> var a = [1, 2];
undefined

> a.length = 5;
5

> a;
[1, 2, undefined × 3]
{% endhighlight %}

If you give to the length property a value less than the array’s number of elements, it reduces the size of the array:

{% highlight console linenos %}
> var a = [1, 2, 3];
undefined

> a.length = 2;
2

> a;
[1, 2]
{% endhighlight %}

#### The most useful methods of the class Array
##### Most useful methods you can use on arrays: sort(), join(), slice(), splice(), push()and pop()

<ul class="collection">
  <li class="collection-item">
  sort: sort the elements in the array. Either alphabetically if they are strings, or in ascending order if they are numbers. There is also a way to sort the elements using other criteria, which is explained a bit further on in the course. With a call to var b = a.sort(), a is also sorted. The sort method sorts the array + returns it.
  </li>
  <li class="collection-item">
  join: adds a string between each element and returns the result as a string
  </li>
  <li class="collection-item">
  slice: returns a sub-array without modifying the original array
  </li>
  <li class="collection-item">
  splice: modifies the array, it removes “a slice” and it also adds new elements
  </li>
  <li class="collection-item">
  push: appends an element at the end of the array and returns the new length
  </li>
  <li class="collection-item">
  pop: removes the last element and returns it
  </li>
</ul>

Typical uses of  push, pop, sort, join:
{% highlight console linenos %}
> var a = [3, 5, 1, 7, 'test'];
undefined

> a.push('new') // appends at the end and returns the new length
6

> a;
[3, 5, 1, 7, "test", "new"]

> a.pop(); // removes the last element and returns it
"new"

> a;
[3, 5, 1, 7, "test"]

> var b = a.sort();
undefined

> b;
[1, 3, 5, 7, "test"]

> a;
[1, 3, 5, 7, "test"]

// a is also sorted. The sort method sorts the array + returns it
undefined

> a.join(' and ');
"1 and 3 and 5 and 7 and test"

{% endhighlight %}

slice() メソッドは、元の配列を変更することなくサブ配列を返します。:

slice() メソッドは、配列の指定された開始位置から終了位置（終了位置は含まず）までを
新しい配列オブジェクトへコピーして返します。元の配列は変更されません。

Possible syntaxes:
<ul class="collection">
  <li class="collection-item">
  arr.slice()
  </li>
  <li class="collection-item">
  arr.slice(begin)
  </li>
  <li class="collection-item">
  </li>
  arr.slice(begin, end) // ELEMENT AT INDEX=end will not be included in the slice!
</ul>
{% highlight console linenos %}
> a;
[1, 3, 5, 7, "test"]

> b = a.slice(1, 3); // elements of indexes = 1 and 2
[3, 5]

> b = a.slice(0, 1); // element of index = 0
[1]

> b = a.slice(0, 2); // elements o indexes = 0 and 1
[1, 3]

> a;
[1, 3, 5, 7, "test"]

// a is unchanged by calls to a.slice(...)
{% endhighlight %}

splice() メソッドは配列を変更します: メソッドは、一部を切り取り、新しい要素を追加もします。

最初の2つの引数は、スタートとエンドの指標です、その他の引数は、配列に追加する要素で取り除かれる一部と置き換えられます。
The first two parameters are start and end indexes, the other parameters are the elements to add to the array to replace the slice that will be removed.

Possible syntaxes:
<ul class="collection">
  <li class="collection-item">
  array.splice(start)
  </li>
  <li class="collection-item">
  array.splice(start, deleteCount)
  </li>
  <li class="collection-item">
  array.splice(start, deleteCount, item1, item2, ...)
  </li>
</ul>

start: 配列の変更を開始する指標 (最初は 0)

deleteCount: 配列から取り除く要素の数を整数で指定する。

item1, item2, ...: オプション。配列に追加する要素、start指標から追加されます。
オプションの要素指定がなければ、配列から要素を取り除くだけです。

Examples:
{% highlight console linenos %}
> a;
[1, 3, 5, 7, "test"]

> b = a.splice(1, 2, 100, 101, 102);
[3, 5]

> a;
[1, 100, 101, 102, 7, "test"]

> a.splice(1, 3);
[100, 101, 102]

> a;
[1, 7, "test"]
{% endhighlight %}

------------

#### Built-in JS class: Number
Number クラスは、文字列を数値に変換するために使えます。しかし、parseInt または parseFloat を使うことを推奨しています。

{% highlight console linenos %}
> var n = Number('3.1416');
undefined

> n;
3.1416

> typeof n;
"number"

> var n = parseInt('3.1416'); // convert a string to an integer number
undefined

> n;
3

> var n = parseFloat('3.1416'); // convert a string to a float number
undefined

> n;
3.1416
{% endhighlight %}

##### Number has useful non-modifiable properties (constants): MAX_VALUE and MIN_VALUE

{% highlight console linenos %}
> Number.MAX_VALUE;
1.7976931348623157e+308

> Number.MIN_VALUE;
5e-324
{% endhighlight %}

##### Methods useful for converting numbers: toFixed(), toExponential(), toString()
<ul class="collection">
  <li class="collection-item">
  toFixed: sets the number of digits for the decimal part of a number.
  <br>
  There is also another method, named toPrecision, that has a very close behavior, and can also return numbers in scientific notation.
  </li>
  <li class="collection-item">
  toExponential: force a number to use a scientific notation. For example var a=1000; a.toExponential(); console.log(a); will give 1e+3
  </li>
</ul>

{% highlight console linenos %}
> var n = 123.456;
123.456

> n.toFixed(1); // sets the number of digits for the decimal part of the number
"123.5"

> n = new Number(123.456); // same as n = 123.456
Number {[[PrimitiveValue]]: 123.456} // well, not exactly, but when you use n, it is equivalent

> n.toFixed(1);
"123.5"

> n.toExponential();
"1.23456e+2"


> var n = 255;
undefined

> n.toString();
"255"

> n.toString(10);
"255"

> n.toString(16);
"ff"

> (3).toString(2);
"11"

> (3).toString(10);
"3"
{% endhighlight %}

-----------

#### Built-in JS class: String
The String class can be used to build new strings, but it’s preferable to use the standard syntax

{% highlight console linenos %}
> var name = 'Michel'; // use this rather than using new String(...)
undefined

> typeof name;
"string"

> var name = new String('Michel');
undefined

> typeof name;
"string"
{% endhighlight %}

Some reminders about strings:

{% highlight console linenos %}
> var name = 'Michel';
undefined

> name.length;
6

> name[0];
"M"

> name[0] = 'Z';
"Z"

> name; // we cannot modify a string using s[index] = value;
"Michel"

> 'Michel'.length;
6

> 'Michel'[0];
"M"
{% endhighlight %}

Explanations:

Line 10: JavaScriptでは、ほかのプログラミング言語の多くと同じように
文字列は、変更可能ではありません。
var s = s + "hello"としたとき、メモリ上の別な場所に新しい文字列が組み立てられています、
そして、この新しい値を変数 s に割り当てています。

文字列 s の個々の文字の変更はしません、ただ、s に対してメモリ上の別のアドレスを与えているだけです

__Useful methods: toUpperCase, toLowerCase, indexOf, charAt__

These methods are all inherited from the String class:

<ul class="collection">
  <li class="collection-item">
  toUpperCase: returns the string in upper case. Do not change the original string.
  </li>
  <li class="collection-item">
  toLowerCase: returns the string in lower case. Do not change the original string.
  </li>
  <li class="collection-item">
  indexOf: returns the index of the string value passed as parameter, -1 if the string value is not found in the original string.
  </li>
  <li class="collection-item">
  charAt: returns the char at the index passed as parameter. Returns an empty string if the index is out of bounds (less than 0 or greater than the length of the string).
  </li>
</ul>
{% highlight console linenos %}
> var s = "I'm the Walrus";
undefined

> var s1 = s.toUpperCase();
undefined

> s1;
"I'M THE WALRUS"
> var s2 = s1.toLowerCase();
undefined

> s2;
"i'm the walrus"

> s; // s is unchanged
"I'm the Walrus"

> s.indexOf('w'); // no ‘w’ in s
-1

> s2.indexOf('w');
8

> s2[8]; // char at index 8
"w"

s2.charAt(8); // same as s2[8]
"w"
{% endhighlight %}

__Other useful methods: lastIndexOf, chaining methods__

<ul class="collection">
  <li class="collection-item">
  lastIndexOf: returns the last index of the string value passed as parameter
  </li>
  <li class="collection-item">
  indexOf can also be used with two parameters, the second one being the starting index when looking for the string value passed as parameter
  </li>
</ul>

{% highlight console linenos %}
> s = 'wow wow wow!';
"wow wow wow!"

> s.lastIndexOf('w');
10

> s.indexOf('w', 1); // start looking at s at index=1, s[0] is ignored
2

> var s1 = s.toUpperCase();
undefined

> s1;
"WOW WOW WOW!"

> s1.toLowerCase().lastIndexOf('w'); // we can chain method calls using ‘.’
10
{% endhighlight %}

#### The most useful methods of the class String
##### The most useful methods of the String class: slice, substring, split, join
The slice and substring methods

__Both these methods can be used to extract a substring from a string.__

They take two parameters: the start and end index of the slice (element at end index will NOT be included in the slice): “please cut from this index, to this one, not included!”.

These two methods are very similar.

Examples:
{% highlight console linenos %}
> var s = "My name is Bond! James Bond!";
undefined

> s;
"My name is Bond! James Bond!"

> s.slice(11, 16);
"Bond!"

> s; // s is unchanged
"My name is Bond! James Bond!"

s.substring(11, 16);
"Bond!"

> s; // s is still unchanged
"My name is Bond! James Bond!"
> s = s.substring(11, 16);
"Bond!"

> s; // this time s has changed, because we did s = s.substring(...), the same
     // could have been done with s = s .slice(...)
"Bond!"
{% endhighlight %}

__[advanced] There is a difference between slice and substring, when the second parameter is negative:__

If you are a beginner, we recommend that you use substring for most common cases (as it will behave the same as slice) and that you stay away from negative parameters, where slice and substring show small differences.

Beginners: do not read what follows about slice and substring! There will be no quiz questions at the end of this chapter about this part!

{% highlight console linenos %}
> var s = "My name is Bond! James Bond!";
undefined

> s.slice(11, -1); // start from index = 11 to length-1, extract the end of the string from 11th element
"Bond! James Bond"

> s.substring(11, -1); // the reverse, extract from 0 until 11-1, get the first 10 chars
"My name is "

> s.substring(1, -1); // extract from 0 to 1-1 = 0, get the first char
"M"
{% endhighlight %}

Actually, here is a summary of the common behaviors and the differences between slice and substring.

[advanced] slice(start, stop) works like substring(start, stop) with a few different behaviors:

__What they have in common:__

<ul class="collection">
  <li class="collection-item">
  If start equals stop: returns an empty string
  </li>
  <li class="collection-item">
  If stop is omitted: extracts characters to the end of the string
  </li>
  <li class="collection-item">
  If either argument is greater than the string's length, the string's length will be used instead.
  </li>
</ul>

__Distinctions of substring():__

<ul class="collection">
  <li class="collection-item">
  If start > stop, then substring will swap those two arguments.
  </li>
  <li class="collection-item">
  If either argument is negative or is NaN, it is treated as if it were 0.
  </li>
</ul>

__Distinctions of slice():__

<ul class="collection">
  <li class="collection-item">
  If start > stop, slice() will NOT swap the two arguments.
  </li>
  <li class="collection-item">
  If start is negative: sets char from the end of string.
  </li>
  <li class="collection-item">
  If stop is negative: sets stop to: string.length – Math.abs(stop.
  </li>
</ul>

##### The split(), join() and concat() methods

The split method returns an array of strings, the parameter is a separator. The join method builds a string from an array of strings.

{% highlight console linenos %}
> var s = "My name is Bond! James Bond!";
undefined

> s.split(" ");
["My", "name", "is", "Bond!", "James", "Bond!"]

> s;
"My name is Bond! James Bond!"

> s.split(' ').join('-#-');
"My-#-name-#-is-#-Bond!-#-James-#-Bond!"

> s.split(' ').join('.......');
"My.......name.......is.......Bond!.......James.......Bond!"

> s.split('Bond!').join('.......');
"My name is ....... James ......."

> s.split('Bond!').join(' ');
"My name is James "

> s; // s is unchanged
"My name is Bond! James Bond!"

> s.concat("And I've made a lot of movies!");
"My name is Bond! James Bond! And I've made a lot of movies!"

> s; // s is also unchanged by concat
"My name is Bond! James Bond!"

> s = s + "and I've made a lot of movies!"; // this changes s
"My name is Bond! James Bond! And I've made a lot of movies!"

> s += " Action films!" // this too, most common syntax for concatenating strings
"My name is Bond! James Bond! And I've made a lot of movies! Action films!"

> s; // s changed too
"My name is Bond! James Bond! And I've made a lot of movies! Action films!"
{% endhighlight %}

-----

#### Built-in JavaScript class: Math
##### It’s not possible to do var m = new Math();

{% highlight console linenos %}
> var m = new Math();
VM5777:1 Uncaught TypeError: Math is not a constructor
at <anonymous>:1:9
(anonymous) @ VM5777:1
{% endhighlight %}

But the Math class has a lot of properties and methods that are useful for arithmetic expressions. They are all class methods and properties, so you will need to use the name of the class followed by the dot operator to access them.

Here are some examples:

{% highlight console linenos %}
> Math.PI;
3.141592653589793

> Math.SQRT2;
1.4142135623730951

> Math.E; // Euler constant
2.718281828459045

> Math.LN2; // Neperian log of 2
0.6931471805599453

> Math.LN10; // Neperian log of 10
2.302585092994046
{% endhighlight %}

##### Random numbers between 0 and 1 with Math.random()

Math.random() returns a float value between 0 and 1.

Examples:
{% highlight console linenos %}
> Math.random();
0.6033316111663034

> 100 * Math.random(); // between 0 and 100
11.780563288516422
{% endhighlight %}

__To get a number between a min and a max value, use this formula: val = ((max - min) * Math.random()) + min__

And here is an utility function:
{% highlight console linenos %}
function getRandomValue(min, max) {
    return ((max - min) * Math.random()) + min;
}

> getRandomValue(5, 10);
5.064160540161435
{% endhighlight %}

__Math and rounding methods round(), ceil(), floor()__

round: to get the closest integer value.

For example Math.round(Math.random()); will return 0 or 1.
<ul class="collection">
  <li class="collection-item">
  Indeed, if Math.random() returns a value above 0.5, Math.round of this value will return 1, if the value is below 0.5, Math.round will return 0:
  </li>
</ul>

{% highlight console linenos %}
> Math.round(Math.random());
1

> Math.round(Math.random());
0

> Math.round(Math.random());
1

> Math.round(Math.random());
1
{% endhighlight %}

__Get the min and the max of two values with Math.min(a, b) and Math.max(a, b)__

{% highlight console linenos %}
> Math.min(12, 4);
4

> Math.max(12, 4);
12
{% endhighlight %}

__A useful function that restricts a value between  min and  max bounds:__

{% highlight console linenos %}
function restrictValue(value, min, max) {
    return Math.min(Math.max(1, value), max);
}

> restrictValue(40, 1, 20);
20

> restrictValue(-10, 1, 20);
1

> restrictValue(10, 1, 20);
10
{% endhighlight %}

__Math functions for arithmetical computations sin(), cos(), tan(), atan(), atan2(), pow(), sqrt()__

{% highlight console linenos %}
> Math.pow(2, 8); // 2^8
256

> Math.sqrt(9);
3

> Math.sin(Math.PI/2);
1

> Math.cos(Math.PI/2);
6.123233995736766e-17
{% endhighlight %}

__Math.atan2(dy, dx) is useful for getting an angle between a point in a canvas and the mo_use cursor__

Here is a typical example of the use of Math.atan2 in a video game, in order to make an object follow the mouse cursor by moving towards it. Look at the code in the mainloop function.

##### Move the mouse cursor and see the black rectangle following it.
<canvas id="myCanvas" width="400" height="400"></canvas>

------

#### Built-in JS class: Date

##### Getting a date by calling the Date constructor

Without any argument, a call to new Date() returns the current date.

Note: The return value is actually a Date object, which is displayed by calling toString() on this object.
{% highlight console linenos %}
> var date = new Date();
undefined

> date;
Wed Apr 12 2017 11:10:28 GMT+0200 (CEST)
> date.toString(); // same thing!
Wed Apr 12 2017 11:10:28 GMT+0200 (CEST)
{% endhighlight %}

__We can also pass it an argument that can be:__

<ul class="collection">
  <li class="collection-item">
  A string that encodes a date
  </li>
  <li class="collection-item">
  A set of numeric values separated by a comma for month, day, hour, and so on
  </li>
  <li class="collection-item">
  A Unix "timestamp"  (number of milliseconds elapsed since 1970)
  </li>
</ul>

... in this case it returns a date object that corresponds to the encoded date passed as argument.

Examples:
{% highlight console linenos %}
> new Date('2017 04 28');
Fri Apr 28 2017 00:00:00 GMT+0200 (CEST)

> new Date('2017 1 2');
Mon Jan 02 2017 00:00:00 GMT+0100 (CET)

> new Date('2017 1 2 8:30');
Mon Jan 02 2017 08:30:00 GMT+0100 (CET)
{% endhighlight %}

Numerical parameters can also be passed in this order: year, month (0-11), day (1-31), time (0-23), minutes (0-59), seconds , milliseconds (0-999). We do not have to pass everything but it should always be in this order.

Examples:
{% highlight console linenos %}
> new Date(2017, 3, 16, 14, 43, 10, 120);
Sun Apr 16 2017 14:43:10 GMT+0200 (CEST)

> new Date(2017, 0, 10, 14);
Tue Jan 10 2017 14:00:00 GMT+0100 (CET)

> new Date(2017, 1, 28) // 1 is February! Month indexes start at 0!
Tue Feb 28 2017 00:00:00 GMT+0100 (CET)

> new Date(2008, 1, 29);
Fri Feb 29 2008 00:00:00 GMT+0100 (CET)

> new Date(2017, 1, 29); // No February 29th in 2017! Gives 1st of March
Wed Mar 01 2017 00:00:00 GMT+0100 (CET)

> new Date(2017, 11, 31); // Happy new year!
Sun Dec 31 2017 00:00:00 GMT+0100 (CET)

> new Date(2017, 11, 32) // 32 Dec -> 1st of January!
Mon Jan 01 2018 00:00:00 GMT+0100 (CET)
{% endhighlight %}

One can build the date with a Unix timestamp (number of milliseconds since 1970):

{% highlight console linenos %}
> new Date(1199885822900);
Wed Jan 09 2008 14:37:02 GMT+0100 (CET)
{% endhighlight %}

Calling Date() without "new" returns the current date as a string. It does not matter if we pass parameters:

{% highlight console linenos %}
> Date();
"Sun Apr 16 2017 14:51:47 GMT+0200 (CEST)"
{% endhighlight %}

Useful methods
{% highlight console linenos %}
> var d = new Date();
undefined

> d.toString();
"Sun Apr 16 2017 14:52:52 GMT+0200 (CEST)"

> d.setMonth(2); // Change for month with index=2
1489672372092

> d.toString();
"Thu Mar 16 2017 14:52:52 GMT+0100 (CET)"

> d.getMonth(); // get current month index
2
{% endhighlight %}

Let's play with my birthday!

{% highlight console linenos %}
> var d = new Date(1965, 3, 16); // Michel Buffa's birthday
undefined

> d.getDay(); // Sunday is 0
5

> d; // let's verify
Fri Apr 16 1965 00:00:00 GMT+0200 (CEST)

> // Great, it was a Friday :-)
{% endhighlight %}

Let's write a small piece of code that will guess which days of the week Michel Buffa's birthday will occur, between 2017 and 2047:

{% highlight console linenos %}
> var dayOfTheWeek = [0,0,0,0,0,0,0];

for (var year = 2017; year <= 2047; year++) {
    dayOfTheWeek[new Date(year, 4, 16).getDay()]++;
}

> dayOfTheWeek
[4, 4, 5, 5, 5, 4, 4] // 4 times on a Sunday, Monday, Friday and Saturday,
                      // 5 times on Tuesday, Wednesday and Thursday
{% endhighlight %}

Explanations:
<ul class="collection">
  <li class="collection-item">
  Line 1 we use an array with each element being the number of times the birthday occurs on a Sunday, Monday, etc.
  </li>
  <li class="collection-item">
  Line 3: we iterate using a for loop on every year between 2017 and 2047.
  </li>
  <li class="collection-item">
  Line 4: we build a Date object using 16 of April, but change the year, we compute the date of each of Michel Buffa's birthdays between 2017 and 2045, and we get the index of the day (using the getDay() method). This index is used to increment corresponding elements of the array defined in line 1.
  </li>
  <li class="collection-item">
  Finally, line 7 displays the content of the array. Remember  that typing a variable name in the devtool console is equivalent to calling the object toString() method.
  </li>
</ul>

And here is a full version with input fields and results displayed in an HTML table:
<label for="birthday">Your birthday: </label>
<input id="birthday" type="date" value="1958-05-15">
<p>Please enter a starting and an ending year, then click the button.</p>
<label for="start">Start year:</label>
<input type="number" id="start" value="2017" min="1958" max="3000">
<p></p>
<label for="end">End year:</label>
<input type="number" id="end" value="2047" min="1958" max="3000">
<p></p>
<button class="btn" onclick="computeBirthdays();">
    Compute how many times
    your birthday will occur,
    for each day of the week
</button>
<p></p>
<output id="results"></output>
<button class="btn" onclick="rest01()">Reset</button>



<style type="text/css">
canvas {
  border: 2px solid black;
}
td {
  text-align: center;
}
</style>

<script>

window.onload = init;

var canvas, ctx, width, height;
var rect = {x:40, y:40, radius: 30, width:40, height:40, v:3};
var mousepos = {x:0, y:0};

function init() {
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;

  canvas.addEventListener('mousemove', function (evt) {
        mousepos = getMousePos(canvas, evt);
     }, false);

  mainloop();
}


function mainloop() {
    // 1) clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2) move object
    var dx = rect.x - mousepos.x;
    var dy = rect.y - mousepos.y;
    var angle = Math.atan2(dy, dx);

    rect.x -= rect.v*Math.cos(angle);   
    rect.y -= rect.v*Math.sin(angle);

    // 3) draw object
    drawRectangle(angle);

    // 4) request new frame
     window.requestAnimationFrame(mainloop);
}

function drawRectangle(angle) {
  ctx.save();

  // These two lines move the coordinate system
  ctx.translate(rect.x, rect.y);
  ctx.rotate(angle);
  // recenter the coordinate system in the middle
  // the rectangle. Like that it will rotate around
  // this point instead of top left corner
  ctx.translate(-rect.width/2, -rect.height/2);

  ctx.fillRect(0, 0, rect.width, rect.height);
  ctx.restore();
}

function getMousePos(canvas, evt) {
  // necessary to take into account CSS boudaries
  var rect = canvas.getBoundingClientRect();
  return {
     x: evt.clientX - rect.left,
     y: evt.clientY - rect.top
  };
}

/*******************************************/
function computeBirthdays() {
  // An array. Each element is the number of times my birthday
  // will occur. For the moment: 0 times on a Monday, 0 times on Friday
  // etc.
  var dayOfTheWeek = [0,0,0,0,0,0,0];


  var birthday = document.querySelector("#birthday").value;

  // birthday is the value of the input field,
  // as a string (ex: "1958-5-15")
  // Let's turn it into a Date object
  var birthdayAsDate = new Date(birthday);

  // Get the month and year (ex: 15 May)
  var birthdayMonth = birthdayAsDate.getMonth(); // ex: May
  var birthdayDate  = birthdayAsDate.getDate();   // ex: 15

  var startYear = document.querySelector("#start").value;
  var endYear = document.querySelector("#end").value;

  for (var year = startYear; year <= endYear; year++) {
      var dayOfTheWeekMyBirthDayOccurs =
          new Date(year, birthdayMonth, birthdayDate).getDay();

        console.log('Year : ' + year + " Day of your birthday: " +
                    getDayName(dayOfTheWeekMyBirthDayOccurs));

      // increment the counter for this day
      dayOfTheWeek[dayOfTheWeekMyBirthDayOccurs]++;
   }

   // add a table to the web page, presenting the results
   displayResults(dayOfTheWeek);

}

function getDayName(dayIndex) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex];
}

function displayResults(array) {
  document.querySelector("#results").innerHTML = "<p>Occurences of your Birthday:</p>";

  var table = document.createElement("table");
  var firstRow = table.insertRow();
  var secondRow = table.insertRow();

  table.classList.add('bordered');

  array.forEach(function(dayOccurence, index) {
    var dayNameCell = firstRow.insertCell(index);
    dayNameCell.innerHTML = getDayName(index);

    var nbCell = secondRow.insertCell(index);
    nbCell.innerHTML = dayOccurence;

  });

  document.querySelector("#results").appendChild(table);
}
function rest01() {
  document.querySelector("#results").innerHTML = "";
}
</script>
