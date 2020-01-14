# Memfault Docusaurus

![static/img/memfault-docusaurus.png](static/img/memfault-docusaurus.png)

Our docs are built using [Docusaurus 2](https://v2.docusaurus.io/), a static
website generator.

## Development

Install dependencies:

```
$ yarn
```

Start a local webserver that will pick up most changes without restarting:

```
$ yarn start
```

## Content

Add a new page to the docs:

1. Choose a subdirectory under `docs/` and insert your Markdown file. Copy the
   header from an existing page and give it a unique title and `id:`.

2. Place any images needed by the page in the matching subdirectory under
   `static/img/docs/`.

3. Add the new page to `sidebars.js`.

Add a new post to the changelog:

1. Create a new post under `blog/` using the existing filename conventions. Copy
   the header from an existing post and give it a nice title.

2. Place any images needed by thte post in `static/img/blog/`.

## Deployment

Generate static content into the `build/` directory that can be served using any
static content hosting service:

```
$ yarn build
```

If you are using GitHub pages for hosting, this command is a convenient way to
build the website and push to the `gh-pages` branch:

```
$ GIT_USER=<Your GitHub username> USE_SSH=1 yarn deploy
```
