import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import ThumbnailGenerator from '@uppy/thumbnail-generator';

// TODO: show the server error message.
// TODO: add a client-side max file size that matches the server limit.

export function createUploader() {
  return new Uppy({ autoProceed: true })
    .use(XHRUpload, {
      endpoint: '/api/upload',
      fieldName: 'file',
    })
    .use(ThumbnailGenerator, {
      thumbnailWidth: 320,
      thumbnailType: 'image/jpeg',
    });
}

export type Uploader = ReturnType<typeof createUploader>;
