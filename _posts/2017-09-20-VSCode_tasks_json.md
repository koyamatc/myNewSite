---
layout: post
title:  Visual Studio Code Tasks.json
categories: post vscode
description:
  Visual Studio Code の tasks.jsonの設定です。
  node-sass コンパイルの定義
---

----
<pre>
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "taskName": "Sass Compile",
      "type": "shell",
      "command": "node-sass Mod3Lab/scss/styles.scss Mod3Lab/css/styles.css",
      "group": "build",
      "problemMatcher": [
        "$go"
      ]
    }
  ]
}
</pre>