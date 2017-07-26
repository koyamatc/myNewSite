---
layout: post
title: Class Components
date: 2017-07-25 00:00:00 +900
subject: reactjs
description:
  edx's course by Microsoft.
  Introduction to ReactJS
---

-------

#### Class Components
##### Class Components

In addition to being written as a function, React Components can also be written using ES6 classes. Class Components differ from Functional Components because they allow React Components to have life cycle methods and state. Class components have two instance properties, this.state and this.props, that represent the component's state and properties respectively.

React Component written using ES6 classes:

{% highlight javascrit %}
class Welcome extends React.Component{
    render(){
        return <h1>Hello World!</h1>
    }
}
{% endhighlight %}

This is the same as the following Functional Component:

{% highlight javascript %}
function Welcome(){
    return <h1>Hello World!</h1>
}
{% endhighlight %}

Both types of React Components can be used by writing their name within an HTML tag:
{% highlight javascript %}
var element = <Welcome/>
{% endhighlight %}

##### Render()

The render() method of a class component is used to describe what kind of React Element is going to be returned from the Class Component. It the same as the return value of of a Functional Component.

For example, the following Class Component will render&lt;h1>Hello World!&lt;/h1>:

{% highlight html %}
<div id="root"></div>
{% endhighlight %}
{% highlight javascript %}
class Welcome extends React.Component{
    render(){
        return <h1>Hello World!</h1>
    }
} 

//renders <h1>Hello World!</h1>
ReactDOM.render(
    <Welcome/>,
    document.querySelector("#root")
)
{% endhighlight %}

##### Adding properties to Class Components

The properties of a Class Component can be accessed through the this.props attribute. This differs slightly from Functional Components where the properties were passed in as a variable.

{% highlight javascript %}
class Welcome extends React.Component{
    render(){
        return <h1>Message: {this.props.message}</h1>
    }
}
{% endhighlight %}

You can supply property values the same way as you supply attribute values:

{% highlight javscript %}
<Welcome message="Hello World!"/>
{% endhighlight %}

-------

#### State
##### Constructor(props)

The constructor() method is called before a React Component is mounted and is used to set up the initial state of the component. It is important to call super(props) at the beginning of the constructor() method or else the this.props attribute may not work correctly. The first argument to the constructor() method represents the properties that are passed into the component.

{% highlight javascript %}
class Counter extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div>Hello World!</div>
    }
}
{% endhighlight %}

##### Adding an initial state to Class Components

The initial state of a Class Component can be declared within the constructor() method. The state of the component must be declared as an object with attributes.

{% highlight javascript %}
class Counter extends React.Component{
    constructor(props){
        super(props)
        this.state = {foo:123,bar:456}
    }
    render(){
        return <div>foo:{this.state.foo} bar:{this.state.bar}</div>
    }
}
{% endhighlight %}

##### Updating state

The setState(updater,[callback]) method is used to update the state of the component. It takes in an updater object and updates the component state by shallowly merging the updater object's attributes with the previous component state. The method updates the state asynchronously, so a there is an option callback that will be called once the state has finished updating completely. In order to use the setState() method, it must be referenced by calling this.setState().

The setState method will trigger the updating phase of the component lifecycle to start. This will cause the component to rerender unless the shouldComponentUpdate() function returns false.

Example:
{% highlight javascript %}
this.setState({message:"new message"})
{% endhighlight %}

For example:

{% highlight javascript %}
class Counter extends React.Component{
    constructor(props){
        super(props)
        //initial state set up
        this.state = {message:"initial message"}
    }
    componentDidMount()
        //updating state
        this.setState({message:"new message"})
    }
    render(){
        return <div>Message:{this.state.message}</div>
    }
}
{% endhighlight %}

##### Updating state based on previous state

The setState() method does not immediately update the state of the component, it just puts the update in a queue to be processed later. React may batch multiple update requests together to make rendering more efficient. Due to this, special precautions must be made when you try to update the state based on the component's previous state. Due to this, precautions must be made when updating the state based on previous state values.

For example, the following code will only increment the state value attribute by 1 even though it was called 4 times:

{% highlight javascript %}
class Counter extends React.Component{
    constructor(props){
        super(props)
        //initial state set up
        this.state = {value:0}
    }
    componentDidMount(){
        //updating state
        this.setState({value:this.state.value+1})
        this.setState({value:this.state.value+1})
        this.setState({value:this.state.value+1})
        this.setState({value:this.state.value+1})
    }
    render(){
        return <div>Message:{this.state.message}</div>
    }
}
{% endhighlight %}

