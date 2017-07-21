---
layout: post
title: Functional Components
date: 2017-07-20 00:00:00 +900
subject: reactjs
description:
  edx's course by Microsoft.
  Introduction to ReactJS
---

-------

#### React Components

A React Component is an independent reusable component that outputs a React Element based on its properties and state.

There are two types of React Components:

<ul class="collection">
    <li class="collection-item">
    Functional Components
    </li>
    <li class="collection-item">
    Class Components
    </li>
</ul>

Class Components have state, lifecycle methods, and properties while Functional Components only have properties. 

#### Functional Components

Functional Components are just functions that output React Elements. By convention, the first letter of the function name should be capitalized.

Here is an example:
{% highlight javascript %}
    function HelloWorld(){
        return <h1>Hello World!</h1>
    }
{% endhighlight %}

You can use the React Component in JSX by creating an HTML tag with the same name as the React Component:

{% highlight javascript %}
    var element = <HelloWorld/>
{% endhighlight %}

Another Example:

{% highlight javascript %}    
   ReactDOM.render(
        <HelloWorld/>,
        document.querySelector("#root")
    )
{% endhighlight %}

These examples will all evaluate to the React Element that is returned by the HelloWorld Component.

#### Adding Properties to Functional Components

The first argument to a Functional Component is an object that contains the component's properties.

{% highlight javscript %}
    function HelloWorld(props){
        return <h1>Message: {props.message}</h1>
    }
{% endhighlight %}

You can supply property values the same way as you supply attribute values:

{% highlight javascript %}
   ReactDOM.render(
        <HelloWorld message="Hello World!"/>,
        document.getElementById("root")
    )
{% endhighlight %}

Properties can be string literals, arrays or any other type of JavaScript object including other React Elements:

{% highlight javascript %}
    function HelloWorld(props){
        return <h1>Value: {props.numberArray[props.index]} </h1>
    }

    ReactDOM.render(
        <HelloWorld index = "3" numberArray={[1,2,3,4,5]}/>,
        document.q("root")
    )
{% endhighlight %}

You can supply as many property values as you want and they will all be accessible through the props argument.



<div id="root"></div>

<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.24.0/babel.js"></script>

<script type="text/babel">
          ReactDOM.render(
              <div>Hello World</div>,
              document.querySelector("#root")
          )
</script>
  

