---
layout: post
title: Between Two Sets
date: 2017-12-06 15:00:00 +900
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

Consider two sets of positive integers, $$A= \lbrace a_{0},a_{1},\ldots a_{n-1}\rbrace$$ and $$B=\lbrace b_{0},b_{1},\ldots b_{m-1} \rbrace$$. We say that a positive integer, $$x$$, is between sets $$A$$ and $$B$$ if the following conditions are satisfied:

1. All elements in $$A$$ are factors of $$x$$.

2. $$x$$ is a factor of all elements in $$B$$.

In other words, some $$x$$ is between $$A$$ and $$B$$ if that value of $$x$$ satisfies $$x mod a_{i}=0$$ for every $$a_{i}$$ in $$A$$ and also satisfies $$b_{i} mod x = 0$$ for every $$b_{i}$$ in $$B$$. For example, if $$A=\lbrace 2,6\rbrace$$ and $$B=\lbrace 12 \rbrace$$, then our possible $$x$$ values are $$6$$ and $$12$$.

Given $$A$$ and $$B$$, find and print the number of integers (i.e., possible $$x$$'s) that are between the two sets.

__Input Format__

The first line contains two space-separated integers describing the respective values of $$n$$ (the number of elements in set $$A$$) and $$m$$ (the number of elements in set $$B$$). 

The second line contains $$n$$ distinct space-separated integers describing $$a_{0},a_{1},\ldpts,a_{n-1}$$.

The third line contains $$m$$ distinct space-separated integers describing $$b_{0},b_{1},\ldots,b_{m-1}$$.

__Constraints__

$$\cdot \ 1 \le n,m \le 10$$

$$\cdot \ 1 \le a_{i} \le 100$$

$$\cdot \ 1 \le b_{i} \le 100$$

__Output Format__

Print the number of integers that are considered to be between $$A$$ and $$B$$.

__Sample Input__

2 3

2 4

16 32 96

__Sample Output__

3

__Explanation 0__

There are three $$x$$ values between $$A=\lbrace 2,4 \rbrace$$ and $$B=\lbrace 16,32,96 \rbrace$$:

$$\cdot \ x=4$$:

$$\quad \cdot \$$ All the elements in $$A$$ evenly divide $$x=4$$.

$$\quad \cdot \ x=4$$ evenly divides all the elements in $$B$$.

$$\cdot \ x=8$$::

$$\quad \cdot \$$ All the elements in $$A$$ evenly divide $$x=8$$.

$$\quad \cdot \ x=8$$  evenly divides all the elements in $$B$$.

$$\cdot \ x=16$$::

$$\quad \cdot \$$ All the elements in $$A$$ evenly divide $$x=16$$.

$$\quad \cdot \ x=16$$ evenly divides all the elements in $$B$$.

Thus, we print $$3$$ as our answer.

{% highlight python linenos %}
#!/bin/python3

import sys

def getTotalX(a, b):
    # Complete this function
    maxA = max(a)
    maxB = max(b)
    count = 0
    for n in range(maxA,maxB+1):
        check = True
        for num_a in a:
            if n % num_a == 0:
                for num_b in b:
                    if num_b % n != 0:
                        check = False
                        break
            else:
                check = False
                break
        if check:
            count += 1

    return count

if __name__ == "__main__":
    n, m = input().strip().split(' ')
    n, m = [int(n), int(m)]
    a = list(map(int, input().strip().split(' ')))
    b = list(map(int, input().strip().split(' ')))
    total = getTotalX(a, b)
    print(total)
{% endhighlight %}    