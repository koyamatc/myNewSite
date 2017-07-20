---
layout: post
title: Promises
date: 2017-07-11 00:00:00 +900
subject: javascript
description:
  edx's course by Microsoft.
  Asyncronous programming with JavaScript course.  
---

-------
#### intro to Promises
##### What are Promises?

プロミスは、今はまだ利用できないが、最終的に利用できるようになるであろう値のコンテナです。

##### Why are Promises important?
プロミスは JavaScriptで非同期関数を扱う標準的な方法となって来ています。

#### Creating Promises
##### Creating a new Promise

例：
{% highlight javascript linenos %}
var promise = new Promise(function(resolve, reject) {

    //do stuff

    var isSuccessful = true;

    if (isSuccessful) { /*if everything is successful*/
        resolve("Success!");
    }
    else {              /*if something went wrong*/
        reject(Error("Failure."));
    }
});
{% endhighlight %}

##### new Promise()

新しプロミスを作成するために new Promise()コンストラクタが呼ばれます。
このコンストラクタは、引数 resolve　と　reject をとるコールバック関数をもちます。

{% highlight javascript linenos %}
var promise = new Promise(function(resolve, reject) {

});
{% endhighlight %}

##### Resolve()
resolve() 関数は、プロミスの状態を保留中から満了へ変更するために使われる。
resolve() 関数の中で受け渡される値が、プロミスの満了したときの値になります。

一度 resolve() 関数が呼ばれると、その後の resolve() と reject() の呼び出しは何の効果もありません。

resolve() メソッドがどの様にプロミスの満了値をセットするかを見てみましょう：

{% highlight javascript linenos %}
resolve("Success!"); //"Success" is set as the fulfillment value of the promise
{% endhighlight %}

##### Reject()

reject() 関数は、プロミスの状態を保留中かた、拒絶へ変更するために使われる。
reject() 関数の中で受け渡される値は、プロミスのリジェクト値になります。

一度でも reject() 関数が呼ばれると、　その後の reject() と resolve() 呼び出しは何の効果もありません。

reject() 関数は、引数としてオブジェクトをとることができます、一般的な例としては、エラーオブジェクトを渡して、より詳細なエラーレポートを提供します。

reject() が、リジェクト値としてエラーオブジェクトを送る方法：

{% highlight javascript linenos %}
reject(Error("failure")); //rejection value becomes an Error object
{% endhighlight %}

##### Promise.resolve() and Promise.reject()

Promise.resolve() は、既に満了したプロミスを返すために使われます。
一方、Promise.reject() メソッドは、すでにリジェクトされたプロミスを返すために使えます。
両メソッドともに、 new Promise コンストラクタの外部で呼ぶことができます。

すでに満了したプロミスを作成するための Promise.resolve() の使い方：

{% highlight javascript linenos %}
//A resolved promise with fulfillment value "already resolved"
var resolvedPromise = Promise.resolve("already resolved");
{% endhighlight %}

すでにリジェクトしたプロミスを作成するための Promise.reject() の使い方：

{% highlight javascript linenos %}
//A rejected promise with rejected value "already rejected"
var rejectedPromise = Promise.reject("already rejected");
{% endhighlight %}

##### Resolving another Promise

他のプロミスが、resolve() に対する引数として受け渡されたなら、
新しいプロミスは、プロミスに受け渡された満了値を取得します。

resolve() が、引数として別のプロミスを扱う方法：

{% highlight javascript linenos %}
var firstPromise = Promise.resolve("already resolved");

//fullfillment value of secondPromise is "already resolved"
var secondPromise = Promise.resolve(firstPromise);
{% endhighlight %}

#### Using Promises
##### Using Promises with Then() and Catch()

then() と catch() メソッドは、保留状態を終了したプロミスの結果を扱うために使われます。
then() メソッドは、解決したプロミスを扱うために使われ、
一方、catch() メソッドは、リジェクトされたプロミスを扱うために使われます。
両メソッドともに、コールバック関数を使います。
それぞれのコールバック関数は、プロミスの結果を表す1つの引数を持つべきです。

then() と catch() メソッドが　プロミスの結果を扱うためのコールバック関数の使い方:

{% highlight javascript linenos %}
var promise = new Promise(function(resolve, reject) {
    //do stuff
    var isSuccessful = true;
    setTimeout(function(){ //asynchronously process after 5 seconds
      if (isSuccessful) { //if everything is successful
          resolve('success!');
      }
      else{               //if something went wrong
          reject(Error("failure."))
      }

    },5000);


});

