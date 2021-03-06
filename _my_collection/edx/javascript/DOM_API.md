---
layout: post
title: DOM APIs
date: 2017-06-22 00:00:00 +900
subject: javascript
description:
  edx's course by W3C.
  Introductory course designed to understand 
  the basic concepts of JavaScript.  
---

-------
<style type="text/css">
.checked {
    border: 2px dashed #000;
    background-color: yellow;
    color: blue;
}
.box {
      border: silver solid;
      width: 256px;
      height: 128px;
      margin: 10px;
      padding: 5px;
      float: left;
    }   
</style>

#### Introduction
##### The DOM standard - exploring the DOM of a document

__Introduction__
ユーザーが、リンクをクリックしたり、ブラウザのアドレスにURLを入力すると、
ページのHTMLテキストをダウンロードしてDOM(Document Object Model)と呼ばれるドキュメント構造を組み立てます。このモデルが画面にHTMLページを描画するために使用されます。

DOMは、ドキュメントがどの様に操作されなければならないかを示している標準となっています。
DOMは、言語、プラットフォームによらないインターフェースを定義しています。
そのため、どのブラウザもが、同じJavaScript DOM APIを要求しています。

DOM APIは、JavaScript プログラマがHTMLコンテンツやHTML要素のCSSスタイルを素早く変更するのに使える
プログラミング・インターフェースです。

DOM APIは構造化したオブジェクトとしてのドキュメント・オブジェクトを提供します、
それは、木のように表現されたノードの集まりです。

ドキュメント・オブジェクトは構造化されたドキュメントにアクセスし操作する数多くのメソッドも持っています。
DOMを通して、ノード（ページを構成するHYML要素）を探し、動かし、削除し、その属性や内容を修正し、
関連したイベントを扱います。

JavaScriptでは、DOMは、グローバル・オブジェクトである window のドキュメント・プロパティを通してアクセス可能です。 window.document がまさにドキュメントですが、window オブジェクトを直接操作することはめったにありません。

ドキュメント・オブジェクトを使うことで、JavaScriptから、構造化したドキュメントであるぺーじにアクセスし操作ができます。

##### Reminder from Module 1: HTML and the DOM
要素は、それ自体要素の一部です、paragraph, header, そしてbodyさえも要素です。
ほとんどの要素はほかの要素を含めることができます、-　例えば、body要素は、header, paragraph要素を含むことができます、実際、ドキュメント・オブジェクト・モデルの目に見える要素のほとんどすべてがそうです。

