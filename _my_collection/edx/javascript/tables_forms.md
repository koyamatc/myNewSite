---
layout: post
title: HTML5 tables, forms and input fields
date: 2017-07-05 00:00:00 +900
subject: javascript
description:
  edx's course by W3C.
  Introductory course designed to understand
  the basic concepts of JavaScript.  
---

-------
#### The HTML table JavaScript API: dynamic tables!
##### Introduction

There is a JavaScript API associated with the HTML table elements that makes dynamic table management possible, enabling you to add or delete a row, add or delete a cell, modify the content of the cells, etc.

##### The Table object (&lt;table>)

When you look for a table using the DOM API or the selector API, or when you create a table using the DOM API, you get a Table object:

{% highlight javascript linenos %}
var table = document.getElementById("myTable");

var table = document.querySelector("#myTable");

var table = document.createElement("table"); // creates a new table
{% endhighlight %}

Like all objects, an instance of Table will have properties and methods:

<table class="bordered">
  <caption><h5>Most useful properties</h5></caption>
  <tr>
    <th>rows</th>
    <td>Returns a collection of all &lt;tr> elements in a table</td>
  </tr>
  <tr>
    <th>caption</th>
    <td>Returns the &lt;caption> element of a table</td>
  </tr>
  <tr>
    <th>tFoot</th>
    <td>Returns a reference to the &lt;tfoot> element of a table</td>
  </tr>
  <tr>
    <th>tHead</th>
    <td>Returns a reference to the &lt;thead> element of a table</td>
  </tr>
</table>

<table class="bordered">
  <caption><h5>Most useful methods</h5></caption>
  <tr>
    <th>insertRow()</th>
    <td>
    Creates an empty &lt;tr> element and adds it to the table. Example: var row = table.insertRow(); inserts a new row at the end of the table. var row = table.insertRow(0); inserts at index = 0, var row = table.insertRow(10); inserts at index = 10, and pushes all the rows after this index.
    </td>
  </tr>
  <tr>
    <th>deleteRow()</th>
    <td>
    Removes a row (&lt;tr>) from the table. Example table.deleteRow(0); deletes the row at index 0.
    </td>
  </tr>
  <tr>
    <th>createCaption()	</th>
    <td>
    Creates an empty &lt;caption> element and adds it to the table
    </td>
  </tr>
  <tr>
    <th>deleteCaption()</th>
    <td>
    Removes the first &lt;caption> element from the table
    </td>
  </tr>
  <tr>
    <th>createTHead()</th>
    <td>
    Creates an empty &lt;thead> element and adds it to the table
    </td>
  </tr>
  <tr>
    <th>deleteTHead()</th>
    <td>
    Removes the &lt;thead> element from the table
    </td>
  </tr>
  <tr>
    <th>createTFoot()</th>
    <td>
    Creates an empty &lt;tfoot> element and adds it to the table
    </td>
  </tr>
  <tr>
    <th>deleteTFoot()</th>
    <td>
    Removes the &lt;tfoot> element from the table
    </td>
  </tr>
</table>

<br>
<br>
Example:

<table id="myTable01" class="bordered">
 <caption>A typical HTML table</caption>  
  <tr>
    <th scope="col">Given Name</th>
    <th scope="col">Family Name</th>
    <th scope="col">Age</th>
  </tr>
  <tr>
    <td>Michel</td>
    <td>Buffa</td>
    <td>52</td>
  </tr>
  <tr>
    <td>Dark</td>
    <td>Vador</td>
    <td>Unknown</td>
  </tr>
    <tr>
    <td>Luke</td>
    <td>Skywalker</td>
    <td>Unknown</td>
  </tr>
</table>
  <p>Click to add a new row</p>
  <button class="btn" onclick="insertRow('#myTable01');">Add a new row</button>
  <p>Click to delete the first row of the table</p>
  <button class="btn" onclick="deleteFirstRow('#myTable01');">Delete first row</button>

  Notice the use of row.innerHTML= here to add some cells to the row. We will soon see another method for doing this.

