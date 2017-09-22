---
layout: post
title: The JSON notation
date: 2017-07-05 12:00:00 +900
subject: javascript
description:
  edx's course by W3C.
  Introductory course designed to understand
  the basic concepts of JavaScript.  
---

-------
#### What is JSON?
JSON stands for JavaScript Object Notation. It's a standard for transforming nearly any object into a string representation that is human readable. It became a standard for exchanging data to/from a remote HTTP server, and is available for many other languages in addition to JavaScript.

A JavaScript object o in JSON looks a lot like what o.toString() returns.

<table>
  <caption>
  There are two main methods to know:
  </caption>
  <tr>
    <td>
    1. Transform any JavaScript object in JSON:
    </td>
    <td>
    var jsonStr = JSON.stringify(obj);
    </td>
  </tr>
  <tr>
    <td>
    2. Transform any JSON string into a JavaScript object:
    </td>
    <td>
    var jsObj  = JSON.parse(jsonStr);
    </td>
  </tr>
</table>

Let's see some examples:

{% highlight console linenos %}
> var x = 3;
undefined

> JSON.stringify(x);
"3"

> var simpleObject = {x:12, y:30};
undefined

> JSON.stringify(simpleObject);
"{"x":12,"y":30}"

> var anArray = ['Monday', 'Tuesday', 'Wednesday'];
undefined

> JSON.stringify(anArray);
"["Monday","Tuesday","Wednesday"]"

> var complexObject = {name:'Metallica',
    albums:[
        {name:"Master of Puppets", year:1986},
        {name:"Black Album", year:1991}
    ]
  };
undefined

> JSON.stringify(complexObject);
"{"name":"Metallica","albums":[{"name":"Master of Puppets","year":1986},{"name":"Black Album","year":1991}]}"
{% endhighlight %}

In the above examples, you can see JSON representations of a simple variable of a predefined type, of an array, of a simple object, of an object that contains an array of objects (Metallica example).

And indeed, it looks like the code you typed to create the objects, with quotes around it and around the property names. This is why it is called JavaScript Object Notation ;-)

##### You cannot use JSON objects as JavaScript objects

The JSON representation of JavaScript objects is a string. JSON has been developed mainly for replacing XML as a format for exchanging data between a client and a remote HTTP server. It has become very popular as the format for exchanging data when a Web Application uses Ajax for its communications with the HTTP server. Ajax is a way to send / receive data in the background, without the need to reload the Web page. Along with the DOM API, the appearance of this technology in 2005 with Internet Explorer, made it possible to make Web pages more dynamic. Google Maps was one of the first popular Ajax-powered Web application: as you moved the map, new parts arrived (downloaded in the background from the Gmap HTTP server), and the page updated to display these new parts.

JSON is also very practical for storing objects where strings are expected. There is a data store in your browser called LocalStorage that can be used as a small database for Web applications, but it stores only pairs of key/values in the string format. If you want to save a JavaScript object, you will have to turn it into JSON, then save it. When you read it from the data store, you will need to turn it back from JSON to JavaScript.

Here is a first example that turns an object into JSON and back into a JavaScript object:

{% highlight console linenos %}
> var metallica = {name:'Metallica', albums:[{name:"Master of Puppets", year:1986},{name:"Black Album", year:1991}]};
undefined

> var metallicaJSON = JSON.stringify(metallica);
undefined

> metallicaJSON;
"{"name":"Metallica","albums":[{"name":"Master of Puppets","year":1986},{"name":"Black Album","year":1991}]}"

> metallicaJSON.name; // metallicaJSON is not a JavaScript object
undefined

> metallica.name; // metallica is an object
"Metallica"

> var obj = JSON.parse(metallicaJSON); // JSON -> object
undefined

> obj.name; // this is an object
"Metallica"
{% endhighlight %}

With the JSON representation of an object you cannot access the original object's properties using the "." operator, nor call its methods. The JSON format only stores the list of the object properties (name and value) as a string. Look at line 10: we cannot access the name property of the JSON representation of the metallica object defined at line 1.

When we parse a JSON string using JSON.parse(), we get a real JavaScript object, and we can access its properties (lines 16 and 19).

#### Example: consuming JSON remote data
##### JSON data from a REST WebService
Most "big sites" provide what we call a REST API. This means "they propose to send/receive data to/from programs over HTTP", and most of the time the JSON format is one of the possible transport formats for the data. Google APIs, Facebook and Amazon APIs are like this.

