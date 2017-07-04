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

Some horrible things we can do with arrays (TO AVOID!):

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

The slice() method returns a sub-array without modifying the original array:

The slice() method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.

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

The splice() method modifies the array: it removes “a slice” and also adds new elements

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

start: index at which to start changing the array (with origin 0)

deleteCount: An integer indicating the number of old array elements to remove.

item1, item2, ...: these are optional. They are the elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.

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
The Number class can be used to transform strings into numbers, but it is recommended that you use parseInt or parseFloat instead.

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

Line 10: in JavaScript, and in many other programming languages, a string is not modifiable at all.
When we do var s = s + "hello", in fact, we are building a new string somewhere in memory, and we assign this new value to the variable s.
We never "modify" the characters of the string s, we just give to s another address in memory to point to.
Useful methods: toUpperCase, toLowerCase, indexOf, charAt

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

Other useful methods: lastIndexOf, chaining methods

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
