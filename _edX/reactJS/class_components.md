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
    document.getElementById("root")
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

{% highlight html %}
<button onClick = {{ () => this.clickHandler()}}>{this.state.count}</button>
{% endhighlight %}

<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.24.0/babel.js"></script>

<script type="text/babel">
</script>