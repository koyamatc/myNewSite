---
layout: post
title: A contact manager project
date: 2017-07-07 00:00:00 +900
subject: javascript
description:
  edx's course by W3C.
  Introductory course designed to understand
  the basic concepts of JavaScript.  
---

-------
#### Part 1: a contact manager
##### A small project that uses ES6 classes, local storage, the HTML table JavaScript API and forms

__Introduction__
In this final part of the course, we will build together a minimal contact manager that shows how to use ES6 classes and some JavaScript APIs.

This is a play project that you can easily improve:

<ul class="collection">
  <li class="collection-item">
  A contact, in this application, is just a person with a name and an email. Feel free to add other properties and methods to the Contact class.
  </li>
  <li class="collection-item">
  The contactManager is also an ES6 class with methods for adding, removing, sorting, saving and loading contacts on your hard disk. We will add new functionalities, step by step, in the next sections, but you can improve the examples provided by adding your own new features (build a better HTML table, add new sorting options, etc.)
  </li>
</ul>

Let's start with a simple skeleton (no GUI), beginning with the Contact class
{% highlight javascript linenos %}
class Contact {
   constructor(name, email) {
      this.name = name;
      this.email = email;
   }
}
{% endhighlight %}

As you can see, a contact is just a name and an email. We will use the above class like this:
{% highlight javascript linenos %}
var c1 = new Contact("Jimi Hendrix", "jimi@rip.com");
var c2 = new Contact("Robert Fripp", "robert.fripp@kingcrimson.com");
{% endhighlight %}

Then you can print the properties of contact c1 or c2 using for example console.log(c1.name), console.log(c2.email), etc.

__A minimal ContactManager class__

{% highlight javascript linenos %}
class ContactManager {
    constructor() {
        // when we build the contact manager, it
        // has an empty list of contacts
        this.listOfContacts = [];
    }

    add(contact) {
        this.listOfContacts.push(contact);
    }

    remove(contact) {
        // we iterate on the list of contacts until we find the contact
        // passed as a parameter (we say that they are equal if emails match)
        for(let i = 0; i < this.listOfContacts.length; i++) {
            var c = this.listOfContacts[i];

            if(c.email === contact.email) {
                // remove the contact at index i
                this.listOfContacts.splice(i, i);
                // stop/exit the loop
                break;
            }
         };
    }

    printContactsToConsole() {
        this.listOfContacts.forEach(function(c) {
            console.log(c.name);
        });
    };
}
{% endhighlight %}

Explanations:

This is a minimal ES6 class for building a contact manager. It has only one property: the list of contacts, and a method for adding a new contact (line 8), one for removing a contact (line 12), that iterate on the list of contacts until the contact passed as a parameter is found (when email properties match), then the contact is removed using the splice method, and we go out from the loop using the break statement (line 22).

It also has a utility method for printing to the console the list of contacts (line 27).

We can use the contact manager like this:

{% highlight javascript linenos %}
var cm = new ContactManager();
var c1 = new Contact("Jimi Hendrix", "jimi@rip.com");
var c2 = new Contact("Robert Fripp", "robert.fripp@kingcrimson.com");
var c3 = new Contact("Angus Young", "angus@acdc.com");
var c4 = new Contact("Arnold Schwarzenneger", "T2@terminator.com");

console.log("--- Adding 4 contacts ---")
cm.add(c1);
cm.add(c2);
cm.add(c3);
cm.add(c4);

cm.printContactsToConsole();
{% endhighlight %}

As you can see, this is a very minimal version. It's always a good idea to start with very simple structures/classes, and a few methods. Then type the code on CodePen or jsBin and use the devtool console. Check that there are no syntax errors, that everything runs smoothly.

__Adding a method for sorting the list of contacts by name__

Do you remember the sort() method you can use on arrays? We saw it in modules 2 or 3. Since our array contains objects, we must provide a callback for comparing two elements by name. Here is the code for the new sort() method we added to the ContactManager class:
{% highlight javascript linenos %}
sort() {
    // As our array contains objects, we need to pass as argument
    // a method that can compare two contacts.
    // we use a class method, which is similar to the distance(p1, p2)
    // method we saw in the ES6 Point class in module 4
    // We always call such methods using the name of the class followed
    // by the dot operator
    this.listOfContacts.sort(ContactManager.compareByName);
}
// class method for comparing two contacts by name
static compareByName(c1, c2) {
    // JavaScript has built in capabilities for comparing strings
    // in alphabetical order
    if (c1.name < c2.name)
        return -1;
    if (c1.name > c2.name)
        return 1;
    return 0; // c1.name = c2.name
}
{% endhighlight %}

