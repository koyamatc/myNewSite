---
layout: post
title: Day 9 - Recursion
date: 2017-11-08 12:00:00 +900
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

Today, we're learning and practicing an algorithmic concept called Recursion. Check out the Tutorial tab for learning materials and an instructional video!

__Recursive Method for Calculating Factorial__

$$
\begin{eqnarray}
  factorial(N) =  
    \begin{cases}    
      1 & N \le 1 \\    
      N \times factorial(N - 1) & otherwise  
    \end{cases}
\end{eqnarray}
$$

__Task__

Write a factorial function that takes a positive integer,  as a parameter and prints the result of  ( factorial).

Note: If you fail to use recursion or fail to name your recursive function factorial or Factorial, you will get a score of 0.

__Input Format__

A single integer,  $$N$$ (the argument to pass to factorial).

__Constraints__

$$
  \cdot \ 2 \le N \le 12
$$

$$\cdot$$ Your submission must contain a recursive function named factorial.

__Output Format__

Print a single integer denoting .

__Sample Input__

3

__Sample Output__

6

__Explanation__

Consider the following steps:

$$
  \begin{eqnarray}
  1. factorial(3) &=& 3 \times factorial(2) \\
  2. factorial(2) &=& 2 \times factorial(1) \\
  3. factorial(1) &=& 1 
  \end{eqnarray}
$$

From steps 2 and 3, we can say $$factorial(2)=2 \times 1 = 2$$; then when we apply the value from  $$factorial(2)$$ to step 1, we get $$factorial(3)=3 \times 2 \times 1 = 6$$. Thus, we print 6 as our answer.

{% highlight python linenos %}
import sys

def factorial(n):
    # Complete this function
    if n > 1:
        return n * factorial(n - 1)
    else:
        return 1

if __name__ == "__main__":
    n = int(input().strip())
    result = factorial(n)
    print(str(result))

{% endhighlight %}    