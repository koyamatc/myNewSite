---
layout: collections
title: Index of edX 
date: 2017-06-29 00:00:00 +900
subject: 
description:
  edx's course by W3C.
  Introductory course designed to understand 
  the basic concepts of JavaScript.  
---
<div class="row">
    <div class="col s12 m6">
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header"><i class="material-icons">subject</i>Javascript</div>
                <div class="collapsible-body">
                    <ul>
                    {% for lesson in site.edX %}
                        {% if lesson.subject == 'javascript' %}
                            <li class="collection-item">
                                <i class="material-icons">label_outline</i>
                                <a href="{{ lesson.url }}"><b>{{ lesson.title }}</b></a>
                            </li>
                        {% endif %}
                    {% endfor %}
                    </ul>
                </div>    
            </li>
        </ul>
    </div>
    <div class="col s12 m6">
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header"><i class="material-icons">subject</i>ReactJS</div>
                <div class="collapsible-body">
                    <ul>
                    {% for lesson in site.edX %}
                        {% if lesson.subject == 'reactjs' %}
                            <li>
                                <i class="material-icons">label_outline</i>
                                <a href="{{ lesson.url }}"><b>{{ lesson.title }}</b></a>
                            </li>
                        {% endif %}
                    {% endfor %}
                    </ul>
                </div>    
            </li>
        </ul>
    </div>
</div>
