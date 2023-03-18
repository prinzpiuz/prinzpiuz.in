---
title: "A Small Tweak To Enhance Your Shell"
date: 2023-03-18T18:50:44+05:30
asciinema: true
draft: false
categories: ["Tweaks", "Shell", "Python"]
---

This is a short blog about, How a small enhancement in my `.zshrc` file helped me to do some repetitive steps automatically.
So coming to the topic, Let me explain the situation,
Te problem here was navigating between each of the project folders, also to activate virtual environments in the case of python projects. I need to remember all the paths of projects folder and their virtual environments in case of python projects. Sounds boring?.
So I did some tweaks in `.zshrc` to make things easy.
I am using [zsh](https://zsh.sourceforge.io/) as my shell, There are other shells available like [bash](https://www.gnu.org/software/bash/), and [fish](https://fishshell.com/), bash is the default shell in most operating systems. I am using zsh because it brings some extra features to the terminal. And every shell will be having corresponding rc files located `~/`, It will be a hidden file. You can see it by doing a `ls -al ~/`.
Its functionality is, As the name suggests rc is short for **R**un **C**ommand, which means it runs commands we wrote in the rc file every time we open a new terminal. Since I am using zsh my rc will be seen as `.zshrc`.
So here is what I did to solve the above-mentioned problem.

```shell
#to auto alias projects in hobby dir
for repo in $(ls ~/projects/hobby)
do
  alias $repo="cd ~/projects/hobby/$repo"
done

#to auto alias activate command for virtual envs in venv directory
for venv in $(ls ~/venvs)
do
  alias $venv"env"="source ~/venvs/$venv/bin/activate && $venv"
done
```

This is a shell script, what happening here is, I am creating [alias](https://en.wikipedia.org/wiki/Alias_(command)) for every directory in my hobby projects folder, so that if I enter the name of my hobby projects folder in terminal, I can change my location into that directory.
Also second part is more interesting, I am appending `env` to the last section of virtual environments folders and aliasing them, So when I write `<project name>` + `env`, it will activate virtual environment and then change location to that folder, since zsh has built in auto-completion for alias, after typing one or two letters of project name and hitting tab, zsh will show available options.

Here is a short screencast of how it actually works.

{{< asciinema key="shell" rows="20" preload="1" >}}

***

**Further References**

- Read more about `.bashrc`
  - <https://www.digitalocean.com/community/tutorials/bashrc-file-in-linux>

- Read more about **RC** files
  - <https://en.wikipedia.org/wiki/RUNCOM>

- More **RC** customization tips
  - <https://www.freecodecamp.org/news/bashrc-customization-guide/>
