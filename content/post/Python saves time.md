---
title: "Python Saves My Time"
date: 2020-06-02T00:20:59+05:30
draft: false
categories: ["python", "linux"]
---

> _"repetitive task should be automated"_ - somebody,somewhere :sunglasses:

Its common philosophy in field of it to automate repetitive tasks, even if it take some time now to set-up it it will save lot of time in future. In this post I like to share kinda experience i had today while updating my machine and how python solved it easily.

In my work machine I am running [Manjaro](https://manjaro.org/) Linux, which is a [Rolling Release](https://en.wikipedia.org/wiki/Rolling_release) based on [Archlinux](https://www.archlinux.org/). so while updating today i had _“error: failed to commit transaction (conflicting files)”_ error, which is a common error in archlinux due to same file already exists in machine(file conflict) you can read more about it in [here](<https://wiki.archlinux.org/index.php/pacman#%22Failed_to_commit_transaction_(conflicting_files)%22_error>). The solution for this error is to delete each file manually, so easy na ?. just remove that file with rm command.
But what if we have this much conflicted files ?  

{{< more shell expand >}}  
btrfs-progs: /usr/bin/fsck.btrfs exists in filesystem
btrfs-progs: /usr/bin/mkfs.btrfs exists in filesystem
btrfs-progs: /usr/include/btrfsutil.h exists in filesystem
btrfs-progs: /usr/lib/initcpio/hooks/btrfs exists in filesystem
btrfs-progs: /usr/lib/initcpio/install/btrfs exists in filesystem
btrfs-progs: /usr/lib/libbtrfs.so exists in filesystem?
btrfs-progs: /usr/lib/libbtrfs.so.0 exists in filesystem
btrfs-progs: /usr/lib/libbtrfs.so.0.1 exists in filesystem
btrfs-progs: /usr/lib/libbtrfsutil.so exists in filesystem
btrfs-progs: /usr/lib/libbtrfsutil.so.1 exists in filesystem
btrfs-progs: /usr/lib/python3.8/site-packages/btrfsutil.cpython-38-x86_64-linux-gnu.so exists in filesystem
btrfs-progs: /usr/lib/systemd/system/btrfs-scrub@.service exists in filesystem
btrfs-progs: /usr/lib/systemd/system/btrfs-scrub@.timer exists in filesystem
btrfs-progs: /usr/lib/udev/rules.d/64-btrfs-dm.rules exists in filesystem
btrfs-progs: /usr/share/bash-completion/completions/btrfs exists in filesystem
btrfs-progs: /usr/share/man/man5/btrfs.5.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-balance.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-check.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-convert.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-device.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-filesystem.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-find-root.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-image.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-inspect-internal.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-map-logical.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-property.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-qgroup.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-quota.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-receive.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-replace.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-rescue.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-restore.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-scrub.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-select-super.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-send.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs-subvolume.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfs.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfsck.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/btrfstune.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/fsck.btrfs.8.gz exists in filesystem
btrfs-progs: /usr/share/man/man8/mkfs.btrfs.8.gz exists in filesystem
{{< /more >}}  
so it will be tough to delete all this conflict files one by one. I use python for helping in this kind of context.
so my idea is to save this shell output as text file and parse string one by one from it into a python list and split string based 
on space and get the file path  from it and run shell commands on that path from python

```python
import os 
file=open("conflict.txt", "r")
for string in file:
  os.system("sudo rm "+ string.split(" ")[1])
```

This python snippet do the thing for me and saves a lot of time.  
Read more about [os.system](https://docs.python.org/3/library/os.html#os.system)