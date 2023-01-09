---
title: "Things I Self-Hosting 🖳"
date: 2023-01-06T20:23:40+05:30
draft: false
categories: ["server", "self-Hosting", "openSource"]
---
_Disclaimer: This blog is not in any way promoting piracy._

This is small new year blog about things I self-host to make my life easier, I have a previous blog [here](https://prinzpiuz.in/post/my-media-server-setup/) about my media server setup. So the same system I am using for self-hosting some applications which are helpful for me in my day-to-day life, basically I have turned my childhood PC to a local server, it's been 13 years since its first boot, this mighty machine working for me without any complaints. It's not about having a big server, in terms of resources & hardware, it's about the mentality to host things your own & having fun of DIY 🛠 things.

{{< figure src="/images/self_hosting/neofetch.png" caption="[Neofetch](https://github.com/dylanaraps/neofetch) output of my server" height=250 width=350 class="figure_center" >}}

As you can see my local server is only having minimum resources. Yet it accomplishing it's all duties. Even once, I ran [Counter Strike](https://blog.counter-strike.net/) in it and used to play it in my TV using steam link in Amazon 🔥 TV. Of course the output was not that impressing, But I loved that experience.  

One of the thing I need to take care while self-hosting things is the availability of server when you need it. The main problem I faced was power failures, like after every power failure, I need to turn on PC by manually pressing power button. A simple hack I find out from PC's BIOS is Wake On Power feature as part of [ACPI](https://en.wikipedia.org/wiki/ACPI). Its turns on PC whenever power comes back, which ensure the availability of server if power is there. Which is what I needed. There is also another feature called [Wake On LAN](https://en.wikipedia.org/wiki/Wake-on-LAN), which works by receiving a magic packet from a network device.

Coming back to our topic, The services I am mainly running are these...

- ##### [Calibre](https://github.com/kovidgoyal/calibre) for E-book management  

    Basically I'm only using calibre's Database system, I have another beautiful service for its frontend and other required features.

  - Easily organize e-books
  - Easily convert e-books to other formats
  - Able to talk to e-book reader devices
  - Cross platform
  - Free and Open source 💛

- ##### [Calibre-Web](https://github.com/janeczku/calibre-web) as frontend for calibre database

    [📸 ScreenShot](https://prinzpiuz.in/images/self_hosting/calibre_web.png)

    This is a nice frontend of calibre database with some extra features. One main feature I loved was send to kindle via email, this is main reason I used calibre-web.
    So I have created a free SendGrid account and connected it with calibre-web, so whenever I want to send a file to my kindle I can just click on the particular book and do send to kindle 😃

  - Send to Kindle via email
  - OPDS feed for e-book reader apps
  - Bootstrap 3 HTML5 interface
  - User management with fine-grained per-user permissions
  - Support for Calibre Custom Columns
  - Self-update capability
  - Login via LDAP, google/GitHub OAuth and via proxy authentication
  - Free and Open source 💛

- ##### [Jellyfin](https://github.com/jellyfin/jellyfin) as Media Server

    [📸 ScreenShot](https://prinzpiuz.in/images/self_hosting/jellyfin.png)  

    Jellyfin is an open alternative to Plex and Emby, Jellyfin is very feature rich, stable & also cross-platform. It has been more than a year, I am using it. No issues till here.
    Also, it's very easy to manage media in it

  - Support Music & Pictures
  - User management
  - Parental controls
  - Client applications for all major platforms
  - Community support
  - Lot of community created plugins
  - Most features in Emby and Plex like Live TV, DVR, and hardware transcoding
  - Free and Open source 💛

- ##### [Deluge](https://github.com/deluge-torrent/deluge) as BitTorrent client

    [📸 ScreenShot](https://prinzpiuz.in/images/self_hosting/deluge.png)  

    The main reason I am using deluge is that it is very simple and minimal and doing its duty pretty awesome. There is also another reason which is, deluge have a web-UI and android client app and even a browser plugin

  - Various user interfaces available such as the GTK-UI, Web-UI and Console-UI
  - A rich collection of Plugins
  - Client-Server model
  - Free and Open source 💛

- ##### [Jackett](https://github.com/Jackett/Jackett) as Torrent Search Engine

  [📸 ScreenShot](https://prinzpiuz.in/images/self_hosting/jackett.png)

  Jackett is a torrent search capable of listing working torrents from the configured indexes, also it has capabilities to work with other apps like Sonarr, Radarr, SickRage, CouchPotato, Mylar3, Lidarr, DuckieTV, qBittorrent, Nefarious etc.

  - Very fast
  - Ability to work with other apps
  - Free and Open source 💛

I will be updating this list as soon as new services are adding. Also in future I am planning to migrate to Raspberry Pi for more portability.  

In addition, I will be adding services like [Sonarr](https://github.com/Sonarr/Sonarr) & [Radarr](https://github.com/Radarr/Radarr) for downloading TV shows and movies or maybe [Nefarious](https://github.com/lardbit/nefarious). There are also services like [Lidarr](https://github.com/lidarr/lidarr) for your favorite tracks downloads and [Mylar3](https://github.com/mylar3/mylar3) for comic lovers.  

{{< center >}}

So own your things, Enjoy your #freedom

{{< /center >}}
