---
layout: post
title: Day 13 - Abstract Class
date: 2017-11-15 00:00:00 +900
subject: 30days-python
description:
  HackerRank 30 days of code challenge.
---

-------
<style>
.MathJax_Display {
  text-align: left;
  color: #000;
}
.MathJax_SVG_Display {
  text-align: left !important;
}
.MathJax_SVG_Display line {
  stroke:#000;
}
.MathJax_SVG g{
  stroke:#000;
  stroke-width:2;
  fill:#000;
}
</style>

__Task__

Given a Book class and a Solution class, write a MyBook class that does the following:

$$\cdot$$ Inherits from Book

$$\cdot$$ Has a parameterized constructor taking these  parameters:

  1. string $$title$$
  
  2. string $$author$$

  3. int $$price$$

$$\cdot$$ Implements the Book class' abstract display() method so it prints these  lines:

  1. $$Title:$$, a space, and then the current instance's $$title$$.

  2. $$Author:$$, a space, and then the current instance's $$author$$.

  3. $$Price:$$, a space, and then the current instance's $$price$$.

Note: Because these classes are being written in the same file, you must not use an access modifier (e.g.: $$public$$) when declaring MyBook or your code will not execute.

__Input Format__

You are not responsible for reading any input from stdin. The Solution class creates a Book object and calls the MyBook class constructor (passing it the necessary arguments). It then calls the display method on the Book object.

__Output Format__

The  method should print and label the respective , , and  of the MyBook object's instance (with each value on its own line) like so:

Title: $title

Author: $author

Price: $price

Note: The  is prepended to variable names to indicate they are placeholders for variables.

__Sample Input__

The following input from stdin is handled by the locked stub code in your editor:

The Alchemist

Paulo Coelho

248

__Sample Output__

The following output is printed by your display() method:

Title: The Alchemist

Author: Paulo Coelho

Price: 248

{% highlight python linenos %}
from abc import ABCMeta, abstractmethod
class Book(object, metaclass=ABCMeta):
    def __init__(self,title,author):
        self.title=title
        self.author=author   
    @abstractmethod
    def display(): pass

class MyBook(Book):
    def __init__(self, title, author, price):
        self.title = title
        self.author = author
        self.price = price
        
    def display(self):
        print("Title:", self.title)
        print("Author:", self.author)
        print("Price:", self.price)

title=input()
author=input()
price=int(input())
new_novel=MyBook(title,author,price)
new_novel.display()    
{% endhighlight %}    