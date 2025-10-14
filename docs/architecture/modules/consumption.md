# Consuming Modules

This document explores the different shapes that are encountered when importing and consuming modules created within this project.

## Goal

By understanding the various import shapes, contributors will be able to

- choose the most appropriate import style for their use case
- design the module's public API before writing any implementation
- structure a new module to support the desired public API

## Variations of Public APIs

### Namespaced (Object-Oriented)

Modules that centralize their functionality within a single object-like structure are considered "namespaced". This generally aligns with the pattern commonly seen in object-oriented programming in the sense that members are accessed via dot syntax.

The trademark of a namespaced module is that it exposes its primary object as the default export, for example:

```typescript
import HTTP from '@/library/HTTP';

// HTTP.Request
// HTTP.Response
// HTTP.Endpoint.Error.FailedToSendRequest
// HTTP.Client.send(...)
```

Here, the `HTTP` module centralizes access to its various members using a single namespace. Depending on the context, these members may be used in the type system, at runtime, or both.

### Toolbox (Functional)

Modules that expose a collection of related functions without a central object are considered "toolbox" style. This generally aligns with the functional programming paradigm, where public functions are imported and used directly.

```typescript
import {
  greatestCommonDivisor,
  leastCommonMultiple,
} from '@/library/math';

...
```

Here, the `math` module acts as a "toolbox", the "tools" being the various mathematical functions it exposes. In cases like this, the tools are to be used at runtime.

### Hybrid

Some modules may choose to expose both a primary object and named exports.

```typescript
import ContentDescriptor from '@/library/ContentDescriptor';

...
```

```typescript
import {
  ContentType,
} from '@/library/ContentDescriptor';

...
```

Here, the `ContentDescriptor` module provides both a default export for the primary object and named exports for common aliases.

## Consumption of Internal Modules

For modules that are internal to a library (i.e., must be explicitly exposed for public consumption), the same principles apply with the exception that `default` exports are avoided.

Consider the import of a hybrid internal module from one of its peers:

```typescript
// @/library/Range/definition.declared.ts

import {
  Range_BoundContainment,
} from './BoundContainment';

class Range {
  ...
}

export {
  Range,
};
```

Here, a level-2 member called `Range_BoundContainment` is imported by name into the "/Range/definition.declared.ts" module to define a top-level member called `Range`.

- Both of these are internal modules that will be explicitly exposed as `Range` and `Range.BoundContainment` to external consumers of the entire library.
- Because of this, it's important for other internal consumers to acknowledge that these members are safe to expose to these external consumers (e.g. when used as parameter types or return types).
- Ergo, `default` imports/exports are avoided to help peer consumers avoid inadvertent aliases that may obfuscate how a member will actually look to an external consumer.

## See Also

- [Selecting a Module Structure](./selecting-structure.md)
