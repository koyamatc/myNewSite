---
layout: post
title: Module 3 Tutorial
date: 2017-08-02 00:00:00 +900
subject: reactjs
description:
  edx's course by Microsoft.
  Introduction to ReactJS
---

-------

In this tutorial we are are going to learn how to build an application that allows users to post topics and upvote/downvote the topics.

<img src="https://d37djvu3ytnwxt.cloudfront.net/assets/courseware/v1/9df1f12316a53541b020144002ee0b53/asset-v1:Microsoft+DEV281x+2T2017+type@asset+block/m3tutorial1.PNG" alt="">

#### Step 1: Breaking up the application into components
<img src="https://d37djvu3ytnwxt.cloudfront.net/assets/courseware/v1/282f538d62e8eb239d6c417d27e2ee64/asset-v1:Microsoft+DEV281x+2T2017+type@asset+block/m3tutorial1divided.png" alt="">

<ul class="collection">
    <li class="collection-item">
    A section that contains an input field(red)
    </li>
    <li class="collection-item">
    A section that contains a submit button(brown)
    </li>
    <li class="collection-item">
    A component that contains a list of posts(orange)
    <ul class="collection">
        <li class="collection-item">
        A subcomponent that represents a post(blue)
            <ul class="collection">
                <li class="collection-item">
                A sub-subcomponent that represents a square button(red)
                </li>
                <li class="collection-item">
                A sub-subcomponent that represents text (green)
                </li>
            </ul>
        </li>
    </ul>
    </li>
</ul>

#### Step 2: Creating the PostList Component
##### Creating the PostButton Component

To start off we are going to create the component that represents the square buttons that are a part of each of the posts. We are going to add some style to it and display its label property.

{% highlight javascript %}
function PostButton(props){
    var style = {
        width:24,
        height:24
    }
    return (
        <button style = {style}>{props.label}</button>
    )
}
{% endhighlight %}

Add a &lt;div> tag to the HTML file and give it an id attribute equal to "root".



Test the PostButton component by rendering it to the page.

{% highlight javascript %}
ReactDOM.render(
    <PostButton/>,
    document.querySelector("#root")
)
{% endhighlight %}

<div id="root01"></div>

##### Creating the PostText Component

Next, we are going to create the component that represents the text areas that are a part of each of the posts. We are going to add some style to it and display its label property. Its width will vary based on its width property.

{% highlight javascript %}
function PostText(props){
    var style = {
        border:"1px solid black",
        width: props.width
    }
    return (
        <div style = {style}>{props.text}</div>
    )
}
{% endhighlight %}

Test the PostText component by rendering it to the page.

{% highlight javascript %}
ReactDOM.render(
    <PostText width ={50} text="Test"/>,
    document.querySelector("#root")
)
{% endhighlight %}

<div id="root02"></div>

##### Creating the Post Component

Next, we are going to create the component that represents the posts that go in the list of posts. We are going to add some styling to make it display its subcomponents horizontally. We are also going to pass in a title and score property down to its PostText components.

{% highlight javascript %}
function Post(props){
    var style = {
        display:"flex"
    }
    return (
        <div style = {style}>
            <PostButton label = "x"/>
            <PostText text = {props.title} width = {200}/>
            <PostButton label = "+" />
            <PostText text = {props.score} width = {20}/>
            <PostButton label = "-"/>
        </div>
    )
}
{% endhighlight %}

Test the Post component by rendering it to the page.

{% highlight javascript %}
ReactDOM.render(
    <Post title="Post Title" score = {0}/>,
    document.querySelector("#root")
)
{% endhighlight %}

<div id="root03"></div>

##### Creating the PostList Component

Next, we are going to create the component that represents the list of posts. We are going to accomplish this by using the map() method to generate a Post component for each item in the componets postList property array. We will wrap all of the Post components in a &lt;ol> tag.

