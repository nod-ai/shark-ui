import Repository from '@/utilities/Repository.ts';

const promptUserToReport = (givenError: Error) => {
  const defaultMessage = 'Unexpected Error';

  const formattedErrorDetails = ((
    givenError: Error,
    givenMessage: string,
  ): string => {
    return [
      `${givenMessage}:`,
      '"""',
      givenError.message,
      '"""',
    ].join('\n');
  })(givenError, defaultMessage);

  const userDidPermitDraftingNewIssue = window.confirm([
    formattedErrorDetails,
    '',
    'Proceed to file an issue?',
  ].join('\n'));

  if (
    !userDidPermitDraftingNewIssue
  ) return;

  const draftOfNewIssue = Repository.draftIssue({
    title : `[Unexpected Error]: can't <some task> when <some context>`,
    body  : `### Details\n${formattedErrorDetails}`.replaceAll('\n', '\n> '),
    labels: ['bug'],
    type  : 'Bug',
  });

  window.open(draftOfNewIssue);
};

export {
  promptUserToReport,
};
