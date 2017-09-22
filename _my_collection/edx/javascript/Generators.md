---
layout: post
title: Generators
date: 2017-07-12 10:00:00 +900
subject: javascript
description:
  edx's course by Microsoft.
  Asyncronous programming with JavaScript course.  
---

-------
#### Introduction to Generator Functions
##### Introduction to Generators

__What are Generators?__

ジェネレータは関数であり、一時停止や再開ができる。
ジェネレータは停止中に値を送信できる、再開するときに値を受け取ることができる

__Why are Generators important?__

ジェネレータが重要なのは、非同期関数を、普通の同期関数と同じように欠けるということです。

#### Creating a Generator Function
##### Creating a Generator Function

Sample code of a Generator function:
{% highlight javascript linenos %}
function* genFunc() {
    yield 'a';
    yield;
    yield 123;

    return "finished";
}
{% endhighlight %}

__Function* Keyword__

ジェネレータ関数は一般の関数と似ていますが、functionキーワードの末尾にアスタリスク(*)をつけるという違いがあります。
この文法は、ほかの言語のポインタ表記と同じように見えますが関係はありません。

Notice how the function* keyword is used the declare a Generator function:
{% highlight javascript linenos %}
function* genFunc() { //notice the function* keyword

}
{% endhighlight  %}

__Yield Keyword__

__yield__　キーワードは、ジェネレータを一時停止するために使います。
__yield__　キーワードは、入力を受け取るため、またジェネレータから出力を送信するためにも使います。

Notice how the yield keyword is used to pause and send several different types of output from the Generator function:

{% highlight javascript linenos %}
    yield 'a'; //pauses the generator and sends out a value of 'a'
    yield;     //pauses the generator and sends out an undefined value
    yield 123; //pauses the generator and sends out a value of 123
{% endhighlight %}

__Return Value__

ジェネレータ関数は、オプションとして戻り値があります。
戻り値をつけない場合には undefined 値が戻るのと同じことです。
ジェネレータ関数の戻り値は、使われないこともしばしばです。

Notice the return value of the Generator function:
{% highlight javascript linenos %}
    return "finished"; //return value of "finished"
{% endhighlight  %}    

#### Creating and Iterating through a Generator Object
##### Iterating through a Generator Object

##### Creating a Generator Object

ジェネレータ　オブジェクトはジェネレータ関数を呼び出し、そこから戻ってくるもの。
ジェネレータオブジェクトとジェネレータ関数を混同しないことが稚拙です。

Notice how a Generator Object is created by calling a Generator function:
{% highlight javascript linenos %}
function* genFunc() {
    console.log("started");
    yield 'a';
    console.log("passed first yield");
    yield;
    console.log("passed second yield");
    yield 123;
    console.log("passed third yield");

    return "finished";
}

var genObject = genFunc(); //creates a generator object called genObject
{% endhighlight %}

##### Iterating through a Generator Object with next()

ジェネレータ　オブジェクトは、イテレータ　プロトコルに従っている、
next()メソッドを用い順次処理を行える。

ジェネレータ関数は、まずは停止している、そして最初の __next()__ を呼び出すことで、
そのジェネレータ関数は動き出します。
そのジェネレータ関数は、__yield__ キーワードに突き当たるまで実行され、
そして停止します。
その次の、 __next()__ 呼び出しでジェネレータ関数は再開し、__yield__ キーワードが出現するまで動作します。

__next()__ メソッドは２つのプロパティを持つオブジェクトを返します。:
<ul class="collection">
    <li class="collection-item">
    done - 真偽値で、ジェネレータ関数がすべての yield文を処理したか、または、すでに返されたかを示します。
    </li>
    <li class="collection-item">
    value - 最後に実行された yield文に関連付けされた値。
    </li>
</ul>

Notice how the next() method is used to iterate through all of the yield statements:
{% highlight javascript linenos %}
var a = genObject.next(); // Object {value: 'a', done: false}
//console.log("started");

