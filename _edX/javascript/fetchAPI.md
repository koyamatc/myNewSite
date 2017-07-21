---
layout: post
title: FetchAPI
date: 2017-07-11 12:00:00 +900
subject: javascript
description:
  edx's course by Microsoft.
  Asyncronous programming with JavaScript course.  
---

-------
#### Intro to Fetch
##### Introduction to the Fetch API

__What is the Fetch API?__

Fetch API は、ネットワーク　リクエストを作成するインターフェースです。

__Why is the Fetch API important?__

Fetch API は、ネットワーク　リクエストを作成する古い APIである XMLHttpRequest を、多くの必要な改良をしたものです。
Fetch API は、ほとんどの最新のブラウザにどうにゅうされていて、プロミスを返します。

#### Basic Fetch Usage
##### Basic Fetch Usage

Notice how a fetch() method is used to make a simple network request:

{% highlight javascript linenos %}
fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then(function(result){
       return result.json()  
    })
    .then(function(result){
       console.log(result);
       //logs Object {completed: false, id: 1, title: "delectus aut autem", userId: 1}
    })
    .catch(function(err){
        console.log(err);
});
{% endhighlight %}

##### Fetch(url)

fetch()メソッドは、 URLエンドポイントを受け取り、ネットワークリクエストを作成するために使わrます。
fetch()メソッドは、リスポンス（返答）オブジェクトを持ったプロミスを返します。

Notice how the fetch() method returns a Promise that contains a Response object:

{% highlight javascript linenos %}
fetch("https://jsonplaceholder.typicode.com/todos/1") //fetch() method used with an URL endpoint
    .then(function(result){ //result contains a Response object

});
{% endhighlight %}

##### Extracting data from a Response object:

リスポンス　オブジェクトには、いくつかのメソッドがあり、取ってきたデータを抽出するために使われます。

Here are the common extraction methods:

<ul class="collection">
    <li class="collection-item">
    json() は、 json オブジェクトを抽出するために使われます。
    </li>
    <li class="collection-item">
    text() は、テキスト文字列を抽出するために使われます。
    </li>
    <li class="collection-item">
    blob() は、ファイルのようなオブジェクトを抽出するために使われます。
    </li>
</ul>

Notice how the json() method is used to extract a JSONobject:

{% highlight javascript linenos %}
fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then(function(result){
       return result.json() //returns a promise containing the JSON data extracted from the Response object
    })
    .then(function(result){
       console.log(result);
       //logs Object {completed: false, id: 1, title: "delectus aut autem", userId: 1}
});
{% endhighlight %}

Notice how the text() method is used to extract a text string:

{% highlight javascript linenos %}
fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then(function(result){
       return result.text() //returns a promise containing the text data extracted from the Response object
    })
    .then(function(result){
       console.log(result);
       //logs "{completed: false, id: 1, title: "delectus aut autem", userId: 1}"
});
{% endhighlight %}

#### Handling Fetch Responses
##### Handling Fetch Responses

__Checking the Response Status__

取ってきたリスポンス　オブジェクトのステータスをチェックすることは重要です。
ステータス：200-299　は、リクエストはまあ成功だったという意味です。
一方、400代、500代は、問題が起きたという意味です。

Notice how the status of a bad Response object is checked before handling the response:

{% highlight javascript linenos %}
//fetching a bad url
fetch("https://jsonplaceholder.typicode.com/bad_url/1")
.then(function(result){ //contains a Response object
    console.log(result);
    if(result.ok){ //returns true if the Response status is within 200-299
        return result.text();
    }
    else{ //if the fetch request had problems
        console.log(result.status) //logs 404
        return Promise.reject(result.status); //returns a rejected promise if the fetch request had problems
    }

})
.then(function(result){
    console.log(result); //doesn't occur since a rejected promise was returned earlier
})
.catch(function(err){
    console.log("Error: " +  err); //logs "Error: 404", handles the rejected promise
})
{% endhighlight %}

#### Init Object
##### Fetch Init Object

