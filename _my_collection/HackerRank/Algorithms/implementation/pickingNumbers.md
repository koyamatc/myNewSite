---
layout: post
title: Picking Numbers
date: 2017-12-08 00:00:00 +900
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

Given an array of integers, find and print the maximum number of integers you can select from the array such that the absolute difference between any two of the chosen integers is $$\le 1$$.

__Input Format__

The first line contains a single integer, $$n$$, denoting the size of the array. 

The second line contains $$n$$ space-separated integers describing the respective values of $$a_{0},a_{1},\ldots,a_{n-1}$$.

__Constraints__

$$\cdot \ 2 \le n \le 100$$

$$\cdot \ 0 \le a_{i} \le 100$$

$$\cdot \ $$ The answer will be$$ \ge 2$$

__Output Format__

A single integer denoting the maximum number of integers you can choose from the array such that the absolute difference between any two of the chosen integers is $$\le 1$$.

__Sample Input 0__

6

4 6 5 3 3 1

__Sample Output 0__

3

__Explanation 0__

We choose the following multiset of integers from the array: $$\lbrace 4,3,3 \rbrace$$. Each pair in the multiset has an absolute difference $$\le 1$$ (i.e., $$|4-3|=1$$ and |3-3|=0), so we print the number of chosen integers, $$3$$, as our answer.

__Sample Input 1__

6

1 2 2 3 1 2

__Sample Output 1__

5

__Explanation 1__

We choose the following multiset of integers from the array: $$\lbrace 1,2,2,1,2 \rbrace$$. Each pair in the multiset has an absolute difference $$\le 1$$ (i.e., $$|1-2|=1$$,$$|1-1|=0$$ and |2-2|=0), so we print the number of chosen integers, $$5$$, as our answer.

{% highlight python linenos %}
#!/bin/python3

import sys

n = int(input().strip())
a = [int(a_temp) for a_temp in input().strip().split(' ')]
b = 101*[0]

for i in a:
    b[i] += 1

maxSum = 0
for i in range(100):
    sum = b[i] + b[i+1] 
    if sum > maxSum:
        maxSum = sum
print(maxSum)
{% endhighlight %}    