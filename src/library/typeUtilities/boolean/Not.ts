import type {
  If,
} from './If';

import type {
  Is,
} from './Is';

type Not<
  SomeBoolean extends boolean,
> = SomeBoolean extends true
  ? false
  : true;

export type {
  Is,
  If,
  Not,
};
