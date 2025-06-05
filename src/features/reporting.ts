import Repository from '@/utilities/Repository.ts';

const promptUserToReport = (givenErrorMessage: string) => {
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

  const draftOfNewIssue = Repository.draftIssue({
    title : `[Unexpected Error]: can't <some task> when <some context>`,
    body  : `Error Message:\n${givenErrorMessage}`.replace('\n', '\n> '),
    labels: ['bug'],
    type  : 'Bug',
  });

  window.open(draftOfNewIssue);
};

export {
  promptUserToReport,
};
