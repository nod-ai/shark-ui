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

Use the summary field to provide a succinct description of the change.

It should read as if prepended by "This commit...":

- "\[This commit \]**adds generation button**"
- "\[This commit \]**describes how to contribute**"
- "\[This commit \]**extracts `foo` from `bar`**"

Summaries should:

- start with a verb in the simple present tense: "changes..."
  - not "change..."[^1]
  - not "changed..."[^2]
  - not "changing..."[^3]
- forgo punctuation at the end (i.e. ".", "!")
  - the summary is not necessarily a complete sentence, nor should it be followed by a sentence
  - put any extra details in the [body](#body) section
- keep the first letter lowercase
  - verbs aren't proper nouns, so they don't need to be capitalized

[^1]: because

    the first-person present tense ("\[I \]**change...**") is not "author-agnostic". The "who" is part of the commit metadata, so it doesn't need to be called out in the summary;

    the imperative present tense ("\[It's been requested that we \]**change...**") is reserved for issues and requests. i.e. when we're told what we should do next;

    the simple future tense ("\[This commit will \]**change...**") is not "release agnostic", implies need to reword as past tense after release

[^2]: because past tense "\[This commit has | I \]**changed...**" is not release agnostic, implies it would need to be in future tense until released

[^3]: because the present progressive tense "\[This commit is \]**changing...**" suggests "work-in-progress", which usually is only relevant during PRs

### Body

The body of a commit is optional but recommended, especially when the commit's changes and summary require context for:

- rationale, i.e. "feature(text-to-image): exposes input for diffusion steps"
  - Which kind of input was it? A slider? A stepper? A textfield?
  - Why was that kind chosen? Was it the only option? Was it the best option?
- external concepts, i.e. "ci(node): triggers workflow for security updates"
  - What's "node"?
  - What's a "workflow"?
  - What's a "security update"?

When the body is provided in...

- a single atomic commit (among several in the branch for a PR), it can provide additional context when the changes seem:
  - irrelevant to the PR, i.e. "this documents something I had to learn in order to work on this PR"
  - deceptively small, i.e. "it took X hours to figure out why this would fix the problem, here's why"
  - deceptively obvious, i.e. "the first attempt involved X, but it didn't work because of Y, so the end result instead involved Z"
- the merge commit of a PR, it can provide additional context about the outcome of the PR such as:
  - the author's intent, i.e. "the goal was to make it easier to..."
  - the resulting impact, i.e. "this will allow us to..."
  - dead ends or alternatives considered but not pursued, i.e. "we considered doing X, but it would have required Y, so we decided to do Z instead"
  - links or references to outside resources (e.g. tutorials, documentation)

### Footer

The footer of a commit is optional. When relevant, use it to link the commit to an issue or pull request in cases where it:

- fixes an issue, e.g. "fixes #1234"
- precedes another PR to make it easier to review/merge, e.g. "facilitates #5678"
- is a direct follow-up to another commit, e.g. "follows up on #9012"
- specifies when a problem was first introduced, e.g. "introduced in #3456"

Doing so allows yourself and other contributors to see the story of how the changes played out over time.