var b = genObject.next(); // Object {value: undefined, done: false}
//console.log("passed first yield");

var c = genObject.next(); // Object {value: 123, done: false}
//console.log("passed second yield");
{% endhighlight %}

__next()__ ですべての __yield__ 文が処理された後、
次に来る __next()__ 呼び出しはジェネレータ関数の　__戻り値__　と同じ値プロパティと trueに設定された
__done__ プロパティを持つオブジェクトを返します。
ジェネレータ関数に return文が書かれていない場合は、 __value__ プロパティは undefined となります。
返されたオブジェクトの一つの __done__ プロパティが true となった後は、
次に来る __next()__ 呼び出しは、undefined の value プロパティと true の done プロパティを持つオブジェクトを返いsます。
__return__ 文以後の yield文は無視されます。

Notice how additional calls to next() behave:
{% highlight javascript linenos %}
var d = genObject.next(); // Object {value: "finished", done: true} <-- value property takes the return value of genFunc()
//console.log("passed third yield");

var e = genObject.next(); // Object {value: undefined, done: true} <-- additional next() calls return this
{% endhighlight %}

#### Throwing Errors Inside a Generator Function
##### Throwing Errors from within a Generator Function

ジェネレータ関数内でエラーに遭遇したら、エラーのあった next() 呼び出しによってエラーが投げられます。
エラーを投げる next() 呼び出しは、undefined 値を返し、エラー後に続く yield文は無視されます。
エラー後の next() 呼び出もまあた、undefined 値を返します。

Notice the affects of throwing an error within a Generation function:

{% highlight javascript linenos %}
function* genFunc() {

    yield 'a';
    yield 'b';
    throw new Error("error thrown by genFunc()!");
    yield 'c';
    yield 'd';

}

var genObject = genFunc();

try{
    var a = genObject.next(); // Object {value: 'a', done: false}
    var b = genObject.next(); // Object {value: 'b', done: false}
    var c = genObject.next(); // undefined <-- since an uncaught error was thrown, the generator function terminated
    //console.log("error thrown by genFunc()!") occurs
    var d = genObject.next(); // undefined <-- other yield statements are ignored after the error
}
catch(e){
  console.log(e.message);
}
{% endhighlight %}

#### Yielding to other Generators
##### Yielding to other Generators

__Yield* Keyword__

yield* キーワードは、ジェネレータ関数内で別のジェネレータ関数を呼ぶために使われます。

Notice how the yield* statement is used to call genFuncA() within genFuncB():

{% highlight javascript linenos %}
function* genFuncA() {
    yield 'a';
    yield 'b';
    yield 'c';

    return "done with genFuncA()!"

}

function* genFuncB(){
    yield 1;
    yield* genFuncA(); // contains iterable [a,b,c]
    yield 2;
    yield 3;

    return "done with genFuncB()!";
}

var genObject = genFuncB();

var a = genObject.next(); //Object {value: 1, done: false}
var b = genObject.next(); //Object {value: 'a', done: false}
var c = genObject.next(); //Object {value: 'b', done: false}
var d = genObject.next(); //Object {value: 'c', done: false}
var e = genObject.next(); //Object {value: 2, done: false}
var f = genObject.next(); //Object {value: 3, done: false}
var g = genObject.next(); //Object {value: "done with genFuncB()!", done: true}
{% endhighlight %}

yield* 文は、繰返し要素のリストに、ジェネレータ関数の戻り値を付け加えません。
その代わり、戻り値は、 yield*文の戻り値によってアクセスされます。

Notice how the yield* genFuncA() statement returns the return value of genFuncA():

{% highlight javascript linenos %}
function* genFuncA() {
    yield 'a';
    yield 'b';

    return "done with genFuncA()!"

}

function* genFuncB(){
    yield 1;
    var returnVal = yield* genFuncA(); // contains iterable list [a,b] and returns with value "done with genFuncA()!"
    yield returnVal; // returnVal is equal to"done with genFuncA()
    yield 2;

    return "done with genFuncB()!";
}