The setState(updater,[callback]) method can take in an updater function as its first argument to update the state based on the previous state and properties. The return value of the updater function will be shallowly merged with the previous component state. The method updates the state asynchronously, so a there is an option callback that will be called once the state has finished updating completely.

Example:

{% highlight javascript %}
this.setState((prevState, props) => { 
    return {attribute:"value"}
})
{% endhighlight %}

Here is an example of how to update the state based on previous state:

{% highlight javascript %}
class Counter extends React.Component{
    constructor(props){
        super(props)
        //initial state set up
        this.state = {message:"initial message"}
    }
    componentDidMount()
        //updating state
        this.setState((prevState, props) => {
            return {message: prevState.message + '!'}
        })
    }
    render(){
        return <div>Message:{this.state.message}</div>
    }
}
{% endhighlight %}

##### Using future state values

Since state updates asynchronously, you can not just expect the state values to update immediately after a setState() method call.

For example, the console log may not output the updated state:

{% highlight javascript %}
//this.state.count is originally 0
this.setState({count:42})
console.log(this.state.count)
//outputs 0 still
{% endhighlight %}

In order to use a state after it has been updated, do all logic in the callback argument:

{% highlight javascript %}
//this.state.count is originally 0
this.setState({count:42}, () = {
    console.log(this.state.count)
    //outputs 42
})
{% endhighlight %}

##### State is not mutable

State is read only so you should not try to manually change the values of the state attributes. If the state needs to be updated, the setState() method is the only way to change the state.

For example, don't do this:

{% highlight javascript %}
//incorrect, state should not be mutated directly
this.state.message = "new message"
{% endhighlight %}

--------

#### Life Cycle Methods
##### Life Cycle Methods

Each Class Component goes through a component life cycle with multiple phases. There are several life cycle methods that can be overridden to run code at different parts of the life cycle.

##### Mounting Phase Methods

The mounting phase begins when an instance of a component is created and rendered into the DOM. The following lifecycle methods occur in the order they are listed:

<ul class="collection">
    <li class="collection-item">
constructor(props) - called when the component is first initialized. This method is only called once.
    </li>
    <li class="collection-item">
componentWillMount() - called when a component is about to mount.
    </li>
    <li class="collection-item">
render() - called when a component is rendered.
    </li>
    <li class="collection-item">
componentDidMount() - called when a component has finished mounting. This is where network requests are usually made.
    </li>
</ul>

##### Updating Phase Methods

The updating phase begins when a component's properties or state changes. The following lifecycle methods occur in the order they are listed:

<ul class="collection">
    <li class="collection-item">
componentWillReceiveProps(nextProps) - called when a component has updated and is receiving new props.
    </li>
    <li class="collection-item">
shouldComponentUpdate(nextProps, nextState) - called after receiving props and is about to update. If this method returns false, componentWillUpdate(), render(), and componentDidUpdate() will not execute.
    </li>
    <li class="collection-item">
componentWillUpdate(nextProps, nextState) - called when a component is about to be updated.
    </li>
    <li class="collection-item">
render() - called when a component is rerendered.
    </li>
    <li class="collection-item">
componentDidUpdate(prevProps, prevState) - called when a component has finished updating.
    </li>
</ul>

##### Unmounting Phase Methods

The unmounting phase begins when a component is being removed from the DOM. The following life cycle method occurs during the unmounting phase:

<ul class="collection">
    <li class="collection-item">
componentWillUnmount() - called when a component has been unmounted. This is where any cleanups are made such as cancelling timers or network requests.
    </li>
</ul>

-------

#### Event Handlers
##### Adding Event Handlers

Handling events in React is similar to handling events in HTML. To attach an event handler to a React Element, assign the event handler method to the appropriate event attribute.

Here are the main differences:

<ul class="collection">
    <li class="collection-item">
One main difference in React is that you can use JSX brackets to specify the event handler function instead of declaring it as a string.
    </li>
    <li class="collection-item">
The next difference is that React events are named using camelCase instead of being all lowercase. For example, onclick and onkeypress in HTML become onClick and onKeyPress in React respectively.
    </li>
</ul>