The important thing here is to notice that we declared the compareByName method as a class method (using the static keyword). This is similar to what we did in the Point class example from module 4, when we explained the "class properties and methods". This method compareByName does not depend on any instance of the contact manager, consequently: it's a class method.

#### Part 2: persistence
We will use load/save methods is for loading and saving the list of contacts in Local Storage.

__Our task: load and save methods (persistence)__

This time, we will add to the ContactManager class a load() and a save() method for loading/saving from disk (from a key/value pair database located on your hard disk, and associated to the domain of your Web application).

__Saving the list of contacts in JSON, checking the saved value using the devtools__

Here is the code we added to the ES6 class for saving the list of contacts in JSON:
{% highlight javascript linenos %}
class ContactManager {
    constructor() {
        // when we build the contact manager, it
        // has an empty list of contacts
        this.listOfContacts = [];
    }
    ...

    save() {
        // We can only save strings in local storage. So, let's convert
        // our array of contacts to JSON
        localStorage.contacts = JSON.stringify(this.listOfContacts);
     }
}
{% endhighlight %}

You write data identified by a key in localStorage like this:
<ul class="collection">
  <li class="collection-item">
  localStorage.keyName = a string value
  </li>
</ul>

In our case, line 13 saves the list of contacts with a key named "contacts" in the local storage. In order to save the list of contacts as a string, we convert it to the JSON format using the  JSON.stringify(...) method (JSON = string based)

__Restoring the list of contacts__

This time, we've added a load() method that will check if a list of contacts has been saved. If this is the case, it will read it from LocalStorage, convert it back from JSON into a JavaScript object. In order to test this, in the following CodePen, we first save the list, then we empty the list in memory (setting the array to an empty array), print the list of contacts (that displays a message "LIST EMPTY!"), then we load the contacts from LocalStorage and print the list again: it has been restored to its previous value.

{% highlight JavaScript linenos %}
class ContactManager {
    constructor() {
        // when we build the contact manager, it
        // has an empty list of contacts
        this.listOfContacts = [];
    }

    // Will erase all contacts
    empty() {
        this.listOfContacts = [];
    }

    ...

    load() {
        if(localStorage.contacts !== undefined) {
            // the array of contacts is saved in JSON, let's convert
            // it back to a reak JavaScript object.
            this.listOfContacts = JSON.parse(localStorage.contacts);
        }
    }
}

...

console.log("--- Saving contacts to local storage ---");
cm.save();

console.log("--- Emptying the list of contacts ---");
cm.empty();
cm.printContactsToConsole();

console.log("--- Loading contacts from local storage ---");
cm.load();
cm.printContactsToConsole();
console.log("Do you notice: contacts have all been restored!");
{% endhighlight %}

Explanations:

<ul class="collection">
  <li class="collection-item">
  At line 16, we check if a previous version has been saved.
  </li>
  <li class="collection-item">
  At line 19, we read the string value associated to the key named "contacts", and use JSON.parse(...) to turn it into a JavaScript object we can work with.
  </li>
  <li class="collection-item">
  Lines 26-36 test the load/save/empty functionalities. You can try this yourself live: click on the CodePen label below, on the top right corner, and once in CodePen, open the CodePen console (or the read devtool console) to see the result of the execution of these tests.
  </li>
</ul>

#### Part 3: display contacts in an HTML5 table
##### Adapt the code we saw in a previous part of this module, that generates an HTML5 table dynamically

We're going to reuse the code from this CodePen (example taken from a previous section of the course, the one about working with remote data), and adapt it to our needs:

