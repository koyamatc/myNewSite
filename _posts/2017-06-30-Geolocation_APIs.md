---
layout: post
title: Geolocation APIs
date: 2017-06-28 06:00:00 +900
categories: post edx javascript
description:
  edx's course by W3C.
  Introductory course designed to understand 
  the basic concepts of JavaScript.  
---

-------

### Introduction to the geolocation API
#### The Geolocation API
<p id="msg">Click the button to get your coordinates:</p>
<button id="whereAmI" class="btn" onclick="getLocation()">Where am I ?</button>
{% highlight javascript linenos %}
var displayCoords = document.querySelector("#msg");
function getLocation() {
  if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
  } else {
          displayCoords.innerHTML="Geolocation API not supported by your browser.";
  }
};
function showPosition(position) {
   displayCoords.innerHTML="Latitude: " + position.coords.latitude +
        "<br />Longitude: " + position.coords.longitude;
}
{% endhighlight %}

-----------

#### Practical examples using the Google Map API
This section presents some examples of how to get a static map (a picture), using the Google Static Map API, how to display an interactive map using the Google Map JavaScript API and even how to get an estimation of a physical address from the longitude and latitude, using the Google Reverse Geocoding JavaScript API.

The following three examples increase in complexity, but most of the code is reused and adapted without even reading the Google documentation about the different APIs.

Example 1 (easy):  how to get a static image map centered on your longitude and latitude
<p id="msg">Click the button to get your coordinates:</p>
<button class="btn" onclick="getLocation1()">Try it!</button>

<!-- for position display -->
<div id="myposition"></div>
<!-- for gmap display -->
<div id="map" style="width:640px;height:480px"></div>
<!-- get gmap API -->
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQUYdaSoNGMyevLHGAf7Zqq0qe7L9zcjc&callback=initMap"
  type="text/javascript">
</script>
{% highlight javascript linenos %}
function getLocation1(){
    /* Default position*/
    var centerpos = new google.maps.LatLng(48.579400,7.7519);
    /* default options for the google map*/
    var optionsGmaps = {
        center:centerpos,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 15
    };
    /* Init map object*/
    var map = new google.maps.Map(document.querySelector("&lt;div id="">&lt;/div>map"), optionsGmaps);
    if(navigator.geolocation) {
        /* callback function, called by getCurrentPosition() in case of success*/
        function drawPosition(position) {
            var infopos = "Got position : &lt;br>";
            infopos += "Latitude : "+position.coords.latitude +"&lt;br>";
            infopos += "Longitude: "+position.coords.longitude+"&lt;br>";
            infopos += "Altitude : "+position.coords.altitude +"&lt;br>";
            document.querySelector("#myposition").innerHTML = infopos;
            /* Make new object LatLng for Google Maps*/
            var latlng = new google.maps.LatLng(position.coords.latitude,
                                            position.coords.longitude);
            /* Add a marker at position*/
            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title:"You are here"
            });
            /* center map on longitude and latitude*/
            map.panTo(latlng);
        }
        /* callback function, called by getCurrentPosition() in case of error*/
        function errorPosition(error) {
              continue;
        }
        navigator.geolocation.getCurrentPosition(drawPosition,errorPosition);
    } else {
        alert("Geolocation API not supported by your browser");
    }   
}
{% endhighlight %}

<script>
var displayCoords = document.querySelector("#msg");
function getLocation() {
  if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
  } else {
          displayCoords.innerHTML="Geolocation API not supported by your browser.";
  }
};
function showPosition(position) {
   displayCoords.innerHTML="Latitude: " + position.coords.latitude +
        "<br />Longitude: " + position.coords.longitude;
}

function getLocation1(){
    /* Default position*/
    var centerpos = new google.maps.LatLng(48.579400,7.7519);
    /* default options for the google map*/
    var optionsGmaps = {
        center:centerpos,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 15
    };
    /* Init map object*/
    var map = new google.maps.Map(document.querySelector("#map"), optionsGmaps);
    if(navigator.geolocation) {
        /* callback function, called by getCurrentPosition() in case of success*/
        function drawPosition(position) {
            var infopos = "Got position : <br>";
            infopos += "Latitude : "+position.coords.latitude +"<br>";
            infopos += "Longitude: "+position.coords.longitude+"<br>";
            infopos += "Altitude : "+position.coords.altitude +"<br>";
            document.querySelector("#myposition").innerHTML = infopos;
            /* Make new object LatLng for Google Maps*/
            var latlng = new google.maps.LatLng(position.coords.latitude,
                                            position.coords.longitude);
            /* Add a marker at position*/
            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title:"You are here"
            });
            /* center map on longitude and latitude*/
            map.panTo(latlng);
        }
        /* callback function, called by getCurrentPosition() in case of error*/
        function errorPosition(error) {
              continue;
        }
        navigator.geolocation.getCurrentPosition(drawPosition,errorPosition);
    } else {
        alert("Geolocation API not supported by your browser");
    }   
}
</script>