Click event in React:
{% highlight html %}
<button onClick = {clickHandler} >Click Me</button>
{% endhighlight %}
Click event in HTML:
{% highlight html %}
<button onclick = "clickHandler()" >Click Me</button>
{% endhighlight %}

##### Binding Event Handlers to Class Components

Event handlers can be defined as methods within a class Component.

In this example, the clickHandler method is defined within the Class Component and is assigned to the onClick attribute of the &lt;button> element. The component renders a button that increments the number displayed inside it whenever it is clicked.

{% highlight javascript %}
class Counter extends React.Component{
    constructor(props){
        super(props)
        this.state = {count:0}
        //binding is necessary to make `this` point to the correct object
        this.clickHandler = this.clickHandler.bind(this)
    }
    clickHandler(){
      //increments the count of the state
      this.setState((prevState,props) => {
        return {count: prevState.count + 1}
      })
    }
    render(){
        //renders a button that displays the state count
        return <button onClick = {this.clickHandler}>{this.state.count}</button>
    }
}

ReactDOM.render(
  <Counter/>,
  document.querySelector("#root")
)
{% endhighlight %}


The bind() method is used to bind the clickHandler() method's this keyword to the component instance. Without binding the function, the function will have its this keyword point to an incorrect object and the setState() method will not work correctly.

Binding example:
{% highlight javascript %}
this.clickHandler = this.clickHandler.bind(this)
{% endhighlight %}

An alternative to using bind() is to attach the event handler to the React Element using an ES6 arrow function. The arrow function will automatically have its this keyword point to the enclosing scope which happens to be the component instance.

Fat arrow example:

<pre>
&lt;button onClick = &#123;{ () => this.clickHandler() }>{this.state.count}}&lt;/button>
</pre>

------

#### Lifting State Up
##### Lifting State Up

The setState() method only allows components to update their own state. However, there are times when an event occurs on a component and the event handler needs to update the state of another sibling or parent component. In this situation, we need to lift the state up to a parent component that encapuslates all of the components that need updating. The parent component will then pass down binded event handlers to the child components. When the child components call the binded event handlers, the parent component will update its state and may pass the updated state down to child components that may need it.

To demonstrate this concept we will build the following application:

[Link to Codepen Solution]('https://codepen.io/benjlin/pen/OmaLqE')

The application has four buttons and a description section below the buttons. The buttons initially all have blue text and are all inactive. The last button that is pressed is considered the active button and its text becomes red. Lastly, the description section shows the name of the active button.

We can create a Button, Details, and App Class Component to model the application:

{% highlight javascript %}
    class Details extends React.Component{
      render(){
        return <h1>{this.props.details}</h1>
      }
    }
    class Button extends React.Component{
        render(){
            return (
              <button>
                {this.props.name}
              </button>
            )
        }
    }

    class App extends React.Component{
        render(){
            return (
                <div>
                    <Button name="One"/>
                    <Button name="Two"/>
                    <Button name="Three"/>
                    <Button name="Four"/>
                    <Details/>
                </div>


            )
        }
    }
{% endhighlight %}

This application demonstrates the need for lifting the state up because when a Button component is pressed, it needs to tell its sibling Button components to become inactive and it needs to tell the Details section to change its text. Thus, all of the state should be held in the App Class Component and binded event handlers should be passed down to the child components.

Let's add some event handlers and state to the App Class Component: To accomplish this we will add a constructor() method to the App component so we can initialize its state. We will then declare an event handler named clickHandler and bind it to the App component. We will also pass down the event handlers down to the Button components. We will add an id property to each of the Button components so we can identify which Button we are pressing later on. The event handler will take in the id and name of the Button component that is clicked and will update the active Array and details section accordingly.

{% highlight javascript %}
    class App extends React.Component{
        constructor(props){
            super(props)
            this.state = {activeArray:[0,0,0,0], details:""}
            this.clickHandler = this.clickHandler.bind(this)
        }

        clickHandler(id,details){
            var arr = [0,0,0,0]
            arr[id] = 1
            this.setState({activeArray:arr,details:details})
            console.log(id,details)
        }
        render(){
            return (
                <div>
                    <Button id = {0} active = {this.state.activeArray[0]} clickHandler = {this.clickHandler} name="bob"/>
                    <Button id = {1} active = {this.state.activeArray[1]} clickHandler = {this.clickHandler} name="joe"/>
                    <Button id = {2} active = {this.state.activeArray[2]} clickHandler = {this.clickHandler} name="tree"/>
                    <Button id = {3} active = {this.state.activeArray[3]} clickHandler = {this.clickHandler} name="four"/>
                    <Details/>
                </div>


            )
        }
    }
{% endhighlight %}