__例__
{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Your first HTML page</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>My home page</h1>
        <p>Hi! Welcome to my Home Page! My name is Michel Buffa,
        I'm a professor at the University of Nice, in France,
        and I'm also the author of two MOOCS about HTML5 on
        W3Cx.
        </p>
    </body>
</html>
{% endhighlight %}

#### A warning about the DOM API
DOM と DOM API は、扱いづらく、複雑なばあいがあります。
DOM ツリーを操作するための多くのメソッドとプロパティがあります、しかし、JavaScriptに最適なもんではありません。
これには、歴史的理由があります。DOMはJavaScriptのためだけにデザインされたのではありません。
それは、言語によらないインターフェースを定義しようとしています、
つまり、HTMLだけでなくXMLなどの他のシステムでも使えるようにです。

HTML5は、DOM APIの中にではないが、JavaScript プログラマにとって有益な追加がおこなわれメソッドにして "selector API" などです

#### Accessing HTML elements

##### 1 - With the selector API (recommended)
W3Cが開発した、セレクタAPIは、標準的なCSSセレクタの疑念を使いDOMの中の要素に簡単にアクセスする方法であり、それをブラウザ開発者は、新しいブラウザに導入しました。

__The querySelector(CSSSelector) and querySelectorAll(CSSSelector) methods__
これらのメソッドは、jQueryに負うところが大きい。ｊQueryが何年も前に導入した、CSSセレクタを使う方法です。

CSS セレクタをメソッドに引数として渡すことができます

<ul class="collection">
    <li class="collection-item">
    querySelector(selector)は、selectorに合ったDOM内の最初の要素を返します、その間、その要素を扱うことができます。
    </li>
    <li class="collection-item">
    querySelectorAll(selector) は、selector に適合するすべての要素のコレクションを返します。
    その結果を処理するために、コレクションの中の要素ひとつづつにアクセスする必要があります
    </li>
</ul>

##### 2 - With the DOM API (old fashioned)

DOM APIにあるメソッドは、すべて querySelector と querySelectorAll メソッドに 置き換えできます。
今も多くのJavaScriptアプリケーションで使われていますし、とても分かりやすいものです。

<ul class="collection">
    <li class="collection-header">
    <strong>
    document.getElementById(identifier) は id “identifier”　を持つ要素を返します
    </strong></li>
    <li class="collection-item">
        <ul class="collection">
            <li class="collection-item">
            This is equivalent to document.querySelector("#identifier'); (just add a # before the id when using a CSS selector). </li>
            <li class="collection-item">
            Example: var elm = document.getElementById('myDiv'); is equivalent to document.querySelector('#myDiv');</li>
        </ul>
    </li>
    <li class="collection-header">
    <strong>
    document.getElementsByTagName(tagName) は、“tagName”の名がついた、要素のリストを返します。
    </strong></li>
    <li class="collection-item">
        <ul class="collection">
            <li class="collection-item">
            This is equivalent to document.querySelectorAll(tagName);</li>
            <li class="collection-item">
            Example: var list = document.getElementByTagName('img'); is equivalent to document.querySelector('img');</li>
        </ul>
    </li>
    <li class="collection-header">
    <strong>
    document.getElementsByClassName(className) は、クラス“className”の要素のリストを返します。
    </strong></li>
    <li class="collection-item">
        <ul class="collection">
            <li class="collection-item">
            This is equivalent to document.querySelectorAll('.className'); </li>
            <li class="collection-item">
            Example: var list = document.getElementByClassName('important'); is equivalent to document.querySelector('.important'); (just add a '.' before the class name when using a CSS selector).</li>
        </ul>
    </li>
</ul>

注 identifier, tagName と className は文字列型でなくてはならない。 

#### Changing the style of selected HTML elements
##### The style attribute: how to modify an HTML element's CSS properties from JavaScript
DOMやセレクタAPIを使って、選択した要素のCSSスタイルを変更する一般的な方法は、スタイル属性を使うものです。

使い方:
{% highlight javascrit linenos %}
// select the paragraph with id = "paragraph1"
var p = document.querySelector('#paragraph1');
 
// change its color
p.style.color = 'red';
{% endhighlight %}

注意: スタイル属性を使えば、CSSプロパティを変更できるし（読むことも）できます、
しかし、注意が必要です： 文法が少し違っています、なぜなら JavaScriptの"-" 算術演算子だからです。
CSSでは複数の単語からできているプロパティ名を分割するのに使われて、background-colorのように。

JavaScriptから、このようなプロパティを使う簡単なルール:
<ul class="collection">
    <li class="collection-item">
    1. "-" 符号を取り去る
    </li>
    <li class="collection-item">
    2. "-" 符号の後の単語の最初の文字を大文字にする
    </li>
</ul>

__例:__

<ul class="collection">
    <li class="collection-item">
    text-align becomes style.testAlign
    </li>
    <li class="collection-item">
    margin-left becomes style.marginLeft
    </li>
    <li class="collection-item">
    etc.
    </li>
</ul>

最も役に立つCSSプロパティ
<ul class="collection">
    <li class="collection-item">
    color: changing the color of the text content of selected element(s),
    </li>
    <li class="collection-item">
    background-color: same but this time the background color,
    </li>
    <li class="collection-item">
    margin and padding properties (external and internal margins), including their variants: margin-left, margin-top, margin-right, margin-bottom, also padding-left, etc.
    </li>
    <li class="collection-item">
    border and border-radius: change the border, type (plain, dashed), color, thickness, rounded corners etc.
    </li>
    <li class="collection-item">
    box-shadow to add shadows to selected elements, 
    </li>
    <li class="collection-item">
    font, font-style: font characters and style (italic, bold, plain)
    </li>
    <li class="collection-item">
    text-align (centered, etc.)
    </li>
</ul>

__例__

<button class="btn" onclick="changeCSSStyle();">Change different properties of the paragraphs, using the style attribute</button>
  <br>
<div id="firstDiv">
  <p id="p1">Paragraph 1.</p>
  <p id="p2">Paragraph 2.</p> 
  <p id="p3">Paragraph 3.</p>
  <p id="p4">Paragraph 4.</p>
  <p id="p5">Paragraph 5.</p>
  <p id="p6">Paragraph 6.</p>

</div>

##### Using the ClassList interface to change more than one CSS property simultaneously
今まで、HTML要素の CSSクラスを操作することは、少しだけ複雑でした、例えば、要素にクラス名が存在しているか確認したり、要素にクラスを追加したり、取り除いたりなどです

クラスリスト・インターフェースはそれらすべてを簡単にしてくれます、
コンテナオブジェクトのように働いてくれるし、コンテンツを操作するメソッドを提供してくれます。

クラスリストのプロパティは HTML要素に対応していて、クラス名のコレクションを返します。
{% highlight javascript linenos %}
var elem= document.querySelector("#id1");
 
var allClasses = elem.classList;
{% endhighlight %}

__The classList API__

クラスリスト　オブジェクトで使えるメッソドには add(), remove(), toggle() と contains()があります。
{% highlight javascript linenos %}
// By default, start without a class in the div: <div class=""/>
// Set "foo" as the class by adding it to the classList
div.classList.add('foo'); // now <div class="foo"/>
// Check that the classList contains the class "foo"
div.classList.contains('foo'); // returns true
// Remove the class "foo" from the list
div.classList.remove('foo'); // now <div class=""/>
// Check if classList contains the class "foo"
div.classList.contains('foo'); // returns false: "foo" is gone
// Check if class contains the class "foo",
// If it does, "foo" is removed, if it doesn't, it's added
div.classList.toggle('foo'); // class set to <div class="foo"/>
div.classList.toggle('foo'); // class set to <div class=""/>
{% endhighlight %}

<button class="btn" onclick="displayListOfCheckedItems();">Show Checked items</button>
  <button class="btn" onclick="reset();">Reset list</button>
  <br>
<ul id="fruits">
    <li>
       <input type="checkbox" name="fruit" value="apples" id="fruit1">
       <label for="fruit1">Apples</label>
    </li>
    <li>
       <input type="checkbox" name="fruit" value="oranges" id="fruit2">
        <label for="fruit2">Oranges</label>
    </li>
    <li>
       <input type="checkbox" name="fruit" value="bananas" id="fruit3">   
        <label for="fruit3">Bananas</label>
    </li>
    <li>
       <input type="checkbox" name="fruit" value="grapes" id="fruit4">
        <label for="fruit4">Grapes</label>
    </li>
</ul>

&lt;input type="checkbox"> の要素がチェックされたとき、 &lt;li>の親に 背景色、境界線、を与えたり、文字の色を変更するためにCSSのクラス名"checked"を使います:

CSS code:
{% highlight css linenos %}
.checked {
    border: 2px dashed #000;
    background-color: yellow;
    color:blue;
}
{% endhighlight %}
... そして classList.add(CSS_class) and classList.remove(CSS_class) メソッドを &lt;li>要素に対して使います:

JavaScript code:
{% highlight javascript linenos %}
function displayListOfCheckedItems() {
  // all inputs that have been checked
  var listOfSelectedValues="";
  var list = document.querySelectorAll("#fruits input:checked");
  list.forEach(function(elm) {
    listOfSelectedValues += elm.value + " ";
    // get the li parent of the current selected input
    var liParent = elm.parentNode;
    // add the CSS class .checked
    liParent.classList.add("checked");
  });
  document.body.append("You selected: " + listOfSelectedValues);
}
 
function reset() {
  var list = document.querySelectorAll("#fruits input");
  list.forEach(function(elm) {
    // uncheck
    elm.checked = false;
    // remove CSS decoration
    var liParent = elm.parentNode;
    liParent.classList.remove("checked");
  });
}
{% endhighlight %}

------

### Changing the content of selected HTML elements
#### Modifying selected HTML elements
##### Properties that can be used to change the value of selected DOM node

__Using the innerHTML property__

このプロパティは、要素のテキスト・コンテンツの変更に使用したり、HTML要素の中に、別の要素の塊を挿入するのに使えます。

使い方:
{% highlight javascript linenos %}
var elem = document.querySelector('#myElem');
 
elem.innerHTML = 'Hello '; // replace content by Hello
 
elem.innerHTML += '<b>Michel Buffa</b>', // append at the end
                                         // Michel Buffa in bold
 
elem.innerHTML = 'Welcome' + elem.innerHTML; // insert Welcome
                                             // at the beginning
 
elem.innerHTML = ''; // empty the elem
{% endhighlight %}    

__Using the textContent property__

テキストを持っている選択された nodes/elements において、そのテキスト値プロパティを使ってテキストの内容を読み取ったり、変更したりします。 

### Open the console and look at the JavaScript code!
<p id="first">first paragraph</p>
<p id="second"><em>second</em> paragraph</p>

Extract from the HTML code:
{% highlight html linenos %}
<p id="first">first paragraph</p>
<p id="second"><em>second</em> paragraph</p>
{% endhighlight %}

JavaScript code: the comments after lines that start with console.log correspond to what is printed in the devtool debug console. Notice the difference between the textNode value and the innerHTML property values at lines 13-14: while textValue returns only the text inside the second paragraph, innerHTML also returns the <em>...</em> that surrounds it. However, when we modify the textContent value, it also replaces the text decoration (the <em> is removed), this is done at lines 16-20.

{% highlight javascript linenos %}
window.onload = init;
 
function init() {
   // DOM is ready
   var firstP = document.querySelector("#first");
   console.log(firstP.textContent); // "first paragraph"
   console.log(firstP.innerHTML);   // "first paragraph"
 
   firstP.textContent = "Hello I'm the first paragraph";
   console.log(firstP.textContent); // "Hello I'm the first paragraph"
                                     
   var secondP = document.querySelector("#second");
   console.log(secondP.textContent); // "second paragraph"
   console.log(secondP.innerHTML);   // "<em>second</em> paragraph"
   secondP.textContent = "Hello I'm the second paragraph";
   console.log(secondP.textContent); // "Hello I'm the second
                                     // paragraph"
   console.log(secondP.innerHTML);   // "Hello I'm the second
                                     // paragraph"
}
{% endhighlight %}

__Changing the attributes of selected elements__

It's very common to modify the attributes of selected elements: the width of an image, CSS style with the style attribute, value of an input field, etc.

### Try these
<p>What is your name: <input type="text" id="name" value="Michel"> 
    <button class="btn" onclick="resetName();">Reset (click to empty the input field)</button>
</p>
<p>Pick a color: <input id="color" type="color" value='#FF0000'>
    <button class="btn" onclick="setToGreen();">Set color chooser to green</button>
</p>
<p>In the next example, click on the input field and use the small vertical arrows to increase the value. Notice that the numbers go 1 by 1 and that the maximum value is 20. Then click the button and do the same thing!
</p>
<p>Pick a number between 0 and 20: <input id="number" type="number" min="0" max="20" step = "1" value='10'>
    <button  class="btn" onclick="changeStep();">Change step and max attribute values </button>
</p>
<p>Click the next image to change its url and size:</p>
<img src="https://www.paris-web.fr/2013/assets_c/2013/08/michel-buffa-thumb-143x143-372.jpg" onclick="changeAndResize(this)" alt="Michel Buffa">
{% highlight javascript linenos %}
function resetName() {
  var inputField = document.querySelector("#name");
  inputField.value = "";
}

function setToGreen() {
  var colorChooser = document.querySelector("#color");
  colorChooser.value = "#00FF00";
}

function changeStep() {
  var number = document.querySelector("#number");
  number.value = 10;
  number.step = "0.1";
  number.max = 11;
}

function changeAndResize(img) {
    img.src="https://pbs.twimg.com/profile_images/110455194/n666194627_2302_400x400.jpg";
  img.width=250;
  img.style.border = "4px solid red";
}
{% endhighlight %}

------

### Adding new elements to the DOM
#### Adding new elements to the DOM
DOM API には、 DOM要素に使えるメソッドがあります

一般に、DOMに新しいノードを追加するには:
<ul class="collection">
    <li class="collection-item">
    1. createElement()メソッドを呼び出して新しい要素を作成します:
    {% highlight javascript linenos %}
    var elm = document.createElement(name_of_the_element).
{% endhighlight %}
    例:
    {% highlight javascript linenos %}
    var li = document.createElement('li');
    var img = document.createElement('img'); etc.
{% endhighlight %}
    </li>
    <li class="collection-item">
    2. この要素に、属性/値/スタイルを設定する
    <br>
    例:
    {% highlight javascript linenos %}
    li.innerHTML = '<b>This is a new list item in bold!</b>'; // can add HTML in it
    li.textContent = 'Another new list item';
    li.style.color = 'green'; // green text
    img.src = "http://..../myImage.jpg"; // url of the image
    img.width = 200;
{% endhighlight %} 
    </li>
    <li class="collection-item">
    3. DOMにすでにある要素に新しく作成した要素を追加するのに append(), appendChild(), insertBefore() または innerHTML プロパティを使います
    <br>
    例:
    {% highlight javascript linenos %}
    var ul = document.querySelector('#myList');
    ul.append(li); // insert at the end, appendChild() could also be used (old)
    ul.prepend(li); // insert at the beginning
    ul.insertBefore(li, another_element_child_of_ul);// insert in the middle
    document.body.append(img); // adds the image at the end of the document
{% endhighlight %}
    </li>
</ul>

##### A warning about append vs appendChild, prepend, etc...

DOM の仕様には最近 jQueryの様なメソッドが追加されました、
それらは、jQuery Library(DOM操作を簡単にするためにだいぶ前にデザインされた)によって提案されてきたものと似ています。

長い間、開発者は document.appendChild を使い DOMに要素を追加しています。
今では より短い document.append　を使えます、ほかにも document.prepend などなど。
これらすべてのメソッドは、最近のブラウザでサポートされていますが、Microsoft Edge はまだです(but support is coming soon). See this table for compatibility.

In the course, we recommend that you use document.append, but if you are looking for maximum compatibility, you can either use document.appendChild instead of document.append (just search and replace all occurrences of document.append with document.appendChild in the examples), or add to your JavaScript code this polyfill.

Just copy and paste the 10 lines of JavaScript from the polyfill to your code and append will work on browsers that do not yet implement it.

Here is an example in JsBin that uses all these new methods, and that includes the polyfill for append and prepend at the end of the JavaScript code.

##### Example 1: use of the createElement(), append() methods and of the textContent attribute:

<div class="row">
    <div class="col s12 m8">
{% highlight html linenos %}
<label for="newNumber">Please enter a number</label>
<input type="number" id="newNumber" value=0>
<button onclick="add();">Add to the list</button>
<br>
<button onclick="reset();">Reset list</button>
<p>You entered:</p>
<ul id="numbers"></ul>    
{% endhighlight %} 
{% highlight javascript linenos %}
function add() {
  // get the current value of the input field
  var val = document.querySelector('#newNumber').value;
  if((val !== undefined) && (val !== "")) {
    // val exists and non empty
    // get the list of numbers. It's a <ul>
    var ul = document.querySelector("#numbers");
    // add it to the list as a new <li>
    var newNumber = document.createElement("li");
    newNumber.textContent = val;
    // or newNumber.innerHTML = val
    ul.append(newNumber);
  }
}
 
function reset() {
  // get the list of numbers. It's a <ul>
  var ul = document.querySelector("#numbers");
  // reset it: no children
  ul.innerHTML = ""; 
}
{% endhighlight %}
    </div>
    <div class="col s12 m4">
        <div class="row">
            <div class="col s6">
                <label for="newNumber"><h6>Please enter a number</h6></label>
            </div>
            <div class="col s2">
                <input type="number" id="newNumber" value='0'>
            </div>
            <div class="col s4">
                <button class="btn" onclick="add();">Add to the list</button>
            </div>
        </div>
        <br>
        <button class="btn" onclick="reset2();">Reset list</button>
        <p>You entered:</p>
        <ul id="numbers"></ul>
    </div>
</div>

##### Example 2: using the innerHTML property to add new elements
This is the same example, but in an abbreviated form, using the innerHTML property:

<div class="row">
    <div class="col s6 m4">
<label for="newNumber3"><h6>Please enter a number</h6></label>
    </div>
    <div class="col s6 m4">
  <input type="number" id="newNumber3" value='0'>
    </div>
    <div class="col s6 m4">
  <button class="btn" onclick="add()3">Add to the list</button>
    </div>
</div>
  <br>
  <button class="btn" onclick="reset3();">Reset list</button>

<p>You entered:</p>
<ul id="numbers3"></ul>

{% highlight javascript linenos %}
function add() {
  // get the current value of the input field
  var val = document.querySelector('#newNumber').value;
  
  if((val !== undefined) && (val !== "")) {
    // val exists and non empty
    
    // get the list of numbers. It's a <ul>
    var ul = document.querySelector("#numbers");
     
    ul.innerHTML += "<li>" + val + "</li>";
  }
}

function reset() {
  document.querySelector("#numbers").innerHTML = "";
}
{% endhighlight %}

-----------

### Moving HTML elements in the DOM
#### Moving DOM elements within a document

The append(), appendChild() methods normally adds  a new element to an existing one, as shown in this example:
{% highlight javascript linenos %}
var li = createElement('li');
ul.append(li); // adds the new li to the ul element
{% endhighlight %}

一つ知っておいてください、新しい要素を作成するのではなく、ほかのどこかから取ってくるとしたら、
つまり、その要素の親から削除して、新しい親に追加するのです。

言い換えれば、オリジナルの位置から、ターゲット要素の子供になるため移動するということです。

##### Let's see a very simple example:
<p>Click on a browser image to move it to the list of cool browsers:</p><br/>
  <img src="http://mainline.i3s.unice.fr/mooc//ABiBCwZ.png" id="cr" 
       onclick="move(this)" alt="Logo Chrome">
  <img src="http://mainline.i3s.unice.fr/mooc//n7xo93U.png" id="ff" 
       onclick="move(this)" alt="Logo Firefox">
  <img src="http://mainline.i3s.unice.fr/mooc//ugUmuGQ.png" id="ie" 
       onclick="move(this)" alt="Logo IE">
  <img src="http://mainline.i3s.unice.fr/mooc//jfrNErz.png" id="op" 
       onclick="move(this)" alt="Logo Opera">
  <img src="http://mainline.i3s.unice.fr/mooc//gDJCG0l.png" id="sf" 
       onclick="move(this)" alt="Logo Safari"><br/>
  <div class="row">
    <div class="box col s12 m8" id="coolBrowsers">
      <p>Cool Web browsers</p>
    </div>
  </div>     
{% highlight javascript linenos %}
function move(elem) {
  var targetList = document.querySelector('#coolBrowsers');
  targetList.append(elem);
  
  /* trick to remove the click listener once
   the image has been moved into the list */
  elem.onclick = null;
}
{% endhighlight %}

##### Another, more significant example, that also uses drag'n'drop

 要素を移動するのに　append() をどう使うかを紹介します、

 ユーザが要素をのドラッグを開始すると、 drag() JavaScript 関数が呼ばれます。
 この関数のなかで、drag'n'drop clipboard を使い、ドラッグされているイメージの id を保存します。

イメージがドロップされると、drop() メソッドが呼ばれます。 drop event listener が2つの div要素に定義されていますから、ターゲットとなる div要素の上で、append()を呼ぶだけで、そのdivにドラッグしてきたイメージを追加し、元の場所からそのイメージを削除します。

<p id="text" ondragstart="drag(this, event)">Drag and drop browser images in a zone:</p><br/>
  <img src="http://mainline.i3s.unice.fr/mooc/ABiBCwZ.png" id="cr2" 
       ondragstart="drag(this, event)" alt="Logo Chrome">
  <img src="http://mainline.i3s.unice.fr/mooc/n7xo93U.png" id="ff2" 
       ondragstart="drag(this, event)" alt="Logo Firefox">
  <img src="http://mainline.i3s.unice.fr/mooc/ugUmuGQ.png" id="ie2" 
       ondragstart="drag(this, event)" alt="Logo IE">
  <img src="http://mainline.i3s.unice.fr/mooc/jfrNErz.png" id="op2" 
       ondragstart="drag(this, event)" alt="Logo Opera">
  <img src="http://mainline.i3s.unice.fr/mooc/gDJCG0l.png" id="sf2" 
       ondragstart="drag(this, event)" alt="Logo Safari"><br/>
<div class="row">
  <div class="box col" ondragover="return false" ondrop="drop(this, event)">
      <p>Cool Web browsers</p>
  </div>
</div>
  
  <div class="row">
  <div class="box col" ondragover="return false" ondrop="drop(this, event)">
      <p>Web browsers from the 90's</p>
  </div>

  </div>     
{% highlight javascript linenos %}
function drag(target, evt) {
    // When dragged, copy into the drag'n'drop clipboard
    // the id of the dragged elem (it's target.id)
        evt.dataTransfer.setData("browser", target.id);
    }

function drop(target, evt) {
    // get the id of the element being dragged
        var id = evt.dataTransfer.getData("browser");
  
        target.appendChild(document.getElementById(id));
      // prevent default behavior
      evt.preventDefault();
}
{% endhighlight %}

--------

### Removing elements from the DOM
##### Removing elements using the removeChild() method

チェックした要素をリストから取り除く例です

 <button class="btn" onclick="removeSelected2();">Remove selected items</button>
 <button class="btn" onclick="reset4();">Reset in initial configuration</button>
<ul id="fruits2">
    <li>
       <input type="checkbox" name="fruit" value="apples" id="fruit5">
       <label for="fruit5">Apples</label>
    </li>
    <li>
       <input type="checkbox" name="fruit" value="oranges" id="fruit6">
        <label for="fruit6">Oranges</label>
    </li>
    <li>
       <input type="checkbox" name="fruit" value="bananas" id="fruit7">   
        <label for="fruit7">Bananas</label>
    </li>
    <li>
       <input type="checkbox" name="fruit" value="grapes" id="fruit8">
        <label for="fruit8">Grapes</label>
    </li>
</ul>

JavaScript code extract: we need to get the <ul> that contains all the <li><input type="checkbox"></li> elements (line 3). This is the element we will use for calling removeChild(...). The loop on the checked element (lines 5-12) iterates on a list of checked input elements. In order to make both the text (Apples, Oranges, etc.) AND the checkbox disappear, we need to access the different <li> elements that contain the selected checkboxes. This is done in line 10. Then, we can call ul.removeChild(li) on the <ul> for removing the <li> that contains the selected element (line 11). 
{% highlight javascript linenos %}
function removeSelected() {
  var list = document.querySelectorAll("#fruits input:checked");
  var ul = document.querySelector("#fruits");
  list.forEach(function(elm) {
    // elm is an <input type="checkbox">, its parent is a li
    // we want to remove from the <ul> list
    // when we remove the <li>, the <input> will also
    // be removed, as it's a child of the <li>
    var li = elm.parentNode;
    ul.removeChild(li);
  });
}
{% endhighlight %}
innerHTML プロパティを使い、要素の子要素すべてを取り除きます

同じ例で reset() JavaScript 関数を見てください　ulの innerHTML プロパティがリストを空にする場合  (lines 3-4) と ul に最初の HTML コード (lines 6-17)を追加するのに使われています:
{% highlight javascript linenos %}
function reset() {
  var ul = document.querySelector("#fruits");
  // Empty the <ul>
  ul.innerHTML = "";
  // Adds each list item to the <ul> using innerHTML += ...
  ul.innerHTML += "<li><input type='checkbox' name='fruit'   
                   value='apples'>Apples</li>";
 
  ul.innerHTML += "<li><input type='checkbox' name='fruit' 
                   value='oranges'>Oranges</li><br>";
 
  ul.innerHTML += "<li><input type='checkbox' name='fruit'
                   value='bananas'>Bananas</li><br>";
 
  ul.innerHTML += "<li><input type='checkbox' name='fruit'
                   value='grapes'>Grapes</li>";
{% endhighlight %}                   
<script>
function changeCSSStyle(id) {
  var p = document.querySelector("#p1");

  p.style.color = 'red';
  p.innerHTML = 'style.color used to change the color';

  p = document.querySelector("#p2");

  p.style.backgroundColor = 'lightGreen';
  p.innerHTML = 'style.backgroundColor used';

  p = document.querySelector("#p3");

  p.style.marginLeft = '100px';
  p.innerHTML = 'style.leftMargin used to shift this paragraph 100px to the right';
  
  p = document.querySelector("#p4");

  p.style.border = '2px solid blue';
  p.style.padding = "20px";
  p.innerHTML = 'style.border and style.padding (internal margins) used';


  p = document.querySelector("#p6");

  p.style.textAlign = 'center';
  p.style.border = "1px dashed red";
  /* for boxShadow: h-shadow v-shadow blur spread color*/
  p.style.boxShadow = "2px 2px 5px 0px grey";
  p.innerHTML = 'style.textAlign, style.border, style.bowShadow used';

}

function displayListOfCheckedItems() {
  /* all inputs that have been checked*/
  var listOfSelectedValues="";
  var list = document.querySelectorAll("#fruits input:checked");
  list.forEach(function(elm) {
    listOfSelectedValues += elm.value + " ";
    /* get the li parent of the current selected input*/
    var liParent = elm.parentNode;
    /* add the CSS class .checked*/
    liParent.classList.add("checked");
  });
  document.body.append("You selected: " + listOfSelectedValues);
}
 
function reset() {
  var list = document.querySelectorAll("#fruits input");
  list.forEach(function(elm) {
    /* uncheck*/
    elm.checked = false;
    /* remove CSS decoration*/
    var liParent = elm.parentNode;
    liParent.classList.remove("checked");
  });
}

window.onload = init;

function init() {
  /* DOM is ready */
  var firstP = document.querySelector("#first");
  console.log(firstP.textContent);
  console.log(firstP.innerHTML);

  firstP.textContent = "Hello I'm the first paragraph";
  console.log(firstP.textContent);

  var secondP = document.querySelector("#second");
  console.log(secondP.textContent);
  console.log(secondP.innerHTML);
  
  secondP.textContent = "Hello I'm the second paragraph";
  console.log(secondP.textContent);
  console.log(secondP.innerHTML);
}

function resetName() {
  var inputField = document.querySelector("#name");
  inputField.value = "";
}

function setToGreen() {
  var colorChooser = document.querySelector("#color");
  colorChooser.value = "#00FF00";
}

function changeStep() {
  var number = document.querySelector("#number");
  number.value = 10;
  number.step = "0.1";
  number.max = 11;
}

function changeAndResize(img) {
    img.src="https://pbs.twimg.com/profile_images/110455194/n666194627_2302_400x400.jpg";
  img.width=250;
  img.style.border = "4px solid red";
}

function add() {
  /* get the current value of the input field*/
  var val = document.querySelector('#newNumber').value;
  if((val !== undefined) && (val !== "")) {
    /* val exists and non empty
    // get the list of numbers. It's a <ul>*/
    var ul = document.querySelector("#numbers");
    /* add it to the list as a new <li>*/
    var newNumber = document.createElement("li");
    newNumber.textContent = val;
    /* or newNumber.innerHTML = val*/
    ul.append(newNumber);
  }
}
 
function reset2() {
  /* get the list of numbers. It's a <ul>
  var ul = document.querySelector("#numbers");
  // reset it: no children
  ul.innerHTML = ""; 
}

function add3() {
  /* get the current value of the input field */
  var val = document.querySelector('#newNumber3').value;
  
  if((val !== undefined) && (val !== "")) {
    /* val exists and non empty */
    
    /* get the list of numbers. It's a <ul> */
    var ul = document.querySelector("#numbers3");
     
    ul.innerHTML += "<li>" + val + "</li>";
  }
}

function reset3() {
  document.querySelector("#numbers3").innerHTML = "";
}

function move(elem) {
  var targetList = document.querySelector('#coolBrowsers');
  targetList.append(elem);
  
  /* trick to remove the click listener once
   the image has been moved into the list */
  elem.onclick = null;
}
function drag(target, evt) {
    // When dragged, copy into the drag'n'drop clipboard
    // the id of the dragged elem (it's target.id)
        evt.dataTransfer.setData("browser", target.id);
    }

function drop(target, evt) {
    // get the id of the element being dragged
        var id = evt.dataTransfer.getData("browser");
  
        target.appendChild(document.getElementById(id));
      // prevent default behavior
      evt.preventDefault();
}
function removeSelected2() {  
  var list = document.querySelectorAll("#fruits2 input:checked"); 
  var ul = document.querySelector("#fruits2");
  
  list.forEach(function(elm) {
    /* elm is an <input type="checkbox">, its parent is a li
       we want to remove from the <ul> list
       when we remove the <li>, the <input> will also
       be removed, as it's a child of the <li> */
    var li = elm.parentNode;
    ul.removeChild(li);
  });
}

function reset4() {
  var ul = document.querySelector("#fruits2");
  /* Empty the <ul> */
  ul.innerHTML = "";
  
  /* Adds each list item to the <ul> using innerHTML += ... */
  ul.innerHTML += "<li><input type='checkbox' name='fruit' value='apples' id='fruit5'><label for='fruit5'>Apples</label></li>";

  ul.innerHTML += "<li><input type='checkbox' name='fruit' value='oranges' id='fruit6'><label for='fruit6'>Oranges</label></li>";

  ul.innerHTML += "<li><input type='checkbox' name='fruit' value='bananas' id='fruit7'><label for='fruit7'>Bananas</label></li>";

  ul.innerHTML += "<li><input type='checkbox' name='fruit' value='grapes' id='fruit8'><label for='fruit8'>Grapes</label></li>";
}
</script>