---
layout: post
title: Introduction to Javascript
date: 2017-06-12 00:00:00 +900
categories: post javascript
description:
  edx's course by W3C.
  Introductory course designed to understand 
  the basic concepts of JavaScript.  
---

-------
### Module1

#### First Example

<div id="myFunction"></div>

HTML
<pre>
&lt;div id="myFunction">&lt;/div>
&lt;!-- import external libraries -->
&lt;script src="https://d3js.org/d3.v3.min.js">&lt;/script>
&lt;script src="https://mauriciopoppe.github.io/function-plot/js/function-plot.js">&lt;/script>
</pre>

JavaScript
<pre>
var parameters = {
  target: '#myFunction',
  data: [{
    fn: 'sin(x)', 
    color: 'red'
    },
    {
    fn: 'cos(x)', 
    color: 'blue'
    }         
  ],
  grid: true,
  yAxis: {domain: [-1, 1]},
  xAxis: {domain: [0, 2*Math.PI]}
};
functionPlot(parameters); // a function call
</pre>

<script src="https://d3js.org/d3.v3.min.js"></script>
<script src="https://mauriciopoppe.github.io/function-plot/js/function-plot.js"></script>
<script type="text/javascript">
var parameters = {
  target: '#myFunction',
  data: [{
    fn: 'sin(x)', 
    color: 'red'
    },
    {
    fn: 'cos(x)', 
    color: 'blue'
    }         
  ],
  grid: true,
  yAxis: {domain: [-1, 1]},
  xAxis: {domain: [0, 2*Math.PI]}
};

functionPlot(parameters);
</script>
<br>

------
#### What can be done with JavaScript
##### FIRST: interact with the HTML and CSS content of a document, respond to events
<style>
h1 {
  color:red;
  background-color:lightGreen;
  border:12px solid violet;
  padding: 5px;
  border-radius: 15px;
  text-align: center;
}

p, 
h1 {
  font-family: cursive 
}

p, 
img, 
button {
  margin-left:50px;
}
table {
  margin-top: 20px;
}
table, tr, td {
  border: 1px solid;
} 

td {
  padding:10px;
}
</style> 
<div id="interactWith">
 <h1 id="mainTitle">My home page</h1> 

<p>This is an example of interactivity between JavaScript and the HTML content of a document.</p>
<button onclick="changeTitle();">Click me to change the title of the page</button>
</div>
<script>
    function changeTitle() {
      var title = document.querySelector("#mainTitle");
      title.innerHTML += "<br>This new <u>title</u> has been changed from JavaScript!";
    }
</script>

HTML
<pre>
&lt;h1 id="mainTitle">My home page&lt;/h1> 

&lt;p>This is an example of interactivity between JavaScript and the HTML content of a document.&lt;/p>
&lt;button onclick="changeTitle();">Click me to change the title of the page&lt;/button>
</pre>
JavaScript
<pre>
function changeTitle() {
  var title = document.querySelector("#mainTitle");
  title.innerHTML += "<br>This new <u>title</u> has been changed from JavaScript!";
}
</pre>

_selector API_ : to select a particular element in the document 
{% highlight javascript linenos %}
var title = document.querySelector("#mainTitle");
{% endhighlight %}

_DOM API_ : to modify the element's content
{% highlight javascript linenos %}
title.innerHTML += "<br>This new <u>title</u> has been changed from JavaScript!";{% endhighlight %}

_event listener_ : click event to call the changeTitle() function
{% highlight html linenos %}
<button onclick="changeTitle();">Click me to change the title of the page</button>
{% endhighlight %}

---------------
<h1 id="mainTitle2">My home page</h1> 

<p>This is an example of interactivity between JavaScript and the HTML content of a document.</p>
<button onclick="changeTitleCSSStyle();">Click me to change the CSS colors of the title of the page</button>

<script>
  function changeTitleCSSStyle() {
    var title = document.querySelector("#mainTitle2");
    title.style.color = 'black';
    title.style.backgroundColor = "yellow";
    title.style.border = "5px dashed red";
  }
</script>

HTML
<pre>
&lt;h1 id="mainTitle2">My home page&lt;/h1> 

&lt;p>This is an example of interactivity between JavaScript and the HTML content of a document.&lt;/p>
&lt;button onclick="changeTitleCSSStyle();">Click me to change the CSS colors of the title of the page&lt;/button>
</pre>
JavaScript
<pre>
  function changeTitleCSSStyle() {
    var title = document.querySelector("#mainTitle2");
    title.style.color = 'black';
    title.style.backgroundColor = "yellow";
    title.style.border = "5px dashed red";
  }
</pre>
_style property_ : to change the content look and feel.
Using the style property is a way of altering the CSS property values of this HTML element.
{% highlight javascript linenos %}
  function changeTitleCSSStyle() {
    var title = document.querySelector("#mainTitle2");
    title.style.color = 'black';
    title.style.backgroundColor = "yellow";
    title.style.border = "5px dashed red";
  }
{% endhighlight %}

