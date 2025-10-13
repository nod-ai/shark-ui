import GitHub from '@/library/GitHub';

import {
  Contextualized,
} from '@/library/modifiersByType/error';

import {
  Reporting_formatFor,
} from './formatFor';

const Reporting_promptUserWith = (givenError: Error): void => {
  const unexpectedError = Contextualized.cast(givenError, 'Unexpected Error');
  console.debug(givenError);
  const formattedErrorDetails = Reporting_formatFor(unexpectedError);

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