Next, we will edit the Button component. We will change its text color based on whether or not the button is active and we will define its onClick attribute based on the event handler that was passed down.

<pre>
    class Button extends React.Component{
        render(){
            return (
              &lt;button style = &#123;{color: this.props.active? 'red': 'blue'}} onClick={() => {this.props.clickHandler(this.props.id,this.props.name)}}>
                {this.props.name}
              &lt;/button>
            )
        }
    }
</pre>

In the end, it should look like this:

<pre>
    class Details extends React.Component{
      render(){
        return &lt;h1>{this.props.details}&lt;/h1>
      }
    }
    class Button extends React.Component{
        render(){
            return (
              &lt;button style = &#123;{color: this.props.active? 'red': 'blue'}} onClick={() => {this.props.clickHandler(this.props.id,this.props.name)}}>
                {this.props.name}
              &lt;/button>
            )
        }
    }
    class App extends React.Component{
        constructor(props){
            super(props)
            this.state = {activeArray:[0,0,0,0], details:""}
            this.clickHandler = this.clickHandler.bind(this)
        }
        clickHandler(id,details){
            var arr = [0,0,0,0]
            arr[id] = 1
            this.setState({activeArray:arr,details:details})
            console.log(id,details)
        }
        render(){
            return (
                &lt;div>
                    &lt;Button id = {0} active = {this.state.activeArray[0]} clickHandler = {this.clickHandler} name="bob"/>
                    &lt;Button id = {1} active = {this.state.activeArray[1]} clickHandler = {this.clickHandler} name="joe"/>
                    &lt;Button id = {2} active = {this.state.activeArray[2]} clickHandler = {this.clickHandler} name="tree"/>
                    &lt;Button id = {3} active = {this.state.activeArray[3]} clickHandler = {this.clickHandler} name="four"/>
                    &lt;Details details = {this.state.details}/>
                &lt;/div>


            )
        }
    }



ReactDOM.render(
  <App/>,
  document.querySelector("#root")
)
</pre>

-------

#### Module 2 Tutorial
Module 2 Tutorial

This tutorial will teach you how to create a Connect 4 game.

[Demo of Game/Solution]('https://codepen.io/benjlin/pen/WOZwbV?editors=1011')

##### Step 1: Breaking up the application into components

<img src="https://d37djvu3ytnwxt.cloudfront.net/assets/courseware/v1/82487af4ed13153694e25f172134ada3/asset-v1:Microsoft+DEV281x+2T2017+type@asset+block/m2tutorial1divided.png" alt="Image of an HTML DOM
">

As the above image shows, we have broken up the application into several sections:

<ul class="collection">
    <li class="collection-item">
    &bull;A component that represents a circle (lime green)
    </li>
    <li class="collection-item">
    &bull;A component that represents a grid cell (dark red)
    </li>
    <li class="collection-item">
    &bull;A component that represents a row of cells (teal)
    </li>
    <li class="collection-item">
    &bull;A component that represents the game board (red)
    </li>
    <li class="collection-item">
    &bull;A section that displays the game messages (blue)
    </li>
    <li class="collection-item">
    &bull;A section with a restart button ( green)
    </li>
</ul>

##### Step 2: Creating the individual components

To start off lets create a component that represents the circle that will be put inside each grid cell. We can accomplish this by returning a <div> tag with some styling to make it into a circle.

{% highlight javascript %}
function Circle(){
    var style = {
        backgroundColor:"white",
        border: "1px solid black",
        borderRadius: "100%",
        paddingTop: "98%"
    }
    return (
       <div style = {style}></div>
    )
}
{% endhighlight %}

We can test the component by rendering it to the page, be sure to add a root div in the HTML page:

{% highlight javascript %}
ReactDOM.render(
    <Circle/>,
    document.querySelector('#root01')
)
{% endhighlight %}
<div id="root01"></div>

Next, we can create a component that represents the grid cells that make up the game board. We can add some styling to make it into a square and we can embed the Circle component inside of it.

{% highlight javascript %}
function Cell(){
    var style = {
        height:50,
        width:50,
        border:"1px solid black",
        backgroundColor:"yellow"
    }

    return (
        <div style = {style}>
            <Circle/>
        </div>
    )
}
{% endhighlight %}

