# Dropzone

Build a small file processing pipeline. When someone drops a file onto the page, report back
its metadata, and render a preview: a thumbnail for images, a short snippet for text files, and
just the metadata for anything else.

The frontend is a small Vue 3 app that uploads with [Uppy](https://uppy.io/docs/). The server is
Express + multer. Look for the `TODO` comments in both not all of them have to be done, but let's see how far we can come