---
layout: post
title: Module 3 Lab
date: 2017-08-03 00:00:00 +900
subject: reactjs
description:
  edx's course by Microsoft.
  Introduction to ReactJS
---

-------

##### Module 3 Lab Intructions

The assignment for this module is to build a course registration system that allows users to sign up for a course by submitting a form. All of the form submissions will be recorded into a table.

<img src="https://d37djvu3ytnwxt.cloudfront.net/assets/courseware/v1/64e85aefc7ee6d2954bcf53f122b4913/asset-v1:Microsoft+DEV281x+2T2017+type@asset+block/m3lab1.PNG" alt="">

##### Visual Elements

The user should see the following visual elements:

<ol class="collection">
    <li class="collection-item">
    An input field for the users first name
    </li>
    <li class="collection-item">
    An input field for the users last name
    </li>
    <li class="collection-item">
    An select dropdown that includes the following options: "Science Lab","Swimming","Cooking","Painting"
    </li>
    <li class="collection-item">
    A section labeled "Check all that apply" that includes 3 checkboxes
        <ul class="collection">
            <li class="collection-item">
            &bull;A checkbox labeled a) Dietary Restrictions
            </li>
            <li class="collection-item">
            &bull;A checkbox labeled b) Physical Disabilities
            </li>
            <li class="collection-item">
            &bull;A checkbox labeled c) Medical Needs
            </li>
        </ul>
    </li>
    <li class="collection-item">
    A submit button
    </li>
    <li class="collection-item">
    A table that has the following column labels: "Remove","FirstName","LastName","Activity","Restrictions"
    </li>
</ol>

##### Functional Elements

The user should be able to do the following:

<ol class="collection">
    <li class="collection-item">
    If the user clicks on the Submit button, a new row will be added to the table based on the data entered into the form. Each row should the show the submitted first name, last name, activity, and restrictions as well as a remove button.
    </li>
    <li class="collection-item">
    The restrictions section should populate based on the checkboxes that were selected. For each checkbox checked, display an "a", "b", or "c" depending on which boxes were checked. If multiple checkboxes are checked, display multiple letters.
    </li>
    <li class="collection-item">
    If the user clicks on the remove button, that particular row will be removed from the table
    </li>
    <li class="collection-item">
    The form data should reset whenever a submission is made.
    </li>
</ol>

<div id="root"></div>

<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.24.0/babel.js"></script>

<script src="module3Lab.js"></script>