We can test the component by rendering it to the page:

{% highlight javascript %}
ReactDOM.render(
    <Cell/>,
    document.querySelector('#root02')
)
{% endhighlight %}

<div id="root02"></div>

Next, we can create a component that represents a row of grid cells. We can use a for loop to push 7 cells into an array that we will insert in a &lt;div> tag. We can add some styling to make the grid cells align horizontally.

{% highlight javascript %}
function Row(){
    var style = {
          display: "flex"
    }
    var cells = []
    for(let i = 0; i < 7; i++){
        cells.push(<Cell/>)
    }
    return (
        <div style = {style}>
            {cells}
        </div>
    )
}
{% endhighlight %}

We can test the component by rendering it to the page:
{% highlight javascript %}
ReactDOM.render(
    <Row/>,
    document.querySelector('#root03')
)
{% endhighlight %}

<div id="root03"></div>

Next, we can create a component that represents the game board. We can use a for loop to push 6 rows into an array that we will insert in a &lt;div> tag.

{% highlight javascript %}
  function Board(){
    var rows = []
    for(let i = 0; i < 6; i++){
        rows.push(<Row/>)
    }
    return (
        <div>
            {rows}
        </div>
    )
  }
{% endhighlight %}

We can test the component by rendering it to the page:

{% highlight javascript %}
ReactDOM.render(
    <Board/>,
    document.querySelector('#root04')
)
{% endhighlight %}

<div id="root04"></div>

Lastly, we will create a Game component that encompasses all of the other components. In addition to the Board component, we will add a header for the game messages and a restart button to this component. The header and restart button are simple enough that we do not need to make them into their own components. The Game component will hold all of the application's state so we must make it a class component.

{% highlight javascript %}
class Game extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <h1>Blacks Turn</h1>
                <Board/>
                <button>Restart</button>
            </div>
        )
    }
}
{% endhighlight %}

We can test the component by rendering it to the page:

{% highlight javascript %}
ReactDOM.render(
    <Game/>,
    document.querySelector('#root05')
)
{% endhighlight %}

<div id="root05"></div>

##### Step 3: Adding game state

The next step is to add state to the Game component. The state should keep track of everything the game needs to know to function.

The state should keep track of the following:

<ul class="collecrion">
    <li class="collection-item">
    &bull;Which player's turn it is (true for black, false for red)
    </li>
    <li class="collection-item">
    &bull;Which grid cell's have pieces and what color those pieces should be (0 for empty, 1 for black, 2 for red)
    </li>
    <li class="collection-item">
    &bull;Which player has won ( 0 for no one, 1 for black, 2 for red)
    </li>
</ul>

The empty grid can be represented by a 2-D array. The 2-D array consists of an array that has 6 indexes that each have 7 indexes.

Set the initial state in the constructor.
{% highlight javascript %}
    this.state = {player:false,cells:cells,winner:0}
{% endhighlight %}

##### Step 4: Passing State down

The next step is to pass down the cell states all the way down to the individual grid cells. We also need to pass down a click event handler down to the grid cells. Once this is accomplished, we will implement the basic functionality to change a cell circle's color when it is clicked.

First, add a handleClick() method to the Game component:

{% highlight javascript %}
    handleClick(){
        console.log("clicked")
    }
{% endhighlight %}

Also be sure to bind handleClick to the Game component:

{% highlight javascript %}
    this.handleClick = this.handleClick.bind(this)
{% endhighlight %}

Next, pass in the handleClick method and the this.state.cells attribute into the Board component. Also, pass in the click event handler.


{% highlight javascript %}
    <Board cells = {state.cells} handleClick = {handleClick}/>
{% endhighlight %}

Next, pass in the arrays of length 7 from the this.state.cells 2-D array to the Row components. Also pass in the click event handler.
{% highlight javascript %}
    rows.push(<Row key = {i} row = {i} cells = {props.cells[i]} handleClick = {props.handleClick}/>)
{% endhighlight %}

Next, pass in the individual cell states to the Cell components. Also pass in the click event handler.

{% highlight javascript %}
    cells.push(<Cell key = {i} cell = {props.cells[i]} row = {props.row} col = {i} handleClick = {props.handleClick}/>)
{% endhighlight %}

Next, pass in the event handler to the onClick attribute of the &lt;div> tag in the Cell component. Also pass in the cell state to the Circle component.