JSONPlaceholder is a free online REST service that you can use whenever you need some fake data in JSON. Faking a server is great for tutorials, and this is exactly what the next example does. It will consume data from [this URL]('https://jsonplaceholder.typicode.com/users').

Please click on it - you will see some JSON data coming from the server and being displayed in your browser:
{% highlight JavaScript %}
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {% endhighlight %}


And we would like to use these data in our code, manipulating them as a JavaScript object.

##### First thing: get the remote data as JSON

This course will not cover Ajax and what we call "asynchronous JavaScript". This will be covered in an advanced course to come on W3Cx.

However, we can show you two simple examples that use the Xhr2 API for Ajax requests and the new fetch API that is simplest to use.

__Downloading JSON data using the Xhr2 API__
<h5>Working with remote data suing XhR2</h5>
<button class="btn" onclick="search();">Get a remot list of users' names and emails</button>
<div id="users"></div>
{% highlight javascript linenos %}
function search() {    
    var queryURL = "https://jsonplaceholder.typicode.com/users";

    var xhr = new XMLHttpRequest();
    xhr.open('GET', queryURL, true);

    // called when the response is arrived
    xhr.onload = function(e) {
      var jsonResponse = xhr.response;

      // turn the response into a JavaScript object
      var users = JSON.parse(jsonResponse);
      displayUsersAsATable(users);
    }

    // in case of error
    xhr.onerror = function(err) {
      console.log("Error: " + err);
    }

    // sends the request
    xhr.send();
}
{% endhighlight %}

Explanations:

<ul class="collection">
  <li class="collection-item">
  Lines 4 and 5 build an Ajax request using XhR2.
  </li>
  <li class="collection-item">
  Line 22 is executed after: the request is sent in the background (we say "asynchronously").
  </li>
  <li class="collection-item">
  Line 8: when the server answers, this callback is executed, and inside it, this.response corresponds to the response from the HTTP server. It's in JSON format (line 9)
  </li>
  <li class="collection-item">
  Line 12: we turn the JSON response into a regular JavaScript object we can work with, using JSON.parse().
  </li>
  <li class="collection-item">
  Line 13: we pass this list of users, now a JavaScript object, to the displayUsersAsATable method, that will use the HTML table API we saw earlier in the course.
  </li>
</ul>

##### [advanced] Downloading JSON data using the fetch API

The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. It also provides a global fetch() method that provides an easy, logical way to fetch resources asynchronously across the network. You fetch data from a URL, then, you do something with the response, then you do something else. If there is an error you can catch this error and display, for example, an error message.

See this blog post for a detailed tutorial. Asynchronous JavaScript and JavaScript promises (the fetch...then...then... is based on the concept of "promises"), will be detailed in a next MOOC to appear at W3Cx.

<button class="btn" onclick="search2();">Get remote list of users' names and emails using the fetch API</button>
<div id="users2"></div>

JavaScript source code extract:

{% highlight JavaScript linenos %}
function search() {
    var queryURL = "https://jsonplaceholder.typicode.com/users";

    fetch(queryURL)
      .then(function(response) {
          // response is a json string,
          // convert it to a pure JavaScript object
          return response.json();
      })
      .then(function(users) {
          // users is a JavaScript object here
          displayUsersAsATable(users)
      })
      .catch(function(error) {
          console.log('Error during fetch: ' + error.message);
      });
}
{% endhighlight %}

The fetch API will also be covered in an advanced JavaScript course to come. In contrast to XhR2, fetch is based on a concept called "JavaScript promises" (also covered in the advanced course!). You recognize promises when you see ".then..." ".then...".

#### Example of use: the LocalStorage API
##### Example of use: the LocalStorage API as a client-side database for JavaScript objects
__The Web Storage API (localStorage, sessionStorage)__
The Web storage API (see the [related W3C specification]('https://www.w3.org/TR/webstorage/')) introduces "two related mechanisms, similar to HTTP session cookies, for storing structured data on the client side".

Indeed, Web Storage provides two interfaces - sessionStorage and localStorage - whose main difference is data longevity. This specification defines an API for persistent data storage of key-value pair data in Web clients.

