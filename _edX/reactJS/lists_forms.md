---
layout: post
title: Lists and Forms
date: 2017-07-28 00:00:00 +900
subject: reactjs
description:
  edx's course by Microsoft.
  Introduction to ReactJS
---

-------

#### Lists
##### Rendering arrays of React Elements

JSX will render an array of React Elements as long as there is at least one element enclosing all of the array elements. The array elements will be inserted into the enclosing element:

For example, it is possible to render multiple components at the same time using a for loop with JSX:

{% highlight javascript %}
var elements = [] 
var array = [1,2,3,4,5]

for(let i = 0; i < array.length; i++){
   elements.push(<li>{array[i]}<li/>)
}


ReactDOM.render(
  <ol>{elements}</ol>,
  document.querySelector('#root')
)
{% endhighlight %}

<div id="root01"></div>

##### Using Map() to render arrays of React Elements

The map() method is often used to create an array of React Elements. The map() method is called on an array and returns a new array with a provided function applied to each element in the original array.

Example of using the map() method to return an array of React Elements:

{% highlight javascript %}
var array =[
  {product:"Apple", price:3},
  {product:"Banana", price:1},
  {product:"Carrot", price:2},
  {product:"Donuts", price:5},
  {product:"Eggplant", price:4}
]

var elements = array.map( (item) => {
  return <li>Product: {item.product} | Price: ${item.price}  </li>>
})

ReactDOM.render(
  <ol>{elements}</ol>,
  document.querySelector('#root')
)
{% endhighlight %}
<div id="root02"></div>

The map() method can also be directly used inside a JSX expression:

{% highlight javascript %}
ReactDOM.render(
  <ol>{
      array.map( (item) => 
          <li>Product: {item.product} | Price: ${item.price} </li>
      )}
  </ol>,
  document.querySelector('root')
)
{% endhighlight %}

##### Adding Keys to List Items

React uses Keys to help render list items quickly. Keys should be a string that uniquely identifies a list item from the other items on the list, such as an ID attribute.

Exmaple of using an ID as a key value:

{% highlight javascript %}
var array =[
  {id: 100, product:"Apple", price:3},
  {id: 101, product:"Banana", price:1},
  {id: 102, product:"Carrot", price:2},
  {id: 103, product:"Donuts", price:5},
  {id: 104, product:"Eggplant", price:4}
]

var elements = array.map( (item) => {
  return <li key={item.id}>Product: {item.product} | Price: ${item.price}  </li>
})

ReactDOM.render(
  <ol>{elements}</ol>,
  document.querySelector('#root')
)
{% endhighlight %}

If your array items do not have anything that can uniquely identify them, you can use the item index as a last resort for the key value. The drawback to using indexes as keys is that list item reordering is slow to rerender.

Example of using the item index as a key value:

{% highlight javascript %}
var array =[
  {product:"Apple", price:3},
  {product:"Banana", price:1},
  {product:"Carrot", price:2},
  {product:"Donuts", price:5},
  {product:"Eggplant", price:4}
]

//the item index is the second argument to the map() method
var elements = array.map( (item,index) => {
  return <li key={index}>Product: {item.product} | Price: ${item.price}  </li>>
})

ReactDOM.render(
  <ol>{elements}</ol>,
  document.querySelector('#root')
)
{% endhighlight %}

##### Building a List Component

It is useful to be able to build a React Component that can dynamically generate a list from an array property that is passed into it.

{% highlight javascript %}
class ProductList extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    var elements = this.props.productArray.map( (item,index) => {
      return <li key={item.id}>Product: {item.product} | Price: ${item.price}  </li>
    })
    return <ol>{elements}</ol>
  }
}

var array =[
  {id: 100, product:"Apple", price:3},
  {id: 101, product:"Banana", price:1},
  {id: 102, product:"Carrot", price:2},
  {id: 103, product:"Donuts", price:5},
  {id: 104, product:"Eggplant", price:4}
]


ReactDOM.render(
  <ProductList productArray = {array}/>,
  document.querySelector('#root')
)
{% endhighlight %}

##### Extracting List Items

Each list item may be extracted into its own React Component to make the code more maintainable. If the list items are extracted, the keys do not need to be passed down to the list item components. Keys are only necessary when React Elements are generated dynamically using arrays.

Example:
{% highlight javascript %}
function ListItem(props){
    //don't need to add a key to 
    return <li>Product: {props.product} | Price: ${props.price}  </li>
}


class ProductList extends React.Component{
  render(){
    var elements = array.map( (item,index) => {
      //need to add a key here
      return <ListItem key={item.id} product={item.product} price = {item.price}/>
    })

    return (
      <ol>
        {elements}
      </ol>
    )

  }

}

var array =[
  {id: 100, product:"Apple", price:3},
  {id: 101, product:"Banana", price:1},
  {id: 102, product:"Carrot", price:2},
  {id: 103, product:"Donuts", price:5},
  {id: 104, product:"Eggplant", price:4}
]

ReactDOM.render(
  <ProductList productArray = {array}/>,
  document.querySelector('#root')
)
{% endhighlight %}

<div id="root"></div>

----------

#### Forms
##### Controlled Components

HTML form elements such as inputs, text areas, and select fields naturally keep some internal state. When we use HTML form elements in React, we tie that natural state to the React Component state so that all of the state can be maintained by a single source.

We accomplish this by doing the following two steps:

<ol class="collection">
    <li class="collection-item">
Whenever the input value is changed, call an event handler to update the component state to the new input value
    </li>
    <li class="collection-item">
Re render the the React Element with its value attribute set to the updated state input value
    </li>
</ol>
Form elements that have their state's controlled by React in his manner are called Controlled Components.

