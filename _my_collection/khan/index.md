---
layout: collections
title: Index of Khan Academy 
date: 2017-06-29 00:00:00 +900
subject: 
description:
  Khan Academy's courses.
---
<div class="row">
    <div class="col s12 m6">
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header"><i class="material-icons">subject</i>Pixar In A Box</div>
                <div class="collapsible-body">
                    <ul>
                    {% for lesson in site.my_collection %}
                        {% if lesson.subject == 'pixar' %}
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
                <div class="collapsible-header"><i class="material-icons">subject</i>XXXXXXXX</div>
                <div class="collapsible-body">
                    <ul>
                    {% for lesson in site.my_collection %}
                        {% if lesson.subject == 'xxxxx' %}
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
                <div class="collapsible-header"><i class="material-icons">subject</i>------</div>
                <div class="collapsible-body">
                    <ul>
                    {% for lesson in site.my_collection %}
                        {% if lesson.subject == '------' %}
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