##### The TableRow object (&lt;tr&gt;)

When you look for a row using the DOM API or the selector API, or when you create a row using the DOM API, you get a Row object:

{% highlight javascript linenos %}
var row1 = document.getElementById("row1");

var row1 = document.querySelector("#row1");

var newRow = document.createElement("row"); // creates a new row
{% endhighlight %}

You can also access a row from the rows property of a table:

{% highlight console linenos %}  
> var t = document.createElement("table");
undefined

> var r1 = t.insertRow(0);
undefined

> r1.innerHTML="<td>Hello</td>";
"<td>Hello</td>"

> var r2 = t.insertRow();
undefined

> r2.innerHTML="<td>Hello 2</td>";
"<td>Hello 2</td>"

> var row1 = t.rows[0];
undefined

> row1;
<tr><td>Hello</td></tr>
{% endhighlight %}

Like all objects, a TableRow object has properties and methods. Here are the most useful ones:

<table class="bordered">
  <caption>
    <h5>Most useful properties</h5>
  </caption>
    <tr>
      <th class="center">cells</th>
      <td>
      Returns a collection of all &lt;td> or &lt;th> elements in a table row
      </td>
    </tr>
    <tr>
      <th class="center">rowIndex</th>
      <td>Returns the position of a row in the rows collection of a table</td>
    </tr>
    <tr>
      <th class="center">sectionRowIndex</th>
      <td>
      Returns the position of a row in the rows collection of a &lt;tbody>, &lt;thead>, or &lt;tfoot>
      </td>
    </tr>
</table>

<table class="bordered">
  <caption>
    <h5>Most useful methods</h5>
    <tr>
      <th class="center">insertCell()</th>
      <td>
      Inserts a cell into the current table row. Without parameters, appends a cell after the last cell of the row. You can pass the index of the cell as a unique parameter, in which case other cells are "pushed" to the right. The value of 0 results in the new cell being inserted at the first position. The value of -1 can also be used, which results in the new cell being inserted in the last position.
      </td>
    </tr>
    <tr>
      <th class="center">deleteCell()</th>
      <td>
      Deletes a cell from the current table row. There is one parameter for this method: the index of the cell to remove. The value of 0 results in the deletion of the first cell. The value of -1 can also be used, which results in the deletion of the last cell.
      </td>
    </tr>
  </caption>
</table>

<br><br>
Example

<table id="myTable02">
 <caption><h5>A typical HTML table</h5></caption>  
  <tr>
    <th scope="col">Given Name</th>
    <th scope="col">Family Name</th>
    <th scope="col">Age</th>
  </tr>
  <tr>
    <td>Michel</td>
    <td>Buffa</td>
    <td>52</td>
  </tr>
  <tr>
    <td>Dark</td>
    <td>Vador</td>
    <td>Unknown</td>
  </tr>
    <tr>
    <td>Luke</td>
    <td>Skywalker</td>
    <td>Unknown</td>
  </tr>
</table>
  <p>Click to add a new row</p>
  <button class="btn" onclick="insertRow('#myTable02');">Add a new row</button>
  <p>Click to delete the first row of the table</p>
  <button class="btn" onclick="deleteFirstRow('#myTable02');">Delete first row</button>

#####  Notice how we've created the new row cells:

{% highlight javascript linenos %}  
  function insertRow() {
      var table = document.querySelector("#myTable");
      // without parameters, insert at the end,
      // otherwise parameter = index where the row will be inserted
      var row = table.insertRow();
      var cell1 = row.insertCell();
      cell1.innerHTML = "New cell1";
      var cell2 = row.insertCell();
      cell2.innerHTML = "New cell2";
      var cell3 = row.insertCell();
      cell3.innerHTML = "New cell3";
  }
{% endhighlight %}

So use insertCell() or just row.innerHTML="<td>...</td>" ? It's up to you: depending on the HTML that you plan to insert into each cell, one version may be more readable than the other.