{% highlight javascript %}
function PostList(props){
    return (
        <ol>
        {
            props.postList.map((item,index) => 
                <Post key = {index} 
                      title = {item.title} 
                      score = {item.score}
                />
             )
         }
        </ol>
    )  
}
{% endhighlight %}

Test the PostList component by rendering it to the page with some test data.

{% highlight javascript %}
ReactDOM.render(
    <PostList postList = {[1,2,3,4,5]}/>,
    document.querySelector("#root")
)
{% endhighlight %}

<div id="root04"></div>

#### Step 3: Creating a Controlled Component from the input field

To start off we are going to create an App component that will hold all of the other components.

{% highlight javascript %}
class App extends React.Component{
    constructor(props){
        super(props)
    } 
    render(){
        return (
            <div>
                App
            </div>
        )
    }
}
{% endhighlight %}

Test the App component by rendering it to the page.

{% highlight javascript %}
ReactDOM.render(
    <App/>,
    document.querySelector("#root")
)
{% endhighlight %}

<div id="root05"></div>

Next, we are going to initialize the App component's state. The App component will have two state attributes: one to hold the value of the input element and one to hold the array of post data.

Add this to the constructor() method:

{% highlight javascript %}
    this.state = {value:"", items : []}
{% endhighlight %}

Next, we are going to add an input element and make it a controlled component by tyings its value to the component state. We will accomplish this by declaring a handleChange() method that updates the components state whenever the input element's value is changed. We also have to bind the handleChange method to the App component so that the method refers to the right place.

