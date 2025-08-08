import type {
  GenerateFromTextRequest,
} from 'stabilityai-client-typescript/models/operations';

import Shortfin from '@/library/Shortfin';

import {
  toShortfin_RequestBody,
} from './toShortfinRequestBody';

const toShortfinBatchedRequestBody = (
  givenRequestBodies: GenerateFromTextRequest['textToImageRequestBody'][],
): Shortfin.TextToImage.SDXL.Client.Request.Body.Batched => {
  const derivedShortfinRequestBodies = givenRequestBodies
    .map(toShortfin_RequestBody)
    .filter($0 => $0 !== null);

  const derivedBatchedRequestBody = new Shortfin.TextToImage.SDXL.Client.Request.Body.Batched();

  derivedShortfinRequestBodies.forEach((eachShortfinRequestBody) => {
    derivedBatchedRequestBody.append(eachShortfinRequestBody);
  });

  return derivedBatchedRequestBody;
};

export {
  toShortfinBatchedRequestBody,
};
