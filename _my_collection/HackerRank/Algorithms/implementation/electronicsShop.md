---
layout: post
title: Electronics Shop
date: 2017-11-09 06:00:00 +900
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

Monica wants to buy exactly one keyboard and one USB drive from her favorite electronics store. The store sells n different brands of keyboards and m different brands of USB drives. Monica has exactly  dollars to spend, and she wants to spend as much of it as possible (i.e., the total cost of her purchase must be maximal).

Given the price lists for the store's keyboards and USB drives, find and print the amount money Monica will spend. If she doesn't have enough money to buy one keyboard and one USB drive, print -1 instead.

Note: She will never buy more than one keyboard and one USB drive even if she has the leftover money to do so.

__Input Format__

The first line contains three space-separated integers describing the respective values of  (the amount of money Monica has),  (the number of keyboard brands) and  (the number of USB drive brands). 

The second line contains  space-separated integers denoting the prices of each keyboard brand. 

The third line contains  space-separated integers denoting the prices of each USB drive brand.

__Constraints__

$$\cdot \ 1 \le n,m \le 1000$$

$$\cdot \ 1 \le s \le 10^6$$

$$\cdot$$ The price of each item is in the inclusive range$$[1,10^6]$$ .

__Output Format__

Print a single integer denoting the amount of money Monica will spend. If she doesn't have enough money to buy one keyboard and one USB drive, print -1 instead.

__Sample Input 0__

10 2 3

3 1

5 2 8

__Sample Output 0__

9

__Explanation 0__

She can buy the  keyboard and the  USB drive for a total cost of .

__Sample Input 1__

5 1 1

4

5

__Sample Output 1__

-1

__Explanation 1__

There is no way to buy one keyboard and one USB drive because $$4 + 5$$, so we print $$9$$.

{% highlight python linenos %}
import sys

def getMoneySpent(keyboards, drives, s):
    # Complete this function
    amounts = []
    for k in keyboards:
        for d in drives:
            if (k + d) <= s:  
                amounts.append(k+d)
    if len(amounts) == 0:
        return -1
    else:
        return max(amounts)
    
    
s,n,m = input().strip().split(' ')
s,n,m = [int(s),int(n),int(m)]
keyboards = list(map(int, input().strip().split(' ')))
drives = list(map(int, input().strip().split(' ')))
#  The maximum amount of money she can spend on a keyboard and USB drive, or -1 if she can't purchase both items
moneySpent = getMoneySpent(keyboards, drives, s)
print(moneySpent)
{% endhighlight %}