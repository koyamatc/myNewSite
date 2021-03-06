---
layout: post
title: Arrays
date: 2017-06-28 00:00:00 +900
subject: javascript
description:
  edx's course by W3C.
  Introductory course designed to understand 
  the basic concepts of JavaScript.  
---

-------
<style type="text/css">
.disp {
    border: 3px solid #000;
    margin-left: 50px;
    padding-left: 20px;
    width: 400px;
    height: auto;
}
</style>
#### JavaScript arrays

In JavaScript, arrays represent a collection of "things", which may be strings, integer values, decimal values, boolean values, or any sort of JavaScript object.
<pre>
> var myarr = ['red', 'blue', 'yellow', 'purple'];
undefined
 
> myarr;
["red", "blue", "yellow", "purple"]
 
> myarr[0];
"red"
 
> myarr[3];
"purple"
"purple"
</pre>
Each element of an array has a key/index and a value. Here are the keys/indexes and values from the above example:

<table class="bordered">
    <tr>
        <th>Key</th>
        <th>Value</th>
    </tr>
    <tr>
        <td>0</td>
        <td>red</td>
    </tr>
    <tr>
        <td>1</td>
        <td>blue</td>
    </tr>
    <tr>
        <td>2</td>
        <td>yellow</td>
    </tr>
    <tr>
        <td>3</td>
        <td>purple</td>
    </tr>
</table>

Below is an another example with an array containing three integers. The first element is at index 0, and the last at the index equal to the number of elements-1.
<pre>
> var a = [];
> typeof a;
"object"
> var a = [1,2,3];
> a
[1, 2, 3]
> a[0]
1
> a[1]
2
</pre>

##### JavaScript arrays are objects and have some useful properties and methods
Note that in JavaScript, arrays are "objects" (lines 2-3 in the above example), which means that they have properties and methods. You can access/call them using the "." operator. Here are the most common properties and methods.
<pre>
> var a = [1, 3, 2, 5, 7];
undefined
 
> a.length; // number of elements
5
 
> a.sort(); // sorts element in a
[1, 2, 3, 5, 7]
 
> a.splice(2, 1); // remove 1 element starting from index=2 (3rd element)
[3]
 
> a; // the '3' has been removed from the array
[1, 2, 5, 7]
</pre>
By default, the sort() method sorts elements alphabetically if they are strings, or from lowest to highest if they are numeric. If you want to sort objects like {firstName:'michel', lastName:'Buffa', age:51}, you will need to use another method passed as an argument to the sort method, for example to indicate the property you want to use for sorting (i.e., sort by age);

Example with an array of persons (each person is an object):
{% highlight javascript linenos %}
var persons = [
    {givenName: 'Michel', familyName: 'Buffa', age:51},
    {givenName: 'Pig', familyName: 'Bodine', age:20},
    {givenName: 'Pirate', familyName: 'Prentice', age:32}
];
 
function compareByAge(a,b) { // comparison function, a and b are persons
  if (a.age < b.age)         // compare by age
    return -1;

  if (a.age > b.age)
    return 1;

  return 0;
}
 
persons.sort(compareByAge); // this will call automatically compareByAge
                            // passing all persons from the array, compare
                            // them by age and sort the array.
{% endhighlight %}

Explanations:

<ul class="collection">
    <li class="collection-item">
    Line 17 calls persons.sort(function_that_compares_two_elements), passing as an unique parameter a function that compares two people's ages. This function must return -1 if the first person is younger than the second person. It must return +1 if the first person is older than second person, and 0 if they are the same age.
    </li>
</ul>

We will see more methods in the other subsections of this page.

##### Elements can be of different types in a same array:
<pre>
> var a = [1,2,3];
 
> a[2] = 'three';
"three"
 
> a
[1, 2, "three"]
</pre>

##### Adding elements to an array

We can add new elements using a new index, if you want to add a new element at the end, use the push method!
<pre>
> var a = [1,2,"three"];
undefined
 
> a[3] = 'four';
"four"
 
> a;
[1, 2, "three", "four"]
 
> a[a.length] = "five"; // adding at the end
[1, 2, "three", "four", "five"]
 