var genObject = genFuncB();

var a = genObject.next(); //Object {value: 1, done: false}
var b = genObject.next(); //Object {value: 'a', done: false}
var c = genObject.next(); //Object {value: 'b', done: false}
var d = genObject.next(); //Object {value: "done with genFuncA()!", done: false}
var e = genObject.next(); //Object {value: 2, done: false}
var f = genObject.next(); //Object {value: "done with genFuncB()!", done: true}
{% endhighlight %}

yield* 文は、ジェネレータ関数に付け足された繰返し要素にも使うことgできます

Notice how the yield* statement is used to yield all of the values of in an array:

{% highlight javascript linenos %}
function* genFunc(){
    yield 1;
    yield* [2,3,4]; //the array [2,3,4] is iterable
    yield 5;

}

var genObject = genFunc();

var a = genObject.next(); //Object {value: 1, done: false}
var b = genObject.next(); //Object {value: 2, done: false}
var c = genObject.next(); //Object {value: 3, done: false}
var d = genObject.next(); //Object {value: 4, done: false}
var e = genObject.next(); //Object {value: 5, done: false}
var f = genObject.next(); //Object {value: undefined, done: true}
{% endhighlight %}

#### Sending Input to Generator Functions
##### Sending input using next()

ジェネレータ　オブジェクトの中を繰返していくのに加え、next() はジェネレータ関数に値を送り返すことができます。
このことは、値を引数として next() メソッドに渡すことでできます。
next()メソッド呼び出しに渡されたその値は、結果的に1番最後の yield文の戻り値になります。
最初の next()呼び出しが、ジェネレータ関数を開始するので、最初のnext()メソッドに渡された値は、無視されます。

Notice how the next() method call is used to send values back into the Generator function:

{% highlight javascript linenos %}
function* genFunc(){
    var a = yield;
    console.log(a); //a = 1
    var b = yield;  
    console.log(b); //b = 2
    var c = yield;
    console.log(c); //c = 3

}

var genObject = genFunc();

genObject.next(0); //starts genFunc(), the value inside the next() call is ignored
genObject.next(1); //sends a value of 1 to genFunc()
genObject.next(2); //sends a value of 2 to genFunc()
genObject.next(3); //sends a value of 3 to genFunc()
genObject.next(4); //the value inside next() is ignored because genFunc() has no more yields
{% endhighlight %}
The next() method can also be used to modify the values sent by the yield statement and send them back.

Notice how the next() method is used to obtain values from yield, modify them, and then send them back:
{% highlight javascript linenos %}
function* genFunc(){
    var a = yield 'a';
    console.log(a); // a = 'a!'
    var b = yield 'b';  
    console.log(b); // b = 'B'
    var c = yield 'c';
    console.log(c); // c = 'abc'

}

var genObject = genFunc();

var w = genObject.next(); //starts genFunc(), w = Object {value: 'a', done: false}
var x = genObject.next(w.value + '!'); //sends a value of "a!" to genFunc(), x = Object {value: 'b', done: false}
var y = genObject.next(x.value.toUpperCase()); //sends a value of 'B' to genFunc(), y = Object {value: 'c', done: false}
var z = genObject.next(w.value + x.value + y.value); //sends a value of 'abc' to genFunc(), z = Object {value: 'undefined', done: true}
{% endhighlight %}

#### Other Methods to Iterate
##### Other Methods to Iterate through Generator Objects

__For...Of__

Notice how the For...Of statement is used to iterate through a Generator Object:

{% highlight javascript linenos %}
function* genFunc(){
    yield 'a';
    yield;  
    yield* [1,2,3];
    yield 123;

    return "finished";

}

for (var x of genFunc()){ //for...of statement
    console.log(x);
}
//Outputs:
//'a'
// undefined
// 1
// 2
// 3
// 123
// <-- return value is not outputted
{% endhighlight %}