//promise status changes from pending to resolved after 5 seconds

promise.then(function(val){//val represents the fulfillment value

    console.log(val);//logs "success!" since promise resolved

}).catch(function(val){//val represents the rejection value

    console.log(val); //doesn't occur since promise never rejected

});
{% endhighlight %}

##### Using Promises with Then(onSuccess,onFailure)

then() メソッドは、then(), catch()メソッドを使う代わりに、成功コールバックと失敗コールバックを使い呼び出すことができます。

プロミスの結果を扱うために成功と失敗コールバックをthen()メソッドで使う方法：

{% highlight javascript linenos %}
promise.then(function(val){//success callback

    console.log(val);

},function(val){//rejection callback

    console.log(val);

})
{% endhighlight %}

-----

#### Transforming Values
##### Transforming Values
__Calling return within then()__

then() コールバックの中で return文を呼び出すことで、プロミスの結果を変換することができます。
このことは、thne() メソッドが、変換された結果を持つ新しいプロミスを返せるということです・

then()コールバック内のreturn文を使い変換した結果を持つ新しいプロミスの作り方：

{% highlight javascript linenos %}
var promise = Promise.resolve("hello");

var promise2 = promise.then(function(result) {
    console.log(result) //logs "hello"
    return result + " world" //adds " world" to the result and sets this as the new fulfillment value of promise2
});

promise2.then(function(result){
    console.log(result); //logs "hello world"
});
{% endhighlight %}

__Chaining Transforms__

複数のthen()メソッドを使い、複数の変換を連続して呼び出すことができます。

Notice how promise results are transformed using multiple then() methods calls:

{% highlight javascript linenos %}
var promise = Promise.resolve([1,2,3,4]);

promise.then(function(result) {
    console.log(result) //logs [1,2,3,4]
    return result.map(x => x * x); //squares each value in the array

}).then(function(result2){
    console.log(result2) //logs [1,4,9,16]
    return result2.filter( x => x > 10); //filters out elements that are not larger than 10

}).then(function(result3){
    console.log(result3) //logs [16]
    return result3.toString() + "!!"; //converts result3 to a string and adds "!!"

}).then(function(result4){
    console.log(result4) //logs "16!!"
    return result4;  //returns a promise with "16!!" as the fulfillment value

}).catch(function(error){
    console.log(error)
});
{% endhighlight %}

#### Sequencing Asynchronous Operations
##### Sequencing Asynchronous Operations

__Returning a Promise within then()__

then() コールバック内で別のプロミスを返すということは、返されてきたプロミスを、
この then() メソッドで返させることになります

then() コールバック内でプロミスを返すことで、返されたプロミスの結果を持った新しいプロミスを作る方法：

{% highlight javascript linenos %}
var promise = Promise.resolve("hello");

var promise2 = promise.then(function(result) {
    console.log(result) //logs "hello"
    return Promise.resolve("12345") //causes then() to return a promise with a fulfillment value of "12345"

});

promise2.then(function(result){
    console.log(result); //logs "12345"

});
{% endhighlight %}

__Sequencing Asynchronous Operations__

then() コールバック内でプロミスを返すことで、非同期オペレーションを順番に行うことができます。

プロミスを返す3つの非同期関数 getRandomNumber(), getNameFromNumber() と getAgeFromName() があるとします。

関数は以下のようなことをします:

<ul class="collection">
    <li class="collection-item">
    getRandomNumber() - 非同期で乱数を返します
    </li>
    <li class="collection-item">
    getNameFromNumber - 数字を受け取り、非同期に名前を返します
    </li>
    <li class="collection-item">
    getAgeFromName - 名前を受け取り、非同期に年齢を返します
    </li>
</ul>

最初に getRandomNumber() を呼び数字を取得し、
次に getNameFromNumber() を呼びその数字から名前を取得し、
最後に getAgeFromName() を呼び出し戻ってきた名前から年齢を取得すれば、
正しい順番に操作されます。

もしこれらの関数が一般の同期的関数であるならば、単純です。

{% highlight javascript linenos %}
var number = getRandomNumber();
var name = getNameFromNumber(number);
var age = getAgeFromName(name);
{% endhighlight %}

しかし、関数が非同期のため、number 変数は、getNameFromNumber() が呼ばれるときには undefined かもしれない、
そして name 変数は getAgeFromName() が呼び出されるときに、 undefined であるかもしれません。