fetch()メソッドは、オプションで init オブジェクトも受け取れます。
このオブジェクトは、Fetchリクエストにカスタム設定を適用します。

Notice how the fetch() method is used with an URL endpoint and an init object:

{% highlight javascript linenos %}
//this init object specifies the method, headers, mode and body of the request
var initObject = {
    method: 'POST',
    headers: new Headers(),
    mode: 'cors',
    body: "{}"
}

//fetch() method used with an URL endpoint and an init object
fetch("https://jsonplaceholder.typicode.com/posts",initObject)
    .then(function(result){ //result contains a Response object
       return result.json() //returns a promise containing JSON data extracted from the Response object

    })
    .then(function(result){
       console.log(result);
       //logs Object {id: 101}

    })
    .catch(function(err){
        console.log(err);
});
{% endhighlight %}

init オブジェクトの属性：
<ul class="collection">
    <li class="collection-item">
    method
    </li>
    <li class="collection-item">
    body
    </li>
    <li class="collection-item">
    headers
    </li>
    <li class="collection-item">
    mode
    </li>
</ul>

#### Method and Body Attributes
##### Method

method 属性は、HTTP リクエストのタイプを指定するために使われる文字列です。

よく使われるタイプのリスト:

<ul class="collection">
    <li class="collection-item">
Get - used to retrieve an existing data resource
    </li>
    <li class="collection-item">
Head - used to retrieve HTTP headers
    </li>
    <li class="collection-item">
Post - used to create a new data resource
    </li>
    <li class="collection-item">
Put - used to create a new data resource or modify an existing data resource
    </li>
    <li class="collection-item">
Delete - used to delete a data resource
    </li>
</ul>

Notice how an init object with a method attribute of "Post" can be created:

{% highlight javascript linenos %}
var initObject = {
    method: 'POST'
}
{% endhighlight %}

##### Body

body属性は、フェッチ　リクエストとともにデータを送るために使われる JSON文字列です。
bodyの値がオブジェクトなら、JSON.stringfy()を使って、送られるオブジェクトを文字列化する必要があります、
さもなければ正しく処理されません。 Get や Head HTTPリクエストには body属性は持てません。

Notice how an init object with a body attribute representing an object can be created:

{% highlight javascript linenos %}
var myBody = {
    id: 12345,
    name: 'abc',
    age: 21
}

var initObject = {
    body: JSON.stringify(myBody)
}
{% endhighlight %}

#### Headers and Mode
##### Headers

headers属性は、取得されるリソースに関する情報や、取得を行っているクライアントの情報を追加するために使われます。
ヘッダ　オブジェクトは、new Headers()コンストラクタを使いっ作成できますし、個々のヘッダは、append()メソッドを使いヘッダ　オブジェクトに追加することができる。

Notice how a new Headers object is created and assigned to the headers attribute of the init object:

{% highlight javascript linenos %}
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

var initObject = {
    headers: myHeaders
}
{% endhighlight %}

##### Mode

mode 属性は、フェッチ　リクエストが、異なるサーバーからリソースを取得できるか判定するために使われる文字列です。

two mode types:
<ul class="collection">
    <li class="collection-item">
    same-origin - フェッチ　リクエストは、リソースと同じサーバーからのみリソースを取得で知る。
    </li>
    <li class="collection-item">
    cors (cross origin HTTP request) - フェッチ　リクエストは、別のサーバーからリソースを取得できる
    </li>
</ul>

Notice how an init object is created with a mode attribute set to 'cors':

{% highlight javascript linenos %}
var initObject = {
    mode: 'cors'
}
{% endhighlight %}

-----
#### Using Fetch with Requests
##### Using Fetch with Requests

fetch()メソッドは、URL と initオブジェクトの代わりに　リクエスト　オブジェクトを受け取ることができる。
リクエスト　コンストラクタは、fetch()メソッドと同じ引数、URL と オプションで init オブジェクトを受け取ります。
リクエスト　オブジェクトは、フェッチ　リクエストをよりきれいに、見やすくできるから使われます。
and also offer a bit more control.

Notice how a Request object is created and used with a fetch() method call:

{% highlight javascript linenos %}
//this init object specifies the method, headers, mode and body of the request
var initObject = {
    method: 'POST',
    headers: new Headers(),
    mode: 'cors',
    body: "{}"
}

//creates a new request object using an URL and an init object
var request = new Request("https://jsonplaceholder.typicode.com/posts",initObject)

//fetch() method used with a request
fetch(request).then(function(result){ //result contains a Response object
    return result.json()
    //returns a Promise containing JSON data extracted from the Response object
}).then(function(result){
    console.log(result);
    //logs Object {id: 101}
}).catch(function(err){
    console.log(err);
});
{% endhighlight %}

#### Reusing Requests
##### Reusing Request ObJects

__Requests with Bodies(POST, PUT)__

body(POST,PUT)を含むフェッチリクエストで、リクエスト　オブジェクトが1回より多く使われるとエラーとなります。

Notice how an error is thrown if a Request object is fetched again after being previously used in a POST request:

{% highlight javascript linenos %}
var initObject = {
    method: 'POST',
    headers: new Headers(),
    mode: 'cors',
    body: "{}"
}

var request = new Request("https://jsonplaceholder.typicode.com/posts",initObject)

//first time using Request object
fetch(request).then(function(result){  
    return result.json()
}).then(function(result){
    console.log(result);
    //logs Object {id: 101}
}).catch(function(err){
    console.log(err);
});



//second time using Request object
fetch(request).then(function(result){
    return result.json();
}).catch(function(err){
    console.log(err.message)
    // logs "Failed to execute 'fetch' on 'Window': Cannot construct
    //       a Request with a Request object that has already been used."
});;
{% endhighlight %}

__Requests without Bodies (GET, HEAD)__

いかし、リクエスト　オブジェクトは、body(Head,Get)を含まないフェッチ　リクエストでは1回より多く使うことができます。

Notice how a Request object can be reused in multiple GET requests:

{% highlight javascript linenos %}
//makes a GET request
var request = new Request("https://jsonplaceholder.typicode.com/todos/1")

//first fetch request
fetch(request).then(function(result){
       console.log(result.status) //logs 200, OK fetch response
})

//reusing request object
fetch(request).then(function(result){
       console.log(result.status) //logs 200, OK fetch response after reusing request object
})
{% endhighlight %}

<h4>Text Analytics API Demo</h4>
<div>
    <h5>Enter Phrase</h5>
    <textarea style ="height:100px;width:600px" id = "input"></textarea>
</div>
<div>
    <button id ="analyseButton" class="btn"> Analyse </button>
</div>
<div>
    <h5>Key Phrases </h5>
    <p id="output"> </p>
</div>

-----

#### Face API Demo ( under construction )

The user should see the following:

<ul class="collection">
    <li class="collection-item">
1. An application title
    </li>
    <li class="collection-item">
2. A section labeled "Enter Image URL" that includes an input field and a button labeled "Analyse".
    </li>
    <li class="collection-item">
3. A section labeled "Image" that displays the image of the provided URL
    </li>
    <li class="collection-item">
4. A section labeled "Attributes" that displays the age and gender of the image provided
    </li>
</ul>
The user should be able to do the following:
<ul class="collection">
    <li class="collection-item">
1. Populate the Image Section with the provided URL image by pressing the Analyse button and providing an image URL.
    </li>
    <li class="collection-item">
2. Populate the Attributes Section with the age and gender of the analyzed image by pressing the Analyse button and providing an image URL. If the image does not contain a face, the attributes section should show "No Faces Detected".
    </li>
</ul>

<div class="row">
    <div class="col s12 m6">
        <h4>Face API Demo</h4>
        <label for="url"><h5>Enter Image URL</h5></label>
        <input type="url" id="url">
        <button id="analizeBtn" class="btn">Analize</button>
        <h5>Image</h5>
        <div id="img"></div>
        <h5>Atributes</h5>
        <p id="atributes"></p>
    </div>
    <div class="col s12 m6"></div>
</div>

<script src="textAnalytics.js"></script>
<script src="faceAnalytics.js"></script>