__Spread Operator (...)__

Notice how the spread operator is used to iterate through a Generator object:

{% highlight javascript linenos %}
function* genFunc(){
    yield 'a';
    yield;  
    yield* [1,2,3];
    yield 123;

    return "finished";

}
var arr = [...genFunc()]; //...spread operator
// arr = ['a',undefined,1,2,3,123]
{% endhighlight %}

__Destructuring__

Notice how the destructuring assignment is used to iterate through a Generator object:

{% highlight javascript linenos %}
function* genFunc(){
    yield 'a';
    yield;  
    yield* [1,2,3];
    yield 123;

    return "finished";

}

var [a,b,c,d,e,f,g] = genFunc(); //destructuring assignment
// a = 'a'
// b = undefined
// c = 1
// d = 2
// e = 3
// f = 123
// g = undefined <-- g is undefined because there are no more yields
{% endhighlight %}

#### Return()
##### Return()

ジェネレータ　オブジェクトは、ジェネレータ関数を終了させる return()メソッドを持ちます。
return()は、return文に1番最後のyield文を実行させます。
return()メソッドには、ジェネレータ関数の戻り値として使われるオプションの変数をとることができます。
return(x)を呼ぶと、value プロパティが x で done プロパティが true のオブジェクトが返ります。
return()が呼ばれた後は、ジェネレータ関数の中の次の yield文は無視されます。

Notice how calling return() affects the generator function:

{% highlight javascript linenos %}
function* genFunc(){
    yield 'a';
    yield 'b'
    yield 'c'
    return "finished";

}

var genObject = genFunc();

var a = genObject.next(); // a = Object {value: 'a', done: false}
var b = genObject.return('return() was called'); // b = Object {value: "return() was called", done: true}
var c = genObject.next(); // c = Object {value: undefined, done: true}
{% endhighlight %}

#### Throwing Errors
##### Throw()

ジェネレータ　オブジェクトには、throw()メソッドがあり、これは1番最後の yield文で起きたエラーを投げます。
throw()メソッドは、1つの引数をとります、それは通常エラーオブジェクトです。

Notice how throw() affects the Generator function:

{% highlight javascript linenos %}
function* genFunc(){

        var a = yield 'a';
        console.log(a); // a = 123
        var b = yield 'b'; //exception is thrown, function exits
        //the code below never occurs because an exception occurred and was uncaught
        console.log(b);
        var c = yield 'c';
        console.log(c);

        return "finished!";

}

var genObject = genFunc();

var w = genObject.next(); // w = Object {value: 'a', done: false}, starts generator function
var x = genObject.next(123); // x = Object {value: 'b', done: false}
var y = genObject.throw(new Error("error thrown!")); // thrown() is called, y = undefined
var z = genObject.next('abc'); // z = undefined
{% endhighlight %}

#### Using Generators with Asynchronous Functions
##### Using Generators with Asynchronous Functions

ジェネレータ関数は、プロミスを返す非同期関数を使うといい感じで機能します。
なぜなら、ジェネレータ関数は、プロミスを生成(yield)でき、非同期にプロミスの結果を処理し、
戻ったプロミスの結果を受け取ることgできるからです。
これは非同期コードを一般の同期関数のようにジェネレータ関数内で書けるということです。

Notice how Promises can be written in a synchronous way inside Generator functions:

{% highlight javascript linenos %}
function* genFunc(){ //looks synchronously written

        var post1title = yield fetch("https://jsonplaceholder.typicode.com/posts/1");
        console.log(post1title);
        //post1title = "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
        var post2title = yield fetch("https://jsonplaceholder.typicode.com/posts/2");
        console.log(post2title);
        //post2title = "qui est esse"


}

var genObject = genFunc(); //creating generator object

