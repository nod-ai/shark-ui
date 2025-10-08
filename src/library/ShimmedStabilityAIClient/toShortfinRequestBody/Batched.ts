import {
  Array,
} from 'effect';

import type {
  GenerateFromTextRequest,
} from 'stabilityai-client-typescript/models/operations';

import Shortfin from '@/library/Shortfin';

import {
  toShortfinRequestBody,
} from './definition.declared.ts';

const toShortfinRequestBody_Batched = (
  givenRequestBodies: GenerateFromTextRequest['textToImageRequestBody'][],
): Shortfin.TextToImage.SDXL.Client.Request.Body.Batched => {
  const derivedShortfinRequestBodies = Array.getSomes(
    givenRequestBodies.map(toShortfinRequestBody),
  );

  const derivedBatchedRequestBody = new Shortfin.TextToImage.SDXL.Client.Request.Body.Batched();

  derivedShortfinRequestBodies.forEach((eachShortfinRequestBody) => {
    derivedBatchedRequestBody.append(eachShortfinRequestBody);
  });

  return derivedBatchedRequestBody;
};

export {
  toShortfinRequestBody_Batched,
};