<b>
With localStorage the data will remain until it is deleted, whereas with sessionStorage the data is erased when the tab/browser is closed.
</b>

For convenience, we will mainly illustrate the localStorage object. Just change "local" to "session" and it should work (this time with a session lifetime).

__Simple key-value stores, one per domain (following the same origin policy)!__
localStorage is a simple key-value store, in which the keys and values are strings. There is only one store per domain. This functionality is exposed through the globally available localStorage object. The same applies to sessionStorage.

Example:
{% highlight javascript linenos %}
// Using localStorage

// store data
localStorage.lastName = "Bunny";
localStorage.firstName = "Bugs";
localStorage.location = "Earth";

// retrieve data
var lastName = localStorage.lastName;
var firstName = localStorage.firstName;
var location = localStorage.location;
{% endhighlight %}

This data is located in a store attached to the origin of the page. We've created a JsBin example in which we've included the above code.

Once opened in your browser, the JavaScript code is executed. With the browser dev. tools, we can check what has been stored in the localStorage for this domain:

__Differences with cookies?__

Cookies are also a popular way to store key-value pairs. Web Storage, however, is a more powerful technique than cookies. The main difference is in size limits: cookies are limited to a few KBytes whereas Web Storage may extend to several MBytes. Also, cookies generate additional HTTP request traffic (whether to request a Web page, an image, a stylesheet, a JavaScript file, etc.).

Objects managed by Web Storage are no longer carried on the network and HTTP, and are easily accessible (read, change and delete) from JavaScript, using the Web Storage API.

External resources

<ul class="collection">
  <li class="collection-item">
  [The W3C Web Storage API recommendation (published on 9 June 2015)]('https://www.w3.org/TR/webstorage/')
  </li>
  <li class="collection-item">
  [Interesting article on html5rocks that compares the different ways of doing client side persistence with HTML5, including Web Storage.]('https://www.html5rocks.com/en/tutorials/offline/storage/')
  </li>
</ul>

<script>
function search() {    
    var queryURL = "https://jsonplaceholder.typicode.com/users";

    var xhr = new XMLHttpRequest();
    xhr.open('GET', queryURL, true);

    // called when the response is arrived
    xhr.onload = function(e) {
      var jsonResponse = xhr.response;

      // turn the response into a JavaScript object
      var users = JSON.parse(jsonResponse);
      displayUsersAsATable(users);
    }

    // in case of error
    xhr.onerror = function(err) {
      console.log("Error: " + err);
    }

    // sends the request
    xhr.send();
}

function displayUsersAsATable(users) {
    // users is a JavaScript object

    // empty the div that contains the results
    var usersDiv = document.querySelector("#users");
    usersDiv.innerHTML = "";

    // creates and populate the table with users
    var table = document.createElement("table");
    table.classList ="bordered";

    // iterate on the array of users
    users.forEach(function(currentUser) {
        // creates a row
        var row = table.insertRow();
        // insert cells in the row
        var nameCell = row.insertCell();
        nameCell.innerHTML = currentUser.name;
        var cityCell = row.insertCell();
        cityCell.innerHTML = currentUser.address.city;
     });

     // adds the table to the div
     usersDiv.appendChild(table);
}

/**************************************************/
function search2() {
    var queryURL = "https://jsonplaceholder.typicode.com/users";

    fetch(queryURL)
            .then(function (response) {
                // response.json() returns a json string,
                // returning it will convert it
                // to a pure JavaScript
                // object for the next then's callback
                return response.json();
            })
            .then(function (users) {
                // users is a JavaScript object here
                displayUsersAsATable2(users);
            })
            .catch(function (error) {
                console.log('Error during fetch: ' + error.message);
            });
}

function displayUsersAsATable2(users) {
    // users is a JavaScript object

    // empty the div that contains the results
    var usersDiv = document.querySelector("#users2");
    usersDiv.innerHTML = "";

    // creates and populate the table with users
    var table = document.createElement("table");
    table.classList = "bordered";

    // iterate on the array of users
    users.forEach(function (currentUser) {
        // creates a row
        var row = table.insertRow();
        // insert cells in the row
        var nameCell = row.insertCell();
        nameCell.innerHTML = currentUser.name;
        var cityCell = row.insertCell();
        cityCell.innerHTML = currentUser.address.city;
    });

    // adds the table to the div
    usersDiv.appendChild(table);
}
</script>