This time, we will first add some HTML to the contact manager example (same as in the previous CodePen except that we've renamed "users" as "contacts"):

{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
    <title>A contact manager, v3</title>
    <meta charset="utf-8"/>
</head>
<body>
    <p>List of contacts</p>
    <div id="contacts"></div>
</body>
</html>
{% endhighlight %}

The div at line 9 is where we're going to dynamically insert an HTML table with one row for each contact. We will keep the same minimal CSS for displaying table, row and cell borders (we encourage you to improve this):
{% highlight css linenos %}
table {
   margin-top: 20px;
}

table, tr, td {
   border: 1px solid;
}
{% endhighlight %}

And here is the method we add in our ContactManager class; an adaptation of the function displayUsersAsATable(users) from the previous CodePen:

{% highlight javascript linenos %}  
class ContactManager {
    .....
    displayContactsAsATable(idOfContainer) {
        // to empty the container that contains the results
        let container = document.querySelector("#" + idOfContainer);
        container.innerHTML = "";


        if(this.listOfContacts.length === 0) {
            container.innerHTML = "<p>No contacts to display!</p>";
            // stops the execution of this method
            return;
        }

        // creates and populates the table with users
        let table = document.createElement("table");

        // iterates on the array of users
        this.listOfContacts.forEach(function(currentContact) {
            // creates a row
            let row = table.insertRow();

            row.innerHTML = "<td>" + currentContact.name + "</td>"
                          + "<td>" + currentContact.email + "</td>"
        });

        // adds the table to the div
        container.appendChild(table);
    }
}
{% endhighlight %}

Explanations:

<ul class="collection">
  <li class="collection-item">
  Line 3: the method displayContactsAsATable takes as a parameter the id of the HTML element in which the table will be inserted after being built. This id is used by the querySelector call at line 5.
  </li>
  <li class="collection-item">
  Lines 9-13: if the list of contacts is empty, we just return, but first we display in the HTML container a message: "No contact to display!"
  </li>
  <li class="collection-item">
  Lines 16-25: we create a table, and for each contact we insert and fill a new row in the table.
  </li>
  <li class="collection-item">
  Line 28: the table is inserted (appended) in the HTML container.
  </li>
</ul>

#### Part 4: use a form to enter new contacts
##### Part 4: use a form to enter new contacts in an HTML5 table
__Some reminders about HTML forms__

In the previous example, we added a form for entering a new contact, and an "add" button.

Here is the HTML code of the form:
{% highlight html linenos %}
<form onsubmit="return formSubmitted();">
    <fieldset>
        <legend>Personal informations</legend>
        <label for="name">
            Name :
            <input type="text" id="name" required>
        </label>
        <label for="email">
            Email :
            <input type="email" id="email" required>
        </label>
        <br>
        <button>Add new Contact</button>
    </fieldset>
</form>
{% endhighlight %}

The button at line 13 will submit the form by default (it's equivalent to an &lt;input type="submit">).

The event listener at line 1:
{% highlight html linenos %}
<form onsubmit="return formSubmitted();">
{% endhighlight %}

... will call the formSubmitted function when the form is submitted. It is interesting that we use onclick="return formSubmitted();":

<ul class="collection">
  <li class="collection-item">
  If the returned value is true, the form will be submitted by your browser (this would reload the HTML page).
  </li>
  <li class="collection-item">
  If the returned value is false, the form will not be submitted (this is what we want, so we will return false in the formSubmitted function).
  </li>
</ul>

Here is the code of the formSubmitted function:
{% highlight javascript linenos %}
function formSubmitted() {
    // Get the values from input fields
    let name = document.querySelector("#name");
    let email = document.querySelector("#email");

    let newContact = new Contact(name.value, email.value);
    cm.add(newContact);

    // Empty the input fields
    name.value = "";
    email.value = "";

    // refresh the table
    cm.displayContactsAsATable("contacts");

    // do not let your browser submit the form using HTTP
    return false;
}
{% endhighlight %}

Explanations:

<ul class="collection">
  <li class="collection-item">
  Lines 2-7: we get the values entered in the form's input fields, build a new contact and add it to the contact list
  </li>
  <li class="collection-item">
  Lines 10-11: we reset the content of the input fields (we empty them)
  </li>
  <li class="collection-item">
  Line 14: we display the HTML table with the new added contact
  </li>
  <li class="collection-item">
  Line 17: we return false so that the form will not be submitted. This will prevent the browser from reloading the HTML page.
  </li>
</ul>

Notice that we've also added some buttons for playing with the load/save features we implemented in the previous page:

<ul class="collection">
  <li class="collection-item">
  Add some new contacts to the list using the form,
  </li>
  <li class="collection-item">
  Save them by clicking on the save button,
  </li>
  <li class="collection-item">
  Empty the list, click the empty button,
  </li>
  <li class="collection-item">
  Reload the list... you can see that contacts have been correctly saved and restored!
  </li>
</ul>

<form onsubmit="return formSubmitted();">
	 <fieldset>
    <legend>Personal informations</legend>
		<label>
			Name :
			<input type="text" id="name" required>
		</label>
		<label>
			Email :
			<input type="email" id="email" required>
		</label>
		<br>
		<button class="btn">Add new Contact</button>
		 </fieldset>
	</form>
  <h4>List of contacts</h4>
  <div id="contacts"></div>

   <button class="btn" onclick="emptyList();">Empty</button>
	 <button class="btn" onclick="cm.save();">Save</button>
   <button class="btn" onclick="loadList();">Load</button>

<script>
window.onload= init;

// The contact manager as a global variable
let cm;

function init() {
	// create an instance of the contact manager
	cm = new ContactManager();

  	cm.addTestData();
  	cm.printContactsToConsole();

	  // Display contacts in a table
	  // Pass the id of the HTML element that will contain the table
	  cm.displayContactsAsATable("contacts");
}

function formSubmitted() {
	// Get the values from input fields
	let name = document.querySelector("#name");
  let email = document.querySelector("#email");
	let newContact = new Contact(name.value, email.value);
	cm.add(newContact);

	// Empty the input fields
	name.value = "";
	email.value = "";

	// refresh the html table
	cm.displayContactsAsATable("contacts");

	// do not let your browser submit the form using HTTP
	return false;
}

function emptyList() {
	cm.empty();
  	cm.displayContactsAsATable("contacts");
}

function loadList() {
	cm.load();
  	cm.displayContactsAsATable("contacts");
}


class Contact {
	constructor(name, email) {
		this.name = name;
		this.email = email;
	}
}

class ContactManager {
	constructor() {
		// when we build the contact manager, it
		// has an empty list of contacts
		this.listOfContacts = [];
	}

	addTestData() {
		var c1 = new Contact("Jimi Hendrix", "jimi@rip.com");
  	var c2 = new Contact("Robert Fripp", "robert.fripp@kingcrimson.com");
  	var c3 = new Contact("Angus Young", "angus@acdc.com");
  	var c4 = new Contact("Arnold Schwarzenneger", "T2@terminator.com");

		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);

		// Let's sort the list of contacts by Name
		this.sort();
	}

	// Will erase all contacts
	empty() {
		this.listOfContacts = [];
	}

	add(contact) {
		this.listOfContacts.push(contact);
	}

	remove(contact) {
		for(let i = 0; i < this.listOfContacts.length; i++) {
			var c = this.listOfContacts[i];

			if(c.email === contact.email) {
				// remove the contact at index i
				this.listOfContacts.splice(i, i);
				// stop/exit the loop
				break;
			}
		}
	}

	sort() {
		// As our array contains objects, we need to pass as argument
		// a method that can compare two contacts.
		// we use for that a class method, similar to the distance(p1, p2)
		// method we saw in the ES6 Point class in module 4
		// We always call such methods using the name of the class followed
		// by the dot operator
		this.listOfContacts.sort(ContactManager.compareByName);
	}

	// class method for comparing two contacts by name
	static compareByName(c1, c2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (c1.name < c2.name)
     		return -1;

    	if (c1.name > c2.name)
     		return 1;

    	return 0;
	}

	printContactsToConsole() {
		this.listOfContacts.forEach(function(c) {
			console.log(c.name);
		});
	}

	load() {
		if(localStorage.contacts !== undefined) {
			// the array of contacts is savec in JSON, let's convert
			// it back to a reak JavaScript object.
			this.listOfContacts = JSON.parse(localStorage.contacts);
		}
	}

	save() {
		// We can only save strings in local Storage. So, let's convert
		// ou array of contacts to JSON
		localStorage.contacts = JSON.stringify(this.listOfContacts);
	}

  	displayContactsAsATable(idOfContainer) {
		// empty the container that contains the results
    	let container = document.querySelector("#" + idOfContainer);
    	container.innerHTML = "";


		if(this.listOfContacts.length === 0) {
			container.innerHTML = "<p>No contacts to display!</p>";
			// stop the execution of this method
			return;
		}  

    	// creates and populate the table with users
    	var table = document.createElement("table");

    	// iterate on the array of users
    	this.listOfContacts.forEach(function(currentContact) {
        	// creates a row
        	var row = table.insertRow();

			row.innerHTML = "<td>" + currentContact.name + "</td>"
							+ "<td>" + currentContact.email + "</td>"
     	});

     	// adds the table to the div
     	container.appendChild(table);
  	}
}
</script>
