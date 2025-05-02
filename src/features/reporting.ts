import * as Repository from '@/utilities/Repository.ts';

export const promptUserToReport = (givenErrorMessage: string) => {
  const userDidPermitDraftingNewIssue = window.confirm([
    'Unexpected Error:',
    '"""',
    givenErrorMessage,
    '"""',
    '',
    'Proceed to file an issue?',
  ].join('\n'));

  if (
    !userDidPermitDraftingNewIssue
  ) return;

  const draftOfNewIssue = Repository.draftIssueFor(givenErrorMessage);
  window.open(draftOfNewIssue);
};
