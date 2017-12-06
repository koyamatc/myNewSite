---
layout: post
title: Day 14 - Scope
date: 2017-11-15 03:00:00 +900
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

__Objective__

Today we're discussing scope.

The absolute difference between two integers, $$a$$ and $$b$$, is written as $$ \vert a-b \vert$$. The maximum absolute difference between two integers in a set of positive integers, $$elements$$, is the largest absolute difference between any two integers in $$elements$$.

The Difference class is started for you in the editor. It has a private integer array ($$elements$$) for storing $$N$$ non-negative integers, and a public integer (maximumDifference) for storing the maximum absolute difference.

__Task__

  $$\quad \cdot$$ Complete the Difference class by writing the following:

  $$\quad \cdot$$ A class constructor that takes an array of integers as a parameter and saves it to the $$elements$$ instance variable.

A computeDifference method that finds the maximum absolute difference between any $$2$$ numbers in $$N$$ and stores it in the $$maximumDifference$$ instance variable.

__Input Format__

You are not responsible for reading any input from stdin. The locked Solution class in your editor reads in $$2$$ lines of input; the first line contains $$N$$, and the second line describes the $$elements$$ array.

__Constraints__

$$\cdot \ 1 \le N \le 10$$

$$\cdot \ 1 \e elements[i] \le 100, where \ 0 \le i \le N - 1$$ 

__Output Format__

You are not responsible for printing any output; the Solution class will print the value of the $$maximumDifference$$ instance variable.

__Sample Input__

3

1 2 5

__Sample Output__

4

__Explanation__

The scope of the $$elements$$ array and $$maximumDifference$$ integer is the entire class instance. The class constructor saves the argument passed to the constructor as the $$elements$$ instance variable (where the computeDifference method can access it).

To find the maximum difference, computeDifference checks each element in the array and finds the maximum difference between any $$2$$ elements:$$\vert 1 - 2 \vert = 1$$  
 
$$\vert 1 - 5 \vert = 4$$ 

$$\vert 2 - 5 \vert = 3$$

The maximum of these differences is $$4$$, so it saves the value $$4$$ as the $$maximumDifference$$ instance variable.
The locked stub code in the editor then prints the value stored as $$maximumDiffrence$$, which is $$4$$.

{% highlight python linenos %}
class Difference:
    def __init__(self, a):
        self.__elements = a
	# Add your code here
        self.maximumDifference = 0
        self.__elements
    def computeDifference(self): 
        for i in range(len(self.__elements)):
            for j in range(i+1,len(self.__elements)):
                diff = abs(self.__elements[i] - self.__elements[j])
                if diff > self.maximumDifference:
                    self.maximumDifference = diff
        return self.computeDifference
# End of Difference class

_ = input()
a = [int(e) for e in input().split(' ')]

d = Difference(a)
d.computeDifference()

print(d.maximumDifference)                          
{% endhighlight %}