それなので、正しく順番に実行するには下記のようにする必要があります。

{% highlight javascript linenos %}
//getRandomNumber() returns a promise containing a random number
getRandomNumber().then(function(result) {  
    console.log(result) // 42
    return getNameFromNumber(result); //returns a promise containing a string representing a name

}).then(function(result2){
    console.log(result2) //"Bob"
    return getAgeFromName(result2);  //returns a promise containing a number representing an age

}).then(function(result3){
    console.log(result3) //21

}.catch(function(error){
    console.log(error)
});
{% endhighlight %}

もし then() 関数のいづれかが リジェクト・プロミスを返したときには
catch()メソッドがリジェクト結果を扱います。

#### Promises Chaining vs Callback Pyramids
##### Chaining Promises vs Continuation Passing Style(CPS)

非同期オペレーションを続けて行うとき、プロミスとCPSの比較をしてみましょう。

__Chaining Asynchronous Operations using the Continuation Passing Style:__

{% highlight javascript linenos %}
getRandomNumber(function(number)){
    console.log(number); //logs 42

    getNameFromNumber(number, function(name)){
        console.log(name) //logs 'Bob'

        getAgefromNumber(age, function(age)){
            console.log(age) //logs 21
            //do something with age

        },
        function(error){
            console.log(error);
        }
    },
    function(error){
        console.log(error);
    }
},function(error){
    console.log(error);
});
{% endhighlight %}

__Chaining Asynchronous Operations using Promises:__

{% highlight javascript linenos %}
//getRandomNumber() returns a promise containing a random number
getRandomNumber().then(function(result) {  
    console.log(result) // 42
    return getNameFromNumber(result); //returns a promise containing a string representing a name

}).then(function(result2){
    console.log(result2) //"Bob"
    return getAgeFromName(result2);  //returns a promise containing a number representing an age

}).then(function(result3){
    console.log(result3) //21

}.catch(function(error){
    console.log(error)
});
{% endhighlight %}

見ての通り、CPSを使った非同期オペレーションの連続処理に対して、変更を加えるのは難しいです、
各々の非同期呼び出しに対して、成功と失敗の場合両方のコールバックを用意しなくてはならないからです。

プロミスは非常にメンテナンス性の高い方法で、非同期オペレーションを連続して行うことができます。

#### Promise.all()
##### Promise.all()

Promise.all()メソッドは、同時に複数のプロミスを処理するために使います。
このメソッドはプロミスの配列を受け取り、すべてのプロミスが解決するまで待ちます。
解決がすべて終了した際には、then()メソッドを使うことで結果の配列を取得てきます。
プロミスのどれかがリジェクトすると、Promise.all()メソッドは最初のリジェクトプロミスを返します。

Promise.all() メソッドで同時に複数のプロミスを扱う方法:

{% highlight javascript linenos %}
var promise1 = Promise.resolve('hello');
var promise2 = Promise.resolve({age:2,height:188})
var promise3 = 42; //normal values work with Promise.all() too


Promise.all([promise1,promise2,promise3]).then(function(result) {

    console.log(result) //logs the array ["hello",{age:2,height:188},42]

}).catch(function(error){

    console.log(error)

});
{% endhighlight %}

処理中のプロミスの１つがリジェクトしたときに Promise.all()メソッドがリジェクトを呼び出す方法：

{% highlight javascript linenos %}
var promise1 = Promise.resolve('hello');
var promise2 = Promise.resolve({age:2,height:188})
var promise3 = Promise.reject('failure.'); //rejected promise


Promise.all([promise1,promise2,promise3]).then(function(result) {

    console.log(result) //doesn't occur since promise3 rejected

}).catch(function(error){

    console.log(error)  //logs 'failure.'

});
{% endhighlight %}

#### Promise.race()
##### Promise.Race()

Promise.race()メソッドはプロミスの配列を受け取り、１番早くリジェクトまたは解決したプロミスの結果を取得します。通常のプロミスのように、then(), catch() メソッドを使い、１番早いプロミスの結果を取得します。

Promise.RACE()メソッドは、同じデータに対して、２つの似たコードがあるとき、速く終了するコードを選ぶために使うことができます。

より速いプロミスの結果を得るため Promise.race() の使い方：　

{% highlight javascript linenos %}
var promise1 = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve("finished in two seconds");
    },2000) //returns a resolved promise after 2 seconds
});