var yieldedObject = genObject.next(); //starting generator and returning first yielded object
var promise = yieldedObject.value; //getting promise from value property of the yielded object
promise.then(function(val){ //callback for then() of promise
    return val.json(); //getting json stream from fetch response
}).then(function(val){ //chaining another then()
    var secondYieldedObject = genObject.next(val.title); //sending title back to generator function
                                                         //and receiving second yielded object from generator function
    var secondPromise = secondYieldedObject.value; //getting promise from value property of second yielded object
    secondPromise.then(function(val){ //callback for then() of promise
       return val.json();  //getting json stream from fetch response
    }).then(function(val){ //chaining another then()
      genObject.next(val.title); //sending back the second title to the generator function
    })
})
{% endhighlight %}

#### Recursive Method to Iterate through Promises
##### Recursive Method for Iterating through Promises

再帰的関数は、生成されたプロミスを１つ１つ処理していくのと、プロミスの充足値をジェネレータ関数に戻すために使われます。

Notice how a recursive function is used to handle yields to Promises and yields to other values in any order:

{% highlight javascript linenos %}
function run(genFunc){
    const genObject= genFunc(); //creating a generator object

    function iterate(iteration){ //recursive function to iterate through promises
        if(iteration.done) //stop iterating when done and return the final value wrapped in a promise
            return Promise.resolve(iteration.value);
        return Promise.resolve(iteration.value) //returns a promise with its then() and catch() methods filled
          .then(x => iterate(genObject.next(x))) //calls recursive function on the next value to be iterated
          .catch(x => iterate(genObject.throw(x))); //throws an error if a rejection is encountered
    }

    try {
        return iterate(genObject.next()); //starts the recursive loop
    } catch (ex) {
        return Promise.reject(ex); //returns a rejected promise if an exception is caught
    }
}
{% endhighlight %}

上記の run()関数は引数としてジェネレータ関数を受け取り、
再帰的な iterate()関数を使い、ジェネレータ関数の yield文すべてを処理しています。
プロミスが生成されると、そのプロミスの充足値はジェネレータ関数に送り返されます。
整数、文字列、オブジェクトが生成されると、それらの値はそのままジェネレータ関数に送り返されます。
The run() function shown above takes in a Generator function as an argument and uses the recursive iterate() function to process through all of the Generator function's yield statements. If a Promise is yielded, the fulfillment value of that Promise is sent back to the Generator function. If an integer, string or object is yielded, then those values are sent back as is to the Generator function.

Notice how the run() function is used to process a Generator function:

{% highlight javascript linenos %}
function *gen(){

        var post1Stream = yield fetch("https://jsonplaceholder.typicode.com/posts/1");
        var post1 = yield post1Stream.json();
        console.log(post1.title);
        //post1.title = "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
        var post2Stream = yield fetch("https://jsonplaceholder.typicode.com/posts/2");
        var post2 = yield post2Stream.json();
        console.log(post2.title);
        //post2.title = "qui est esse"

        var number = yield 12345;
        console.log(number)
        //number = 12345

        var string = yield "abc";
        console.log(string)
        //string = "abc"

        var obj = yield {id:123,name:"xyz"};
        console.log(obj)
        //obj = Object {id:123,name:"xyz"}

        var a = yield 54434337746;
        console.log(a);
        return "done";

}

run(gen).then(x => console.log(x)) //logs "done"
        .catch(x => console.log(x.message));
{% endhighlight %}

リジェクト　プロミスが生成されると、 run()メソッドはジェネレータ関数の繰返しを止め、リジェクトプロミスを返えします。

Notice how the run() method handles rejected promises:

{% highlight javascript linenos %}
function *gen(){

        var post1Stream = yield fetch("https://jsonplaceholder.typicode.com/posts/1");
        var post1 = yield post1Stream.json();
        console.log(post1.title);
        //post1.title = "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
        var post2Stream = yield fetch("https://jsonplaceholder.typicode.com/posts/2");
        var post2 = yield post2Stream.json();
        console.log(post2.title);
        //post2.title = "qui est esse"

        var error = yield Promise.reject(Error("error message!"));
        //error thrown here, generator function terminates

        var number = yield 12345;
        console.log(number); //doesn't occur because an earlier promise was rejected

        return 'done'; //doesn't occur because an earlier promise was rejected

}

