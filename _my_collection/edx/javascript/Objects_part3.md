---
layout: post
title: Objects (Part3) - creating multiple objects
date: 2017-06-29 00:00:00 +900
subject: javascript
description:
  edx's course by W3C.
  Introductory course designed to understand
  the basic concepts of JavaScript.  
---

-------
#### Classes: definition
##### Introduction: the concept of "class" in object oriented programming languages
いままでシングルトン・オブジェクト：一度だけ生成されるオブジェクト：player, darkVador, etc
だけを使ってきました。

このことは、少し違っています、ゲームの中でたくさんのボールを作ったことを忘れていました。
この例にすこし戻りましょう。

このボールを扱うのに、同じプロパティと同じメソッドを共有するが、プロパティの値は異なっていい
複数のオブジェクトを簡単に作成する方法としてテンプレートを使っていませんでした。

例えば、Luke Skywalker, Ian Solo and Dark Vadorを想像してください。
それらに共通なのはなですか。みなスターウォーズのヒーローで、名前があり、どちらかの味方（良い/悪い人々
つまり、反乱軍 vs 帝国軍）などなど。
オブジェクトそれ自体を記述するのではなく、オブジェクトのための"モデル"、"テンプレート"を記述する
プログラミング手法があると創造してください。
それをStarWarsHeroとしましょう、これを使って ヒーローオブジェクトを生成します。

ゲームの複数のボールを思い出してください：みな同じ形(円)をしています、
同じプロパティの x, y, radius, color を持っていますが、　それらの値は異なっています。
みな同じオブジェクト（ball)クラスに所属していますが、プロパティの値という点では、みな異なっていました。

<p class="red-text">
多くのプログラミング言語でこのテンプレートを"クラス"と呼びます
</p>

<ul class="collection">
  <li class="collection-item">
  JavaScript 5 (ES5)では、このようなコンセプトはありません、その代わりに　"constructor 関数"があります。
  </li>
  <li class="collection-item">
  JavaScript 6 (ES6)では、クラスの概念があり、 他のオブジェクト・オリエントなプログラミング言語にみられるような似通った文法となっています。
  </li>
</ul>

ES5のコンストラクタ関数を使った"疑似クラス"を定義する方法と、ES6のクラスを使った定義の方法を紹介します。

#### ES5's constructor functions, the "new" keyword

JavaScript 5 (あるいはそれ以前のバージョン)では、コンストラクタ関数と呼ばれている疑似クラスのテンプレートを定義できます。
次のことを除いて、関数を作るのと同じ文法を使います。