var promise2 = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve("finished in five seconds");
    },5000) //returns a resolved promise after 5 seconds
});


Promise.race([promise1,promise2]).then(function(result) {

    console.log(result) // logs "finished in two seconds" because promise1 resolved first

}).catch(function(error){

    console.log(error)  

});
{% endhighlight %}

Promise.race()メソッドは、与えられた時間数が経過したら強制的にリジェクトされるプロミスを含めることで、
解決するためにプロミスが使える時間数を制限するためにも使われます。

Notice how the Promise.race() method is used to limit the amount of time a Promise has to resolve:

{% highlight javascript linenos %}
var promiseResolveTenSeconds = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve("finished in ten seconds");
    },10000) //returns a resolved promise after 10 seconds
});

var promiseRejectFiveSeconds = new Promise(function(resolve,reject){
    setTimeout(function(){
        reject("error: promise took longer than 5 seconds to resolve");
    },5000) //returns a rejected promise after 5 seconds
});


Promise.race([promiseResolveTenSeconds,promiseRejectFiveSeconds]).then(function(result) {

    console.log(result) // never occurs because promiseRejectFiveSeconds rejected

}).catch(function(error){

    console.log(error) // logs "error: promise took longer than 5 seconds to resolve"

});
{% endhighlight %}

----------
<fieldset>
    <div>
        <label for="inputId"><h5>Search Product by Id</h5>
        </label>
        <input id="inputId">
        <button class="btn" id="inputButtonId" >Search Product</button>
    </div>
    <div>
        <label for="inputType"><h5>Search Product by Type</h5>
        </label>
        <input id="inputType">
        <button class="btn" id="inputButtonType" >Search Type</button>
    </div>
    <div>
        <label for="inputPrice"><h5>Search Product by Price</h5>
        </label>
        <input id="inputPrice">
        <button class="btn" id="inputButtonPrice" >Search Price</button>
    </div>
</fieldset>
<div >
    <h5>Examined Product</h5>
    <p id="productText">Product Id: <br>Price: <br>Type: </p>
    <h5>List of Similar Products</h5>
    <table id="similarTable" width="300px" border="1" >
    <tr>
        <th>ProductId</th>
        <th>Type</th>
        <th>Price</th>
        <th>Examine</th>
    </tr>
    </table>
</div>
<div >
<h5>List of All Products</h5>
<table id="allTable" width="300px" border="1" >
    <tr>
        <th>ProductId</th>
        <th>Type</th>
        <th>Price</th>
        <th>Examine</th>
    </tr>
</table>
</div>

__library.js__
{% highlight javascript linenos %}
(function(window){

    function myLibrary(){

        //execute code here
        var catalog = createRandomCatalog(100);

        return {
            searchProductById: searchProductById,
            searchProductsByPrice: searchProductsByPrice,
            searchProductsByType: searchProductsByType,
            searchAllProducts: searchAllProducts
        }

        //function definitions go here
        function createRandomProduct(){
            var typeArray = ['Electronics','Book','Clothing','Food'];
            var price = (Math.random()*500).toFixed(2)
            var type = typeArray[Math.floor(Math.random()*4)];

            return {price:price, type:type};                
        }

        function createRandomCatalog(num){
            var catalog = [];
            for (var i = 0; i < num; i++){
                var obj = createRandomProduct();
                catalog.push({id:i,price:obj.price,type:obj.type});
            }

            return catalog;
        }

        function searchAllProducts(){
            var promise = new Promise(function(resolve, reject) {

                setTimeout(function(){
                    resolve(catalog);
                },1000);

            });

            return promise;
        }

        function searchProductById(id){

            var promise = new Promise(function(resolve,reject){
                var i = 0;
                setTimeout(function(){
                    while (i < catalog.length){
                        if (catalog[i].id == id){                        
                            resolve({id:id,price:catalog[i].price,type:catalog[i].type});
                        }
                        i++;
                    }
                    reject("Invalid ID: " + id);
                },1000);
            });

            return promise;
        }

        function searchProductsByType(type){

            var promise = new Promise(function(resolve,reject){
                var i = 0;
                var typeArray = [];
                var possibleTypes = ['Electronics','Book','Clothing','Food'];
                if(!possibleTypes.includes(type)){
                    reject("Invalid Type: " + type)
                }
                else{
                    setTimeout(function(){
                        while (i < catalog.length){
                            if (catalog[i].type == type){
                                typeArray.push({id:catalog[i].id,price:catalog[i].price,type:catalog[i].type});
                            }
                            i++;
                        }
                        resolve(typeArray);
                    },1000);
                }
            });

            return promise;
        }

        function searchProductsByPrice(price,difference){
            var promise = new Promise(function(resolve,reject){
                var i = 0;
                var priceArray = [];
                if(!isFinite(price)){
                    reject("Invalid Price: " + price)
                }
                else{
                    setTimeout(function(){
                        while (i < catalog.length){
                            if (Math.abs(catalog[i].price - price) < difference){
                                priceArray.push({id:catalog[i].id,price:catalog[i].price,type:catalog[i].type});
                            }
                            i++;
                        }
                        resolve(priceArray);
                    },1000);
                }
            });

            return promise;
        }


    }


    if(typeof(window.api) === 'undefined'){
        window.api = myLibrary();
    }

})(window);
{% endhighlight %}