_CamelCase_ : the CSS name background-color becomes backgroundColor, text-size becomes textSize, border-color becomes borderColor etc.

------------
##### SECOND: use numerous APIs in addition to the DOM and selector APIs: multimedia, drawing, animating, geolocation, webcam, etc.

<p id="msg">Click the button to get your coordinates:</p>
<p id="address"></p>
 
<button onclick="getLocation()">Where am I ?</button>
<div id="map_canvas" style="width: 500px; height: 300px"></div>
<script>
  /* p elements for displaying lat / long and address */
  var displayCoords, myAddress; 
  // used with the google apis
  var geocoder;
  var map;
  var infowindow;
  var marker;
  var uluru;
//
  function initMap() {
    displayCoords=document.getElementById("msg");
    myAddress = document.getElementById("address");
    infowindow = new google.maps.InfoWindow();
    geocoder = new google.maps.Geocoder();
    uluru = {lat: -6.83, lng: 34.0144};
    map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 8,
      center: uluru
    });
    marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      displayCoords.innerHTML="Geolocation API not supported by your browser.";
    }
  }
  /* Called when a position is available */
  function showPosition(position) {
    displayCoords.innerHTML="Latitude: " + position.coords.latitude + 
    "<br />Longitude: " + position.coords.longitude;   
    // Display the map
    showOnGoogleMap(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  }
  function showOnGoogleMap(latlng) {
  /* Ask google geocoder for a surface address once we get a longitude and 
 　　a latitude. In fact the reverse geocoder sends back an array of "guesses"
 　　i.e. not only one address object, but several. Each entry in this array
 　　has several properties like street, city, etc. We use the "formatted_address"
 　　one here, but it might be interesting to get the detailed properties in other
 　　applications like a form with street, city, zip code etc. */
　　geocoder.geocode({'latLng': latlng},reverseGeocoderSuccess);
 　 function reverseGeocoderSuccess(results, status) {
    　if (status == google.maps.GeocoderStatus.OK) {
     　 // For debugging
　　　　console.dir(results);
       if (results[1]) {
          map.setZoom(11);
          marker = new google.maps.Marker({
              position: latlng,
              map: map
          });
          infowindow.setContent(results[1].formatted_address);
          infowindow.open(map, marker);
　　　　　// Display address as text in the page
　　　　　myAddress.innerHTML="Adress: " + results[0].formatted_address;
       } else {
         alert('No results found');
       }
        } else {
         alert('Geocoder failed due to: ' + status);
    }
  } // end of reverseGeocoderSuccess
}  // end of showOnGoogleMap
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQUYdaSoNGMyevLHGAf7Zqq0qe7L9zcjc&callback=initMap"
  type="text/javascript">
</script>

--------------
##### THIRD: work with remote data / speak with a remote HTTP Web server

  <p>
    Type in the name of a Rock Band (ex: "The Rolling Stones", "Metallica", "The Who", "The Beatles", "Led Zeppelin", "Van Halen", "Grateful Dead").</p>
  
  <label for="bandName">Band Name: </label>
  <input type="text" id="bandName" value="Metallica">
  <button onclick="search();">Look for members</button>
  <div id="members"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/0.10.1/fetch.js"></script>

<script>
  var membersDiv = document.querySelector("#members");
  function search() {
    var bandName = document.querySelector("#bandName").value;
    console.log(bandName);
    
    /* API for getting info about an artist/band by name */

    var url = encodeURI("https://wasabi.i3s.unice.fr/api/v1/artist/name/" + bandName);

    console.log(url);
    membersDiv.innerHTML = "";
    fetch(url)
     .then(function(response) {
      /* response is a json string,
         convert it to a pure JavaScript object */
       return response.json();
     })
     .then(function(band) {
        membersDiv.innerHTML += "<h2>Current and old members of " +band.name + "</h2>"
        displayMembers(band.members);
    })
     .catch(function(error) {
        console.log('Error during fetch: ' + error.message);
        membersDiv.innerHTML += "<h2>No Results</h2>"
    });
  }

  function displayMembers(listOfMembers) {
    /* users is a JavaScript object */
    var table = document.createElement("table");
          
    listOfMembers.forEach(function(member) {
      /* iterate on the array of members */
      var row = table.insertRow();
      var memberNameCell = row.insertCell();
      memberNameCell.innerHTML = member.name;
          
      /* Show instruments played by this member */
      var instrumentCell = row.insertCell();
      member.instruments.forEach(function(inst, index) {
        instrumentCell.innerHTML += inst;
        if(index !== member.instruments.length-1) {
          instrumentCell.innerHTML += ",";
        }
      });
      var activeYearsCell = row.insertCell();
      activeYearsCell.innerHTML += member.begin;
      if(member.end !== "") {
        activeYearsCell.innerHTML += " - " + member.end;
      } else {
        activeYearsCell.innerHTML += " - still active in band";
      }
      
    });
    membersDiv.appendChild(table);
  }
</script>