<ul class="collection">
  <li class="collection-item">
  1. 規則で、名前の最初の文字を大文字にします。通常の関数ではなく、コンストラクタ関数であることがわかります。作ろうとするオブジェクトクラスの名前は名詞とします。例： Person, Vehicle, Enemy, Product, Circle, Ball, Player, Hero, etc.
  </li>
  <li class="collection-item">
  2. 新しいオブジェクトを作るために new キーワードを使います:
  例 (Car, Hero, Ball, Product はコンストラクタ関数の名前):

  var car = new Car('Ferrari', 'red');
  var luke = new Hero('Luke Skywalker', 'rebels");
  var ball1 = new Ball(10, 10, 20, 'blue'); // x=10, y=10, radius = 20, color = 'blue'
  var p1 = new Product('Epson printer P1232', '183', 'Mr Buffa'); // ref, price, customer
  etc.
  </li>
  <li class="collection-item">
  3.関数のパラメータは、コンストラクタ・パラメータで: 作ろうとしている新しいオブジェクトはこのパラメータを初期プロパティ値として使います。
  ヒーローを生成するときには、名前や、どちら側、などを与えなくてはなりません。
  </li>
  <li class="collection-item">
  4. プロパティ名とメソッド名は　this キーワードをを使い定義します。
   覚えておく: 文法は、シングルトン/単純なオブジェクトの定義に使ったものとは異なります。
   ":" も無く、プロパティ間の "," もありません。 通常の関数と同じように"=" と ";" を使います。

  例:

  function Hero(name, side) {
    this.name = name;
    this.side = side;
    this.speak = function() {
      console.log("My name is " + this.name + " and I'm with the " + this.side);
    }
  }

  "Hero"という名のコンストラクタ関数では、このように宣言されたプロパティがあります:
   this.name this.side; そして このように宣言されtqメソッド: this.speak = function() {...}
  </li>
  <li class="collection-item">
  5. プロパティがコンストラクタ関数パラメータを使って初期化されることはよくあることです。
  つまり新しく生成されたオブジェクトはプロパティの初期値を取得します。
  この場合、this キーワードを使い、コンストラクタ関数パラメータとプロパティを区別します:

  例:

  function Hero(name) {
    this.name = name;
    ...
  }
  </li>
</ul>
__Full interactive example that uses a constructor function__
<p>Look at the JS code. This time we created multiple objects using a "constructor function.</p>
 <p>   
   <button class="btn" onclick='makeHeroesSpeak();'>Make Star Wars heroes speak!</button>
   <button class="btn" onclick='reset01();'>Reset</button>
 </p>
 <h5 id="dsp01"></h5>

 {% highlight javascript linenos %}
 function Hero(name, side) {
  this.name = name;
  this.side = side;

  this.speak = function() {
    return "<p>My name is " + this.name +
      ", I'm with the " + this.side + ".</p>";
  }
}

var darkVador = new Hero("Dark Vador", "empire");
var luke = new Hero("Luke Skywalker", "rebels");
var ianSolo = new Hero("Ian Solo", "rebels");

function makeHeroesSpeak() {
  document.body.innerHTML += darkVador.speak();
   document.body.innerHTML += luke.speak();
   document.body.innerHTML += ianSolo.speak();
}
{% endhighlight %}

#### Creating objects using the new ES6 classes
ES5のコンストラクタ関数の文法は読みにくかったりします。
規則を無視してコンストラクタ関数の最初の文字を大文字にしない人がいたら、コードは動きますが、
通常の関数なのかどうか分かりずらいものになります。

ES6 は class キーワード　と　constructor キーワードを作りました。

Main changes:

<ul class="collection">
  <li class="collection-item">
  1. クラスは、クラス名の前に class キーワードを使い分かりやすく定義されます。
  </li>
  <li class="collection-item">
  2. たった一つのコンストラクタは、パラメータを持つ constructor キーワードを使い定義される。
    <ul class="collection">
      <li class="collection-item">
      コンストラクタはキーワード new をオブジェクトが生成されるときに実行される。
      <br>
      例: let h1 = new Hero('Ian Solo', 'rebels');
      <br><br>
      これは下記の例で constructor(name, side) を呼び出します。
      </li>
    </ul>
  </li>
  <li class="collection-item">
  3. メソッドは単にパラメータを持った名前で定義されます。function キーワードは使いません。
  <br>
     例: speak() {...} in the source code below.
  </li>
</ul>

Here is the new version of the Hero "template", this time with the ES6 class syntax:

{% highlight javascript linenos %}
class Hero {
    constructor(name, side) {
        this.name = name; // property
        this.side = side; // property
    }

    speak() { // method, no more "function"
        return "<p>My name is " + this.name +
               ", I'm with the " + this.side + ".</p>";
    }
}

var darkVador = new Hero("Dark Vador", "empire");
{% endhighlight %}

__Interactive example that uses an ES6 class to create Star Wars heroes__

<p>Look at the JS code. This time we created multiple objects using an ES6 class named Hero.</p>
 <p>   
   <button class="btn" onclick='makeHeroesSpeak02();'>Make Star Wars heroes speak!</button>
   <button class="btn" onclick='reset02();'>Reset</button>
 </p>
<h5 id="dsp02"></h5>

{% highlight javascript linenos %}
class Hero {
  constructor(name, side) {
    this.name = name;
    this.side = side;   
  }

  speak() {
    return "<p>My name is " + this.name +
      ", I'm with the " + this.side + ".</p>";
  }
}

var darkVador = new Hero("Dark Vador", "empire");
var luke = new Hero("Luke Skywalker", "rebels");
var ianSolo = new Hero("Ian Solo", "rebels");

function makeHeroesSpeak() {
  document.body.innerHTML += darkVador.speak();
   document.body.innerHTML += luke.speak();
   document.body.innerHTML += ianSolo.speak();
}
{% endhighlight %}

#### You must declare a class before using it!
関数とは違い、クラスは使う前に宣言されていなくてはならない。

関数の宣言とクラスの宣言の重要な違いは、関数の宣言は、下から引き上げられるが、クラスの宣言はできない。
つまり関数は、ソースコードの中で宣言する前でも呼び出すことができるということです。
ES6のクラスの場合には当てはまりません。

##### You first need to declare your class and then access it, otherwise code like the following will throw a ReferenceError:

Incorrect version => you try to create an instance of a class before it has been declared:
{% highlight javascript linenos %}
var p = new Rectangle(); // ReferenceError

class Rectangle {...}
{% endhighlight %}

Correct version =>
{% highlight javascript linenos %}
class Rectangle {...}

var p = new Rectangle(); // WORKS !
{% endhighlight %}

#### Creating objects with functions (factories)

__We have already seen three different ways to create objects (literals, constructor functions and ES6 classes)__

Objects can be created as “literals” :
{% highlight javascript linenos %}
var darkVador = { firstName:’Dark’, lastName:’Vador’};
{% endhighlight %}

Objects can be created with the keyword new and a constructor function or an ES6 class:
{% highlight javascript linenos %}
var darkVador = new Hero(’Dark Vador’, ’empire’);
{% endhighlight %}

Here is a new one: オブジェクトはオブジェクト(ファクトリ)を返す関数によっても生成できます
{% highlight javascript linenos %}
function getMousePos(event, canvas) {
    var rect = canvas.getBoundingClientRect();
    var mxx = event.clientX - rect.left;
    var my = event.clientY - rect.top;

    return { // the getMousePos function returns an object. It’s a factory
        x: mx,
        y: my
    }
}
{% endhighlight %}

And here is how you can use this:
{% highlight javascript linenos %}
var mousePos = getMousePos(evt, canvas);

console.log("Mouse position x = " + mousePos.x + " y = " + mousePos.y);
{% endhighlight %}

The call to getMousePos returns an object that has an x and a y property.

#### Static properties and methods
##### Class properties and methods vs. instances' properties and methods
時々、クラスのインスタンスではなく、クラスにくっついているメソッドがあります。

例えば、 Heroクラスを思い浮かべてください、そして何人のヒーローを作成したか知りたいとします。
もし一人も生成されていないなら、Dark Vador のような、クラスのインスタンスに属するプロパティを使えないのは明らかです： darkVador.getNbHeroes();

しかしながら、オブジェクト・オリエントなプログラミング言語には、今まで見てきた”インスタンス・プロパティ”と”インスタンス・メソッド”と全く同じ、”クラス・プロパティ”と”クラス・メソッド”の概念があります。Hero.getNbHeroes() は、 "ねえ, クラス Hero、君のクラスを使って、何人のヒーローを作ったか教えて"ということです。クラスメソッドは"class behavior"を定義し,インスタンスメソッドはインスタンスの動作を定義します。darVador.speak(); は、"ねえ, Dark Vador, 何か話して"という意味です。
私は Dark Vador に語り掛け、彼から出てくる何かを期待しています "I'm your father, Luke!"のようなことを。

プロパティということでは同じで。もしクラス Hero に、nbHerosCreated という名のプロパティがあるとします、それは、インスタンスのではなく、クラスのDNAを表してします。
Heroクラスは、生成されたヒーローの数を持っているといえます。
Dark Vadorは、名前と、帝国側であることを持っていますが、Dark Vadorは、彼が作ったヒーローの数は持っていません。クラス・プロパティとインスタンス・プロパティがあるのです。

##### The static keyword is used for defining class methods

__Class methods__

どの様に区別するのでしょうか。 static キーワードを使います。
static キーワードが前についたメソッドを見たなら、それはクラスプロパティかクラスメソッドだということです。

<div class="box">
  <p class="center">
  static キーワードはクラスの static メソッドを定義します
  </p>
  <p class="center">
  Static メソッドは、クラスをインスタンス化しなくても呼び出せます
  </p>
  <p class="center">
  そして、クラスのインスタンスからは呼び出せません
  </p>
  <p class="center">
  結果として: 本体内でインスタンス・プロパティを使うな
  </p>
  <p class="center">
  Static メソッドはしばしばアプリケーションのためのユーティリティ関数を作るために使われます。

  </p>
</div>

__Class properties__

クラス・プロパティは、そのクラスの宣言の後に定義されなくてはならず、クラス名の後に . 演算子をつけ、その後にプロパティ名をつけて定義されなくてはならない。例: Point.nbPointsCreated

クラス・プロパティを定義するもう一つの方法があります（static getters と setters を使います）

__Example of creation and use of class methods and properties using an ES6 class__

Source code:
{% highlight javascript linenos %}
class Point {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      // static property
      Point.nbPointsCreated++;
   }

   // static method
   static distance(a, b) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;

      return Math.sqrt(dx*dx + dy*dy);
   }
}
// static property definition is necessarily outside of the class with ES6
Point.nbPointsCreated=0;