------

#### HTML forms: best practices

##### 1 - Creating accessible forms

Forms are commonly used to enable user interaction within Web sites and Web applications, for example, for login, registering, commenting, and purchasing.

Since HTML5 provides functionalities to assist with accessibility, developers should make a concerted effort to mark up Web based forms. The following two guidelines are to give you a good start to make your forms accessible:

<ul class="collection">
  <li class="collection-item">
  1. For every form field, ensure that a descriptive label is provided and use the &lt;label> element to identify each form control.
  </li>
  <li class="collection-item">
  2. For larger or complex forms, use the &lt;fieldset> and &lt;legend> elements to respectively group and associate related form controls.
  </li>
</ul>

We will give usage examples for each of these two basic guidelines in the following pages.

__Further reading__

The WAI Web site hosts [a Forms tutorial]('https://www.w3.org/WAI/tutorials/forms/') where you will find more guidelines to help make your forms truly accessible: Form Instructions, Validating Input, User Notifications,

##### 2 - Why is this important?

Forms can be visually and cognitively complex and difficult to use. Accessible forms are easier to use for everyone, including people with disabilities.

<ul class="collection">
  <li class="collection-item">
  <b>People with cognitive disabilities</b> can more easily understand the form and how to complete it, as making forms accessible improves the layout structure, instructions, and feedback.
  </li>
  <li class="collection-item">
  <b>People using speech input</b> can use the labels via voice commands to activate controls and move the focus to the fields that they need to complete.
  </li>
  <li class="collection-item">
  <b>People with limited dexterity</b> benefit from large clickable areas that include the labels, especially for smaller controls, such as radio buttons and checkboxes.
  </li>
  <li class="collection-item">
  <b>People using screen readers</b> can identify and understand form controls more easily because they are associated with labels, field sets, and other structural elements.
  </li>
</ul>

##### 3 - Labeling controls

__Labels need to describe the purpose of the form control__

Form fields and other form controls usually have visible labels, such as "E-mail Address:" as the label for a text field (see figure below).
<form action="">
<label for="email0">E-mail address:</label>
<input type="text" id="email0">
</form>

When these labels are marked up correctly, people can interact with them using only the keyboard, using voice input, and using screen readers. Also, the label itself becomes clickable, which enables a person who has difficulty clicking on small radio buttons or checkboxes to click anywhere on the label text.

__Associating labels explicitly__

Whenever possible, use the label element to explicitly associate text with form elements. The for attribute of the label must exactly match the id of the form control.

Example 1 (click on the label, not on the input field to see the effect)

<label for="first_name">Your First Name</label>
<input id="first_name" type="text" name="fname"/>

Source code:
{% highlight javascript linenos %}
<label for="first_name">Your First Name</label>
<input id="first_name" type="text" name="fname"/>
{% endhighlight %}

__Alternative example 1__

Note that you can also include the <input> element inside the <label>...</label> element, and also add a <span lang="en"> for example, to indicate the language used in the label. Sometimes, nesting labels and inputs can also make CSS styling easier and produce better results with screen readers.

<label for="first_name01"><span lang=en">Your First Name</span>
    <input id="first_name01" type="text" name="fname"/>
</label>

Source code (with <input> inside the <label>):
{% highlight javascript linenos %}
<label for="first_name"><span lang=en">Your First Name</span>
    <input id="first_name" type="text" name="fname"/>
</label>
{% endhighlight %}

__Example 2 (click on the label "Subscribe to newsletter" to see the effect)__

<label for="firstname">First name:</label>
<input type="text" name="firstname" id="firstname"><br>
<label for="subscribe">Subscribe to newsletter</label>
<input type="checkbox" name="subscribe" id="subscribe">

Source code:
{% highlight javascript linenos %}
<label for="firstname">First name:</label>
<input type="text" name="firstname" id="firstname"><br>
<label for="subscribe">Subscribe to newsletter</label>
<input type="checkbox" name="subscribe" id="subscribe">
{% endhighlight %}

