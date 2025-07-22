# Commit Messages

## Goal

To make it easy to write commit messages that:

- for commits with_in_ a PR:
    1. make it easier for authors to see where they can split up:
        - large commits into smaller, more manageable commits
        - large PRs into a stack of smaller, more manageable PRs
    1. communicate the author's checkpoints and/or methodology to reviewers
    1. make it obvious to reviewers where large PRs can be split up into an easier-to-review stack of smaller PRs.
- for squash-merged commits resulting _from_ a PR:
    1. give contributors easy, meaningful access to the history of changes and past decisions
    1. give maintainers a reliable pattern they can leverage to automate tasks
    1. encourage incremental, atomic changes

## Structure

```plaintext
<type>(<optional scope>): <summary>

<optional body>

<optional footer>
```

## Components

### Header

#### Type

Must be one of the following:

| Type          | Description                                                                                         | User-facing?       | Developer-facing?  | In other words...                                                                   |
|---------------|-----------------------------------------------------------------------------------------------------|--------------------|--------------------|-------------------------------------------------------------------------------------|
| `feature`     | New functionality                                                                                   | :white_check_mark: | :white_check_mark: | adding a new user story                                                             |
| `prefeature`  | New _internal_ functionality                                                                        | :x:                | :white_check_mark: | making a change that unblocks or empowers developers                                |
| `fix`         | Corrections to broken functionality                                                                 | :white_check_mark: | :white_check_mark: | fixing a bug                                                                        |
| `preliminary` | New _internal_ functionality that's contextualized by a subsequent commit                           | :x:                | :white_check_mark: | adding a new utility to be used in the next commit                                  |
| `refactor`    | Internal restructuring to existing functionality that unblocks future development                   | :x:                | :white_check_mark: | addressing a code smell                                                             |
| `performance` | A refactor that specifically improves speed, efficiency, etc.                                       | :x:                | :white_check_mark: | load times, power consumption                                                       |
| `types`       | A refactor that specifically affects compile-time only, not runtime                                 | :x:                | :white_check_mark: | adding a missing type annotation                                                    |
| `tests`       | Affects validation of existing functionality without changing the functionality itself              | :x:                | :x:                | adding a missing unit test, correction an existing unit test                        |
| `build`       | Affects the build system or external dependencies                                                   | :x:                | :x:                | something about npm                                                                 |
| `ci`          | Affects files and scripts that define our CI configuration                                          | :x:                | :x:                | something about Github Actions/Apps                                                 |
| `docs`        | Made for the "human runtime"                                                                        | :x:                | :x:                | a README update                                                                     |
| `linter`      | Affects the files and script that define our lint rules, might also include changes for conformance | :x:                | :white_check_mark: | adding an ESLint Rule and letting it apply changes                                  |
| `style`       | Affects the presentation of some file or script without actually affecting how it executes          | :x:                | :white_check_mark: | applying a useful "newline" convention for which an ESLint Rule does not yet exist  |
| `chore`       | Addresses a housekeeping item                                                                       | :grey_question:    | :grey_question:    | a dependency update                                                                 |
| `revert`      | Reverses an existing commit                                                                         | :grey_question:    | :grey_question:    |                                                                                     |

#### Scope

The scope is an optional field that can be used to provide additional context about the change.

Omitting the scope communicates that the change is relevant to the _entire_ project.
However, the changes of most commits will be inherently scoped to keep changes as incremental as possible, thus warranting the scope to be called out in the commit message.

When the scope _is_ included...

| ...and the type is...                                             | ...it ought to denote...                        | ...such as...                                       |
|-------------------------------------------------------------------|-------------------------------------------------|-----------------------------------------------------|
| `feature`                                                         | the user-facing "idea"                          | "text-to-image"                                     |
| `prefeature`                                                      | the library or dev-facing "idea"                | "library/math", "library/http"                      |
| `fix`, `preliminary`, `refactor`, `types`, `tests`, `performance` | (see `feature` and `prefeature`)                |                                                     |
| `build`                                                           | the affected tooling                            | "IDE"                                               |
| `ci`                                                              | the affected workflow                           | "node", "docs", "tests"                             |
| `docs`                                                            | the nature of what's being documented           | "README" or a "docs/" directory like "contributing" |
| `chore`                                                           | the context of whatever is being "freshened up" | "deps", "deps-dev", "release"                       |
| `linter`, `style`                                                 | the extent of what was linted                   | "app", "docs", "markdown"                           |

#### Summary

### Body

### Footer
