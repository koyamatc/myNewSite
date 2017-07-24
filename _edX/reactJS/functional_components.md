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

#### Composition
##### Composing Components

Functional Components can include other Functional Components in their output. This lets us keep our components organized and readible.

For example, look at this Shopping Application that makes use of Composition:

{% highlight javascript %}
    function ShoppingTitle(props){
        return (
            <div>
                <h1>{props.title}</h1>
                <h2>Total Number of Items: {props.numItems}</h2>
            </div>

        ) 
    }
    function ListItem(props){
        return <li>{props.item}</li>
    }

    function ShoppingList(props){
        return (
            <div>
                <h3>{props.header}</h3>
                <ol>
                    <ListItem item = {props.items[0]}/>
                    <ListItem item = {props.items[1]}/>
                    <ListItem item = {props.items[2]}/>
                </ol>
            </div>
        )
    }


    function ShoppingApp(props){

        return (
            <div>
                <ShoppingTitle title = "My Shopping List" numItems = "9"/>
                <ShoppingList header = "Food" items = {[ "Apple","Bread","Cheese"]}/>
                <ShoppingList header = "Clothes" items = {[ "Shirt","Pants","Hat"]}/>
                <ShoppingList header = "Supplies" items = {[ "Pen","Paper","Glue"]}/>
            </div>
        )
    }

    ReactDOM.render(
        <ShoppingApp/>,
        document.getElementById("root")
    )
{% endhighlight %}

Compare that to just defining all the UI in one Functional Component.

{% highlight javascript %}
    function ShoppingApp(props){
        return (
            <div>
                <div>
                    <h1>My Shopping List</h1>
                    <h2>Total Number of Items: 9</h2>
                </div>
                <div>
                    <h3>Food</h3>
                    <ol>
                        <li>Apple</li>
                        <li>Bread</li>
                        <li>Cheese</li>
                    </ol>
                </div>
                <div>
                    <h3>Clothes</h3>
                    <ol>
                        <li>Shirt</li>
                        <li>Pants</li>
                        <li>Hat</li>
                    </ol>
                </div>
                <div>
                    <h3>Supplies</h3>
                    <ol>
                        <li>Pen</li>
                        <li>Paper</li>
                        <li>Glue</li>
                    </ol>
                </div>
            </div>
        )
    }

    ReactDOM.render(
        <ShoppingApp/>,
        document.getElementById("root")
    )
{% endhighlight %}

#### Conditional Rendering
##### Conditional Rendering

The output of a Functional Component can be determined based on its properties.

For example:

{% highlight javascript %}
    function Feature(props){
        if (props.active == true){
            return <h1>This feature is active</h1>
        }
        else{
            return <h1>This feature is not active</h1>
        }

    }
{% endhighlight %}

This can also be accomplished using an inline conditional operator:

{% highlight javascript %}
    function Feature(props){
        return <h1>This feature is {props.active? "active" : "not active"}</h1>
    }
{% endhighlight %}

##### Preventing Rendering

The output of a Functional Component can be prevented from rendering.

For example:

{% highlight javascript %}
    function Feature(props){
        if(props.active!){
            return null
        }
        else{
            return <h1>{props.message}</h1>
        }
    }
{% endhighlight %}

You can also conditionally prevent a feature from rendering using the && operator:

{% highlight ajvascript %}
    function Feature(props){
        return (
            props.active && <h1>{props.message}</h1>
        )
    }
{% endhighlight %}

With the && operator, true and expression will always evaluate to expression. On the other hand, false and expression will always evaluate to false which won't render.

#### Module 1 Tutorial

This tutorial is attended to teach you how to model an HTML DOM using React Components.

##### Step 1: Break up the UI into components

The first step is to identify parts of the UI that can be broken into their own components.

<img src="https://d37djvu3ytnwxt.cloudfront.net/assets/courseware/v1/cc6b28fdc52e17428d37a4ff048b79ec/asset-v1:Microsoft+DEV281x+2T2017+type@asset+block/m1tutorial2divided.png
" alt="">

As the above image shows, we have broken up the application into several sections:

<ul class="collection">
    <li class="collection-item">
    A component that contains a title and description of the shopping application (blue)
    </li>
    <li class="collection-item">
    A component that contains a header a list of three items (red)
    </li>
    <li class="collection-item">
    A component that represents a list items (dark red)
    </li>
</ul>

##### Step 2: Creating the individual React Components

To start off, we will create a React Component that represents an individual list item. For now, we will return a &lt;li&gt; tag with a test string, but later on we will replace it with an attribute passed from the component's properties.
{% highlight javascript %}
    function ListItem(props){
        return <li>Test String</li>
    }
{% endhighlight %}

We can test the component by rendering it to the page, be sure to add a root div in the HTML page:

{% highlight jaavscript %}   
    ReactDOM.render(
        <ListItem/>,
        document.querySelector("#root01")
    )
{% endhighlight %}

