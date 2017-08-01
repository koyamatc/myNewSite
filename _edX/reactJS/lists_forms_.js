var React = require('React');
var ReactDOM = require('react-dom');

import {Button, Icon, Input} from 'react-materialize'

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
      <div>  
      <ol>
        {elements}
      </ol>
      <Button waves='light'>EDIT ME<Icon left>save</Icon></Button>
      </div>
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
            <div>
            <Input type = "checkbox" checked={this.state.checked} onChange = {this.handleChange} label="Red"/>
            </div>        

        )
    }
}
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
          <select className="browser-default" value={this.state.value} onChange={this.handleChange}>
            <option value="apple">apple</option>
            <option value="banana">banana</option>
            <option value="carrot">carrot</option>
            <option value="donuts">donuts</option>
          </select>
        )
    }
}
class ControlledSelect1 extends React.Component{

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
        var options = array.map( (item, i) =>
            <option key={i} value = {item}>{item}</option>
        )
        return (
          <Input type='select' value={this.state.value} onChange={this.handleChange} label="Materialize select">
            {options}
          </Input>
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
ReactDOM.render(
  <ControlledTextArea/>,
  document.querySelector('#root23')
)
ReactDOM.render(
  <ControlledSelect/>,
  document.querySelector('#root24')
)
ReactDOM.render(
  <ControlledSelect1/>,
  document.querySelector('#root25')
)