{% highlight javascript %}
    <div style = {style} onClick = {() => props.handleClick(props.row,props.col)}>
        <Circle cell = {props.cell}/>
    </div>
{% endhighlight %}

Next, update the Circle component to change its color based on the cell state. If the cell state is 1 or 2 the circle will change to be black or red respectively.

{% highlight javascript %}
function Circle(props){
    var color = "white"
    if(props.cell == 1){
        color = "black"
    }
    else if(props.cell == 2){
        color = "red"
    }
    var style = {
        backgroundColor:color,
        border: "1px solid black",
        borderRadius: "100%",
        paddingTop: "98%"
    }
    return (
       <div style = {style}></div>
    )
}
{% endhighlight %}

If you open up the console and click a cell on the grid, you can see that "clicked" will be output to the console log.

Next, modify the handleClick method a bit to get a more detailed idea of which cell is being clicked.

{% highlight javascript %}
    handleClick(row,col){
        console.log("row: " + row + " | col: " + col)
    }
{% endhighlight %}

Now when a cell is clicked, the console log will display the row and column of the cell that is clicked.

Now lets modify the handleClick method further to update the state of the cells when they are clicked. The slice() method is used to generate a shallow copy of the inner arrays of the 2-D cells array. These shallow copies are then used to build a new 2-D array named temp. The selected row and column of the new 2-D array is modified and then the cells state is updated to equal the temp 2-D array.

{% highlight javascript %}
    handleClick(row,col){
        console.log("row: " + row + " | col: " + col)
        console.log(this.state.cells)
        var temp = [];
        for(let i = 0; i < 6; i++){
          temp.push(this.state.cells[i].slice())
        }
        console.log("broken")
        temp[row][col] = 1;
        this.setState({cells:temp})
    }
{% endhighlight %}

If you click on a grid cell now, the corresponding grid circle will now turn black. When a grid cell is clicked, it calls the handleClick() method which updates the cells state attribute. The state is then passed down until it reaches the Circle component and the circle updates its color to reflect the cell state.

##### Step 5: Adding functionality to alternate player

The next step is to switch the player everytime a new piece is dropped. The pieces should also alternate colors based on the player that dropped them.

First, edit the handleClick method to alternate the player state everytime a piece is dropped.
{% highlight javascript %}
    this.setState({cells:temp, player: !this.state.player})
{% endhighlight %}

Also, set the value of the temp state cell to equal 1 if this.player.state is true and 2 if it is false.

{% highlight javascript %}
    temp[row][col] = this.state.player? 1 : 2
{% endhighlight %}

Next, edit the &lt;h1> tag in the Game component to output whose turn it is based on the player state attribute.

{% highlight javascript %}
    <h1>{this.state.player? "Blacks Turn" : "Red Turn"}</h1>
{% endhighlight %}

Now if you click on a grid cell, the player state will alternate.

The message at the top will display which player's turn it is and the pieces dropped will have their color set based on the player that dropped them.

##### Step 6: Adding functionality to force pieces to drop all the way down

The next step is to force pieces to drop all the way down until they are on top of another piece or on the bottom row.

To help us accomplish this, we will create a function called findAvailable(col) that will let us know which row a piece should be placed in when it is dropped in a specific column.

The findAvailableRow(col) method loops through the cells state attribute and checks all of the cells in a specified column. It starts at the bottom of the column and checks each grid cell to see if a piece has been placed there. If a grid cell is empty, the method will return the row of that cell. Otherwise, it will return -1.

{% highlight javascript %}
  findAvailableRow(col){
    for(var i = 0; i < 6; i++){
      if(this.state.cells[i][col] == 0){
        return i;
      } 
    }
    return -1;
  }
{% endhighlight %}

Next, we will modify the handleClick method to update the temp state cell 2-D array based on the row returned by findAvailableRow.

{% highlight javascript %}
    var newRow = this.findAvailableRow(col)
    temp[newRow][col] = this.state.player? 1 : 2
{% endhighlight %}

Now if you test the application, the pieces should drop all the way down.

##### Step 7: Adding victory detection

The next step is to add a way to detect if a player has won.

Add in these methods that help determine whether there are 4 pieces in a row:

