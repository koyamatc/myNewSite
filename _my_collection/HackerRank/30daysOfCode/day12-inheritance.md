---
layout: post
title: Day 12 - inheritance
date: 2017-11-14 03:00:00 +900
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

__Task__ 

You are given two classes, Person and Student, where Person is the base class and Student is the derived class. Completed code for Person and a declaration for Student are provided for you in the editor. Observe that Student inherits all the properties of Person.

Complete the Student class by writing the following:

$$\cdot \$$ A Student class constructor, which has  parameters:

$$\quad$$1. A string, $$firstName$$.

$$\quad$$2. A string, $$lastName$$.

$$\quad$$3. An integer,$$id$$.

$$\quad$$4. An integer array (or vector) of test scores, .

$$\cdot \$$ A char calculate() method that calculates a Student object's average and returns the grade character representative of their calculated average:

![Grading.png]()

__Input Format__

The locked stub code in your editor calls your Student class constructor and passes it the necessary arguments. It also calls the calculate method (which takes no arguments).

You are not responsible for reading the following input from stdin: 
The first line contains $$firstName$$, $$LastName$$, and $$id$$, respectively. The second line contains the number of test scores. The third line of space-separated integers describes $$scores$$.

__Constraints__

$$1 \le |firstName|,|lastName| \le 10$$

$$|id| \equiv 7$$

$$0 \le score, average\le 100$$

__Output Format__

This is handled by the locked stub code in your editor. Your output will be correct if your Student class constructor and calculate() method are properly implemented.

__Sample Input__

Heraldo Memelli 8135627

2

100 80

__Sample Output__

 Name: Memelli, Heraldo
 
 ID: 8135627
 
 Grade: O

__Explanation__

This student had $$2$$ scores to average:$$100$$  and $$80$$. The student's average grade is $$\frac{100+80}{2}=90$$. An average grade of $$90$$ corresponds to the letter grade $$O$$, so our calculate() method should return the character'O'.

{% highlight python linenos %}
class Person:
    def __init__(self, firstName, lastName, idNumber):
    def printPerson(self):
        print("Name:", self.lastName ⁺ ",", self.firstName)
        print("ID:", idNumber)

class Student(Person):
    #   Class Constructor
    #   
    #   Parameters:
    #   firstName - A string denoting the Person's first name.
    #   lastName - A string denoting the Person's last name.
    #   id - An integer denoting the Person's ID number.
    #   scores - An array of integers denoting the Person's test scores.
    #
    def __init__(self,firstName,lastName,idNum,scores):
        self.firstName = firstName
        self.lastName = lastName
        self.idNumber = idNum
        self.scores = scores
    
    #   Function Name: calculate
    #   Return: A character denoting the grade.
    #
    def calculate(self):
        ave = sum(self.scores)/ len(scores)
        if ave >= 90 and ave <= 100:
            return 'O'
        elif ave >= 80 and ave < 90:
            return 'E'
        elif ave >= 70 and ave < 80:
            return 'A'
        elif ave >= 55 and ave < 70:
            return 'P'
        elif ave >= 40 and ave < 55:
            return 'D'
        else:
            return 'T'

line = input().split()
firstName = line[0]
lastName = line[1]
idNum = line[2]
numScores = int(input()) # not needed for Python
scores = list( map(int, input().split()) )
s = Student(firstName, lastName, idNum, scores)
s.printPerson()
print("Grade:", s.calculate())                 
{% endhighlight %}    