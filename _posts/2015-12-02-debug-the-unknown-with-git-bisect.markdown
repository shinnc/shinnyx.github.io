---
layout: post
title:  "Debug the unknown with git bisect"
slug:   "debug-the-unknown-with-git-bisect"
date:   2015-12-02 13:55:06
comments: true
categories: Git Coding Debugging
---

Many of you might have been facing the problem where the few latest commits break your existing features (Y NO TESTING?).

There's a handful feature in git, [`git-bisect`](https://git-scm.com/docs/git-bisect) which could help you to quickly debug what went wrong within the good (working) and bad (broken) commits.