__productCatalog.js__
{% highlight javascript linenos %}
function createTableHeader(tableId){

    var table = document.querySelector("#" + tableId);
    var row = table.insertRow();
    row.innerHTML = '<th>ProductId</th><th>Type</th><th>Price</th><th>Examin</th>'

}

function updateTable(tableId,productArray){
    var tableBody = document.querySelector("#"+tableId);
    //reset table
    while (tableBody.hasChildNodes()) {   
        tableBody.removeChild(tableBody.firstChild);
    }
    //create table header
    createTableHeader(tableId);
    //populate table rows
    for (i = 0; i < productArray.length; i++) {
        let tr = tableBody.insertRow();
        tr.innerHTML += "<td>" + productArray[i].id + "</td>"
        tr.innerHTML += "<td>" + productArray[i].type + "</td>"
        tr.innerHTML += "<td>" + productArray[i].price + "</td>"
        let productId = productArray[i].id;
        tr.innerHTML += "<button onclick='examine(this)'>Examine</button>"

  }  
}

function updateExaminedText(product){
    var outputString = "Product Id: " + product.id;
    outputString += "<br> Price: " + product.price;
    outputString += "<br> Type: " + product.type;
    document.querySelector("#productText").innerHTML = outputString;
}

function getIntersection(arrA,arrB,searchedId){

    var samePrice = arrA;
    var sameType = arrB;
    var similarArray = [];
    samePrice.forEach(function(obj1){
        sameType.forEach(function(obj2){
            if(obj1.id == obj2.id && obj1.id != searchedId)
                similarArray.push(obj1);     
        });
    });

    return similarArray;

}

function processSearchId(searchId){
    api.searchProductById(searchId).then(function(val){
        return Promise.all([api.searchProductsByPrice(val.price,50),api.searchProductsByType(val.type),val]);
    }).then(function(val){
        var similarArray = getIntersection(val[0],val[1],val[2].id);
        updateExaminedText(val[2]);
        updateTable('similarTable',similarArray);
    }).catch(function(val){
        alert(val);
    });
}

function processSearchType(searchType){
    api.searchProductsByType(searchType).then(function(val){
        updateExaminedText(val[2]);
        updateTable('similarTable',val);
    }).catch(function(val){
        alert(val);
    });
}

function processSearchPrice(searchType, searchPrice){
    api.searchProductsByPrice(searchPrice, 50).then(function(val){
        return Promise.all([api.searchProductsByPrice(searchPrice, 50),
                            api.searchProductsByType(searchType),val]);
    }).then(function(val){
        var similarArray = getIntersection(val[0],val[1],val[2].id);
        updateExaminedText(val[2]);
        updateTable('similarTable',similarArray);
    }).catch(function(val){
        alert(val);
    });
}

function examine(target) {
    processSearchId(target.parentNode.firstChild.innerHTML);
}

api.searchAllProducts().then(function(value){
    updateTable('allTable',value);
});

document.querySelector("#inputButtonId").addEventListener('click',function(){
    processSearchId(document.querySelector('#inputId').value);
});

document.querySelector("#inputButtonId").addEventListener('click',function(){
    processSearchId(document.querySelector('#inputId').value);
});

document.querySelector("#inputButtonType").addEventListener('click',function(){
    processSearchType(document.querySelector('#inputType').value);
});

document.querySelector("#inputButtonPrice").addEventListener('click',function(){
    processSearchPrice(document.querySelector('#inputType').value,
                       document.querySelector('#inputPrice').value);
});
{% endhighlight %}

<script src="library.js"></script>
<script src="productCatalog.js"></script>
