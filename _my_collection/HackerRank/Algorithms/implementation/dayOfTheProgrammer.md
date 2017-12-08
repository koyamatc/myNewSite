---
layout: post
title: Day of the Programmer 
date: 2017-12-07 03:00:00 +900
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

Marie invented a Time Machine and wants to test it by time-traveling to visit Russia on the Day of the Programmer (the $$256^{th}$$ day of the year) during a year in the inclusive range from $$1700$$ to $$2700$$.

From $$1700$$ to $$1917$$, Russia's official calendar was the Julian calendar; since $$1919$$ they used the Gregorian calendar system. The transition from the Julian to Gregorian calendar system occurred in $$1918$$, when the next day after January $$31^{st}$$ was February $$14^{th}$$. This means that in $$1918$$, February $$14^{th}$$ was the $$32^{nd}$$ day of the year in Russia.

In both calendar systems, February is the only month with a variable amount of days; it has $$29$$ days during a leap year, and $$28$$ days during all other years. In the Julian calendar, leap years are divisible by 4; in the Gregorian calendar, leap years are either of the following:

$$\cdot \$$Divisible by 400.

$$\cdot \$$Divisible by 4 and not divisible by 100.

Given a year, $$y$$, find the date of the $$256^{th}$$ day of that year according to the official Russian calendar during that year. Then print it in the format dd.mm.yyyy, where dd is the two-digit day, mm is the two-digit month, and yyyy is $$y$$.

__Input Format__

A single integer denoting year $$y$$.

__Constraints__

$$\cdot \ 1700 \le n \le 2700$$

__Output Format__

Print the full date of Day of the Programmer during year  in the format dd.mm.yyyy, where dd is the two-digit day, mm is the two-digit month, and yyyy is $$y$$.

__Sample Input 0__

2017

__Sample Output 0__

13.09.2017

__Explanation 0__

In the year $$2017$$, January has $$31$$ days, February has $$28$$ days, March has $$31$$ days, April has $$30$$ days, May has $$31$$ days, June has $$30$$ days, July has $$31$$ days, and August has $$31$$ days. When we sum the total number of days in the first eight months, we get $$31+28+31+30+31+30+31+31=243$$. Day of the Programmer is the $$256^{th}$$ day, so then calculate $$256 - 243=13$$ to determine that it falls on day $$13$$ of the $$9^{th}$$ month (September). We then print the full date in the specified format, which is 13.09.2017.

__Sample Input 1__

2016

__Sample Output 1__

12.09.2016

__Explanation 1__

Year $$y=2016$$ is a leap year, so February has $$29$$ days but all the other months have the same number of days as in $$2017$$. When we sum the total number of days in the first eight months, we get $$31+29+31+30+31+30+31+31=244$$. Day of the Programmer is the $$256^{th}$$ day, so then calculate $$256-244=12$$ to determine that it falls on day 12 of the $$9^{th}$$ month (September). We then print the full date in the specified format, which is 12.09.2016.

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