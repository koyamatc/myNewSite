---
layout: post
title: Migratory Birds
date: 2017-11-09 03:00:00 +900
subject: algorithms-implementation
description:
  HackerRank algorithm Implementation challenge.
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

A flock of  birds is flying across the continent. Each bird has a type, and the different types are designated by the ID numbers 1, 2, 3, 4, and 5.

Given an array of  integers where each integer describes the type of a bird in the flock, find and print the type number of the most common bird. If two or more types of birds are equally common, choose the type with the smallest ID number.

__Input Format__

The first line contains an integer denoting  (the number of birds). 
The second line contains  space-separated integers describing the respective type numbers of each bird in the flock.

__Constraints__

$$\cdot \ 5 \le n \le 2 \times 10^5$$

$$\cdot \$$It is guaranteed that each type is 1, 2, 3, 4, or 5.

__Output Format__

Print the type number of the most common bird; if two or more types of birds are equally common, choose the type with the smallest ID number.

__Sample Input 0__

6

1 4 4 4 5 3

__Sample Output 0__

4

__Explanation 0__

The different types of birds occur in the following frequencies:

Type 1: 1 bird

Type 2: 0 birds

Type 3: 1 bird

Type 4: 3 birds

Type 5: 1 bird

The type number that occurs at the highest frequency is type 4, so we print 4 as our answer.

{% highlight python linenos %}
import sys

def migratoryBirds(n, ar):
    # Complete this function
    most = 0
    mostID = 0
    
    IDs = [0,0,0,0,0]
    for i in range(n):
        IDs[ar[i]-1] += 1
    
    for i in range(5):
        if most < IDs[i]: 
            most = IDs[i]
            mostID = i + 1
      
    return mostID

n = int(input().strip())
ar = list(map(int, input().strip().split(' ')))
result = migratoryBirds(n, ar)
print(result)
{% endhighlight %}