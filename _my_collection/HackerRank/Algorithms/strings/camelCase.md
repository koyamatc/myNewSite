---
layout: post
title: CamelCase
date: 2017-11-09 03:00:00 +900
subject: algorithms-strings
description:
  HackerRank Algorithms strings.
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
Alice wrote a sequence of words in CamelCase as a string of letters, s, having the following properties:

$$\cdot$$ It is a concatenation of one or more words consisting of English letters.

$$\cdot$$ All letters in the first word are lowercase.

$$\cdot$$ For each of the subsequent words, the first letter is uppercase and rest of the letters are lowercase.

Given s, print the number of words in s on a new line.

__Input Format__

A single line containing string s.

__Constraints__

$$\cdot \ 1 \le |s| \le 10^5$$

__Output Format__

Print the number of words in string s.

__Sample Input__

saveChangesInTheEditor

__Sample Output__

5

__Explanation__

String s contains five words:

save

Changes

In

The

Editor

Thus, we print 5 on a new line.

{% highlight python linenos %}
import sys

s = input().strip()

count = 1

for ch in s:
    if not ch.islower():
        count += 1
        
print(count)
{% endhighlight %}    