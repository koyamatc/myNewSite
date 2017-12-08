---
layout: post
title: Forming a magic square
date: 2017-12-07 06:00:00 +900
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

We define a magic square to be an $$n \times n$$ matrix of distinct positive integers from $$1$$ to $$n^2$$ where the sum of any row, column, or diagonal (of length $$n$$) is always equal to the same number (i.e., the magic constant).

Consider a $$3 \times 3$$ matrix, $$s$$, of integers in the inclusive range $$[1,9]$$. We can convert any digit, $$a$$, to any other digit, $$b$$, in the range $$[1,9]$$ at cost $$|a -b|$$.

Given $$s$$, convert it into a magic square at minimal cost by changing zero or more of its digits. Then print this cost on a new line.

__Note__: The resulting magic square must contain distinct integers in the inclusive range $$[1,9]$$.

__Input Format__

There are $$3$$ lines of input. Each line describes a row of the matrix in the form of $$3$$ space-separated integers denoting the respective first, second, and third elements of that row.

__Constraints__

$$\cdot \ $$All integers in $$s$$ are in the inclusive range $$[1,9]$$.

__Output Format__

Print an integer denoting the minimum cost of turning matrix $$s$$ into a magic square.

__Sample Input 0__

4 9 2

3 5 7

8 1 5

__Sample Output 0__

1

__Explanation 0__

Matrix $$s$$ initially looks like this:

4 9 2

3 5 7

8 1 5

Observe that it's not yet magic, because not all rows, columns, and center diagonals sum to the same number.

If we change the bottom right value, $$s[2][2]$$, from $$5$$ to $$6$$ at a cost of $$|6-5|=1$$, $$s$$  becomes a magic square at the minimum possible cost. Thus, we print the cost, $$1$$, on a new line.

__Sample Input 1__

4 8 2

4 5 7

6 1 6

__Sample Output 1__

4

__Explanation 1__

Considering 0 - based indexing if we make $$s[0][1]$$->$$9$$ at a cost of:$$|9-8|=1$$, $$s[1][0]$$->$$3$$ at a cost of :$$|3-4|=1$$ and $$s[2][0]$$->$$8$$ at a cost of : $$|8-6|=2$$, then net cost will be ( $$1+1+2=4$$ ).

{% highlight python linenos %}
#!/bin/python3

import sys
import datetime

def solve(year):
    # Complete this function
    days = [31,28,31,30,31,30,31,31,30]
    if year <=1917:
        if year % 4 == 0:
            days[1] = 29
    elif year == 1918:
        days[1] = 15
    else:
        if year % 400 == 0:
            days[1] = 29
        elif year % 4 == 0 and year % 100 != 0:
            days[1]= 29

    sum = 0
    m = 0
    for i in range(10):
        sum += days[i]
        if sum > 256:
            sum -= days[i]
            m = i+1
            break

    d = 256 - sum
    dt= "{0:%d.%m.%Y}".format(datetime.date(year,m,d))
    return dt

year = int(input().strip())
result = solve(year)
print(result)
{% endhighlight %}    