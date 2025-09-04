# Development with Unit Tests

## Usage

Run your unit tests with:

```shell
npm run test:unit
```

See current coverage with:

```shell
npm run test:unit -- --coverage
```

See the [API docs](https://vitest.dev/guide/cli.html) for more commands.

## Creating a New Suite

1. Seed a new file with a template, i.e. [for functional units](./templates/functional.md)
1. Starting with the saddest path, stub each idea to test using `it.todo`
    - Think of how the unit will be perceived at face value from an outside perspective
    - This helps avoid being swayed by the implementation already within the unit, which can help catch simple edge cases
    - e.g. while adding coverage for a numeric operation named `greatestCommonDivisor`:
        - What happens when it's given:
            - an "undefined number"?
            - Infinity?
            - a non-whole or fractional number?
        - What properties should exist?
        - What laws should be upheld?
        - How should it handle notable inputs?
            - 0?
            - 1?
1. Add implementation for each stubbed test, one commit at a time