##### 4 - Labeling buttons

The label of a &lt;button> element is set inside the element and can include markup. This allows advanced accessibility hints to be included, such as marking up language change.

Example: &lt;button>Mon &lt;span lang="fr">bouton&lt;/span>&lt;/button>, for a button with a label in French.

When using the &lt;input> element to create buttons, the label is set in the value attribute of the element.

Example: &lt;input type="submit" value="Please submit">, will be rendered as a button.

Source code for an example of "Submit" and "Cancel" buttons:
{% highlight javascript linenos %}
<button type="submit">Submit</button>
<button type="button">Cancel</button>

<input type="submit" value="Submit">
<input type="button" value="Cancel">
{% endhighlight %}

These will produce the same results:

Lines 1 and 2 render as:
<br>
<button type="submit">Submit</button>
<button type="button">Cancel</button>

While lines 3 and 4 render as:
<br>
<input type="submit" value="Submit">
<input type="button" value="Cancel">

##### 5 - Labeling text areas

<label for="address">Enter your address:</label>
<br>
<textarea id="address" name="addresstext"></textarea>

Source code:
{% highlight javascript linenos %}
<label for="address">Enter your address:</label>
<br>
<textarea id="address" name="addresstext"></textarea>
{% endhighlight %}

##### 6 - Grouping controls

Groupings of form controls, typically groups of related checkboxes and radio buttons, sometimes require a higher level description. Grouping related form controls makes forms more understandable for all users, as related controls are easier to identify.

__Associating related controls with fieldset__

Grouping needs to be carried out visually and in the code, for example, by using the &lt;fieldset> and &lt;legend> elements to associate related form controls. The &lt;fieldset> identifies the entire grouping and &lt;legend> identifies the grouping's descriptive text.

__Example 1 - Radio buttons__

In the example below, there are three radio buttons that allow the user to choose an output format. Radio button groups should always be grouped using <fieldset>.

<fieldset>
   <legend>Output format</legend>
      <div>
         <input type="radio" name="format" id="txt" value="txt" checked>
         <label for="txt">Text file</label>
      </div>
   <div>
      <input type="radio" name="format" id="csv" value="csv">
      <label for="csv">CSV file</label>
   </div>
   <div>
      <input type="radio" name="format" id="html" value="html">
      <label for="html">HTML file</label>
   </div>
</fieldset>

Source code:

{% highlight javascript linenos %}
<fieldset>
   <legend>Output format</legend>
      <div>
         <input type="radio" name="format" id="txt" value="txt" checked>
         <label for="txt">Text file</label>
      </div>
   <div>
      <input type="radio" name="format" id="csv" value="csv">
      <label for="csv">CSV file</label>
   </div>
[…]
</fieldset>
{% endhighlight %}

Example 2 - Checkboxes

In the example below, there are three checkboxes that are all part of an opt-in function for receiving different types of information.

<fieldset>
   <legend>I want to receive</legend>
   <div>
      <input type="checkbox" name="newsletter" id="check_1">
      <label for="check_1">The weekly newsletter</label>
   </div>
   <div>
      <input type="checkbox" name="newsletter" id="check_2">
      <label for="check_2">Offers from the company</label>
   </div>
   <div>
      <input type="checkbox" name="newsletter" id="check_3">
      <label for="check_3">Offers from associated companies</label>
   </div>

</fieldset>


Source code:
{% highlight javascript linenos %}
<fieldset>
   <legend>I want to receive</legend>
   <div>
      <input type="checkbox" name="newsletter" id="check_1">
      <label for="check_1">The weekly newsletter</label>
   </div>
   […]
</fieldset>
{% endhighlight %}

##### [ADVANCED] Associating related controls with WAI-ARIA

WAI-ARIA provides a grouping role that functions in a similar way to fieldset and legend. For example, a div element can have role=group to indicate that the contained elements are members of a group.