<div id="root01"> </div>

Next will create a React Component that contains the application's title and description. For now, we will return <h1> and <h2> tags that contain test strings, but later on we will replace them with attributes passed from the component's properties. We must wrap the headers with <div> tag to ensure that there is one element that encompasses all of the returned React Elements. In addition, we must surround the returned value with parenthesis since the return value spans several lines.

{% highlight javascript %}
    function ShoppingTitle(props){
        return (
            <div>
                <h1>Test Title</h1>
                <h2>Test Description</h2>
            </div>

        ) 
    }
{% endhighlight %}

We can test the component by rendering it to the page:

{% highlight javascript %}
    ReactDOM.render(
        <ShoppingTitle/>,
        document.querySelector("#root02")
    )
{% endhighlight %}

<div id="root02"></div>

Lastly, we will create the component that contains a header and three ListItem components. For now, we will return a &lt;h3> tag with a test string, but later on we will replace it with an attribute passed from the component's properties. We must wrap the headers with &lt;div> tag to ensure that there is one element that encompasses all of the returned React Elements. In addition, we must surround the returned value with parenthesis since the return value spans several lines.

{% highlight javascript %}
    function ShoppingList(props){
        return (
            <div>
                <h3>Test Header</h3>
                <ol>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                </ol>
            </div>
        )
    }
{% endhighlight %}

We can test the component by rendering it to the page:

{% highlight javascript %}
    ReactDOM.render(
        <ShoppingList/>,
        document.querySelector("#root03")
    )
{% endhighlight %}

<div id="root03"></div>

##### Step 3: Putting the components together

Now that we have created and tested the individual React Components, we will now encompass them under one React Component. The ShoppingApp component will contain the ShoppingTitle component and three ShoppingList components.

{% highlight javascript %}
    function ShoppingApp(props){

        return (
            <div>
                <ShoppingTitle/>
                <ShoppingList/>
                <ShoppingList/>
                <ShoppingList/>
            </div>
        )
    }
{% endhighlight %}

We can test the application by rendering it to the page:

{% highlight javascript %}
    ReactDOM.render(
        <ShoppingApp/>,
        document.getElementById("root04")
    )
{% endhighlight %}

<div id="root04"></div>

##### Step 4: Adding in the application data

Now that we have our entire application modeled using React Components, we can now replace our test strings with the actual application data.

{% highlight javascript %}
    function ShoppingApp(props){

        return (
            <div>
                <ShoppingTitle title = "My Shopping List" numItems = "9"/>
                <ShoppingList header = "Food" items = {[ "Apple","Bread","Cheese"]}/>
                <ShoppingList header = "Clothes" items = {[ "Shirt","Pants","Hat"]}/>
                <ShoppingList header = "Supplies" items = {[ "Pen","Paper","Glue"]}/>
            </div>
        )
    }
{% endhighlight %}

In the ShoppingApp component, I have added several attributes that contain the application data. I have supplied an array of strings to the items attribute of the ShoppingList component. The items in the array will be passed down to the individual ListItem components within the ShoppingList component. The numItems attribute on the ShoppingTitle component represents the number of total items in all of the shopping lists. This value will be included in the second header of the ShoppingApp component.

Now we must edit the ShoppingList component to make use of the supplied data. The shopping list headers can be accessed through props.header and the shopping items can be accessed from their indices from the props.items array.

{% highlight javascript %}
    function ShoppingList(props){
        return (
            <div>
                <h3>{props.header}</h3>
                <ol>
                    <ListItem item = {props.items[0]}/>
                    <ListItem item = {props.items[1]}/>
                    <ListItem item = {props.items[2]}/>
                </ol>
            </div>
        )
    }
{% endhighlight %}

Next, we must edit the ShoppingTitle component to make use of the supplied data. The title and number of items can be accessed through props.title and props.numItems respectively.

{% highlight javascript %}
    function ShoppingTitle(props){
        return (
            <div>
                <h1>{props.title}</h1>
                <h2>Total Number of Items: {props.numItems}</h2>
            </div>

        ) 
    }
{% endhighlight %}

Lastly, we must edit the ListItem component to make use of the supplied data. The item name can be accessed through the props.item.

{% highlight javascript %}
    function ListItem(props){
        return <li>{props.item}</li>
    }
{% endhighlight %}

Now that we have completed all of the steps, we can test our entire application by rendering it to the page:

{% highlight javascript %}
    ReactDOM.render(
        <ShoppingApp/>,
        document.querySelector("root05")
    )
{% endhighlight %}

<div id="root05"></div>

#### Module1 Lab

<div id="root06"></div>

<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.24.0/babel.js"></script>

