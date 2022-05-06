/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import './LinkPreview.css'

import * as React from 'react'
import {Suspense} from 'react'

// Cached responses or running request promises
const PREVIEW_CACHE = {};

const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

function useSuspenseRequest(url: string) {
  let cached = PREVIEW_CACHE[url];

  if (!url.match(URL_MATCHER)) {
    return {preview: null};
  }

  if (!cached) {
    cached = PREVIEW_CACHE[url] = fetch(
      `/api/link-preview?url=${encodeURI(url)}`,
    )
      .then((response) => response.json())
      .then((preview) => {
        PREVIEW_CACHE[url] = preview;
        return preview;
      })
      .catch(() => {
        PREVIEW_CACHE[url] = {preview: null};
      });
  }

  if (cached instanceof Promise) {
    throw cached;
  }

  return cached;
}

function LinkPreviewContent({
  url,
}: $ReadOnly<{
  url: string,
}>): React$Node {
  const {preview} = useSuspenseRequest(url);
  if (preview === null) {
    return null;
  }
  return (
    <div className="LinkPreview__container">
      {preview.img && (
        <div className="LinkPreview__imageWrapper">
          <img
            src={preview.img}
            alt={preview.title}
            className="LinkPreview__image"
          />
        </div>
      )}
      {preview.domain && (
        <div className="LinkPreview__domain">{preview.domain}</div>
      )}
      {preview.title && (
        <div className="LinkPreview__title">{preview.title}</div>
      )}
      {preview.description && (
        <div className="LinkPreview__description">{preview.description}</div>
      )}
    </div>
  );
}

function Glimmer(props): React$Node {
  return (
    <div
      className="LinkPreview__glimmer"
      {...props}
      style={{animationDelay: (props.index || 0) * 300, ...(props.style || {})}}
    />
  );
}

export default function LinkPreview({
  url,
}: $ReadOnly<{
  url: string,
}>): React$Node {
  return (
    <Suspense
      fallback={
        <>
          <Glimmer style={{height: '80px'}} index={0} />
          <Glimmer style={{width: '60%'}} index={1} />
          <Glimmer style={{width: '80%'}} index={2} />
        </>
      }>
      <LinkPreviewContent url={url} />
    </Suspense>
  );
}
