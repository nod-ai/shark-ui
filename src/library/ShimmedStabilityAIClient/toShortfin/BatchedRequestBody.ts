import type {
  GenerateFromTextRequest,
} from 'stabilityai-client-typescript/models/operations';

import Shortfin from '@/library/Shortfin';

import {
  toShortfinRequestBody,
} from './RequestBody';

const toShortfinRequestBody_Batched = (
  givenRequestBodies: GenerateFromTextRequest['textToImageRequestBody'][],
): Shortfin.TextToImage.SDXL.Client.Request.Body.Batched => {
  const derivedShortfinRequestBodies = givenRequestBodies
    .map(toShortfinRequestBody)
    .filter($0 => $0 !== null);

  const derivedBatchedRequestBody = new Shortfin.TextToImage.SDXL.Client.Request.Body.Batched();

  derivedShortfinRequestBodies.forEach((eachShortfinRequestBody) => {
    derivedBatchedRequestBody.append(eachShortfinRequestBody);
  });

  return derivedBatchedRequestBody;
};

export {
  toShortfinRequestBody_Batched,
};