##### Controlling Input fields

To turn an input field into a Controlled Component, we must first declare an event handler that will update the state input value whenever the form input value is changed.

The event.target.value attribute can be used to obtain the form input value:

{% highlight javascript %}
    handleChange(event){
        this.setState({value: event.target.value})
    }
{% endhighlight %}

We then must attach the event handler to the &lt;input> element and set the input value equal to the state input value:

{% highlight javascript %}
    render(){
        return (
            <input type = "text" value = {this.state.value} onChange = {this.handleChange}/>
        )
    }
{% endhighlight %}

Lastly, we must not forget to bind the event handler to the component instance and also declare the initial state value:

{% highlight javascript %}
    constructor(props){
        super(props)
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this)
    }
{% endhighlight %}

Putting it all together:

{% highlight javascript %}
class ControlledInput extends React.Component{

    constructor(props){
        super(props)
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        this.setState({value: event.target.value})
    }
    render(){
        return (
            <input type = "text" value = {this.state.value} onChange = {this.handleChange}/>
        )
    }
}
{% endhighlight %}

<div id="root21"></div>

##### Controlling Checkboxes

Checkboxes use a checked attribute instead of a value attribute.

Example:

{% highlight javascript %}
class ControlledInput extends React.Component{

    constructor(props){
        super(props)
        this.state = {checked: false}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        this.setState({checked: event.target.checked})
    }
    render(){
        return (
            <input type = "checkbox" checked = {this.state.checked} onChange = {this.handleChange}/>
        )
    }
}
{% endhighlight %}

<div id="root22"></div>

##### Controlling TextArea fields

Controlling TextAreas is similar to controlling Input Fields in React:

{% highlight javascript %}
class ControlledTextArea extends React.Component{

    constructor(props){
        super(props)
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        this.setState({value: event.target.value})
    }
    render(){
        return (
            <textarea type = "text" value = {this.state.value} onChange = {this.handleChange}/>
        )
    }
}
{% endhighlight %}

##### Controlling Select Tags

Controlling Select Tags is similar to controlling Input Fields in React:

{% highlight javascript %}
class ControlledSelect extends React.Component{

    constructor(props){
        super(props)
        this.state = {value: 'apple'}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        this.setState({value: event.target.value})
    }
    render(){
        return (
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="apple">apple</option>
            <option value="banana">banana</option>
            <option value="carrot">carrot</option>
            <option value="donuts">donuts</option>
          </select>
        )
    }
}
{% endhighlight %}

Select Components can also have their options dynamically generated using the map() method. Example:

{% highlight javascript %}
class ControlledSelect extends React.Component{

    constructor(props){
        super(props)
        this.state = {value: 'apple'}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        this.setState({value: event.target.value})
    }
    render(){
        var array = ["apple","banana","carrot","donuts"]
        var options = array.map( (item) =>
            <option value = {item}>{item}</option>
        )
        return (
          <select value={this.state.value} onChange={this.handleChange}>
            {options}
          </select>
        )
    }
}
{% endhighlight %}

##### Handling Multiple Inputs

If your form has multiple inputs, you can set each of their values to a different attribute on the component state. It is useful to use ES6's computed property name feature to accomplish this.

Example:

{% highlight javascript %}
class ControlledMultiple extends React.Component{

    constructor(props){
        super(props)
        this.state = {value: 'apple'}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){


        this.setState({[event.target.name]: event.target.value})
    }
    render(){
        var array = ["apple","banana","carrot","donuts"]
        var options = array.map( (item) =>
            <option value = {item}>{item}</option>
        )
        return (
            <form>
                <input name="inputName" type = "input" value = {this.state.inputName} onChange = {this.handleChange}/>
                <textarea name="textAreaName" type = "text" value = {this.state.textAreaName} onChange = {this.handleChange}/>

                <select name = "selectName" value={this.state.selectName} onChange={this.handleChange}>
                    {options}
                </select>
            </form>
        )
    }
}
{% endhighlight %}

<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.24.0/babel.js"></script>

<script type="text/babel">
function ListItem(props){
    /*don't need to add a key to */
    return <li>Product: {props.product} | Price: ${props.price}  </li>
}


class ProductList extends React.Component{
  render(){
    var elements = array.map( (item,index) => {
      /*need to add a key here*/
      return <ListItem key={item.id} product={item.product} price = {item.price}/>
    })

    return (
      <ol>
        {elements}
      </ol>
    )

  }

}

var array =[
  {id: 100, product:"Apple", price:3},
  {id: 101, product:"Banana", price:1},
  {id: 102, product:"Carrot", price:2},
  {id: 103, product:"Donuts", price:5},
  {id: 104, product:"Eggplant", price:4}
]

ReactDOM.render(
  <ProductList productArray = {array}/>,
  document.querySelector('#root')
)

class ControlledInput extends React.Component{

    constructor(props){
        super(props)
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        this.setState({value: event.target.value})
    }
    render(){
        return (
            <input type = "text" value = {this.state.value} onChange = {this.handleChange}/>
        )
    }
}
class ControlledCheckbox extends React.Component{

    constructor(props){
        super(props)
        this.state = {checked: false}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        console.log(event.target.checked);
        this.setState({checked: event.target.checked})
    }
    render(){
        return (
            <form action="#">
            <input type = "checkbox" id="text" className="filled-in" checked = {this.state.checked} onChange = {this.handleChange}/>
            <label for="test">Red</label>
            </form>
        )
    }
}

ReactDOM.render(
  <ControlledInput/>,
  document.querySelector('#root21')
)
ReactDOM.render(
  <ControlledCheckbox/>,
  document.querySelector('#root22')
)

</script>