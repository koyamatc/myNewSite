---
layout: post
title: Bon Appétit
date: 2017-11-09 09:00:00 +900
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

Anna and Brian order $$n$$ items at a restaurant, but Anna declines to eat any of the $$k^{th}$$ item (where $$0 \le k \lt n$$) due to an allergy. When the check comes, they decide to split the cost of all the items they shared; however, Brian may have forgotten that they didn't split the $$k^{th}$$ item and accidentally charged Anna for it.

You are given $$n$$, $$k$$, the cost of each of the $$n$$ items, and the total amount of money that Brian charged Anna for her portion of the bill. If the bill is fairly split, print Bon Appetit; otherwise, print the amount of money that Brian must refund to Anna.

__Input Format__

The first line contains two space-separated integers denoting the respective values of $$n$$ (the number of items ordered) and $$k$$ (the 0-based index of the item that Anna did not eat). 

The second line contains $$n$$ space-separated integers where each integer $$i$$ denotes the cost, $$c[i]$$, of item $$i$$ (where $$0 \le i \lt n$$). 

The third line contains an integer, $$b_{charged}$$, denoting the amount of money that Brian charged Anna for her share of the bill.

__Constraints__

$$ \cdot \ 2 \le n \le 10^5$$

$$ \cdot \ 0 \le k \lt n$$

$$ \cdot \ 0 \le c[i] \le 10^4$$

$$ \cdot \ 0 \le b \le \sum{c[i]}$$

__Output Format__

If Brian did not overcharge Anna, print Bon Appetit on a new line; otherwise, print the difference (i.e., $$b_{charged} - b_{actual}$$) that Brian must refund to Anna (it is guaranteed that this will always be an integer).

__Sample Input 0__

4 1

3 10 2 9

12

__Sample Output 0__

5

__Explanation 0 __

Anna didn't eat item $$c[i]=10$$, but she shared the rest of the items with Brian. The total cost of the shared items is $$3 + 2 + 9 = 14$$ and, split in half, the cost per person is $$b_{actual}=7$$. Brian charged her $$b_{charged}=12$$ for her portion of the bill, which is more than the $$7$$ dollars worth of food that she actually shared with him. Thus, we print the amount Anna was overcharged, $$b_{charged} - b_{actual} = 12 - 7 = 5$$, on a new line.

__Sample Input 1__

4 1

3 10 2 9

7

__Sample Output 1__

Bon Appetit

__Explanation 1 __

Anna didn't eat item $$c[i]=10$$, but she shared the rest of the items with Brian. The total cost of the shared items is $$3+2+9=14$$ and, split in half, the cost per person is $$b_{actual}=7$$. Because this matches the amount, $$b_{charged}$$, that Brian charged Anna for her portion of the bill, we print Bon Appetit on a new line.

{% highlight python linenos %}
import sys

def bonAppetit(n, k, b, ar):
    # Complete this function
    total = 0
    for i in range(n):
        if i != k:
            total += ar[i]
    if total/2 < b:
        return int(b - total/2)
    else:
        return "Bon Appetit"

n, k = input().strip().split(' ')
n, k = [int(n), int(k)]
ar = list(map(int, input().strip().split(' ')))
b = int(input().strip())
result = bonAppetit(n, k, b, ar)
print(result)
{% endhighlight %}