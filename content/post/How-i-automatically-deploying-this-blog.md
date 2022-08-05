---
title: "How I Automatically Deploying This Blog?"
date: 2022-07-01T23:37:16+05:30
draft: false
---

This is a kinda sequel to [My Blog Set up](/post/my-blog-setup/).
So before explaining the current setup. I know you guys are curious about knowing about the previous setup. Before, my setup was like, I set up my blog's build folder as a git submodule. so after completing writing my blog I manually take a build and push both repos (blog repo and build repo) to GitHub and then manually create merge requisites there and merge to master. This was like boring for me. and recently when got time I had some research on automatically deploying Hugo sites on GitHub pages and I found these two action plugins

- {{< og-summary "https://github.com/peaceiris/actions-gh-pages" >}}
- {{< og-summary "https://github.com/peaceiris/actions-hugo" >}}

So I created a GitHub workflow based on this plugin like this

```yaml
name: Build and deploy

on:
  push:
    branches:
      - master # Set a branch name to trigger deployment
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-20.04
    permissions:
      contents: write
    concurrency:
      group: ${{ github.workflow }}-${{ github.ref }}
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0 # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: "0.89.0"

      - name: Build
        run: hugo

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        # If you're changing the branch from main,
        # also change the `main` in `refs/heads/main`
        # below accordingly.
        if: ${{ github.ref == 'refs/heads/master' }}
        with:
          personal_token: ${{ secrets.PERSONAL_TOKEN }}
          external_repository: prinzpiuz/prinzpiuz.github.io
          publish_dir: ./public
          publish_branch: master
          commit_message: ${{ github.event.head_commit.message }}
```

It's very pretty straightforward, even though let me explain this very simple for newbies

- I am telling action to run only when there is a push event to master
- Then I am using checkout action to pull the latest code including submodules(this will ensure the latest changes in Hugo themes too)
- Then I am using Hugo's action I shared above to build my blog
- Then I am using an action push build code into my repo using [Github personal access token](https://github.com/settings/tokens) with a custom commit message

So whenever I create a merge request and merge it into master, deployment will automatically happen.
 Thanks to GitHub actions 👏🏼...
