---
layout: post
title: Apple and Orange
date: 2017-12-06 06:00:00 +900
subject: algorithms-implementation
description:
  HackerRank Algorithms.
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

Sam's house has an apple tree and an orange tree that yield an abundance of fruit. In the diagram below, the red region denotes his house, where $$s$$ is the start point and $$t$$ is the end point. The apple tree is to the left of his house, and the orange tree is to its right. You can assume the trees are located on a single point, where the apple tree is at point $$a$$ and the orange tree is at point $$b$$.

![Appleandorange2.png](img/1474218925-f2a791d52c-Appleandorange2.png)

When a fruit falls from its tree, it lands $$d$$ units of distance from its tree of origin along the $$x$$-axis. A negative value of $$d$$ means the fruit fell $$d$$ units to the tree's left, and a positive value of $$d$$ means it falls $$d$$ units to the tree's right.

Given the value of $$d$$ for $$m$$ apples and $$n$$ oranges, can you determine how many apples and oranges will fall on Sam's house (i.e., in the inclusive range $$[s,t]$$)? Print the number of apples that fall on Sam's house as your first line of output, then print the number of oranges that fall on Sam's house as your second line of output.

__Input Format__

The first line contains two space-separated integers denoting the respective values of $$s$$ and $$t$$.

The second line contains two space-separated integers denoting the respective values of $$a$$ and $$b$$.

The third line contains two space-separated integers denoting the respective values of $$m$$ and $$n$$. 

The fourth line contains $$m$$ space-separated integers denoting the respective distances that each apple falls from point $$a$$. 

The fifth line contains $$n$$ space-separated integers denoting the respective distances that each orange falls from point $$b$$.

__Constraints__

$$\cdot \ 1 \le s,t,a,b,m,n \le 10^5$$

$$\cdot \ -10^5 \le d \le 10^5$$

$$\cdot \ a \lt s \lt t \lt b$$

__Output Format__

Print two lines of output:

1. On the first line, print the number of apples that fall on Sam's house.

2. On the second line, print the number of oranges that fall on Sam's house.

__Sample Input 0__

7 11

5 15

3 2

-2 2 1

5 -6

__Sample Output 0__

1

1

__Explanation 0__

The first apple falls at position $$5-2=3$$. 

The second apple falls at position $$5+2=7$$. 

The third apple falls at position $$5+1=6$$. 

The first orange falls at position $$15+5=11$$. 

The second orange falls at position $$15-6=9$$. 

Only one fruit (the second apple) falls within the region between $$7$$ and $$11$$, so we print $$1$$ as our first line of output. 

Only the second orange falls within the region between $$7$$ and $$11$$, so we print $$1$$ as our second line of output.


{% highlight python linenos %}
#!/bin/python3

import sys

s,t = input().strip().split(' ')
s,t = [int(s),int(t)]
a,b = input().strip().split(' ')
a,b = [int(a),int(b)]
m,n = input().strip().split(' ')
m,n = [int(m),int(n)]
apple = [int(apple_temp) for apple_temp in input().strip().split(' ')]
orange = [int(orange_temp) for orange_temp in input().strip().split(' ')]

countA,countO = 0,0
for i in apple:
    d = a + i
    if d >= s and d <= t:
        countA += 1
for i in orange:
    d = b + i
    if d >= s and d <= t:
        countO += 1
        
print(countA)
print(countO)
{% endhighlight %}    