---
layout: post
title: Day 8 - Dictionaries and Maps
date: 2017-11-08 00:00:00 +900
subject: 30days-python
description:
  HackerRank 30 days of code challenge.
---

-------
__Task__

Given  names and phone numbers, assemble a phone book that maps friends' names to their respective phone numbers. You will then be given an unknown number of names to query your phone book for. For each queried, print the associated entry from your phone book on a new line in the form name=phoneNumber; if an entry for  is not found, print Not found instead.

Note: Your phone book should be a Dictionary/Map/HashMap data structure.

__Input Format__

The first line contains an integer, , denoting the number of entries in the phone book. 
Each of the  subsequent lines describes an entry in the form of  space-separated values on a single line. The first value is a friend's name, and the second value is an -digit phone number.

After the  lines of phone book entries, there are an unknown number of lines of queries. Each line (query) contains a  to look up, and you must continue reading lines until there is no more input.

Note: Names consist of lowercase English alphabetic letters and are first names only.

Constraints

__Output Format__

On a new line for each query, print Not found if the name has no corresponding entry in the phone book; otherwise, print the full  and  in the format name=phoneNumber.

__Sample Input__

3
sam 99912222
tom 11122222
harry 12299933
sam
edward
harry

__Sample Output__

sam=99912222
Not found
harry=12299933

__Explanation__

We add the following  (Key,Value) pairs to our map so it looks like this:


We then process each query and print key=value if the queried  is found in the map; otherwise, we print Not found.

Query 0: sam 
Sam is one of the keys in our dictionary, so we print sam=99912222.

Query 1: edward 
Edward is not one of the keys in our dictionary, so we print Not found.

Query 2: harry 
Harry is one of the keys in our dictionary, so we print harry=12299933.

{% highlight python linenos %}
import sys
n = int(input().strip())
book = {}
for i in range(n):
    item = input().strip().split(" ")
    book[item[0]]=item[1]

qry = input().strip()
while qry != "":
    
    if qry in book:
        num = book[qry]
        print(qry,end="=")
        print(num)
    else:
        print("Not found ")
    qry = input().strip()
{% endhighlight %}    