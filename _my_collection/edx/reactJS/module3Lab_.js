var React = require('React');
var ReactDOM = require('react-dom');

import {Button, Icon, Input, Col, Row, Table} from 'react-materialize'

function PostButton(props){
    var style = {
        width:24,
        height:24
    }
    return (
        <button style = {style} onClick = { () => props.handleClick()}>{props.label}</button>
    )
}
function PostText(props){
    var style = {
        width: props.width
    }
    return (
        <div style = {style}>{props.text}</div>
    )
}
function Post(props){
    return (
        <tr>
            <td>
                <PostButton label = "x" handleClick = {props.removeItem}/>
            </td>
            <td>
                <PostText text = {props.firstName} width = {100}/>
            </td>
            <td>
                <PostText text = {props.lastName} width = {100}/>
            </td>
            <td>
                <PostText text = {props.activity} width = {100}/>
            </td>
            <td>
                <PostText text = {props.restrictions} width = {100}/>
            </td>
        </tr>        
    )
}

function PostTable(props){
    return (
        <Table className="bordered">
          <thead>  
            <tr>
                <th>Remove</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Activity</th>
                <th>Restrictions</th>
            </tr>
          </thead>  
          <tbody>
        {
            props.postList.map((item,index) => 
                <Post key = {index} 
                    firstName = {item.firstName} 
                    lastName = {item.lastName}
                    activity = {item.activity} 
                    restrictions = {item.restrictions}
                    removeItem = {() => props.removeItem(index)}
                />
             )
        }
          </tbody>
        </Table>
    )  
}
class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            activity:'Science Lab',
            restrictions:['','',''],
            checked:[0,0,0],
            items:[]
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    handleSelect(event){
        var index = event.target.name;
        var checkedCopy = this.state.checked;
        checkedCopy[index] = event.target.checked;
        this.setState({checked:checkedCopy},()=>{
            //console.log(this.state.checked);
        });
        let restrictCopy = this.state.restrictions;
        if (event.target.checked){
            restrictCopy[index] = event.target.value; 
        } else {
            restrictCopy[index] = '';
        }
        this.setState({restrictions:restrictCopy})
    }
    addItem(){
        var itemsCopy = this.state.items.slice();
        itemsCopy.push({
            "firstName":this.state.firstName,
            "lastName": this.state.lastName,
            "activity": this.state.activity,
            "restrictions":this.state.restrictions
        })
        this.setState({items:itemsCopy,firstName:"",
                    lastName:"",
                    activity:"Science Lab",
                    restrictions:['','',''],
                    checked:[0,0,0]})
    }
    removeItem(index){
        var itemsCopy = this.state.items.slice()
        itemsCopy.splice(index,1);
        this.setState({items:itemsCopy})
    }
    render(){
        var array = ['Science Lab','Swimming','Cooking','Painting'];
        var options = array.map( (item, i) => 
            <option key = {i} value = {item}>{item}</option>
        )
        var array2 = ['a) Dietary Restrictions',
                      'b) Physical Disabilities',
                      'c) Medical Needs'];
        var selects = array2.map( (item, i) => 
            <Input 
                type = 'checkbox' 
                key = {i}
                name = {i.toString()}
                checked = {this.state.checked[i]}
                value = {item.slice(0,1)}
                label = {item}
                onChange = {this.handleSelect}
            ></Input>
        )
        return (
            <div>
                <Row>
                    <Col s={6}>
                        <Input 
                            type='text' 
                            name='firstName' 
                            onChange={this.handleChange} 
                            label='First Name'
                            value={this.state.firstName}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col s={6}>
                        <Input 
                            type='text' 
                            name='lastName' 
                            onChange={this.handleChange} 
                            label='Last Name'
                            value={this.state.lastName}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col s={6}>
                        <Input 
                            type='select' 
                            name='activity' 
                            label='Select Activity' 
                            className='browser-default' 
                            onChange={this.handleChange} 
                            value={this.state.activity}
                        >
                            {options}
                        </Input>
                    </Col>
                </Row>    
                <Row>
                    <Col s={4}>
                        {selects}
                    </Col>
                </Row>    
                <Button onClick = { () => this.addItem()}>Submit</Button>
                <PostTable
                    postList = {this.state.items}
                    removeItem = {this.removeItem.bind(this)} 
                />
            </div>    
        )
    }
}
ReactDOM.render(
    <App/>,
    document.querySelector("#root")
)