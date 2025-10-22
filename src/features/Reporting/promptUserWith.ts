import {
  toStringUnknown,
} from 'effect/Inspectable';

import {
  isError,
} from 'effect/Predicate';

import GitHub from '@/library/GitHub';

const Reporting_promptUserWith = (givenIssue: unknown): void => {
  console.debug(givenIssue);

  const formattedErrorDetails = [
    'Unexpected Error:',
    '"""',
    isError(givenIssue)
      ? givenIssue.message
      : toStringUnknown(givenIssue),
    '"""',
  ].join('\n');

  const userDidPermitDraftingNewIssue = window.confirm([
    formattedErrorDetails,
    '',
    'Proceed to file an issue?',
  ].join('\n'));

  if (
    !userDidPermitDraftingNewIssue
  ) return;

  const SharkUIRepository = new GitHub.Repository('nod-ai', 'shark-ui');

  const newIssue = SharkUIRepository.Issue.from({
    title   : `[Unexpected Error]: can't <some task> when <some context>`,
    body    : `### Details\n${formattedErrorDetails}`.replaceAll('\n', '\n> '),
    labels  : ['bug'],
    category: 'Bug',
  });

  window.open(newIssue.draft);
};

export {
  Reporting_promptUserWith,
};
