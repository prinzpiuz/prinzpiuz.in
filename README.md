# prinzpiuz.in

Source for my personal blog, [prinzpiuz.in](https://prinzpiuz.in/). It is a static site built with [Hugo](https://gohugo.io/) and hosted on GitHub Pages.

## Setup

| Part | What is used |
|---|---|
| Generator | Hugo (extended), version set by the `HUGO_VERSION` repository variable |
| Hosting | GitHub Pages, custom domain `prinzpiuz.in` |
| Config | `config.toml` |
| Content | `content/` (posts, reviews, about, uses, projects, homelab) |
| Templates | `layouts/` |
| Assets | `static/` (CSS, JS, images, audio, terminal casts) |

### Run locally

```bash
git clone git@github.com:prinzpiuz/prinzpiuz.in.git
cd prinzpiuz.in
source env.sh && hugo server
```

`env.sh` is needed for the changelog on the uses page (see below). The site still builds without it, but that changelog will be empty.

### Branches

- `staging` is the default branch. Work is merged here through pull requests.
- `release` is the live branch. Merging `staging` into `release` publishes the site.

## Theme

The design is based on [Devise](https://themes.gohugo.io/devise/) by Austin Gebauer. The theme is not installed as a Hugo theme or module. Its templates and CSS are copied into `layouts/` and `static/css/` and modified from there, so there is no `themes/` folder and nothing to update from upstream. It uses Bootstrap 4 and Font Awesome 5.

## Deploy

Deployment runs from `.github/workflows/deploy.yml` on every push to `release`.

1. Hugo builds the site, with full git history so that last-modified dates and the uses changelog work.
2. The output is uploaded as a Pages artifact.
3. GitHub's official Pages deployment publishes it.

No personal access token or second repository is involved. The deploy job uses a short-lived token issued by GitHub for that run, and it is the only job with permission to publish.

## Versioning and site changelog

`.github/workflows/generate_changelog_and_version.yml` runs on every push to `staging`.

- The next version is calculated from [Conventional Commits](https://www.conventionalcommits.org/) since the last tag: `fix:` bumps the patch number, `feat:` bumps the minor number, anything else bumps the patch number.
- `CHANGELOG.md` is regenerated with [git-cliff](https://git-cliff.org/) using `cliff.toml`.
- The version in `config.toml` is updated. It is shown in the site footer.
- The result is committed and tagged with the new version.

## Changelog on the uses page

The [uses](https://prinzpiuz.in/uses/) page shows its own history, taken from git.

- `env.sh` reads the commit history of `content/uses/index.md` (date and subject of each commit) and exports it as a Hugo parameter through an environment variable.
- `layouts/partials/changelog.html` prints one line per commit when the page has `changelog: true` in its front matter.
- Commits written in Conventional Commit style (`fix:`, `feat:`, `chore:` and so on) are filtered out. Only plain-language commit messages appear, for example "Bought Casio AE-1200WH-1AV".

So to add a changelog entry, commit a change to the uses page with a plain sentence as the commit message.

## GitHub stars on the projects page

The [projects](https://prinzpiuz.in/projects/) page is a hand-written HTML page (`content/projects/index.html`) with a list of projects defined in JavaScript.

When the page loads, the visitor's browser calls the public GitHub API once per project (`api.github.com/repos/<owner>/<repo>`) and fills in the star count. Nothing is fetched at build time and no token is used, so the counts are always current. GitHub limits unauthenticated calls per visitor IP address, so a count can fail to load after many page views in a short time.

## Other features

- **Likes with BloTils**: posts with `bloTils: true` get a like button backed by [BloTils](https://github.com/prinzpiuz/BloTils), my own project, running at `blotils.prinzpiuz.in`. The script is loaded with an integrity hash.
- **Link previews**: the `og-summary` shortcode fetches Open Graph data for a URL from opengraph.io at build time and renders a preview card. It needs `opengraph_io_api_key` under `[params]`.
- **Terminal recordings**: the `asciinema` shortcode plays recordings from `static/casts/`. Enabled per page with `asciinema: true`.
- **Reviews**: a separate section for books and movies with a five-star rating (`review_image` shortcode) and optional audio (`audio: true` and the `audio` shortcode, files in `static/audios/`).
- **Collapsible sections**: `collapsible` shortcodes group the long lists on the uses page.
- **Last modified date**: pages with `modified_date: true` show the date of their last git commit.
- **Structured data**: every content page gets JSON-LD `BlogPosting` metadata for search engines.
- **Per-page assets**: the CSS and JS for likes, audio, asciinema and ratings are only loaded on pages that use them.

### Front matter switches

| Key | Effect |
|---|---|
| `bloTils` | Show the like button |
| `asciinema` | Load the terminal player |
| `audio` | Load the audio player |
| `modified_date` | Show the last modified date |
| `changelog` | Show the git-based changelog |

## Checks

`.github/workflows/checks.yml` runs [pre-commit](https://pre-commit.com/) on every push: whitespace and TOML checks, a large-file check, spell checking of `content/` with typos, and secret scanning with gitleaks. To run the same checks locally:

```bash
pre-commit install
```
