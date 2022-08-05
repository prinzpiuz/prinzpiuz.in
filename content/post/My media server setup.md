---
title: "My Media Server Set-up"
date: 2020-06-13T14:58:35+05:30
draft: false
categories: ["server", "linux", "flutter"]
---

{{< figure src="/images/media_server/media_server.jpg" height=300 width=300 class="figure_center" >}}

> _The reason I'm writing this blog because I learned lot of things while setting up my media server to current configuration, so this is kinda experience sharing, may be useful for those who trying one._

##### Little History :clock130:

From my teenage itself I'm a binge movie watcher, at that time I saves money and buy DVDs of movies I like and I had a small collection of DVDs, then I brought a desktop PC, and it was time of USB sticks and it became little more easy and cheap to collect movies, still somebody need to download movies from torrent (thanks [The Pirate Bay](https://en.wikipedia.org/wiki/The_Pirate_Bay)) or [rip](https://en.wikipedia.org/wiki/Ripping) from DVDs,but still network speed was very low then(I had a BSNL bradband connection which had only 512kbps),
With the arrival of 4G. everybody having lot of data and every body was downloading lot of movies, TV series, Documentaries..etc. and I set-up a [Kodi](https://kodi.tv/) server in pc and kodi client in mobile and streaming movies from pc to mobile through LAN, which changed a lot of things in my movie watching experience. like now I can watch movies from where ever I want, also I can watch in whatever style I want. Then I moved to Banglore for my intership and work. And it changed lot of things like it was an end to first era of my pc, after i went to Banglore nobody used my PC and it was turning to an E-waste, and I am forced to watch movies in my laptop (I always hated saving media files in my work machine). But I had to, But within year due to some personal issues I had to relocate to my home town. Also we had a new smart TV in home. Also a Fibre optic internet connection @ 50MbPS :satisfied: and I have got a plan for my old PC, **Turning it to media server** :cinema:.
so the set-up is like my old pc as [emby](https://emby.media/) server streaming contents to my TV through my Home LAN.and for performance i changed it to a minimal [debian](https://www.debian.org/) machine and all access through [ssh](https://en.wikipedia.org/wiki/Secure_Shell) from lap or phone through [termux](https://termux.com/) since there is no GUI I can save lot of memory.

##### That's not the end. :exclamation:

we need to put movies to server, TV shows and movies to their respective folders.
These are the set-ups i tried so far....

- **[scp](https://en.wikipedia.org/wiki/Secure_copy)**
   its a secure file copying protocol for transferring file between two machines

  ```shell
  scp -r user@host:directory/SourceFolder TargetFolder
  ```

- **[sshfs](https://en.wikipedia.org/wiki/SSHFS)**
   Basically it helps to mount file system from server in to our local machine, which gives us a GUI based interaction to server, so that we can edit files and move them to server like normal GUI thing,I created the following [alias](<https://en.wikipedia.org/wiki/Alias_(command)>) for the easy access of same

  ```shell
  alias mov="sudo sshfs user@host:directory/SourceFolder TargetFolder"
  ```

  this should be added to your corresponding rc file.

- **[Custom Media Server Manager](https://github.com/prinzpiuz/Media-Server-Manager)**
   so this is a custom minimal server built with python and [flask](https://github.com/pallets/flask), flask is minimal python framework to build web application, and I run this in my server with [uWSGI](https://github.com/unbit/uwsgi) and [nginx](https://en.wikipedia.org/wiki/Nginx)
   **Features**

  - Uploading to selected folder
  - Multi uploads
  - New folder creation
  - File listing
  - Multiple file deletion

  **Limitations**

  - Server management(on top of media i also need to watch this)
  - Chance of browser to crash while handling larger files(especially in mobile browser)
    \*solution(upload in chunks)
  - No background task support
  - Hard to set-up for non technical people

  So I planned to build a dedicated Mobile application for the same which solves all above problem

- **[MSM](https://github.com/prinzpiuz/MSM)**
   This is a dedicated mobile application for managing media server buit with [dart](https://dart.dev/) and [flutter](https://flutter.dev/) works on top of ssh,
  so no other dedicated set-up needed for this, only need to enable ssh connections to your server
   **Features**

  - Dedicated manager for Media servers
  - Works on top of ssh
  - Support background tasks
  - CRUD operations on files
  - Live shell(you can access server from mobile through terminal in application)
  - Save and run frequently used commands

  latest stable release can be Downloaded from [here](https://github.com/prinzpiuz/MSM/releases)
  And this was very useful for me since I usually download movies in my phone.
  Ios version not yet available....
