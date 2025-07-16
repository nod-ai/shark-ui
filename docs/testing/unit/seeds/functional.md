# Seeding Tests for Functional Units

## Relevant Scenarios

The following template works particularly well for:

- **Mathematical operations** where edge cases are well-defined
- **Utility functions** with predictable behaviors
- In general, **pure functions** with deterministic inputs/outputs and no side effects

## Template

Use the following snippet to seed a new testing file:

```typescript
import {
  describe,
} from 'vitest';

import {
  doSomething,
} from './doSomething';

describe(doSomething, () => {
  describe('the sad outcomes', () => {
    describe.todo('when delegated');

    describe.todo('when generated');
  });

  describe.todo('the happy outcomes');
});
```

## Rationale

1. Follows guidance given by linter
1. Stubs with `describe.todo`
    - Use `describe.todo()` for planned but unimplemented test cases
    - Helps track what needs to be implemented
    - Provides a clear roadmap for test development
    - Shows up in test runners to track coverage gaps
1. Organizes tests into two sets of outcomes:
    - "sad"
      - The outcome at the end of a "sad path"
      - Error conditions and invalid inputs
      - Performance bottlenecks
      - Resource exhaustion scenarios
    - "happy"
      - The outcome at the end of a "happy path"
      - Typical usage patterns
      - Expected inputs with expected outputs
      - Optimal performance conditions
1. Organizes "sad outcome" tests by responsibility:
    - "when delegated": failure modes for which the unit is _not_ responsible for defining
      - non-actionable errors propagated up from a dependency
    - "when generated": those for which the unit _is_ responsible for defining
      - non-actionable errors instantiated in-scope
      - actionable error instances
      - error messages

## Stubbed Example

Here's what it might look like to stub some tests

```typescript
import {
  describe,
  it,
} from 'vitest';

import {
  doSomething,
} from './doSomething';

describe(doSomething, () => {
  describe('the sad outcomes', () => {
    describe('when delegated', () => {
      it.todo('should reject <sadAdjectiveA> <pluralInputNoun>');

      it.todo('should reject <sadAdjectiveB> <pluralInputNoun>');
    });

    describe('when generated', () => {
      describe('due to <sadAdjectiveC> <pluralInputNoun>', () => {
        it.todo('should reject them');

        it.todo('should conform to <some protocol or convention>');

        it.todo('should include a developer-friendly message');
      });
    });
  });

  describe('the happy outcomes', () => {
    it.todo('should accept <happyAdjective> <pluralInputNoun>');

    it.todo('should exhibit <propertyA>');

    it.todo('should exhibit <propertyB>');

    it.todo('should handle <specialAdjectiveA> <pluralInputNoun>');

    it.todo('should handle <specialAdjectiveB> <pluralInputNoun>');

    it.todo('should return <correctAnswer> for <commonalityAdjective> <pluralInputNoun>');
  });
});
```
