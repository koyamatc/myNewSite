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
    Transform any JavaScript object in JSON:
    </td>
    <td>
    var jsonStr = JSON.stringify(obj);
    </td>
  </tr>
  <tr>
    <td>
    Transform any JSON string into a JavaScript object:
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

You cannot use JSON objects as JavaScript objects

The JSON representation of JavaScript objects is a string. JSON has been developed mainly for replacing XML as a format for exchanging data between a client and a remote HTTP server. It has become very popular as the format for exchanging data when a Web Application uses Ajax for its communications with the HTTP server. Ajax is a way to send / receive data in the background, without the need to reload the Web page. Along with the DOM API, the appearance of this technology in 2005 with Internet Explorer, made it possible to make Web pages more dynamic. Google Maps was one of the first popular Ajax-powered Web application: as you moved the map, new parts arrived (downloaded in the background from the Gmap HTTP server), and the page updated to display these new parts.

JSON is also very practical for storing objects where strings are expected. There is a data store in your browser called LocalStorage that can be used as a small database for Web applications, but it stores only pairs of key/values in the string format. If you want to save a JavaScript object, you will have to turn it into JSON, then save it. When you read it from the data store, you will need to turn it back from JSON to JavaScript.

Here is a first example that turns an object into JSON and back into a JavaScript object:

{% highlight console linenos %}
> var metallica = {name:'Metallica', albums:[{name:"Master of Puppets", year:1986},
       {name:"Black Album", year:1991}]};
undefined
> var metallicaJSON = JSON.stringify(metallica);
undefined
> metallicaJSON;
"{"name":"Metallica","albums":[{"name":"Master of Puppets","year":1986},
       {"name":"Black Album","year":1991}]}"
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