run(gen).then(x => console.log(x))
        .catch(err => console.log(err.message); //logs "error message!" from the rejected Promise
{% endhighlight %}

----------

#### Star Wars API

##### Enter Film Number (1-7)
<input id = "input">
<button id = "button" class="btn">Search</button>
<p id="filmsText">Film:<p>
<p id="peopleText">Characters:<p>


{% highlight javascript linenos %}
document.querySelector("#button").addEventListener('click',function(){
    run(gen).catch(function(err){
        alert(err.message);
    });
})

function run(genFunc){
    const genObject= genFunc(); //creating a generator object

    function iterate(iteration){ //recursive function to iterate through promises
        if(iteration.done) //stop iterating when done and return the final value wrapped in a promise
            return Promise.resolve(iteration.value);
        return Promise.resolve(iteration.value) //returns a promise with its then() and catch() methods filled
        .then(x => iterate(genObject.next(x))) //calls recursive function on the next value to be iterated
        .catch(x => iterate(genObject.throw(x))); //throws an error if a rejection is encountered
    }

    try {
        return iterate(genObject.next()); //starts the recursive loop
    } catch (ex) {
        return Promise.reject(ex); //returns a rejected promise if an exception is caught
    }
}

function *gen(){
    //check if input is valid
    if(document.querySelector("#input").value > 7 || document.querySelector("#input").value < 1 ){
        throw new Error("Invalid Input - Enter a number between 1 and 7");
    }

    //fetch the film
    var filmResponse = yield fetch("http://swapi.co/api/films/" + document.querySelector("#input").value);
    var film = yield filmResponse.json();

    //fetch the characters
    var characters = film.characters;
    var characterString = "Characters: <br>";
    for(let i = 0; i < characters.length ; i++){
        var tempCharacterResponse = yield fetch(characters[i]);
        var tempCharacter = yield tempCharacterResponse.json();
        characterString += tempCharacter.name + "<br>";
    }

    //display film title and characters in the film
    document.querySelector("#filmsText").innerHTML = "Film: <br>" + film.title;
    document.querySelector("#peopleText").innerHTML = characterString;

}
{% endhighlight %}


<hr>
<h4>
Select two Starships from the dropdown lists to compare
</h4>

<div class="row">
    <div class="col s12 m4">
        <select id="s1" class="browser-default">
            <option value="2" selected>CR90 Corvette</option>
            <option value="75">V-wing</option>
            <option value="74">Belbullab-22 Starfighter</option>
            <option value="65">Jedi Interceptor</option>
            <option value="3">Star Destroyer</option>
            <option value="59">Trade Fedaration Cruiser</option>
            <option value="58">Solar Sailer</option>
            <option value="63">Republic Attack Cruiser</option>
            <option value="28">A-wing</option>
            <option value="29">B-wing</option>
            <option value="39">Naboo Fighter</option>
            <option value="10">Millenium Falcon</option>
        </select>
    </div>
    <div class="col s12 m4">
        <select id="s2" class="browser-default">
            <option value="2" selected>CR90 Corvette</option>
            <option value="75">V-wing</option>
            <option value="74">Belbullab-22 Starfighter</option>
            <option value="65">Jedi Interceptor</option>
            <option value="3">Star Destroyer</option>
            <option value="59">Trade Fedaration Cruiser</option>
            <option value="58">Solar Sailer</option>
            <option value="63">Republic Attack Cruiser</option>
            <option value="28">A-wing</option>
            <option value="29">B-wing</option>
            <option value="39">Naboo Fighter</option>
            <option value="10">Millenium Falcon</option>
        </select>
    </div>
    <div class="col s12 m4">
        <button class="btn" id="compareBtn">Compare</button>
    </div>
</div>

<script src="starwars.js"></script>
