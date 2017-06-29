---
layout: post
title: Index of edX 
date: 2017-06-29 00:00:00 +900
subject: 
description:
  edx's course by W3C.
  Introductory course designed to understand 
  the basic concepts of JavaScript.  
---
<div class="row">
    <div class="col s12 m4">
        <ul class="collection">
            <li class="collection-header"><h5>JavaScript</h5></li>
            {% for lesson in site.edX %}
                {% if lesson.subject == 'javascript' %}
                    <li class="collection-item">
                        <a href="{{ lesson.url }}"><b>{{ lesson.title }}</b></a>
                    </li>
                {% endif %}
            {% endfor %}
        </ul>
    </div>
    <div class="col s12 m4"></div>
    <div class="col s12 m4"></div>
</div>