> a.push("six"); // but usually we prefer using the push method for adding
[1, 2, 3, "four", "five", "six"]  // a new element at the end
</pre>
 
When using indexes, be careful not to leave "holes" in the array:
<pre>
> a[7] = 'height';
"height"
 
> a;
[1, 2, 3, "four", "five", "six", undefined × 1, "height"]
</pre>
This array is valid, but having a [6] equal to "undefined" is often prone to errors. Be careful when using absolute indexes for adding elements. We recommend using the push method instead.

##### Removing elements from an array

The recommended method is to use the splice method:

<pre>
array.splice(start)
array.splice(start, deleteCount)
</pre>
<ul class="collection">
    <li class="collection-item">
    start: index at which to start changing the array (with origin 0). 
    </li>
    <li class="collection-item">
    deleteCount (Optional): an integer indicating the number of old array elements to remove.  If deleteCount is greater than the number of elements left in the array starting at start, then all of the elements through the end of the array will be deleted. If deleteCount is omitted, deleteCount will be equal to (array.length - start), i.e., all of the elements beginning with start index on through the end of the array will be deleted.
    </li>
    <li class="collection-item">
    Return value: an array containing the deleted elements. If only one element is removed, an array of one element is returned. If no elements are removed, an empty array is returned.
    </li>
</ul>

Examples:
<pre>
> a;
[1, 2, 3, "four", "five", "six", undefined × 1, "height"]
 
> a.splice(6, 1); // remove element at the sixth index, the undefined one!
[undefined × 1]
 
> a;
[1, 2, 3, "four", "five", "six", "height"] // it's no more here :-)
 
> a.splice(0, 3); // remove the three first elements
[1, 2, 3]
 
> a;
["four", "five", "six", "height"]
 
> a.splice(a.length-1); // remove the last element
"height"
 
> a;
["four", "five", "six"]
</pre>

##### Recommended method for removing the last element: the pop method!
<pre>
> a
["four", "five", "six"]
 
> a.pop(); // remember push/pop = add / remove element at last position!
"six"
 
> a
["four", "five"]
</pre>

Trap: the delete method is not good for removing an element from an array!
<pre>
> delete a[1];
true
 
> a;
["four", undefined × 1] // the element became undefined,
                        // but it's still in the array!
</pre>

##### Arrays of arrays
It is possible for an array to be an element within an array! This example shows an array made of two arrays of three elements each. It's a 2x3 matrix with two rows and three columns!
<pre>
> var a = [[1,2,3], [4,5,6]]; // a is a matrix: 2 rows, 3 columns.
undefined
 
> a[0]; // first row
[1, 2, 3]
 
> a[1]; // second row
[4, 5, 6]
 
> a[0][0]; // top left element
1
 
> a[0][1]; // second element, first line
2
 
> a[0][2]; // third element, first line
3
 
> a[1][0]; // first element, second line
4
 
> a[1][1]; // second element, second line
5
 
> a[1][2]; // third element, second line
6
</pre>

It is possible to have different arrays with different lengths and different types of element in an array:
<pre>
> var a = [];
undefined
 
> a[0] = [1, 2, 3, 4, 5];
[1, 2, 3, 4, 5]
 
> a[1] = ['michel', 'henri', 'francois']
["michel", "henri", "francois"]
 
> a
[Array(5), Array(3)]
</pre>

#### Strings are arrays of characters
##### Yes, they do look like arrays!

JavaScript strings are "like" arrays of characters, but they have some limitations, and some dedicated properties and methods:
<pre>
> var s = 'Michel';
undefined
 
> s[0];
"M"
 
> s[1];
"i"
 
> s.length;
6
</pre>
Indeed, the string s behaves like an array, it has the length property like an array, and we can access individual characters using indexes that go from 0 to length-1, like arrays...

However...

##### But they are not quite the same as arrays!

You cannot add elements to strings using a non-existent index, you cannot use the push/pop methods for adding/removing  characters at the end of the string:
{% highlight javascript linenos %}
s.push(' Buffa');
 
ERROR: VM5748:1 Uncaught TypeError: s.push is not a function
at <anonymous>:1:3
(anonymous) @ VM5748:1
 
