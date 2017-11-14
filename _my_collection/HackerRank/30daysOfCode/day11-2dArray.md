---
layout: post
title: Day 11 - 2D Array
date: 2017-11-14 00:00:00 +900
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

__Context__

Given a  2D Array, $$A$$:

$$
\begin{array}{cccccc}
1 & 1 & 1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 & 0 & 0 \\
1 & 1 & 1 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 0
\end{array}
$$

We define an hourglass in  to be a subset of values with indices falling in this pattern in 's graphical representation:

$$
\begin{array}{ccc}
a & b & c \\
  & d & \\
e & f & g 
\end{array}
$$

There are  hourglasses in , and an hourglass sum is the sum of an hourglass' values.

__Task__

Calculate the hourglass sum for every hourglass in , then print the maximum hourglass sum.

__Input Format__

There are  lines of input, where each line contains  space-separated integers describing 2D Array ; every value in  will be in the inclusive range of  to .

__Constraints__

$$\cdot \ -9 \le A[i][j] \le 9$$

$$\cdot \ 0 \le i,j \le 5$$ 

__Output Format__

Print the largest (maximum) hourglass sum found in .

__Sample Input__

$$ \begin{array}{cccccc}
1 & 1 & 1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 & 0 & 0 \\
1 & 1 & 1 & 0 & 0 & 0 \\
0 & 0 & 2 & 4 & 4 & 0 \\
0 & 0 & 0 & 2 & 0 & 0 \\
0 & 0 & 1 & 2 & 4 & 0 
\end{array}
$$

__Sample Output__

19

__Explanation__

 contains the following hourglasses:

$$
\begin{array}{ccccccccccccccc}
1 & 1 & 1 & & 1 & 1 & 0 & & 1 & 0 & 0 & & 0 & 0 & 0 \\
  & 1 &   & &   & 0 &   & &   & 0 &   & &   & 0 &   \\
1 & 1 & 1 & & 1 & 1 & 0 & & 1 & 0 & 0 & & 0 & 0 & 0 \\
\\
0 & 1 & 0 & & 1 & 0 & 0 & & 0 & 0 & 0 & & 0 &60 & 0 \\
  & 1 &   & &   & 1 &   & &   & 0 &   & &   & 0 &   \\
0 & 0 & 2 & & 0 & 2 & 4 & & 2 & 4 & 4 & & 4 & 4 & 0 \\
\\

1 & 1 & 1 & & 1 & 1 & 0 & & 1 & 0 & 0 & & 0 & 0 & 0 \\
  & 0 &   & &   & 2 &   & &   & 4 &   & &   & 4 & \\
0 & 0 & 0 & & 0 & 0 & 2 & & 0 & 2 & 0 & & 2 & 0 & 0 \\
\\
0 & 0 & 2 & & 0 & 2 & 4 & & 2 & 4 & 4 & & 4 & 4 & 0 \\
  & 0 &   & &   & 0 &   & &   & 2 &   & &   & 0 & \\
0 & 0 & 1 & & 0 & 1 & 2 & & 1 & 2 & 4 & & 2 & 4 & 0
\end{array}
$$

The hourglass with the maximum sum () is:

$$
\begin{array}{ccc}
  2 & 4 & 4 \\
  & 2 & \\
  1   & 2  & 4
\end{array}
$$

{% highlight python linenos %}
import sys

arr = []
sums = []
for arr_i in range(6):
   arr_t = [int(arr_temp) for arr_temp in input().strip().split(' ')]
   arr.append(arr_t)

for i in range(4):
    for j in range(4):
        sum = 0
        for k in range(3):
            sum += arr[i][j + k]
            sum += arr[i+2][j + k]
        sum += arr[i+1][j+1]    
        sums.append(sum)
print(max(sums))       
{% endhighlight %}    