{% highlight javascript %}
    checkDiagonal(row,col){
        //find right and left tops
        var c = this.state.cells;
        var val = this.state.player? 2:1;
        var rR = row;
        var cR = col;
        while(rR < 5 && cR < 6){
            rR++; 
            cR++;
        }

        while( rR >= 3 && cR >= 3){
            if(c[rR][cR] == val && c[rR-1][cR-1] == val && c[rR-2][cR-2] == val && c[rR-3][cR-3] == val){
                return 1
            }
            rR--
            cR--
        }   

        var rL = row;
        var cL = col;

        while(rL < 5 && cL > 0){
            rL++
            cL--
        }

        while(rL >= 3 && cL <= 3){
            if(c[rL][cL] == val && c[rL-1][cL+1] == val && c[rL-2][cL+2] == val && c[rL-3][cL+3] == val){
                return 1
            }
            rL--
            cL++
        }
        return 0
    }
    checkHorizontal(row,col){
        var c = this.state.cells;
        var i = 6;
        var val = this.state.player? 2:1;

        while( i >= 3){
            if(c[row][i] == val && c[row][i-1] == val && c[row][i-2] == val && c[row][i-3] == val){
                return 1
            }
            i--
        }
        return 0
    }
    checkVertical(row,col){
        var c = this.state.cells;
        var i = row;
        var val = this.state.player? 2: 1;

        if(i >= 3){
            if(c[i][col] == val && c[i - 1][col] == val && c[i - 2][col] == val && c[i - 3][col] == val){
                return 1
        }
        }
        return 0

    }
    checkVictory(row,col){
        return this.checkVertical(row,col)   || this.checkHorizontal(row,col) ||   this.checkDiagonal(row,col)


    }
{% endhighlight %}
    
Next, add in a callback to the setState method call.

{% highlight javascript %}
        this.setState({cells:temp, player: !this.state.player}, () => {
            if(this.checkVictory(newRow,col) > 0){
                console.log("win")
                this.setState({winner:this.state.player?2:1})
            }


        })
{% endhighlight %}

Also, add this to the top of the handleClick method to stop the game once someone has won.

{% highlight javascript %}
        if(this.state.winner)
            return
{% endhighlight %}

Lastly, edit the&lt;h1> tag to display the winner if the game has ended.


{% highlight javascript %}
    <h1>{this.state.winner > 0 ?  this.state.winner == 1? "Black Wins":"Red Wins": this.state.player? "Blacks Turn" : "Reds Turn"} </h1>
{% endhighlight %}

The game should now display the winner of the game and stop the game if someone wins.

##### Step 8: Adding reset functionality

The last step is to make the Restart button restart the game.

First, create a method called restart() within the Game component. This method will reset the cells, winner and player state attributes.

{% highlight javascript %}
    restart(){
        var cells = [];
        for(let i = 0; i < 6; i++ ){
          cells.push(new Array(7).fill(0));
        }
        this.setState({ player : false, cells : cells, winner:0})
    }
{% endhighlight %}

Next, edit the button element's onClick attribute to call the restart() method.

{% highlight javascript %}
    <button onClick = { () => this.restart()}>Restart</button>
{% endhighlight %}

Pressing the restart button should now restart the game.

<div id="root"></div>

<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.24.0/babel.js"></script>

<script type="text/babel">
class Game extends React.Component{
  
    constructor(props){ 
        super(props)
      
        var cells = [];
        for(let i = 0; i < 6; i++ ){
          cells.push(new Array(7).fill(0));
        }
      
        this.state = {player:false,cells:cells,winner:0}
        this.handleClick = this.handleClick.bind(this)
    }
    checkDiagonal(row,col){
    /*find right and left tops*/
    var c = this.state.cells;
    var val = this.state.player? 2:1;
    var rR = row;
    var cR = col;
    while(rR < 5 && cR < 6){
      rR++; 
      cR++;
    }
    
    while( rR >= 3 && cR >= 3){
      if(c[rR][cR] == val && c[rR-1][cR-1] == val && c[rR-2][cR-2] == val && c[rR-3][cR-3] == val){
          return 1
      }
      rR--
      cR--
    }   

    var rL = row;
    var cL = col;

    while(rL < 5 && cL > 0){
      rL++
      cL--
    }

    while(rL >= 3 && cL <= 3){
      if(c[rL][cL] == val && c[rL-1][cL+1] == val && c[rL-2][cL+2] == val && c[rL-3][cL+3] == val){
          return 1
      }
      rL--
      cL++
    }
    return 0
  }
  checkHorizontal(row,col){
    var c = this.state.cells;
    var i = 6;
    var val = this.state.player? 2:1;

    while( i >= 3){
      if(c[row][i] == val && c[row][i-1] == val && c[row][i-2] == val && c[row][i-3] == val){
          return 1
      }
      i--
    }
    return 0
  }
  checkVertical(row,col){
    var c = this.state.cells;
    var i = row;
    var val = this.state.player? 2: 1;

    if(i >= 3){
      if(c[i][col] == val && c[i - 1][col] == val && c[i - 2][col] == val && c[i - 3][col] == val){
          return 1
      }
    }
    return 0

  }
    checkVictory(row,col){
        return this.checkVertical(row,col)   || this.checkHorizontal(row,col) ||   this.checkDiagonal(row,col)
        
      
    }
  
