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
// HTTP.Endpoint.Error.Request
// HTTP.Client.send(...)
```

Here, the `HTTP` module centralizes access to its various members using a single namespace. Depending on the context, these members may be used in the type system, at runtime, or both.

### Toolbox (Functional)

### Hybrid

## Consumption of Internal Modules
