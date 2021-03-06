---
layout: post
title:  Intro to ReactJS module 2 Lab
categories: post edx reactjs
description:
  edx のコース　Inroduction to ReactJSのModule 2 Labの課題です。 
  簡単な計算ゲームを Reactコンポーネントで作成しています。
---

----

20問出題される簡単な計算問題に答えるゲームです。

表示される答えのボタンの中から正しいものを選んでください。

スタートボタンで開始です。

1問の回答時間は5秒です。

<br><br><br>

<div id="root"></div>

<br><br><br>

{% highlight jaavascript linenos %}
class Game extends React.Component{
  
    constructor(props){ 
        super(props)

        var answers = [1,2,3,4,5];
        answers.push(new Array(5).fill(0));

        this.state = {
            correct:0,
            incorrect:0,
            question:"Click Start Button",
            answer:0,
            answers:answers,
            numOfQuestions:20,
            seconds:5,
            gameover:true
        }
        this.handleClick = this.handleClick.bind(this)


    }
    componentDidMount(){
        this.interval = setInterval(this.tick.bind(this), 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
  
    tick() {
        if (!this.state.gameover){
            let seconds = this.state.seconds - 0.1;
            if (seconds <= 0){
                this.setState({incorrect:this.state.incorrect + 1},()=>{
                    this.checkGameOver(this.state.correct + this.state.incorrect);
                })

                if(!this.state.gameover){
                    this.createQuestion();
                };    

           } else {
                if(!this.state.gameover){
                    this.setState({seconds: seconds});
                }
            }
        }
    }

    createQuestion(){
        let operator = ["+","-","x","/"];
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
        let ans = 0;
        if (o==0){
            ans = a + b;
        } else if (o==1){
            ans = a - b;
        } else if (o==2){
            ans = a * b;
        } else {
            ans = Math.trunc(a / b);
        }

        let rightAnswerPosition = Math.floor(Math.random()*5);
        let dif = [-10,-8,-5,-2,0,2,5,8,10];

        let answers = [];
        for (let i=0; i<5;i++){
            answers.push(ans+dif[i+4-rightAnswerPosition]);        
        } 
        
        this.setState({question:question, answer:ans, answers:answers, seconds:5});

        let elem = document.querySelector("#temp");
        elem.style.opacity = 1;
        elem.focus();
        elem.style.opacity = 0;

    }

    checkAnswer(ans){
        if (ans == this.state.answer){
            this.setState({correct:this.state.correct + 1},()=>{
                this.checkGameOver(this.state.correct+this.state.incorrect);
            });
        } else {
            this.setState({incorrect:this.state.incorrect + 1},()=>{
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
        this.setState({ gameover : false, correct : 0, incorrect:0})
        this.createQuestion();
        document.querySelector("#restart").innerHTML = "Restart";
    }
    render(){
        return (
            <div className='row'>
                <div className="col s12 m6">
                    <Question question={this.state.question}/>
                    <Answers answers={this.state.answers} handleClick={this.handleClick}/>
                    <button id="restart" className="btn" onClick = { () => this.restart()}>Start</button>
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
        paddingTop:"20px",
        paddingBottom:"20px"
    }
    return (
        <div>
            <h4 id="timer">Timer: {props.seconds.toFixed(1)}</h4>
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
{% endhighlight %}

<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.24.0/babel.js"></script>

<script type="text/babel">
class Game extends React.Component{
  
    constructor(props){ 
        super(props)

        var answers = [1,2,3,4,5];
        answers.push(new Array(5).fill(0));

        this.state = {
            correct:0,
            incorrect:0,
            question:"Click Start Button",
            answer:0,
            answers:answers,
            numOfQuestions:20,
            seconds:5,
            gameover:true
        }
        this.handleClick = this.handleClick.bind(this)


    }
    componentDidMount(){
        this.interval = setInterval(this.tick.bind(this), 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
  
    tick() {
        if (!this.state.gameover){
            let seconds = this.state.seconds - 0.1;
            if (seconds <= 0){
                this.setState({incorrect:this.state.incorrect + 1},()=>{
                    this.checkGameOver(this.state.correct + this.state.incorrect);
                })

                if(!this.state.gameover){
                    this.createQuestion();
                };    

           } else {
                if(!this.state.gameover){
                    this.setState({seconds: seconds});
                }
            }
        }
    }

    createQuestion(){
        let operator = ["+","-","x","/"];
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
        let ans = 0;
        if (o==0){
            ans = a + b;
        } else if (o==1){
            ans = a - b;
        } else if (o==2){
            ans = a * b;
        } else {
            ans = Math.trunc(a / b);
        }

        let rightAnswerPosition = Math.floor(Math.random()*5);
        let dif = [-10,-8,-5,-2,0,2,5,8,10];

        let answers = [];
        for (let i=0; i<5;i++){
            answers.push(ans+dif[i+4-rightAnswerPosition]);        
        } 
        
        this.setState({question:question, answer:ans, answers:answers, seconds:5});

        let elem = document.querySelector("#temp");
        elem.style.opacity = 1;
        elem.focus();
        elem.style.opacity = 0;

    }

    checkAnswer(ans){
        if (ans == this.state.answer){
            this.setState({correct:this.state.correct + 1},()=>{
                this.checkGameOver(this.state.correct+this.state.incorrect);
            });
        } else {
            this.setState({incorrect:this.state.incorrect + 1},()=>{
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
        this.setState({ gameover : false, correct : 0, incorrect:0})
        this.createQuestion();
        document.querySelector("#restart").innerHTML = "Restart";
    }
    render(){
        return (
            <div className='row'>
                <div className="col s12 m6">
                    <Question question={this.state.question}/>
                    <Answers answers={this.state.answers} handleClick={this.handleClick}/>
                    <button id="restart" className="btn" onClick = { () => this.restart()}>Start</button>
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
        paddingTop:"20px",
        paddingBottom:"20px"
    }
    return (
        <div>
            <h4 id="timer">Timer: {props.seconds.toFixed(1)}</h4>
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