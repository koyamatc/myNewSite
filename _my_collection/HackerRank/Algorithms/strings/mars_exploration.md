---
layout: post
title: Mars Exploration
date: 2017-11-09 00:00:00 +900
subject: algorithms-strings
description:
  HackerRank Algorithms strings.
---

-------
<style>
.MathJax {
  text-align: left;
  color: #000;
}

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

Sami's spaceship crashed on Mars! She sends  sequential SOS messages to Earth for help.

![NASA_Mars_Rover.jpg](img/1453204202-9e3fd295bb-NASA_Mars_Rover.jpg)

Letters in some of the SOS messages are altered by cosmic radiation during transmission. Given the signal received by Earth as a string, S, determine how many letters of Sami's SOS have been changed by radiation.

__Input Format__

There is one line of input: a single string, S.

Note: As the original message is just SOS repeated n times, SOS's length will be a multiple of 3.

__Constraints__

$$
  \cdot \ 1 \le |S| \le 99
$$

$$
  \cdot \ |S| \% 3 = 0 
$$

$$\cdot \ S$$ will contain only uppercase English letters.

_Output Format__

Print the number of letters in Sami's message that were altered by cosmic radiation.

__Sample Input 0__

SOSSPSSQSSOR

__Sample Output 0__

3

__Sample Input 1__

SOSSOT

__Sample Output 1__

1

__Explanation__

__Sample 0__

 S= SOSSPSSQSSOR, and signal length 12. Sami sent  SOS messages (i.e.:$$12/3=4$$ ).

Expected signal: SOSSOSSOSSOS

Recieved signal: SOSSPSSQSSOR

We print the number of changed letters, which is 3.

__Sample 1__

S = SOSSOT, and signal length 6. Sami sent  SOS messages (i.e.: $$6/3=2$$).

Expected Signal: SOSSOS 

Received Signal: SOSSOT

We print the number of changed letters, which is 1.

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