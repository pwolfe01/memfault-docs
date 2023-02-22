# Memfault Docs

[![Netlify Status](https://api.netlify.com/api/v1/badges/53e9bd12-7f75-468c-ab7f-eb4b70d10e07/deploy-status)](https://app.netlify.com/sites/memfault-docs/deploys)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/memfault/memfault-docs)

_Docs are auto-deployed when you commit to `main` (merge a PR!)_ If the deploy fails, netlify will roll back to the previous version.

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

## Linter

Code is linted with prettier. To fix up files to match format, run:

```
$ ./node_modules/.bin/prettier --write path/to/file.mdx
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

2. Place any images needed by the post in `static/img/blog/`.

## Images

Images can be implemented with our `ImageFigure` component, which is available in every MDX file.

NOTE: for raster images (.jpg, .png, .gif), _the asset file paths need to be imported in to your MDX file_ so that Docusaurus can pre-process the assets.

### `ImageFigure` component usage

For each image you want to use:

1. Depending on the type of image, either...
   1. If the file is an SVG, place it under the `/static/` directory and use the file path relative to that folder as your `src` value; or
   2. If it is a raster file (JPG, PNG, GIF), import the file (with an absolute `"@site/*"` -based path, or a file-relative path, e.g. `"./my-image.jpeg"`) and use the imported data as your `src` value
2. Write an `ImageFigure` component in to your MDX file with empty lines before and after it, using that `src` value and optional `alt` and `title`
3. **NOTE**: to provide a `caption` for the image, just add child content to the `ImageFigure` component
4. **NOTE**: if the image happens to be high-density (e.g. Retina) image, or a screenshot taken on such a screen, you can also supply a `pixelRatio` prop to make sure it will display no larger than its intrinsic or natural size.

The following demonstrates the complete pattern with all props, as well as child content which becomes the content of a `figcaption` element:

```jsx
// for a PNG, JPEG or GIF -> import the file as `src` !
import mfltLogo from "@site/assets/memfault-logo-full-dark@2x.png";

<ImageFigure
  src={mfltLogo}
  alt="The Memfault logo"
  title="Memfault"
  pixelRatio={2} // this ensures the image displays at natural size
>
  This is what the <strong>Memfault</strong> logo looks like 👆
</ImageFigure>

// for an SVG -> use a static file path as `src` !
<ImageFigure
  src="/binary-assets/android-bort-architecture.svg"
  alt="Schematic of Android BORT Architecture"
>
</ImageFigure>
```

### Diagrams

Diagrams should be implemented in Figma, and the source link must be included
where the diagram is used.

Usually a diagram will have a Figma Frame around it in the Figma editor; if you
select the frame, you will get a URL that will link directly to it. Add a
comment like so:

```markdown
<!-- Doc source: https://www.figma.com/file/GQIimU8iOtCrxGrdE6RxL3/Memfault-SDK-Architecture?node-id=808%3A10&t=2xgYRnOsaxVM51AB-0 -->

![](/img/docs/platform/ota-example.svg)
```
