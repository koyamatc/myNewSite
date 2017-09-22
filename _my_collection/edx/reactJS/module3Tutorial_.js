var React = require('React');
var ReactDOM = require('react-dom');

//import {Button, Icon, Input} from 'react-materialize'

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
        border:"1px solid black",
        width: props.width
    }
    return (
        <div style = {style}>{props.text}</div>
    )
}

function Post(props){
    var style = {
        display:"flex"
    }
    return (
        <div style = {style}>
            <PostButton label = "x" handleClick = {props.removeItem}/>
            <PostText text = {props.title} width = {200}/>
            <PostButton label = "+" handleClick = {props.incrementScore}/>
            <PostText text = {props.score} width = {20}/>
            <PostButton label = "-" handleClick = {props.decrementScore}/>

        </div>
    )
}

function PostList(props){
    return (
        <ol>
        {
            props.postList.map((item,index) => 
                <Post key = {index} 
                    title = {item.title} 
                    score = {item.score}
                    incrementScore = {() => props.updateScore(index,1)}                         
                    decrementScore = {() => props.updateScore(index,-1)}
                    removeItem = {() => props.removeItem(index)}
                />
             )
         }
        </ol>
    )  
}

class App01 extends React.Component{
    constructor(props){
        super(props)
        this.state = {value:"", items : []}
    } 
    render(){
        return (
            <div>
                App
            </div>
        )
    }
}

class App02 extends React.Component{
    constructor(props){
        super(props)
        this.state = {value:"", items : []}
    } 
    handleChange(event){
        this.setState({value:event.target.value})
        console.log(this.state.value)

    }
    render(){
        return (
            <div>
                <input value = {this.state.value} onChange = {this.handleChange.bind(this)}/>
            </div>
        )
    }
}

class App03 extends React.Component{
    constructor(props){
        super(props)
        this.state = {value:"", items : []}
    } 
    handleChange(event){
        this.setState({value:event.target.value})
        console.log(this.state.value)

    }
    addItem(){
        var itemsCopy = this.state.items.slice()
        var truncatedString = this.state.value.substring(0,20);
        itemsCopy.push({"title":truncatedString,"score":0})
        itemsCopy.sort((a,b)=>{
          return b.score - a.score;
        })
        this.setState({items:itemsCopy,value:""})
    }

    render(){
        return (
            <div>
                <input value = {this.state.value} onChange = {this.handleChange.bind(this)}/>
                <button onClick = { () => this.addItem()}>Submit</button>
                <PostList postList = {this.state.items}/>
            </div>
        )
    }
}

class App04 extends React.Component{
    constructor(props){
        super(props)
        this.state = {value:"", items : []}
    } 
    handleChange(event){
        this.setState({value:event.target.value})
        console.log(this.state.value)

    }
    addItem(){
        var itemsCopy = this.state.items.slice()
        var truncatedString = this.state.value.substring(0,20);
        itemsCopy.push({"title":truncatedString,"score":0})
        itemsCopy.sort((a,b)=>{
          return b.score - a.score;
        })
        this.setState({items:itemsCopy,value:""})
    }
    updateScore(index,val){
        var itemsCopy = this.state.items.slice()
        itemsCopy[index].score += val
        itemsCopy.sort((a,b) => {
            return b.score - a.score
        })
        this.setState({items:itemsCopy})
    }    
    render(){
        return (
            <div>
                <input value = {this.state.value} onChange = {this.handleChange.bind(this)}/>
                <button onClick = { () => this.addItem()}>Submit</button>
                <PostList postList = {this.state.items}
                        updateScore = {this.updateScore.bind(this)}  
                />
            </div>
        )
    }
}
class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {value:"", items : []}
    } 
    handleChange(event){
        this.setState({value:event.target.value})
        console.log(this.state.value)

    }
    addItem(){
        var itemsCopy = this.state.items.slice()
        var truncatedString = this.state.value.substring(0,20);
        itemsCopy.push({"title":truncatedString,"score":0})
        itemsCopy.sort((a,b)=>{
          return b.score - a.score;
        })
        this.setState({items:itemsCopy,value:""})
    }
        removeItem(index){
        var itemsCopy = this.state.items.slice()
        itemsCopy.splice(index,1);
        itemsCopy.sort((a,b) => {
            return b.score - a.score
        })

        this.setState({items:itemsCopy})
    }
    updateScore(index,val){
        var itemsCopy = this.state.items.slice()
        itemsCopy[index].score += val
        itemsCopy.sort((a,b) => {
            return b.score - a.score
        })
        this.setState({items:itemsCopy})
    }    
    render(){
        return (
            <div>
                <input value = {this.state.value} onChange = {this.handleChange.bind(this)}/>
                <button onClick = { () => this.addItem()}>Submit</button>
                <PostList postList = {this.state.items}
                        updateScore = {this.updateScore.bind(this)}
                        removeItem = {this.removeItem.bind(this)} 
                />
            </div>
        )
    }
}

ReactDOM.render(
  <PostButton/>,
  document.querySelector('#root01')
)

ReactDOM.render(
    <PostText width ={50} text="Test"/>,
    document.querySelector("#root02")
)

ReactDOM.render(
    <Post title="Post Title" score = {0}/>,
    document.querySelector("#root03")
)

ReactDOM.render(
    <PostList postList = {[1,2,3,4,5]}/>,
    document.querySelector("#root04")
)

ReactDOM.render(
    <App01/>,
    document.querySelector("#root05")
)

ReactDOM.render(
    <App02/>,
    document.querySelector("#root06")
)

ReactDOM.render(
    <App03/>,
    document.querySelector("#root07")
)

ReactDOM.render(
    <App04/>,
    document.querySelector("#root08")
)

ReactDOM.render(
    <App/>,
    document.querySelector("#root")
)