s[s.length] = 'B'; // add 'B' at the end?
"B"
 
s[s.length] = 'u'; // add 'u' at the end?
"u"
 
s[s.length] = 'f'; // add 'f' at the end?
"f"
 
s; // s remained UNCHANGED!
"Michel"
{% endhighlight %}

<ul class="collection">
    <li class="collection-item">
    You cannot use push/pop as this raises an error "is not a function" (lines 1-5)    
    </li>
    <li class="collection-item">
    You can try to put elements out of the range of the string: nothing will happen and the string will remain unchanged (lines 7-17)    
    </li>
</ul>
You can't even modify a character using an index. Strings are "read only" when using brackets to access individual characters!
<pre>
> var s = 'Michel';
undefined
 
> s[0] = "R"; // trying to change the 'M' into an 'R'
"R"
 
s; // no luck!
"Michel"
</pre>

You also can't remove characters using the array's splice method:

<pre>
> s.splice(0, 3);
 
ERROR: VM716:1 Uncaught TypeError: s.splice is not a function
at &lt;anonymous>:1:3
</pre>

__So: how do we add characters to a string, how can we modify a string? How can we delete elements in a string ?__

Strings come with a whole set of methods, which we'll come to in module 4 when we talk about JavaScript objects (in the section titled "JavaScript predefined objects"). Without going into detail just yet, here are some examples:

##### Adding a string to the beginning of a string using the + operator:
<pre>
> var s = 'Michel';
undefined
 
> s = "Hello " + s;
"Hello Michel"
 
> s = 'O' + s; // equivalent to push('0') with arrays
"OHello Michel"
</pre>

##### Adding a string to the end of another one with the + operator:
<pre>
>s = 'Michel';
"Michel"
 
> s += ' Buffa';
"Michel Buffa"
 
> s;
"Michel Buffa"
</pre>

##### Adding a string at the end of another one using the concat method:
<pre>
> var s1 = 'Michel';
undefined
 
> var s2 = 'Buffa';
undefined
 
> var s3 = s1 + " " + s2; // + can be used to concat more than 2 strings
undefined
 
> s3;
"Michel Buffa"
 
> var s4 = s1.concat(s2);
undefined
 
> s4;
"MichelBuffa"
 
> var s5 = s2.concat(s1);
undefined
 
s5;
"BuffaMichel"
</pre>

##### Removing chars from a string using the substring method:
Removing the last char (equivalent to the pop method from arrays):
<pre>
> var s = 'Michel';
undefined
 
> s = s.substring(0, s.length-1);
"Miche"
</pre>

Removing a certain number of chars starting from a string, starting at a given index  :
<pre>
var s = 'Michel';
 
function removeChars(s, startIndex, numberOfCharsToRemove) {
   return s.substring(0, startIndex) +   
          s.substring(startIndex + numberOfCharsToRemove);
}
 
// remove 3 consecutive chars from s, starting at index = 1
s = removeChars(s, 1, 3);
 
console.log(s); // will display "Mel" in the console
</pre>

##### Replacing a char at a given index:
<pre>
function replaceAt(s, index, character) {
    return s.substr(0, index) + character + s.substr(index+character.length);
}
 
var s2 = "JavaScript";
s2 = replaceAt(s2, 1, "o");
 
console.log(s2); // will display "JovaScript"
 
// it also works with a string instead of a simple char
s2 = replaceAt(s2, 0, "Coca");
console.log(s2); // Will display "CocaScript"
</pre>

#### Iterating on array elements
##### 1 - Iterating using the forEach method
The forEach method takes a single argument that is a function/callback that can have one, two or three parameters:

<ul class="collection">
    <li class="collection-item">
    The first parameter is the current element of the array,    
    </li>
    <li class="collection-item">
    The second parameter (optional) is the index of the current element in the array,    
    </li>
    <li class="collection-item">
    The third element is the array itself    
    </li>
</ul>

Typical use with only one parameter (the current element):
{% highlight javascript linenos %}
var a = ['Monday', 'Tuesday', 'Wednesday'];
 
