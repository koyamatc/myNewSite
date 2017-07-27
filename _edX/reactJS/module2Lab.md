---
layout: post
title: Module 2 Lab
date: 2017-07-26 00:00:00 +900
subject: reactjs
description:
  edx's course by Microsoft.
  Introduction to ReactJS
---

-------

##### Module 2 Lab Intructions

The assignment for this module is to build a trivia application.

<img src="https://d37djvu3ytnwxt.cloudfront.net/assets/courseware/v1/ea73b30595280982493fae08daaa81e7/asset-v1:Microsoft+DEV281x+2T2017+type@asset+block/m2lab1.png" alt="Image of Lab 2">

__Visual Elements__

The user should see the following visual elements:

<ol class="collecrion">
    <li class="collection-item">
A section where the question is displayed
    </li>
    <li class="collection-item">
A section where the answer choices are displayed as buttons
    </li>
    <li class="collection-item">
A section that shows the number of correct answers
    </li>
    <li class="collection-item">
A section that shows the number of incorrect answers
    </li>
</ol>

__Functional Elements__

The user should be able to do the following:

<ol class="collection">
    <li class="collection-item">
When the user clicks on an answer choice, the number of correct/incorrect answers should update based on whether the answer is correct or not.
    </li>
    <li class="collection-item">
When the user clicks on an answer choice, the next question and set of answers will be displayed
    </li>
    <li class="collection-item">
The user should be able to go through at least 10 questions
    </li>
</ol>

<div id="root"></div>

<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.24.0/babel.js"></script>

<script type="text/babel">
var interval;
var time;

class Game extends React.Component{
  
    constructor(props){ 
        super(props)

        var answers = [];
        answers.push(new Array(5).fill(0));

        this.state = {
            correct:0,
            incorrect:0,
            question:"",
            answer:0,
            answers:answers,
            numOfQuestions:10,
            seconds:3,
            gameover:false
        }
        this.handleClick = this.handleClick.bind(this)


    }
    componentDidMount(){
        /*updating state*/
        this.createQuestion();
        this.interval = setInterval(this.tick.bind(this), 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
  
    tick() {
        this.setState({
            seconds: this.state.seconds - 0.1
        });
    }

    createQuestion(){
        let operator = ["+","-","x","/"]
        let a = Math.floor(Math.random()*100)+1;
        let b = Math.floor(Math.random()*100)+1;
        let o = Math.floor(Math.random()*4);
        let t = (o==3)?" of integer part":"";
        
        let question = 'What is ' 
                     + a + " " 
                     + operator[o]  + " "
                     + b + t +"?";
        
        console.log(question);

        /* compute */
        var ans = 0;
        if (o==0){
            ans = a + b;
        } else if (o==1){
            ans = a - b;
        } else if (o==2){
            ans = a * b;
        } else {
            ans = Math.trunc(a / b);
        }

        /* To do delete later*/
        /*question += " = " + ans;*/

        let rightAnswerPosition = Math.floor(Math.random()*5);
        let dif = [-10,-8,-5,-2,0,2,5,8,10];

        let answers = [];
        for (let i=0; i<5;i++){
            answers.push(ans+dif[i+4-rightAnswerPosition]);        
        } 
        
        this.setState({question:question, answer:ans, answers:answers});

        var elem = document.querySelector("#temp");
        elem.style.opacity = 1;
        elem.focus();
        elem.style.opacity = 0;

    }

    checkAnswer(ans){
        if (ans == this.state.answer){
            let num = this.state.correct + 1;
            this.setState({correct:num},()=>{
                this.checkGameOver(this.state.correct+this.state.incorrect);
            });
        } else {
            let num = this.state.incorrect + 1;
            this.setState({incorrect:num},()=>{
                this.checkGameOver(this.state.correct+this.state.incorrect);
            });
        }
    }

    checkGameOver(count){
        if(this.state.numOfQuestions==count){
            let rate = (this.state.correct / this.state.numOfQuestions * 100).toFixed(1) + "% correct";
            this.setState({question:"Game Over " + rate, gameover:true})
        }
    }

    
    handleClick(ans){
        if (!this.state.gameover){
            this.checkAnswer(ans);
            this.createQuestion();
        }
    }


    restart(){
        clearInterval(interval);
        this.setState({ gameover : false, correct : 0, incorrect:0})
        this.createQuestion();
    }
    render(){
        return (
            <div className='row'>
                <div className="col s12 m6">
                    <Question question={this.state.question}/>
                    <Answers answers={this.state.answers} handleClick={this.handleClick}/>
                    <button id="restart" onClick = { () => this.restart()}>Restart</button>
                </div>
                <div className="col s12 m6">
                    <Board correct={this.state.correct} incorrect={this.state.incorrect} seconds={this.state.seconds}/>
                </div>
            </div>
        )
    }
}
function Answers(props){
    var buttons = [];
    for(let i=0; i<5; i++){
        buttons.push(<Button key={i} answer={props.answers[i]} handleClick={props.handleClick}/>)
    }

    return (
        <div>
            {buttons}
        </div>
    )
}
function Button(props){
    var style = {
        width: "100%",
        height: "50px",
        fontSize: "2em"
    }
    console.log(props);
    
    return (
        <button style={style} onClick = {() => props.handleClick(props.answer)}>{props.answer}</button>
    )
}

function Board(props){
    var style = {
        fontSize: "1.5em",
        fontWeight: "bold",
        paddingTop:"30px",
        paddingBottom:"70px"
    }
    return (
        <div>
            <h4 id="timer">Time: {props.seconds.toFixed(1)}</h4>
            <p style={style}>Correct:{props.correct}</p>
            <p style={style}>incorrect:{props.incorrect}</p>
            <button id="temp"></button>
        </div>
    )

}

function Question(props){
    return (
        <h3 className="red-text center">{props.question}</h3>
    )
}
ReactDOM.render(
    <Game/>,
    document.querySelector('#root')
)
</script>