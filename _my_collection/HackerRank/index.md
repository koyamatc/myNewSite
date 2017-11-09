---
layout: collections
title: Index of HackerRank 
date: 2017-11-08 00:00:00 +900
subject: 
description:
  HackerRank's Challenges.
---
<div class="row">
    <div class="col s12 m6">
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header"><i class="material-icons">subject</i>30 Days of Code</div>
                <div class="collapsible-body">
                    <ul>
                    {% for lesson in site.my_collection %}
                        {% if lesson.subject == '30days-python' %}
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
                <div class="collapsible-header"><i class="material-icons">subject</i>Algorithms implementation</div>
                <div class="collapsible-body">
                    <ul>
                    {% for lesson in site.my_collection %}
                        {% if lesson.subject == 'algorithms-implementation' %}
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

<div class="row">
    <div class="col s12 m6">
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header"><i class="material-icons">subject</i></div>
                <div class="collapsible-body">
                    <ul>
                    {% for lesson in site.my_collection %}
                        {% if lesson.subject == 'xxxxxxx' %}
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
                <div class="collapsible-header"><i class="material-icons">subject</i>Algorithms Strings</div>
                <div class="collapsible-body">
                    <ul>
                    {% for lesson in site.my_collection %}
                        {% if lesson.subject == 'algorithms-strings' %}
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
