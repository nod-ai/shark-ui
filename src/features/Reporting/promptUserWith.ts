import GitHub from '@/library/GitHub';

import {
  Contextualized,
} from '@/library/modifiersByType/error';

import {
  asError,
} from '@/library/utilitiesByType/error';

const Reporting_promptUserWith = (givenIssue: unknown): void => {
  const givenError = asError(givenIssue);
  const unexpectedError = Contextualized.cast(givenError, 'Unexpected Error');
  console.debug(givenError);

  const formattedErrorDetails = [
    `${unexpectedError.message}:`,
    '"""',
    unexpectedError.cause.message,
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
