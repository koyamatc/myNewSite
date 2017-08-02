var React = require('React');
var ReactDOM = require('react-dom');

import {Button, Icon, Input, Col} from 'react-materialize'
function FirstName(){
    return (
        <div>
        <label>First Name</label>
        <Input type='text' s={4}/>
        </div>
    )
}
class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            activity:'',
            restrictions:'',
            items:[]
        }
    }
    render(){
        return (
            <Col s={4}>
                <FirstName/>
                <Button onClick = { () => this.addItem()}>Submit</Button>
            </Col>
        )
    }
}
ReactDOM.render(
    <App/>,
    document.querySelector("#root")
)