// We create 3 points
const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
const p3 = new Point(12, 27);

document.body.innerHTML += "<p>Distance between points (5, 5) and (10, 10) is " +
                           Point.distance(p1, p2) + "</p>";
document.body.innerHTML += "Number of Points created is " + Point.nbPointsCreated;
{% endhighlight %}
<h5 id="dsp03"></h5>

#### [Advanced] ES6 getters and setters
##### Definition

ゲッタとセッタと呼ばれる特別なメソッドを使って、クラス・プロパティを定義できます。
これらのメソッドは、プロパティに値を設定仕様としたときや、プロパティにアクセスして何かをやらせたいときに
何らかのチェックをさせることを可能にします（値が小文字だとして、それを大文字にして表示するとか）。

この特別な関数はゲッタとセッタと呼ばれ、キーワードの get と set に続けてプロパティの名前を書いて宣言されます。

Typical use (lines 7 and 11):
{% highlight javascript linenos %}
class Person {
    constructor(givenName, familyName) {
        this.givenName = givenName; // "normal name"
        this._familyName = familyName; // starts with "_"
    }

    get familyName() {
        return this._familyName.toUpperCase();
    }

    set familyName(newName) {
        // validation could be checked here such as
        // only allowing non numerical values
        this._familyName = newName;
    }

