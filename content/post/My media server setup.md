---
title: "My Media Server Set-up"
date: 2020-06-13T14:58:35+05:30
draft: true
categories: ["server", "linux", "flutter"]
---

{{< figure src="/images/media_server.jpg" height=300 width=300 class="figure_center" >}}

> _The reason I'm writing this blog is because I learned lot of things while setting up my media server to current configuration, so this is kinda experience sharing._

##### Little History :clock130:

From my teenage itself I am a binge movie watcher, at that time I saves money and buy DVDs of movies I like and I had a small collection of DVDs then, then we brought a desktop PC, and it was time of USB sticks and it became little more easy and cheap to collect movies, still somebody need to download movies from torrent (thanks [The Pirate Bay](https://en.wikipedia.org/wiki/The_Pirate_Bay)) or [rip](https://en.wikipedia.org/wiki/Ripping) from DVDs,but still network speed was very low then(i had a BSNL bradband connection which had only 512kbps),
Then comes the Reliance JIO. which was a game changer like, everybody have lot of data and every body was downloading lot of movies, TV series, Documentaries..etc. and I set-up a [Kodi](https://kodi.tv/) server in pc and kodi client in mobile and streaming movies from pc to mobile through LAN which changed a lot of things in movie watching experience. like now I can watch movies from where ever I want, also I can watch in what ever style I want. Then i got Job at Tridz and location was at Banglore. And it changed lot of things like it was an end to first era of my pc, after i went to Banglore nobody used my PC and it was turning to a E-waste, and i am forced to watch movies in my laptop (I always hated saving media files in work machine). But I had to, But within year due to some personal issues I had to relocate to my home town. Also we had a new smart TV in home. Also a Fiber optic internet connection @ 50MbPS and I have got a plan for my old PC, **Turning it to media server**.
so the set-up is like old pc as [emby](https://emby.media/) server streaming contents to my TV through my Home LAN.and for performance i changed it to a [debian](https://www.debian.org/) server and all access to it is through is [ssh](https://en.wikipedia.org/wiki/Secure_Shell) from lap or phone through[termux](https://termux.com/) since there is no gui i can save lot of ram. and everything working fine.

##### That's not the end. :exclamation:

we need to put movies to server, TV shows and movies to their respective folders.  
The set-ups i tried are

- [scp](https://en.wikipedia.org/wiki/Secure_copy)  
   its a secure file copying protocol for transferring file between two machines

  ```shell
  scp -r user@host:directory/SourceFolder TargetFolder
  ```

- [sshfs](https://en.wikipedia.org/wiki/SSHFS)  
   Basically it helps to mount file system from server in to our local machine, which gives us a gui based interaction to server, so that we can edit files and move them in server like normal gui thing
