import {
  Option,
} from 'effect';

import {
  ContentDescriptor,
} from './definition.declared.ts';

const ContentDescriptor_json = new ContentDescriptor(
  'application',
  Option.none(),
  'json',
  Option.none(),
  Option.none(),
);

export {
  ContentDescriptor_json,
};
