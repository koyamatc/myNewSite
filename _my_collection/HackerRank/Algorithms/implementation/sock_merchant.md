---
layout: post
title: Sock Merchant
date: 2017-11-09 00:00:00 +900
subject: algorithms-implementation
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

John works at a clothing store and he's going through a pile of socks to find the number of matching pairs. More specifically, he has a pile of  loose socks where each sock  is labeled with an integer, , denoting its color. He wants to sell as many socks as possible, but his customers will only buy them in matching pairs. Two socks,  and , are a single matching pair if they have the same color ().

Given  and the color of each sock, how many pairs of socks can John sell?

__Input Format__

The first line contains an integer, , denoting the number of socks. 
The second line contains  space-separated integers describing the respective values of .

__Constraints__

$$
\cdot \ 1 \le n \le 100 \\
\cdot \ 1 \le c_{i} \le 100 \\
$$

__Output Format__

Print the total number of matching pairs of socks that John can sell.

__Sample Input__

9

10 20 20 10 10 30 50 10 20

__Sample Output__

3

__Explanation__

![sock.png](img/1474122392-c7b9097430-sock.png)

As you can see from the figure above, we can match three pairs of socks. Thus, we print  on a new line.
{% highlight python linenos %}
import sys

def sockMerchant(n, ar):
    sameColor = {}
    count = 0
    for key in ar:
        if key in sameColor:
            sameColor[key] += 1
        else:
            sameColor[key] = 1
    for key in sameColor:
        count += sameColor[key]//2
    return count

n = int(input().strip())
ar = list(map(int, input().strip().split(' ')))
result = sockMerchant(n, ar)
print(result)
{% endhighlight %}    