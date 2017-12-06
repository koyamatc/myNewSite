---
layout: post
title: Day 10 - Binary Numbers
date: 2017-11-09 00:00:00 +900
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

Given a base-10 integer, n, convert it to binary (base-2). Then find and print the base-10 integer denoting the maximum number of consecutive 1's in n's binary representation.

__Input Format__

A single integer, n.

__Constraints__

$$
  \cdot \ 1 \le n \le 10^6
$$

__Output Format__

Print a single base-10 integer denoting the maximum number of consecutive 1's in the binary representation of n.

__Sample Input 1__

5

__Sample Output 1__

1

__Sample Input 2__

13

__Sample Output 2__

2

__Explanation__

Sample Case 1:

The binary representation of 5 is 101, so the maximum number of consecutive 1's is 1.

Sample Case 2: 

The binary representation of 13 is 1101, so the maximum number of consecutive 1's is 2.


{% highlight python linenos %}
import sys

n = int(input().strip())

bin = []
count = 0
maxCount =0

while n > 0:
    bin.append(n%2)
    n = n // 2

for i in bin:
    if i == 0:
        count = 0
    else:
        count += 1
    if maxCount < count:
        maxCount = count
print(maxCount)        
{% endhighlight %}    