a.forEach(function(day) {
    // day is the current element
    document.body.innerHTML += day +
                "<br>"; // will display Monday, Tuesday, Wednesday
})
{% endhighlight %}

<div id="disp01" class="disp">
    <p>
        <b>These day names have been generated dynamically 
    by iterating on an array using the forEach method</b>
  </p>
</div>

##### We iterate on an array of person, and use two parameters in the callback function in order to get the index of the current element:
<div id="disp02" class="disp">
    <p>
        <b>These names, ages and indexes have been generated dynamically 
      by iterating on an array using the <code>forEach</code> method with 2 parameters in the callback function</b>
  </p>
</div>
{% highlight javascript linenos %}
var persons = [
     {name:'Michel', age:51},
     {name:'Henri', age:20},
     {name:'Francois', age:29}
];
 
persons.forEach(function(p, index) {
     document.body.innerHTML += p.name + ", age " + p.age +
                             ", at index " + index + " in the array<br>";
});
{% endhighlight %}

##### Third example using three parameters, the last one being the array itself.

This can be useful if we need to know the length of the array, or do special things within the array (add/change/move elements during the iteration):
<div id="disp03" class="disp">
    <p>
        <b>These names, ages and indexes have been generated dynamically 
      by iterating on an array using the <code>forEach</code> method with 2 parameters in the callback function</b>
  </p>
</div>
{% highlight javascript linenos %}
disp = document.querySelector("#disp03");
persons.forEach(function(p, index, theArray) {
     disp.innerHTML += p.name + ", age " + p.age +
                             ", at index " + index + " in the array of " +
                            theArray.length + " elements<br>";
});
{% endhighlight %}

##### 2 - Iterating on an array using regular loop statements
You can use any standard loop statement that we saw during in module 2. The most common way to iterate over an array is to use a for loop from 0 to length-1. 

Using this method allows elements to be iterated two by two, or the loop to be broken in the middle using the break instruction, etc.

##### Iterating over all elements in an array, using a for loop:
<div id="disp04" class="disp">
    <p>
    <b>These names, ages and indexes have been generated dynamically 
      by iterating on an array using a <code>for</code> loop.</b>
  </p>
</div>
{% highlight javascript linenos %}
disp = document.querySelector("#disp04");
for(var i = 0; i < persons.length; i++) {
  var p = persons[i]; /* current element*/
  
  disp.innerHTML += p.name + "<br>"; 
}
{% endhighlight %}

Another example where we iterate two by two (just changed the increment in the for loop):
<div id="disp05" class="disp">
    <p>
    <b>These nameshave been generated dynamically 
      by iterating 2 elements by 2 on an array using a <code>for</code> loop.</b>
  </p>
</div>
{% highlight javascript linenos %}
for(var i = 0; i < persons.length; i+=2) {
  var p = persons[i]; // current element
  
  disp.innerHTML += p.name + "<br>"; 
}
{% endhighlight %}


<script>
var a = ['Monday', 'Tuesday', 'Wednesday'];

var disp = document.querySelector("#disp01");
 
a.forEach(function(day) {
    /* day is the current element*/
    disp.innerHTML += day +
                "<br>"; // will display Monday, Tuesday, Wednesday
})

var persons = [
  {name:'Michel', age:51},
  {name:'Henri', age:20},
  {name:'Francois', age:29},
  {name:'John', age:69}
];
disp = document.querySelector("#disp02");
persons.forEach(function(p, index) {
  disp.innerHTML += p.name + ", age " + p.age + 
                             ", at index " + index + " in the array<br>"; 
});

disp = document.querySelector("#disp03");
persons.forEach(function(p, index, theArray) {
     disp.innerHTML += p.name + ", age " + p.age +
                             ", at index " + index + " in the array of " +
                            theArray.length + " elements<br>";
});

disp = document.querySelector("#disp04");
for(var i = 0; i < persons.length; i++) {
  var p = persons[i]; /* current element*/
  
  disp.innerHTML += p.name + "<br>"; 
}

disp = document.querySelector("#disp05");
for(var i = 0; i < persons.length; i+=2) {
  var p = persons[i]; /* current element*/
  
  disp.innerHTML += p.name + "<br>"; 
}

</script>