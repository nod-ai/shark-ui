import {
  Contextualized,
} from '@/library/modifiersByType/error';

import Repository from '@/utilities/Repository';

import {
  Reporting_formatFor,
} from './formatFor';

const Reporting_promptUserWith = (givenError: Error) => {
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

  const draftOfNewIssue = Repository.draftIssue({
    title   : `[Unexpected Error]: can't <some task> when <some context>`,
    body    : `### Details\n${formattedErrorDetails}`.replaceAll('\n', '\n> '),
    labels  : ['bug'],
    category: 'Bug',
  });

  window.open(draftOfNewIssue);
};

export {
  Reporting_promptUserWith,
};