{% highlight javascript %}
class App extends React.Component{
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
{% endhighlight %}

Test the input field to make sure that it is tying its value back to the component state by typing in some characters and viewing the console.

<div id="root06"></div>

#### Step 4: Adding values to the Post List

Next, are are going to add the functionality to add items to the state array.

To start, we are going to declare an event handler called addItem() to the App component. The method first makes a copy of the current items state array by using the slice() array. Then it takes in the value state attribute and truncates it to 20 characters using the substring() method. Then it creates an object containing the truncated string as a title and the value 0 as its score and adds it to the copied items array. Then it sorts the copied items array in descending order of score. Lastly, it updates the state to equal the sorted copied items array and sets the value state attribute back to an empty string.

Add to App component:

{% highlight javascript %}
    addItem(){
        var itemsCopy = this.state.items.slice()
        var truncatedString = this.state.value.substring(0,20);
        itemsCopy.push({"title":truncatedString,"score":0})
        itemsCopy.sort((a,b)=>{
          return b.score - a.score;
        })
        this.setState({items:itemsCopy,value:""})
    }
{% endhighlight %}

Now that the addItem() event handler has been created, we need to create a submit button that will call the addItem() method when it is clicked. We will add it below the input element in the render() method of the App component.

Edit the button element in the App render() method:

{% highlight javascript %}
    <button onClick = { () => this.addItem()}>Submit</button>
{% endhighlight %}

Now lets add the PostList component inside the render() method of the App component. We will supply its postList attribute with the this.state.items array that contains all of the post data.

Add to the App render() method:

{% highlight javascript %}
    <PostList postList = {this.state.items}/>
{% endhighlight %}

Test the App component by typing something in the input field and pressing the submit button. A post should be added to the PostList with a title equal to the string entered in the input field.

<div id="root07"></div>

#### Step 5: Updating the post score

Next, we are going to add the functionality to update the post score when the + or - buttons are pressed.

To start, add a method called updateScore() to the App component. The updateScore() method should make a copy of the the items state attribute by using the slice() method. It will then reference a specific index of the copied items array and update that items score based on the val argument. The copied items array is then sorted and the state is set to equal the sorted copied array.

Add to App component:

{% highlight javascript %}
    updateScore(index,val){
        var itemsCopy = this.state.items.slice()
        itemsCopy[index].score += val
        itemsCopy.sort((a,b) => {
            return b.score - a.score
        })
        this.setState({items:itemsCopy})
    }
{% endhighlight %}

The updateScore() method needs to be passed down all the way to the button elements.

Pass the updateScore() method into the PostList component. Do not forget to bind the updateScore() method to the App component before passing it in.

Edit in App render() method:

{% highlight javascript %}
    <PostList postList = {this.state.items}
                updateScore = {this.updateScore.bind(this)}  
    />
{% endhighlight %}

Create two attributes on the Post component that is rendered in the PostList component. The first will be an attribute named incrementScore that calls updateScore(index,1) which increments the score of the specified index in the items state array by 1. The second will be an attribute named decrementScore that calls updateScore(index,-1) which decrements the score of the specified index in the items state array by 1.

Edit in PostList component:

{% highlight javascript %}
    <Post key = {index} 
            title = {item.title} 
            score = {item.score}
            incrementScore = {() => props.updateScore(index,1)}                         
            decrementScore = {() => props.updateScore(index,-1)} 
    />
{% endhighlight %}

Next, create a handleClick attribute on the + and - PostButtons. The + PostButton should have its handleClick attribute set equal to incrementScore, while the - PostButton should have its handleClick attribute set to equal decrementScore.

Edit in Post component:

{% highlight javascript %}
    <PostButton label = "+" handleClick = {props.incrementScore}/>
    <PostButton label = "-" handleClick = {props.decrementScore}/>
{% endhighlight %}

Lastly, edit the button element in the PostButton component to call handleClick() when it is clicked. This should make the button either increment or decrement its post's score.

Edit in PostButton component:

{% highlight javascript %}
    <button style = {style} onClick = { () => props.handleClick()}>{props.label}</button>
{% endhighlight %}

Test the + and - buttons by to see if they increment and decrement their post's scores. The PostList should automatically sort itself by descending post score whenever a post score is updated.

<div id="root08"></div>

##### Step 6: Removing posts

Next, we are going to add the functionality to remove posts.

To start, we are going to add a method called removeItem() to the App component. The removeItem() method will make a copy of the items state array by using the slice() method. It will then remove the specified index using the splice() method and then sort the array by descending score. It will then update the state to equal the sorted copied items array.

Add to App component:

{% highlight javascript %}
    removeItem(index){
        var itemsCopy = this.state.items.slice()
        itemsCopy.splice(index,1);
        itemsCopy.sort((a,b) => {
            return b.score - a.score
        })

        this.setState({items:itemsCopy})
    }
{% endhighlight %}

The removeItem() method needs to be passed down all the way to the button elements.

Pass the removeItem() method into the PostList component. Do not forget to bind the removeItem() method to the App component before passing it in.

Edit in App component render() method:

{% highlight javascript %}
    <PostList postList = {this.state.items}
                updateScore = {this.updateScore.bind(this)}  
                removeItem = {this.removeItem.bind(this)}
    />
{% endhighlight %}

Next, add a removeItem attribute in the Post component that is rendered in the PostList component.

The removeItem attribute should call the removeItem() method that was passed in with the PostList's properties.

Edit in PostList component:

{% highlight javascript %}
    <Post key = {index} 
            title = {item.title} 
            score = {item.score} 
            incrementScore = {() => props.updateScore(index,1)}                         
            decrementScore = {() => props.updateScore(index,-1)} 
            removeItem = {() => props.removeItem(index)}/>
{% endhighlight %}

Next, create a handleClick attribute on the "x" PostButton. The "x" PostButton should have its handleClick attribute set equal to the removeItem() method that was passed in with PostButton's properties.

Edit in Post component:

{% highlight javascript %}
    <PostButton label = "x" handleClick = {props.removeItem}/>
{% endhighlight %}

Test the "x" button to see if the posts are able to be removed.

<div id="root"></div>

<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.24.0/babel.js"></script>

<script src="module3Tutorial.js"></script>