WAI-ARIA roles are very important in the accessibility world, and we invite you to see an example provided in the [associated WAI tutorial]('https://www.w3.org/WAI/tutorials/forms/grouping/'). This article by Oscar Cao gives an [Introduction to understanding WAI-ARIA 1.0 roles]('https://oscarcao.com/blog/2015/06/08/introduction-to-understanding-wai-aria-1-0-roles/').

#### HTML forms and JavaScript  
##### Introduction

Forms are a way to get user input which is either sent to a remote server, or processed locally, or both.

This section of the course will only cover local processing and the client-side part, with a focus on JavaScript processing.

__Typical example__
<form id="myForm01">
  <fieldset>
    <legend>Personal informations</legend>

    <label for="givenName">Given name:</label>
    <input type="text" id="givenName" required name="givenName">

    <br>

    <label for="familyName">Family name:</label>
    <input type="text" id="familyName" required name="familyName">

    <br>
     <label for="email">Email:</label>
    <input type="email" id="email" required name="email">

     <br>
     <label for="age">Age:</label>
    <input type="number" min="0" max="120"  step="5" id="age" required name="age">

         <br>
     <label for="date">Birth date:</label>
    <input type="date"  id="date" required name="date">
  </fieldset>

  <button>Submit form</button>
  </form>
{% highlight html linenos %}
<form id="myForm">
  <fieldset>
    <legend>Personal informations</legend>

    <label for="givenName">Given name:</label>
    <input type="text" id="givenName" required name="givenName">

    <br>

    <label for="familyName">Family name:</label>
    <input type="text" id="familyName" required name="familyName">

    <br>
     <label for="email">Email:</label>
    <input type="email" id="email" required name="email">

     <br>
     <label for="age">Age:</label>
    <input type="number" min=0 max=120  step=5 id="age" required name="age">

         <br>
     <label for="date">Birth date:</label>
    <input type="date"  id="date" required name="date">
  </fieldset>

  <button>Submit form</button>
  </form>
  {% endhighlight %}

##### HTML form input can be sent to a server without JavaScript

If a form's content is sent to a remote server, on the server side, you may have PHP, Java, C#, Ruby, Python, etc. components. There are several ways to collect server-side data from a form in a Web page: REST Web services, servlets, Microsoft ASP pages, etc.

On the client side, the forms indicate to which server and how the data should be sent,  using the action and method attributes respectively. A &lt;button type="submit"> or an &lt;input type=submit> field is used to submit the form content.

For example: &lt;form action="myServerCode.php" method="POST">...&lt;/form>. Here, we set the URL of the server side code (myServerCode.php), and the HTTP method that will be used by the browser for sending the form content (POST).

Example of HTML5 form that will not be sent if invalid input fields are present. Notice that the JavaScript part is only used for giving feedback while entering the password. No JavaScript is used for sending the form data, or for complex, global validation:

<form action="forum.cfm" method="post">
    <fieldset>
        <legend>The bits I need to make you join my forum</legend>
        <label for="givenName">Given name</label>
        <input required type="text" name="givenName" id="givenName" autocomplete="off" autofocus />
        <br/>
        <label for="familyName">family name</label>
        <input required type="text" name="familyName" id="familyName" autocomplete="off" />
        <br/>
        <label for="passwordA">Password</label>
        <input required type="password" name="passwordA" id="passwordA" oninput="checkpasswords()" />
        <meter id="passwordStrength" min="0" max="10" value="0" low="5"></meter>
        <br/>
        <label for="passwordB">Make sure it's right</label>
        <input required type="password" name="passwordB" id="passwordB" oninput="checkpasswords()" />
        <br/>
    </fieldset>
    <fieldset>
        <legend>Random bits I don't need, I'm just curious</legend>
        <label for="dob">Birthday</label>
        <input type="date" name="dob" id="dob">
        <br/>
        <label for="email">E-mail</label>
        <input type="email" name="email" id="email" autocomplete="off"/>
        <br/>
        <label for="whereami">Hide and seek location</label>
        <textarea name="whereami" id="whereami"></textarea>
        <button id="findme" type="button">Locate me</button>
        <br/>                   
    </fieldset>
    <fieldset>
        <legend>Answer me these questions three</legend>
        <label for="quest">What is your quest?</label>
        <input name="quest" id="quest" type="search" placeholder="I seek..." autocomplete="off" />
        <br/>
        <label for="colour">What is you favourite colour?</label>
        <input type="color" id="colour" name="colour" oninput="this.style.backgroundColor = this.value);" />
        <br/>
        <label for="swallow">What is the wind speed velocity of an unladen swallow?</label>
        <input list="swallows" id="swallow" name="swallow" />
        <datalist id="swallows">
            <option value="African or European?"></option>
        </datalist>
        <br />
    </fieldset>
    <fieldset>
        <legend>Sanity checks</legend>
        <label for="chuck">How much wood would a woodchuck chuck if a woodchuck could chuck wood?</label>
        <input type="number" name="chuck" id="chuck" min="1" max="15" step="1" value="1" />
        <br/>
        <label for="santa">How possessed by Santa are you right now?</label>
        <input name="santa" id="santa" type="range" min="1" max="12" step="1" value="1" />
        <output name="so" id="santaoutput">1</output>
        <br/>
        <label for="call">Who you gonna call?</label>
        <input list="callingoptions" id="call" name="call" pattern="Ghostbusters|[0-9]*" oninput="validateCallingOptions();" />
        <datalist id="callingoptions">
            <option value="Ghostbusters"></option>
        </datalist>         
    </fieldset>
    <input type="submit" value="Register!" />
</form>  

##### HTML form input can be sent using Ajax / JavaScript

Another approach is to use JavaScript for sending the form content with Ajax. This will be covered in the JavaScript advanced course, to be be available on W3Cx.

##### JavaScript can be used for validating user input "on the fly"

While one is typing or selecting a color, or moving a slider, JavaScript event listeners can be used to track the user's interactions in real time, and perform some validation steps along with giving visual feedback.

We've already seen how we can track the keys typed in an input field in real time:

<h4>Simple input field validation using the 'input' event</h4>
  <p>Just type a name in the input field and see what happens! <span style="color:red"> TRY TO TYPE A "!" too</span></p>
<label>
  <span>Name (required):</span>
  <input type="text"
         name="nom"
         maxlength="32"
         required
         onkeyup = "validateName(event)">
</label>
  <p>
  <span id="keyTyped"></span>
</p>  

__JavaScript can be used for a more global validation before sending a form to a remote server__

Example: checking that a password entered twice is identical in two different input fields, that some values are coherent (e.g. a birthday cannot be in the future), etc.
<form class="myForm" onsubmit="return submitForm();">
  <fieldset>
    <legend>Example use of the validation API:<br> try to submit with different passwords, <br>and with same passwords</legend>
    <label for="password1" >Password:</label>
    <input type="password" id="password1" oninput="checkPasswords()" required>
    <p></p>
    <label for="password2">Repeat password:</label>
    <input type="password" id="password2" oninput="checkPasswords()" required>
    <p></p>
    <button class="btn">Submit</button>
  </fieldset>
</form>
<h5 id="msg"></h5>

__JavaScript can be used to make a WebApp that uses form data locally, perhaps with some client-side persistence API__

For example, a contact manager that will work offline, saving data locally, in a database inside the browser. Data will be displayed in a dynamic HTML table, without the need for a remote database.

This is the small project we will build together at the end of the course. :-)

<style>
input:invalid:required,
input:invalid {
    background-color: #FFB6C1;
    border: 2px solid #FF0000;
}

