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

The Fetch API is an interface that is used to make network requests.

__Why is the Fetch API important?__

The Fetch API is a much needed improvement over XMLHttpRequest, the old API for making network request. The Fetch API is built into most modern browsers and also returns Promises.

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

The fetch() method takes in an URL endpoint and is used to make a network request. The fetch() method returns a Promise that contains a Response object.

Notice how the fetch() method returns a Promise that contains a Response object:

{% highlight javascript linenos %}
fetch("https://jsonplaceholder.typicode.com/todos/1") //fetch() method used with an URL endpoint
    .then(function(result){ //result contains a Response object
         
});
{% endhighlight %}

##### Extracting data from a Response object:

A Response object has several methods that are used to extract the fetched data.

Here are the common extraction methods:

<ul class="collection">
    <li class="collection-item">
    json() is used to extract a json object
    </li>
    <li class="collection-item">
    text() is used to extract a text string
    </li>
    <li class="collection-item">
    blob() is used to extract a file-like object
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

It is important to check the status of the Response object that is fetched. A status between 200-299 means that the request was somewhat successful while statuses in the 400s or 500s mean that problems have occurred. 

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

The fetch() method can also take in an optional init object. This object applies custom settings to the Fetch request.

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

The following attributes of the init object will be covered in more detail in the next few sections:
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

The method attribute is a string that is used to specify the HTTP request method type. 

Here is a list of some commonly used method types:

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

The body attribute is a JSON string used to send data along with a fetch request. If the body value is an object, it is important to stringify the object that is being sent using JSON.stringify() or it will not process correctly. Get and Head HTTP requests can not have bodies.

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

The headers attribute is used to add more information about the resource being fetched or the client doing the fetching. A Headers object can be created using the new Headers() constructor and individual headers can be added to the Headers object through the append() method.

Notice how a new Headers object is created and assigned to the headers attribute of the init object:

{% highlight javascript linenos %}
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

var initObject = {
    headers: myHeaders
}
{% endhighlight %}

##### Mode

The mode attribute is a string that is used to determine whether or not the Fetch request can fetch resources from different servers.

In this course we will cover the following two mode types:
<ul class="collection">
    <li class="collection-item">
    same-origin - the Fetch request can only fetch resources from the same server
    </li>
    <li class="collection-item">
    cors (cross origin HTTP request) - the Fetch request can fetch resources from different servers
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

The fetch() method can take in a Request object instead of an URL and an init object. The Request constructor takes in the same parameters as the fetch() method, an URL and an optional init object. Request objects are used because they make Fetch requests a bit cleaner and also offer a bit more control.

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

If a Request object is used more than once in a Fetch request that involves bodies (POST, PUT) it will throw an error.

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

However, Request objects can be used more than once in Fetch requests that don't involve bodies(Head,Get).

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