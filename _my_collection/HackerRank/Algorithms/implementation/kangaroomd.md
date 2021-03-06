---
layout: post
title: Kangaroo
date: 2017-12-06 12:00:00 +900
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

There are two kangaroos on a number line ready to jump in the positive direction (i.e, toward positive infinity). The first kangaroo starts at location $$x_{1}$$ and moves at a rate of $$v_{1}$$ meters per jump. The second kangaroo starts at location $$x_{2}$$ and moves at a rate of $$v_{2}$$ meters per jump. Given the starting locations and movement rates for each kangaroo, can you determine if they'll ever land at the same location at the same time?

__Input Format__

A single line of four space-separated integers denoting the respective values of $$x_{1}$$, $$v_{1}$$, $$x_{2}$$, and $$v_{2}$$.

__Constraints__

$$\cdot \ 0 \le x_{1} \lt x_{2} \le 10000$$

$$\cdot \ 1 \le v_{1} \le 10000$$

$$\cdot \ 1 \le v_{2} \le 10000$$

__Output Format__

Print YES if they can land on the same location at the same time; otherwise, print NO.

Note: The two kangaroos must land at the same location after making the same number of jumps.

__Sample Input 0__

0 3 4 2

__Sample Output 0__

YES

__Explanation 0__

The two kangaroos jump through the following sequence of locations:

1. $$0 \rightarrow 3 \rightarrow 6 \rightarrow 9 \rightarrow 12$$

2. $$4 \rightarrow 6 \rightarrow 8 \rightarrow 10 \rightarrow 12$$

Thus, the kangaroos meet after $$4$$ jumps and we print YES.

__Sample Input 1__

0 2 5 3

__Sample Output 1__

NO

__Explanation 1__

The second kangaroo has a starting location that is ahead (further to the right) of the first kangaroo's starting location (i.e., $$x_{2} \gt x_{2}$$). Because the second kangaroo moves at a faster rate (meaning $$v_{2} \gt v_{1}$$) and is already ahead of the first kangaroo, the first kangaroo will never be able to catch up. Thus, we print NO.

{% highlight python linenos %}
#!/bin/python3

import sys

def kangaroo(x1, v1, x2, v2):
    # Complete this function
    if (x2 > x1 and v2 >= v1) or (x1 > x2 and v1 >= v2):
        return "NO"
    else:
        i = 0
        while True:
            i +=1
            p1 = x1 + v1 * i
            p2 = x2 + v2 * i
            if p1 == p2:
                return "YES"
            elif (p1 > p2 and v1 >= v2) or (p2 > p1 and v2 >= v1):
                return "NO"
        

x1, v1, x2, v2 = input().strip().split(' ')
x1, v1, x2, v2 = [int(x1), int(v1), int(x2), int(v2)]
result = kangaroo(x1, v1, x2, v2)
print(result)
{% endhighlight %}    