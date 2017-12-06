---
layout: post
title: Grading Students
date: 2017-12-06 00:00:00 +900
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

HackerLand University has the following grading policy:

$$\cdot$$ Every student receives a $grade$ in the inclusive range from $$0$$ to $$100$$.

$$\cdot$$ Any $$grade$$ less than $$40$$ is a failing grade.

Sam is a professor at the university and likes to round each student's $$grade$$ according to these rules:

$$\cdot$$ If the difference between the $$grade$$ and the next multiple of $$5$$(５の倍数) is less than $$3$$, round  up to the next multiple of $$5$$.

$$\cdot$$ If the value of $$grade$$ is less than $$38$$, no rounding occurs as the result will still be a failing grade.

For example, $$grade=84$$ will be rounded to $$85$$ but $$grade=29$$ will not be rounded because the rounding would result in a number that is less than $$40$$.

Given the initial value of $$grade$$ for each of Sam's $$n$$ students, write code to automate the rounding process. For each $$grade$$, round it according to the rules above and print the result on a new line.

__Input Format__

The first line contains a single integer denoting $$n$$ (the number of students). 

Each line $$i$$ of the $$n$$ subsequent lines contains a single integer, $$grade$$, denoting student $$i$$'s grade.

__Constraints__

$$\cdot \ 1 \le n \le 60$$

$$\cdot \ 0 \le grade \le 100$$

__Output Format__

For each $$grade$$ of the $$n$$ grades, print the rounded grade on a new line.

__Sample Input 0__

4

73

67

38

33

__Sample Output 0__

75

67

40

33

__Explanation 0__

![curving2.png](img/1484768684-54439977a1-curving2.png)

1. Student $$1$$ received a $$73$$, and the next multiple of $$5$$ from $$73$$ is $$75$$. Since $$75 - 73 \lt 3$$, the student's grade is rounded to $$75$$.

2. Student $$2$$ received a $$67$$, and the next multiple of $$5$$ from $$67$$ is $$70$$. Since $$70-67=3$$, the grade will not be modified and the student's final grade is $$67$$.

3. Student $$3$$ received a $$38$$, and the next multiple of $$5$$ from $$38$$ is $$40$$. Since $$40-38 \lt 3$$, the student's grade will be rounded to $$40$$.

4. Student $$4$$ received a grade below $$38$$, so the grade will not be modified and the student's final grade is $$33$$.


{% highlight python linenos %}
#!/bin/python3

import sys

def solve(grades):
    # Complete this function
    res = []
    for g in grades:
        if g < 38:
            res.append(g)
        else:
            next = ( g // 5 + 1 ) * 5
            if ( next - g ) < 3:
                res.append(next)
            else:
                res.append(g)
    return res    
        
n = int(input().strip())
grades = []
grades_i = 0
for grades_i in range(n):
   grades_t = int(input().strip())
   grades.append(grades_t)
result = solve(grades)
print ("\n".join(map(str, result)))
{% endhighlight %}    