<script type="text/babel">
    function ListItemTest(props){
        return <li>Test String</li>
    }

    ReactDOM.render(
        <ListItemTest/>,
        document.querySelector("#root01")
    )
    function ShoppingTitleTest(props){
        return (
            <div>
                <h1>Test Title</h1>
                <h2>Test Description</h2>
            </div>

        ) 
    }

    ReactDOM.render(
        <ShoppingTitleTest/>,
        document.querySelector("#root02")
    )

    function ShoppingListTest(props){
        return (
            <div>
                <h3>Test Header</h3>
                <ol>
                    <ListItemTest/>
                    <ListItemTest/>
                    <ListItemTest/>
                </ol>
            </div>
        )
    }

    ReactDOM.render(
        <ShoppingListTest/>,
        document.querySelector("#root03")
    )

    function ShoppingAppTest(props){

        return (
            <div>
                <ShoppingTitleTest/>
                <ShoppingListTest/>
                <ShoppingListTest/>
                <ShoppingListTest/>
            </div>
        )
    }    

    ReactDOM.render(
        <ShoppingAppTest/>,
        document.querySelector("#root04")
    )

    function ShoppingApp(props){

        return (
            <div>
                <ShoppingTitle title = "My Shopping List" numItems = "9"/>
                <ShoppingList header = "Food" items = {[ "Apple","Bread","Cheese"]}/>
                <ShoppingList header = "Clothes" items = {[ "Shirt","Pants","Hat"]}/>
                <ShoppingList header = "Supplies" items = {[ "Pen","Paper","Glue"]}/>
            </div>
        )
    }

    function ShoppingList(props){
        return (
            <div>
                <h3>{props.header}</h3>
                <ol>
                    <ListItem item = {props.items[0]}/>
                    <ListItem item = {props.items[1]}/>
                    <ListItem item = {props.items[2]}/>
                </ol>
            </div>
        )
    }

    function ShoppingTitle(props){
        return (
            <div>
                <h1>{props.title}</h1>
                <h2>Total Number of Items: {props.numItems}</h2>
            </div>

        ) 
    }

    function ListItem(props){
        return <li>{props.item}</li>
    }

    ReactDOM.render(
        <ShoppingApp/>,
        document.querySelector("#root05")
    )

/******************************************/
    var data = [
        {"Type":"Cars","Year":2013,"Model":"A","Price":32000},
        {"Type":"Cars","Year":2011,"Model":"B","Price":4400},
        {"Type":"Cars","Year":2016,"Model":"B","Price":15500},
        {"Type":"Trucks","Year":2014,"Model":"D","Price":18000},
        {"Type":"Trucks","Year":2013,"Model":"E","Price":5200},
        {"Type":"Convertibles","Year":2009,"Model":"F","Price":2000},
        {"Type":"Convertibles","Year":2010,"Model":"G","Price":6000},
        {"Type":"Convertibles","Year":2012,"Model":"H","Price":12500},
        {"Type":"Convertibles","Year":2017,"Model":"M","Price":50000}
    ]

    function App(props){

        var cars = props.data.filter(function(el, index, array){
            return (el.Type == "Cars");
        })
        var trucks = props.data.filter(function(el, index, array){
            return (el.Type == "Trucks");
        })
        var convertibles = props.data.filter(function(el, index, array){
            return (el.Type == "Convertibles");
        })

        return (
            <div>
                <Title title = "Welcome to React Transportation"/>
                <Options header = "Choose Options"/>
                <List header = "Cars" items = {cars}/>
                <List header = "Trucks" items = {trucks}/>
                <List header = "Convertibles" items = {convertibles}/>
            </div>
        )
    }

    function Title(props){
        return (
            <div>
                <h3>{props.title}</h3>
                <h4>The best place to vehicles online</h4>
            </div>

        ) 
    }

    function Options(props){
        return (
            <div>
                <h5>{props.header}</h5>
                <h5>New Only </h5>
                <h5>Select Type</h5>
                <div className="input-field col s4">
                <select name="type" id="selectedType">
                <option value="0">All</option>
                <option value="1">Cars</option>
                <option value="2">Trucks</option>
                <option value="3">Convertibles</option>
                </select>
                </div>
            </div>

        ) 
    }

    function List(props){
        return (
            <div>
                <h3>{props.header}</h3>
                <ListTables items = {props}/>
            </div>
        )
    }

    function ListTables(props){
        var items = Array.from(props.items.items);
            items.map(function(item){
                return (
                    <div>
                                      <table>
                <tr>
                    <th>Year</th>
                    <th>Type</th>
                    <th>Model</th>
                    <th>Price</th>
                    <th>Buy</th>
                </tr>
               </table>
                    </div>
                )
            })
    }
    function ItemTable(props){
        return (
               <table>
                <tr>
                    <th>Year</th>
                    <th>Type</th>
                    <th>Model</th>
                    <th>Price</th>
                    <th>Buy</th>
                </tr>
               </table>
        )
    }


    ReactDOM.render(
        <App data={data}/>,
        document.querySelector("#root06")
    )

</script>
  

