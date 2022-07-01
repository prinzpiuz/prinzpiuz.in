---
title: "My Blog Set up"
date: 2020-05-26T15:29:46+05:30
draft: false
categories: ["set-up"]
---

I was planning to set up a blog from my college days onwards. it's been 5 years since I'm out of college. since I'm a [miser](https://olam.in/Dictionary/en_ml/miser) person, I was always looking for the cheapest hosting service :sunglasses: also, I don't want the headaches of hosting like

- server management
- database management
- backups
- hosting/bandwidth/scalability/users

And I have found a solution for all this, for server management, we can choose some hosting services like GitHub/Gitlab pages or Netfly..etc.
and for database management, for a simple blog or personal website like mine, there is no need for a database at all. we can use static site generators for it. I have used [Hugo](https://gohugo.io/), which is the fastest framework for building static sites, which is built on top of fastest [Go](https://golang.org/). for backups of static sites, their repo itself acts as a backup and provides easy portability in the future. then comes the hosting/scalability/users part which is somewhere we need to spend money. but thanks to GitHub pages they provide free hosting for public repos and hence it will automatically manage the rest of things. and also they support custom domains
so the only money I had to spend for my website, is the money for the domain "prinzpiuz.in"  
The theme used for this site is called [devise](https://themes.gohugo.io/devise/) developed by [Austin Gebauer](https://twitter.com/austingebauer)

see also [How I Automatically Deploying This Blog?](/post/how-i-automatically-deploying-this-blog/)