form {
    margin: 20px;
}
fieldset {
    border: none;
}
legend {
    border-bottom: 2px solid #00008B;
    color: #00008B;
    font-family: Verdana;
    font-size:14px;
    width: 400px;
}
label {
    display: inline-block;
    padding: 4px;
    text-align: right;
    width: 400px;
}
input[type=text],
input[type=password],
input[type=date],
input[type=email],
input[type=search],
input[list],
input[type=color],
input[type=number],
input[type=submit],
input[type=button],
textarea {
    border: 2px solid #00008B;
    border-radius: 5px;
    padding: 7px;
    width: 300px;
}
textarea {
    height: 100px;
    vertical-align: top;
}
input[type=search] {
    width: 320px;
}
input[type=color] {
    cursor: pointer;
    height: 40px
    width: 150px;
}
input[type=number] {
    width: 150px;
}
input[type=range] {
    width: 300px;
}
meter {
    height: 20px;
    width: 100px;
}
input[type=submit] {
    background-color: #BEBEF7;
    color: #00008B;
    cursor:pointer;
    font-weight: bold;
    margin-left: 420px;
    width: 320px;
}
input[type=button] {
    background-color: #EFBDB8;
    border-color: #8B0000;
    color: #8b0000;
    cursor:pointer;
    font-weight: bold;
    margin-left: 420px;
    width: 320px;
}
</style>

<script>
function insertRow(target) {
  var table = document.querySelector(target);


  // without parameters, insert at the end,
  // otherwise parameter = index where the row will be inserted
  var row = table.insertRow();

  row.innerHTML = "<td>New</td><td>New</td><td>New</td>"
}

function deleteFirstRow(target) {
  var table = document.querySelector(target);
  table.deleteRow(1); // 0 is the header
}

/********************************/
function checkpasswords() {
    var p1 = document.getElementById("passwordA");
    var p2 = document.getElementById("passwordB");
    if (p1.value !== p2.value) {
        p2.setCustomValidity("Passwords do not match");
    } else {
        p2.setCustomValidity("");
    }
    var strength = document.getElementById("passwordStrength");
    var multiplier = 0;
    if ( /[a-z]/.test(p1.value) ) { multiplier++; }
    if ( /[A-Z]/.test(p1.value) ) { multiplier++; }
    if ( /[0-9]/.test(p1.value) ) { multiplier++; }
    strength.value = p1.value.length * multiplier;
}
function validateCallingOptions() {
    var input = document.getElementById("call");
    var validity = input.validity;
    if (validity.patternMismatch) {
        input.setCustomValidity("Not a phone number");
    } else {
        input.setCustomValidity("");
    }
}

/************************************/
function validateName(evt) {
  // this is the input field text content
  var key = evt.key;  

  // get the output div
  var output = document.querySelector('#keyTyped');
  // display the value typed in the div
  output.innerHTML = "Valid key: " + key;

  // You can do validation here, set the input field to
  // invalid is the name contains forbidden characters
  // or is too short
  // for example, let's forbid names with length < 5 chars
  if(key === "!") {
    output.innerHTML = "This key is forbidden!";
    // remove the forbodden char
    // current typed value
    var name = evt.target.value;
    // we use the substring JavaScript function
    // to remove the last character
    // first parameter = start index
    // second = last index
    evt.target.value = name.substring(0, name.length-1);
  }
}

/********************************************/
function checkPasswords() {
    document.querySelector('#msg').innerHTML = "";
    var password1 = document.querySelector('#password1');
    var password2 = document.querySelector('#password2');

    // Use HTML5 form validation API
    if (password1.value !== password2.value) {
       // password2 input field is invalid
       password2.setCustomValidity('Passwords are different');
    } else {
      // call to setCustomValidity with an empty arguments
      // indicates that the input field is valid
       password2.setCustomValidity('');
    }
}

function submitForm() {

  document.querySelector('#msg').append("We can submit, the form is valid!");

  // Here, for example, we can do what we want with the data
  // Send to a server using Ajax,
  // show the data in a table,
  // save data client-side, etc.

  // returning false will not submit the form
  return false;
}
</script>