    walk() {
        return (this.givenName + ' ' + this._familyName + ' is walking.');
    }
}

let p1 = new Person('Michel', 'Buffa');
console.log(p1.familyName); // will display BUFFA in the devtool console
                            // this will call implicitly get familyName();
p1.familyName = 'Smith';    // this will call implicitly set familyName('Smith');
{% endhighlight %}

get familyName() {...}を宣言するとします、これは、名前が"familyName"のプロパティを明示的に定義をします、
そして、オブジェクトがそのクラスのインスタンスであるなら、object.familyNameを使いプロパティにアクセスできます。
22-25行目。p1.familyNameの値を表示しているところは、明らかに get familyName()を呼び出します.
一方、p1.familyName = 'Smith'; は set familyName('Smith');を呼び出します。

get familyName() は、familyNameという名のプロパティを明示的に定義していますが、規約では、this._familyNameを使い値を保存します（アンダースコアがプロパティ名の先頭についています）。

<h5 id="dsp04"></h5>

 <script>
 function Hero(name, side) {
  this.name = name;
  this.side = side;

  this.speak = function() {
    return "<p>My name is " + this.name +
      ", I'm with the " + this.side + ".</p>";
  }
}

var darkVador = new Hero("Dark Vador", "empire");
var luke = new Hero("Luke Skywalker", "rebels");
var ianSolo = new Hero("Ian Solo", "rebels");

function makeHeroesSpeak() {
  let dsp01 = document.querySelector('#dsp01');
  dsp01.innerHTML += darkVador.speak();
  dsp01.innerHTML += luke.speak();
  dsp01.innerHTML += ianSolo.speak();
}
function reset01() {
  let dsp01 = document.querySelector('#dsp01');
  dsp01.innerHTML = "";
}

class Hero2 {
  constructor(name, side) {
    this.name = name;
    this.side = side;   
  }

  speak() {
    return "<p>My name is " + this.name +
      ", I'm with the " + this.side + ".</p>";
  }
}

var darkVador2 = new Hero2("Dark Vador", "empire");
var luke2 = new Hero2("Luke Skywalker", "rebels");
var ianSolo2 = new Hero2("Ian Solo", "rebels");

function makeHeroesSpeak02() {
  let dsp02 = document.querySelector('#dsp02');
  dsp02.innerHTML += darkVador2.speak();
   dsp02.innerHTML += luke2.speak();
   dsp02.innerHTML += ianSolo2.speak();
}
function reset02() {
  let dsp02 = document.querySelector('#dsp02');
  dsp02.innerHTML = "";
}

/**********************************/
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    /* static property*/
    Point.nbPointsCreated++;
  }

  /* static method*/
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.sqrt(dx*dx + dy*dy);
  }
}
// static property
Point.nbPointsCreated=0;

// We create 3 points
const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
const p3 = new Point(12, 27);

let dsp03 = document.querySelector('#dsp03');
dsp03.innerHTML += "<p>Distance between points (5, 5) and (10, 10) is " +
                     Point.distance(p1, p2) + "</p>";
dsp03.innerHTML += "Number of Points created is " + Point.nbPointsCreated;


/*****************************************/
class Person {
    constructor(givenName, familyName) {
        this.givenName = givenName;    /* "normal name"*/
			  this._familyName = familyName; /* starts with "_"*/
    }

		/* getters and setters are useful for processing*/
	  /* properties, doing checks, changing them before*/
	  /* returning their value, etc.*/
	  /* having "get familyName" is equivalent to declaring a property*/
	  /* named "familyName", but in this case we have to use ANOTHER*/
	  /* name for the variable that will be used to store the property*/
	  /* value. A convention is to keep the same name but add an */
	  /* underscore at the beginning. */
    /* Ex: get name(n) { this._name = n;}*/

    get familyName() {
        return this._familyName.toUpperCase();
    }

    set familyName(newName) {
			  /* validation could be checked here such as */
			  /* only allowing non numerical values*/
        this._familyName = newName;   
    }

    walk() {
        return (this.givenName + ' ' + this._familyName + ' is walking.');
    }
}

let michel = new Person('Michel', 'Buffa');

let dsp04 = document.querySelector('#dsp04');

dsp04.innerHTML += "<p>"
												+ michel.walk()
												+ "</p>";

// Notice that we use here the "normal" names givenName and familyName
dsp04.innerHTML += "<p>Our teacher is "
												+ michel.givenName
												+ ' ' + michel.familyName
												+ "</p>";
 </script> 　
