import type {
  Attempt_Exit_Exit,
} from './Exit';

import {
  Attempt_Exit_Failure,
} from './Failure';

import {
  Attempt_Exit_Success,
} from './Success';

import {
  Attempt_Exit,
} from './definition.declared.ts';

import {
  Attempt_Exit_die,
} from './die';

import {
  Attempt_Exit_failCause,
} from './failCause';

import {
  Attempt_Exit_isFailure,
} from './isFailure';

import {
  Attempt_Exit_isSuccess,
} from './isSuccess';

import {
  Attempt_Exit_map,
} from './map';

import {
  Attempt_Exit_mapBoth,
} from './mapBoth';

import {
  Attempt_Exit_mapErrorCause,
} from './mapErrorCause';

import {
  Attempt_Exit_succeed,
} from './succeed';

Attempt_Exit.isSuccess /*    */ = Attempt_Exit_isSuccess;
Attempt_Exit.isFailure /*    */ = Attempt_Exit_isFailure;
Attempt_Exit.succeed /*      */ = Attempt_Exit_succeed;
Attempt_Exit.failCause /*    */ = Attempt_Exit_failCause;
Attempt_Exit.die /*          */ = Attempt_Exit_die;
Attempt_Exit.Failure /*      */ = Attempt_Exit_Failure;
Attempt_Exit.Success /*      */ = Attempt_Exit_Success;
Attempt_Exit.map /*          */ = Attempt_Exit_map;
Attempt_Exit.mapBoth /*      */ = Attempt_Exit_mapBoth;
Attempt_Exit.mapErrorCause /**/ = Attempt_Exit_mapErrorCause;

declare module './definition.declared.ts' {
  namespace Attempt_Exit {
    export {
      type Attempt_Exit_Exit /*    */ as Exit,
      Attempt_Exit_isSuccess /*    */ as isSuccess,
      Attempt_Exit_isFailure /*    */ as isFailure,
      Attempt_Exit_succeed /*      */ as succeed,
      Attempt_Exit_failCause /*    */ as failCause,
      Attempt_Exit_die /*          */ as die,
      Attempt_Exit_Failure /*      */ as Failure,
      Attempt_Exit_Success /*      */ as Success,
      Attempt_Exit_map /*          */ as map,
      Attempt_Exit_mapBoth /*      */ as mapBoth,
      Attempt_Exit_mapErrorCause /**/ as mapErrorCause,
    };
  }
}
