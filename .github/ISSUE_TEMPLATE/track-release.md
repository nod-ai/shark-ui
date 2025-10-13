---
name: Track Release
about: Track progress leading to the next release
title: 'chore(version): release v#.#.#'
labels: chore
type: Task
assignees: bjacobgordon

---

### Checkpoints

- [ ] create `staging/v#.#.#` branch off of [integration](https://github.com/nod-ai/shark-ui/tree/integration)
  - [ ] commit version bump to "*-rc.0"
- [ ] open PR for branch: ?
- [ ] perform QA, listing issues below
  - [ ] when done, commit version bump without pre-release component
- [ ] [draft release entry](https://github.com/nod-ai/shark-ui/releases/new): ?
- [ ] bundle package
- [ ] add package to release notes
- [ ] merge PR into [release](https://github.com/nod-ai/shark-ui/tree/release) branch
  - [ ] add tag on [release](https://github.com/nod-ai/shark-ui/tree/release) branch: ?
- [ ] open PR comparing [release](https://github.com/nod-ai/shark-ui/tree/release) to [integration](https://github.com/nod-ai/shark-ui/tree/integration): #???
  - [ ] merge with merge commit rather than "squash and merge" or "rebase and merge" (ensures `release` is strictly behind `integration`)
- [ ] submit release draft
- [ ] update [template](https://github.com/nod-ai/shark-ui/blob/integration/.github/ISSUE_TEMPLATE/track-release.md), if needed

### Problems

Edit this description to add new ones.

- [ ] ?