    findAvailableRow(col){
 
      
        for(var i = 0; i < 6; i++){
          console.log(i,col)
          if(this.state.cells[i][col] == 0){
            return i;
          } 
        }
        return -1;
    }
    handleClick(row,col){
        if(this.state.winner)
            return
        console.log("row: " + row + " | col: " + col)
        /*console.log(this.state.cells)*/
        var temp = [];
        for(let i = 0; i < 6; i++){
          temp.push(this.state.cells[i].slice())
        }
        var newRow = this.findAvailableRow(col)
        temp[newRow][col] = this.state.player? 1 : 2
        this.setState({cells:temp, player: !this.state.player}, () => {
            
      
            if(this.checkVictory(newRow,col) > 0){
                console.log("win")
                this.setState({winner:this.state.player?2:1})
            }

          
        })
    }
    restart(){
        var cells = [];
        for(let i = 0; i < 6; i++ ){
          cells.push(new Array(7).fill(0));
        }
        this.setState({ player : false, cells : cells, winner:0})
    }
    render(){
        return (
            <div>
                <h1>{this.state.winner > 0 ?  this.state.winner == 1? "Black Wins":"Red Wins": this.state.player? "Blacks Turn" : "Reds Turn"} </h1>
                <Board cells = {this.state.cells} handleClick = {this.handleClick}/>
                <button onClick = { () => this.restart()}>Restart</button>
            </div>
        )
    }
}

function Board(props){
    var rows = []
    for(let i = 5; i >= 0; i--){
        
        rows.push(<Row key = {i} row = {i} cells = {props.cells[i]} handleClick = {props.handleClick}/>)
    }
    return (
        <div>
            {rows}
        </div>
    )
}

function Row(props){
    var style = {
          display: "flex"
    }
    var cells = []
    for(let i = 0; i < 7; i++){
        cells.push(<Cell key = {i} cell = {props.cells[i]} row = {props.row} col = {i} handleClick = {props.handleClick}/>)
    }
    return (
        <div style = {style}>
            {cells}
        </div>
    )
}

function Cell(props){
  
    var style = {
        height:50,
        width:50,
        border:"1px solid black",
        backgroundColor:"yellow"
    }
    
    return (
        <div style = {style} onClick = {() => props.handleClick(props.row,props.col)}>
            <Circle cell = {props.cell}/>
        </div>
    )
}

function Circle(props){
    var color = "white"
    if(props.cell == 1){
        color = "black"
    }
    else if(props.cell == 2){
        color = "red"
    }

    var style = {
        backgroundColor:color,
        border: "1px solid black",
        borderRadius: "100%",
        paddingTop: "98%"
    }
    return (
       <div style = {style}></div>
    )
}

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);

ReactDOM.render(
    <Circle/>,
    document.querySelector('#root01')
)
ReactDOM.render(
    <Cell/>,
    document.querySelector('#root02')
)
function Row1(){
    var style = {
          display: "flex"
    }
    var cells = []
    for(let i = 0; i < 7; i++){
        cells.push(<Cell/>)
    }
    return (
        <div style = {style}>
            {cells}
        </div>
    )
}
ReactDOM.render(
    <Row1/>,
    document.querySelector('#root03')
)
function Board1(){
    var rows = []
    for(let i = 0; i < 6; i++){
        rows.push(<Row1/>)
    }
    return (
        <div>
            {rows}
        </div>
    )
  }
ReactDOM.render(
    <Board1/>,
    document.querySelector('#root04')
)
ReactDOM.render(
    <Game/>,
    document.querySelector('#root05')
)

</script>